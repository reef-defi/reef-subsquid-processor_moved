import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { Block } from "../model/generated/block.model";
import { hexToNativeAddress } from "../util";

export const processBlock = (blockHeader: SubstrateBlock): Block => {
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

    return block;
}

export const saveBlocks = async (blocks: Block[], store: Store): Promise<void> => {
    await store.insert(blocks);
}