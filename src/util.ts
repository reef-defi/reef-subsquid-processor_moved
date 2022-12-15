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

export const toChecksumAddress = (address: string): string => ethers.utils.getAddress(address.trim().toLowerCase());

export const blockIdToHeight = (blockId: string): number => {
    return parseInt(blockId.split('-')[0]);
}

export const findNativeAddress = async (evmAddress: string): Promise<string> => {
    if (!ethers.utils.isAddress(evmAddress) || evmAddress === ethers.constants.AddressZero) return '0x';
    const address = await provider.api.query.evmAccounts.accounts(evmAddress);
    return address.toString();
};

export const toCamelCase = (input: string): string => {
    let result = "";
  
    for (let word of input.split("_")) {
      result += word[0].toUpperCase() + word.substring(1);
    }

    return result[0].toLowerCase() + result.substring(1);
  }