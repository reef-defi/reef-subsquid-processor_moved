// import { EvmLog, TransferData } from "../interfaces/interfaces";
// import { TransferType } from "../model";
// import * as erc721 from "../abi/ERC721";
// import { SubstrateBlock } from "@subsquid/substrate-processor";
// import { findNativeAddress, toChecksumAddress } from "../util";

// export const processErc721Transfer = async (event: EvmLog, blockHeader: SubstrateBlock): Promise<TransferData> => {
//     const [from, to, tokenId ] = erc721.events.Transfer.decode(event.args.log || event.args);

//     const transferData = {
//         id: event.id,
//         blockId: blockHeader.id,
//         extrinsicId: event.extrinsic.id,
//         toAddress: await findNativeAddress(to),
//         fromAddress: await findNativeAddress(from),
//         tokenAddress: toChecksumAddress(event.args.address),
//         toEvmAddress: toChecksumAddress(to),
//         fromEvmAddress: toChecksumAddress(from),
//         type: TransferType.ERC721,
//         amount: BigInt('1'),
//         success: true,
//         timestamp: new Date(blockHeader.timestamp),
//         nftId: BigInt(tokenId.toString()),
//         errorMessage: undefined,
//     };

//     return transferData;
// }