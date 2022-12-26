import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { EventRaw, TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import { hexToNativeAddress } from "../../util";

export const processNativeTransfer = async (
    eventRaw: EventRaw, 
    blockHeader: SubstrateBlock,
    contract: VerifiedContract,
    accountManager: AccountManager
): Promise<TransferData> => {
    const from = hexToNativeAddress(eventRaw.args[0]);
    const to = hexToNativeAddress(eventRaw.args[1]);
    const amount = eventRaw.args[2];

    const fromAccountData = await accountManager.process(from, blockHeader);
    const toAccountData = await accountManager.process(to, blockHeader);

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
        errorMessage: eventRaw.extrinsic.success ? '' : '', // TODO get error message
        feeAmount: 0n, // TODO
    };

    return transferData;
}