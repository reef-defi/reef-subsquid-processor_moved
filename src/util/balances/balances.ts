import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ctx } from "../../processor";
import { BalancesLocksStorage, SystemAccountStorage } from "../../types/storage";
import { AccountBalances, AccountBalancesBase, AccountBalancesLocked } from "./types";
import { AccountInfo, BalanceLock } from "../../types/v5";
import { bufferToString } from "../util";

const VESTING_ID = '0x76657374696e6720';

const getAccountBalancesBase = async (address: Uint8Array, blockHeader: SubstrateBlock): Promise<AccountBalancesBase> => {
    const storage = new SystemAccountStorage(ctx, blockHeader);

    if (storage.isV5) {
        const accountInfo: AccountInfo = await storage.asV5.get(address);
        return {
            freeBalance: BigInt(accountInfo.data.free),
            reservedBalance: BigInt(accountInfo.data.reserved),
            votingBalance: BigInt(accountInfo.data.free),
            accountNonce: accountInfo.nonce
        }
    }

    if (storage.isV10) {
        const accountInfo: AccountInfo = await storage.asV10.get(address);
        return {
            freeBalance: BigInt(accountInfo.data.free),
            reservedBalance: BigInt(accountInfo.data.reserved),
            votingBalance: BigInt(accountInfo.data.free),
            accountNonce: accountInfo.nonce
        }
    }

    return {
        freeBalance: BigInt(0),
        reservedBalance: BigInt(0),
        votingBalance: BigInt(0),
        accountNonce: 0
    };
}

const getLockedData = async (address: Uint8Array, blockHeader: SubstrateBlock): Promise<AccountBalancesLocked> => {
    let lockedBalance = BigInt(0);
    let vestingLocked = BigInt(0);

    const storage = new BalancesLocksStorage(ctx, blockHeader);
    if (!storage.isExists || !storage.isV5) {
        return { lockedBalance, vestingLocked };
    }

    const locks: BalanceLock[] = await storage.asV5.get(address);

    vestingLocked = locks.filter(({ id }) => bufferToString(id as Buffer) === VESTING_ID)
        .reduce((result: bigint, { amount }) => result += amount, BigInt(0));
    const vestingLocks: BalanceLock[] = locks.filter(({ id }) => bufferToString(id as Buffer) === VESTING_ID);
    vestingLocks.reduce((result: bigint, { amount }) => result += amount, BigInt(0));

    // get the maximum of the locks according to https://github.com/paritytech/substrate/blob/master/srml/balances/src/lib.rs#L699
    const notAll = locks.filter(({ amount }) => amount > BigInt(0));

    if (notAll.length) {
        lockedBalance = notAll.map(({ amount }) => amount).reduce((a, b) => BigInt(a) > BigInt(b) ? a : b);
    }

    return { lockedBalance, vestingLocked };
}

export const getBalancesAccount = async (blockHeader: SubstrateBlock, address: Uint8Array): Promise<AccountBalances> => {
    const [accountBalancesBase, accountBalancesLocked] = await Promise.all([
        getAccountBalancesBase(address, blockHeader),
        getLockedData(address, blockHeader)
    ]);

    return {
        availableBalance:
            accountBalancesLocked.lockedBalance >= accountBalancesBase.freeBalance 
                ? BigInt(0)
                : accountBalancesBase.freeBalance - accountBalancesLocked.lockedBalance,
        ...accountBalancesBase,
        ...accountBalancesLocked
    }
};