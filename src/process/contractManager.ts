import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ContractData, EventRaw } from "../interfaces/interfaces";
import { Account, Contract, Extrinsic } from "../model";
import { ctx } from "../processor";
import { hexToNativeAddress, toChecksumAddress } from "../util/util";

export class ContractManager {  
    contractsData: ContractData[] = [];
  
    async process(eventRaw: EventRaw, blockHeader: SubstrateBlock) {
        // TODO: manage created by another contract
        if (eventRaw.call?.name !== 'EVM.create') return;

        const address = typeof eventRaw.args === 'string'
            ? toChecksumAddress(eventRaw.args) // v8
            : toChecksumAddress(eventRaw.args[1]); // v9

        // TODO: check why we are getting duplicates
        if (this.contractsData.find(c => c.id === address)) return;
        const existingContract = await ctx.store.get(Contract, address);
        if (existingContract) return;

        const bytecode = eventRaw.call.args.init;
        const { context, args } = this.preprocessBytecode(bytecode);
    
        const contractData = {
            id: toChecksumAddress(address),
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
  
    async save(accounts: Map<string, Account>, extrinsics: Map<string, Extrinsic>): Promise<void> {
        const contracts: Contract[] = [];

        // TODO: process in parallel
        for (const contractData of this.contractsData) {
            // Search signer account in cached accounts
            let signer = accounts.get(contractData.signerAddress);
            if (!signer) {
                // If not found, query the database
                signer = await ctx.store.get(Account, contractData.signerAddress);
                if (!signer) {
                    ctx.log.error(`ERROR saving contract: Account ${contractData.signerAddress} not found`);
                    continue
                }
            }
    
            const extrinsic = extrinsics.get(contractData.extrinsicId);
            if (!extrinsic) {
                ctx.log.error(`ERROR saving contract: Extrinsic ${contractData.extrinsicId} not found`);
                continue;
            }
            
            contracts.push(new Contract ({
                ...contractData,
                signer: signer,
                extrinsic: extrinsic
            }));
        };
    
        await ctx.store.insert(contracts);
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
