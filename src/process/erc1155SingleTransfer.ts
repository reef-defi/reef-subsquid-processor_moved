import { EventRaw, TransferData } from "../interfaces/interfaces";
import { TransferType } from "../model";
import * as erc1155 from "../abi/ERC1155";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress, toChecksumAddress } from "../util";

export const processErc1155SingleTransfer = async (eventRaw: EventRaw, blockHeader: SubstrateBlock): Promise<TransferData> => {    
    const [, from, to, id, value ] = erc1155.events.TransferSingle.decode(eventRaw.args.log || eventRaw.args);

    const transferData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        toAddress: await findNativeAddress(to),
        fromAddress: await findNativeAddress(from),
        tokenAddress: toChecksumAddress(eventRaw.args.address),
        toEvmAddress: toChecksumAddress(to),
        fromEvmAddress: toChecksumAddress(from),
        type: TransferType.ERC1155,
        amount: BigInt(value.toString()),
        success: true,
        timestamp: new Date(blockHeader.timestamp),
        nftId: BigInt(id.toString()),
        errorMessage: '',
        feeAmount: undefined, // TODO
    };

    return transferData;
}