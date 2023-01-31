import * as ss58 from "@subsquid/ss58"
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ethers } from "ethers";
import { ERC20Data, IdentityData } from "../interfaces/interfaces";
import { ctx, modules } from "../processor";
import { EvmAccountsAccountsStorage } from "../types/storage";
import {
  decodeMetadata,
  ModuleMetadataV9,
  ModuleMetadataV10,
  ModuleMetadataV11,
  ModuleMetadataV12,
  ModuleMetadataV13
} from '@subsquid/substrate-metadata'
import { Data_Raw5, Registration } from "../types/v5";

export const REEF_CONTRACT_ADDRESS = '0x0000000000000000000000000000000001000000';
export const REEF_DEFAULT_DATA: ERC20Data = {
    decimals: 18,
    symbol: 'REEF',
    name: 'Reef',
};

export const hexToNativeAddress = (address: string | undefined): string => {
    if (!address) return '0x';
    try {
        const buffer = Buffer.from(address.split('0x')[1], "hex");
        return ss58.codec('substrate').encode(new Uint8Array(buffer));
    } catch (error) {
        console.error("Error converting hex value to native address:", error);
        return '0x';
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

    const storage = new EvmAccountsAccountsStorage(ctx, blockHeader);

    if (!storage.isExists) throw new Error("Account storage not found");
    
    const evmAddressBytes = ethers.utils.arrayify(evmAddress);
    if (storage.isV5) {
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

export type MetadataModule = ModuleMetadataV9 | ModuleMetadataV10 | ModuleMetadataV11 | ModuleMetadataV12 | ModuleMetadataV13;

export const fetchModules = async (blockHeader: SubstrateBlock): Promise<any> => {
  const rawMetadata: string = await ctx._chain.client.call("state_getMetadata", [blockHeader.hash]);
  const metadata = decodeMetadata(rawMetadata);
  let modules: MetadataModule[] = [];
  if ((metadata as any).value?.modules?.length) {
    modules = (metadata as any).value.modules;
  }
  return modules;
}

export const sleep = async (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

const decodeText = (value: Uint8Array): string => {
  let result = '';

  for (let i = 0; i < value.length; i++) {
    result += String.fromCharCode(value[i]);
  }

  return result;
}

const extractJudgements = (judgements: [number, any][]): [number, any][] => {
  for (const judgement of judgements) {
    judgement[1] = { [judgement[1].__kind]: judgement[1].value || null };
  }
  return judgements;
};

export const extractIdentity = (identityRaw: Registration | undefined): Partial<IdentityData> => {
  const identity: Partial<IdentityData> = { judgements: [] }
  if (!identityRaw) return identity;

  const display = (identityRaw.info.display as Data_Raw5).value;
  if (display) identity.display = decodeText(display);

  const email = (identityRaw.info.email as Data_Raw5).value;
  if (email) identity.email = decodeText(email);

  const legal = (identityRaw.info.legal as Data_Raw5).value;
  if (legal) identity.legal = decodeText(legal);

  const riot = (identityRaw.info.riot as Data_Raw5).value;
  if (riot) identity.riot = decodeText(riot);

  const twitter = (identityRaw.info.twitter as Data_Raw5).value;
  if (twitter) identity.twitter = decodeText(twitter);

  const web = (identityRaw.info.web as Data_Raw5).value;
  if (web) identity.web = decodeText(web);

  const image = (identityRaw.info.image as Data_Raw5).value;
  if (image) identity.image = decodeText(image);

  const pgp = identityRaw.info.pgpFingerprint;
  if (pgp) identity.pgp = decodeText(pgp);

  const additional = identityRaw.info.additional;
  if (additional && additional.length) identity.other = additional;

  identity.judgements = extractJudgements(identityRaw.judgements);

  return identity;
}

export const getErrorMessage = (error: any, section: string): string => {
  let errorMessage = "";
  const module = modules.find((module: MetadataModule) => module.name === section);
  if (error.value?.error) {
      const err = module?.errors ? module.errors[error.value.error as number] : null;
      errorMessage = err ? `${section}.${err.name}:${err.docs}` : "";
  } else  {
      errorMessage = error.__kind || "";
  }
  return errorMessage;
}