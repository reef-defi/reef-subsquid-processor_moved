import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { AccountManager } from "./accountManager";
import { EventRaw, EvmEventData } from "../interfaces/interfaces";
import { Block, Event, EvmEvent, EvmEventStatus, EvmEventType } from "../model";
import { toChecksumAddress } from "../util";
import { TransferManager } from "./transferManager";

export class EvmEventManager {  
    evmEventsData: EvmEventData[] = [];
  
    async process(
        eventRaw: EventRaw, 
        blockHeader: SubstrateBlock,
        transferManager: TransferManager,
        accountManager: AccountManager,
        store?: Store
    ) {
        const method = eventRaw.name.split('.')[1];

        let status;
        let type = EvmEventType.Unverified;
        let dataParsed = {};

        if (method === 'Log') {
            status = EvmEventStatus.Success;

            // const contract = store!.get(VerifiedContract, address);

            // if (contract.verified) { type = EvmEventType.Verified; }
            // dataParsed = parseEvent(event.args.log);

            await transferManager.process(eventRaw, blockHeader, accountManager);
        } else if (method === 'ExecutedFailed') {
            status = EvmEventStatus.Error;
        } else {
            return;
        }

        const evmEventData = {
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

        this.evmEventsData.push(evmEventData);
    }
  
    async save(blocks: Map<string, Block>, events: Map<string, Event>, store: Store) {
        const evmLogEvents: EvmEvent[] = this.evmEventsData.map(evmLogEventData => {
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
  }

  