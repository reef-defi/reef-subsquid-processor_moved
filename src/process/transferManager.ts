import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "./accountManager";
import { EventRaw, TransferData } from "../interfaces/interfaces";
import { Account, Block, ContractType, Extrinsic, Transfer, VerifiedContract } from "../model";
import * as erc20 from "../abi/ERC20";
import * as erc721 from "../abi/ERC721";
import * as erc1155 from "../abi/ERC1155";
import { processErc20Transfer } from "../process/transfer/erc20Transfer";
import { processErc721Transfer } from "../process/transfer/erc721Transfer";
import { processErc1155SingleTransfer } from "../process/transfer/erc1155SingleTransfer";
import { processErc1155BatchTransfer } from "../process/transfer/erc1155BatchTransfer";
import { processNativeTransfer } from "./transfer/nativeTransfer";
import { TokenHolderManager } from "./tokenHolderManager";
import { ctx } from "../processor";

export class TransferManager {  
    transfersData: TransferData[] = [];
    tokenHolderManager: TokenHolderManager;

    constructor(tokenHolderManager: TokenHolderManager) {
        this.tokenHolderManager = tokenHolderManager;
    }
  
    async process(
        eventRaw: EventRaw, 
        blockHeader: SubstrateBlock, 
        accountManager: AccountManager,
        contract: VerifiedContract,
        isNative: boolean = false
    ) {
        if (isNative) {
            this.transfersData.push(await processNativeTransfer(eventRaw, blockHeader, contract, accountManager));
            return;
        }

        switch (eventRaw.args.topics[0]) {
            case erc20.events.Transfer.topic:
                if (contract.type !== ContractType.ERC20) break;
                const erc20Transfer = await processErc20Transfer(eventRaw, blockHeader, contract, accountManager, this.tokenHolderManager);
                if (erc20Transfer) this.transfersData.push(erc20Transfer);
                break;
            case erc721.events.Transfer.topic:
                if (contract.type !== ContractType.ERC721) break;
                this.transfersData.push(await processErc721Transfer(eventRaw, blockHeader, contract, accountManager, this.tokenHolderManager));
                break;
            case erc1155.events.TransferSingle.topic:
                if (contract.type !== ContractType.ERC1155) break;
                this.transfersData.push(await processErc1155SingleTransfer(eventRaw, blockHeader, contract, accountManager, this.tokenHolderManager));
                break;
            case erc1155.events.TransferBatch.topic:
                if (contract.type !== ContractType.ERC1155) break;
                this.transfersData.push(...await processErc1155BatchTransfer(eventRaw, blockHeader, contract, accountManager, this.tokenHolderManager));
                break;
        }
    }
  
    async save(
        blocks: Map<string, Block>, 
        extrinsics: Map<string, Extrinsic>,
        accounts: Map<string, Account>
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
                to = await ctx.store.get(Account, transferData.toAddress);
                if (!to) throw new Error(`Account ${transferData.toAddress} not found`); // TODO: handle this error
            }

            // Search from account in cached accounts
            let from = accounts.get(transferData.fromAddress);
            if (!from) {
                // If not found, query the database
                from = await ctx.store.get(Account, transferData.fromAddress);
                if (!from) throw new Error(`Account ${transferData.fromAddress} not found`); // TODO: handle this error
            }

            transfers.push(
                new Transfer({
                    ...transferData,
                    block: block,
                    extrinsic: extrinsic,
                    to: to,
                    from: from
                })
            );
        };

        await ctx.store.insert(transfers);
    }
}

  