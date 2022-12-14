import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { Event } from "../types/support";
import { hexToNativeAddress } from "../util";

export const processKillAccount = async (event: Event, blockHeader: SubstrateBlock, accountManager: AccountManager): Promise<void> => {
    const address = hexToNativeAddress(event.args);
    await accountManager.process(address, blockHeader.height, new Date(blockHeader.timestamp), false);
}