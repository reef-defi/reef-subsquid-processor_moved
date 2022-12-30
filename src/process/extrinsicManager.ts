import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ExtrinsicData, ExtrinsicRaw } from "../interfaces/interfaces";
import { Block, Extrinsic, ExtrinsicStatus, ExtrinsicType } from "../model";
import { ctx } from "../processor";
import { hexToNativeAddress, toCamelCase } from "../util/util";

export class ExtrinsicManager {  
    extrinsicsData: Map<string, ExtrinsicData> = new Map();
  
    process(extrinsicRaw: ExtrinsicRaw, blockHeader: SubstrateBlock) {
        if (this.extrinsicsData.has(extrinsicRaw.id)) return;

        let signer = null;
        if (extrinsicRaw.signature?.address?.value) {
            signer = hexToNativeAddress(extrinsicRaw.signature.address.value);
            // TODO: get fee and fee details
            // rpc.payment.queryInfo(extrinsicRaw.hash);
            // rpc.payment.queryFeeDetails(extrinsicRaw.hash);
        }

        const extrinsicData = {
            id: extrinsicRaw.id,
            blockId: blockHeader.id,
            index: extrinsicRaw.indexInBlock,
            hash: extrinsicRaw.hash,
            args: extrinsicRaw.call.args ? Object.keys(extrinsicRaw.call.args).map(key => extrinsicRaw.call.args[key]) : [],
            docs: "", // TODO
            method: toCamelCase(extrinsicRaw.call.name.split(".")[1]),
            section: extrinsicRaw.call.name.split(".")[0],
            signer: signer || "",
            status: extrinsicRaw.success ? ExtrinsicStatus.success : ExtrinsicStatus.error,
            errorMessage: extrinsicRaw.error || "",
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
            if (!block) throw new Error(`Block ${extrinsicData.blockId} not found`); // TODO: handle this error
            
            extrinsics.set(extrinsicData.id, new Extrinsic ({
                ...extrinsicData,
                block: block
            }));
        });
    
        await ctx.store.insert([...extrinsics.values()]);
    
        return extrinsics;
    }
}

  