// import { SubstrateBlock } from "@subsquid/substrate-processor";
// import { AccountManager } from "../accountManager";
// import { EventRaw } from "../interfaces/interfaces";
// import { hexToNativeAddress } from "../util";

// export const processKillAccount = async (eventRaw: EventRaw, blockHeader: SubstrateBlock, accountManager: AccountManager): Promise<void> => {
//     const address = hexToNativeAddress(eventRaw.args);
//     await accountManager.process(address, blockHeader.height, new Date(blockHeader.timestamp), false);
// }