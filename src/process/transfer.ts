import { TransferData } from "../interfaces/interfaces";
import { Account, Block, Contract, Extrinsic, Transfer } from "../model";
import { Store } from "@subsquid/typeorm-store";

export const saveTransfers = async (
    transfersData: TransferData[], 
    blocks: Map<string, Block>, 
    extrinsics: Map<string, Extrinsic>,
    accounts: Map<string, Account>,
    store: Store
): Promise<void> => {
    const transfers: Transfer[] = [];

    // TODO: process in parallel
    for (const transferData of transfersData) {
        const block = blocks.get(transferData.blockId);
        if (!block) throw new Error(`Block ${transferData.blockId} not found`); // TODO: handle this error

        const extrinsic = extrinsics.get(transferData.extrinsicId);
        if (!extrinsic) throw new Error(`Extrinsic ${transferData.extrinsicId} not found`); // TODO: handle this error
        
        // Search to account in cached accounts
        let to = accounts.get(transferData.toAddress);
        if (!to) {
            // If not found, query the database
            to = await store.get(Account, transferData.toAddress);
            if (!to) throw new Error(`Account ${transferData.toAddress} not found`); // TODO: handle this error
        }

        // Search from account in cached accounts
        let from = accounts.get(transferData.fromAddress);
        if (!from) {
            // If not found, query the database
            from = await store.get(Account, transferData.fromAddress);
            if (!from) throw new Error(`Account ${transferData.fromAddress} not found`); // TODO: handle this error
        }

        // Find token contract in database
        const token = await store.get(Contract, transferData.tokenAddress);
        if (!token) throw new Error(`Contract ${transferData.tokenAddress} not found`); // TODO: handle this error

        transfers.push(
            new Transfer({
                ...transferData,
                block: block,
                extrinsic: extrinsic,
                to: to,
                from: from,
                token: token,
            })
        );
    };

    await store.insert(transfers);
}