import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { ContractData, EventRaw } from "../interfaces/interfaces";
import { Account, Contract, Extrinsic } from "../model";
import { hexToNativeAddress, toChecksumAddress } from "../util";

export class ContractManager {  
    contractsData: ContractData[] = [];
  
    process(eventRaw: EventRaw, blockHeader: SubstrateBlock) {
        const bytecode = eventRaw.call!.args.init;
        const { context, args } = this.preprocessBytecode(bytecode);
    
        const contractData = {
            id: toChecksumAddress(eventRaw.args),
            extrinsicId: eventRaw.extrinsic.id,
            signerAddress: hexToNativeAddress(eventRaw.extrinsic.signature.address.value),
            bytecode: bytecode,
            bytecodeContext: context,
            bytecodeArguments: args,
            gasLimit: eventRaw.call!.args.gasLimit,
            storageLimit: eventRaw.call!.args.storageLimit,
            timestamp: new Date(blockHeader.timestamp)
        };

        this.contractsData.push(contractData);
    }
  
    async save(accounts: Map<string, Account>, extrinsics: Map<string, Extrinsic>, store: Store): Promise<void> {
        const contracts: Contract[] = [];

        // TODO: process in parallel
        for (const contractData of this.contractsData) {
            // Search signer account in cached accounts
            let signer = accounts.get(contractData.signerAddress);
            if (!signer) {
                // If not found, query the database
                signer = await store.get(Account, contractData.signerAddress);
                if (!signer) throw new Error(`Account ${contractData.signerAddress} not found`); // TODO: handle this error
            }
    
            const extrinsic = extrinsics.get(contractData.extrinsicId);
            if (!extrinsic) throw new Error(`Extrinsic ${contractData.extrinsicId} not found`); // TODO: handle this error
            
            contracts.push(new Contract ({
                ...contractData,
                signer: signer,
                extrinsic: extrinsic
            }));
        };
    
        await store.insert(contracts);
    }

    private preprocessBytecode(bytecode: string) {
        const start = bytecode.indexOf('6080604052');
        const end = bytecode.indexOf('a265627a7a72315820') !== -1
            ? bytecode.indexOf('a265627a7a72315820')
            : bytecode.indexOf('a264697066735822');
        return {
            context: bytecode.slice(start, end),
            args: bytecode.slice(end),
        };
    }
}
