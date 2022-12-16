import { EvmEventData, EventRaw, TransferData } from "../interfaces/interfaces";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { EvmEventStatus } from "../model/generated/_evmEventStatus";
import { EvmEventType } from "../model/generated/_evmEventType";
import { toChecksumAddress } from "../util";
import { Account, Block, Contract, Event, EvmEvent, Extrinsic, Transfer } from "../model";
import { Store } from "@subsquid/typeorm-store";
import * as erc20 from "../abi/ERC20";
import * as erc721 from "../abi/ERC721";
import * as erc1155 from "../abi/ERC1155";
import { processErc20Transfer } from "./erc20Transfer";
import { processErc721Transfer } from "./erc721Transfer";
import { processErc1155SingleTransfer } from "./erc1155SingleTransfer";
import { processErc1155BatchTransfer } from "./erc1155BatchTransfer";
interface ProcessEvmEventResponse {
    evmEventData: EvmEventData | undefined;
    transfersData: TransferData[];
}

export const processEvmEvent = async (eventRaw: EventRaw, blockHeader: SubstrateBlock): Promise<ProcessEvmEventResponse> => {
    let evmEventData: EvmEventData | undefined = undefined;
    let transfersData: TransferData[] = [];

    const method = eventRaw.name.split('.')[1];

    let status;
    let type = EvmEventType.Unverified;
    let dataParsed = null;

    if (method === 'Log') {
        status = EvmEventStatus.Success;
        // TODO fetch contract from DB, check if it's verified and parse event
        // if (contract.verified) { type = EvmEventType.Verified; }
        // dataParsed = parseEvent(event.args.log);

        transfersData = await processEvmLog(eventRaw, blockHeader);
    } else if (method === 'ExecutedFailed') {
        status = EvmEventStatus.Error;
    } else {
        return { evmEventData, transfersData };
    }

    evmEventData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        eventIndex: eventRaw.indexInBlock,
        extrinsicIndex: eventRaw.extrinsic.indexInBlock,
        contractAddress: toChecksumAddress(eventRaw.args.address),
        dataRaw: eventRaw.args,
        dataParsed: dataParsed,
        method: method,
        type: type,
        status: status,
        topic0: eventRaw.args.topics[0] || null,
        topic1: eventRaw.args.topics[1] || null,
        topic2: eventRaw.args.topics[2] || null,
        topic3: eventRaw.args.topics[3] || null,
    };

    return { evmEventData, transfersData };
}

export const saveEvmEvents = async (evmLogEventsData: EvmEventData[], blocks: Map<string, Block>, events: Map<string, Event>, store: Store): Promise<void> => {
    const evmLogEvents: EvmEvent[] = evmLogEventsData.map(evmLogEventData => {
        const block = blocks.get(evmLogEventData.blockId);
        if (!block) throw new Error(`Block ${evmLogEventData.blockId} not found`); // TODO: handle this error

        const event = events.get(evmLogEventData.id);
        if (!event) throw new Error(`Event ${evmLogEventData.id} not found`); // TODO: handle this error
        
        return new EvmEvent({
            ...evmLogEventData,
            block: block,
            event: event
        });
    });

    await store.insert(evmLogEvents);
}

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


const processEvmLog = async (eventRaw: EventRaw, blockHeader: SubstrateBlock): Promise<TransferData[]> => {
    switch (eventRaw.args.topics[0]) {
        case erc20.events.Transfer.topic:
            const erc20Transfer = await processErc20Transfer(eventRaw, blockHeader);
            return erc20Transfer ? [erc20Transfer] : [];
        case erc721.events.Transfer.topic:
            return [await processErc721Transfer(eventRaw, blockHeader)];
        case erc1155.events.TransferSingle.topic: 
            return [await processErc1155SingleTransfer(eventRaw, blockHeader)];
        case erc1155.events.TransferBatch.topic:
            return await processErc1155BatchTransfer(eventRaw, blockHeader);
        default:
            return [];
    }
};