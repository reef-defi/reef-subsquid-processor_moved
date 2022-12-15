// import { EventRaw } from "../interfaces/interfaces";
// import { SubstrateBlock } from "@subsquid/substrate-processor";
// import { hexToNativeAddress, toChecksumAddress } from "../util";
// import { Contract } from "../model";

// export const processContractCreated = (eventRaw: EventRaw, blockHeader: SubstrateBlock): Contract => {
    
//     const bytecode = eventRaw.call!.args.init;
//     const { context, args } = preprocessBytecode(bytecode);

//     const contract = new Contract({
//         id: toChecksumAddress(eventRaw.args),
//         extrinsicId: eventRaw.extrinsic.id,
//         signer: hexToNativeAddress(eventRaw.extrinsic.signature.address.value),
//         bytecode: bytecode,
//         bytecodeContext: context,
//         bytecodeArguments: args,
//         gasLimit: eventRaw.call!.args.gasLimit,
//         storageLimit: eventRaw.call!.args.storageLimit,
//         timestamp: new Date(blockHeader.timestamp)
//     });

//     return contract;
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