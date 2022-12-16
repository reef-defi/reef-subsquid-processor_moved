import { QualifiedName, SubstrateEvent, SubstrateExtrinsicSignature } from "@subsquid/substrate-processor"
import { ExtrinsicStatus, ExtrinsicType } from "../model"
export interface ExtrinsicData {
    id: string,
    blockId: string,
    index: number,
    hash: string,
    args: any,
    docs: string,
    method: string,
    section: string,
    signer: string,
    status: ExtrinsicStatus,
    errorMessage: string | undefined | null,
    type: ExtrinsicType,
    signedData: unknown | undefined | null,
    timestamp: Date
}


export interface EventData {
    id: string,
    blockId: string,
    extrinsicId: string,
    index: number,
    phase: string,
    section: string,
    method: string,
    data: any,
    timestamp: Date
}

export interface AccountData {
    id: string; // native address
    evmAddress: string;
    blockId: string;
    identity: any;
    active: boolean;
    freeBalance: bigint;
    lockedBalance: bigint;
    availableBalance: bigint;
    reservedBalance: bigint;
    vestedBalance: bigint;
    votingBalance: bigint;
    nonce: number;
    evmNonce: number;
    timestamp: Date;
    blockHeight: number;
}

export interface ContractData {
    id: string;
    signerAddress: string;
    extrinsicId: string;
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
  
export interface ExtrinsicRaw {
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

export interface EventRaw {
    id: string
    indexInBlock: number
    extrinsic: ExtrinsicRaw
    phase: SubstrateEvent["phase"]
    name: QualifiedName
    args: any
    pos: number
    call?: Call
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
  