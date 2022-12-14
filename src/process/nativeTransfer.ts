import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { Account } from "../model";
import { Event } from "../types/support";
import { hexToNativeAddress } from "../util";

export const processNativeTransfer = async (event: Event, blockHeader: SubstrateBlock, accountManager: AccountManager): Promise<any> => {
    const to = hexToNativeAddress(event.args[0]);
    const from = hexToNativeAddress(event.args[1]);
    const amount = event.args[2];

    await accountManager.process(to, blockHeader.height, new Date(blockHeader.timestamp));
    await accountManager.process(from, blockHeader.height, new Date(blockHeader.timestamp));

    return null;
}