import { BatchBlock } from "@subsquid/substrate-processor";
import { Block } from "../model/generated/block.model";
import { Item } from "../processor";
import { hexToNativeAddress } from "../util";

export const processBlock = (block: BatchBlock<Item>): Block => {
    console.log(`Processing block ${block.header.height}`);

    return new Block ({
        id: block.header.id,
        hash: block.header.hash,
        author: hexToNativeAddress(block.header.validator),
        stateRoot: block.header.stateRoot,
        parentHash: block.header.parentHash,
        extrinsicRoot: block.header.extrinsicsRoot,
        finalized: true, // For now all, the Squid archive only returns finalized blocks
        timestamp: new Date(block.header.timestamp),
        processorTimestamp: new Date(),
    });
}