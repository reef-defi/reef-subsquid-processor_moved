import { ERC20Data, EventRaw, TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import * as erc20 from "../../abi/ERC20";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress, REEF_CONTRACT_ADDRESS, toChecksumAddress } from "../../util/util";
import { AccountManager } from "../accountManager";
import { ethers } from "ethers";
import { TokenHolderManager } from "../tokenHolderManager";
import { ctx, headReached } from "../../processor";

export const processErc20Transfer = async (
    eventRaw: EventRaw, 
    blockHeader: SubstrateBlock,
    token: VerifiedContract,
    accountManager: AccountManager,
    tokenHolderManager: TokenHolderManager
): Promise<TransferData | undefined> => {
    const tokenAddress = token.id;
    if (tokenAddress === REEF_CONTRACT_ADDRESS) return;
    const [from, to, value] = erc20.events.Transfer.decode(eventRaw.args.log || eventRaw.args);
    
    const toAddress = await findNativeAddress(blockHeader, to);
    const toEvmAddress = toChecksumAddress(to);
    if (toAddress !== '0x') accountManager.process(toAddress, blockHeader);
    if (ethers.utils.isAddress(toEvmAddress) && toEvmAddress !== ethers.constants.AddressZero) {
        let toBalance = ethers.BigNumber.from(0);
        if (headReached) {
            // We start updating balance only after the head block has been reached
            try {
                toBalance = await new erc20.Contract(ctx, blockHeader, tokenAddress).balanceOf(toEvmAddress);
            } catch (e) {}
        }
        tokenHolderManager.process(toAddress, toEvmAddress, BigInt(toBalance.toString()), blockHeader.timestamp, token);
    }
        
    const fromAddress = await findNativeAddress(blockHeader, from);
    const fromEvmAddress = toChecksumAddress(from);
    if (fromAddress !== '0x') accountManager.process(fromAddress, blockHeader)
    if (ethers.utils.isAddress(fromEvmAddress) && fromEvmAddress !== ethers.constants.AddressZero) {
        let fromBalance = ethers.BigNumber.from(0);
        if (headReached) {
            // We start updating balance only after the head block has been reached
            try {
                fromBalance = await new erc20.Contract(ctx, blockHeader, tokenAddress).balanceOf(fromEvmAddress);
            } catch (e) {}
        }
        tokenHolderManager.process(fromAddress, fromEvmAddress, BigInt(fromBalance.toString()), blockHeader.timestamp, token);
    }

    const transferData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        toAddress: toAddress,
        fromAddress: fromAddress,
        token: token,
        toEvmAddress: toEvmAddress,
        fromEvmAddress: fromEvmAddress,
        type: TransferType.ERC20,
        amount: BigInt(value.toString()),
        success: true,
        timestamp: new Date(blockHeader.timestamp),
        denom: (token.contractData as ERC20Data).symbol,
        nftId: null,
        errorMessage: '',
        feeAmount: 0n, // TODO: data
    };

    return transferData;
}