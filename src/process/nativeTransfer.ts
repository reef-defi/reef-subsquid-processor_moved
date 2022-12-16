// import { SubstrateBlock } from "@subsquid/substrate-processor";
// import { AccountManager } from "../accountManager";
// import { EventRaw } from "../interfaces/interfaces";
// import { hexToNativeAddress } from "../util";

// export const processNativeTransfer = async (eventRaw: EventRaw, blockHeader: SubstrateBlock, accountManager: AccountManager): Promise<any> => {
//     const to = hexToNativeAddress(eventRaw.args[0]);
//     const from = hexToNativeAddress(eventRaw.args[1]);
//     const amount = eventRaw.args[2];

//     await accountManager.process(to, blockHeader.height, new Date(blockHeader.timestamp));
//     await accountManager.process(from, blockHeader.height, new Date(blockHeader.timestamp));

//     return null;
// }