import { SubstrateBlock } from "@subsquid/substrate-processor";
import { ctx } from "../../processor";
import { BalancesLocksStorage, SystemAccountStorage } from "../../types/storage";
import { AccountBalances, AccountBalancesBase, AccountBalancesLocked } from "./types";
import { AccountInfo } from "../../types/v5";

const VESTING_ID = '0x76657374696e6720';

async function getAccountBalancesBase (address: Uint8Array, blockHeader: SubstrateBlock): Promise<AccountBalancesBase> {
    const storage = new SystemAccountStorage(ctx, blockHeader);
    if (!storage.isExists || !storage.isV5) {
        return {
            freeBalance: BigInt(0),
            reservedBalance: BigInt(0),
            votingBalance: BigInt(0),
            accountNonce: 0
        };
    }

    const accountInfo: AccountInfo = await storage.asV5.get(address);
    return {
        freeBalance: BigInt(accountInfo.data.free),
        reservedBalance: BigInt(accountInfo.data.reserved),
        votingBalance: BigInt(accountInfo.data.free),
        accountNonce: accountInfo.nonce
    }
}

async function getLockedData (address: Uint8Array, blockHeader: SubstrateBlock): Promise<AccountBalancesLocked> {
    let lockedBalance = BigInt(0);
    let vestingLocked = BigInt(0);

    const storage = new BalancesLocksStorage(ctx, blockHeader);
    if (!storage.isExists || !storage.isV5) {
        return { lockedBalance, vestingLocked };
    }

    // TODO: get values for lockedBalance and vestingLocked
    // const locks: BalanceLock[] = await storage.asV5.get(address);

    // vestingLocked = locks.filter(({ id }) => hexToU8a(id) === VESTING_ID).reduce((result: BN, { amount }) => result.iadd(amount), new BN(0)));

    // // get the maximum of the locks according to https://github.com/paritytech/substrate/blob/master/srml/balances/src/lib.rs#L699
    // const notAll = locks.filter(({ amount }) => amount && !amount.isMax());

    // if (notAll.length) {
    //     lockedBalance = api.registry.createType('Balance', bnMax(...notAll.map(({ amount }): Balance => amount)));
    // }

    return { lockedBalance, vestingLocked };
}

export const getBalancesAccount = async (blockHeader: SubstrateBlock, address: Uint8Array): Promise<AccountBalances> => {
    const accountBalancesBase: AccountBalancesBase = await getAccountBalancesBase(address, blockHeader);
    const accountBalancesLocked: AccountBalancesLocked = await getLockedData(address, blockHeader);

    return {
        availableBalance:
            accountBalancesLocked.lockedBalance >= accountBalancesBase.freeBalance 
                ? BigInt(0)
                : accountBalancesBase.freeBalance - accountBalancesLocked.lockedBalance,
        ...accountBalancesBase,
        ...accountBalancesLocked
    }
};