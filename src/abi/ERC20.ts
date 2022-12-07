import { Provider } from '@reef-defi/evm-provider';
import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ERC20.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, value: ethers.BigNumber] & {owner: string, spender: string, value: ethers.BigNumber})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: ethers.BigNumber] & {from: string, to: string, value: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    allowance: new Func<[owner: string, spender: string], {owner: string, spender: string}, ethers.BigNumber>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, amount: ethers.BigNumber], {spender: string, amount: ethers.BigNumber}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[account: string], {account: string}, ethers.BigNumber>(
        abi, '0x70a08231'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    decreaseAllowance: new Func<[spender: string, subtractedValue: ethers.BigNumber], {spender: string, subtractedValue: ethers.BigNumber}, boolean>(
        abi, '0xa457c2d7'
    ),
    increaseAllowance: new Func<[spender: string, addedValue: ethers.BigNumber], {spender: string, addedValue: ethers.BigNumber}, boolean>(
        abi, '0x39509351'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    totalSupply: new Func<[], {}, ethers.BigNumber>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[recipient: string, amount: ethers.BigNumber], {recipient: string, amount: ethers.BigNumber}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[sender: string, recipient: string, amount: ethers.BigNumber], {sender: string, recipient: string, amount: ethers.BigNumber}, boolean>(
        abi, '0x23b872dd'
    ),
}

export class Contract extends ContractBase {

    constructor(address: string, provider: Provider) {
        super(address, provider, abi);
    }

    allowance(owner: string, spender: string): Promise<ethers.BigNumber> {
        if (!this.ethersContract) throw new Error('Contract not initialized');
        return this.ethersContract['allowance']([owner, spender]);
    }

    balanceOf(account: string): Promise<ethers.BigNumber> {
        if (!this.ethersContract) throw new Error('Contract not initialized');
        return this.ethersContract['balanceOf']([account]);
    }

    decimals(): Promise<number> {
        if (!this.ethersContract) throw new Error('Contract not initialized');
        return this.ethersContract['decimals']([]);
    }

    name(): Promise<string> {
        if (!this.ethersContract) throw new Error('Contract not initialized');
        return this.ethersContract['name']([]);
    }

    symbol(): Promise<string> {
        if (!this.ethersContract) throw new Error('Contract not initialized');
        return this.ethersContract['symbol']([]);
    }

    totalSupply(): Promise<ethers.BigNumber> {
        if (!this.ethersContract) throw new Error('Contract not initialized');
        return this.ethersContract['totalSupply']([]);
    }
}
