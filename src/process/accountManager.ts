import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { AccountData } from "../interfaces/interfaces";
import { Account, Block } from "../model";
import { provider } from "../processor";
import { REEF_CONTRACT_ADDRESS, toChecksumAddress } from "../util";
import { TokenHolderManager } from "./tokenHolderManager";

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
            this.tokenHolderManager.process(address, '', accountData.freeBalance, blockHeader.timestamp, REEF_CONTRACT_ADDRESS);
        } else if (!active) { // If account already exists and is killed, we update the active flag
            accountData.active = false;
            this.accountsData.set(address, accountData);
        }

        return accountData;
    }
  
    async save(blocks: Map<string, Block>, store: Store): Promise<Map<string, Account>> {
        const accounts: Map<string, Account> = new Map();

        this.accountsData.forEach(accountData => {
            const block = blocks.get(accountData.blockId);
            if (!block) throw new Error(`Block ${accountData.blockId} not found`); // TODO: handle this error
            
            accounts.set(accountData.id, new Account ({
                ...accountData,
                block: block
            }));
        });
    
        await store.save([...accounts.values()]);
        return accounts;
    }
  
    private async getAccountData(address: string, blockHeader: SubstrateBlock, active: boolean): Promise<AccountData> {
        const [evmAddress, balances, identity] = await Promise.all([
            provider.api.query.evmAccounts.evmAddresses(address),
            provider.api.derive.balances.all(address),
            provider.api.derive.accounts.identity(address),
        ]);
    
        // TODO clean below code
        const addr = evmAddress.toString();
        const evmAddr = addr !== ''
            ? toChecksumAddress(addr)
            : addr;
  
        const evmNonce: string | null = addr !== ''
            ? await provider.api.query.evm.accounts(addr)
            .then((res): any => res.toJSON())
            .then((res) => res?.nonce || 0)
            : 0;
    
        return {
            id: address,
            evmAddress: evmAddr,
            identity: identity,
            active: active,
            freeBalance: BigInt(balances.freeBalance.toString()),
            lockedBalance: BigInt(balances.lockedBalance.toString()),
            availableBalance: BigInt(balances.availableBalance.toString()),
            reservedBalance: BigInt(balances.reservedBalance.toString()),
            vestedBalance: BigInt(balances.vestingLocked.toString()),
            votingBalance: BigInt(balances.votingBalance.toString()),
            nonce: Number(balances.accountNonce),
            evmNonce: Number(evmNonce) || 0,
            blockHeight: blockHeader.height,
            timestamp: new Date(blockHeader.timestamp),
            blockId: blockHeader.id,
        };
    }
  }

  