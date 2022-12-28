export interface AccountBalancesBase {
    freeBalance: bigint;
    reservedBalance: bigint;
    votingBalance: bigint;
    accountNonce: number;
}

export interface AccountBalancesLocked {
    lockedBalance: bigint;
    vestingLocked: bigint;
}

export interface AccountBalances extends AccountBalancesBase, AccountBalancesLocked {
    availableBalance: bigint;
}