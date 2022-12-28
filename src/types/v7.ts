import type {Result, Option} from './support'

export interface EvmAccountInfo {
    nonce: number
    contractInfo: (EvmContractInfo | undefined)
    developerDeposit: (bigint | undefined)
}

export interface EvmContractInfo {
    codeHash: Uint8Array
    maintainer: Uint8Array
    deployed: boolean
}
