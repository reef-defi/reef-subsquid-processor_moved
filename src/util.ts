import * as ss58 from "@subsquid/ss58"
import { ethers } from "ethers";
import { provider } from "./processor";
import { DeriveBalancesAll, DeriveAccountRegistration } from "@polkadot/api-derive/types";
import { AccountData } from "./interfaces/interfaces";

export const REEF_CONTRACT_ADDRESS = '0x0000000000000000000000000000000001000000';

export const hexToNativeAddress = (address: string | undefined): string => {
    if (!address) return '';
    try {
        const buffer = Buffer.from(address.split('0x')[1], "hex");
        return ss58.codec('substrate').encode(new Uint8Array(buffer));
    } catch (error) {
        console.error("Error converting hex value to native address:", error);
        return '';
    }
}

export const toChecksumAddress = (address: string): string => ethers.utils.getAddress(address.trim().toLowerCase());

export const blockIdToHeight = (blockId: string): number => {
    return parseInt(blockId.split('-')[0]);
}

export const findNativeAddress = async (evmAddress: string): Promise<string> => {
    if (!ethers.utils.isAddress(evmAddress) || evmAddress === ethers.constants.AddressZero) return '0x';
    const address = await provider.api.query.evmAccounts.accounts(evmAddress);
    return address.toString();
};

export const getAccountData = async (address: string): Promise<AccountData> => {
    const [evmAddress, balances, identity] = await Promise.all([
        getEvmAddress(address),
        getBalances(address),
        getIdentity(address),
    ]);
    const evmNonce = await getEvmNonce(evmAddress);

    const accountData = {
        id: address,
        evmAddress: evmAddress,
        identity: JSON.stringify(identity),
        active: true,
        freeBalance: BigInt(balances.freeBalance.toString()),
        lockedBalance: BigInt(balances.lockedBalance.toString()),
        availableBalance: BigInt(balances.availableBalance.toString()),
        reservedBalance: BigInt(balances.reservedBalance.toString()),
        vestedBalance: BigInt(balances.vestingLocked.toString()),
        votingBalance: BigInt(balances.votingBalance.toString()),
        nonce: Number(balances.accountNonce),
        evmNonce: evmNonce,
    };

    return accountData;
}

export const getEvmAddress = async (address: string): Promise<string> => {
    return await provider.api.query.evm.accounts(address)
        .then((res): any => {
            const addr = res.toString();
            const evmAddr = addr !== '' ? toChecksumAddress(addr) : addr;
            return evmAddr;
        });
};

export const getBalances = async (address: string): Promise<DeriveBalancesAll> => {
    return await provider.api.derive.balances.all(address);
};

export const getIdentity = async (address: string): Promise<DeriveAccountRegistration> => {
    return await provider.api.derive.accounts.identity(address);
};

export const getEvmNonce = async (evmAddress: string): Promise<number> => {
    if (evmAddress === '') return 0;
    return await provider.api.query.evm.accounts(evmAddress)
        .then((res): any => res.toJSON())
        .then((res) => res?.nonce || 0);
};