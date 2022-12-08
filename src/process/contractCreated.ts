// import { ContractData, EvmLog } from "../interfaces/interfaces";
// import { SubstrateBlock } from "@subsquid/substrate-processor";
// import { hexToNativeAddress, toChecksumAddress } from "../util";

// export const processContractCreated = async (event: EvmLog, blockHeader: SubstrateBlock): Promise<ContractData> => {
    
//     const bytecode = event.call.args.init;
//     const { context, args } = preprocessBytecode(bytecode);

//     return {
//         id: toChecksumAddress(event.args),
//         signerAddress: hexToNativeAddress(event.extrinsic.signature.address.value),
//         bytecode: bytecode,
//         bytecodeContext: context,
//         bytecodeArguments: args,
//         gasLimit: event.call.args.gasLimit,
//         storageLimit: event.call.args.storageLimit,
//         timestamp: new Date(blockHeader.timestamp)
//     };
// }

// const preprocessBytecode = (bytecode: string) => {
//     const start = bytecode.indexOf('6080604052');
//     const end = bytecode.indexOf('a265627a7a72315820') !== -1
//         ? bytecode.indexOf('a265627a7a72315820')
//         : bytecode.indexOf('a264697066735822');
//     return {
//         context: bytecode.slice(start, end),
//         args: bytecode.slice(end),
//     };
// }