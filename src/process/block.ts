import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Block } from "../model/generated/block.model";
import { hexToNativeAddress } from "../util";

export const processBlock = (blockHeader: SubstrateBlock): Block => {
    // console.log(`Processing block ${blockHeader.height}`);

    const block = new Block ({
        id: blockHeader.id,
        height: blockHeader.height,
        hash: blockHeader.hash,
        author: hexToNativeAddress(blockHeader.validator),
        stateRoot: blockHeader.stateRoot,
        parentHash: blockHeader.parentHash,
        extrinsicRoot: blockHeader.extrinsicsRoot,
        finalized: true, // For now all, the Squid archive only returns finalized blocks
        timestamp: new Date(blockHeader.timestamp),
        processorTimestamp: new Date(),
    });

    return block;
}