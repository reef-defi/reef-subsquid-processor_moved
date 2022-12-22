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
    contract: VerifiedContract | undefined,
    accountManager: AccountManager,
    tokenHolderManager: TokenHolderManager
): Promise<TransferData | undefined> => {
    const tokenAddress = toChecksumAddress(eventRaw.args.address);
    if (tokenAddress === REEF_CONTRACT_ADDRESS) return;
    const [from, to, value] = erc20.events.Transfer.decode(eventRaw.args.log || eventRaw.args);
    
    const toAddress = await findNativeAddress(to);
    const toEvmAddress = toChecksumAddress(to);
    if (toAddress !== '0x') accountManager.process(toAddress, blockHeader);
    if (ethers.utils.isAddress(toEvmAddress) && toEvmAddress !== ethers.constants.AddressZero) {
        const toBalance = await new erc20.Contract(tokenAddress, provider).balanceOf(toEvmAddress);
        tokenHolderManager.process(toAddress, toEvmAddress, BigInt(toBalance.toString()), blockHeader.timestamp, tokenAddress, contract);
    }
        
    const fromAddress = await findNativeAddress(from);
    const fromEvmAddress = toChecksumAddress(from);
    if (fromAddress !== '0x') accountManager.process(fromAddress, blockHeader)
    if (ethers.utils.isAddress(fromEvmAddress) && fromEvmAddress !== ethers.constants.AddressZero) {
        const fromBalance = await new erc20.Contract(tokenAddress, provider).balanceOf(fromEvmAddress);
        tokenHolderManager.process(fromAddress, fromEvmAddress, BigInt(fromBalance.toString()), blockHeader.timestamp, tokenAddress, contract);
    }

    let denom = null;
    if (contract) {
        denom = (contract.contractData as ERC20Data).symbol;
    } else {
        denom = await new erc20.Contract(tokenAddress, provider).symbol();
    }

    const transferData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        toAddress: toAddress,
        fromAddress: fromAddress,
        tokenAddress: tokenAddress,
        toEvmAddress: toEvmAddress,
        fromEvmAddress: fromEvmAddress,
        type: TransferType.ERC20,
        amount: BigInt(value.toString()),
        success: true,
        timestamp: new Date(blockHeader.timestamp),
        denom: denom,
        nftId: null,
        errorMessage: '',
        feeAmount: 0n, // TODO
    };

    return transferData;
}