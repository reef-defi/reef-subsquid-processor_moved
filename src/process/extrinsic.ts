import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ExtrinsicRaw } from "../interfaces/interfaces";
import { Extrinsic, ExtrinsicStatus, ExtrinsicType } from "../model";
import { provider } from "../processor";
import { hexToNativeAddress, toCamelCase } from "../util";

export const processExtrinsic = (extrinsicRaw: ExtrinsicRaw, blockHeader: SubstrateBlock): Extrinsic => {
    let signer = null;
    if (extrinsicRaw.signature?.address?.value) {
        signer = hexToNativeAddress(extrinsicRaw.signature.address.value);
        // const fee = await provider.api.rpc.payment.queryInfo(extrinsicRaw.hash);
        // console.log(fee.toJSON());
        // const feeDetails = await provider.api.rpc.payment.queryFeeDetails(extrinsicRaw.hash);
        // console.log(feeDetails.toJSON());
    }

    const extrinsic = new Extrinsic({
        id: extrinsicRaw.id,
        blockHeight: blockHeader.height,
        index: extrinsicRaw.indexInBlock, // ?
        hash: extrinsicRaw.hash,
        args: extrinsicRaw.call.args ? Object.keys(extrinsicRaw.call.args).map(key => extrinsicRaw.call.args[key]) : [],
        docs: "", // TODO
        method: toCamelCase(extrinsicRaw.call.name.split(".")[1]),
        section: extrinsicRaw.call.name.split(".")[0].toLowerCase(),
        signer: signer || "",
        status: extrinsicRaw.success ? ExtrinsicStatus.success : ExtrinsicStatus.error,
        errorMessage: extrinsicRaw.error || "",
        type: signer ? ExtrinsicType.signed : ExtrinsicType.unsigned,
        signedData: null, // TODO,
        timestamp: new Date(blockHeader.timestamp),
    });

    return extrinsic;
}