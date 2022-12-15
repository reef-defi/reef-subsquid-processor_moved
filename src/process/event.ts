import { SubstrateBlock } from "@subsquid/substrate-processor";
import { EventRaw } from "../interfaces/interfaces";
import { Event } from "../model";

export const processEvent = (eventRaw: EventRaw, blockHeader: SubstrateBlock): Event => {

    const event = new Event({
        id: eventRaw.id,
        blockHeight: blockHeader.height,
        extrinsicId: eventRaw.extrinsic.id,
        index: eventRaw.indexInBlock,
        phase: eventRaw.phase[0].toLowerCase() + eventRaw.phase.substring(1),
        section: eventRaw.name.split(".")[0].toLowerCase(),
        method: eventRaw.name.split(".")[1],
        data: getData(eventRaw.args),
        timestamp: new Date(blockHeader.timestamp),
    });

    return event;
}

const getData = (args: any): any => {
    const data: any = {};

    for (const key in args) {
        if (typeof args[key] === 'object') {
            data[key] = args[key]['__kind'];
        } else {
            data[key] = args[key];
        }
    }

  return data;
}