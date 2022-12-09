import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Account } from "../model";
import { accountManager } from "../processor";
import { Event } from "../types/support";
import { hexToNativeAddress } from "../util";

export const processEndowed = async (event: Event, blockHeader: SubstrateBlock): Promise<Account | undefined> => {
    const address = hexToNativeAddress(event.args[0]);
    return accountManager.process(address, blockHeader.height, new Date(blockHeader.timestamp));
}