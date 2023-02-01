import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ExtrinsicData, ExtrinsicRaw } from "../interfaces/interfaces";
import { Block, Extrinsic, ExtrinsicStatus, ExtrinsicType } from "../model";
import { ctx } from "../processor";
import { getFeeDetails, getPaymentInfo } from "../util/extrinsic";
import { getErrorMessage, hexToNativeAddress, toCamelCase } from "../util/util";
import * as eac from '@subsquid/substrate-metadata/lib/events-and-calls'

export class ExtrinsicManager {  
    extrinsicsData: Map<string, ExtrinsicData> = new Map();
  
    async process(extrinsicRaw: ExtrinsicRaw, blockHeader: SubstrateBlock): Promise<bigint> {
        if (this.extrinsicsData.has(extrinsicRaw.id)) return BigInt(0);

        let signer = "";
        let signedData = null;
        if (extrinsicRaw.signature?.address?.value) {
            signer = hexToNativeAddress(extrinsicRaw.signature.address.value);
            const [fee, feeDetails] = await Promise.all([
                getPaymentInfo(extrinsicRaw, blockHeader.parentHash),
                getFeeDetails(extrinsicRaw, blockHeader.parentHash)
            ]);
            fee.partialFee = fee.partialFee && BigInt(fee.partialFee) || BigInt(0);
            feeDetails.inclusionFee.baseFee = feeDetails.inclusionFee?.baseFee && BigInt(feeDetails.inclusionFee.baseFee) || BigInt(0);
            feeDetails.inclusionFee.lenFee = feeDetails.inclusionFee?.lenFee && BigInt(feeDetails.inclusionFee.lenFee) || BigInt(0);
            feeDetails.inclusionFee.adjustedWeightFee = feeDetails.inclusionFee?.adjustedWeightFee && BigInt(feeDetails.inclusionFee.adjustedWeightFee) || BigInt(0);
            signedData = { fee, feeDetails };
        }
            
        const section = extrinsicRaw.call.name.split(".")[0];
        let errorMessage = "";
        if (extrinsicRaw.error) {
            errorMessage = getErrorMessage(extrinsicRaw.error, section);
        }

        const calls = new eac.Registry(ctx._chain.description.types, ctx._chain.description.call);

        const extrinsicData = {
            id: extrinsicRaw.id,
            blockId: blockHeader.id,
            index: extrinsicRaw.indexInBlock,
            hash: extrinsicRaw.hash,
            args: extrinsicRaw.call.args ? Object.keys(extrinsicRaw.call.args).map(key => extrinsicRaw.call.args[key]) : [],
            docs: calls.definitions[extrinsicRaw.call.name].docs?.toString() || "",
            method: toCamelCase(extrinsicRaw.call.name.split(".")[1]),
            section: section,
            signer: signer,
            status: extrinsicRaw.success ? ExtrinsicStatus.success : ExtrinsicStatus.error,
            errorMessage: errorMessage,
            type: signer ? ExtrinsicType.signed : ExtrinsicType.unsigned,
            signedData: signedData,
            timestamp: new Date(blockHeader.timestamp),
        };

        this.extrinsicsData.set(extrinsicData.id, extrinsicData);

        return extrinsicData.signedData?.fee.partialFee || BigInt(0);
    }
  
    async save(blocks: Map<string, Block>): Promise<Map<string, Extrinsic>> {
        const extrinsics: Map<string, Extrinsic> = new Map();
        
        this.extrinsicsData.forEach(extrinsicData => {
            const block = blocks.get(extrinsicData.blockId);
            if (!block) {
                ctx.log.error(`ERROR saving extrinsic: Block ${extrinsicData.blockId} not found`);
                return;
            }
            
            extrinsics.set(extrinsicData.id, new Extrinsic ({
                ...extrinsicData,
                block: block
            }));
        });
    
        await ctx.store.insert([...extrinsics.values()]);
    
        return extrinsics;
    }
}

  