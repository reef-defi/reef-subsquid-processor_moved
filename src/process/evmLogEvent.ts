import { EvmLog, EvmEventData } from "../interfaces/interfaces";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { EvmEventStatus } from "../model/generated/_evmEventStatus";
import { EvmEventType } from "../model/generated/_evmEventType";

export const processEvmLog = async (event: EvmLog, blockHeader: SubstrateBlock): Promise<EvmEventData | undefined> => {
    const method = event.name.split('.')[1];

    let status;
    let type = EvmEventType.Unverified;
    let dataParsed = {};

    if (method === 'Log') {
        status = EvmEventStatus.Success;
        // TODO fetch contract from DB, check if it's verified and parse event
        // if (contract.verified) { type = EvmEventType.Verified; }
        // dataParsed = parseEvent(event.args.log);
    } else if (method === 'ExecutedFailed') {
        status = EvmEventStatus.Error;
    } else {
        return undefined;
    }

    return {
        id: event.id,
        blockId: blockHeader.id,
        eventIndex: event.indexInBlock,
        contractAddress: event.args.address,
        dataRaw: event.args,
        dataParsed: dataParsed,
        method: method,
        type: type,
        status: method === 'Log' ? EvmEventStatus.Success : EvmEventStatus.Error,
        topic0: event.args.topics[0] || null,
        topic1: event.args.topics[1] || null,
        topic2: event.args.topics[2] || null,
        topic3: event.args.topics[3] || null,
    };
}