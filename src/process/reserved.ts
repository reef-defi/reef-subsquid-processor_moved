import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { Account } from "../model";
import { Event } from "../types/support";
import { hexToNativeAddress } from "../util";

export const processReserved = async (event: Event, blockHeader: SubstrateBlock, accountManager: AccountManager): Promise<void> => {
    const address = hexToNativeAddress(event.args[0]);
    await accountManager.process(address, blockHeader.height, new Date(blockHeader.timestamp));
}