import { EventRaw, TransferData } from "../interfaces/interfaces";
import { TransferType } from "../model";
import * as erc721 from "../abi/ERC721";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress, toChecksumAddress } from "../util";

export const processErc721Transfer = async (eventRaw: EventRaw, blockHeader: SubstrateBlock): Promise<TransferData> => {
    const [from, to, tokenId ] = erc721.events.Transfer.decode(eventRaw.args.log || eventRaw.args);

    const transferData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        toAddress: await findNativeAddress(to),
        fromAddress: await findNativeAddress(from),
        tokenAddress: toChecksumAddress(eventRaw.args.address),
        toEvmAddress: toChecksumAddress(to),
        fromEvmAddress: toChecksumAddress(from),
        type: TransferType.ERC721,
        amount: BigInt('1'),
        success: true,
        timestamp: new Date(blockHeader.timestamp),
        nftId: BigInt(tokenId.toString()),
        errorMessage: undefined,
    };

    return transferData;
}