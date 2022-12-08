// import { EvmLog, TransferData } from "../interfaces/interfaces";
// import { TransferType } from "../model";
// import * as erc1155 from "../abi/ERC1155";
// import { SubstrateBlock } from "@subsquid/substrate-processor";
// import { findNativeAddress, toChecksumAddress } from "../util";

// export const processErc1155BatchTransfer = async (event: EvmLog, blockHeader: SubstrateBlock): Promise<TransferData[]> => {    
//     const transfersData: TransferData[] = [];
//     const [, from, to, ids, values_ ] = erc1155.events.TransferBatch.decode(event.args.log || event.args);
//     const toAddress = await findNativeAddress(to);
//     const fromAddress = await findNativeAddress(from);

//     for (let i = 0; i < ids.length; i++) {
//         transfersData.push({
//             id: event.id,
//             blockId: blockHeader.id,
//             extrinsicId: event.extrinsic.id,
//             toAddress: toAddress,
//             fromAddress: fromAddress,
//             tokenAddress: toChecksumAddress(event.args.address),
//             toEvmAddress: toChecksumAddress(to),
//             fromEvmAddress: toChecksumAddress(from),
//             type: TransferType.ERC1155,
//             amount: BigInt(values_[i].toString()),
//             success: true,
//             timestamp: new Date(blockHeader.timestamp),
//             nftId: BigInt(ids[i].toString()),
//             errorMessage: undefined,
//         });
//     }

//     return transfersData;
// }