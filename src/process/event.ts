import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { EventData, EventRaw } from "../interfaces/interfaces";
import { Block, Event, Extrinsic } from "../model";

export const processEvent = (eventRaw: EventRaw, blockHeader: SubstrateBlock): EventData => {
    const eventData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        index: eventRaw.indexInBlock,
        phase: eventRaw.phase[0].toLowerCase() + eventRaw.phase.substring(1),
        section: eventRaw.name.split(".")[0].toLowerCase(),
        method: eventRaw.name.split(".")[1],
        data: getBlockData(eventRaw.args),
        timestamp: new Date(blockHeader.timestamp),
    };

    return eventData;
}

export const saveEvents = async (eventsData: EventData[], blocks: Map<string, Block>, extrinsics: Map<string, Extrinsic>, store: Store): Promise<Map<string, Event>> => {
    const events: Map<string, Event> = new Map();
    eventsData.forEach(eventData => {
        const block = blocks.get(eventData.blockId);
        if (!block) throw new Error(`Block ${eventData.blockId} not found`); // TODO: handle this error

        const extrinsic = extrinsics.get(eventData.extrinsicId);
        if (!extrinsic) throw new Error(`Extrinsic ${eventData.extrinsicId} not found`); // TODO: handle this error
        
        events.set(eventData.id, new Event ({
            ...eventData,
            block: block,
            extrinsic: extrinsic
        }));
    });

    await store.insert([...events.values()]);

    return events;
}

const getBlockData = (args: any): any => {
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