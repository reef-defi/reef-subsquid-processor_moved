import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v5 from './v5'
import * as v8 from './v8'
import * as v10 from './v10'

export class AuthorshipAuthorStorage extends StorageBase {
    protected getPrefix() {
        return 'Authorship'
    }

    protected getName() {
        return 'Author'
    }

    /**
     *  Author of current block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Author of current block.
     */
    get asV5(): AuthorshipAuthorStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Author of current block.
 */
export interface AuthorshipAuthorStorageV5 {
    get(): Promise<(Uint8Array | undefined)>
}

export class AuthorshipDidSetUnclesStorage extends StorageBase {
    protected getPrefix() {
        return 'Authorship'
    }

    protected getName() {
        return 'DidSetUncles'
    }

    /**
     *  Whether uncles were already set in this block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether uncles were already set in this block.
     */
    get asV5(): AuthorshipDidSetUnclesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Whether uncles were already set in this block.
 */
export interface AuthorshipDidSetUnclesStorageV5 {
    get(): Promise<boolean>
}

export class AuthorshipUnclesStorage extends StorageBase {
    protected getPrefix() {
        return 'Authorship'
    }

    protected getName() {
        return 'Uncles'
    }

    /**
     *  Uncles
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'e10c952327a3967ba23352da69594b66914b44ebcef7e4703bb69fed952ecdd6'
    }

    /**
     *  Uncles
     */
    get asV5(): AuthorshipUnclesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Uncles
 */
export interface AuthorshipUnclesStorageV5 {
    get(): Promise<v5.UncleEntryItem[]>
}

export class BabeAuthorVrfRandomnessStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'AuthorVrfRandomness'
    }

    /**
     *  Temporary value (cleared at block finalization) that includes the VRF output generated
     *  at this block. This field should always be populated during block processing unless
     *  secondary plain slots are enabled (which don't contain a VRF output).
     */
    get isV5(): boolean {
        return this.getTypeHash() === '10a2769b0f42175702ad26b83248cff46d4c3e32ecee58ea6ff2417630585d13'
    }

    /**
     *  Temporary value (cleared at block finalization) that includes the VRF output generated
     *  at this block. This field should always be populated during block processing unless
     *  secondary plain slots are enabled (which don't contain a VRF output).
     */
    get asV5(): BabeAuthorVrfRandomnessStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) that includes the VRF output generated
 *  at this block. This field should always be populated during block processing unless
 *  secondary plain slots are enabled (which don't contain a VRF output).
 */
export interface BabeAuthorVrfRandomnessStorageV5 {
    get(): Promise<(Uint8Array | undefined)>
}

export class BabeAuthoritiesStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'Authorities'
    }

    /**
     *  Current epoch authorities.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '686332bf745d297ec7d530d6cce5c17119931f5d3c45fd9a96fcad278a9bccb7'
    }

    /**
     *  Current epoch authorities.
     */
    get asV5(): BabeAuthoritiesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Current epoch authorities.
 */
export interface BabeAuthoritiesStorageV5 {
    get(): Promise<[Uint8Array, bigint][]>
}

export class BabeCurrentSlotStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'CurrentSlot'
    }

    /**
     *  Current slot number.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current slot number.
     */
    get asV5(): BabeCurrentSlotStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Current slot number.
 */
export interface BabeCurrentSlotStorageV5 {
    get(): Promise<bigint>
}

export class BabeEpochConfigStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'EpochConfig'
    }

    /**
     *  The configuration for the current epoch. Should never be `None` as it is initialized in genesis.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '02679d53f6edd683908cd84a1275afad3bb8d1f4b9cb9af0b08cd3d89027b3ef'
    }

    /**
     *  The configuration for the current epoch. Should never be `None` as it is initialized in genesis.
     */
    get asV8(): BabeEpochConfigStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The configuration for the current epoch. Should never be `None` as it is initialized in genesis.
 */
export interface BabeEpochConfigStorageV8 {
    get(): Promise<(v8.BabeEpochConfiguration | undefined)>
}

export class BabeEpochIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'EpochIndex'
    }

    /**
     *  Current epoch index.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current epoch index.
     */
    get asV5(): BabeEpochIndexStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Current epoch index.
 */
export interface BabeEpochIndexStorageV5 {
    get(): Promise<bigint>
}

export class BabeEpochStartStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'EpochStart'
    }

    /**
     *  The block numbers when the last and current epoch have started, respectively `N-1` and
     *  `N`.
     *  NOTE: We track this is in order to annotate the block number when a given pool of
     *  entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
     *  slots, which may be skipped, the block numbers may not line up with the slot numbers.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '21d7691711cd2bd6f3fc4d179c912487bf24c02c8e4e5fd183103936340b5cc5'
    }

    /**
     *  The block numbers when the last and current epoch have started, respectively `N-1` and
     *  `N`.
     *  NOTE: We track this is in order to annotate the block number when a given pool of
     *  entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
     *  slots, which may be skipped, the block numbers may not line up with the slot numbers.
     */
    get asV8(): BabeEpochStartStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The block numbers when the last and current epoch have started, respectively `N-1` and
 *  `N`.
 *  NOTE: We track this is in order to annotate the block number when a given pool of
 *  entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
 *  slots, which may be skipped, the block numbers may not line up with the slot numbers.
 */
export interface BabeEpochStartStorageV8 {
    get(): Promise<[number, number]>
}

export class BabeGenesisSlotStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'GenesisSlot'
    }

    /**
     *  The slot at which the first epoch actually started. This is 0
     *  until the first block of the chain.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The slot at which the first epoch actually started. This is 0
     *  until the first block of the chain.
     */
    get asV5(): BabeGenesisSlotStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The slot at which the first epoch actually started. This is 0
 *  until the first block of the chain.
 */
export interface BabeGenesisSlotStorageV5 {
    get(): Promise<bigint>
}

export class BabeInitializedStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'Initialized'
    }

    /**
     *  Temporary value (cleared at block finalization) which is `Some`
     *  if per-block initialization has already been called for current block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'baa8b35cc3c4f9962c8e7906c4e027bf52bf107cfe165d1c64edc4d8707f6b83'
    }

    /**
     *  Temporary value (cleared at block finalization) which is `Some`
     *  if per-block initialization has already been called for current block.
     */
    get asV5(): BabeInitializedStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which is `Some`
 *  if per-block initialization has already been called for current block.
 */
export interface BabeInitializedStorageV5 {
    get(): Promise<((Uint8Array | undefined) | undefined)>
}

export class BabeLatenessStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'Lateness'
    }

    /**
     *  How late the current block is compared to its parent.
     * 
     *  This entry is populated as part of block execution and is cleaned up
     *  on block finalization. Querying this storage entry outside of block
     *  execution context should always yield zero.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  How late the current block is compared to its parent.
     * 
     *  This entry is populated as part of block execution and is cleaned up
     *  on block finalization. Querying this storage entry outside of block
     *  execution context should always yield zero.
     */
    get asV5(): BabeLatenessStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  How late the current block is compared to its parent.
 * 
 *  This entry is populated as part of block execution and is cleaned up
 *  on block finalization. Querying this storage entry outside of block
 *  execution context should always yield zero.
 */
export interface BabeLatenessStorageV5 {
    get(): Promise<number>
}

export class BabeNextAuthoritiesStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'NextAuthorities'
    }

    /**
     *  Next epoch authorities.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '686332bf745d297ec7d530d6cce5c17119931f5d3c45fd9a96fcad278a9bccb7'
    }

    /**
     *  Next epoch authorities.
     */
    get asV5(): BabeNextAuthoritiesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Next epoch authorities.
 */
export interface BabeNextAuthoritiesStorageV5 {
    get(): Promise<[Uint8Array, bigint][]>
}

export class BabeNextEpochConfigStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'NextEpochConfig'
    }

    /**
     *  Next epoch configuration, if changed.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '007656ed996dcee130efb3a698c60ea276980e9b755810b4328f802b3398dbc6'
    }

    /**
     *  Next epoch configuration, if changed.
     */
    get asV5(): BabeNextEpochConfigStorageV5 {
        assert(this.isV5)
        return this as any
    }

    /**
     *  The configuration for the next epoch, `None` if the config will not change
     *  (you can fallback to `EpochConfig` instead in that case).
     */
    get isV8(): boolean {
        return this.getTypeHash() === '02679d53f6edd683908cd84a1275afad3bb8d1f4b9cb9af0b08cd3d89027b3ef'
    }

    /**
     *  The configuration for the next epoch, `None` if the config will not change
     *  (you can fallback to `EpochConfig` instead in that case).
     */
    get asV8(): BabeNextEpochConfigStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  Next epoch configuration, if changed.
 */
export interface BabeNextEpochConfigStorageV5 {
    get(): Promise<(v5.NextConfigDescriptor | undefined)>
}

/**
 *  The configuration for the next epoch, `None` if the config will not change
 *  (you can fallback to `EpochConfig` instead in that case).
 */
export interface BabeNextEpochConfigStorageV8 {
    get(): Promise<(v8.BabeEpochConfiguration | undefined)>
}

export class BabeNextRandomnessStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'NextRandomness'
    }

    /**
     *  Next epoch randomness.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  Next epoch randomness.
     */
    get asV5(): BabeNextRandomnessStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Next epoch randomness.
 */
export interface BabeNextRandomnessStorageV5 {
    get(): Promise<Uint8Array>
}

export class BabePendingEpochConfigChangeStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'PendingEpochConfigChange'
    }

    /**
     *  Pending epoch configuration change that will be applied when the next epoch is enacted.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '007656ed996dcee130efb3a698c60ea276980e9b755810b4328f802b3398dbc6'
    }

    /**
     *  Pending epoch configuration change that will be applied when the next epoch is enacted.
     */
    get asV8(): BabePendingEpochConfigChangeStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  Pending epoch configuration change that will be applied when the next epoch is enacted.
 */
export interface BabePendingEpochConfigChangeStorageV8 {
    get(): Promise<(v8.NextConfigDescriptor | undefined)>
}

export class BabeRandomnessStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'Randomness'
    }

    /**
     *  The epoch randomness for the *current* epoch.
     * 
     *  # Security
     * 
     *  This MUST NOT be used for gambling, as it can be influenced by a
     *  malicious validator in the short term. It MAY be used in many
     *  cryptographic protocols, however, so long as one remembers that this
     *  (like everything else on-chain) it is public. For example, it can be
     *  used where a number is needed that cannot have been chosen by an
     *  adversary, for purposes such as public-coin zero-knowledge proofs.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  The epoch randomness for the *current* epoch.
     * 
     *  # Security
     * 
     *  This MUST NOT be used for gambling, as it can be influenced by a
     *  malicious validator in the short term. It MAY be used in many
     *  cryptographic protocols, however, so long as one remembers that this
     *  (like everything else on-chain) it is public. For example, it can be
     *  used where a number is needed that cannot have been chosen by an
     *  adversary, for purposes such as public-coin zero-knowledge proofs.
     */
    get asV5(): BabeRandomnessStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The epoch randomness for the *current* epoch.
 * 
 *  # Security
 * 
 *  This MUST NOT be used for gambling, as it can be influenced by a
 *  malicious validator in the short term. It MAY be used in many
 *  cryptographic protocols, however, so long as one remembers that this
 *  (like everything else on-chain) it is public. For example, it can be
 *  used where a number is needed that cannot have been chosen by an
 *  adversary, for purposes such as public-coin zero-knowledge proofs.
 */
export interface BabeRandomnessStorageV5 {
    get(): Promise<Uint8Array>
}

export class BabeSegmentIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'SegmentIndex'
    }

    /**
     *  Randomness under construction.
     * 
     *  We make a tradeoff between storage accesses and list length.
     *  We store the under-construction randomness in segments of up to
     *  `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
     * 
     *  Once a segment reaches this length, we begin the next one.
     *  We reset all segments and return to `0` at the beginning of every
     *  epoch.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Randomness under construction.
     * 
     *  We make a tradeoff between storage accesses and list length.
     *  We store the under-construction randomness in segments of up to
     *  `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
     * 
     *  Once a segment reaches this length, we begin the next one.
     *  We reset all segments and return to `0` at the beginning of every
     *  epoch.
     */
    get asV5(): BabeSegmentIndexStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Randomness under construction.
 * 
 *  We make a tradeoff between storage accesses and list length.
 *  We store the under-construction randomness in segments of up to
 *  `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
 * 
 *  Once a segment reaches this length, we begin the next one.
 *  We reset all segments and return to `0` at the beginning of every
 *  epoch.
 */
export interface BabeSegmentIndexStorageV5 {
    get(): Promise<number>
}

export class BabeUnderConstructionStorage extends StorageBase {
    protected getPrefix() {
        return 'Babe'
    }

    protected getName() {
        return 'UnderConstruction'
    }

    /**
     *  TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f619540cfd39ec62194ccd8c2d0c1c6ffcb39cfc17df25d0e83357e4b6c7d6d5'
    }

    /**
     *  TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
     */
    get asV5(): BabeUnderConstructionStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
 */
export interface BabeUnderConstructionStorageV5 {
    get(key: number): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: number[]): Promise<Uint8Array[][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array[]][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array[]][]>
}

export class BalancesAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get asV5(): BalancesAccountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The balance of an account.
 * 
 *  NOTE: This is only used in the case that this pallet is used to store balances.
 */
export interface BalancesAccountStorageV5 {
    get(key: Uint8Array): Promise<v5.AccountData>
    getAll(): Promise<v5.AccountData[]>
    getMany(keys: Uint8Array[]): Promise<v5.AccountData[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.AccountData][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.AccountData][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.AccountData][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.AccountData][]>
}

export class BalancesLocksStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Locks'
    }

    /**
     *  Any liquidity locks on some account balances.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'e393b3a20a6d47aee703c898fda1db02fffe128e4692a5861f416ecc67b13a86'
    }

    /**
     *  Any liquidity locks on some account balances.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get asV5(): BalancesLocksStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Any liquidity locks on some account balances.
 *  NOTE: Should only be accessed when setting, changing and freeing a lock.
 */
export interface BalancesLocksStorageV5 {
    get(key: Uint8Array): Promise<v5.BalanceLock[]>
    getAll(): Promise<v5.BalanceLock[][]>
    getMany(keys: Uint8Array[]): Promise<v5.BalanceLock[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.BalanceLock[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.BalanceLock[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.BalanceLock[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.BalanceLock[]][]>
}

export class BalancesReservesStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Reserves'
    }

    /**
     *  Named reserves on some account balances.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '474ab364918936227f04514c303c572bb070961f30f593f2cbb3e25426aba37a'
    }

    /**
     *  Named reserves on some account balances.
     */
    get asV8(): BalancesReservesStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  Named reserves on some account balances.
 */
export interface BalancesReservesStorageV8 {
    get(key: Uint8Array): Promise<v8.ReserveData[]>
    getAll(): Promise<v8.ReserveData[][]>
    getMany(keys: Uint8Array[]): Promise<v8.ReserveData[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v8.ReserveData[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v8.ReserveData[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v8.ReserveData[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v8.ReserveData[]][]>
}

export class BalancesStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'StorageVersion'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  This is set to v2.0.0 for new networks.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '78a0d483d7fe4fc699def1765b9b22deed84e9f003169321f89a7b2c516a4ffe'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  This is set to v2.0.0 for new networks.
     */
    get asV5(): BalancesStorageVersionStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Storage version of the pallet.
 * 
 *  This is set to v2.0.0 for new networks.
 */
export interface BalancesStorageVersionStorageV5 {
    get(): Promise<v5.Releases>
}

export class BalancesTotalIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'TotalIssuance'
    }

    /**
     *  The total units issued in the system.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV5(): BalancesTotalIssuanceStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV5 {
    get(): Promise<bigint>
}

export class EVMAccountStoragesStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'AccountStorages'
    }

    get isV5(): boolean {
        return this.getTypeHash() === 'e46b64a08590ade9974d6cacb482b7b117daf13fb4b1c7e4a0c1e141c3c7c76f'
    }

    get asV5(): EVMAccountStoragesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface EVMAccountStoragesStorageV5 {
    get(key1: Uint8Array, key2: Uint8Array): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [Uint8Array, Uint8Array][]): Promise<Uint8Array[]>
    getKeys(): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array, key2: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getPairs(): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairs(key1: Uint8Array, key2: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
}

export class EVMAccountsStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'Accounts'
    }

    /**
     *  Accounts info.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '959803c5665567a04768632ffd4a38ac2efc99dbd4a325d75717fbda24cfcbc0'
    }

    /**
     *  Accounts info.
     */
    get asV5(): EVMAccountsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Accounts info.
 */
export interface EVMAccountsStorageV5 {
    get(key: Uint8Array): Promise<(v5.EvmAccountInfo | undefined)>
    getAll(): Promise<v5.EvmAccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<(v5.EvmAccountInfo | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.EvmAccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.EvmAccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.EvmAccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.EvmAccountInfo][]>
}

export class EVMCodeInfosStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'CodeInfos'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '50657539877fd1f1655464858fbc9910d7a672ea73bb37f843006d96f9e2f426'
    }

    get asV5(): EVMCodeInfosStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface EVMCodeInfosStorageV5 {
    get(key: Uint8Array): Promise<(v5.CodeInfo | undefined)>
    getAll(): Promise<v5.CodeInfo[]>
    getMany(keys: Uint8Array[]): Promise<(v5.CodeInfo | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.CodeInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.CodeInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.CodeInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.CodeInfo][]>
}

export class EVMCodesStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'Codes'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '33fe5ec7b676749c88dac0a04265a16cb6f5905af7fd400a733f523ef4b06395'
    }

    get asV5(): EVMCodesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface EVMCodesStorageV5 {
    get(key: Uint8Array): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: Uint8Array[]): Promise<Uint8Array[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
}

export class EVMExtrinsicOriginStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'ExtrinsicOrigin'
    }

    /**
     *  Extrinsics origin for the current tx.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Extrinsics origin for the current tx.
     */
    get asV5(): EVMExtrinsicOriginStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Extrinsics origin for the current tx.
 */
export interface EVMExtrinsicOriginStorageV5 {
    get(): Promise<(Uint8Array | undefined)>
}

export class EVMNetworkContractIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'NetworkContractIndex'
    }

    /**
     *  Next available system contract address.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Next available system contract address.
     */
    get asV5(): EVMNetworkContractIndexStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Next available system contract address.
 */
export interface EVMNetworkContractIndexStorageV5 {
    get(): Promise<bigint>
}

export class EVMQueuedEventsStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'QueuedEvents'
    }

    /**
     *  Queued Events
     */
    get isV10(): boolean {
        return this.getTypeHash() === '6ae5c3e5e99026e416fb876c498545e62128ff4b0f00baaf45f5757fc856e144'
    }

    /**
     *  Queued Events
     */
    get asV10(): EVMQueuedEventsStorageV10 {
        assert(this.isV10)
        return this as any
    }
}

/**
 *  Queued Events
 */
export interface EVMQueuedEventsStorageV10 {
    get(): Promise<v10.Event[]>
}

export class EvmAccountsAccountsStorage extends StorageBase {
    protected getPrefix() {
        return 'EvmAccounts'
    }

    protected getName() {
        return 'Accounts'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '4657636cb4188393b9ca6aaf8ca72aad7f732d48fa6f836eba7c37f31e334657'
    }

    get asV5(): EvmAccountsAccountsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface EvmAccountsAccountsStorageV5 {
    get(key: Uint8Array): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
}

export class EvmAccountsEvmAddressesStorage extends StorageBase {
    protected getPrefix() {
        return 'EvmAccounts'
    }

    protected getName() {
        return 'EvmAddresses'
    }

    get isV5(): boolean {
        return this.getTypeHash() === 'aedc9d9adf78c2e711b858d1696263a8b674eb7b149cc3ba7ab036d78ef5720d'
    }

    get asV5(): EvmAccountsEvmAddressesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface EvmAccountsEvmAddressesStorageV5 {
    get(key: Uint8Array): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
}

export class GrandpaCurrentSetIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Grandpa'
    }

    protected getName() {
        return 'CurrentSetId'
    }

    /**
     *  The number of changes (both in terms of keys and underlying economic responsibilities)
     *  in the "set" of Grandpa validators from genesis.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The number of changes (both in terms of keys and underlying economic responsibilities)
     *  in the "set" of Grandpa validators from genesis.
     */
    get asV8(): GrandpaCurrentSetIdStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The number of changes (both in terms of keys and underlying economic responsibilities)
 *  in the "set" of Grandpa validators from genesis.
 */
export interface GrandpaCurrentSetIdStorageV8 {
    get(): Promise<bigint>
}

export class GrandpaNextForcedStorage extends StorageBase {
    protected getPrefix() {
        return 'Grandpa'
    }

    protected getName() {
        return 'NextForced'
    }

    /**
     *  next block number where we can force a change.
     */
    get isV8(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  next block number where we can force a change.
     */
    get asV8(): GrandpaNextForcedStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  next block number where we can force a change.
 */
export interface GrandpaNextForcedStorageV8 {
    get(): Promise<(number | undefined)>
}

export class GrandpaPendingChangeStorage extends StorageBase {
    protected getPrefix() {
        return 'Grandpa'
    }

    protected getName() {
        return 'PendingChange'
    }

    /**
     *  Pending change: (signaled at, scheduled change).
     */
    get isV8(): boolean {
        return this.getTypeHash() === '13755304b861af7343de28e9c0f8c93252785a6950a8ef864736ceb88092a3c7'
    }

    /**
     *  Pending change: (signaled at, scheduled change).
     */
    get asV8(): GrandpaPendingChangeStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  Pending change: (signaled at, scheduled change).
 */
export interface GrandpaPendingChangeStorageV8 {
    get(): Promise<(v8.StoredPendingChange | undefined)>
}

export class GrandpaSetIdSessionStorage extends StorageBase {
    protected getPrefix() {
        return 'Grandpa'
    }

    protected getName() {
        return 'SetIdSession'
    }

    /**
     *  A mapping from grandpa set ID to the index of the *most recent* session for which its
     *  members were responsible.
     * 
     *  TWOX-NOTE: `SetId` is not under user control.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '2d385d75717e58066ac593e8c94f49e0ce544a47573cd5889073ca2ac7c97de9'
    }

    /**
     *  A mapping from grandpa set ID to the index of the *most recent* session for which its
     *  members were responsible.
     * 
     *  TWOX-NOTE: `SetId` is not under user control.
     */
    get asV8(): GrandpaSetIdSessionStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  A mapping from grandpa set ID to the index of the *most recent* session for which its
 *  members were responsible.
 * 
 *  TWOX-NOTE: `SetId` is not under user control.
 */
export interface GrandpaSetIdSessionStorageV8 {
    get(key: bigint): Promise<(number | undefined)>
    getAll(): Promise<number[]>
    getMany(keys: bigint[]): Promise<(number | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: number][]>
    getPairs(key: bigint): Promise<[k: bigint, v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: number][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: number][]>
}

export class GrandpaStalledStorage extends StorageBase {
    protected getPrefix() {
        return 'Grandpa'
    }

    protected getName() {
        return 'Stalled'
    }

    /**
     *  `true` if we are currently stalled.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '3b9e892deedcedebca6cccb95fac40be1ea485932811a2dcae3ec80a6b871360'
    }

    /**
     *  `true` if we are currently stalled.
     */
    get asV8(): GrandpaStalledStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  `true` if we are currently stalled.
 */
export interface GrandpaStalledStorageV8 {
    get(): Promise<([number, number] | undefined)>
}

export class GrandpaStateStorage extends StorageBase {
    protected getPrefix() {
        return 'Grandpa'
    }

    protected getName() {
        return 'State'
    }

    /**
     *  State of the current authority set.
     */
    get isV8(): boolean {
        return this.getTypeHash() === 'd29e1b762b13b4994e98ec10b0ecf04d5e9132829fb105fd6b9bc2a98b77ee17'
    }

    /**
     *  State of the current authority set.
     */
    get asV8(): GrandpaStateStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  State of the current authority set.
 */
export interface GrandpaStateStorageV8 {
    get(): Promise<v8.StoredState>
}

export class GrandpaFinalityCurrentSetIdStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinality'
    }

    protected getName() {
        return 'CurrentSetId'
    }

    /**
     *  The number of changes (both in terms of keys and underlying economic responsibilities)
     *  in the "set" of Grandpa validators from genesis.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The number of changes (both in terms of keys and underlying economic responsibilities)
     *  in the "set" of Grandpa validators from genesis.
     */
    get asV5(): GrandpaFinalityCurrentSetIdStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The number of changes (both in terms of keys and underlying economic responsibilities)
 *  in the "set" of Grandpa validators from genesis.
 */
export interface GrandpaFinalityCurrentSetIdStorageV5 {
    get(): Promise<bigint>
}

export class GrandpaFinalityNextForcedStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinality'
    }

    protected getName() {
        return 'NextForced'
    }

    /**
     *  next block number where we can force a change.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  next block number where we can force a change.
     */
    get asV5(): GrandpaFinalityNextForcedStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  next block number where we can force a change.
 */
export interface GrandpaFinalityNextForcedStorageV5 {
    get(): Promise<(number | undefined)>
}

export class GrandpaFinalityPendingChangeStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinality'
    }

    protected getName() {
        return 'PendingChange'
    }

    /**
     *  Pending change: (signaled at, scheduled change).
     */
    get isV5(): boolean {
        return this.getTypeHash() === '13755304b861af7343de28e9c0f8c93252785a6950a8ef864736ceb88092a3c7'
    }

    /**
     *  Pending change: (signaled at, scheduled change).
     */
    get asV5(): GrandpaFinalityPendingChangeStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Pending change: (signaled at, scheduled change).
 */
export interface GrandpaFinalityPendingChangeStorageV5 {
    get(): Promise<(v5.StoredPendingChange | undefined)>
}

export class GrandpaFinalitySetIdSessionStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinality'
    }

    protected getName() {
        return 'SetIdSession'
    }

    /**
     *  A mapping from grandpa set ID to the index of the *most recent* session for which its
     *  members were responsible.
     * 
     *  TWOX-NOTE: `SetId` is not under user control.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '2d385d75717e58066ac593e8c94f49e0ce544a47573cd5889073ca2ac7c97de9'
    }

    /**
     *  A mapping from grandpa set ID to the index of the *most recent* session for which its
     *  members were responsible.
     * 
     *  TWOX-NOTE: `SetId` is not under user control.
     */
    get asV5(): GrandpaFinalitySetIdSessionStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  A mapping from grandpa set ID to the index of the *most recent* session for which its
 *  members were responsible.
 * 
 *  TWOX-NOTE: `SetId` is not under user control.
 */
export interface GrandpaFinalitySetIdSessionStorageV5 {
    get(key: bigint): Promise<(number | undefined)>
    getAll(): Promise<number[]>
    getMany(keys: bigint[]): Promise<(number | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: number][]>
    getPairs(key: bigint): Promise<[k: bigint, v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: number][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: number][]>
}

export class GrandpaFinalityStalledStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinality'
    }

    protected getName() {
        return 'Stalled'
    }

    /**
     *  `true` if we are currently stalled.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '3b9e892deedcedebca6cccb95fac40be1ea485932811a2dcae3ec80a6b871360'
    }

    /**
     *  `true` if we are currently stalled.
     */
    get asV5(): GrandpaFinalityStalledStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  `true` if we are currently stalled.
 */
export interface GrandpaFinalityStalledStorageV5 {
    get(): Promise<([number, number] | undefined)>
}

export class GrandpaFinalityStateStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinality'
    }

    protected getName() {
        return 'State'
    }

    /**
     *  State of the current authority set.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'd29e1b762b13b4994e98ec10b0ecf04d5e9132829fb105fd6b9bc2a98b77ee17'
    }

    /**
     *  State of the current authority set.
     */
    get asV5(): GrandpaFinalityStateStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  State of the current authority set.
 */
export interface GrandpaFinalityStateStorageV5 {
    get(): Promise<v5.StoredState>
}

export class IdentityIdentityOfStorage extends StorageBase {
    protected getPrefix() {
        return 'Identity'
    }

    protected getName() {
        return 'IdentityOf'
    }

    /**
     *  Information that is pertinent to identify the entity behind an account.
     * 
     *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'eee9529c5197f7a5f8200e155d78bab0a612de49bd6c8941e539265edf54c3aa'
    }

    /**
     *  Information that is pertinent to identify the entity behind an account.
     * 
     *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
     */
    get asV5(): IdentityIdentityOfStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Information that is pertinent to identify the entity behind an account.
 * 
 *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
 */
export interface IdentityIdentityOfStorageV5 {
    get(key: Uint8Array): Promise<(v5.Registration | undefined)>
    getAll(): Promise<v5.Registration[]>
    getMany(keys: Uint8Array[]): Promise<(v5.Registration | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.Registration][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.Registration][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.Registration][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.Registration][]>
}

export class IdentityRegistrarsStorage extends StorageBase {
    protected getPrefix() {
        return 'Identity'
    }

    protected getName() {
        return 'Registrars'
    }

    /**
     *  The set of registrars. Not expected to get very big as can only be added through a
     *  special origin (likely a council motion).
     * 
     *  The index into this can be cast to `RegistrarIndex` to get a valid value.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'd53feea500c88336983c65706eeb51794b1fc991a17d6d33663d49aeb47b12b6'
    }

    /**
     *  The set of registrars. Not expected to get very big as can only be added through a
     *  special origin (likely a council motion).
     * 
     *  The index into this can be cast to `RegistrarIndex` to get a valid value.
     */
    get asV5(): IdentityRegistrarsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The set of registrars. Not expected to get very big as can only be added through a
 *  special origin (likely a council motion).
 * 
 *  The index into this can be cast to `RegistrarIndex` to get a valid value.
 */
export interface IdentityRegistrarsStorageV5 {
    get(): Promise<(v5.RegistrarInfo | undefined)[]>
}

export class IdentitySubsOfStorage extends StorageBase {
    protected getPrefix() {
        return 'Identity'
    }

    protected getName() {
        return 'SubsOf'
    }

    /**
     *  Alternative "sub" identities of this account.
     * 
     *  The first item is the deposit, the second is a vector of the accounts.
     * 
     *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '925d8593182dee4b16701bef694e42944c6fa6f1d20d0a7b05fb8ed6b451f6b7'
    }

    /**
     *  Alternative "sub" identities of this account.
     * 
     *  The first item is the deposit, the second is a vector of the accounts.
     * 
     *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
     */
    get asV5(): IdentitySubsOfStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Alternative "sub" identities of this account.
 * 
 *  The first item is the deposit, the second is a vector of the accounts.
 * 
 *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
 */
export interface IdentitySubsOfStorageV5 {
    get(key: Uint8Array): Promise<[bigint, Uint8Array[]]>
    getAll(): Promise<[bigint, Uint8Array[]][]>
    getMany(keys: Uint8Array[]): Promise<[bigint, Uint8Array[]][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [bigint, Uint8Array[]]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [bigint, Uint8Array[]]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [bigint, Uint8Array[]]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [bigint, Uint8Array[]]][]>
}

export class IdentitySuperOfStorage extends StorageBase {
    protected getPrefix() {
        return 'Identity'
    }

    protected getName() {
        return 'SuperOf'
    }

    /**
     *  The super-identity of an alternative "sub" identity together with its name, within that
     *  context. If the account is not some other account's sub-identity, then just `None`.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '3e2404306f316847b5946856f8222df193ecb9ace5e509cd9f8808145fd9b792'
    }

    /**
     *  The super-identity of an alternative "sub" identity together with its name, within that
     *  context. If the account is not some other account's sub-identity, then just `None`.
     */
    get asV5(): IdentitySuperOfStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The super-identity of an alternative "sub" identity together with its name, within that
 *  context. If the account is not some other account's sub-identity, then just `None`.
 */
export interface IdentitySuperOfStorageV5 {
    get(key: Uint8Array): Promise<([Uint8Array, v5.Data] | undefined)>
    getAll(): Promise<[Uint8Array, v5.Data][]>
    getMany(keys: Uint8Array[]): Promise<([Uint8Array, v5.Data] | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [Uint8Array, v5.Data]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [Uint8Array, v5.Data]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [Uint8Array, v5.Data]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [Uint8Array, v5.Data]][]>
}

export class ImOnlineAuthoredBlocksStorage extends StorageBase {
    protected getPrefix() {
        return 'ImOnline'
    }

    protected getName() {
        return 'AuthoredBlocks'
    }

    /**
     *  For each session index, we keep a mapping of `ValidatorId<T>` to the
     *  number of blocks authored by the given authority.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'cc6a8dbe383d37ce9fa22935e3a1838a5aa7615fa4449b4318806f402f116ec9'
    }

    /**
     *  For each session index, we keep a mapping of `ValidatorId<T>` to the
     *  number of blocks authored by the given authority.
     */
    get asV5(): ImOnlineAuthoredBlocksStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  For each session index, we keep a mapping of `ValidatorId<T>` to the
 *  number of blocks authored by the given authority.
 */
export interface ImOnlineAuthoredBlocksStorageV5 {
    get(key1: number, key2: Uint8Array): Promise<number>
    getAll(): Promise<number[]>
    getMany(keys: [number, Uint8Array][]): Promise<number[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: number][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: number][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: number][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: number][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: number][]>
}

export class ImOnlineHeartbeatAfterStorage extends StorageBase {
    protected getPrefix() {
        return 'ImOnline'
    }

    protected getName() {
        return 'HeartbeatAfter'
    }

    /**
     *  The block number after which it's ok to send heartbeats in current session.
     * 
     *  At the beginning of each session we set this to a value that should
     *  fall roughly in the middle of the session duration.
     *  The idea is to first wait for the validators to produce a block
     *  in the current session, so that the heartbeat later on will not be necessary.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The block number after which it's ok to send heartbeats in current session.
     * 
     *  At the beginning of each session we set this to a value that should
     *  fall roughly in the middle of the session duration.
     *  The idea is to first wait for the validators to produce a block
     *  in the current session, so that the heartbeat later on will not be necessary.
     */
    get asV5(): ImOnlineHeartbeatAfterStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The block number after which it's ok to send heartbeats in current session.
 * 
 *  At the beginning of each session we set this to a value that should
 *  fall roughly in the middle of the session duration.
 *  The idea is to first wait for the validators to produce a block
 *  in the current session, so that the heartbeat later on will not be necessary.
 */
export interface ImOnlineHeartbeatAfterStorageV5 {
    get(): Promise<number>
}

export class ImOnlineKeysStorage extends StorageBase {
    protected getPrefix() {
        return 'ImOnline'
    }

    protected getName() {
        return 'Keys'
    }

    /**
     *  The current set of keys that may issue a heartbeat.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current set of keys that may issue a heartbeat.
     */
    get asV5(): ImOnlineKeysStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The current set of keys that may issue a heartbeat.
 */
export interface ImOnlineKeysStorageV5 {
    get(): Promise<Uint8Array[]>
}

export class ImOnlineReceivedHeartbeatsStorage extends StorageBase {
    protected getPrefix() {
        return 'ImOnline'
    }

    protected getName() {
        return 'ReceivedHeartbeats'
    }

    /**
     *  For each session index, we keep a mapping of `AuthIndex` to
     *  `offchain::OpaqueNetworkState`.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '682157dad304389ac6525dcc32f225e326c71b23b36940fe6c6b0ba3c53ac61f'
    }

    /**
     *  For each session index, we keep a mapping of `AuthIndex` to
     *  `offchain::OpaqueNetworkState`.
     */
    get asV5(): ImOnlineReceivedHeartbeatsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  For each session index, we keep a mapping of `AuthIndex` to
 *  `offchain::OpaqueNetworkState`.
 */
export interface ImOnlineReceivedHeartbeatsStorageV5 {
    get(key1: number, key2: number): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [number, number][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key1: number): Promise<[number, number][]>
    getKeys(key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
}

export class IndicesAccountsStorage extends StorageBase {
    protected getPrefix() {
        return 'Indices'
    }

    protected getName() {
        return 'Accounts'
    }

    /**
     *  The lookup from index to account.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'c6d4b452610ac51f7c9427bf2d9910242bb414a02409a484caf47fa24e50516e'
    }

    /**
     *  The lookup from index to account.
     */
    get asV5(): IndicesAccountsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The lookup from index to account.
 */
export interface IndicesAccountsStorageV5 {
    get(key: number): Promise<([Uint8Array, bigint, boolean] | undefined)>
    getAll(): Promise<[Uint8Array, bigint, boolean][]>
    getMany(keys: number[]): Promise<([Uint8Array, bigint, boolean] | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: [Uint8Array, bigint, boolean]][]>
    getPairs(key: number): Promise<[k: number, v: [Uint8Array, bigint, boolean]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: [Uint8Array, bigint, boolean]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: [Uint8Array, bigint, boolean]][]>
}

export class Instance1CollectiveMembersStorage extends StorageBase {
    protected getPrefix() {
        return 'Instance1Collective'
    }

    protected getName() {
        return 'Members'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get asV5(): Instance1CollectiveMembersStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The current members of the collective. This is stored sorted (just by value).
 */
export interface Instance1CollectiveMembersStorageV5 {
    get(): Promise<Uint8Array[]>
}

export class Instance1CollectivePrimeStorage extends StorageBase {
    protected getPrefix() {
        return 'Instance1Collective'
    }

    protected getName() {
        return 'Prime'
    }

    /**
     *  The prime member that helps determine the default vote behavior in case of absentations.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  The prime member that helps determine the default vote behavior in case of absentations.
     */
    get asV5(): Instance1CollectivePrimeStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The prime member that helps determine the default vote behavior in case of absentations.
 */
export interface Instance1CollectivePrimeStorageV5 {
    get(): Promise<(Uint8Array | undefined)>
}

export class Instance1CollectiveProposalCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Instance1Collective'
    }

    protected getName() {
        return 'ProposalCount'
    }

    /**
     *  Proposals so far.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    get asV5(): Instance1CollectiveProposalCountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Proposals so far.
 */
export interface Instance1CollectiveProposalCountStorageV5 {
    get(): Promise<number>
}

export class Instance1CollectiveProposalOfStorage extends StorageBase {
    protected getPrefix() {
        return 'Instance1Collective'
    }

    protected getName() {
        return 'ProposalOf'
    }

    /**
     *  Actual proposal for a given hash, if it's current.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'cf2044d66531582f821964a61b221bdfbd549c19f4e960eb83e8aaf95cd0b2dd'
    }

    /**
     *  Actual proposal for a given hash, if it's current.
     */
    get asV5(): Instance1CollectiveProposalOfStorageV5 {
        assert(this.isV5)
        return this as any
    }

    /**
     *  Actual proposal for a given hash, if it's current.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '1cfff331f8d31a479396456deccce857b24a14788d3f60cbf0d33423ed9a032f'
    }

    /**
     *  Actual proposal for a given hash, if it's current.
     */
    get asV8(): Instance1CollectiveProposalOfStorageV8 {
        assert(this.isV8)
        return this as any
    }

    /**
     *  Actual proposal for a given hash, if it's current.
     */
    get isV10(): boolean {
        return this.getTypeHash() === '94dd581977eacbd111967b050d05dc2272b3a4a8d2cbbf1b5a753f178fd97fd8'
    }

    /**
     *  Actual proposal for a given hash, if it's current.
     */
    get asV10(): Instance1CollectiveProposalOfStorageV10 {
        assert(this.isV10)
        return this as any
    }
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface Instance1CollectiveProposalOfStorageV5 {
    get(key: Uint8Array): Promise<(v5.Proposal | undefined)>
    getAll(): Promise<v5.Proposal[]>
    getMany(keys: Uint8Array[]): Promise<(v5.Proposal | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.Proposal][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.Proposal][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.Proposal][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.Proposal][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface Instance1CollectiveProposalOfStorageV8 {
    get(key: Uint8Array): Promise<(v8.Proposal | undefined)>
    getAll(): Promise<v8.Proposal[]>
    getMany(keys: Uint8Array[]): Promise<(v8.Proposal | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v8.Proposal][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v8.Proposal][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v8.Proposal][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v8.Proposal][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface Instance1CollectiveProposalOfStorageV10 {
    get(key: Uint8Array): Promise<(v10.Proposal | undefined)>
    getAll(): Promise<v10.Proposal[]>
    getMany(keys: Uint8Array[]): Promise<(v10.Proposal | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v10.Proposal][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v10.Proposal][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v10.Proposal][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v10.Proposal][]>
}

export class Instance1CollectiveProposalsStorage extends StorageBase {
    protected getPrefix() {
        return 'Instance1Collective'
    }

    protected getName() {
        return 'Proposals'
    }

    /**
     *  The hashes of the active proposals.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The hashes of the active proposals.
     */
    get asV5(): Instance1CollectiveProposalsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The hashes of the active proposals.
 */
export interface Instance1CollectiveProposalsStorageV5 {
    get(): Promise<Uint8Array[]>
}

export class Instance1CollectiveVotingStorage extends StorageBase {
    protected getPrefix() {
        return 'Instance1Collective'
    }

    protected getName() {
        return 'Voting'
    }

    /**
     *  Votes on a given proposal, if it is ongoing.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '8674aeb71b725705ae08d0cc723a5b29396e1f9ed56e4adcf4602c361e693cd7'
    }

    /**
     *  Votes on a given proposal, if it is ongoing.
     */
    get asV5(): Instance1CollectiveVotingStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Votes on a given proposal, if it is ongoing.
 */
export interface Instance1CollectiveVotingStorageV5 {
    get(key: Uint8Array): Promise<(v5.Votes | undefined)>
    getAll(): Promise<v5.Votes[]>
    getMany(keys: Uint8Array[]): Promise<(v5.Votes | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.Votes][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.Votes][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.Votes][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.Votes][]>
}

export class MultisigCallsStorage extends StorageBase {
    protected getPrefix() {
        return 'Multisig'
    }

    protected getName() {
        return 'Calls'
    }

    get isV10(): boolean {
        return this.getTypeHash() === 'f2c625a45f7e4212d08a35de621ee69426ec65ab8200e29512887abb064620ab'
    }

    get asV10(): MultisigCallsStorageV10 {
        assert(this.isV10)
        return this as any
    }
}

export interface MultisigCallsStorageV10 {
    get(key: Uint8Array): Promise<([Uint8Array, Uint8Array, bigint] | undefined)>
    getAll(): Promise<[Uint8Array, Uint8Array, bigint][]>
    getMany(keys: Uint8Array[]): Promise<([Uint8Array, Uint8Array, bigint] | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [Uint8Array, Uint8Array, bigint]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [Uint8Array, Uint8Array, bigint]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [Uint8Array, Uint8Array, bigint]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [Uint8Array, Uint8Array, bigint]][]>
}

export class MultisigMultisigsStorage extends StorageBase {
    protected getPrefix() {
        return 'Multisig'
    }

    protected getName() {
        return 'Multisigs'
    }

    /**
     *  The set of open multisig operations.
     */
    get isV10(): boolean {
        return this.getTypeHash() === 'b65d340f044c1216d5b13f831064204fe7a82b1bb66e6bf6cc01b1b5a3f1606a'
    }

    /**
     *  The set of open multisig operations.
     */
    get asV10(): MultisigMultisigsStorageV10 {
        assert(this.isV10)
        return this as any
    }
}

/**
 *  The set of open multisig operations.
 */
export interface MultisigMultisigsStorageV10 {
    get(key1: Uint8Array, key2: Uint8Array): Promise<(v10.Multisig | undefined)>
    getAll(): Promise<v10.Multisig[]>
    getMany(keys: [Uint8Array, Uint8Array][]): Promise<(v10.Multisig | undefined)[]>
    getKeys(): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array, key2: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getPairs(): Promise<[k: [Uint8Array, Uint8Array], v: v10.Multisig][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: v10.Multisig][]>
    getPairs(key1: Uint8Array, key2: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: v10.Multisig][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, Uint8Array], v: v10.Multisig][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: v10.Multisig][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: v10.Multisig][]>
}

export class OffencesConcurrentReportsIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'Offences'
    }

    protected getName() {
        return 'ConcurrentReportsIndex'
    }

    /**
     *  A vector of reports of the same kind that happened at the same time slot.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'd5c59a6db2baab9f1dcc1a37b0131a737935fd2082fcf39b6abc3f1d6e3ae008'
    }

    /**
     *  A vector of reports of the same kind that happened at the same time slot.
     */
    get asV5(): OffencesConcurrentReportsIndexStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  A vector of reports of the same kind that happened at the same time slot.
 */
export interface OffencesConcurrentReportsIndexStorageV5 {
    get(key1: Uint8Array, key2: Uint8Array): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: [Uint8Array, Uint8Array][]): Promise<Uint8Array[][]>
    getKeys(): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array, key2: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getPairs(): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairs(key1: Uint8Array, key2: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
}

export class OffencesDeferredOffencesStorage extends StorageBase {
    protected getPrefix() {
        return 'Offences'
    }

    protected getName() {
        return 'DeferredOffences'
    }

    /**
     *  Deferred reports that have been rejected by the offence handler and need to be submitted
     *  at a later time.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '65c2bd7c83332ec30382595579905bc2abf22a9f87aa00c33bcc28ba95f3b845'
    }

    /**
     *  Deferred reports that have been rejected by the offence handler and need to be submitted
     *  at a later time.
     */
    get asV5(): OffencesDeferredOffencesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Deferred reports that have been rejected by the offence handler and need to be submitted
 *  at a later time.
 */
export interface OffencesDeferredOffencesStorageV5 {
    get(): Promise<[v5.OffenceDetails[], number[], number][]>
}

export class OffencesReportsStorage extends StorageBase {
    protected getPrefix() {
        return 'Offences'
    }

    protected getName() {
        return 'Reports'
    }

    /**
     *  The primary structure that holds all offence records keyed by report identifiers.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'e52641726adeb87007a96ce7684aad2f8233624d39e0ad7727f22f889bc9279f'
    }

    /**
     *  The primary structure that holds all offence records keyed by report identifiers.
     */
    get asV5(): OffencesReportsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The primary structure that holds all offence records keyed by report identifiers.
 */
export interface OffencesReportsStorageV5 {
    get(key: Uint8Array): Promise<(v5.OffenceDetails | undefined)>
    getAll(): Promise<v5.OffenceDetails[]>
    getMany(keys: Uint8Array[]): Promise<(v5.OffenceDetails | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.OffenceDetails][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.OffenceDetails][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.OffenceDetails][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.OffenceDetails][]>
}

export class OffencesReportsByKindIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'Offences'
    }

    protected getName() {
        return 'ReportsByKindIndex'
    }

    /**
     *  Enumerates all reports of a kind along with the time they happened.
     * 
     *  All reports are sorted by the time of offence.
     * 
     *  Note that the actual type of this mapping is `Vec<u8>`, this is because values of
     *  different types are not supported at the moment so we are doing the manual serialization.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '0f535b9892aaca40228e6d3f57b63c241690838a686fa8be3e7f0992bfda0d19'
    }

    /**
     *  Enumerates all reports of a kind along with the time they happened.
     * 
     *  All reports are sorted by the time of offence.
     * 
     *  Note that the actual type of this mapping is `Vec<u8>`, this is because values of
     *  different types are not supported at the moment so we are doing the manual serialization.
     */
    get asV5(): OffencesReportsByKindIndexStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Enumerates all reports of a kind along with the time they happened.
 * 
 *  All reports are sorted by the time of offence.
 * 
 *  Note that the actual type of this mapping is `Vec<u8>`, this is because values of
 *  different types are not supported at the moment so we are doing the manual serialization.
 */
export interface OffencesReportsByKindIndexStorageV5 {
    get(key: Uint8Array): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: Uint8Array[]): Promise<Uint8Array[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
}

export class PocCandidatesStorage extends StorageBase {
    protected getPrefix() {
        return 'Poc'
    }

    protected getName() {
        return 'Candidates'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '0bac40afaf72ceea5a87ae2baaa5fe7f69915323f3293bdd970e7790a9d968c0'
    }

    get asV5(): PocCandidatesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface PocCandidatesStorageV5 {
    get(key: Uint8Array): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: Uint8Array[]): Promise<bigint[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: bigint][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: bigint][]>
}

export class PocCandidatesCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Poc'
    }

    protected getName() {
        return 'CandidatesCount'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    get asV5(): PocCandidatesCountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface PocCandidatesCountStorageV5 {
    get(): Promise<number>
}

export class PocCommitmentsStorage extends StorageBase {
    protected getPrefix() {
        return 'Poc'
    }

    protected getName() {
        return 'Commitments'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '3e1f3176efbde09966353832658de9a5d39bc18a43d4d72fbd7f5a2db5e0778e'
    }

    get asV5(): PocCommitmentsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface PocCommitmentsStorageV5 {
    get(key: Uint8Array): Promise<v5.CommitmentOf>
    getAll(): Promise<v5.CommitmentOf[]>
    getMany(keys: Uint8Array[]): Promise<v5.CommitmentOf[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.CommitmentOf][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.CommitmentOf][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.CommitmentOf][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.CommitmentOf][]>
}

export class PocCurrentEraStorage extends StorageBase {
    protected getPrefix() {
        return 'Poc'
    }

    protected getName() {
        return 'CurrentEra'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '4e5a8ba186495dfd2d87cf162b026dcf7d485d9c199d82da7e742f2fcedd289d'
    }

    get asV5(): PocCurrentEraStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface PocCurrentEraStorageV5 {
    get(): Promise<v5.Era>
}

export class PocLockedAmountStorage extends StorageBase {
    protected getPrefix() {
        return 'Poc'
    }

    protected getName() {
        return 'LockedAmount'
    }

    get isV5(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    get asV5(): PocLockedAmountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface PocLockedAmountStorageV5 {
    get(): Promise<bigint>
}

export class PocMembersStorage extends StorageBase {
    protected getPrefix() {
        return 'Poc'
    }

    protected getName() {
        return 'Members'
    }

    get isV5(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    get asV5(): PocMembersStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface PocMembersStorageV5 {
    get(): Promise<Uint8Array[]>
}

export class PocVoterRewardsStorage extends StorageBase {
    protected getPrefix() {
        return 'Poc'
    }

    protected getName() {
        return 'VoterRewards'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '383583ae6013abc9a758ff4507f5a0135dc5c573133f8b060b7892e48adbaab2'
    }

    get asV5(): PocVoterRewardsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface PocVoterRewardsStorageV5 {
    get(key1: number, key2: Uint8Array): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: [number, Uint8Array][]): Promise<bigint[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: bigint][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: bigint][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: bigint][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: bigint][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: bigint][]>
}

export class RandomnessCollectiveFlipRandomMaterialStorage extends StorageBase {
    protected getPrefix() {
        return 'RandomnessCollectiveFlip'
    }

    protected getName() {
        return 'RandomMaterial'
    }

    /**
     *  Series of block headers from the last 81 blocks that acts as random seed material. This
     *  is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     *  the oldest hash.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  Series of block headers from the last 81 blocks that acts as random seed material. This
     *  is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     *  the oldest hash.
     */
    get asV5(): RandomnessCollectiveFlipRandomMaterialStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Series of block headers from the last 81 blocks that acts as random seed material. This
 *  is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
 *  the oldest hash.
 */
export interface RandomnessCollectiveFlipRandomMaterialStorageV5 {
    get(): Promise<Uint8Array[]>
}

export class SchedulerAgendaStorage extends StorageBase {
    protected getPrefix() {
        return 'Scheduler'
    }

    protected getName() {
        return 'Agenda'
    }

    /**
     *  Items to be executed, indexed by the block number that they should be executed on.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '6d5d8abb83b03dd950dca748ce8eeb47559f501b4c5da98a78f4e613b945d5a1'
    }

    /**
     *  Items to be executed, indexed by the block number that they should be executed on.
     */
    get asV5(): SchedulerAgendaStorageV5 {
        assert(this.isV5)
        return this as any
    }

    /**
     *  Items to be executed, indexed by the block number that they should be executed on.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '4d21601d5b516de6ed9df86ba07f1d1093b18b3ed1419ac0e203856018714006'
    }

    /**
     *  Items to be executed, indexed by the block number that they should be executed on.
     */
    get asV8(): SchedulerAgendaStorageV8 {
        assert(this.isV8)
        return this as any
    }

    /**
     *  Items to be executed, indexed by the block number that they should be executed on.
     */
    get isV10(): boolean {
        return this.getTypeHash() === '47f55c57304e2f5bf73bc2e9cea7e151a92a7881193b4115afdb201c2eee940f'
    }

    /**
     *  Items to be executed, indexed by the block number that they should be executed on.
     */
    get asV10(): SchedulerAgendaStorageV10 {
        assert(this.isV10)
        return this as any
    }
}

/**
 *  Items to be executed, indexed by the block number that they should be executed on.
 */
export interface SchedulerAgendaStorageV5 {
    get(key: number): Promise<(v5.Scheduled | undefined)[]>
    getAll(): Promise<(v5.Scheduled | undefined)[][]>
    getMany(keys: number[]): Promise<(v5.Scheduled | undefined)[][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: (v5.Scheduled | undefined)[]][]>
    getPairs(key: number): Promise<[k: number, v: (v5.Scheduled | undefined)[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: (v5.Scheduled | undefined)[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: (v5.Scheduled | undefined)[]][]>
}

/**
 *  Items to be executed, indexed by the block number that they should be executed on.
 */
export interface SchedulerAgendaStorageV8 {
    get(key: number): Promise<(v8.Scheduled | undefined)[]>
    getAll(): Promise<(v8.Scheduled | undefined)[][]>
    getMany(keys: number[]): Promise<(v8.Scheduled | undefined)[][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: (v8.Scheduled | undefined)[]][]>
    getPairs(key: number): Promise<[k: number, v: (v8.Scheduled | undefined)[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: (v8.Scheduled | undefined)[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: (v8.Scheduled | undefined)[]][]>
}

/**
 *  Items to be executed, indexed by the block number that they should be executed on.
 */
export interface SchedulerAgendaStorageV10 {
    get(key: number): Promise<(v10.Scheduled | undefined)[]>
    getAll(): Promise<(v10.Scheduled | undefined)[][]>
    getMany(keys: number[]): Promise<(v10.Scheduled | undefined)[][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: (v10.Scheduled | undefined)[]][]>
    getPairs(key: number): Promise<[k: number, v: (v10.Scheduled | undefined)[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: (v10.Scheduled | undefined)[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: (v10.Scheduled | undefined)[]][]>
}

export class SchedulerLookupStorage extends StorageBase {
    protected getPrefix() {
        return 'Scheduler'
    }

    protected getName() {
        return 'Lookup'
    }

    /**
     *  Lookup from identity to the block number and index of the task.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'd134b5bb4dad116817692e25dce47c836fbbb31d353d5749d4fc370b62e7286b'
    }

    /**
     *  Lookup from identity to the block number and index of the task.
     */
    get asV5(): SchedulerLookupStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Lookup from identity to the block number and index of the task.
 */
export interface SchedulerLookupStorageV5 {
    get(key: Uint8Array): Promise<([number, number] | undefined)>
    getAll(): Promise<[number, number][]>
    getMany(keys: Uint8Array[]): Promise<([number, number] | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [number, number]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [number, number]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [number, number]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [number, number]][]>
}

export class SchedulerStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'Scheduler'
    }

    protected getName() {
        return 'StorageVersion'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  New networks start with last version.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '78a0d483d7fe4fc699def1765b9b22deed84e9f003169321f89a7b2c516a4ffe'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  New networks start with last version.
     */
    get asV5(): SchedulerStorageVersionStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Storage version of the pallet.
 * 
 *  New networks start with last version.
 */
export interface SchedulerStorageVersionStorageV5 {
    get(): Promise<v5.Releases>
}

export class SessionCurrentIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'CurrentIndex'
    }

    /**
     *  Current index of the session.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Current index of the session.
     */
    get asV5(): SessionCurrentIndexStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Current index of the session.
 */
export interface SessionCurrentIndexStorageV5 {
    get(): Promise<number>
}

export class SessionDisabledValidatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'DisabledValidators'
    }

    /**
     *  Indices of disabled validators.
     * 
     *  The set is cleared when `on_session_ending` returns a new set of identities.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'a9f6979e68cec9d5834e7d077129aa05e8b477f326cb009049d2178afbea14f0'
    }

    /**
     *  Indices of disabled validators.
     * 
     *  The set is cleared when `on_session_ending` returns a new set of identities.
     */
    get asV5(): SessionDisabledValidatorsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Indices of disabled validators.
 * 
 *  The set is cleared when `on_session_ending` returns a new set of identities.
 */
export interface SessionDisabledValidatorsStorageV5 {
    get(): Promise<number[]>
}

export class SessionKeyOwnerStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'KeyOwner'
    }

    /**
     *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '1c05e6d248d0d3f2ef2467d3e23031e7885220321b761d4eda9deda33530daa1'
    }

    /**
     *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
     */
    get asV5(): SessionKeyOwnerStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The owner of a key. The key is the `KeyTypeId` + the encoded key.
 */
export interface SessionKeyOwnerStorageV5 {
    get(key: [number, Uint8Array]): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [number, Uint8Array][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key: [number, Uint8Array]): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key: [number, Uint8Array]): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: Uint8Array][]>
    getPairs(key: [number, Uint8Array]): Promise<[k: [number, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: [number, Uint8Array]): AsyncIterable<[k: [number, Uint8Array], v: Uint8Array][]>
}

export class SessionNextKeysStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'NextKeys'
    }

    /**
     *  The next session keys for a validator.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '06459dcdcc89901e73a147d4ae82c4f75070451bf16eb7d34c12175a2b1401b7'
    }

    /**
     *  The next session keys for a validator.
     */
    get asV5(): SessionNextKeysStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The next session keys for a validator.
 */
export interface SessionNextKeysStorageV5 {
    get(key: Uint8Array): Promise<([Uint8Array, Uint8Array, Uint8Array, Uint8Array] | undefined)>
    getAll(): Promise<[Uint8Array, Uint8Array, Uint8Array, Uint8Array][]>
    getMany(keys: Uint8Array[]): Promise<([Uint8Array, Uint8Array, Uint8Array, Uint8Array] | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [Uint8Array, Uint8Array, Uint8Array, Uint8Array]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [Uint8Array, Uint8Array, Uint8Array, Uint8Array]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [Uint8Array, Uint8Array, Uint8Array, Uint8Array]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [Uint8Array, Uint8Array, Uint8Array, Uint8Array]][]>
}

export class SessionQueuedChangedStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'QueuedChanged'
    }

    /**
     *  True if the underlying economic identities or weighting behind the validators
     *  has changed in the queued validator set.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if the underlying economic identities or weighting behind the validators
     *  has changed in the queued validator set.
     */
    get asV5(): SessionQueuedChangedStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  True if the underlying economic identities or weighting behind the validators
 *  has changed in the queued validator set.
 */
export interface SessionQueuedChangedStorageV5 {
    get(): Promise<boolean>
}

export class SessionQueuedKeysStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'QueuedKeys'
    }

    /**
     *  The queued keys for the next session. When the next session begins, these keys
     *  will be used to determine the validator's session keys.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '97d429a9c24aed732193c357ecc2cbf69fd3bc9a616ef550f35af306547d9189'
    }

    /**
     *  The queued keys for the next session. When the next session begins, these keys
     *  will be used to determine the validator's session keys.
     */
    get asV5(): SessionQueuedKeysStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The queued keys for the next session. When the next session begins, these keys
 *  will be used to determine the validator's session keys.
 */
export interface SessionQueuedKeysStorageV5 {
    get(): Promise<[Uint8Array, [Uint8Array, Uint8Array, Uint8Array, Uint8Array]][]>
}

export class SessionValidatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Session'
    }

    protected getName() {
        return 'Validators'
    }

    /**
     *  The current set of validators.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current set of validators.
     */
    get asV5(): SessionValidatorsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The current set of validators.
 */
export interface SessionValidatorsStorageV5 {
    get(): Promise<Uint8Array[]>
}

export class StakingActiveEraStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ActiveEra'
    }

    /**
     *  The active era information, it holds index and start.
     * 
     *  The active era is the era being currently rewarded. Validator set of this era must be
     *  equal to [`SessionInterface::validators`].
     */
    get isV5(): boolean {
        return this.getTypeHash() === '2bb946dd9c19de9f4332897005d1255528c610172f7418fae165b5dafd3cfbfe'
    }

    /**
     *  The active era information, it holds index and start.
     * 
     *  The active era is the era being currently rewarded. Validator set of this era must be
     *  equal to [`SessionInterface::validators`].
     */
    get asV5(): StakingActiveEraStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The active era information, it holds index and start.
 * 
 *  The active era is the era being currently rewarded. Validator set of this era must be
 *  equal to [`SessionInterface::validators`].
 */
export interface StakingActiveEraStorageV5 {
    get(): Promise<(v5.ActiveEraInfo | undefined)>
}

export class StakingBondedStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Bonded'
    }

    /**
     *  Map from all locked "stash" accounts to the controller account.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'de3ac6d702494f77c04d74bab1d59ac44113746a3722fe8b7306730fb0fc740c'
    }

    /**
     *  Map from all locked "stash" accounts to the controller account.
     */
    get asV5(): StakingBondedStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Map from all locked "stash" accounts to the controller account.
 */
export interface StakingBondedStorageV5 {
    get(key: Uint8Array): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: Uint8Array[]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
}

export class StakingBondedErasStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'BondedEras'
    }

    /**
     *  A mapping from still-bonded eras to the first session index of that era.
     * 
     *  Must contains information for eras for the range:
     *  `[active_era - bounding_duration; active_era]`
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'b780f37018db8d8815c6dfde98846c55b5b1d988a7cd0aa1531c92701eab1e95'
    }

    /**
     *  A mapping from still-bonded eras to the first session index of that era.
     * 
     *  Must contains information for eras for the range:
     *  `[active_era - bounding_duration; active_era]`
     */
    get asV5(): StakingBondedErasStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  A mapping from still-bonded eras to the first session index of that era.
 * 
 *  Must contains information for eras for the range:
 *  `[active_era - bounding_duration; active_era]`
 */
export interface StakingBondedErasStorageV5 {
    get(): Promise<[number, number][]>
}

export class StakingCanceledSlashPayoutStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'CanceledSlashPayout'
    }

    /**
     *  The amount of currency given to reporters of a slash event which was
     *  canceled by extraordinary circumstances (e.g. governance).
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The amount of currency given to reporters of a slash event which was
     *  canceled by extraordinary circumstances (e.g. governance).
     */
    get asV5(): StakingCanceledSlashPayoutStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The amount of currency given to reporters of a slash event which was
 *  canceled by extraordinary circumstances (e.g. governance).
 */
export interface StakingCanceledSlashPayoutStorageV5 {
    get(): Promise<bigint>
}

export class StakingChillThresholdStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ChillThreshold'
    }

    /**
     *  The threshold for when users can start calling `chill_other` for other validators / nominators.
     *  The threshold is compared to the actual number of validators / nominators (`CountFor*`) in
     *  the system compared to the configured max (`Max*Count`).
     */
    get isV8(): boolean {
        return this.getTypeHash() === 'a05bf6dd806233a6b9a22cb1cd50bcf79bcb6a1f3014c295988bec299abc5cd3'
    }

    /**
     *  The threshold for when users can start calling `chill_other` for other validators / nominators.
     *  The threshold is compared to the actual number of validators / nominators (`CountFor*`) in
     *  the system compared to the configured max (`Max*Count`).
     */
    get asV8(): StakingChillThresholdStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The threshold for when users can start calling `chill_other` for other validators / nominators.
 *  The threshold is compared to the actual number of validators / nominators (`CountFor*`) in
 *  the system compared to the configured max (`Max*Count`).
 */
export interface StakingChillThresholdStorageV8 {
    get(): Promise<(number | undefined)>
}

export class StakingCounterForNominatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'CounterForNominators'
    }

    /**
     *  A tracker to keep count of the number of items in the `Nominators` map.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  A tracker to keep count of the number of items in the `Nominators` map.
     */
    get asV8(): StakingCounterForNominatorsStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  A tracker to keep count of the number of items in the `Nominators` map.
 */
export interface StakingCounterForNominatorsStorageV8 {
    get(): Promise<number>
}

export class StakingCounterForValidatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'CounterForValidators'
    }

    /**
     *  A tracker to keep count of the number of items in the `Validators` map.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  A tracker to keep count of the number of items in the `Validators` map.
     */
    get asV8(): StakingCounterForValidatorsStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  A tracker to keep count of the number of items in the `Validators` map.
 */
export interface StakingCounterForValidatorsStorageV8 {
    get(): Promise<number>
}

export class StakingCurrentEraStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'CurrentEra'
    }

    /**
     *  The current era index.
     * 
     *  This is the latest planned era, depending on how the Session pallet queues the validator
     *  set, it might be active or not.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  The current era index.
     * 
     *  This is the latest planned era, depending on how the Session pallet queues the validator
     *  set, it might be active or not.
     */
    get asV5(): StakingCurrentEraStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The current era index.
 * 
 *  This is the latest planned era, depending on how the Session pallet queues the validator
 *  set, it might be active or not.
 */
export interface StakingCurrentEraStorageV5 {
    get(): Promise<(number | undefined)>
}

export class StakingCurrentPlannedSessionStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'CurrentPlannedSession'
    }

    /**
     *  The last planned session scheduled by the session pallet.
     * 
     *  This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
     */
    get isV8(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The last planned session scheduled by the session pallet.
     * 
     *  This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
     */
    get asV8(): StakingCurrentPlannedSessionStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The last planned session scheduled by the session pallet.
 * 
 *  This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].
 */
export interface StakingCurrentPlannedSessionStorageV8 {
    get(): Promise<number>
}

export class StakingEarliestUnappliedSlashStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'EarliestUnappliedSlash'
    }

    /**
     *  The earliest era for which we have a pending, unapplied slash.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  The earliest era for which we have a pending, unapplied slash.
     */
    get asV5(): StakingEarliestUnappliedSlashStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The earliest era for which we have a pending, unapplied slash.
 */
export interface StakingEarliestUnappliedSlashStorageV5 {
    get(): Promise<(number | undefined)>
}

export class StakingEraElectionStatusStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'EraElectionStatus'
    }

    /**
     *  Flag to control the execution of the offchain election. When `Open(_)`, we accept
     *  solutions to be submitted.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'bf44282bdbc037310265361b5f110910184ee499c1366addfdbeb65aef359e28'
    }

    /**
     *  Flag to control the execution of the offchain election. When `Open(_)`, we accept
     *  solutions to be submitted.
     */
    get asV5(): StakingEraElectionStatusStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Flag to control the execution of the offchain election. When `Open(_)`, we accept
 *  solutions to be submitted.
 */
export interface StakingEraElectionStatusStorageV5 {
    get(): Promise<v5.ElectionStatus>
}

export class StakingErasRewardPointsStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ErasRewardPoints'
    }

    /**
     *  Rewards for the last `HISTORY_DEPTH` eras.
     *  If reward hasn't been set or has been removed then 0 reward is returned.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '48c202c7b8424da56b623834c54ceaf74129dbd88a59c39931cc7ba131501b50'
    }

    /**
     *  Rewards for the last `HISTORY_DEPTH` eras.
     *  If reward hasn't been set or has been removed then 0 reward is returned.
     */
    get asV5(): StakingErasRewardPointsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Rewards for the last `HISTORY_DEPTH` eras.
 *  If reward hasn't been set or has been removed then 0 reward is returned.
 */
export interface StakingErasRewardPointsStorageV5 {
    get(key: number): Promise<v5.EraRewardPoints>
    getAll(): Promise<v5.EraRewardPoints[]>
    getMany(keys: number[]): Promise<v5.EraRewardPoints[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v5.EraRewardPoints][]>
    getPairs(key: number): Promise<[k: number, v: v5.EraRewardPoints][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v5.EraRewardPoints][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v5.EraRewardPoints][]>
}

export class StakingErasStakersStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ErasStakers'
    }

    /**
     *  Exposure of validator at era.
     * 
     *  This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     *  If stakers hasn't been set or has been removed then empty exposure is returned.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f3f726cc814cef290657008054cd10667b250a01d2842ff3bbbcca24c98abf5b'
    }

    /**
     *  Exposure of validator at era.
     * 
     *  This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     *  If stakers hasn't been set or has been removed then empty exposure is returned.
     */
    get asV5(): StakingErasStakersStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Exposure of validator at era.
 * 
 *  This is keyed first by the era index to allow bulk deletion and then the stash account.
 * 
 *  Is it removed after `HISTORY_DEPTH` eras.
 *  If stakers hasn't been set or has been removed then empty exposure is returned.
 */
export interface StakingErasStakersStorageV5 {
    get(key1: number, key2: Uint8Array): Promise<v5.Exposure>
    getAll(): Promise<v5.Exposure[]>
    getMany(keys: [number, Uint8Array][]): Promise<v5.Exposure[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v5.Exposure][]>
}

export class StakingErasStakersClippedStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ErasStakersClipped'
    }

    /**
     *  Clipped Exposure of validator at era.
     * 
     *  This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
     *  `T::MaxNominatorRewardedPerValidator` biggest stakers.
     *  (Note: the field `total` and `own` of the exposure remains unchanged).
     *  This is used to limit the i/o cost for the nominator payout.
     * 
     *  This is keyed fist by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     *  If stakers hasn't been set or has been removed then empty exposure is returned.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f3f726cc814cef290657008054cd10667b250a01d2842ff3bbbcca24c98abf5b'
    }

    /**
     *  Clipped Exposure of validator at era.
     * 
     *  This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
     *  `T::MaxNominatorRewardedPerValidator` biggest stakers.
     *  (Note: the field `total` and `own` of the exposure remains unchanged).
     *  This is used to limit the i/o cost for the nominator payout.
     * 
     *  This is keyed fist by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     *  If stakers hasn't been set or has been removed then empty exposure is returned.
     */
    get asV5(): StakingErasStakersClippedStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Clipped Exposure of validator at era.
 * 
 *  This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
 *  `T::MaxNominatorRewardedPerValidator` biggest stakers.
 *  (Note: the field `total` and `own` of the exposure remains unchanged).
 *  This is used to limit the i/o cost for the nominator payout.
 * 
 *  This is keyed fist by the era index to allow bulk deletion and then the stash account.
 * 
 *  Is it removed after `HISTORY_DEPTH` eras.
 *  If stakers hasn't been set or has been removed then empty exposure is returned.
 */
export interface StakingErasStakersClippedStorageV5 {
    get(key1: number, key2: Uint8Array): Promise<v5.Exposure>
    getAll(): Promise<v5.Exposure[]>
    getMany(keys: [number, Uint8Array][]): Promise<v5.Exposure[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v5.Exposure][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v5.Exposure][]>
}

export class StakingErasStartSessionIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ErasStartSessionIndex'
    }

    /**
     *  The session index at which the era start for the last `HISTORY_DEPTH` eras.
     * 
     *  Note: This tracks the starting session (i.e. session index when era start being active)
     *  for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '8abbf6045d679e1267b0be7870d035c80cf57bb79cd0d9a111d1521cf79efdde'
    }

    /**
     *  The session index at which the era start for the last `HISTORY_DEPTH` eras.
     * 
     *  Note: This tracks the starting session (i.e. session index when era start being active)
     *  for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
     */
    get asV5(): StakingErasStartSessionIndexStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The session index at which the era start for the last `HISTORY_DEPTH` eras.
 * 
 *  Note: This tracks the starting session (i.e. session index when era start being active)
 *  for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.
 */
export interface StakingErasStartSessionIndexStorageV5 {
    get(key: number): Promise<(number | undefined)>
    getAll(): Promise<number[]>
    getMany(keys: number[]): Promise<(number | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: number][]>
    getPairs(key: number): Promise<[k: number, v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: number][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: number][]>
}

export class StakingErasTotalStakeStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ErasTotalStake'
    }

    /**
     *  The total amount staked for the last `HISTORY_DEPTH` eras.
     *  If total hasn't been set or has been removed then 0 stake is returned.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'd4b0e776f9f1d19233fe32cd062ab41a912af3d15ceb9d02d9ebc8fbe7b1cda4'
    }

    /**
     *  The total amount staked for the last `HISTORY_DEPTH` eras.
     *  If total hasn't been set or has been removed then 0 stake is returned.
     */
    get asV5(): StakingErasTotalStakeStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The total amount staked for the last `HISTORY_DEPTH` eras.
 *  If total hasn't been set or has been removed then 0 stake is returned.
 */
export interface StakingErasTotalStakeStorageV5 {
    get(key: number): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: number[]): Promise<bigint[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: bigint][]>
    getPairs(key: number): Promise<[k: number, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: bigint][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: bigint][]>
}

export class StakingErasValidatorPrefsStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ErasValidatorPrefs'
    }

    /**
     *  Similar to `ErasStakers`, this holds the preferences of validators.
     * 
     *  This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '2f145e368b1c1a9540437d8c25b9502d09b7e977e27a6bb99156b6bf2c6269d2'
    }

    /**
     *  Similar to `ErasStakers`, this holds the preferences of validators.
     * 
     *  This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     *  Is it removed after `HISTORY_DEPTH` eras.
     */
    get asV5(): StakingErasValidatorPrefsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Similar to `ErasStakers`, this holds the preferences of validators.
 * 
 *  This is keyed first by the era index to allow bulk deletion and then the stash account.
 * 
 *  Is it removed after `HISTORY_DEPTH` eras.
 */
export interface StakingErasValidatorPrefsStorageV5 {
    get(key1: number, key2: Uint8Array): Promise<v5.ValidatorPrefs>
    getAll(): Promise<v5.ValidatorPrefs[]>
    getMany(keys: [number, Uint8Array][]): Promise<v5.ValidatorPrefs[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v5.ValidatorPrefs][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v5.ValidatorPrefs][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v5.ValidatorPrefs][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v5.ValidatorPrefs][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v5.ValidatorPrefs][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v5.ValidatorPrefs][]>
}

export class StakingErasValidatorRewardStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ErasValidatorReward'
    }

    /**
     *  The total validator era payout for the last `HISTORY_DEPTH` eras.
     * 
     *  Eras that haven't finished yet or has been removed doesn't have reward.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '3780d76d37a3d09046e926a777def6003178c440a915a931a34a74b88a4094a5'
    }

    /**
     *  The total validator era payout for the last `HISTORY_DEPTH` eras.
     * 
     *  Eras that haven't finished yet or has been removed doesn't have reward.
     */
    get asV5(): StakingErasValidatorRewardStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The total validator era payout for the last `HISTORY_DEPTH` eras.
 * 
 *  Eras that haven't finished yet or has been removed doesn't have reward.
 */
export interface StakingErasValidatorRewardStorageV5 {
    get(key: number): Promise<(bigint | undefined)>
    getAll(): Promise<bigint[]>
    getMany(keys: number[]): Promise<(bigint | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: bigint][]>
    getPairs(key: number): Promise<[k: number, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: bigint][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: bigint][]>
}

export class StakingForceEraStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ForceEra'
    }

    /**
     *  Mode of era forcing.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'b7c79f26737f4e7aed039b709a4e473b3e4912bf8a2efbe7cc8c5fc9f7531c81'
    }

    /**
     *  Mode of era forcing.
     */
    get asV5(): StakingForceEraStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Mode of era forcing.
 */
export interface StakingForceEraStorageV5 {
    get(): Promise<v5.Forcing>
}

export class StakingHistoryDepthStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'HistoryDepth'
    }

    /**
     *  Number of eras to keep in history.
     * 
     *  Information is kept for eras in `[current_era - history_depth; current_era]`.
     * 
     *  Must be more than the number of eras delayed by session otherwise. I.e. active era must
     *  always be in history. I.e. `active_era > current_era - history_depth` must be
     *  guaranteed.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Number of eras to keep in history.
     * 
     *  Information is kept for eras in `[current_era - history_depth; current_era]`.
     * 
     *  Must be more than the number of eras delayed by session otherwise. I.e. active era must
     *  always be in history. I.e. `active_era > current_era - history_depth` must be
     *  guaranteed.
     */
    get asV5(): StakingHistoryDepthStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Number of eras to keep in history.
 * 
 *  Information is kept for eras in `[current_era - history_depth; current_era]`.
 * 
 *  Must be more than the number of eras delayed by session otherwise. I.e. active era must
 *  always be in history. I.e. `active_era > current_era - history_depth` must be
 *  guaranteed.
 */
export interface StakingHistoryDepthStorageV5 {
    get(): Promise<number>
}

export class StakingInvulnerablesStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Invulnerables'
    }

    /**
     *  Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
     *  easy to initialize and the performance hit is minimal (we expect no more than four
     *  invulnerables) and restricted to testnets.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
     *  easy to initialize and the performance hit is minimal (we expect no more than four
     *  invulnerables) and restricted to testnets.
     */
    get asV5(): StakingInvulnerablesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
 *  easy to initialize and the performance hit is minimal (we expect no more than four
 *  invulnerables) and restricted to testnets.
 */
export interface StakingInvulnerablesStorageV5 {
    get(): Promise<Uint8Array[]>
}

export class StakingIsCurrentSessionFinalStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'IsCurrentSessionFinal'
    }

    /**
     *  True if the current **planned** session is final. Note that this does not take era
     *  forcing into account.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if the current **planned** session is final. Note that this does not take era
     *  forcing into account.
     */
    get asV5(): StakingIsCurrentSessionFinalStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  True if the current **planned** session is final. Note that this does not take era
 *  forcing into account.
 */
export interface StakingIsCurrentSessionFinalStorageV5 {
    get(): Promise<boolean>
}

export class StakingLedgerStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Ledger'
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '838ac827cb2532f983c68467cfa97afcccf6147fb96e61e136394060880b64a4'
    }

    /**
     *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
     */
    get asV5(): StakingLedgerStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Map from all (unlocked) "controller" accounts to the info regarding the staking.
 */
export interface StakingLedgerStorageV5 {
    get(key: Uint8Array): Promise<(v5.StakingLedger | undefined)>
    getAll(): Promise<v5.StakingLedger[]>
    getMany(keys: Uint8Array[]): Promise<(v5.StakingLedger | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.StakingLedger][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.StakingLedger][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.StakingLedger][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.StakingLedger][]>
}

export class StakingMaxNominatorsCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'MaxNominatorsCount'
    }

    /**
     *  The maximum nominator count before we stop allowing new validators to join.
     * 
     *  When this value is not set, no limits are enforced.
     */
    get isV8(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  The maximum nominator count before we stop allowing new validators to join.
     * 
     *  When this value is not set, no limits are enforced.
     */
    get asV8(): StakingMaxNominatorsCountStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The maximum nominator count before we stop allowing new validators to join.
 * 
 *  When this value is not set, no limits are enforced.
 */
export interface StakingMaxNominatorsCountStorageV8 {
    get(): Promise<(number | undefined)>
}

export class StakingMaxValidatorsCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'MaxValidatorsCount'
    }

    /**
     *  The maximum validator count before we stop allowing new validators to join.
     * 
     *  When this value is not set, no limits are enforced.
     */
    get isV8(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  The maximum validator count before we stop allowing new validators to join.
     * 
     *  When this value is not set, no limits are enforced.
     */
    get asV8(): StakingMaxValidatorsCountStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The maximum validator count before we stop allowing new validators to join.
 * 
 *  When this value is not set, no limits are enforced.
 */
export interface StakingMaxValidatorsCountStorageV8 {
    get(): Promise<(number | undefined)>
}

export class StakingMinNominatorBondStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'MinNominatorBond'
    }

    /**
     *  The minimum active bond to become and maintain the role of a nominator.
     */
    get isV8(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The minimum active bond to become and maintain the role of a nominator.
     */
    get asV8(): StakingMinNominatorBondStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The minimum active bond to become and maintain the role of a nominator.
 */
export interface StakingMinNominatorBondStorageV8 {
    get(): Promise<bigint>
}

export class StakingMinValidatorBondStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'MinValidatorBond'
    }

    /**
     *  The minimum active bond to become and maintain the role of a validator.
     */
    get isV8(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The minimum active bond to become and maintain the role of a validator.
     */
    get asV8(): StakingMinValidatorBondStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The minimum active bond to become and maintain the role of a validator.
 */
export interface StakingMinValidatorBondStorageV8 {
    get(): Promise<bigint>
}

export class StakingMinimumValidatorCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'MinimumValidatorCount'
    }

    /**
     *  Minimum number of staking participants before emergency conditions are imposed.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Minimum number of staking participants before emergency conditions are imposed.
     */
    get asV5(): StakingMinimumValidatorCountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Minimum number of staking participants before emergency conditions are imposed.
 */
export interface StakingMinimumValidatorCountStorageV5 {
    get(): Promise<number>
}

export class StakingNominatorSlashInEraStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'NominatorSlashInEra'
    }

    /**
     *  All slashing events on nominators, mapped by era to the highest slash value of the era.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '019c211c1e4452f7fe517a6d5cafde0784f5991ddd51ac15e84213941f3208c2'
    }

    /**
     *  All slashing events on nominators, mapped by era to the highest slash value of the era.
     */
    get asV5(): StakingNominatorSlashInEraStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  All slashing events on nominators, mapped by era to the highest slash value of the era.
 */
export interface StakingNominatorSlashInEraStorageV5 {
    get(key1: number, key2: Uint8Array): Promise<(bigint | undefined)>
    getAll(): Promise<bigint[]>
    getMany(keys: [number, Uint8Array][]): Promise<(bigint | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: bigint][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: bigint][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: bigint][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: bigint][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: bigint][]>
}

export class StakingNominatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Nominators'
    }

    /**
     *  The map from nominator stash key to the set of stash keys of all validators to nominate.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'a72d3e17e59f46bbd05fb0efd27052437fe2b1c41b0c89fe950edfb3b79e3c78'
    }

    /**
     *  The map from nominator stash key to the set of stash keys of all validators to nominate.
     */
    get asV5(): StakingNominatorsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The map from nominator stash key to the set of stash keys of all validators to nominate.
 */
export interface StakingNominatorsStorageV5 {
    get(key: Uint8Array): Promise<(v5.Nominations | undefined)>
    getAll(): Promise<v5.Nominations[]>
    getMany(keys: Uint8Array[]): Promise<(v5.Nominations | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.Nominations][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.Nominations][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.Nominations][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.Nominations][]>
}

export class StakingPayeeStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Payee'
    }

    /**
     *  Where the reward payment should be made. Keyed by stash.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '997acadf80b79903fb4386b933d481dff61dad22612d657f19f39b937ea8d992'
    }

    /**
     *  Where the reward payment should be made. Keyed by stash.
     */
    get asV5(): StakingPayeeStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Where the reward payment should be made. Keyed by stash.
 */
export interface StakingPayeeStorageV5 {
    get(key: Uint8Array): Promise<v5.RewardDestination>
    getAll(): Promise<v5.RewardDestination[]>
    getMany(keys: Uint8Array[]): Promise<v5.RewardDestination[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.RewardDestination][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.RewardDestination][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.RewardDestination][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.RewardDestination][]>
}

export class StakingQueuedElectedStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'QueuedElected'
    }

    /**
     *  The next validator set. At the end of an era, if this is available (potentially from the
     *  result of an offchain worker), it is immediately used. Otherwise, the on-chain election
     *  is executed.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '4eb4938a9c4768286e5e98cd46cabfc8a8c98b113bbbe8616621e5fc6aa8e4d5'
    }

    /**
     *  The next validator set. At the end of an era, if this is available (potentially from the
     *  result of an offchain worker), it is immediately used. Otherwise, the on-chain election
     *  is executed.
     */
    get asV5(): StakingQueuedElectedStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The next validator set. At the end of an era, if this is available (potentially from the
 *  result of an offchain worker), it is immediately used. Otherwise, the on-chain election
 *  is executed.
 */
export interface StakingQueuedElectedStorageV5 {
    get(): Promise<(v5.ElectionResult | undefined)>
}

export class StakingQueuedScoreStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'QueuedScore'
    }

    /**
     *  The score of the current [`QueuedElected`].
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'fc5a4796e3467f3450c1f03819f4fe9e47a6e584803699b23c3072af283f03fa'
    }

    /**
     *  The score of the current [`QueuedElected`].
     */
    get asV5(): StakingQueuedScoreStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The score of the current [`QueuedElected`].
 */
export interface StakingQueuedScoreStorageV5 {
    get(): Promise<(bigint[] | undefined)>
}

export class StakingSlashRewardFractionStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'SlashRewardFraction'
    }

    /**
     *  The percentage of the slash that is distributed to reporters.
     * 
     *  The rest of the slashed value is handled by the `Slash`.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The percentage of the slash that is distributed to reporters.
     * 
     *  The rest of the slashed value is handled by the `Slash`.
     */
    get asV5(): StakingSlashRewardFractionStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The percentage of the slash that is distributed to reporters.
 * 
 *  The rest of the slashed value is handled by the `Slash`.
 */
export interface StakingSlashRewardFractionStorageV5 {
    get(): Promise<number>
}

export class StakingSlashingSpansStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'SlashingSpans'
    }

    /**
     *  Slashing spans for stash accounts.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'b2f49d14e3e4e56cf533a97be4eadb0e19c21d28a6b1b78aa85d7fda1f7e298b'
    }

    /**
     *  Slashing spans for stash accounts.
     */
    get asV5(): StakingSlashingSpansStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Slashing spans for stash accounts.
 */
export interface StakingSlashingSpansStorageV5 {
    get(key: Uint8Array): Promise<(v5.SlashingSpans | undefined)>
    getAll(): Promise<v5.SlashingSpans[]>
    getMany(keys: Uint8Array[]): Promise<(v5.SlashingSpans | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.SlashingSpans][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.SlashingSpans][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.SlashingSpans][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.SlashingSpans][]>
}

export class StakingSnapshotNominatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'SnapshotNominators'
    }

    /**
     *  Snapshot of nominators at the beginning of the current election window. This should only
     *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '215c9d892fd7dcb1c19e9e4a7fa5848984bdbf3a79a842166eacdb84766538c2'
    }

    /**
     *  Snapshot of nominators at the beginning of the current election window. This should only
     *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     */
    get asV5(): StakingSnapshotNominatorsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Snapshot of nominators at the beginning of the current election window. This should only
 *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
 */
export interface StakingSnapshotNominatorsStorageV5 {
    get(): Promise<(Uint8Array[] | undefined)>
}

export class StakingSnapshotValidatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'SnapshotValidators'
    }

    /**
     *  Snapshot of validators at the beginning of the current election window. This should only
     *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '215c9d892fd7dcb1c19e9e4a7fa5848984bdbf3a79a842166eacdb84766538c2'
    }

    /**
     *  Snapshot of validators at the beginning of the current election window. This should only
     *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     */
    get asV5(): StakingSnapshotValidatorsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Snapshot of validators at the beginning of the current election window. This should only
 *  have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
 */
export interface StakingSnapshotValidatorsStorageV5 {
    get(): Promise<(Uint8Array[] | undefined)>
}

export class StakingSpanSlashStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'SpanSlash'
    }

    /**
     *  Records information about the maximum slash of a stash within a slashing span,
     *  as well as how much reward has been paid out.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '3c3a6ad88aa43453f825e9fdcd8fb3dbdc0bef20e2be50b06d357c7c3d8e3488'
    }

    /**
     *  Records information about the maximum slash of a stash within a slashing span,
     *  as well as how much reward has been paid out.
     */
    get asV5(): StakingSpanSlashStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Records information about the maximum slash of a stash within a slashing span,
 *  as well as how much reward has been paid out.
 */
export interface StakingSpanSlashStorageV5 {
    get(key: [Uint8Array, number]): Promise<v5.SpanRecord>
    getAll(): Promise<v5.SpanRecord[]>
    getMany(keys: [Uint8Array, number][]): Promise<v5.SpanRecord[]>
    getKeys(): Promise<[Uint8Array, number][]>
    getKeys(key: [Uint8Array, number]): Promise<[Uint8Array, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, number][]>
    getKeysPaged(pageSize: number, key: [Uint8Array, number]): AsyncIterable<[Uint8Array, number][]>
    getPairs(): Promise<[k: [Uint8Array, number], v: v5.SpanRecord][]>
    getPairs(key: [Uint8Array, number]): Promise<[k: [Uint8Array, number], v: v5.SpanRecord][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, number], v: v5.SpanRecord][]>
    getPairsPaged(pageSize: number, key: [Uint8Array, number]): AsyncIterable<[k: [Uint8Array, number], v: v5.SpanRecord][]>
}

export class StakingStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'StorageVersion'
    }

    /**
     *  True if network has been upgraded to this version.
     *  Storage version of the pallet.
     * 
     *  This is set to v5.0.0 for new networks.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '78a0d483d7fe4fc699def1765b9b22deed84e9f003169321f89a7b2c516a4ffe'
    }

    /**
     *  True if network has been upgraded to this version.
     *  Storage version of the pallet.
     * 
     *  This is set to v5.0.0 for new networks.
     */
    get asV5(): StakingStorageVersionStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  True if network has been upgraded to this version.
 *  Storage version of the pallet.
 * 
 *  This is set to v5.0.0 for new networks.
 */
export interface StakingStorageVersionStorageV5 {
    get(): Promise<v5.Releases>
}

export class StakingUnappliedSlashesStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'UnappliedSlashes'
    }

    /**
     *  All unapplied slashes that are queued for later.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '8264329f163dd76100f9d2270735f3a3cb745c5af616ebd0e203d417e2039503'
    }

    /**
     *  All unapplied slashes that are queued for later.
     */
    get asV5(): StakingUnappliedSlashesStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  All unapplied slashes that are queued for later.
 */
export interface StakingUnappliedSlashesStorageV5 {
    get(key: number): Promise<v5.UnappliedSlash[]>
    getAll(): Promise<v5.UnappliedSlash[][]>
    getMany(keys: number[]): Promise<v5.UnappliedSlash[][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v5.UnappliedSlash[]][]>
    getPairs(key: number): Promise<[k: number, v: v5.UnappliedSlash[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v5.UnappliedSlash[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v5.UnappliedSlash[]][]>
}

export class StakingValidatorCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ValidatorCount'
    }

    /**
     *  The ideal number of staking participants.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The ideal number of staking participants.
     */
    get asV5(): StakingValidatorCountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The ideal number of staking participants.
 */
export interface StakingValidatorCountStorageV5 {
    get(): Promise<number>
}

export class StakingValidatorSlashInEraStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'ValidatorSlashInEra'
    }

    /**
     *  All slashing events on validators, mapped by era to the highest slash proportion
     *  and slash value of the era.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'facf161fd07f9163ac7ab48199356f8083a31ec97fe569c9c5e6fd30fe0ce3ae'
    }

    /**
     *  All slashing events on validators, mapped by era to the highest slash proportion
     *  and slash value of the era.
     */
    get asV5(): StakingValidatorSlashInEraStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  All slashing events on validators, mapped by era to the highest slash proportion
 *  and slash value of the era.
 */
export interface StakingValidatorSlashInEraStorageV5 {
    get(key1: number, key2: Uint8Array): Promise<([number, bigint] | undefined)>
    getAll(): Promise<[number, bigint][]>
    getMany(keys: [number, Uint8Array][]): Promise<([number, bigint] | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: [number, bigint]][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: [number, bigint]][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: [number, bigint]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: [number, bigint]][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: [number, bigint]][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: [number, bigint]][]>
}

export class StakingValidatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Staking'
    }

    protected getName() {
        return 'Validators'
    }

    /**
     *  The map from (wannabe) validator stash key to the preferences of that validator.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'fa08b7a9cd071c2833987f5924d940cf66842072b85af5ecfc3afcf9fbb2ebd0'
    }

    /**
     *  The map from (wannabe) validator stash key to the preferences of that validator.
     */
    get asV5(): StakingValidatorsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The map from (wannabe) validator stash key to the preferences of that validator.
 */
export interface StakingValidatorsStorageV5 {
    get(key: Uint8Array): Promise<v5.ValidatorPrefs>
    getAll(): Promise<v5.ValidatorPrefs[]>
    getMany(keys: Uint8Array[]): Promise<v5.ValidatorPrefs[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.ValidatorPrefs][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.ValidatorPrefs][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.ValidatorPrefs][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.ValidatorPrefs][]>
}

export class SudoKeyStorage extends StorageBase {
    protected getPrefix() {
        return 'Sudo'
    }

    protected getName() {
        return 'Key'
    }

    /**
     *  The `AccountId` of the sudo key.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  The `AccountId` of the sudo key.
     */
    get asV5(): SudoKeyStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The `AccountId` of the sudo key.
 */
export interface SudoKeyStorageV5 {
    get(): Promise<Uint8Array>
}

export class SystemAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '73070b537f1805475b37167271b33ac7fd6ffad8ba62da08bc14937a017b8bb2'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV5(): SystemAccountStorageV5 {
        assert(this.isV5)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV8(): SystemAccountStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV5 {
    get(key: Uint8Array): Promise<v5.AccountInfo>
    getAll(): Promise<v5.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v5.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.AccountInfo][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV8 {
    get(key: Uint8Array): Promise<v8.AccountInfo>
    getAll(): Promise<v8.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v8.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v8.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v8.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v8.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v8.AccountInfo][]>
}

export class SystemAllExtrinsicsLenStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'AllExtrinsicsLen'
    }

    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    get asV5(): SystemAllExtrinsicsLenStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Total length (in bytes) for all extrinsics put together, for the current block.
 */
export interface SystemAllExtrinsicsLenStorageV5 {
    get(): Promise<(number | undefined)>
}

export class SystemBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'BlockHash'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get asV5(): SystemBlockHashStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Map of block numbers to block hashes.
 */
export interface SystemBlockHashStorageV5 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class SystemBlockWeightStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'BlockWeight'
    }

    /**
     *  The current weight for the block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '3117e920c869758010946f61bdfb045561b02a263bdc3bcff42e4ce915e4e5d4'
    }

    /**
     *  The current weight for the block.
     */
    get asV5(): SystemBlockWeightStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The current weight for the block.
 */
export interface SystemBlockWeightStorageV5 {
    get(): Promise<v5.ConsumedWeight>
}

export class SystemDigestStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Digest'
    }

    /**
     *  Digest of the current block, also part of the block header.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '1d49db8c467b8ce13c8d27dfc1293265e11d9e73050b590ac44aa31ca0eec876'
    }

    /**
     *  Digest of the current block, also part of the block header.
     */
    get asV5(): SystemDigestStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Digest of the current block, also part of the block header.
 */
export interface SystemDigestStorageV5 {
    get(): Promise<v5.DigestOf>
}

export class SystemEventCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'EventCount'
    }

    /**
     *  The number of events in the `Events<T>` list.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of events in the `Events<T>` list.
     */
    get asV5(): SystemEventCountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The number of events in the `Events<T>` list.
 */
export interface SystemEventCountStorageV5 {
    get(): Promise<number>
}

export class SystemEventTopicsStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'EventTopics'
    }

    /**
     *  Mapping between a topic (represented by T::Hash) and a vector of indexes
     *  of events in the `<Events<T>>` list.
     * 
     *  All topic vectors have deterministic storage locations depending on the topic. This
     *  allows light-clients to leverage the changes trie storage tracking mechanism and
     *  in case of changes fetch the list of events of interest.
     * 
     *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     *  the `EventIndex` then in case if the topic has the same contents on the next block
     *  no notification will be triggered thus the event might be lost.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'd5ef37ba3daec264a9dcba5a29bf5b2ff23eb80b912936f924f44a8db557c58d'
    }

    /**
     *  Mapping between a topic (represented by T::Hash) and a vector of indexes
     *  of events in the `<Events<T>>` list.
     * 
     *  All topic vectors have deterministic storage locations depending on the topic. This
     *  allows light-clients to leverage the changes trie storage tracking mechanism and
     *  in case of changes fetch the list of events of interest.
     * 
     *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     *  the `EventIndex` then in case if the topic has the same contents on the next block
     *  no notification will be triggered thus the event might be lost.
     */
    get asV5(): SystemEventTopicsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Mapping between a topic (represented by T::Hash) and a vector of indexes
 *  of events in the `<Events<T>>` list.
 * 
 *  All topic vectors have deterministic storage locations depending on the topic. This
 *  allows light-clients to leverage the changes trie storage tracking mechanism and
 *  in case of changes fetch the list of events of interest.
 * 
 *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
 *  the `EventIndex` then in case if the topic has the same contents on the next block
 *  no notification will be triggered thus the event might be lost.
 */
export interface SystemEventTopicsStorageV5 {
    get(key: Uint8Array): Promise<[number, number][]>
    getAll(): Promise<[number, number][][]>
    getMany(keys: Uint8Array[]): Promise<[number, number][][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [number, number][]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [number, number][]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [number, number][]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [number, number][]][]>
}

export class SystemEventsStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Events'
    }

    /**
     *  Events deposited for the current block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '844b1463bc7d170c470355a0e38d7b6f10672e1f22c5830c4e10ef7b4ccaef93'
    }

    /**
     *  Events deposited for the current block.
     */
    get asV5(): SystemEventsStorageV5 {
        assert(this.isV5)
        return this as any
    }

    /**
     *  Events deposited for the current block.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '40c111f35d5effdbfe304b471edecbfeb4cf9034992e153451f7aaeb52dcddf2'
    }

    /**
     *  Events deposited for the current block.
     */
    get asV8(): SystemEventsStorageV8 {
        assert(this.isV8)
        return this as any
    }

    /**
     *  Events deposited for the current block.
     */
    get isV10(): boolean {
        return this.getTypeHash() === 'fc5b570c1a6a5d439eeaadca2ff7e4b4b3abd181d3bfdea9ed0ff0f2ca610bd9'
    }

    /**
     *  Events deposited for the current block.
     */
    get asV10(): SystemEventsStorageV10 {
        assert(this.isV10)
        return this as any
    }
}

/**
 *  Events deposited for the current block.
 */
export interface SystemEventsStorageV5 {
    get(): Promise<v5.EventRecord[]>
}

/**
 *  Events deposited for the current block.
 */
export interface SystemEventsStorageV8 {
    get(): Promise<v8.EventRecord[]>
}

/**
 *  Events deposited for the current block.
 */
export interface SystemEventsStorageV10 {
    get(): Promise<v10.EventRecord[]>
}

export class SystemExecutionPhaseStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExecutionPhase'
    }

    /**
     *  The execution phase of the block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '0ad1e323fa21971add5b3b0cc709a6e02dc7c64db7d344c1a67ec0227969ae75'
    }

    /**
     *  The execution phase of the block.
     */
    get asV5(): SystemExecutionPhaseStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The execution phase of the block.
 */
export interface SystemExecutionPhaseStorageV5 {
    get(): Promise<(v5.Phase | undefined)>
}

export class SystemExtrinsicCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExtrinsicCount'
    }

    /**
     *  Total extrinsics count for the current block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Total extrinsics count for the current block.
     */
    get asV5(): SystemExtrinsicCountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Total extrinsics count for the current block.
 */
export interface SystemExtrinsicCountStorageV5 {
    get(): Promise<(number | undefined)>
}

export class SystemExtrinsicDataStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExtrinsicData'
    }

    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
    }

    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    get asV5(): SystemExtrinsicDataStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Extrinsics data for the current block (maps an extrinsic's index to its data).
 */
export interface SystemExtrinsicDataStorageV5 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class SystemLastRuntimeUpgradeStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'LastRuntimeUpgrade'
    }

    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'e03e445e7a7694163bede3a772a8a347abf7a3a00424fbafec75f819d6173a17'
    }

    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    get asV5(): SystemLastRuntimeUpgradeStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
 */
export interface SystemLastRuntimeUpgradeStorageV5 {
    get(): Promise<(v5.LastRuntimeUpgradeInfo | undefined)>
}

export class SystemNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Number'
    }

    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    get asV5(): SystemNumberStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The current block number being processed. Set by `execute_block`.
 */
export interface SystemNumberStorageV5 {
    get(): Promise<number>
}

export class SystemParentHashStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ParentHash'
    }

    /**
     *  Hash of the previous block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  Hash of the previous block.
     */
    get asV5(): SystemParentHashStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Hash of the previous block.
 */
export interface SystemParentHashStorageV5 {
    get(): Promise<Uint8Array>
}

export class SystemUpgradedToDualRefCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'UpgradedToDualRefCount'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains two types of `RefCount`. False
     *  (default) if not.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains two types of `RefCount`. False
     *  (default) if not.
     */
    get asV5(): SystemUpgradedToDualRefCountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  True if we have upgraded so that AccountInfo contains two types of `RefCount`. False
 *  (default) if not.
 */
export interface SystemUpgradedToDualRefCountStorageV5 {
    get(): Promise<boolean>
}

export class SystemUpgradedToTripleRefCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'UpgradedToTripleRefCount'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     *  (default) if not.
     */
    get isV8(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     *  (default) if not.
     */
    get asV8(): SystemUpgradedToTripleRefCountStorageV8 {
        assert(this.isV8)
        return this as any
    }
}

/**
 *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
 *  (default) if not.
 */
export interface SystemUpgradedToTripleRefCountStorageV8 {
    get(): Promise<boolean>
}

export class SystemUpgradedToU32RefCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'UpgradedToU32RefCount'
    }

    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    get asV5(): SystemUpgradedToU32RefCountStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
 */
export interface SystemUpgradedToU32RefCountStorageV5 {
    get(): Promise<boolean>
}

export class TimestampDidUpdateStorage extends StorageBase {
    protected getPrefix() {
        return 'Timestamp'
    }

    protected getName() {
        return 'DidUpdate'
    }

    /**
     *  Did the timestamp get updated in this block?
     */
    get isV5(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Did the timestamp get updated in this block?
     */
    get asV5(): TimestampDidUpdateStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Did the timestamp get updated in this block?
 */
export interface TimestampDidUpdateStorageV5 {
    get(): Promise<boolean>
}

export class TimestampNowStorage extends StorageBase {
    protected getPrefix() {
        return 'Timestamp'
    }

    protected getName() {
        return 'Now'
    }

    /**
     *  Current time for the current block.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current time for the current block.
     */
    get asV5(): TimestampNowStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Current time for the current block.
 */
export interface TimestampNowStorageV5 {
    get(): Promise<bigint>
}

export class TokensAccountsStorage extends StorageBase {
    protected getPrefix() {
        return 'Tokens'
    }

    protected getName() {
        return 'Accounts'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get isV5(): boolean {
        return this.getTypeHash() === 'cb84a46b937aed76f973a675e11031e452b7fcc3ece2535d2b98b04096c4a4a1'
    }

    /**
     *  The balance of a token type under an account.
     * 
     *  NOTE: If the total is ever zero, decrease account ref account.
     * 
     *  NOTE: This is only used in the case that this module is used to store
     *  balances.
     */
    get asV5(): TokensAccountsStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The balance of a token type under an account.
 * 
 *  NOTE: If the total is ever zero, decrease account ref account.
 * 
 *  NOTE: This is only used in the case that this module is used to store
 *  balances.
 */
export interface TokensAccountsStorageV5 {
    get(key1: Uint8Array, key2: v5.CurrencyId): Promise<v5.AccountData>
    getAll(): Promise<v5.AccountData[]>
    getMany(keys: [Uint8Array, v5.CurrencyId][]): Promise<v5.AccountData[]>
    getKeys(): Promise<[Uint8Array, v5.CurrencyId][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v5.CurrencyId][]>
    getKeys(key1: Uint8Array, key2: v5.CurrencyId): Promise<[Uint8Array, v5.CurrencyId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v5.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, v5.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: v5.CurrencyId): AsyncIterable<[Uint8Array, v5.CurrencyId][]>
    getPairs(): Promise<[k: [Uint8Array, v5.CurrencyId], v: v5.AccountData][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, v5.CurrencyId], v: v5.AccountData][]>
    getPairs(key1: Uint8Array, key2: v5.CurrencyId): Promise<[k: [Uint8Array, v5.CurrencyId], v: v5.AccountData][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, v5.CurrencyId], v: v5.AccountData][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, v5.CurrencyId], v: v5.AccountData][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: v5.CurrencyId): AsyncIterable<[k: [Uint8Array, v5.CurrencyId], v: v5.AccountData][]>
}

export class TokensLocksStorage extends StorageBase {
    protected getPrefix() {
        return 'Tokens'
    }

    protected getName() {
        return 'Locks'
    }

    /**
     *  Any liquidity locks of a token type under an account.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '728ec83185f7c63f21b3c729ffc05d642979d83855ce9171ef26135952e63c61'
    }

    /**
     *  Any liquidity locks of a token type under an account.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get asV5(): TokensLocksStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  Any liquidity locks of a token type under an account.
 *  NOTE: Should only be accessed when setting, changing and freeing a lock.
 */
export interface TokensLocksStorageV5 {
    get(key1: Uint8Array, key2: v5.CurrencyId): Promise<v5.BalanceLock[]>
    getAll(): Promise<v5.BalanceLock[][]>
    getMany(keys: [Uint8Array, v5.CurrencyId][]): Promise<v5.BalanceLock[][]>
    getKeys(): Promise<[Uint8Array, v5.CurrencyId][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, v5.CurrencyId][]>
    getKeys(key1: Uint8Array, key2: v5.CurrencyId): Promise<[Uint8Array, v5.CurrencyId][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, v5.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, v5.CurrencyId][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: v5.CurrencyId): AsyncIterable<[Uint8Array, v5.CurrencyId][]>
    getPairs(): Promise<[k: [Uint8Array, v5.CurrencyId], v: v5.BalanceLock[]][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, v5.CurrencyId], v: v5.BalanceLock[]][]>
    getPairs(key1: Uint8Array, key2: v5.CurrencyId): Promise<[k: [Uint8Array, v5.CurrencyId], v: v5.BalanceLock[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, v5.CurrencyId], v: v5.BalanceLock[]][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, v5.CurrencyId], v: v5.BalanceLock[]][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: v5.CurrencyId): AsyncIterable<[k: [Uint8Array, v5.CurrencyId], v: v5.BalanceLock[]][]>
}

export class TokensTotalIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Tokens'
    }

    protected getName() {
        return 'TotalIssuance'
    }

    /**
     *  The total issuance of a token type.
     */
    get isV5(): boolean {
        return this.getTypeHash() === '2fb5fb7e8cd14f08f44f42353d3414f6f0a4313f85f188ba211f0264c2ee2a16'
    }

    /**
     *  The total issuance of a token type.
     */
    get asV5(): TokensTotalIssuanceStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

/**
 *  The total issuance of a token type.
 */
export interface TokensTotalIssuanceStorageV5 {
    get(key: v5.CurrencyId): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: v5.CurrencyId[]): Promise<bigint[]>
    getKeys(): Promise<v5.CurrencyId[]>
    getKeys(key: v5.CurrencyId): Promise<v5.CurrencyId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v5.CurrencyId[]>
    getKeysPaged(pageSize: number, key: v5.CurrencyId): AsyncIterable<v5.CurrencyId[]>
    getPairs(): Promise<[k: v5.CurrencyId, v: bigint][]>
    getPairs(key: v5.CurrencyId): Promise<[k: v5.CurrencyId, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: v5.CurrencyId, v: bigint][]>
    getPairsPaged(pageSize: number, key: v5.CurrencyId): AsyncIterable<[k: v5.CurrencyId, v: bigint][]>
}

export class TransactionPaymentDefaultFeeCurrencyIdStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionPayment'
    }

    protected getName() {
        return 'DefaultFeeCurrencyId'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '170812c6d14f38ca931049dc1d623d2df1425db0003c0542ca4146afec1fcce2'
    }

    get asV5(): TransactionPaymentDefaultFeeCurrencyIdStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface TransactionPaymentDefaultFeeCurrencyIdStorageV5 {
    get(key: Uint8Array): Promise<(v5.CurrencyId | undefined)>
    getAll(): Promise<v5.CurrencyId[]>
    getMany(keys: Uint8Array[]): Promise<(v5.CurrencyId | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v5.CurrencyId][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v5.CurrencyId][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v5.CurrencyId][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v5.CurrencyId][]>
}

export class TransactionPaymentNextFeeMultiplierStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionPayment'
    }

    protected getName() {
        return 'NextFeeMultiplier'
    }

    get isV5(): boolean {
        return this.getTypeHash() === '8840628264db1877ef5c3718a00459d4b519de0922f813836237f71320a25aa6'
    }

    get asV5(): TransactionPaymentNextFeeMultiplierStorageV5 {
        assert(this.isV5)
        return this as any
    }
}

export interface TransactionPaymentNextFeeMultiplierStorageV5 {
    get(): Promise<bigint>
}
