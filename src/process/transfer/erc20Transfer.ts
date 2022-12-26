import { ERC20Data, EventRaw, TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import * as erc20 from "../../abi/ERC20";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress, REEF_CONTRACT_ADDRESS, toChecksumAddress } from "../../util";
import { AccountManager } from "../accountManager";
import { ethers } from "ethers";
import { provider } from "../../processor";
import { TokenHolderManager } from "../tokenHolderManager";

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
    
    const toAddress = await findNativeAddress(to);
    const toEvmAddress = toChecksumAddress(to);
    if (toAddress !== '0x') accountManager.process(toAddress, blockHeader);
    if (ethers.utils.isAddress(toEvmAddress) && toEvmAddress !== ethers.constants.AddressZero) {
        try {
            const toBalance = await new erc20.Contract(tokenAddress, provider).balanceOf(toEvmAddress);
            tokenHolderManager.process(toAddress, toEvmAddress, BigInt(toBalance.toString()), blockHeader.timestamp, token);
        } catch (e) {}
    }
        
    const fromAddress = await findNativeAddress(from);
    const fromEvmAddress = toChecksumAddress(from);
    if (fromAddress !== '0x') accountManager.process(fromAddress, blockHeader)
    if (ethers.utils.isAddress(fromEvmAddress) && fromEvmAddress !== ethers.constants.AddressZero) {
        try {
            const fromBalance = await new erc20.Contract(tokenAddress, provider).balanceOf(fromEvmAddress);
            tokenHolderManager.process(fromAddress, fromEvmAddress, BigInt(fromBalance.toString()), blockHeader.timestamp, token);
        } catch (e) {}
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
        feeAmount: 0n, // TODO
    };

    return transferData;
}