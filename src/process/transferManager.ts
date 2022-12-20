import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { AccountManager } from "./accountManager";
import { EventRaw, TransferData } from "../interfaces/interfaces";
import { Account, Block, Contract, Extrinsic, Transfer } from "../model";
import * as erc20 from "../abi/ERC20";
import * as erc721 from "../abi/ERC721";
import * as erc1155 from "../abi/ERC1155";
import { processErc20Transfer } from "../process/transfer/erc20Transfer";
import { processErc721Transfer } from "../process/transfer/erc721Transfer";
import { processErc1155SingleTransfer } from "../process/transfer/erc1155SingleTransfer";
import { processErc1155BatchTransfer } from "../process/transfer/erc1155BatchTransfer";
import { processNativeTransfer } from "./transfer/nativeTransfer";

export class TransferManager {  
    transfersData: TransferData[] = [];
  
    async process(
        eventRaw: EventRaw, 
        blockHeader: SubstrateBlock, 
        accountManager: AccountManager,
        isNative: boolean = false
    ) {
        if (isNative) {
            this.transfersData.push(await processNativeTransfer(eventRaw, blockHeader, accountManager));
            return;
        }

        switch (eventRaw.args.topics[0]) {
            case erc20.events.Transfer.topic:
                const erc20Transfer = await processErc20Transfer(eventRaw, blockHeader, accountManager);
                if (erc20Transfer) this.transfersData.push(erc20Transfer);
                break;
            case erc721.events.Transfer.topic:
                this.transfersData.push(await processErc721Transfer(eventRaw, blockHeader));
                break;
            case erc1155.events.TransferSingle.topic:
                this.transfersData.push(await processErc1155SingleTransfer(eventRaw, blockHeader)); 
                break;
            case erc1155.events.TransferBatch.topic:
                this.transfersData.push(...await processErc1155BatchTransfer(eventRaw, blockHeader));
                break;
        }
    }
  
    async save(
        blocks: Map<string, Block>, 
        extrinsics: Map<string, Extrinsic>,
        accounts: Map<string, Account>,
        store: Store
    ) {
        const transfers: Transfer[] = [];

        // TODO: process in parallel
        for (const transferData of this.transfersData) {
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
  }

  