import * as ss58 from "@subsquid/ss58"
import { ethers } from "ethers";
import { provider } from "./processor";

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

export const blockIdToHeight = (blockId: string): number => {
    return parseInt(blockId.split('-')[0]);
}

export const findNativeAddress = async (evmAddress: string): Promise<string> => {
    if (!ethers.utils.isAddress(evmAddress) || evmAddress === ethers.constants.AddressZero) return '0x';
    const address = await provider.api.query.evmAccounts.accounts(evmAddress);
    return address.toString();
};