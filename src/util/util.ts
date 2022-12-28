import * as ss58 from "@subsquid/ss58"
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ethers } from "ethers";
import { ERC20Data } from "../interfaces/interfaces";
import { ctx } from "../processor";
import { EvmAccountsAccountsStorage } from "../types/storage";
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { BytesLike, Bytes } from '@ethersproject/bytes';

export const REEF_CONTRACT_ADDRESS = '0x0000000000000000000000000000000001000000';
export const REEF_DEFAULT_DATA: ERC20Data = {
    decimals: 18,
    symbol: 'REEF',
    name: 'Reef',
};

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

export const findNativeAddress = async (
    blockHeader: SubstrateBlock, 
    evmAddress: string
): Promise<string> => {
    if (!ethers.utils.isAddress(evmAddress) || evmAddress === ethers.constants.AddressZero) return '0x';

    const evmAddressBytes = ethers.utils.arrayify(evmAddress);
    const storage = new EvmAccountsAccountsStorage(ctx, blockHeader);

    if (!storage.isExists) {
        throw new Error("Account storage not found");
    } else if (storage.isV5) {
        const account = await storage.asV5.get(evmAddressBytes);
        return account ? ss58.codec('substrate').encode(account) : '0x';
    } else {
        throw new Error("Unknown storage version");
    }
}

export const toCamelCase = (input: string): string => {
    let result = "";
  
    for (let word of input.split("_")) {
      result += word[0].toUpperCase() + word.substring(1);
    }

    return result[0].toLowerCase() + result.substring(1);
}

const bufferToU8a = (buffer?: Buffer | number[] | null): Uint8Array => {
    return new Uint8Array(buffer || []);
}

type HexString = `0x${string}`;
const U8_TO_HEX = new Array<string>(256);
const U16_TO_HEX = new Array<string>(256 * 256);

for (let n = 0; n < 256; n++) {
    const hex = n.toString(16).padStart(2, '0');
    U8_TO_HEX[n] = hex;
}

for (let i = 0; i < 256; i++) {
    for (let j = 0; j < 256; j++) {
        const hex = U8_TO_HEX[i] + U8_TO_HEX[j];
        const n = (i * 256) + j;
        U16_TO_HEX[n] = hex;
    }
}

const hex = (value: Uint8Array): string => {
    const mod = value.length % 2;
    const length = value.length - mod;
    const dv = new DataView(value.buffer, value.byteOffset);
    let result = '';
  
    for (let i = 0; i < length; i += 2) {
      result += U16_TO_HEX[dv.getUint16(i)];
    }
  
    if (mod) {
      result += U8_TO_HEX[dv.getUint8(length)];
    }
  
    return result;
  }
  

const u8aToHex = (value?: Uint8Array | null, bitLength = -1, isPrefixed = true): HexString => {
    const length = Math.ceil(bitLength / 8);
  
    return `${isPrefixed ? '0x' : ''}${
      !value || !value.length
        ? ''
        : (length > 0 && value.length > length)
          ? `${hex(value.subarray(0, length / 2))}…${hex(value.subarray(value.length - length / 2))}`
          : hex(value)
    }` as HexString;
  }
  
export const bufferToString = (buffer: Buffer): string => {
    return u8aToHex(bufferToU8a(buffer));
}