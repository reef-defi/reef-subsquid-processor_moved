import { Store } from "@subsquid/typeorm-store";
import { TokenHolderData } from "../interfaces/interfaces";
import { Account, TokenHolder, TokenHolderType, VerifiedContract } from "../model";

export class TokenHolderManager {  
    tokenHoldersData: Map<string, TokenHolderData> = new Map();
  
    process(
        address: string, 
        evmAddress: string,
        balance: bigint,
        timestamp: number,
        token: VerifiedContract,
        nftId: number|null = null
    ) {
        const holderIsContract = address === '0x';

        const tokenHolderData: TokenHolderData = {
            id: `${token.id}-${holderIsContract ? evmAddress : address}${nftId ? `-${nftId}` : ''}`,
            token: token,
            signerAddress: holderIsContract ? '' : address,
            evmAddress: holderIsContract ? evmAddress : '', // TODO: what if is an account with evm address claimed?
            nftId: nftId ? BigInt(nftId) : null,
            type: holderIsContract ? TokenHolderType.Contract : TokenHolderType.Account,
            balance: balance,
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
    
            tokenHolders.push(
                new TokenHolder({
                    ...tokenHolderData,
                    signer: signer
                })
            );
        };
    
        await store.save(tokenHolders);
    }
  }

  