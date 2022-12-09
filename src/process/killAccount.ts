import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Account } from "../model";
import { accountManager } from "../processor";
import { Event } from "../types/support";
import { hexToNativeAddress } from "../util";

export const processKillAccount = async (event: Event, blockHeader: SubstrateBlock): Promise<Account> => {
    const address = hexToNativeAddress(event.args);
    return await accountManager.process(address, blockHeader.height, new Date(blockHeader.timestamp), false) as Account;
}