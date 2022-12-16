import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { EventRaw } from "../interfaces/interfaces";
import { hexToNativeAddress } from "../util";

export const processClaimEvmAccount = async (eventRaw: EventRaw, blockHeader: SubstrateBlock, accountManager: AccountManager): Promise<void> => {
    const address = hexToNativeAddress(eventRaw.args[0]);
    await accountManager.process(address, blockHeader);
}