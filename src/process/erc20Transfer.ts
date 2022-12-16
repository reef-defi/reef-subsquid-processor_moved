import { EventRaw, TransferData } from "../interfaces/interfaces";
import { TransferType } from "../model";
import * as erc20 from "../abi/ERC20";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress, REEF_CONTRACT_ADDRESS, toChecksumAddress } from "../util";

export const processErc20Transfer = async (eventRaw: EventRaw, blockHeader: SubstrateBlock): Promise<TransferData | undefined> => {
    const tokenAddress = toChecksumAddress(eventRaw.args.address);
    if (tokenAddress === REEF_CONTRACT_ADDRESS) return;
    
    const [from, to, value] = erc20.events.Transfer.decode(eventRaw.args.log || eventRaw.args);

    const transferData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        toAddress: await findNativeAddress(to),
        fromAddress: await findNativeAddress(from),
        tokenAddress: tokenAddress,
        toEvmAddress: toChecksumAddress(to),
        fromEvmAddress: toChecksumAddress(from),
        type: TransferType.ERC20,
        amount: BigInt(value.toString()),
        success: true,
        timestamp: new Date(blockHeader.timestamp),
        nftId: null,
        errorMessage: undefined,
    };

    return transferData;
}