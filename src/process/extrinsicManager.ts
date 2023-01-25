import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ExtrinsicData, ExtrinsicRaw } from "../interfaces/interfaces";
import { Block, Extrinsic, ExtrinsicStatus, ExtrinsicType } from "../model";
import { ctx } from "../processor";
import { fetchSpec, hexToNativeAddress, toCamelCase } from "../util/util";
import {
    encodeExtrinsic,
} from "@subsquid/substrate-metadata"

export class ExtrinsicManager {  
    extrinsicsData: Map<string, ExtrinsicData> = new Map();
  
    async process(extrinsicRaw: ExtrinsicRaw, blockHeader: SubstrateBlock) {
        if (this.extrinsicsData.has(extrinsicRaw.id)) return;
        const spec = await fetchSpec(blockHeader);

        let signer = null;
        if (extrinsicRaw.signature?.address?.value) {
            signer = hexToNativeAddress(extrinsicRaw.signature.address.value);
            // TODO: get fee and fee details
            // const encodedExtrinsic = encodeExtrinsic(extrinsicRaw, spec.description, spec.scaleCodec);
            // const info = await ctx._chain.client.call('payment_queryInfo', [extrinsicRaw]);
            // const feeDetails = await ctx._chain.client.call('payment_queryFeeDetails', [extrinsicRaw]);
        }

        const extrinsicData = {
            id: extrinsicRaw.id,
            blockId: blockHeader.id,
            index: extrinsicRaw.indexInBlock,
            hash: extrinsicRaw.hash,
            args: extrinsicRaw.call.args ? Object.keys(extrinsicRaw.call.args).map(key => extrinsicRaw.call.args[key]) : [],
            docs: spec.calls.definitions[extrinsicRaw.call.name].docs,
            method: toCamelCase(extrinsicRaw.call.name.split(".")[1]),
            section: extrinsicRaw.call.name.split(".")[0],
            signer: signer || "",
            status: extrinsicRaw.success ? ExtrinsicStatus.success : ExtrinsicStatus.error,
            errorMessage: extrinsicRaw.error || "", // TODO: decode error
            type: signer ? ExtrinsicType.signed : ExtrinsicType.unsigned,
            signedData: null, // TODO,
            timestamp: new Date(blockHeader.timestamp),
        };

        this.extrinsicsData.set(extrinsicData.id, extrinsicData);
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

  