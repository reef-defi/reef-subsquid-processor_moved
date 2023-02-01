import { encodeExtrinsic, ExtrinsicSignature } from '@subsquid/substrate-metadata'
import { SubstrateExtrinsic, toHex } from '@subsquid/substrate-processor'
import { ctx } from '../processor'

/**
 * Encode "archived" extrinsic back to hex from SubstrateBatchProcessor mapping handler
 */
const encodeSubstrateExtrinsic = (ex: SubstrateExtrinsic): string => {
    let {scaleCodec, jsonCodec} = (ctx._chain as any)

    let signature: ExtrinsicSignature | undefined
    if (ex.signature) {
        signature = jsonCodec.decode(ctx._chain.description.signature, ex.signature)
    }

    let [pallet, callName] = ex.call.name.split('.')

    let call = jsonCodec.decode(ctx._chain.description.call, {
        __kind: pallet,
        value: {
            ...ex.call.args,
            __kind: callName
        }
    })

    let bytes = encodeExtrinsic(
        {
            version: ex.version,
            signature,
            call
        },
        ctx._chain.description,
        scaleCodec
    )

    return toHex(bytes)
}


/**
 * Check out https://github.com/paritytech/substrate-api-sidecar/blob/a0f7d7800fe639eef95906bbd5c0315b277a48f1/src/services/blocks/BlocksService.ts#L265
 * for how to use functions below to correctly calculate actual extrinsic fee.
 *
 * Note, that when TransactionPayment.TransactionFeePaid event is available,
 * fee info will be already filled on SubstrateExtrinsic.
 */
export const getFeeDetails = async (ex: SubstrateExtrinsic, parentBlockHash: string): Promise<any> => {
    return ctx._chain.client.call('payment_queryFeeDetails', [
        encodeSubstrateExtrinsic(ex),
        parentBlockHash
    ])
}


export const getPaymentInfo = async (ex: SubstrateExtrinsic, parentBlockHash: string): Promise<any> => {
    return ctx._chain.client.call('payment_queryInfo', [
        encodeSubstrateExtrinsic(ex),
        parentBlockHash
    ])
}