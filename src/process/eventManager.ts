import { SubstrateBlock } from "@subsquid/substrate-processor";
import { EventData, EventRaw } from "../interfaces/interfaces";
import { Block, Event, Extrinsic } from "../model";
import { ctx } from "../processor";
import { hexToNativeAddress } from "../util/util";

export class EventManager {  
    eventsData: EventData[] = [];
  
    process(eventRaw: EventRaw, blockHeader: SubstrateBlock) {
        const eventData = {
            id: eventRaw.id,
            blockId: blockHeader.id,
            extrinsicId: eventRaw.extrinsic.id,
            index: eventRaw.indexInBlock,
            phase: eventRaw.phase[0].toLowerCase() + eventRaw.phase.substring(1),
            section: eventRaw.name.split(".")[0],
            method: eventRaw.name.split(".")[1],
            data: this.getBlockData(eventRaw.name, eventRaw.args),
            timestamp: new Date(blockHeader.timestamp),
        };

        this.eventsData.push(eventData);
    }
  
    async save(blocks: Map<string, Block>, extrinsics: Map<string, Extrinsic>): Promise<Map<string, Event>> {
        const events: Map<string, Event> = new Map();
        this.eventsData.forEach(eventData => {
            const block = blocks.get(eventData.blockId);
            if (!block) throw new Error(`Block ${eventData.blockId} not found`); // TODO: handle this error
    
            const extrinsic = extrinsics.get(eventData.extrinsicId);
            if (!extrinsic) throw new Error(`Extrinsic ${eventData.extrinsicId} not found`); // TODO: handle this error
            
            events.set(eventData.id, new Event({
                ...eventData,
                block: block,
                extrinsic: extrinsic
            }));
        });
    
        await ctx.store.insert([...events.values()]);
    
        return events;
    }

    private getBlockData(eventName: string, args: any): any {
        switch (eventName) {
            case "EVM.Created":
            case "EVM.Executed":
            case "Identity.IdentitySet":
            case "System.NewAccount":
                return [args];
            case "EvmAccounts.ClaimAccount":
            case "Poc.Commited":
            case "Balances.Endowed":
            case "Balances.Reserved":
            case "Balances.Unreserved":
            case "Staking.Bonded":
            case "Staking.Reward":
            case "Staking.Unbonded":
                return [hexToNativeAddress(args[0]), args[1] ];
            case "Balances.Transfer":
                return [hexToNativeAddress(args[0]), hexToNativeAddress(args[1]), args[2]['__kind']];
            case "Balances.ReserveRepatriated":
                return [hexToNativeAddress(args[0]), hexToNativeAddress(args[1]), args[2], args[3]];
            default:
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
    }
}
