import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountData } from "../interfaces/interfaces";
import { Account, Block } from "../model";
import { ctx, reefVerifiedContract } from "../processor";
import { EvmAccountsEvmAddressesStorage, EVMAccountsStorage, IdentityIdentityOfStorage } from "../types/storage";
import { bufferToString, toChecksumAddress } from "../util/util";
import { TokenHolderManager } from "./tokenHolderManager";
import * as ss58 from '@subsquid/ss58';
import { ethers } from "ethers";
import { getBalancesAccount } from "../util/balances/balances";

export class AccountManager {  
    accountsData: Map<string, AccountData> = new Map();
    tokenHolderManager: TokenHolderManager;

    constructor(tokenHolderManager: TokenHolderManager) {
        this.tokenHolderManager = tokenHolderManager;
    }
  
    async process(address: string, blockHeader: SubstrateBlock, active = true): Promise<AccountData> {
        let accountData = this.accountsData.get(address);
        
        // If account does not exist or block height is lower than current, we extract its data and store it
        if (!accountData || accountData.blockHeight < blockHeader.height) {
            accountData = await this.getAccountData(address, blockHeader, active);
            this.accountsData.set(address, accountData);
            this.tokenHolderManager.process(address, '', accountData.freeBalance, blockHeader.timestamp, reefVerifiedContract);
        } else if (!active) { // If account already exists and is killed, we update the active flag
            accountData.active = false;
            this.accountsData.set(address, accountData);
        }

        return accountData;
    }
  
    async save(blocks: Map<string, Block>): Promise<Map<string, Account>> {
        const accounts: Map<string, Account> = new Map();

        this.accountsData.forEach(accountData => {
            const block = blocks.get(accountData.blockId);
            if (!block) throw new Error(`Block ${accountData.blockId} not found`); // TODO: handle this error
            
            accounts.set(accountData.id, new Account ({
                ...accountData,
                block: block
            }));
        });
    
        await ctx.store.save([...accounts.values()]);
        return accounts;
    }
  
    private async getAccountData(address: string, blockHeader: SubstrateBlock, active: boolean): Promise<AccountData> {
        const addressBytes = ss58.decode(address).bytes;
        const [evmAddress, balances, identity] = await Promise.all([
            this.getEvmAccount(blockHeader, addressBytes),
            getBalancesAccount(blockHeader, addressBytes),
            this.getIdentity(blockHeader, addressBytes),
        ]);

        const addr = evmAddress || '';
        const evmAddr = addr !== ''
            ? toChecksumAddress(addr)
            : addr;
        const evmNonce = await this.getEvmNonce(blockHeader, addr);
  
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

    private async getEvmAccount(blockHeader: SubstrateBlock, address: Uint8Array) {
        const storage = new EvmAccountsEvmAddressesStorage(ctx, blockHeader);

        if (!storage.isExists) {
            return undefined
        } else if (storage.isV5) {
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

        if (!storage.isExists) {
            return undefined
        } else if (storage.isV5) {
            return storage.asV5.get(address);
        } else {
            throw new Error("Unknown storage version");
        }
    }

    private async getEvmNonce(blockHeader: SubstrateBlock, evmAddress: string): Promise<number> {
        if (evmAddress === '') return 0;

        const evmAddressBytes = ethers.utils.arrayify(evmAddress);
        const storage = new EVMAccountsStorage(ctx, blockHeader);

        if (!storage.isExists) {
            return 0;
        } else if (storage.isV5) {
            const accountInfo = await storage.asV5.get(evmAddressBytes);
            return accountInfo?.nonce || 0;
        } else if (storage.isV7) {
            const accountInfo = await storage.asV7.get(evmAddressBytes);
            return accountInfo?.nonce || 0;
        } else {
            throw new Error("Unknown storage version");
        }
    }
}

  