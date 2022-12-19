import { TokenHolderData } from "../interfaces/interfaces";
import { Account, Contract, TokenHolder } from "../model";
import { Store } from "@subsquid/typeorm-store";

// export const processTokenHolder = (eventRaw: EventRaw, blockHeader: SubstrateBlock): TokenHolderData => {
    // const tokenHolderData: TokenHolderData = {
    //     id: `${tokenAddress}-${toChecksumAddress(to)}-0`,
    //     tokenAddress: tokenAddress,
    //     signerAddress: await findNativeAddress(to),
    //     evmAddress: toChecksumAddress(to),
    //     nftId: null,
    //     type: isContract ? TokenHolderType.Contract : TokenHolderType.Account,
    //     balance: BigInt(value.toString()),
    //     info: {},
    //     timestamp: new Date(blockHeader.timestamp),
    // };
// }

export const saveTokenHolders = async (
    tokenHoldersData: TokenHolderData[], 
    accounts: Map<string, Account>,
    store: Store
): Promise<void> => {
    const tokenHolders: TokenHolder[] = [];

    // TODO: process in parallel
    for (const tokenHolderData of tokenHoldersData) {
        let signer = null;
        if (tokenHolderData.signerAddress) {
            // Search signer account in cached accounts
            let signer = accounts.get(tokenHolderData.signerAddress);
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