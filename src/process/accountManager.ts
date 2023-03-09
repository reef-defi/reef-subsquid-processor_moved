import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountData } from "../interfaces/interfaces";
import { Account, Block, TokenHolder, TokenHolderType, Transfer } from "../model";
import { ctx, headReached, reefVerifiedContract } from "../processor";
import { EvmAccountsEvmAddressesStorage, EVMAccountsStorage, IdentityIdentityOfStorage } from "../types/storage";
import { bufferToString, extractIdentity, REEF_CONTRACT_ADDRESS, toChecksumAddress } from "../util/util";
import { TokenHolderManager } from "./tokenHolderManager";
import * as ss58 from '@subsquid/ss58';
import { ethers } from "ethers";
import { getBalancesAccount } from "../util/balances/balances";
import { AccountBalances } from "../util/balances/types";
import { TransferManager } from "./transferManager";
import { Not } from "typeorm";

export class AccountManager {  
    accountsData: Map<string, AccountData> = new Map();
    tokenHolderManager: TokenHolderManager;
    tranferManager: TransferManager;
    claimedEvmAddresses: string[] = [];

    constructor(tokenHolderManager: TokenHolderManager, transferManager: TransferManager) {
        this.tokenHolderManager = tokenHolderManager;
        this.tranferManager = transferManager;
    }
  
    async process(address: string, blockHeader: SubstrateBlock, active = true, evmClaim = false): Promise<AccountData> {
        let accountData = this.accountsData.get(address);
        
        if (!active) { await this.updateOnKilledAccount(address); }
        
        // If account does not exist or block height is lower than current, we extract its data and store it
        if (!accountData || accountData.blockHeight < blockHeader.height) {
            accountData = await this.getAccountData(address, blockHeader, active);
            this.accountsData.set(address, accountData);
            this.tokenHolderManager.process(address, '', accountData.freeBalance, blockHeader.timestamp, reefVerifiedContract);
        } else if (!active) { // If account already exists and is killed, we update the active flag
            accountData.active = false;
            this.accountsData.set(address, accountData);
        }

        if (evmClaim) { await this.updateOnEvmAccountBound(address, accountData.evmAddress); }

        return accountData;
    }
  
    async save(blocks: Map<string, Block>): Promise<Map<string, Account>> {
        const accounts: Map<string, Account> = new Map();

        this.accountsData.forEach(accountData => {
            const block = blocks.get(accountData.blockId);
            if (!block) {
                ctx.log.error(`ERROR saving account: Block ${accountData.blockId} not found`);
                return;
            }
            
            accounts.set(accountData.id, new Account ({
                ...accountData,
                block: block
            }));
        });
    
        await ctx.store.save([...accounts.values()]);
        
        for (const evmAddress of this.claimedEvmAddresses) {
            const account = [...accounts.values()].find(account => account.evmAddress === evmAddress);
            if (!account) { 
                ctx.log.error(`ERROR updating token holders and transfers: Account with EVM address ${evmAddress} not found`);
                continue; 
            }
            await this.updateTokenHoldersAndTransferOnEvmAccountBound(account, evmAddress);
        }

        return accounts;
    }

    private updateOnEvmAccountBound = async (
        nativeAddress: string, 
        evmAddress: string
    ) => {        
        // Update token holders in memory
        this.tokenHolderManager.tokenHoldersData.forEach(tokenHolderData => {
            if (tokenHolderData.evmAddress === evmAddress) {
                tokenHolderData.evmAddress = "";
                tokenHolderData.signerAddress = nativeAddress;
                tokenHolderData.type = TokenHolderType.Account;
                tokenHolderData.id = tokenHolderData.id.replace(evmAddress, nativeAddress);
            }
        });

        // Update transfers in memory
        this.tranferManager.transfersData.forEach(transferData => {
            if (transferData.toEvmAddress === evmAddress) {
                transferData.toAddress = nativeAddress;
            } else if (transferData.fromEvmAddress === evmAddress) {
                transferData.fromAddress = nativeAddress;
            }
        });

        const account = await ctx.store.get(Account, nativeAddress);
        if (!account) {
            // Account does not exist in DB, so we update token holders and transfers after saving the account
            this.claimedEvmAddresses.push(evmAddress);
            return;
        }
    
        await this.updateTokenHoldersAndTransferOnEvmAccountBound(account, evmAddress);
    };

    private updateTokenHoldersAndTransferOnEvmAccountBound = async (
        account: Account, 
        evmAddress: string
    ) => {
        // Update token holders in DB
        const tokenHolders = await ctx.store.find(TokenHolder, {
            where: { evmAddress },
            relations: { token: true, signer: true }
        });
        await ctx.store.remove(tokenHolders);
        tokenHolders.forEach(tokenHolder => {
            tokenHolder.evmAddress = "",
            tokenHolder.signer = account,
            tokenHolder.type = TokenHolderType.Account
            tokenHolder.id =  tokenHolder.id.replace(evmAddress, account.id);
        });
        await ctx.store.save(tokenHolders);
    
        // Update transfers in DB
        const transfersTo = await ctx.store.find(Transfer, {
            where: { toEvmAddress: evmAddress },
            relations: { token: true, block: true, from: true, to: true }
        });
        transfersTo.forEach(transfer => transfer.to = account);
        await ctx.store.save(transfersTo);
    
        const transfersFrom = await ctx.store.find(Transfer, {
            where: { fromEvmAddress: evmAddress },
            relations: { token: true, block: true, from: true, to: true }
        });
        transfersFrom.forEach(transfer => transfer.from = account);
        await ctx.store.save(transfersFrom);
    }
        

    private updateOnKilledAccount = async (nativeAddress: string) => {
        let unboundedEvmAddress = this.accountsData.get(nativeAddress)?.evmAddress;
        if (!unboundedEvmAddress || unboundedEvmAddress === "" || unboundedEvmAddress === "0x") {
            const account = await ctx.store.findOneBy(Account, { id: nativeAddress });
            if (account && account.evmAddress) {
                unboundedEvmAddress = account.evmAddress;
            } else {
                // Killed account did not have an EVM address bound
                return;
            }
        }

        // Update token holders in memory
        this.tokenHolderManager.tokenHoldersData.forEach(tokenHolderData => {
            if (tokenHolderData.signerAddress === nativeAddress && tokenHolderData.token.id !== REEF_CONTRACT_ADDRESS) {
                tokenHolderData.evmAddress = unboundedEvmAddress!;
                tokenHolderData.signerAddress = "";
                tokenHolderData.type = TokenHolderType.Contract;
                tokenHolderData.id = tokenHolderData.id.replace(nativeAddress, unboundedEvmAddress!);
            }
        });

        // Update transfers in memory
        this.tranferManager.transfersData.forEach(transferData => {
            if (transferData.toAddress === nativeAddress) {
                if (transferData.token.id === REEF_CONTRACT_ADDRESS) {
                    transferData.toEvmAddress = "";
                } else {
                    transferData.toAddress = "0x";
                }
            } else if (transferData.fromAddress === nativeAddress) {
                if (transferData.token.id === REEF_CONTRACT_ADDRESS) {
                    transferData.fromEvmAddress = "";
                } else {
                    transferData.fromAddress = "0x";
                }
            }
        });

        // Update token holders in DB
        const tokenHolders = await ctx.store.find(TokenHolder, {
            where: { signer: { id: nativeAddress }, token: { id:  Not(REEF_CONTRACT_ADDRESS) } },
            relations: { token: true, signer: true }
        });
        await ctx.store.remove(tokenHolders);
        tokenHolders.forEach(tokenHolder => {
            tokenHolder.evmAddress = unboundedEvmAddress,
            tokenHolder.signer = null
            tokenHolder.type = TokenHolderType.Contract
            tokenHolder.id = tokenHolder.id.replace(nativeAddress, unboundedEvmAddress!);
        });
        await ctx.store.save(tokenHolders);
    
        // Update transfers in DB
        const zeroAccount = await ctx.store.get(Account, "0x");
        if (!zeroAccount) {
            ctx.log.error(`ERROR saving token holder: Account 0x not found`);
            return;
        }
        const transfersTo = await ctx.store.find(Transfer, {
            where: { to: { id: nativeAddress } },
            relations: { token: true, block: true, from: true, to: true }
        });
        transfersTo.forEach(transfer => {
            if (transfer.token.id === REEF_CONTRACT_ADDRESS && transfer.toEvmAddress !== "") {
                transfer.toEvmAddress = "";
            } else if (transfer.token.id !== REEF_CONTRACT_ADDRESS && transfer.to.id !== "0x") {
                transfer.to = zeroAccount;
            }
        });
        await ctx.store.save(transfersTo);
    
        const transfersFrom = await ctx.store.find(Transfer, {
            where: { from: { id: nativeAddress } },
            relations: { token: true, block: true, from: true, to: true }
        });
        transfersFrom.forEach(transfer => {
            if (transfer.token.id === REEF_CONTRACT_ADDRESS && transfer.toEvmAddress !== "") {
                transfer.fromEvmAddress = "";
            } else if (transfer.token.id !== REEF_CONTRACT_ADDRESS && transfer.from.id !== "0x") {
                transfer.from = zeroAccount;
            }
        });
        await ctx.store.save(transfersFrom);
    }
  
    private async getAccountData(address: string, blockHeader: SubstrateBlock, active: boolean): Promise<AccountData> {
        let evmAddr = '';
        let identity = null;
        let balances: AccountBalances = {
            freeBalance: 0n,
            lockedBalance: 0n,
            availableBalance: 0n,
            reservedBalance: 0n,
            vestingLocked: 0n,
            votingBalance: 0n,
            accountNonce: 0,
        };
        let evmNonce = 0;

        const addressBytes = ss58.decode(address).bytes;
        if (headReached) {
            // We start updating balances and identity only after the head block has been reached
            let evmAddress;
            [evmAddress, balances, identity] = await Promise.all([
                this.getEvmAddress(blockHeader, addressBytes),
                getBalancesAccount(blockHeader, addressBytes),
                this.getIdentity(blockHeader, addressBytes),
            ]);
            if (evmAddress) { 
                evmAddr = toChecksumAddress(evmAddress);
                evmNonce = await this.getEvmNonce(blockHeader, evmAddress);
            }
        } else {
            const addressBytes = ss58.decode(address).bytes;
            const evmAddress = await this.getEvmAddress(blockHeader, addressBytes);
            if (evmAddress) { evmAddr = toChecksumAddress(evmAddress) }
        }

        return {
            id: address,
            evmAddress: evmAddr,
            identity: identity,
            active: active,
            freeBalance: balances.freeBalance,
            lockedBalance: balances.lockedBalance,
            availableBalance: balances.availableBalance,
            reservedBalance: balances.reservedBalance,
            vestedBalance: balances.vestingLocked,
            votingBalance: balances.votingBalance,
            nonce: balances.accountNonce,
            evmNonce: evmNonce,
            blockHeight: blockHeader.height,
            timestamp: new Date(blockHeader.timestamp),
            blockId: blockHeader.id,
        };
    }

    private async getEvmAddress(blockHeader: SubstrateBlock, address: Uint8Array) {
        const storage = new EvmAccountsEvmAddressesStorage(ctx, blockHeader);

        if (!storage.isExists) return undefined;
        
        if (storage.isV5) {
            return storage.asV5.get(address).then(
                (res: Uint8Array | undefined) => {
                    return res ? bufferToString(res as Buffer): res 
                }
            );
        } else {
            throw new Error("Unknown storage version");
        }
    }

    private async getIdentity(blockHeader: SubstrateBlock, address: Uint8Array) {
        const storage = new IdentityIdentityOfStorage(ctx, blockHeader);

        if (!storage.isExists) return undefined;
        
        if (storage.isV5) {
            const identityRaw = await storage.asV5.get(address);
            return extractIdentity(identityRaw);
        } else {
            throw new Error("Unknown storage version");
        }
    }

    private async getEvmNonce(blockHeader: SubstrateBlock, evmAddress: string) {
        if (evmAddress === '') return 0;

        const evmAddressBytes = ethers.utils.arrayify(evmAddress);
        const storage = new EVMAccountsStorage(ctx, blockHeader);

        if (!storage.isExists) {
            return 0;
        } else if (storage.isV5) {
            const accountInfo = await storage.asV5.get(evmAddressBytes);
            return accountInfo?.nonce || 0;
        } else {
            throw new Error("Unknown storage version");
        }
    }
}

  