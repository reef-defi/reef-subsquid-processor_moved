import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Block } from "../model";
import { ctx } from "../processor";
import { hexToNativeAddress } from "../util/util";

export class BlockManager {  
    blocks: Map<string, Block> = new Map();
  
    process(blockHeader: SubstrateBlock) {
        const block = new Block ({
            id: blockHeader.id,
            height: blockHeader.height,
            hash: blockHeader.hash,
            author: hexToNativeAddress(blockHeader.validator),
            stateRoot: blockHeader.stateRoot,
            parentHash: blockHeader.parentHash,
            extrinsicRoot: blockHeader.extrinsicsRoot,
            finalized: true, // For now, the Squid archive only returns finalized blocks
            timestamp: new Date(blockHeader.timestamp),
            processorTimestamp: new Date(),
        });

        this.blocks.set(block.id, block);
    }
  
    async save(): Promise<Map<string, Block>> {
        await ctx.store.insert([...this.blocks.values()]);
        return this.blocks;
    }
  }

  