import { Store } from "@subsquid/typeorm-store";
import { TokenHolderData } from "../interfaces/interfaces";
import { Account, Contract, TokenHolder, TokenHolderType, VerifiedContract } from "../model";
import { REEF_CONTRACT_ADDRESS, REEF_DEFAULT_DATA } from "../util";

export class TokenHolderManager {  
    tokenHoldersData: Map<string, TokenHolderData> = new Map();
  
    process(
        address: string, 
        evmAddress: string,
        balance: bigint,
        timestamp: number,
        tokenAddress: string,
        contract: VerifiedContract|undefined = undefined,
        nftId: number|null = null
    ) {
        const isContract = address === '0x';

        const tokenHolderData: TokenHolderData = {
            id: `${tokenAddress}-${isContract ? evmAddress : address}${nftId ? `-${nftId}` : ''}`,
            tokenAddress: tokenAddress,
            signerAddress: isContract ? '' : address,
            evmAddress: isContract ? evmAddress : '', // TODO: what if is an account with evm address claimed?
            nftId: nftId ? BigInt(nftId) : null,
            type: isContract ? TokenHolderType.Contract : TokenHolderType.Account,
            balance: balance,
            info: contract ? contract.contractData : tokenAddress === REEF_CONTRACT_ADDRESS ? {...REEF_DEFAULT_DATA} : {},
            timestamp: new Date(timestamp),
        };

        this.tokenHoldersData.set(tokenHolderData.id, tokenHolderData);
    }
  
    async save(accounts: Map<string, Account>, store: Store) {
        const tokenHolders: TokenHolder[] = [];

        // TODO: process in parallel
        for (const tokenHolderData of this.tokenHoldersData.values()) {
            let signer = null;
            if (tokenHolderData.signerAddress) {
                // Search signer account in cached accounts
                signer = accounts.get(tokenHolderData.signerAddress);
                if (!signer) {
                    // If not found, query the database
                    signer = await store.get(Account, tokenHolderData.signerAddress);
                    if (!signer) throw new Error(`Account ${tokenHolderData.signerAddress} not found`); // TODO: handle this error
                }
            }
    
            // Find token contract in database
            const token = await store.get(Contract, tokenHolderData.tokenAddress);
            if (!token) throw new Error(`Contract ${tokenHolderData.tokenAddress} not found`); // TODO: handle this error
    
            tokenHolders.push(
                new TokenHolder({
                    ...tokenHolderData,
                    signer: signer,
                    token: token,
                })
            );
        };
    
        await store.save(tokenHolders);
    }
  }

  