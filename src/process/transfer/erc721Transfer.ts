import { EventRaw, ERC721Data, TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import * as erc721 from "../../abi/ERC721";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress, toChecksumAddress } from "../../util";
import { provider } from "../../processor";
import { TokenHolderManager } from "../tokenHolderManager";
import { ethers } from "ethers";
import { AccountManager } from "../accountManager";

export const processErc721Transfer = async (
    eventRaw: EventRaw,
    blockHeader: SubstrateBlock,
    contract: VerifiedContract | undefined,
    accountManager: AccountManager,
    tokenHolderManager: TokenHolderManager
): Promise<TransferData> => {
    const tokenAddress = toChecksumAddress(eventRaw.args.address);
    const [from, to, tokenId ] = erc721.events.Transfer.decode(eventRaw.args.log || eventRaw.args);

    const toAddress = await findNativeAddress(to);
    const toEvmAddress = toChecksumAddress(to);
    if (toAddress !== '0x') accountManager.process(toAddress, blockHeader);
    if (ethers.utils.isAddress(toEvmAddress) && toEvmAddress !== ethers.constants.AddressZero) {
        const toBalance = await new erc721.Contract(tokenAddress, provider).balanceOf(toEvmAddress);
        tokenHolderManager.process(toAddress, toEvmAddress, BigInt(toBalance.toString()), blockHeader.timestamp, tokenAddress, contract, Number(tokenId));
    }
        
    const fromAddress = await findNativeAddress(from);
    const fromEvmAddress = toChecksumAddress(from);
    if (fromAddress !== '0x') accountManager.process(fromAddress, blockHeader)
    if (ethers.utils.isAddress(fromEvmAddress) && fromEvmAddress !== ethers.constants.AddressZero) {
        const fromBalance = await new erc721.Contract(tokenAddress, provider).balanceOf(fromEvmAddress);
        tokenHolderManager.process(fromAddress, fromEvmAddress, BigInt(fromBalance.toString()), blockHeader.timestamp, tokenAddress, contract, Number(tokenId));
    }

    let denom = null;
    if (contract) {
        denom = (contract.contractData as ERC721Data).symbol;
    } else {
        denom = await new erc721.Contract(tokenAddress, provider).symbol();
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
        type: TransferType.ERC721,
        amount: BigInt('1'),
        success: true,
        timestamp: new Date(blockHeader.timestamp),
        denom: denom,
        nftId: BigInt(tokenId.toString()),
        errorMessage: '',
        feeAmount: 0n, // TODO
    };

    return transferData;
}