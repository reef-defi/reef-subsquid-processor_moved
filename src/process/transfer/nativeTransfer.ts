import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { EventRaw, TransferData } from "../../interfaces/interfaces";
import { TransferType } from "../../model";
import { hexToNativeAddress, REEF_CONTRACT_ADDRESS } from "../../util";

export const processNativeTransfer = async (
    eventRaw: EventRaw, 
    blockHeader: SubstrateBlock, 
    accountManager: AccountManager
): Promise<TransferData> => {
    const to = hexToNativeAddress(eventRaw.args[0]);
    const from = hexToNativeAddress(eventRaw.args[1]);
    const amount = eventRaw.args[2];

    const toAccountData = await accountManager.process(to, blockHeader);
    const fromAccountData = await accountManager.process(from, blockHeader);

    const transferData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        toAddress: to,
        fromAddress: from,
        tokenAddress: REEF_CONTRACT_ADDRESS,
        toEvmAddress: toAccountData.evmAddress,
        fromEvmAddress: fromAccountData.evmAddress,
        type: TransferType.Native,
        amount: BigInt(amount),
        success: eventRaw.extrinsic.success,
        timestamp: new Date(blockHeader.timestamp),
        nftId: null,
        errorMessage: eventRaw.extrinsic.success ? '' : '', // TODO get error message
        feeAmount: 0n, // TODO
    };

    return transferData;
}