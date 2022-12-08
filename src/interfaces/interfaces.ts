import { QualifiedName, SubstrateEvent, SubstrateExtrinsicSignature } from "@subsquid/substrate-processor"
// import { TransferType } from "../model";
// import { EvmEventStatus } from "../model/generated/_evmEventStatus";
// import { EvmEventType } from "../model/generated/_evmEventType";

export interface ContractData {
    id: string;
    signerAddress: string;
    bytecode: string;
    bytecodeContext: string;
    bytecodeArguments: string;
    gasLimit: number;
    storageLimit: number;
    timestamp: Date;
}

// export interface EvmEventData {
//     id: string;
//     blockId: string;
//     eventIndex: number;
//     contractAddress: string;
//     dataRaw: any;
//     dataParsed: any;
//     method: string;
//     type: EvmEventType;
//     status: EvmEventStatus;
//     topic0: string | undefined | null;
//     topic1: string | undefined | null;
//     topic2: string | undefined | null;
//     topic3: string | undefined | null;
// }

// export interface TransferData {
//     id: string;
//     blockId: string;
//     extrinsicId: string;
//     toAddress: string;
//     fromAddress: string;
//     tokenAddress: string;
//     toEvmAddress: string;
//     fromEvmAddress: string;
//     type: TransferType;
//     amount: bigint;
//     success: boolean;
//     timestamp: Date;
//     nftId: bigint | undefined | null;
//     errorMessage: string | undefined | null;
// };

export interface EvmLog {
    id: string
    indexInBlock: number
    name: QualifiedName
    args: any
    phase: SubstrateEvent["phase"]
    extrinsic: Extrinsic
    call: Call
    pos: number
}
  
export interface Extrinsic {
    id: string
    indexInBlock: number
    call: Call
    signature: SubstrateExtrinsicSignature
    version: number
    success: boolean
    hash: string
    pos: number
    error?: any
}
  
export interface Call {
    id: string
    name: QualifiedName
    args: any
    origin: CallOrigin
    pos: number
    success: boolean
    error?: any
}
  
export interface CallOrigin {
    __kind: string
    value: {__kind: string} & any
}
  