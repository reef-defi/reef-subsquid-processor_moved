import * as ethers from 'ethers'


export interface LogRecord {
    topics: string[]
    data: string
}


export class LogEvent<Args> {
    private fragment: ethers.utils.EventFragment

    constructor(private abi: ethers.utils.Interface, public readonly topic: string) {
        this.fragment = abi.getEvent(topic)
    }

    decode(rec: LogRecord): Args {
        return this.abi.decodeEventLog(this.fragment, rec.data, rec.topics) as any as Args
    }
}


export class Func<Args extends any[], FieldArgs, Result> {
    private fragment: ethers.utils.FunctionFragment

    constructor(private abi: ethers.utils.Interface, public readonly sighash: string) {
        this.fragment = abi.getFunction(sighash)
    }

    decode(input: ethers.utils.BytesLike): Args & FieldArgs {
        return this.abi.decodeFunctionData(this.fragment, input) as any as Args & FieldArgs
    }

    encode(args: Args): string {
        return this.abi.encodeFunctionData(this.fragment, args)
    }

    decodeResult(output: ethers.utils.BytesLike): Result {
        const decoded = this.abi.decodeFunctionResult(this.fragment, output)
        return decoded.length > 1 ? decoded : decoded[0]
    }

    tryDecodeResult(output: ethers.utils.BytesLike): Result | undefined {
        try {
            return this.decodeResult(output)
        } catch(err: any) {
            return undefined
        }
    }
}


export function isFunctionResultDecodingError(val: unknown): val is Error & {data: string} {
    if (!(val instanceof Error)) return false
    let err = val as any
    return err.code == 'CALL_EXCEPTION'
        && typeof err.data == 'string'
        && !err.errorArgs
        && !err.errorName
}


export interface ChainContext  {
    _chain: Chain
}


export interface BlockContext  {
    _chain: Chain
    block: Block
}


export interface Block  {
    hash: string
}


export interface Chain  {
    client:  {
        call: <T=any>(method: string, params?: unknown[]) => Promise<T>
    }
}


export class ContractBase {
    private readonly _chain: Chain
    private readonly blockHash: string
    readonly address: string

    constructor(ctx: BlockContext, address: string)
    constructor(ctx: ChainContext, block: Block, address: string)
    constructor(ctx: BlockContext, blockOrAddress: Block | string, address?: string) {
        this._chain = ctx._chain
        if (typeof blockOrAddress === 'string')  {
            this.blockHash = ctx.block.hash
            this.address = ethers.utils.getAddress(blockOrAddress)
        } else  {
            if (address == null) {
                throw new Error('missing contract address')
            }
            this.blockHash = blockOrAddress.hash
            this.address = ethers.utils.getAddress(address)
        }
    }

    async eth_call<Args extends any[], FieldArgs, Result>(func: Func<Args, FieldArgs, Result>, args: Args): Promise<Result> {
        let data = func.encode(args)
        let result = await this._chain.client.call('evm_call', [
            {to: this.address, data, from: undefined, storageLimit: 0}
        ])
        return func.decodeResult(result)
    }
}
