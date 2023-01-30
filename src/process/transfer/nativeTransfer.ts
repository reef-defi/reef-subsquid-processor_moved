import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { EventRaw, TransferData } from "../../interfaces/interfaces";
import { TransferType, VerifiedContract } from "../../model";
import { fetchSpec, hexToNativeAddress, MetadataModule } from "../../util/util";

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

    let errorMessage = "";
    if (eventRaw.extrinsic.error) {
        const spec = await fetchSpec(blockHeader);
        const section = eventRaw.extrinsic.call.name.split(".")[0];
        const module: MetadataModule = spec.modules.find((module: MetadataModule) => module.name === section);
        const error = module?.errors ? module.errors[eventRaw.extrinsic.error.value.error as number] : null;
        errorMessage = error ? `${section}.${error.name}:${error.docs}` : "";
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
        feeAmount: 0n, // TODO: data
    };

    return transferData;
}