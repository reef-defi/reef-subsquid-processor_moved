import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { EventRaw, TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import { getErrorMessage, hexToNativeAddress } from "../../util/util";

export const processNativeTransfer = async (
    eventRaw: EventRaw, 
    blockHeader: SubstrateBlock,
    contract: VerifiedContract,
    feeAmount: bigint,
    accountManager: AccountManager
): Promise<TransferData> => {
    const from = hexToNativeAddress(eventRaw.args[0]);
    const to = hexToNativeAddress(eventRaw.args[1]);
    const amount = eventRaw.args[2];

    const fromAccountData = await accountManager.process(from, blockHeader);
    const toAccountData = await accountManager.process(to, blockHeader);

    let errorMessage = "";
    if (eventRaw.extrinsic.error) {
        const section = eventRaw.extrinsic.call.name.split(".")[0];
        errorMessage = getErrorMessage(eventRaw.extrinsic.error, section);
    }

    const transferData = {
        id: eventRaw.id,
        blockId: blockHeader.id,
        extrinsicId: eventRaw.extrinsic.id,
        fromAddress: from,
        toAddress: to,
        token: contract,
        fromEvmAddress: fromAccountData.evmAddress,
        toEvmAddress: toAccountData.evmAddress,
        type: TransferType.Native,
        amount: BigInt(amount),
        success: eventRaw.extrinsic.success,
        timestamp: new Date(blockHeader.timestamp),
        denom: 'REEF',
        nftId: null,
        errorMessage: errorMessage,
        feeAmount: feeAmount
    };

    return transferData;
}