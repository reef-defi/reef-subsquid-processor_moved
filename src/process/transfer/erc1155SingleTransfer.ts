import { EventRaw, TransferData } from "../../interfaces/interfaces";
import { TransferType } from "../../model";
import * as erc1155 from "../../abi/ERC1155";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress, toChecksumAddress } from "../../util";
import { TokenHolderManager } from "../tokenHolderManager";
import { AccountManager } from "../accountManager";
import { ethers } from "ethers";
import { provider } from "../../processor";

export const processErc1155SingleTransfer = async (
    eventRaw: EventRaw,
    blockHeader: SubstrateBlock,
    accountManager: AccountManager,
    tokenHolderManager: TokenHolderManager
): Promise<TransferData> => {    
    const tokenAddress = toChecksumAddress(eventRaw.args.address);
    const [, from, to, id, value ] = erc1155.events.TransferSingle.decode(eventRaw.args.log || eventRaw.args);

    const toAddress = await findNativeAddress(to);
    const toEvmAddress = toChecksumAddress(to);
    if (toAddress !== '0x') accountManager.process(toAddress, blockHeader);
    if (ethers.utils.isAddress(toEvmAddress) && toEvmAddress !== ethers.constants.AddressZero) {
        const toBalance = await new erc1155.Contract(tokenAddress, provider).balanceOf(toEvmAddress, id);
        tokenHolderManager.process(toAddress, toEvmAddress, BigInt(toBalance.toString()), blockHeader.timestamp, tokenAddress, undefined, Number(id));
    }
        
    const fromAddress = await findNativeAddress(from);
    const fromEvmAddress = toChecksumAddress(from);
    if (fromAddress !== '0x') accountManager.process(fromAddress, blockHeader)
    if (ethers.utils.isAddress(fromEvmAddress) && fromEvmAddress !== ethers.constants.AddressZero) {
        const fromBalance = await new erc1155.Contract(tokenAddress, provider).balanceOf(fromEvmAddress, id);
        tokenHolderManager.process(fromAddress, fromEvmAddress, BigInt(fromBalance.toString()), blockHeader.timestamp, tokenAddress, undefined, Number(id));
    }

    const transferData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        toAddress: toAddress,
        fromAddress: fromAddress,
        tokenAddress: tokenAddress,
        toEvmAddress: toChecksumAddress(to),
        fromEvmAddress: toChecksumAddress(from),
        type: TransferType.ERC1155,
        amount: BigInt(value.toString()),
        success: true,
        timestamp: new Date(blockHeader.timestamp),
        denom: null,
        nftId: BigInt(id.toString()),
        errorMessage: '',
        feeAmount: 0n, // TODO
    };

    return transferData;
}