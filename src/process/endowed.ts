import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { Account } from "../model";
import { EventRaw } from "../interfaces/interfaces";
import { hexToNativeAddress } from "../util";

export const processEndowed = async (eventRaw: EventRaw, blockHeader: SubstrateBlock, accountManager: AccountManager): Promise<void> => {
    const address = hexToNativeAddress(eventRaw.args[0]);
    accountManager.process(address, blockHeader.height, new Date(blockHeader.timestamp));
}