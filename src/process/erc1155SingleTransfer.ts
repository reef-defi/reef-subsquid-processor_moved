import { EvmLog, TransferData } from "../interfaces/interfaces";
import { TransferType } from "../model";
import * as erc1155 from "../abi/ERC1155";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress } from "../util";

export const processErc1155SingleTransfer = async (event: EvmLog, blockHeader: SubstrateBlock): Promise<TransferData> => {    
    const [, from, to, id, value ] = erc1155.events.TransferSingle.decode(event.args.log || event.args);

    return {
        id: event.id,
        blockId: blockHeader.id,
        extrinsicId: event.extrinsic.id,
        toAddress: await findNativeAddress(to),
        fromAddress: await findNativeAddress(from),
        tokenAddress: event.args.address,
        toEvmAddress: to,
        fromEvmAddress: from,
        type: TransferType.ERC1155,
        amount: BigInt(value.toString()),
        success: true,
        timestamp: new Date(blockHeader.timestamp),
        nftId: BigInt(id.toString()),
        errorMessage: undefined,
    };
}