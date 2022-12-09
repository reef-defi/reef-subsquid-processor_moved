import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Account } from "../model";
import { accountManager } from "../processor";
import { Event } from "../types/support";
import { hexToNativeAddress } from "../util";

export const processNativeTransfer = async (event: Event, blockHeader: SubstrateBlock): Promise<{transfer: any, accounts: Account[]}> => {
    const to = hexToNativeAddress(event.args[0]);
    const from = hexToNativeAddress(event.args[1]);
    const amount = event.args[2];

    const accounts = [];
    const toAccount = await accountManager.process(to, blockHeader.height, new Date(blockHeader.timestamp));
    if (toAccount) {
        accounts.push(toAccount);
    }
    const fromAccount = await accountManager.process(from, blockHeader.height, new Date(blockHeader.timestamp));
    if (fromAccount) {
        accounts.push(fromAccount);
    }

    // TODO transfer

    return {transfer: null, accounts};
}