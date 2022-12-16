import { Provider } from '@reef-defi/evm-provider'
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


export class ContractBase {
    readonly ethersContract?: ethers.Contract
    readonly address: string

    constructor(address: string, provider: Provider, abi: ethers.utils.Interface) {
        this.address = ethers.utils.getAddress(address)
        if (provider) {
          this.ethersContract = new ethers.Contract(
            this.address,
            abi,
            provider as any
          );
        }
    }
}
