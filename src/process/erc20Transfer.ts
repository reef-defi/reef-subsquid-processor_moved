import { EventRaw, TokenHolderData, TransferData } from "../interfaces/interfaces";
import { TokenHolderType, TransferType } from "../model";
import * as erc20 from "../abi/ERC20";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { findNativeAddress, REEF_CONTRACT_ADDRESS, toChecksumAddress } from "../util";
import { AccountManager } from "../accountManager";

export const processErc20Transfer = async (
    eventRaw: EventRaw, 
    blockHeader: SubstrateBlock,
    accountManager: AccountManager
): Promise<TransferData | undefined> => {
    const tokenAddress = toChecksumAddress(eventRaw.args.address);
    if (tokenAddress === REEF_CONTRACT_ADDRESS) return;
    
    const [from, to, value] = erc20.events.Transfer.decode(eventRaw.args.log || eventRaw.args);
    
    const toAddress = await findNativeAddress(to);
    const toEvmAddress = toChecksumAddress(to);
    const toIsContract = toAddress === '0x';
    if (!toIsContract) accountManager.process(toAddress, blockHeader);

    const fromAddress = await findNativeAddress(from);
    const fromEvmAddress = toChecksumAddress(from);
    const fromIsContract = fromAddress === '0x';
    if (!fromIsContract) accountManager.process(fromAddress, blockHeader);

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
        nftId: null,
        errorMessage: '',
        feeAmount: undefined, // TODO
    };

    return transferData;
}