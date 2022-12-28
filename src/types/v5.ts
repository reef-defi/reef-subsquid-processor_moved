import type {Result, Option} from './support'

export type UncleEntryItem = UncleEntryItem_InclusionHeight | UncleEntryItem_Uncle

export interface UncleEntryItem_InclusionHeight {
    __kind: 'InclusionHeight'
    value: number
}

export interface UncleEntryItem_Uncle {
    __kind: 'Uncle'
    value: [Uint8Array, (Uint8Array | undefined)]
}

export type NextConfigDescriptor = NextConfigDescriptor_V0 | NextConfigDescriptor_V1

export interface NextConfigDescriptor_V0 {
    __kind: 'V0'
}

export interface NextConfigDescriptor_V1 {
    __kind: 'V1'
    value: NextConfigDescriptorV1
}

export interface AccountData {
    free: bigint
    reserved: bigint
    miscFrozen: bigint
    feeFrozen: bigint
}

export interface BalanceLock {
    id: Uint8Array
    amount: bigint
    reasons: Reasons
}

export type Releases = Releases_V1 | Releases_V2 | Releases_V3 | Releases_V4 | Releases_V5 | Releases_V6 | Releases_V7 | Releases_V8 | Releases_V9 | Releases_V10

export interface Releases_V1 {
    __kind: 'V1'
}

export interface Releases_V2 {
    __kind: 'V2'
}

export interface Releases_V3 {
    __kind: 'V3'
}

export interface Releases_V4 {
    __kind: 'V4'
}

export interface Releases_V5 {
    __kind: 'V5'
}

export interface Releases_V6 {
    __kind: 'V6'
}

export interface Releases_V7 {
    __kind: 'V7'
}

export interface Releases_V8 {
    __kind: 'V8'
}

export interface Releases_V9 {
    __kind: 'V9'
}

export interface Releases_V10 {
    __kind: 'V10'
}

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
}

export interface CodeInfo {
    codeSize: number
    refCount: number
}

export interface StoredPendingChange {
    scheduledAt: number
    delay: number
    nextAuthorities: [Uint8Array, bigint][]
}

export type StoredState = StoredState_Live | StoredState_PendingPause | StoredState_Paused | StoredState_PendingResume

export interface StoredState_Live {
    __kind: 'Live'
}

export interface StoredState_PendingPause {
    __kind: 'PendingPause'
    value: PendingPause
}

export interface StoredState_Paused {
    __kind: 'Paused'
}

export interface StoredState_PendingResume {
    __kind: 'PendingResume'
    value: PendingResume
}

export interface Registration {
    judgements: [number, IdentityJudgement][]
    deposit: bigint
    info: IdentityInfo
}

export interface RegistrarInfo {
    account: Uint8Array
    fee: bigint
    fields: bigint
}

export type Data = Data_None | Data_Raw0 | Data_Raw1 | Data_Raw2 | Data_Raw3 | Data_Raw4 | Data_Raw5 | Data_Raw6 | Data_Raw7 | Data_Raw8 | Data_Raw9 | Data_Raw10 | Data_Raw11 | Data_Raw12 | Data_Raw13 | Data_Raw14 | Data_Raw15 | Data_Raw16 | Data_Raw17 | Data_Raw18 | Data_Raw19 | Data_Raw20 | Data_Raw21 | Data_Raw22 | Data_Raw23 | Data_Raw24 | Data_Raw25 | Data_Raw26 | Data_Raw27 | Data_Raw28 | Data_Raw29 | Data_Raw30 | Data_Raw31 | Data_Raw32 | Data_BlakeTwo256 | Data_Sha256 | Data_Keccak256 | Data_ShaThree256

export interface Data_None {
    __kind: 'None'
}

export interface Data_Raw0 {
    __kind: 'Raw0'
    value: Uint8Array
}

export interface Data_Raw1 {
    __kind: 'Raw1'
    value: Uint8Array
}

export interface Data_Raw2 {
    __kind: 'Raw2'
    value: Uint8Array
}

export interface Data_Raw3 {
    __kind: 'Raw3'
    value: Uint8Array
}

export interface Data_Raw4 {
    __kind: 'Raw4'
    value: Uint8Array
}

export interface Data_Raw5 {
    __kind: 'Raw5'
    value: Uint8Array
}

export interface Data_Raw6 {
    __kind: 'Raw6'
    value: Uint8Array
}

export interface Data_Raw7 {
    __kind: 'Raw7'
    value: Uint8Array
}

export interface Data_Raw8 {
    __kind: 'Raw8'
    value: Uint8Array
}

export interface Data_Raw9 {
    __kind: 'Raw9'
    value: Uint8Array
}

export interface Data_Raw10 {
    __kind: 'Raw10'
    value: Uint8Array
}

export interface Data_Raw11 {
    __kind: 'Raw11'
    value: Uint8Array
}

export interface Data_Raw12 {
    __kind: 'Raw12'
    value: Uint8Array
}

export interface Data_Raw13 {
    __kind: 'Raw13'
    value: Uint8Array
}

export interface Data_Raw14 {
    __kind: 'Raw14'
    value: Uint8Array
}

export interface Data_Raw15 {
    __kind: 'Raw15'
    value: Uint8Array
}

export interface Data_Raw16 {
    __kind: 'Raw16'
    value: Uint8Array
}

export interface Data_Raw17 {
    __kind: 'Raw17'
    value: Uint8Array
}

export interface Data_Raw18 {
    __kind: 'Raw18'
    value: Uint8Array
}

export interface Data_Raw19 {
    __kind: 'Raw19'
    value: Uint8Array
}

export interface Data_Raw20 {
    __kind: 'Raw20'
    value: Uint8Array
}

export interface Data_Raw21 {
    __kind: 'Raw21'
    value: Uint8Array
}

export interface Data_Raw22 {
    __kind: 'Raw22'
    value: Uint8Array
}

export interface Data_Raw23 {
    __kind: 'Raw23'
    value: Uint8Array
}

export interface Data_Raw24 {
    __kind: 'Raw24'
    value: Uint8Array
}

export interface Data_Raw25 {
    __kind: 'Raw25'
    value: Uint8Array
}

export interface Data_Raw26 {
    __kind: 'Raw26'
    value: Uint8Array
}

export interface Data_Raw27 {
    __kind: 'Raw27'
    value: Uint8Array
}

export interface Data_Raw28 {
    __kind: 'Raw28'
    value: Uint8Array
}

export interface Data_Raw29 {
    __kind: 'Raw29'
    value: Uint8Array
}

export interface Data_Raw30 {
    __kind: 'Raw30'
    value: Uint8Array
}

export interface Data_Raw31 {
    __kind: 'Raw31'
    value: Uint8Array
}

export interface Data_Raw32 {
    __kind: 'Raw32'
    value: Uint8Array
}

export interface Data_BlakeTwo256 {
    __kind: 'BlakeTwo256'
    value: Uint8Array
}

export interface Data_Sha256 {
    __kind: 'Sha256'
    value: Uint8Array
}

export interface Data_Keccak256 {
    __kind: 'Keccak256'
    value: Uint8Array
}

export interface Data_ShaThree256 {
    __kind: 'ShaThree256'
    value: Uint8Array
}

export type Proposal = Proposal_System | Proposal_RandomnessCollectiveFlip | Proposal_Timestamp | Proposal_Sudo | Proposal_Scheduler | Proposal_Indices | Proposal_Balances | Proposal_Currencies | Proposal_TransactionPayment | Proposal_Authority | Proposal_EvmAccounts | Proposal_EVM | Proposal_Authorship | Proposal_Babe | Proposal_Grandpa | Proposal_Staking | Proposal_Session | Proposal_Offences | Proposal_ImOnline | Proposal_AuthorityDiscovery | Proposal_Identity | Proposal_TechCouncil | Proposal_Poc

export interface Proposal_System {
    __kind: 'System'
    value: SystemCall
}

export interface Proposal_RandomnessCollectiveFlip {
    __kind: 'RandomnessCollectiveFlip'
    value: RandomnessCollectiveFlipCall
}

export interface Proposal_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Proposal_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface Proposal_Scheduler {
    __kind: 'Scheduler'
    value: SchedulerCall
}

export interface Proposal_Indices {
    __kind: 'Indices'
    value: IndicesCall
}

export interface Proposal_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Proposal_Currencies {
    __kind: 'Currencies'
    value: CurrenciesCall
}

export interface Proposal_TransactionPayment {
    __kind: 'TransactionPayment'
    value: TransactionPaymentCall
}

export interface Proposal_Authority {
    __kind: 'Authority'
    value: AuthorityCall
}

export interface Proposal_EvmAccounts {
    __kind: 'EvmAccounts'
    value: EvmAccountsCall
}

export interface Proposal_EVM {
    __kind: 'EVM'
    value: EVMCall
}

export interface Proposal_Authorship {
    __kind: 'Authorship'
    value: AuthorshipCall
}

export interface Proposal_Babe {
    __kind: 'Babe'
    value: BabeCall
}

export interface Proposal_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaCall
}

export interface Proposal_Staking {
    __kind: 'Staking'
    value: StakingCall
}

export interface Proposal_Session {
    __kind: 'Session'
    value: SessionCall
}

export interface Proposal_Offences {
    __kind: 'Offences'
    value: OffencesCall
}

export interface Proposal_ImOnline {
    __kind: 'ImOnline'
    value: ImOnlineCall
}

export interface Proposal_AuthorityDiscovery {
    __kind: 'AuthorityDiscovery'
    value: AuthorityDiscoveryCall
}

export interface Proposal_Identity {
    __kind: 'Identity'
    value: IdentityCall
}

export interface Proposal_TechCouncil {
    __kind: 'TechCouncil'
    value: TechCouncilCall
}

export interface Proposal_Poc {
    __kind: 'Poc'
    value: PocCall
}

export interface Votes {
    index: number
    threshold: number
    ayes: Uint8Array[]
    nays: Uint8Array[]
    end: number
}

export interface OffenceDetails {
    offender: [Uint8Array, FullIdentification]
    reporters: Uint8Array[]
}

export interface CommitmentOf {
    state: LockState
    duration: LockDuration
    amount: bigint
    candidate: Uint8Array
}

export interface Era {
    index: number
    start: number
}

export interface Scheduled {
    maybeId: (Uint8Array | undefined)
    priority: number
    call: Type_51
    maybePeriodic: ([number, number] | undefined)
    origin: PalletsOrigin
}

export interface ActiveEraInfo {
    index: number
    start: (bigint | undefined)
}

export type ElectionStatus = ElectionStatus_Close | ElectionStatus_Open

export interface ElectionStatus_Close {
    __kind: 'Close'
}

export interface ElectionStatus_Open {
    __kind: 'Open'
    value: number
}

export interface EraRewardPoints {
    total: number
    individual: [Uint8Array, number][]
}

export interface Exposure {
    total: bigint
    own: bigint
    others: IndividualExposure[]
}

export interface ValidatorPrefs {
    commission: number
    blocked: boolean
}

export type Forcing = Forcing_NotForcing | Forcing_ForceNew | Forcing_ForceNone | Forcing_ForceAlways

export interface Forcing_NotForcing {
    __kind: 'NotForcing'
}

export interface Forcing_ForceNew {
    __kind: 'ForceNew'
}

export interface Forcing_ForceNone {
    __kind: 'ForceNone'
}

export interface Forcing_ForceAlways {
    __kind: 'ForceAlways'
}

export interface StakingLedger {
    stash: Uint8Array
    total: bigint
    active: bigint
    unlocking: UnlockChunk[]
    claimedRewards: number[]
}

export interface Nominations {
    targets: Uint8Array[]
    submittedIn: number
    suppressed: boolean
}

export type RewardDestination = RewardDestination_Staked | RewardDestination_Stash | RewardDestination_Controller | RewardDestination_Account | RewardDestination_None

export interface RewardDestination_Staked {
    __kind: 'Staked'
}

export interface RewardDestination_Stash {
    __kind: 'Stash'
}

export interface RewardDestination_Controller {
    __kind: 'Controller'
}

export interface RewardDestination_Account {
    __kind: 'Account'
    value: Uint8Array
}

export interface RewardDestination_None {
    __kind: 'None'
}

export interface ElectionResult {
    compute: ElectionCompute
    slotStake: bigint
    electedStashes: Uint8Array[]
    exposures: [Uint8Array, Exposure][]
}

export interface SlashingSpans {
    spanIndex: number
    lastStart: number
    lastNonzeroSlash: number
    prior: number[]
}

export interface SpanRecord {
    slashed: bigint
    paidOut: bigint
}

export interface UnappliedSlash {
    validator: Uint8Array
    own: bigint
    others: [Uint8Array, bigint][]
    reporters: Uint8Array[]
    payout: bigint
}

export interface ConsumedWeight {
    normal: bigint
    operational: bigint
    mandatory: bigint
}

export interface DigestOf {
    logs: DigestItem[]
}

export interface EventRecord {
    phase: Phase
    event: Event
    topics: Uint8Array[]
}

export type Phase = Phase_ApplyExtrinsic | Phase_Finalization | Phase_Initialization

export interface Phase_ApplyExtrinsic {
    __kind: 'ApplyExtrinsic'
    value: number
}

export interface Phase_Finalization {
    __kind: 'Finalization'
}

export interface Phase_Initialization {
    __kind: 'Initialization'
}

export interface LastRuntimeUpgradeInfo {
    specVersion: number
    specName: string
}

export type CurrencyId = CurrencyId_Token | CurrencyId_DEXShare | CurrencyId_ERC20

export interface CurrencyId_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export interface CurrencyId_DEXShare {
    __kind: 'DEXShare'
    value: [TokenSymbol, TokenSymbol]
}

export interface CurrencyId_ERC20 {
    __kind: 'ERC20'
    value: Uint8Array
}

export interface NextConfigDescriptorV1 {
    c: [bigint, bigint]
    allowedSlots: AllowedSlots
}

export type Reasons = Reasons_Fee | Reasons_Misc | Reasons_All

export interface Reasons_Fee {
    __kind: 'Fee'
}

export interface Reasons_Misc {
    __kind: 'Misc'
}

export interface Reasons_All {
    __kind: 'All'
}

export interface PendingPause {
    scheduledAt: number
    delay: number
}

export interface PendingResume {
    scheduledAt: number
    delay: number
}

export type IdentityJudgement = IdentityJudgement_Unknown | IdentityJudgement_FeePaid | IdentityJudgement_Reasonable | IdentityJudgement_KnownGood | IdentityJudgement_OutOfDate | IdentityJudgement_LowQuality | IdentityJudgement_Erroneous

export interface IdentityJudgement_Unknown {
    __kind: 'Unknown'
}

export interface IdentityJudgement_FeePaid {
    __kind: 'FeePaid'
    value: bigint
}

export interface IdentityJudgement_Reasonable {
    __kind: 'Reasonable'
}

export interface IdentityJudgement_KnownGood {
    __kind: 'KnownGood'
}

export interface IdentityJudgement_OutOfDate {
    __kind: 'OutOfDate'
}

export interface IdentityJudgement_LowQuality {
    __kind: 'LowQuality'
}

export interface IdentityJudgement_Erroneous {
    __kind: 'Erroneous'
}

export interface IdentityInfo {
    additional: [Data, Data][]
    display: Data
    legal: Data
    web: Data
    riot: Data
    email: Data
    pgpFingerprint: (Uint8Array | undefined)
    image: Data
    twitter: Data
}

export type SystemCall = SystemCall_fill_block | SystemCall_remark | SystemCall_set_heap_pages | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_changes_trie_config | SystemCall_set_storage | SystemCall_kill_storage | SystemCall_kill_prefix

/**
 *  A dispatch that will fill the block weight up to the given ratio.
 */
export interface SystemCall_fill_block {
    __kind: 'fill_block'
    ratio: number
}

/**
 *  Make some on-chain remark.
 * 
 *  # <weight>
 *  - `O(1)`
 *  - Base Weight: 0.665 µs, independent of remark length.
 *  - No DB operations.
 *  # </weight>
 */
export interface SystemCall_remark {
    __kind: 'remark'
    remark: Uint8Array
}

/**
 *  Set the number of pages in the WebAssembly environment's heap.
 * 
 *  # <weight>
 *  - `O(1)`
 *  - 1 storage write.
 *  - Base Weight: 1.405 µs
 *  - 1 write to HEAP_PAGES
 *  # </weight>
 */
export interface SystemCall_set_heap_pages {
    __kind: 'set_heap_pages'
    pages: bigint
}

/**
 *  Set the new runtime code.
 * 
 *  # <weight>
 *  - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
 *  - 1 storage write (codec `O(C)`).
 *  - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is expensive).
 *  - 1 event.
 *  The weight of this function is dependent on the runtime, but generally this is very expensive.
 *  We will treat this as a full block.
 *  # </weight>
 */
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Uint8Array
}

/**
 *  Set the new runtime code without doing any checks of the given `code`.
 * 
 *  # <weight>
 *  - `O(C)` where `C` length of `code`
 *  - 1 storage write (codec `O(C)`).
 *  - 1 event.
 *  The weight of this function is dependent on the runtime. We will treat this as a full block.
 *  # </weight>
 */
export interface SystemCall_set_code_without_checks {
    __kind: 'set_code_without_checks'
    code: Uint8Array
}

/**
 *  Set the new changes trie configuration.
 * 
 *  # <weight>
 *  - `O(1)`
 *  - 1 storage write or delete (codec `O(1)`).
 *  - 1 call to `deposit_log`: Uses `append` API, so O(1)
 *  - Base Weight: 7.218 µs
 *  - DB Weight:
 *      - Writes: Changes Trie, System Digest
 *  # </weight>
 */
export interface SystemCall_set_changes_trie_config {
    __kind: 'set_changes_trie_config'
    changesTrieConfig: (ChangesTrieConfiguration | undefined)
}

/**
 *  Set some items of storage.
 * 
 *  # <weight>
 *  - `O(I)` where `I` length of `items`
 *  - `I` storage writes (`O(1)`).
 *  - Base Weight: 0.568 * i µs
 *  - Writes: Number of items
 *  # </weight>
 */
export interface SystemCall_set_storage {
    __kind: 'set_storage'
    items: [Uint8Array, Uint8Array][]
}

/**
 *  Kill some items from storage.
 * 
 *  # <weight>
 *  - `O(IK)` where `I` length of `keys` and `K` length of one key
 *  - `I` storage deletions.
 *  - Base Weight: .378 * i µs
 *  - Writes: Number of items
 *  # </weight>
 */
export interface SystemCall_kill_storage {
    __kind: 'kill_storage'
    keys: Uint8Array[]
}

/**
 *  Kill all storage items with a key that starts with the given prefix.
 * 
 *  **NOTE:** We rely on the Root origin to provide us the number of subkeys under
 *  the prefix we are removing to accurately calculate the weight of this function.
 * 
 *  # <weight>
 *  - `O(P)` where `P` amount of keys with prefix `prefix`
 *  - `P` storage deletions.
 *  - Base Weight: 0.834 * P µs
 *  - Writes: Number of subkeys + 1
 *  # </weight>
 */
export interface SystemCall_kill_prefix {
    __kind: 'kill_prefix'
    prefix: Uint8Array
    subkeys: number
}

export type RandomnessCollectiveFlipCall = never

export type TimestampCall = TimestampCall_set

/**
 *  Set the current time.
 * 
 *  This call should be invoked exactly once per block. It will panic at the finalization
 *  phase, if this call hasn't been invoked by that time.
 * 
 *  The timestamp should be greater than the previous one by the amount specified by
 *  `MinimumPeriod`.
 * 
 *  The dispatch origin for this call must be `Inherent`.
 * 
 *  # <weight>
 *  - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
 *  - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in `on_finalize`)
 *  - 1 event handler `on_timestamp_set`. Must be `O(1)`.
 *  # </weight>
 */
export interface TimestampCall_set {
    __kind: 'set'
    now: bigint
}

export type SudoCall = SudoCall_sudo | SudoCall_sudo_unchecked_weight | SudoCall_set_key | SudoCall_sudo_as

/**
 *  Authenticates the sudo key and dispatches a function call with `Root` origin.
 * 
 *  The dispatch origin for this call must be _Signed_.
 * 
 *  # <weight>
 *  - O(1).
 *  - Limited storage reads.
 *  - One DB write (event).
 *  - Weight of derivative `call` execution + 10,000.
 *  # </weight>
 */
export interface SudoCall_sudo {
    __kind: 'sudo'
    call: Type_51
}

/**
 *  Authenticates the sudo key and dispatches a function call with `Root` origin.
 *  This function does not check the weight of the call, and instead allows the
 *  Sudo user to specify the weight of the call.
 * 
 *  The dispatch origin for this call must be _Signed_.
 * 
 *  # <weight>
 *  - O(1).
 *  - The weight of this call is defined by the caller.
 *  # </weight>
 */
export interface SudoCall_sudo_unchecked_weight {
    __kind: 'sudo_unchecked_weight'
    call: Type_51
    weight: bigint
}

/**
 *  Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key.
 * 
 *  The dispatch origin for this call must be _Signed_.
 * 
 *  # <weight>
 *  - O(1).
 *  - Limited storage reads.
 *  - One DB change.
 *  # </weight>
 */
export interface SudoCall_set_key {
    __kind: 'set_key'
    new: LookupSource
}

/**
 *  Authenticates the sudo key and dispatches a function call with `Signed` origin from
 *  a given account.
 * 
 *  The dispatch origin for this call must be _Signed_.
 * 
 *  # <weight>
 *  - O(1).
 *  - Limited storage reads.
 *  - One DB write (event).
 *  - Weight of derivative `call` execution + 10,000.
 *  # </weight>
 */
export interface SudoCall_sudo_as {
    __kind: 'sudo_as'
    who: LookupSource
    call: Type_51
}

export type SchedulerCall = SchedulerCall_schedule | SchedulerCall_cancel | SchedulerCall_schedule_named | SchedulerCall_cancel_named | SchedulerCall_schedule_after | SchedulerCall_schedule_named_after

/**
 *  Anonymously schedule a task.
 * 
 *  # <weight>
 *  - S = Number of already scheduled calls
 *  - Base Weight: 22.29 + .126 * S µs
 *  - DB Weight:
 *      - Read: Agenda
 *      - Write: Agenda
 *  - Will use base weight of 25 which should be good for up to 30 scheduled calls
 *  # </weight>
 */
export interface SchedulerCall_schedule {
    __kind: 'schedule'
    when: number
    maybePeriodic: ([number, number] | undefined)
    priority: number
    call: Type_51
}

/**
 *  Cancel an anonymously scheduled task.
 * 
 *  # <weight>
 *  - S = Number of already scheduled calls
 *  - Base Weight: 22.15 + 2.869 * S µs
 *  - DB Weight:
 *      - Read: Agenda
 *      - Write: Agenda, Lookup
 *  - Will use base weight of 100 which should be good for up to 30 scheduled calls
 *  # </weight>
 */
export interface SchedulerCall_cancel {
    __kind: 'cancel'
    when: number
    index: number
}

/**
 *  Schedule a named task.
 * 
 *  # <weight>
 *  - S = Number of already scheduled calls
 *  - Base Weight: 29.6 + .159 * S µs
 *  - DB Weight:
 *      - Read: Agenda, Lookup
 *      - Write: Agenda, Lookup
 *  - Will use base weight of 35 which should be good for more than 30 scheduled calls
 *  # </weight>
 */
export interface SchedulerCall_schedule_named {
    __kind: 'schedule_named'
    id: Uint8Array
    when: number
    maybePeriodic: ([number, number] | undefined)
    priority: number
    call: Type_51
}

/**
 *  Cancel a named scheduled task.
 * 
 *  # <weight>
 *  - S = Number of already scheduled calls
 *  - Base Weight: 24.91 + 2.907 * S µs
 *  - DB Weight:
 *      - Read: Agenda, Lookup
 *      - Write: Agenda, Lookup
 *  - Will use base weight of 100 which should be good for up to 30 scheduled calls
 *  # </weight>
 */
export interface SchedulerCall_cancel_named {
    __kind: 'cancel_named'
    id: Uint8Array
}

/**
 *  Anonymously schedule a task after a delay.
 * 
 *  # <weight>
 *  Same as [`schedule`].
 *  # </weight>
 */
export interface SchedulerCall_schedule_after {
    __kind: 'schedule_after'
    after: number
    maybePeriodic: ([number, number] | undefined)
    priority: number
    call: Type_51
}

/**
 *  Schedule a named task after a delay.
 * 
 *  # <weight>
 *  Same as [`schedule_named`].
 *  # </weight>
 */
export interface SchedulerCall_schedule_named_after {
    __kind: 'schedule_named_after'
    id: Uint8Array
    after: number
    maybePeriodic: ([number, number] | undefined)
    priority: number
    call: Type_51
}

export type IndicesCall = IndicesCall_claim | IndicesCall_transfer | IndicesCall_free | IndicesCall_force_transfer | IndicesCall_freeze

/**
 *  Assign an previously unassigned index.
 * 
 *  Payment: `Deposit` is reserved from the sender account.
 * 
 *  The dispatch origin for this call must be _Signed_.
 * 
 *  - `index`: the index to be claimed. This must not be in use.
 * 
 *  Emits `IndexAssigned` if successful.
 * 
 *  # <weight>
 *  - `O(1)`.
 *  - One storage mutation (codec `O(1)`).
 *  - One reserve operation.
 *  - One event.
 *  -------------------
 *  - DB Weight: 1 Read/Write (Accounts)
 *  # </weight>
 */
export interface IndicesCall_claim {
    __kind: 'claim'
    index: number
}

/**
 *  Assign an index already owned by the sender to another account. The balance reservation
 *  is effectively transferred to the new account.
 * 
 *  The dispatch origin for this call must be _Signed_.
 * 
 *  - `index`: the index to be re-assigned. This must be owned by the sender.
 *  - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
 * 
 *  Emits `IndexAssigned` if successful.
 * 
 *  # <weight>
 *  - `O(1)`.
 *  - One storage mutation (codec `O(1)`).
 *  - One transfer operation.
 *  - One event.
 *  -------------------
 *  - DB Weight:
 *     - Reads: Indices Accounts, System Account (recipient)
 *     - Writes: Indices Accounts, System Account (recipient)
 *  # </weight>
 */
export interface IndicesCall_transfer {
    __kind: 'transfer'
    new: Uint8Array
    index: number
}

/**
 *  Free up an index owned by the sender.
 * 
 *  Payment: Any previous deposit placed for the index is unreserved in the sender account.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must own the index.
 * 
 *  - `index`: the index to be freed. This must be owned by the sender.
 * 
 *  Emits `IndexFreed` if successful.
 * 
 *  # <weight>
 *  - `O(1)`.
 *  - One storage mutation (codec `O(1)`).
 *  - One reserve operation.
 *  - One event.
 *  -------------------
 *  - DB Weight: 1 Read/Write (Accounts)
 *  # </weight>
 */
export interface IndicesCall_free {
    __kind: 'free'
    index: number
}

/**
 *  Force an index to an account. This doesn't require a deposit. If the index is already
 *  held, then any deposit is reimbursed to its current owner.
 * 
 *  The dispatch origin for this call must be _Root_.
 * 
 *  - `index`: the index to be (re-)assigned.
 *  - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
 *  - `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
 * 
 *  Emits `IndexAssigned` if successful.
 * 
 *  # <weight>
 *  - `O(1)`.
 *  - One storage mutation (codec `O(1)`).
 *  - Up to one reserve operation.
 *  - One event.
 *  -------------------
 *  - DB Weight:
 *     - Reads: Indices Accounts, System Account (original owner)
 *     - Writes: Indices Accounts, System Account (original owner)
 *  # </weight>
 */
export interface IndicesCall_force_transfer {
    __kind: 'force_transfer'
    new: Uint8Array
    index: number
    freeze: boolean
}

/**
 *  Freeze an index so it will always point to the sender account. This consumes the deposit.
 * 
 *  The dispatch origin for this call must be _Signed_ and the signing account must have a
 *  non-frozen account `index`.
 * 
 *  - `index`: the index to be frozen in place.
 * 
 *  Emits `IndexFrozen` if successful.
 * 
 *  # <weight>
 *  - `O(1)`.
 *  - One storage mutation (codec `O(1)`).
 *  - Up to one slash operation.
 *  - One event.
 *  -------------------
 *  - DB Weight: 1 Read/Write (Accounts)
 *  # </weight>
 */
export interface IndicesCall_freeze {
    __kind: 'freeze'
    index: number
}

export type BalancesCall = BalancesCall_transfer | BalancesCall_set_balance | BalancesCall_force_transfer | BalancesCall_transfer_keep_alive

/**
 *  Transfer some liquid free balance to another account.
 * 
 *  `transfer` will set the `FreeBalance` of the sender and receiver.
 *  It will decrease the total issuance of the system by the `TransferFee`.
 *  If the sender's account is below the existential deposit as a result
 *  of the transfer, the account will be reaped.
 * 
 *  The dispatch origin for this call must be `Signed` by the transactor.
 * 
 *  # <weight>
 *  - Dependent on arguments but not critical, given proper implementations for
 *    input config types. See related functions below.
 *  - It contains a limited number of reads and writes internally and no complex computation.
 * 
 *  Related functions:
 * 
 *    - `ensure_can_withdraw` is always called internally but has a bounded complexity.
 *    - Transferring balances to accounts that did not exist before will cause
 *       `T::OnNewAccount::on_new_account` to be called.
 *    - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
 *    - `transfer_keep_alive` works the same way as `transfer`, but has an additional
 *      check that the transfer will not kill the origin account.
 *  ---------------------------------
 *  - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
 *  - DB Weight: 1 Read and 1 Write to destination account
 *  - Origin account is already in memory, so no DB operations for them.
 *  # </weight>
 */
export interface BalancesCall_transfer {
    __kind: 'transfer'
    dest: LookupSource
    value: bigint
}

/**
 *  Set the balances of a given account.
 * 
 *  This will alter `FreeBalance` and `ReservedBalance` in storage. it will
 *  also decrease the total issuance of the system (`TotalIssuance`).
 *  If the new free or reserved balance is below the existential deposit,
 *  it will reset the account nonce (`frame_system::AccountNonce`).
 * 
 *  The dispatch origin for this call is `root`.
 * 
 *  # <weight>
 *  - Independent of the arguments.
 *  - Contains a limited number of reads and writes.
 *  ---------------------
 *  - Base Weight:
 *      - Creating: 27.56 µs
 *      - Killing: 35.11 µs
 *  - DB Weight: 1 Read, 1 Write to `who`
 *  # </weight>
 */
export interface BalancesCall_set_balance {
    __kind: 'set_balance'
    who: LookupSource
    newFree: bigint
    newReserved: bigint
}

/**
 *  Exactly as `transfer`, except the origin must be root and the source account may be
 *  specified.
 *  # <weight>
 *  - Same as transfer, but additional read and write because the source account is
 *    not assumed to be in the overlay.
 *  # </weight>
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: LookupSource
    dest: LookupSource
    value: bigint
}

/**
 *  Same as the [`transfer`] call, but with a check that the transfer will not kill the
 *  origin account.
 * 
 *  99% of the time you want [`transfer`] instead.
 * 
 *  [`transfer`]: struct.Pallet.html#method.transfer
 *  # <weight>
 *  - Cheaper than transfer because account cannot be killed.
 *  - Base Weight: 51.4 µs
 *  - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
 *  #</weight>
 */
export interface BalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: LookupSource
    value: bigint
}

export type CurrenciesCall = CurrenciesCall_transfer | CurrenciesCall_transfer_native_currency | CurrenciesCall_update_balance

/**
 *  Transfer some balance to another account under `currency_id`.
 * 
 *  The dispatch origin for this call must be `Signed` by the
 *  transactor.
 */
export interface CurrenciesCall_transfer {
    __kind: 'transfer'
    dest: LookupSource
    currencyId: CurrencyIdOf
    amount: bigint
}

/**
 *  Transfer some native currency to another account.
 * 
 *  The dispatch origin for this call must be `Signed` by the
 *  transactor.
 */
export interface CurrenciesCall_transfer_native_currency {
    __kind: 'transfer_native_currency'
    dest: LookupSource
    amount: bigint
}

/**
 *  update amount of account `who` under `currency_id`.
 * 
 *  The dispatch origin of this call must be _Root_.
 */
export interface CurrenciesCall_update_balance {
    __kind: 'update_balance'
    who: LookupSource
    currencyId: CurrencyIdOf
    amount: bigint
}

export type TransactionPaymentCall = TransactionPaymentCall_set_default_fee_token

/**
 *  Set default fee token
 */
export interface TransactionPaymentCall_set_default_fee_token {
    __kind: 'set_default_fee_token'
    feeToken: (CurrencyId | undefined)
}

export type AuthorityCall = AuthorityCall_dispatch_as | AuthorityCall_schedule_dispatch | AuthorityCall_fast_track_scheduled_dispatch | AuthorityCall_delay_scheduled_dispatch | AuthorityCall_cancel_scheduled_dispatch

/**
 *  Dispatch a dispatchable on behalf of other origin
 */
export interface AuthorityCall_dispatch_as {
    __kind: 'dispatch_as'
    asOrigin: AsOriginId
    call: CallOf
}

/**
 *  Schedule a dispatchable to be dispatched at later block.
 *  This is the only way to dispatch a call with `DelayedOrigin`.
 */
export interface AuthorityCall_schedule_dispatch {
    __kind: 'schedule_dispatch'
    when: DispatchTime
    priority: number
    withDelayedOrigin: boolean
    call: CallOf
}

/**
 *  Fast track a scheduled dispatchable.
 */
export interface AuthorityCall_fast_track_scheduled_dispatch {
    __kind: 'fast_track_scheduled_dispatch'
    initialOrigin: PalletsOrigin
    taskId: number
    when: DispatchTime
}

/**
 *  Delay a scheduled dispatchable.
 */
export interface AuthorityCall_delay_scheduled_dispatch {
    __kind: 'delay_scheduled_dispatch'
    initialOrigin: PalletsOrigin
    taskId: number
    additionalDelay: number
}

/**
 *  Cancel a scheduled dispatchable.
 */
export interface AuthorityCall_cancel_scheduled_dispatch {
    __kind: 'cancel_scheduled_dispatch'
    initialOrigin: PalletsOrigin
    taskId: number
}

export type EvmAccountsCall = EvmAccountsCall_claim_account | EvmAccountsCall_claim_default_account

/**
 *  Claim account mapping between Substrate accounts and EVM accounts.
 *  Ensure eth_address has not been mapped.
 */
export interface EvmAccountsCall_claim_account {
    __kind: 'claim_account'
    ethAddress: Uint8Array
    ethSignature: Uint8Array
}

export interface EvmAccountsCall_claim_default_account {
    __kind: 'claim_default_account'
}

export type EVMCall = EVMCall_call | EVMCall_scheduled_call | EVMCall_create | EVMCall_create2 | EVMCall_create_network_contract | EVMCall_transfer_maintainer | EVMCall_deploy | EVMCall_deploy_free | EVMCall_enable_contract_development | EVMCall_disable_contract_development | EVMCall_set_code | EVMCall_selfdestruct

/**
 *  Issue an EVM call operation. This is similar to a message call
 *  transaction in Ethereum.
 */
export interface EVMCall_call {
    __kind: 'call'
    target: Uint8Array
    input: Uint8Array
    value: bigint
    gasLimit: bigint
    storageLimit: number
}

export interface EVMCall_scheduled_call {
    __kind: 'scheduled_call'
    from: Uint8Array
    target: Uint8Array
    input: Uint8Array
    value: bigint
    gasLimit: bigint
    storageLimit: number
}

/**
 *  Issue an EVM create operation. This is similar to a contract
 *  creation transaction in Ethereum.
 */
export interface EVMCall_create {
    __kind: 'create'
    init: Uint8Array
    value: bigint
    gasLimit: bigint
    storageLimit: number
}

/**
 *  Issue an EVM create2 operation.
 */
export interface EVMCall_create2 {
    __kind: 'create2'
    init: Uint8Array
    salt: Uint8Array
    value: bigint
    gasLimit: bigint
    storageLimit: number
}

/**
 *  Issue an EVM create operation. The next available system contract
 *  address will be used as created contract address.
 */
export interface EVMCall_create_network_contract {
    __kind: 'create_network_contract'
    init: Uint8Array
    value: bigint
    gasLimit: bigint
    storageLimit: number
}

export interface EVMCall_transfer_maintainer {
    __kind: 'transfer_maintainer'
    contract: Uint8Array
    newMaintainer: Uint8Array
}

export interface EVMCall_deploy {
    __kind: 'deploy'
    contract: Uint8Array
}

export interface EVMCall_deploy_free {
    __kind: 'deploy_free'
    contract: Uint8Array
}

export interface EVMCall_enable_contract_development {
    __kind: 'enable_contract_development'
}

export interface EVMCall_disable_contract_development {
    __kind: 'disable_contract_development'
}

export interface EVMCall_set_code {
    __kind: 'set_code'
    contract: Uint8Array
    code: Uint8Array
}

export interface EVMCall_selfdestruct {
    __kind: 'selfdestruct'
    contract: Uint8Array
}

export type AuthorshipCall = AuthorshipCall_set_uncles

/**
 *  Provide a set of uncles.
 */
export interface AuthorshipCall_set_uncles {
    __kind: 'set_uncles'
    newUncles: Header[]
}

export type BabeCall = BabeCall_report_equivocation | BabeCall_report_equivocation_unsigned

/**
 *  Report authority equivocation/misbehavior. This method will verify
 *  the equivocation proof and validate the given key ownership proof
 *  against the extracted offender. If both are valid, the offence will
 *  be reported.
 */
export interface BabeCall_report_equivocation {
    __kind: 'report_equivocation'
    equivocationProof: BabeEquivocationProof
    keyOwnerProof: KeyOwnerProof
}

/**
 *  Report authority equivocation/misbehavior. This method will verify
 *  the equivocation proof and validate the given key ownership proof
 *  against the extracted offender. If both are valid, the offence will
 *  be reported.
 *  This extrinsic must be called unsigned and it is expected that only
 *  block authors will call it (validated in `ValidateUnsigned`), as such
 *  if the block author is defined it will be defined as the equivocation
 *  reporter.
 */
export interface BabeCall_report_equivocation_unsigned {
    __kind: 'report_equivocation_unsigned'
    equivocationProof: BabeEquivocationProof
    keyOwnerProof: KeyOwnerProof
}

export type GrandpaCall = GrandpaCall_report_equivocation | GrandpaCall_report_equivocation_unsigned | GrandpaCall_note_stalled

/**
 *  Report voter equivocation/misbehavior. This method will verify the
 *  equivocation proof and validate the given key ownership proof
 *  against the extracted offender. If both are valid, the offence
 *  will be reported.
 */
export interface GrandpaCall_report_equivocation {
    __kind: 'report_equivocation'
    equivocationProof: GrandpaEquivocationProof
    keyOwnerProof: KeyOwnerProof
}

/**
 *  Report voter equivocation/misbehavior. This method will verify the
 *  equivocation proof and validate the given key ownership proof
 *  against the extracted offender. If both are valid, the offence
 *  will be reported.
 * 
 *  This extrinsic must be called unsigned and it is expected that only
 *  block authors will call it (validated in `ValidateUnsigned`), as such
 *  if the block author is defined it will be defined as the equivocation
 *  reporter.
 */
export interface GrandpaCall_report_equivocation_unsigned {
    __kind: 'report_equivocation_unsigned'
    equivocationProof: GrandpaEquivocationProof
    keyOwnerProof: KeyOwnerProof
}

/**
 *  Note that the current authority set of the GRANDPA finality gadget has
 *  stalled. This will trigger a forced authority set change at the beginning
 *  of the next session, to be enacted `delay` blocks after that. The delay
 *  should be high enough to safely assume that the block signalling the
 *  forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters
 *  will start the new authority set using the given finalized block as base.
 *  Only callable by root.
 */
export interface GrandpaCall_note_stalled {
    __kind: 'note_stalled'
    delay: number
    bestFinalizedBlockNumber: number
}

export type StakingCall = StakingCall_bond | StakingCall_bond_extra | StakingCall_unbond | StakingCall_withdraw_unbonded | StakingCall_validate | StakingCall_nominate | StakingCall_chill | StakingCall_set_payee | StakingCall_set_controller | StakingCall_set_validator_count | StakingCall_increase_validator_count | StakingCall_scale_validator_count | StakingCall_force_no_eras | StakingCall_force_new_era | StakingCall_set_invulnerables | StakingCall_force_unstake | StakingCall_force_new_era_always | StakingCall_cancel_deferred_slash | StakingCall_payout_stakers | StakingCall_rebond | StakingCall_set_history_depth | StakingCall_reap_stash | StakingCall_submit_election_solution | StakingCall_submit_election_solution_unsigned | StakingCall_kick

/**
 *  Take the origin account as a stash and lock up `value` of its balance. `controller` will
 *  be the account that controls it.
 * 
 *  `value` must be more than the `minimum_balance` specified by `T::Currency`.
 * 
 *  The dispatch origin for this call must be _Signed_ by the stash account.
 * 
 *  Emits `Bonded`.
 * 
 *  # <weight>
 *  - Independent of the arguments. Moderate complexity.
 *  - O(1).
 *  - Three extra DB entries.
 * 
 *  NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
 *  unless the `origin` falls below _existential deposit_ and gets removed as dust.
 *  ------------------
 *  Weight: O(1)
 *  DB Weight:
 *  - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
 *  - Write: Bonded, Payee, [Origin Account], Locks, Ledger
 *  # </weight>
 */
export interface StakingCall_bond {
    __kind: 'bond'
    controller: LookupSource
    value: bigint
    payee: RewardDestination
}

/**
 *  Add some extra amount that have appeared in the stash `free_balance` into the balance up
 *  for staking.
 * 
 *  Use this if there are additional funds in your stash account that you wish to bond.
 *  Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
 *  that can be added.
 * 
 *  The dispatch origin for this call must be _Signed_ by the stash, not the controller and
 *  it can be only called when [`EraElectionStatus`] is `Closed`.
 * 
 *  Emits `Bonded`.
 * 
 *  # <weight>
 *  - Independent of the arguments. Insignificant complexity.
 *  - O(1).
 *  - One DB entry.
 *  ------------
 *  DB Weight:
 *  - Read: Era Election Status, Bonded, Ledger, [Origin Account], Locks
 *  - Write: [Origin Account], Locks, Ledger
 *  # </weight>
 */
export interface StakingCall_bond_extra {
    __kind: 'bond_extra'
    maxAdditional: bigint
}

/**
 *  Schedule a portion of the stash to be unlocked ready for transfer out after the bond
 *  period ends. If this leaves an amount actively bonded less than
 *  T::Currency::minimum_balance(), then it is increased to the full amount.
 * 
 *  Once the unlock period is done, you can call `withdraw_unbonded` to actually move
 *  the funds out of management ready for transfer.
 * 
 *  No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
 *  can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
 *  to be called first to remove some of the chunks (if possible).
 * 
 *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
 * 
 *  Emits `Unbonded`.
 * 
 *  See also [`Call::withdraw_unbonded`].
 * 
 *  # <weight>
 *  - Independent of the arguments. Limited but potentially exploitable complexity.
 *  - Contains a limited number of reads.
 *  - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
 *    will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
 *    The only way to clean the aforementioned storage item is also user-controlled via
 *    `withdraw_unbonded`.
 *  - One DB entry.
 *  ----------
 *  Weight: O(1)
 *  DB Weight:
 *  - Read: EraElectionStatus, Ledger, CurrentEra, Locks, BalanceOf Stash,
 *  - Write: Locks, Ledger, BalanceOf Stash,
 *  </weight>
 */
export interface StakingCall_unbond {
    __kind: 'unbond'
    value: bigint
}

/**
 *  Remove any unlocked chunks from the `unlocking` queue from our management.
 * 
 *  This essentially frees up that balance to be used by the stash account to do
 *  whatever it wants.
 * 
 *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
 * 
 *  Emits `Withdrawn`.
 * 
 *  See also [`Call::unbond`].
 * 
 *  # <weight>
 *  - Could be dependent on the `origin` argument and how much `unlocking` chunks exist.
 *   It implies `consolidate_unlocked` which loops over `Ledger.unlocking`, which is
 *   indirectly user-controlled. See [`unbond`] for more detail.
 *  - Contains a limited number of reads, yet the size of which could be large based on `ledger`.
 *  - Writes are limited to the `origin` account key.
 *  ---------------
 *  Complexity O(S) where S is the number of slashing spans to remove
 *  Update:
 *  - Reads: EraElectionStatus, Ledger, Current Era, Locks, [Origin Account]
 *  - Writes: [Origin Account], Locks, Ledger
 *  Kill:
 *  - Reads: EraElectionStatus, Ledger, Current Era, Bonded, Slashing Spans, [Origin
 *    Account], Locks, BalanceOf stash
 *  - Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators,
 *    [Origin Account], Locks, BalanceOf stash.
 *  - Writes Each: SpanSlash * S
 *  NOTE: Weight annotation is the kill scenario, we refund otherwise.
 *  # </weight>
 */
export interface StakingCall_withdraw_unbonded {
    __kind: 'withdraw_unbonded'
    numSlashingSpans: number
}

/**
 *  Declare the desire to validate for the origin controller.
 * 
 *  Effects will be felt at the beginning of the next era.
 * 
 *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
 * 
 *  # <weight>
 *  - Independent of the arguments. Insignificant complexity.
 *  - Contains a limited number of reads.
 *  - Writes are limited to the `origin` account key.
 *  -----------
 *  Weight: O(1)
 *  DB Weight:
 *  - Read: Era Election Status, Ledger
 *  - Write: Nominators, Validators
 *  # </weight>
 */
export interface StakingCall_validate {
    __kind: 'validate'
    prefs: ValidatorPrefs
}

/**
 *  Declare the desire to nominate `targets` for the origin controller.
 * 
 *  Effects will be felt at the beginning of the next era. This can only be called when
 *  [`EraElectionStatus`] is `Closed`.
 * 
 *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
 * 
 *  # <weight>
 *  - The transaction's complexity is proportional to the size of `targets` (N)
 *  which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
 *  - Both the reads and writes follow a similar pattern.
 *  ---------
 *  Weight: O(N)
 *  where N is the number of targets
 *  DB Weight:
 *  - Reads: Era Election Status, Ledger, Current Era
 *  - Writes: Validators, Nominators
 *  # </weight>
 */
export interface StakingCall_nominate {
    __kind: 'nominate'
    targets: LookupSource[]
}

/**
 *  Declare no desire to either validate or nominate.
 * 
 *  Effects will be felt at the beginning of the next era.
 * 
 *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
 * 
 *  # <weight>
 *  - Independent of the arguments. Insignificant complexity.
 *  - Contains one read.
 *  - Writes are limited to the `origin` account key.
 *  --------
 *  Weight: O(1)
 *  DB Weight:
 *  - Read: EraElectionStatus, Ledger
 *  - Write: Validators, Nominators
 *  # </weight>
 */
export interface StakingCall_chill {
    __kind: 'chill'
}

/**
 *  (Re-)set the payment target for a controller.
 * 
 *  Effects will be felt at the beginning of the next era.
 * 
 *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 * 
 *  # <weight>
 *  - Independent of the arguments. Insignificant complexity.
 *  - Contains a limited number of reads.
 *  - Writes are limited to the `origin` account key.
 *  ---------
 *  - Weight: O(1)
 *  - DB Weight:
 *      - Read: Ledger
 *      - Write: Payee
 *  # </weight>
 */
export interface StakingCall_set_payee {
    __kind: 'set_payee'
    payee: RewardDestination
}

/**
 *  (Re-)set the controller of a stash.
 * 
 *  Effects will be felt at the beginning of the next era.
 * 
 *  The dispatch origin for this call must be _Signed_ by the stash, not the controller.
 * 
 *  # <weight>
 *  - Independent of the arguments. Insignificant complexity.
 *  - Contains a limited number of reads.
 *  - Writes are limited to the `origin` account key.
 *  ----------
 *  Weight: O(1)
 *  DB Weight:
 *  - Read: Bonded, Ledger New Controller, Ledger Old Controller
 *  - Write: Bonded, Ledger New Controller, Ledger Old Controller
 *  # </weight>
 */
export interface StakingCall_set_controller {
    __kind: 'set_controller'
    controller: LookupSource
}

/**
 *  Sets the ideal number of validators.
 * 
 *  The dispatch origin must be Root.
 * 
 *  # <weight>
 *  Weight: O(1)
 *  Write: Validator Count
 *  # </weight>
 */
export interface StakingCall_set_validator_count {
    __kind: 'set_validator_count'
    new: number
}

/**
 *  Increments the ideal number of validators.
 * 
 *  The dispatch origin must be Root.
 * 
 *  # <weight>
 *  Same as [`set_validator_count`].
 *  # </weight>
 */
export interface StakingCall_increase_validator_count {
    __kind: 'increase_validator_count'
    additional: number
}

/**
 *  Scale up the ideal number of validators by a factor.
 * 
 *  The dispatch origin must be Root.
 * 
 *  # <weight>
 *  Same as [`set_validator_count`].
 *  # </weight>
 */
export interface StakingCall_scale_validator_count {
    __kind: 'scale_validator_count'
    factor: number
}

/**
 *  Force there to be no new eras indefinitely.
 * 
 *  The dispatch origin must be Root.
 * 
 *  # <weight>
 *  - No arguments.
 *  - Weight: O(1)
 *  - Write: ForceEra
 *  # </weight>
 */
export interface StakingCall_force_no_eras {
    __kind: 'force_no_eras'
}

/**
 *  Force there to be a new era at the end of the next session. After this, it will be
 *  reset to normal (non-forced) behaviour.
 * 
 *  The dispatch origin must be Root.
 * 
 *  # <weight>
 *  - No arguments.
 *  - Weight: O(1)
 *  - Write ForceEra
 *  # </weight>
 */
export interface StakingCall_force_new_era {
    __kind: 'force_new_era'
}

/**
 *  Set the validators who cannot be slashed (if any).
 * 
 *  The dispatch origin must be Root.
 * 
 *  # <weight>
 *  - O(V)
 *  - Write: Invulnerables
 *  # </weight>
 */
export interface StakingCall_set_invulnerables {
    __kind: 'set_invulnerables'
    invulnerables: Uint8Array[]
}

/**
 *  Force a current staker to become completely unstaked, immediately.
 * 
 *  The dispatch origin must be Root.
 * 
 *  # <weight>
 *  O(S) where S is the number of slashing spans to be removed
 *  Reads: Bonded, Slashing Spans, Account, Locks
 *  Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators, Account, Locks
 *  Writes Each: SpanSlash * S
 *  # </weight>
 */
export interface StakingCall_force_unstake {
    __kind: 'force_unstake'
    stash: Uint8Array
    numSlashingSpans: number
}

/**
 *  Force there to be a new era at the end of sessions indefinitely.
 * 
 *  The dispatch origin must be Root.
 * 
 *  # <weight>
 *  - Weight: O(1)
 *  - Write: ForceEra
 *  # </weight>
 */
export interface StakingCall_force_new_era_always {
    __kind: 'force_new_era_always'
}

/**
 *  Cancel enactment of a deferred slash.
 * 
 *  Can be called by the `T::SlashCancelOrigin`.
 * 
 *  Parameters: era and indices of the slashes for that era to kill.
 * 
 *  # <weight>
 *  Complexity: O(U + S)
 *  with U unapplied slashes weighted with U=1000
 *  and S is the number of slash indices to be canceled.
 *  - Read: Unapplied Slashes
 *  - Write: Unapplied Slashes
 *  # </weight>
 */
export interface StakingCall_cancel_deferred_slash {
    __kind: 'cancel_deferred_slash'
    era: number
    slashIndices: number[]
}

/**
 *  Pay out all the stakers behind a single validator for a single era.
 * 
 *  - `validator_stash` is the stash account of the validator. Their nominators, up to
 *    `T::MaxNominatorRewardedPerValidator`, will also receive their rewards.
 *  - `era` may be any era between `[current_era - history_depth; current_era]`.
 * 
 *  The origin of this call must be _Signed_. Any account can call this function, even if
 *  it is not one of the stakers.
 * 
 *  This can only be called when [`EraElectionStatus`] is `Closed`.
 * 
 *  # <weight>
 *  - Time complexity: at most O(MaxNominatorRewardedPerValidator).
 *  - Contains a limited number of reads and writes.
 *  -----------
 *  N is the Number of payouts for the validator (including the validator)
 *  Weight:
 *  - Reward Destination Staked: O(N)
 *  - Reward Destination Controller (Creating): O(N)
 *  DB Weight:
 *  - Read: EraElectionStatus, CurrentEra, HistoryDepth, ErasValidatorReward,
 *          ErasStakersClipped, ErasRewardPoints, ErasValidatorPrefs (8 items)
 *  - Read Each: Bonded, Ledger, Payee, Locks, System Account (5 items)
 *  - Write Each: System Account, Locks, Ledger (3 items)
 * 
 *    NOTE: weights are assuming that payouts are made to alive stash account (Staked).
 *    Paying even a dead controller is cheaper weight-wise. We don't do any refunds here.
 *  # </weight>
 */
export interface StakingCall_payout_stakers {
    __kind: 'payout_stakers'
    validatorStash: Uint8Array
    era: number
}

/**
 *  Rebond a portion of the stash scheduled to be unlocked.
 * 
 *  The dispatch origin must be signed by the controller, and it can be only called when
 *  [`EraElectionStatus`] is `Closed`.
 * 
 *  # <weight>
 *  - Time complexity: O(L), where L is unlocking chunks
 *  - Bounded by `MAX_UNLOCKING_CHUNKS`.
 *  - Storage changes: Can't increase storage, only decrease it.
 *  ---------------
 *  - DB Weight:
 *      - Reads: EraElectionStatus, Ledger, Locks, [Origin Account]
 *      - Writes: [Origin Account], Locks, Ledger
 *  # </weight>
 */
export interface StakingCall_rebond {
    __kind: 'rebond'
    value: bigint
}

/**
 *  Set `HistoryDepth` value. This function will delete any history information
 *  when `HistoryDepth` is reduced.
 * 
 *  Parameters:
 *  - `new_history_depth`: The new history depth you would like to set.
 *  - `era_items_deleted`: The number of items that will be deleted by this dispatch.
 *     This should report all the storage items that will be deleted by clearing old
 *     era history. Needed to report an accurate weight for the dispatch. Trusted by
 *     `Root` to report an accurate number.
 * 
 *  Origin must be root.
 * 
 *  # <weight>
 *  - E: Number of history depths removed, i.e. 10 -> 7 = 3
 *  - Weight: O(E)
 *  - DB Weight:
 *      - Reads: Current Era, History Depth
 *      - Writes: History Depth
 *      - Clear Prefix Each: Era Stakers, EraStakersClipped, ErasValidatorPrefs
 *      - Writes Each: ErasValidatorReward, ErasRewardPoints, ErasTotalStake, ErasStartSessionIndex
 *  # </weight>
 */
export interface StakingCall_set_history_depth {
    __kind: 'set_history_depth'
    newHistoryDepth: number
    eraItemsDeleted: number
}

/**
 *  Remove all data structure concerning a staker/stash once its balance is at the minimum.
 *  This is essentially equivalent to `withdraw_unbonded` except it can be called by anyone
 *  and the target `stash` must have no funds left beyond the ED.
 * 
 *  This can be called from any origin.
 * 
 *  - `stash`: The stash account to reap. Its balance must be zero.
 * 
 *  # <weight>
 *  Complexity: O(S) where S is the number of slashing spans on the account.
 *  DB Weight:
 *  - Reads: Stash Account, Bonded, Slashing Spans, Locks
 *  - Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators, Stash Account, Locks
 *  - Writes Each: SpanSlash * S
 *  # </weight>
 */
export interface StakingCall_reap_stash {
    __kind: 'reap_stash'
    stash: Uint8Array
    numSlashingSpans: number
}

/**
 *  Submit an election result to the chain. If the solution:
 * 
 *  1. is valid.
 *  2. has a better score than a potentially existing solution on chain.
 * 
 *  then, it will be _put_ on chain.
 * 
 *  A solution consists of two pieces of data:
 * 
 *  1. `winners`: a flat vector of all the winners of the round.
 *  2. `assignments`: the compact version of an assignment vector that encodes the edge
 *     weights.
 * 
 *  Both of which may be computed using _phragmen_, or any other algorithm.
 * 
 *  Additionally, the submitter must provide:
 * 
 *  - The `score` that they claim their solution has.
 * 
 *  Both validators and nominators will be represented by indices in the solution. The
 *  indices should respect the corresponding types ([`ValidatorIndex`] and
 *  [`NominatorIndex`]). Moreover, they should be valid when used to index into
 *  [`SnapshotValidators`] and [`SnapshotNominators`]. Any invalid index will cause the
 *  solution to be rejected. These two storage items are set during the election window and
 *  may be used to determine the indices.
 * 
 *  A solution is valid if:
 * 
 *  0. It is submitted when [`EraElectionStatus`] is `Open`.
 *  1. Its claimed score is equal to the score computed on-chain.
 *  2. Presents the correct number of winners.
 *  3. All indexes must be value according to the snapshot vectors. All edge values must
 *     also be correct and should not overflow the granularity of the ratio type (i.e. 256
 *     or billion).
 *  4. For each edge, all targets are actually nominated by the voter.
 *  5. Has correct self-votes.
 * 
 *  A solutions score is consisted of 3 parameters:
 * 
 *  1. `min { support.total }` for each support of a winner. This value should be maximized.
 *  2. `sum { support.total }` for each support of a winner. This value should be minimized.
 *  3. `sum { support.total^2 }` for each support of a winner. This value should be
 *     minimized (to ensure less variance)
 * 
 *  # <weight>
 *  The transaction is assumed to be the longest path, a better solution.
 *    - Initial solution is almost the same.
 *    - Worse solution is retraced in pre-dispatch-checks which sets its own weight.
 *  # </weight>
 */
export interface StakingCall_submit_election_solution {
    __kind: 'submit_election_solution'
    winners: number[]
    compact: CompactAssignments
    score: bigint[]
    era: number
    size: ElectionSize
}

/**
 *  Unsigned version of `submit_election_solution`.
 * 
 *  Note that this must pass the [`ValidateUnsigned`] check which only allows transactions
 *  from the local node to be included. In other words, only the block author can include a
 *  transaction in the block.
 * 
 *  # <weight>
 *  See [`submit_election_solution`].
 *  # </weight>
 */
export interface StakingCall_submit_election_solution_unsigned {
    __kind: 'submit_election_solution_unsigned'
    winners: number[]
    compact: CompactAssignments
    score: bigint[]
    era: number
    size: ElectionSize
}

/**
 *  Remove the given nominations from the calling validator.
 * 
 *  Effects will be felt at the beginning of the next era.
 * 
 *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
 *  And, it can be only called when [`EraElectionStatus`] is `Closed`. The controller
 *  account should represent a validator.
 * 
 *  - `who`: A list of nominator stash accounts who are nominating this validator which
 *    should no longer be nominating this validator.
 * 
 *  Note: Making this call only makes sense if you first set the validator preferences to
 *  block any further nominations.
 */
export interface StakingCall_kick {
    __kind: 'kick'
    who: LookupSource[]
}

export type SessionCall = SessionCall_set_keys | SessionCall_purge_keys

/**
 *  Sets the session key(s) of the function caller to `keys`.
 *  Allows an account to set its session key prior to becoming a validator.
 *  This doesn't take effect until the next session.
 * 
 *  The dispatch origin of this function must be signed.
 * 
 *  # <weight>
 *  - Complexity: `O(1)`
 *    Actual cost depends on the number of length of `T::Keys::key_ids()` which is fixed.
 *  - DbReads: `origin account`, `T::ValidatorIdOf`, `NextKeys`
 *  - DbWrites: `origin account`, `NextKeys`
 *  - DbReads per key id: `KeyOwner`
 *  - DbWrites per key id: `KeyOwner`
 *  # </weight>
 */
export interface SessionCall_set_keys {
    __kind: 'set_keys'
    keys: [Uint8Array, Uint8Array, Uint8Array, Uint8Array]
    proof: Uint8Array
}

/**
 *  Removes any session key(s) of the function caller.
 *  This doesn't take effect until the next session.
 * 
 *  The dispatch origin of this function must be signed.
 * 
 *  # <weight>
 *  - Complexity: `O(1)` in number of key types.
 *    Actual cost depends on the number of length of `T::Keys::key_ids()` which is fixed.
 *  - DbReads: `T::ValidatorIdOf`, `NextKeys`, `origin account`
 *  - DbWrites: `NextKeys`, `origin account`
 *  - DbWrites per key id: `KeyOwnder`
 *  # </weight>
 */
export interface SessionCall_purge_keys {
    __kind: 'purge_keys'
}

export type OffencesCall = never

export type ImOnlineCall = ImOnlineCall_heartbeat

/**
 *  # <weight>
 *  - Complexity: `O(K + E)` where K is length of `Keys` (heartbeat.validators_len)
 *    and E is length of `heartbeat.network_state.external_address`
 *    - `O(K)`: decoding of length `K`
 *    - `O(E)`: decoding/encoding of length `E`
 *  - DbReads: pallet_session `Validators`, pallet_session `CurrentIndex`, `Keys`,
 *    `ReceivedHeartbeats`
 *  - DbWrites: `ReceivedHeartbeats`
 *  # </weight>
 */
export interface ImOnlineCall_heartbeat {
    __kind: 'heartbeat'
    heartbeat: Heartbeat
    signature: Uint8Array
}

export type AuthorityDiscoveryCall = never

export type IdentityCall = IdentityCall_add_registrar | IdentityCall_set_identity | IdentityCall_set_subs | IdentityCall_clear_identity | IdentityCall_request_judgement | IdentityCall_cancel_request | IdentityCall_set_fee | IdentityCall_set_account_id | IdentityCall_set_fields | IdentityCall_provide_judgement | IdentityCall_kill_identity | IdentityCall_add_sub | IdentityCall_rename_sub | IdentityCall_remove_sub | IdentityCall_quit_sub

/**
 *  Add a registrar to the system.
 * 
 *  The dispatch origin for this call must be `T::RegistrarOrigin`.
 * 
 *  - `account`: the account of the registrar.
 * 
 *  Emits `RegistrarAdded` if successful.
 * 
 *  # <weight>
 *  - `O(R)` where `R` registrar-count (governance-bounded and code-bounded).
 *  - One storage mutation (codec `O(R)`).
 *  - One event.
 *  # </weight>
 */
export interface IdentityCall_add_registrar {
    __kind: 'add_registrar'
    account: Uint8Array
}

/**
 *  Set an account's identity information and reserve the appropriate deposit.
 * 
 *  If the account already has identity information, the deposit is taken as part payment
 *  for the new deposit.
 * 
 *  The dispatch origin for this call must be _Signed_.
 * 
 *  - `info`: The identity information.
 * 
 *  Emits `IdentitySet` if successful.
 * 
 *  # <weight>
 *  - `O(X + X' + R)`
 *    - where `X` additional-field-count (deposit-bounded and code-bounded)
 *    - where `R` judgements-count (registrar-count-bounded)
 *  - One balance reserve operation.
 *  - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).
 *  - One event.
 *  # </weight>
 */
export interface IdentityCall_set_identity {
    __kind: 'set_identity'
    info: IdentityInfo
}

/**
 *  Set the sub-accounts of the sender.
 * 
 *  Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned
 *  and an amount `SubAccountDeposit` will be reserved for each item in `subs`.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
 *  identity.
 * 
 *  - `subs`: The identity's (new) sub-accounts.
 * 
 *  # <weight>
 *  - `O(P + S)`
 *    - where `P` old-subs-count (hard- and deposit-bounded).
 *    - where `S` subs-count (hard- and deposit-bounded).
 *  - At most one balance operations.
 *  - DB:
 *    - `P + S` storage mutations (codec complexity `O(1)`)
 *    - One storage read (codec complexity `O(P)`).
 *    - One storage write (codec complexity `O(S)`).
 *    - One storage-exists (`IdentityOf::contains_key`).
 *  # </weight>
 */
export interface IdentityCall_set_subs {
    __kind: 'set_subs'
    subs: [Uint8Array, Data][]
}

/**
 *  Clear an account's identity info and all sub-accounts and return all deposits.
 * 
 *  Payment: All reserved balances on the account are returned.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
 *  identity.
 * 
 *  Emits `IdentityCleared` if successful.
 * 
 *  # <weight>
 *  - `O(R + S + X)`
 *    - where `R` registrar-count (governance-bounded).
 *    - where `S` subs-count (hard- and deposit-bounded).
 *    - where `X` additional-field-count (deposit-bounded and code-bounded).
 *  - One balance-unreserve operation.
 *  - `2` storage reads and `S + 2` storage deletions.
 *  - One event.
 *  # </weight>
 */
export interface IdentityCall_clear_identity {
    __kind: 'clear_identity'
}

/**
 *  Request a judgement from a registrar.
 * 
 *  Payment: At most `max_fee` will be reserved for payment to the registrar if judgement
 *  given.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must have a
 *  registered identity.
 * 
 *  - `reg_index`: The index of the registrar whose judgement is requested.
 *  - `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:
 * 
 *  ```nocompile
 *  Self::registrars().get(reg_index).unwrap().fee
 *  ```
 * 
 *  Emits `JudgementRequested` if successful.
 * 
 *  # <weight>
 *  - `O(R + X)`.
 *  - One balance-reserve operation.
 *  - Storage: 1 read `O(R)`, 1 mutate `O(X + R)`.
 *  - One event.
 *  # </weight>
 */
export interface IdentityCall_request_judgement {
    __kind: 'request_judgement'
    regIndex: number
    maxFee: bigint
}

/**
 *  Cancel a previous request.
 * 
 *  Payment: A previously reserved deposit is returned on success.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must have a
 *  registered identity.
 * 
 *  - `reg_index`: The index of the registrar whose judgement is no longer requested.
 * 
 *  Emits `JudgementUnrequested` if successful.
 * 
 *  # <weight>
 *  - `O(R + X)`.
 *  - One balance-reserve operation.
 *  - One storage mutation `O(R + X)`.
 *  - One event
 *  # </weight>
 */
export interface IdentityCall_cancel_request {
    __kind: 'cancel_request'
    regIndex: number
}

/**
 *  Set the fee required for a judgement to be requested from a registrar.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must be the account
 *  of the registrar whose index is `index`.
 * 
 *  - `index`: the index of the registrar whose fee is to be set.
 *  - `fee`: the new fee.
 * 
 *  # <weight>
 *  - `O(R)`.
 *  - One storage mutation `O(R)`.
 *  - Benchmark: 7.315 + R * 0.329 µs (min squares analysis)
 *  # </weight>
 */
export interface IdentityCall_set_fee {
    __kind: 'set_fee'
    index: number
    fee: bigint
}

/**
 *  Change the account associated with a registrar.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must be the account
 *  of the registrar whose index is `index`.
 * 
 *  - `index`: the index of the registrar whose fee is to be set.
 *  - `new`: the new account ID.
 * 
 *  # <weight>
 *  - `O(R)`.
 *  - One storage mutation `O(R)`.
 *  - Benchmark: 8.823 + R * 0.32 µs (min squares analysis)
 *  # </weight>
 */
export interface IdentityCall_set_account_id {
    __kind: 'set_account_id'
    index: number
    new: Uint8Array
}

/**
 *  Set the field information for a registrar.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must be the account
 *  of the registrar whose index is `index`.
 * 
 *  - `index`: the index of the registrar whose fee is to be set.
 *  - `fields`: the fields that the registrar concerns themselves with.
 * 
 *  # <weight>
 *  - `O(R)`.
 *  - One storage mutation `O(R)`.
 *  - Benchmark: 7.464 + R * 0.325 µs (min squares analysis)
 *  # </weight>
 */
export interface IdentityCall_set_fields {
    __kind: 'set_fields'
    index: number
    fields: bigint
}

/**
 *  Provide a judgement for an account's identity.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must be the account
 *  of the registrar whose index is `reg_index`.
 * 
 *  - `reg_index`: the index of the registrar whose judgement is being made.
 *  - `target`: the account whose identity the judgement is upon. This must be an account
 *    with a registered identity.
 *  - `judgement`: the judgement of the registrar of index `reg_index` about `target`.
 * 
 *  Emits `JudgementGiven` if successful.
 * 
 *  # <weight>
 *  - `O(R + X)`.
 *  - One balance-transfer operation.
 *  - Up to one account-lookup operation.
 *  - Storage: 1 read `O(R)`, 1 mutate `O(R + X)`.
 *  - One event.
 *  # </weight>
 */
export interface IdentityCall_provide_judgement {
    __kind: 'provide_judgement'
    regIndex: number
    target: LookupSource
    judgement: IdentityJudgement
}

/**
 *  Remove an account's identity and sub-account information and slash the deposits.
 * 
 *  Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
 *  `Slash`. Verification request deposits are not returned; they should be cancelled
 *  manually using `cancel_request`.
 * 
 *  The dispatch origin for this call must match `T::ForceOrigin`.
 * 
 *  - `target`: the account whose identity the judgement is upon. This must be an account
 *    with a registered identity.
 * 
 *  Emits `IdentityKilled` if successful.
 * 
 *  # <weight>
 *  - `O(R + S + X)`.
 *  - One balance-reserve operation.
 *  - `S + 2` storage mutations.
 *  - One event.
 *  # </weight>
 */
export interface IdentityCall_kill_identity {
    __kind: 'kill_identity'
    target: LookupSource
}

/**
 *  Add the given account to the sender's subs.
 * 
 *  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
 *  to the sender.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
 *  sub identity of `sub`.
 */
export interface IdentityCall_add_sub {
    __kind: 'add_sub'
    sub: LookupSource
    data: Data
}

/**
 *  Alter the associated name of the given sub-account.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
 *  sub identity of `sub`.
 */
export interface IdentityCall_rename_sub {
    __kind: 'rename_sub'
    sub: LookupSource
    data: Data
}

/**
 *  Remove the given account from the sender's subs.
 * 
 *  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
 *  to the sender.
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
 *  sub identity of `sub`.
 */
export interface IdentityCall_remove_sub {
    __kind: 'remove_sub'
    sub: LookupSource
}

/**
 *  Remove the sender as a sub-account.
 * 
 *  Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
 *  to the sender (*not* the original depositor).
 * 
 *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
 *  super-identity.
 * 
 *  NOTE: This should not normally be used, but is provided in the case that the non-
 *  controller of an account is maliciously registered as a sub-account.
 */
export interface IdentityCall_quit_sub {
    __kind: 'quit_sub'
}

export type TechCouncilCall = TechCouncilCall_set_members | TechCouncilCall_execute | TechCouncilCall_propose | TechCouncilCall_vote | TechCouncilCall_close | TechCouncilCall_disapprove_proposal

/**
 *  Set the collective's membership.
 * 
 *  - `new_members`: The new member list. Be nice to the chain and provide it sorted.
 *  - `prime`: The prime member whose vote sets the default.
 *  - `old_count`: The upper bound for the previous number of members in storage.
 *                 Used for weight estimation.
 * 
 *  Requires root origin.
 * 
 *  NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
 *        the weight estimations rely on it to estimate dispatchable weight.
 * 
 *  # <weight>
 *  ## Weight
 *  - `O(MP + N)` where:
 *    - `M` old-members-count (code- and governance-bounded)
 *    - `N` new-members-count (code- and governance-bounded)
 *    - `P` proposals-count (code-bounded)
 *  - DB:
 *    - 1 storage mutation (codec `O(M)` read, `O(N)` write) for reading and writing the members
 *    - 1 storage read (codec `O(P)`) for reading the proposals
 *    - `P` storage mutations (codec `O(M)`) for updating the votes for each proposal
 *    - 1 storage write (codec `O(1)`) for deleting the old `prime` and setting the new one
 *  # </weight>
 */
export interface TechCouncilCall_set_members {
    __kind: 'set_members'
    newMembers: Uint8Array[]
    prime: (Uint8Array | undefined)
    oldCount: number
}

/**
 *  Dispatch a proposal from a member using the `Member` origin.
 * 
 *  Origin must be a member of the collective.
 * 
 *  # <weight>
 *  ## Weight
 *  - `O(M + P)` where `M` members-count (code-bounded) and `P` complexity of dispatching `proposal`
 *  - DB: 1 read (codec `O(M)`) + DB access of `proposal`
 *  - 1 event
 *  # </weight>
 */
export interface TechCouncilCall_execute {
    __kind: 'execute'
    proposal: Proposal
    lengthBound: number
}

/**
 *  Add a new proposal to either be voted on or executed directly.
 * 
 *  Requires the sender to be member.
 * 
 *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
 *  or put up for voting.
 * 
 *  # <weight>
 *  ## Weight
 *  - `O(B + M + P1)` or `O(B + M + P2)` where:
 *    - `B` is `proposal` size in bytes (length-fee-bounded)
 *    - `M` is members-count (code- and governance-bounded)
 *    - branching is influenced by `threshold` where:
 *      - `P1` is proposal execution complexity (`threshold < 2`)
 *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
 *  - DB:
 *    - 1 storage read `is_member` (codec `O(M)`)
 *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
 *    - DB accesses influenced by `threshold`:
 *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
 *      - OR proposal insertion (`threshold <= 2`)
 *        - 1 storage mutation `Proposals` (codec `O(P2)`)
 *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
 *        - 1 storage write `ProposalOf` (codec `O(B)`)
 *        - 1 storage write `Voting` (codec `O(M)`)
 *    - 1 event
 *  # </weight>
 */
export interface TechCouncilCall_propose {
    __kind: 'propose'
    threshold: number
    proposal: Proposal
    lengthBound: number
}

/**
 *  Add an aye or nay vote for the sender to the given proposal.
 * 
 *  Requires the sender to be a member.
 * 
 *  Transaction fees will be waived if the member is voting on any particular proposal
 *  for the first time and the call is successful. Subsequent vote changes will charge a fee.
 *  # <weight>
 *  ## Weight
 *  - `O(M)` where `M` is members-count (code- and governance-bounded)
 *  - DB:
 *    - 1 storage read `Members` (codec `O(M)`)
 *    - 1 storage mutation `Voting` (codec `O(M)`)
 *  - 1 event
 *  # </weight>
 */
export interface TechCouncilCall_vote {
    __kind: 'vote'
    proposal: Uint8Array
    index: number
    approve: boolean
}

/**
 *  Close a vote that is either approved, disapproved or whose voting period has ended.
 * 
 *  May be called by any signed account in order to finish voting and close the proposal.
 * 
 *  If called before the end of the voting period it will only close the vote if it is
 *  has enough votes to be approved or disapproved.
 * 
 *  If called after the end of the voting period abstentions are counted as rejections
 *  unless there is a prime member set and the prime member cast an approval.
 * 
 *  If the close operation completes successfully with disapproval, the transaction fee will
 *  be waived. Otherwise execution of the approved operation will be charged to the caller.
 * 
 *  + `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed proposal.
 *  + `length_bound`: The upper bound for the length of the proposal in storage. Checked via
 *                    `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
 * 
 *  # <weight>
 *  ## Weight
 *  - `O(B + M + P1 + P2)` where:
 *    - `B` is `proposal` size in bytes (length-fee-bounded)
 *    - `M` is members-count (code- and governance-bounded)
 *    - `P1` is the complexity of `proposal` preimage.
 *    - `P2` is proposal-count (code-bounded)
 *  - DB:
 *   - 2 storage reads (`Members`: codec `O(M)`, `Prime`: codec `O(1)`)
 *   - 3 mutations (`Voting`: codec `O(M)`, `ProposalOf`: codec `O(B)`, `Proposals`: codec `O(P2)`)
 *   - any mutations done while executing `proposal` (`P1`)
 *  - up to 3 events
 *  # </weight>
 */
export interface TechCouncilCall_close {
    __kind: 'close'
    proposalHash: Uint8Array
    index: number
    proposalWeightBound: bigint
    lengthBound: number
}

/**
 *  Disapprove a proposal, close, and remove it from the system, regardless of its current state.
 * 
 *  Must be called by the Root origin.
 * 
 *  Parameters:
 *  * `proposal_hash`: The hash of the proposal that should be disapproved.
 * 
 *  # <weight>
 *  Complexity: O(P) where P is the number of max proposals
 *  DB Weight:
 *  * Reads: Proposals
 *  * Writes: Voting, Proposals, ProposalOf
 *  # </weight>
 */
export interface TechCouncilCall_disapprove_proposal {
    __kind: 'disapprove_proposal'
    proposalHash: Uint8Array
}

export type PocCall = PocCall_start_candidacy | PocCall_stop_candidacy | PocCall_commit | PocCall_add_funds | PocCall_unbond | PocCall_withdraw | PocCall_vote_candidate

export interface PocCall_start_candidacy {
    __kind: 'start_candidacy'
}

export interface PocCall_stop_candidacy {
    __kind: 'stop_candidacy'
}

export interface PocCall_commit {
    __kind: 'commit'
    amount: bigint
    duration: LockDuration
    candidate: Uint8Array
}

export interface PocCall_add_funds {
    __kind: 'add_funds'
    amount: bigint
}

export interface PocCall_unbond {
    __kind: 'unbond'
}

export interface PocCall_withdraw {
    __kind: 'withdraw'
}

export interface PocCall_vote_candidate {
    __kind: 'vote_candidate'
    candidate: Uint8Array
}

export interface FullIdentification {
    total: bigint
    own: bigint
    others: IndividualExposure[]
}

export type LockState = LockState_Committed | LockState_Unbonding

export interface LockState_Committed {
    __kind: 'Committed'
}

export interface LockState_Unbonding {
    __kind: 'Unbonding'
    value: number
}

export type LockDuration = LockDuration_OneMonth | LockDuration_OneYear | LockDuration_TenYears

export interface LockDuration_OneMonth {
    __kind: 'OneMonth'
}

export interface LockDuration_OneYear {
    __kind: 'OneYear'
}

export interface LockDuration_TenYears {
    __kind: 'TenYears'
}

export type Type_51 = Type_51_System | Type_51_RandomnessCollectiveFlip | Type_51_Timestamp | Type_51_Sudo | Type_51_Scheduler | Type_51_Indices | Type_51_Balances | Type_51_Currencies | Type_51_TransactionPayment | Type_51_Authority | Type_51_EvmAccounts | Type_51_EVM | Type_51_Authorship | Type_51_Babe | Type_51_Grandpa | Type_51_Staking | Type_51_Session | Type_51_Offences | Type_51_ImOnline | Type_51_AuthorityDiscovery | Type_51_Identity | Type_51_TechCouncil | Type_51_Poc

export interface Type_51_System {
    __kind: 'System'
    value: SystemCall
}

export interface Type_51_RandomnessCollectiveFlip {
    __kind: 'RandomnessCollectiveFlip'
    value: RandomnessCollectiveFlipCall
}

export interface Type_51_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Type_51_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface Type_51_Scheduler {
    __kind: 'Scheduler'
    value: SchedulerCall
}

export interface Type_51_Indices {
    __kind: 'Indices'
    value: IndicesCall
}

export interface Type_51_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Type_51_Currencies {
    __kind: 'Currencies'
    value: CurrenciesCall
}

export interface Type_51_TransactionPayment {
    __kind: 'TransactionPayment'
    value: TransactionPaymentCall
}

export interface Type_51_Authority {
    __kind: 'Authority'
    value: AuthorityCall
}

export interface Type_51_EvmAccounts {
    __kind: 'EvmAccounts'
    value: EvmAccountsCall
}

export interface Type_51_EVM {
    __kind: 'EVM'
    value: EVMCall
}

export interface Type_51_Authorship {
    __kind: 'Authorship'
    value: AuthorshipCall
}

export interface Type_51_Babe {
    __kind: 'Babe'
    value: BabeCall
}

export interface Type_51_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaCall
}

export interface Type_51_Staking {
    __kind: 'Staking'
    value: StakingCall
}

export interface Type_51_Session {
    __kind: 'Session'
    value: SessionCall
}

export interface Type_51_Offences {
    __kind: 'Offences'
    value: OffencesCall
}

export interface Type_51_ImOnline {
    __kind: 'ImOnline'
    value: ImOnlineCall
}

export interface Type_51_AuthorityDiscovery {
    __kind: 'AuthorityDiscovery'
    value: AuthorityDiscoveryCall
}

export interface Type_51_Identity {
    __kind: 'Identity'
    value: IdentityCall
}

export interface Type_51_TechCouncil {
    __kind: 'TechCouncil'
    value: TechCouncilCall
}

export interface Type_51_Poc {
    __kind: 'Poc'
    value: PocCall
}

export type PalletsOrigin = PalletsOrigin_System | PalletsOrigin_Timestamp | PalletsOrigin_RandomnessCollectiveFlip | PalletsOrigin_Balances | PalletsOrigin_Accounts | PalletsOrigin_Currencies | PalletsOrigin_Tokens | PalletsOrigin_Vesting | PalletsOrigin_Utility | PalletsOrigin_Multisig | PalletsOrigin_Recovery | PalletsOrigin_Proxy | PalletsOrigin_Scheduler | PalletsOrigin_Indices | PalletsOrigin_GraduallyUpdate | PalletsOrigin_Authorship | PalletsOrigin_Babe | PalletsOrigin_Grandpa | PalletsOrigin_Staking | PalletsOrigin_Session | PalletsOrigin_Historical | PalletsOrigin_Authority | PalletsOrigin_ElectionsPhragmen | PalletsOrigin_Contracts | PalletsOrigin_EVM | PalletsOrigin_Sudo | PalletsOrigin_TransactionPayment

export interface PalletsOrigin_System {
    __kind: 'System'
    value: SystemOrigin
}

export interface PalletsOrigin_Timestamp {
    __kind: 'Timestamp'
}

export interface PalletsOrigin_RandomnessCollectiveFlip {
    __kind: 'RandomnessCollectiveFlip'
}

export interface PalletsOrigin_Balances {
    __kind: 'Balances'
}

export interface PalletsOrigin_Accounts {
    __kind: 'Accounts'
}

export interface PalletsOrigin_Currencies {
    __kind: 'Currencies'
}

export interface PalletsOrigin_Tokens {
    __kind: 'Tokens'
}

export interface PalletsOrigin_Vesting {
    __kind: 'Vesting'
}

export interface PalletsOrigin_Utility {
    __kind: 'Utility'
}

export interface PalletsOrigin_Multisig {
    __kind: 'Multisig'
}

export interface PalletsOrigin_Recovery {
    __kind: 'Recovery'
}

export interface PalletsOrigin_Proxy {
    __kind: 'Proxy'
}

export interface PalletsOrigin_Scheduler {
    __kind: 'Scheduler'
}

export interface PalletsOrigin_Indices {
    __kind: 'Indices'
}

export interface PalletsOrigin_GraduallyUpdate {
    __kind: 'GraduallyUpdate'
}

export interface PalletsOrigin_Authorship {
    __kind: 'Authorship'
}

export interface PalletsOrigin_Babe {
    __kind: 'Babe'
}

export interface PalletsOrigin_Grandpa {
    __kind: 'Grandpa'
}

export interface PalletsOrigin_Staking {
    __kind: 'Staking'
}

export interface PalletsOrigin_Session {
    __kind: 'Session'
}

export interface PalletsOrigin_Historical {
    __kind: 'Historical'
}

export interface PalletsOrigin_Authority {
    __kind: 'Authority'
    value: DelayedOrigin
}

export interface PalletsOrigin_ElectionsPhragmen {
    __kind: 'ElectionsPhragmen'
}

export interface PalletsOrigin_Contracts {
    __kind: 'Contracts'
}

export interface PalletsOrigin_EVM {
    __kind: 'EVM'
}

export interface PalletsOrigin_Sudo {
    __kind: 'Sudo'
}

export interface PalletsOrigin_TransactionPayment {
    __kind: 'TransactionPayment'
}

export interface IndividualExposure {
    who: Uint8Array
    value: bigint
}

export interface UnlockChunk {
    value: bigint
    era: number
}

export type ElectionCompute = ElectionCompute_OnChain | ElectionCompute_Signed | ElectionCompute_Unsigned

export interface ElectionCompute_OnChain {
    __kind: 'OnChain'
}

export interface ElectionCompute_Signed {
    __kind: 'Signed'
}

export interface ElectionCompute_Unsigned {
    __kind: 'Unsigned'
}

export type DigestItem = DigestItem_Other | DigestItem_AuthoritiesChange | DigestItem_ChangesTrieRoot | DigestItem_SealV0 | DigestItem_Consensus | DigestItem_Seal | DigestItem_PreRuntime | DigestItem_ChangesTrieSignal | DigestItem_RuntimeEnvironmentUpdated

export interface DigestItem_Other {
    __kind: 'Other'
    value: Uint8Array
}

export interface DigestItem_AuthoritiesChange {
    __kind: 'AuthoritiesChange'
    value: Uint8Array[]
}

export interface DigestItem_ChangesTrieRoot {
    __kind: 'ChangesTrieRoot'
    value: Uint8Array
}

export interface DigestItem_SealV0 {
    __kind: 'SealV0'
    value: [bigint, Uint8Array]
}

export interface DigestItem_Consensus {
    __kind: 'Consensus'
    value: [Uint8Array, Uint8Array]
}

export interface DigestItem_Seal {
    __kind: 'Seal'
    value: [Uint8Array, Uint8Array]
}

export interface DigestItem_PreRuntime {
    __kind: 'PreRuntime'
    value: [Uint8Array, Uint8Array]
}

export interface DigestItem_ChangesTrieSignal {
    __kind: 'ChangesTrieSignal'
    value: ChangesTrieSignal
}

export interface DigestItem_RuntimeEnvironmentUpdated {
    __kind: 'RuntimeEnvironmentUpdated'
}

export type Event = Event_System | Event_Sudo | Event_Scheduler | Event_Indices | Event_Balances | Event_Currencies | Event_Tokens | Event_Authority | Event_EvmAccounts | Event_EVM | Event_Grandpa | Event_Staking | Event_Session | Event_Offences | Event_ImOnline | Event_Identity | Event_TechCouncil | Event_Poc

export interface Event_System {
    __kind: 'System'
    value: SystemEvent
}

export interface Event_Sudo {
    __kind: 'Sudo'
    value: SudoEvent
}

export interface Event_Scheduler {
    __kind: 'Scheduler'
    value: SchedulerEvent
}

export interface Event_Indices {
    __kind: 'Indices'
    value: IndicesEvent
}

export interface Event_Balances {
    __kind: 'Balances'
    value: BalancesEvent
}

export interface Event_Currencies {
    __kind: 'Currencies'
    value: CurrenciesEvent
}

export interface Event_Tokens {
    __kind: 'Tokens'
    value: TokensEvent
}

export interface Event_Authority {
    __kind: 'Authority'
    value: AuthorityEvent
}

export interface Event_EvmAccounts {
    __kind: 'EvmAccounts'
    value: EvmAccountsEvent
}

export interface Event_EVM {
    __kind: 'EVM'
    value: EVMEvent
}

export interface Event_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaEvent
}

export interface Event_Staking {
    __kind: 'Staking'
    value: StakingEvent
}

export interface Event_Session {
    __kind: 'Session'
    value: SessionEvent
}

export interface Event_Offences {
    __kind: 'Offences'
    value: OffencesEvent
}

export interface Event_ImOnline {
    __kind: 'ImOnline'
    value: ImOnlineEvent
}

export interface Event_Identity {
    __kind: 'Identity'
    value: IdentityEvent
}

export interface Event_TechCouncil {
    __kind: 'TechCouncil'
    value: TechCouncilEvent
}

export interface Event_Poc {
    __kind: 'Poc'
    value: PocEvent
}

export type TokenSymbol = TokenSymbol_REEF | TokenSymbol_RUSD

export interface TokenSymbol_REEF {
    __kind: 'REEF'
}

export interface TokenSymbol_RUSD {
    __kind: 'RUSD'
}

export type AllowedSlots = AllowedSlots_PrimarySlots | AllowedSlots_PrimaryAndSecondaryPlainSlots | AllowedSlots_PrimaryAndSecondaryVRFSlots

export interface AllowedSlots_PrimarySlots {
    __kind: 'PrimarySlots'
}

export interface AllowedSlots_PrimaryAndSecondaryPlainSlots {
    __kind: 'PrimaryAndSecondaryPlainSlots'
}

export interface AllowedSlots_PrimaryAndSecondaryVRFSlots {
    __kind: 'PrimaryAndSecondaryVRFSlots'
}

export interface ChangesTrieConfiguration {
    digestInterval: number
    digestLevels: number
}

export type LookupSource = LookupSource_Id | LookupSource_Index | LookupSource_Raw | LookupSource_Address32 | LookupSource_Address20

export interface LookupSource_Id {
    __kind: 'Id'
    value: Uint8Array
}

export interface LookupSource_Index {
    __kind: 'Index'
    value: number
}

export interface LookupSource_Raw {
    __kind: 'Raw'
    value: Uint8Array
}

export interface LookupSource_Address32 {
    __kind: 'Address32'
    value: Uint8Array
}

export interface LookupSource_Address20 {
    __kind: 'Address20'
    value: Uint8Array
}

export type CurrencyIdOf = CurrencyIdOf_Token | CurrencyIdOf_DEXShare | CurrencyIdOf_ERC20

export interface CurrencyIdOf_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export interface CurrencyIdOf_DEXShare {
    __kind: 'DEXShare'
    value: [TokenSymbol, TokenSymbol]
}

export interface CurrencyIdOf_ERC20 {
    __kind: 'ERC20'
    value: Uint8Array
}

export type AsOriginId = AsOriginId_Root

export interface AsOriginId_Root {
    __kind: 'Root'
}

export type CallOf = CallOf_System | CallOf_RandomnessCollectiveFlip | CallOf_Timestamp | CallOf_Sudo | CallOf_Scheduler | CallOf_Indices | CallOf_Balances | CallOf_Currencies | CallOf_TransactionPayment | CallOf_Authority | CallOf_EvmAccounts | CallOf_EVM | CallOf_Authorship | CallOf_Babe | CallOf_Grandpa | CallOf_Staking | CallOf_Session | CallOf_Offences | CallOf_ImOnline | CallOf_AuthorityDiscovery | CallOf_Identity | CallOf_TechCouncil | CallOf_Poc

export interface CallOf_System {
    __kind: 'System'
    value: SystemCall
}

export interface CallOf_RandomnessCollectiveFlip {
    __kind: 'RandomnessCollectiveFlip'
    value: RandomnessCollectiveFlipCall
}

export interface CallOf_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface CallOf_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface CallOf_Scheduler {
    __kind: 'Scheduler'
    value: SchedulerCall
}

export interface CallOf_Indices {
    __kind: 'Indices'
    value: IndicesCall
}

export interface CallOf_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface CallOf_Currencies {
    __kind: 'Currencies'
    value: CurrenciesCall
}

export interface CallOf_TransactionPayment {
    __kind: 'TransactionPayment'
    value: TransactionPaymentCall
}

export interface CallOf_Authority {
    __kind: 'Authority'
    value: AuthorityCall
}

export interface CallOf_EvmAccounts {
    __kind: 'EvmAccounts'
    value: EvmAccountsCall
}

export interface CallOf_EVM {
    __kind: 'EVM'
    value: EVMCall
}

export interface CallOf_Authorship {
    __kind: 'Authorship'
    value: AuthorshipCall
}

export interface CallOf_Babe {
    __kind: 'Babe'
    value: BabeCall
}

export interface CallOf_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaCall
}

export interface CallOf_Staking {
    __kind: 'Staking'
    value: StakingCall
}

export interface CallOf_Session {
    __kind: 'Session'
    value: SessionCall
}

export interface CallOf_Offences {
    __kind: 'Offences'
    value: OffencesCall
}

export interface CallOf_ImOnline {
    __kind: 'ImOnline'
    value: ImOnlineCall
}

export interface CallOf_AuthorityDiscovery {
    __kind: 'AuthorityDiscovery'
    value: AuthorityDiscoveryCall
}

export interface CallOf_Identity {
    __kind: 'Identity'
    value: IdentityCall
}

export interface CallOf_TechCouncil {
    __kind: 'TechCouncil'
    value: TechCouncilCall
}

export interface CallOf_Poc {
    __kind: 'Poc'
    value: PocCall
}

export type DispatchTime = DispatchTime_At | DispatchTime_After

export interface DispatchTime_At {
    __kind: 'At'
    value: number
}

export interface DispatchTime_After {
    __kind: 'After'
    value: number
}

export interface Header {
    parentHash: Uint8Array
    number: number
    stateRoot: Uint8Array
    extrinsicsRoot: Uint8Array
    digest: Digest
}

export interface BabeEquivocationProof {
    offender: Uint8Array
    slotNumber: bigint
    firstHeader: Header
    secondHeader: Header
}

export interface KeyOwnerProof {
    session: number
    trieNodes: Uint8Array[]
    validatorCount: number
}

export interface GrandpaEquivocationProof {
    setId: bigint
    equivocation: GrandpaEquivocation
}

export interface CompactAssignments {
    votes1: [number, number][]
    votes2: [number, [number, number], number][]
    votes3: [number, [number, number][], number][]
    votes4: [number, [number, number][], number][]
    votes5: [number, [number, number][], number][]
    votes6: [number, [number, number][], number][]
    votes7: [number, [number, number][], number][]
    votes8: [number, [number, number][], number][]
    votes9: [number, [number, number][], number][]
    votes10: [number, [number, number][], number][]
    votes11: [number, [number, number][], number][]
    votes12: [number, [number, number][], number][]
    votes13: [number, [number, number][], number][]
    votes14: [number, [number, number][], number][]
    votes15: [number, [number, number][], number][]
    votes16: [number, [number, number][], number][]
}

export interface ElectionSize {
    validators: number
    nominators: number
}

export interface Heartbeat {
    blockNumber: number
    networkState: OpaqueNetworkState
    sessionIndex: number
    authorityIndex: number
    validatorsLen: number
}

export type SystemOrigin = SystemOrigin_Root | SystemOrigin_Signed | SystemOrigin_None

export interface SystemOrigin_Root {
    __kind: 'Root'
}

export interface SystemOrigin_Signed {
    __kind: 'Signed'
    value: Uint8Array
}

export interface SystemOrigin_None {
    __kind: 'None'
}

export interface DelayedOrigin {
    delay: number
    origin: PalletsOrigin
}

export type ChangesTrieSignal = ChangesTrieSignal_NewConfiguration

export interface ChangesTrieSignal_NewConfiguration {
    __kind: 'NewConfiguration'
    value: (ChangesTrieConfiguration | undefined)
}

export type SystemEvent = SystemEvent_ExtrinsicSuccess | SystemEvent_ExtrinsicFailed | SystemEvent_CodeUpdated | SystemEvent_NewAccount | SystemEvent_KilledAccount

/**
 *  An extrinsic completed successfully. \[info\]
 */
export interface SystemEvent_ExtrinsicSuccess {
    __kind: 'ExtrinsicSuccess'
    value: DispatchInfo
}

/**
 *  An extrinsic failed. \[error, info\]
 */
export interface SystemEvent_ExtrinsicFailed {
    __kind: 'ExtrinsicFailed'
    value: [DispatchError, DispatchInfo]
}

/**
 *  `:code` was updated.
 */
export interface SystemEvent_CodeUpdated {
    __kind: 'CodeUpdated'
}

/**
 *  A new \[account\] was created.
 */
export interface SystemEvent_NewAccount {
    __kind: 'NewAccount'
    value: Uint8Array
}

/**
 *  An \[account\] was reaped.
 */
export interface SystemEvent_KilledAccount {
    __kind: 'KilledAccount'
    value: Uint8Array
}

export type SudoEvent = SudoEvent_Sudid | SudoEvent_KeyChanged | SudoEvent_SudoAsDone

/**
 *  A sudo just took place. \[result\]
 */
export interface SudoEvent_Sudid {
    __kind: 'Sudid'
    value: DispatchResult
}

/**
 *  The \[sudoer\] just switched identity; the old key is supplied.
 */
export interface SudoEvent_KeyChanged {
    __kind: 'KeyChanged'
    value: Uint8Array
}

/**
 *  A sudo just took place. \[result\]
 */
export interface SudoEvent_SudoAsDone {
    __kind: 'SudoAsDone'
    value: DispatchResult
}

export type SchedulerEvent = SchedulerEvent_Scheduled | SchedulerEvent_Canceled | SchedulerEvent_Dispatched

/**
 *  Scheduled some task. \[when, index\]
 */
export interface SchedulerEvent_Scheduled {
    __kind: 'Scheduled'
    value: [number, number]
}

/**
 *  Canceled some task. \[when, index\]
 */
export interface SchedulerEvent_Canceled {
    __kind: 'Canceled'
    value: [number, number]
}

/**
 *  Dispatched some task. \[task, id, result\]
 */
export interface SchedulerEvent_Dispatched {
    __kind: 'Dispatched'
    value: [[number, number], (Uint8Array | undefined), DispatchResult]
}

export type IndicesEvent = IndicesEvent_IndexAssigned | IndicesEvent_IndexFreed | IndicesEvent_IndexFrozen

/**
 *  A account index was assigned. \[index, who\]
 */
export interface IndicesEvent_IndexAssigned {
    __kind: 'IndexAssigned'
    value: [Uint8Array, number]
}

/**
 *  A account index has been freed up (unassigned). \[index\]
 */
export interface IndicesEvent_IndexFreed {
    __kind: 'IndexFreed'
    value: number
}

/**
 *  A account index has been frozen to its current account ID. \[index, who\]
 */
export interface IndicesEvent_IndexFrozen {
    __kind: 'IndexFrozen'
    value: [number, Uint8Array]
}

export type BalancesEvent = BalancesEvent_Endowed | BalancesEvent_DustLost | BalancesEvent_Transfer | BalancesEvent_BalanceSet | BalancesEvent_Deposit | BalancesEvent_Reserved | BalancesEvent_Unreserved | BalancesEvent_ReserveRepatriated

/**
 *  An account was created with some free balance. \[account, free_balance\]
 */
export interface BalancesEvent_Endowed {
    __kind: 'Endowed'
    value: [Uint8Array, bigint]
}

/**
 *  An account was removed whose balance was non-zero but below ExistentialDeposit,
 *  resulting in an outright loss. \[account, balance\]
 */
export interface BalancesEvent_DustLost {
    __kind: 'DustLost'
    value: [Uint8Array, bigint]
}

/**
 *  Transfer succeeded. \[from, to, value\]
 */
export interface BalancesEvent_Transfer {
    __kind: 'Transfer'
    value: [Uint8Array, Uint8Array, bigint]
}

/**
 *  A balance was set by root. \[who, free, reserved\]
 */
export interface BalancesEvent_BalanceSet {
    __kind: 'BalanceSet'
    value: [Uint8Array, bigint, bigint]
}

/**
 *  Some amount was deposited (e.g. for transaction fees). \[who, deposit\]
 */
export interface BalancesEvent_Deposit {
    __kind: 'Deposit'
    value: [Uint8Array, bigint]
}

/**
 *  Some balance was reserved (moved from free to reserved). \[who, value\]
 */
export interface BalancesEvent_Reserved {
    __kind: 'Reserved'
    value: [Uint8Array, bigint]
}

/**
 *  Some balance was unreserved (moved from reserved to free). \[who, value\]
 */
export interface BalancesEvent_Unreserved {
    __kind: 'Unreserved'
    value: [Uint8Array, bigint]
}

/**
 *  Some balance was moved from the reserve of the first account to the second account.
 *  Final argument indicates the destination balance type.
 *  \[from, to, balance, destination_status\]
 */
export interface BalancesEvent_ReserveRepatriated {
    __kind: 'ReserveRepatriated'
    value: [Uint8Array, Uint8Array, bigint, BalanceStatus]
}

export type CurrenciesEvent = CurrenciesEvent_Transferred | CurrenciesEvent_BalanceUpdated | CurrenciesEvent_Deposited | CurrenciesEvent_Withdrawn

/**
 *  Currency transfer success. [currency_id, from, to, amount]
 */
export interface CurrenciesEvent_Transferred {
    __kind: 'Transferred'
    value: [CurrencyIdOf, Uint8Array, Uint8Array, bigint]
}

/**
 *  Update balance success. [currency_id, who, amount]
 */
export interface CurrenciesEvent_BalanceUpdated {
    __kind: 'BalanceUpdated'
    value: [CurrencyIdOf, Uint8Array, bigint]
}

/**
 *  Deposit success. [currency_id, who, amount]
 */
export interface CurrenciesEvent_Deposited {
    __kind: 'Deposited'
    value: [CurrencyIdOf, Uint8Array, bigint]
}

/**
 *  Withdraw success. [currency_id, who, amount]
 */
export interface CurrenciesEvent_Withdrawn {
    __kind: 'Withdrawn'
    value: [CurrencyIdOf, Uint8Array, bigint]
}

export type TokensEvent = TokensEvent_Transferred | TokensEvent_DustLost

/**
 *  Token transfer success. \[currency_id, from, to, amount\]
 */
export interface TokensEvent_Transferred {
    __kind: 'Transferred'
    value: [CurrencyId, Uint8Array, Uint8Array, bigint]
}

/**
 *  An account was removed whose balance was non-zero but below
 *  ExistentialDeposit, resulting in an outright loss. \[account,
 *  currency_id, amount\]
 */
export interface TokensEvent_DustLost {
    __kind: 'DustLost'
    value: [Uint8Array, CurrencyId, bigint]
}

export type AuthorityEvent = AuthorityEvent_Dispatched | AuthorityEvent_Scheduled | AuthorityEvent_FastTracked | AuthorityEvent_Delayed | AuthorityEvent_Cancelled

/**
 *  A call is dispatched. [result]
 */
export interface AuthorityEvent_Dispatched {
    __kind: 'Dispatched'
    value: DispatchResult
}

/**
 *  A call is scheduled. [origin, index]
 */
export interface AuthorityEvent_Scheduled {
    __kind: 'Scheduled'
    value: [PalletsOrigin, number]
}

/**
 *  A scheduled call is fast tracked. [origin, index, when]
 */
export interface AuthorityEvent_FastTracked {
    __kind: 'FastTracked'
    value: [PalletsOrigin, number, number]
}

/**
 *  A scheduled call is delayed. [origin, index, when]
 */
export interface AuthorityEvent_Delayed {
    __kind: 'Delayed'
    value: [PalletsOrigin, number, number]
}

/**
 *  A scheduled call is cancelled. [origin, index]
 */
export interface AuthorityEvent_Cancelled {
    __kind: 'Cancelled'
    value: [PalletsOrigin, number]
}

export type EvmAccountsEvent = EvmAccountsEvent_ClaimAccount

/**
 *  Mapping between Substrate accounts and EVM accounts
 *  claim account. \[account_id, evm_address\]
 */
export interface EvmAccountsEvent_ClaimAccount {
    __kind: 'ClaimAccount'
    value: [Uint8Array, Uint8Array]
}

export type EVMEvent = EVMEvent_Log | EVMEvent_Created | EVMEvent_CreatedFailed | EVMEvent_Executed | EVMEvent_ExecutedFailed | EVMEvent_BalanceDeposit | EVMEvent_BalanceWithdraw | EVMEvent_AddStorageQuota | EVMEvent_RemoveStorageQuota | EVMEvent_TransferredMaintainer | EVMEvent_CanceledTransferMaintainer | EVMEvent_ConfirmedTransferMaintainer | EVMEvent_RejectedTransferMaintainer | EVMEvent_ContractDevelopmentEnabled | EVMEvent_ContractDevelopmentDisabled | EVMEvent_ContractDeployed | EVMEvent_ContractSetCode | EVMEvent_ContractSelfdestructed

/**
 *  Ethereum events from contracts.
 */
export interface EVMEvent_Log {
    __kind: 'Log'
    value: EvmLog
}

/**
 *  A contract has been created at given \[address\].
 */
export interface EVMEvent_Created {
    __kind: 'Created'
    value: Uint8Array
}

/**
 *  A contract was attempted to be created, but the execution failed.
 *  \[contract, exit_reason, output\]
 */
export interface EVMEvent_CreatedFailed {
    __kind: 'CreatedFailed'
    value: [Uint8Array, ExitReason, Uint8Array]
}

/**
 *  A \[contract\] has been executed successfully with states applied.
 */
export interface EVMEvent_Executed {
    __kind: 'Executed'
    value: Uint8Array
}

/**
 *  A contract has been executed with errors. States are reverted with
 *  only gas fees applied. \[contract, exit_reason, output\]
 */
export interface EVMEvent_ExecutedFailed {
    __kind: 'ExecutedFailed'
    value: [Uint8Array, ExitReason, Uint8Array]
}

/**
 *  A deposit has been made at a given address. \[sender, address,
 *  value\]
 */
export interface EVMEvent_BalanceDeposit {
    __kind: 'BalanceDeposit'
    value: [Uint8Array, Uint8Array, bigint]
}

/**
 *  A withdrawal has been made from a given address. \[sender, address,
 *  value\]
 */
export interface EVMEvent_BalanceWithdraw {
    __kind: 'BalanceWithdraw'
    value: [Uint8Array, Uint8Array, bigint]
}

/**
 *  A quota has been added at a given address. \[address, bytes\]
 */
export interface EVMEvent_AddStorageQuota {
    __kind: 'AddStorageQuota'
    value: [Uint8Array, number]
}

/**
 *  A quota has been removed at a given address. \[address, bytes\]
 */
export interface EVMEvent_RemoveStorageQuota {
    __kind: 'RemoveStorageQuota'
    value: [Uint8Array, number]
}

/**
 *  Transferred maintainer. \[contract, address\]
 */
export interface EVMEvent_TransferredMaintainer {
    __kind: 'TransferredMaintainer'
    value: [Uint8Array, Uint8Array]
}

/**
 *  Canceled the transfer maintainer. \[contract, address\]
 */
export interface EVMEvent_CanceledTransferMaintainer {
    __kind: 'CanceledTransferMaintainer'
    value: [Uint8Array, Uint8Array]
}

/**
 *  Confirmed the transfer maintainer. \[contract, address\]
 */
export interface EVMEvent_ConfirmedTransferMaintainer {
    __kind: 'ConfirmedTransferMaintainer'
    value: [Uint8Array, Uint8Array]
}

/**
 *  Rejected the transfer maintainer. \[contract, address\]
 */
export interface EVMEvent_RejectedTransferMaintainer {
    __kind: 'RejectedTransferMaintainer'
    value: [Uint8Array, Uint8Array]
}

/**
 *  Enabled contract development. \[who\]
 */
export interface EVMEvent_ContractDevelopmentEnabled {
    __kind: 'ContractDevelopmentEnabled'
    value: Uint8Array
}

/**
 *  Disabled contract development. \[who\]
 */
export interface EVMEvent_ContractDevelopmentDisabled {
    __kind: 'ContractDevelopmentDisabled'
    value: Uint8Array
}

/**
 *  Deployed contract. \[contract\]
 */
export interface EVMEvent_ContractDeployed {
    __kind: 'ContractDeployed'
    value: Uint8Array
}

/**
 *  Set contract code. \[contract\]
 */
export interface EVMEvent_ContractSetCode {
    __kind: 'ContractSetCode'
    value: Uint8Array
}

/**
 *  Selfdestructed contract code. \[contract\]
 */
export interface EVMEvent_ContractSelfdestructed {
    __kind: 'ContractSelfdestructed'
    value: Uint8Array
}

export type GrandpaEvent = GrandpaEvent_NewAuthorities | GrandpaEvent_Paused | GrandpaEvent_Resumed

/**
 *  New authority set has been applied. \[authority_set\]
 */
export interface GrandpaEvent_NewAuthorities {
    __kind: 'NewAuthorities'
    value: [Uint8Array, bigint][]
}

/**
 *  Current authority set has been paused.
 */
export interface GrandpaEvent_Paused {
    __kind: 'Paused'
}

/**
 *  Current authority set has been resumed.
 */
export interface GrandpaEvent_Resumed {
    __kind: 'Resumed'
}

export type StakingEvent = StakingEvent_EraPayout | StakingEvent_Reward | StakingEvent_Slash | StakingEvent_OldSlashingReportDiscarded | StakingEvent_StakingElection | StakingEvent_SolutionStored | StakingEvent_Bonded | StakingEvent_Unbonded | StakingEvent_Withdrawn | StakingEvent_Kicked

/**
 *  The era payout has been set; the first balance is the validator-payout; the second is
 *  the remainder from the maximum amount of reward.
 *  \[era_index, validator_payout, remainder\]
 */
export interface StakingEvent_EraPayout {
    __kind: 'EraPayout'
    value: [number, bigint, bigint]
}

/**
 *  The staker has been rewarded by this amount. \[stash, amount\]
 */
export interface StakingEvent_Reward {
    __kind: 'Reward'
    value: [Uint8Array, bigint]
}

/**
 *  One validator (and its nominators) has been slashed by the given amount.
 *  \[validator, amount\]
 */
export interface StakingEvent_Slash {
    __kind: 'Slash'
    value: [Uint8Array, bigint]
}

/**
 *  An old slashing report from a prior era was discarded because it could
 *  not be processed. \[session_index\]
 */
export interface StakingEvent_OldSlashingReportDiscarded {
    __kind: 'OldSlashingReportDiscarded'
    value: number
}

/**
 *  A new set of stakers was elected with the given \[compute\].
 */
export interface StakingEvent_StakingElection {
    __kind: 'StakingElection'
    value: ElectionCompute
}

/**
 *  A new solution for the upcoming election has been stored. \[compute\]
 */
export interface StakingEvent_SolutionStored {
    __kind: 'SolutionStored'
    value: ElectionCompute
}

/**
 *  An account has bonded this amount. \[stash, amount\]
 * 
 *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
 *  it will not be emitted for staking rewards when they are added to stake.
 */
export interface StakingEvent_Bonded {
    __kind: 'Bonded'
    value: [Uint8Array, bigint]
}

/**
 *  An account has unbonded this amount. \[stash, amount\]
 */
export interface StakingEvent_Unbonded {
    __kind: 'Unbonded'
    value: [Uint8Array, bigint]
}

/**
 *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
 *  from the unlocking queue. \[stash, amount\]
 */
export interface StakingEvent_Withdrawn {
    __kind: 'Withdrawn'
    value: [Uint8Array, bigint]
}

/**
 *  A nominator has been kicked from a validator. \[nominator, stash\]
 */
export interface StakingEvent_Kicked {
    __kind: 'Kicked'
    value: [Uint8Array, Uint8Array]
}

export type SessionEvent = SessionEvent_NewSession

/**
 *  New session has happened. Note that the argument is the \[session_index\], not the block
 *  number as the type might suggest.
 */
export interface SessionEvent_NewSession {
    __kind: 'NewSession'
    value: number
}

export type OffencesEvent = OffencesEvent_Offence

/**
 *  There is an offence reported of the given `kind` happened at the `session_index` and
 *  (kind-specific) time slot. This event is not deposited for duplicate slashes. last
 *  element indicates of the offence was applied (true) or queued (false)
 *  \[kind, timeslot, applied\].
 */
export interface OffencesEvent_Offence {
    __kind: 'Offence'
    value: [Uint8Array, Uint8Array, boolean]
}

export type ImOnlineEvent = ImOnlineEvent_HeartbeatReceived | ImOnlineEvent_AllGood | ImOnlineEvent_SomeOffline

/**
 *  A new heartbeat was received from `AuthorityId` \[authority_id\]
 */
export interface ImOnlineEvent_HeartbeatReceived {
    __kind: 'HeartbeatReceived'
    value: Uint8Array
}

/**
 *  At the end of the session, no offence was committed.
 */
export interface ImOnlineEvent_AllGood {
    __kind: 'AllGood'
}

/**
 *  At the end of the session, at least one validator was found to be \[offline\].
 */
export interface ImOnlineEvent_SomeOffline {
    __kind: 'SomeOffline'
    value: [Uint8Array, FullIdentification][]
}

export type IdentityEvent = IdentityEvent_IdentitySet | IdentityEvent_IdentityCleared | IdentityEvent_IdentityKilled | IdentityEvent_JudgementRequested | IdentityEvent_JudgementUnrequested | IdentityEvent_JudgementGiven | IdentityEvent_RegistrarAdded | IdentityEvent_SubIdentityAdded | IdentityEvent_SubIdentityRemoved | IdentityEvent_SubIdentityRevoked

/**
 *  A name was set or reset (which will remove all judgements). \[who\]
 */
export interface IdentityEvent_IdentitySet {
    __kind: 'IdentitySet'
    value: Uint8Array
}

/**
 *  A name was cleared, and the given balance returned. \[who, deposit\]
 */
export interface IdentityEvent_IdentityCleared {
    __kind: 'IdentityCleared'
    value: [Uint8Array, bigint]
}

/**
 *  A name was removed and the given balance slashed. \[who, deposit\]
 */
export interface IdentityEvent_IdentityKilled {
    __kind: 'IdentityKilled'
    value: [Uint8Array, bigint]
}

/**
 *  A judgement was asked from a registrar. \[who, registrar_index\]
 */
export interface IdentityEvent_JudgementRequested {
    __kind: 'JudgementRequested'
    value: [Uint8Array, number]
}

/**
 *  A judgement request was retracted. \[who, registrar_index\]
 */
export interface IdentityEvent_JudgementUnrequested {
    __kind: 'JudgementUnrequested'
    value: [Uint8Array, number]
}

/**
 *  A judgement was given by a registrar. \[target, registrar_index\]
 */
export interface IdentityEvent_JudgementGiven {
    __kind: 'JudgementGiven'
    value: [Uint8Array, number]
}

/**
 *  A registrar was added. \[registrar_index\]
 */
export interface IdentityEvent_RegistrarAdded {
    __kind: 'RegistrarAdded'
    value: number
}

/**
 *  A sub-identity was added to an identity and the deposit paid. \[sub, main, deposit\]
 */
export interface IdentityEvent_SubIdentityAdded {
    __kind: 'SubIdentityAdded'
    value: [Uint8Array, Uint8Array, bigint]
}

/**
 *  A sub-identity was removed from an identity and the deposit freed.
 *  \[sub, main, deposit\]
 */
export interface IdentityEvent_SubIdentityRemoved {
    __kind: 'SubIdentityRemoved'
    value: [Uint8Array, Uint8Array, bigint]
}

/**
 *  A sub-identity was cleared, and the given deposit repatriated from the
 *  main identity account to the sub-identity account. \[sub, main, deposit\]
 */
export interface IdentityEvent_SubIdentityRevoked {
    __kind: 'SubIdentityRevoked'
    value: [Uint8Array, Uint8Array, bigint]
}

export type TechCouncilEvent = TechCouncilEvent_Proposed | TechCouncilEvent_Voted | TechCouncilEvent_Approved | TechCouncilEvent_Disapproved | TechCouncilEvent_Executed | TechCouncilEvent_MemberExecuted | TechCouncilEvent_Closed

/**
 *  A motion (given hash) has been proposed (by given account) with a threshold (given
 *  `MemberCount`).
 *  \[account, proposal_index, proposal_hash, threshold\]
 */
export interface TechCouncilEvent_Proposed {
    __kind: 'Proposed'
    value: [Uint8Array, number, Uint8Array, number]
}

/**
 *  A motion (given hash) has been voted on by given account, leaving
 *  a tally (yes votes and no votes given respectively as `MemberCount`).
 *  \[account, proposal_hash, voted, yes, no\]
 */
export interface TechCouncilEvent_Voted {
    __kind: 'Voted'
    value: [Uint8Array, Uint8Array, boolean, number, number]
}

/**
 *  A motion was approved by the required threshold.
 *  \[proposal_hash\]
 */
export interface TechCouncilEvent_Approved {
    __kind: 'Approved'
    value: Uint8Array
}

/**
 *  A motion was not approved by the required threshold.
 *  \[proposal_hash\]
 */
export interface TechCouncilEvent_Disapproved {
    __kind: 'Disapproved'
    value: Uint8Array
}

/**
 *  A motion was executed; result will be `Ok` if it returned without error.
 *  \[proposal_hash, result\]
 */
export interface TechCouncilEvent_Executed {
    __kind: 'Executed'
    value: [Uint8Array, DispatchResult]
}

/**
 *  A single member did some action; result will be `Ok` if it returned without error.
 *  \[proposal_hash, result\]
 */
export interface TechCouncilEvent_MemberExecuted {
    __kind: 'MemberExecuted'
    value: [Uint8Array, DispatchResult]
}

/**
 *  A proposal was closed because its threshold was reached or after its duration was up.
 *  \[proposal_hash, yes, no\]
 */
export interface TechCouncilEvent_Closed {
    __kind: 'Closed'
    value: [Uint8Array, number, number]
}

export type PocEvent = PocEvent_CandidateAdded | PocEvent_CandidateRemoved | PocEvent_Committed | PocEvent_FundsAdded | PocEvent_UnbondingStarted | PocEvent_BondWithdrawn | PocEvent_Voted | PocEvent_VoterRewarded | PocEvent_Elected

/**
 *  Start candidacy
 */
export interface PocEvent_CandidateAdded {
    __kind: 'CandidateAdded'
    value: Uint8Array
}

/**
 *  Stop candidacy
 */
export interface PocEvent_CandidateRemoved {
    __kind: 'CandidateRemoved'
    value: Uint8Array
}

/**
 *  Created a new committment
 */
export interface PocEvent_Committed {
    __kind: 'Committed'
    value: [Uint8Array, bigint]
}

/**
 *  Add more funds to existing commitment
 */
export interface PocEvent_FundsAdded {
    __kind: 'FundsAdded'
    value: [Uint8Array, bigint]
}

/**
 *  The user has started the unbonding process
 */
export interface PocEvent_UnbondingStarted {
    __kind: 'UnbondingStarted'
    value: [Uint8Array, bigint]
}

/**
 *  Bond has been withdrawn
 */
export interface PocEvent_BondWithdrawn {
    __kind: 'BondWithdrawn'
    value: [Uint8Array, bigint]
}

/**
 *  Voter,Candidate,VotingPower
 */
export interface PocEvent_Voted {
    __kind: 'Voted'
    value: [Uint8Array, Uint8Array, bigint]
}

/**
 *  Voter,Reward
 */
export interface PocEvent_VoterRewarded {
    __kind: 'VoterRewarded'
    value: [number, Uint8Array, bigint]
}

/**
 *  Era, Winner,Weight
 */
export interface PocEvent_Elected {
    __kind: 'Elected'
    value: [number, Uint8Array, bigint]
}

export interface Digest {
    logs: DigestItem[]
}

export type GrandpaEquivocation = GrandpaEquivocation_Prevote | GrandpaEquivocation_Precommit

export interface GrandpaEquivocation_Prevote {
    __kind: 'Prevote'
    value: GrandpaEquivocationValue
}

export interface GrandpaEquivocation_Precommit {
    __kind: 'Precommit'
    value: GrandpaEquivocationValue
}

export interface OpaqueNetworkState {
    peerId: Uint8Array
    externalAddresses: Uint8Array[]
}

export interface DispatchInfo {
    weight: bigint
    class: DispatchClass
    paysFee: Pays
}

export type DispatchError = DispatchError_Other | DispatchError_CannotLookup | DispatchError_BadOrigin | DispatchError_Module | DispatchError_ConsumerRemaining | DispatchError_NoProviders | DispatchError_Token | DispatchError_Arithmetic

export interface DispatchError_Other {
    __kind: 'Other'
}

export interface DispatchError_CannotLookup {
    __kind: 'CannotLookup'
}

export interface DispatchError_BadOrigin {
    __kind: 'BadOrigin'
}

export interface DispatchError_Module {
    __kind: 'Module'
    value: DispatchErrorModule
}

export interface DispatchError_ConsumerRemaining {
    __kind: 'ConsumerRemaining'
}

export interface DispatchError_NoProviders {
    __kind: 'NoProviders'
}

export interface DispatchError_Token {
    __kind: 'Token'
    value: TokenError
}

export interface DispatchError_Arithmetic {
    __kind: 'Arithmetic'
    value: ArithmeticError
}

export type DispatchResult = DispatchResult_Ok | DispatchResult_Err

export interface DispatchResult_Ok {
    __kind: 'Ok'
}

export interface DispatchResult_Err {
    __kind: 'Err'
    value: DispatchError
}

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
    __kind: 'Free'
}

export interface BalanceStatus_Reserved {
    __kind: 'Reserved'
}

export interface EvmLog {
    address: Uint8Array
    topics: Uint8Array[]
    data: Uint8Array
}

export type ExitReason = ExitReason_Succeed | ExitReason_Error | ExitReason_Revert | ExitReason_Fatal

export interface ExitReason_Succeed {
    __kind: 'Succeed'
    value: ExitSucceed
}

export interface ExitReason_Error {
    __kind: 'Error'
    value: ExitError
}

export interface ExitReason_Revert {
    __kind: 'Revert'
    value: ExitRevert
}

export interface ExitReason_Fatal {
    __kind: 'Fatal'
    value: ExitFatal
}

export interface GrandpaEquivocationValue {
    roundNumber: bigint
    identity: Uint8Array
    first: [GrandpaPrevote, Uint8Array]
    second: [GrandpaPrevote, Uint8Array]
}

export type DispatchClass = DispatchClass_Normal | DispatchClass_Operational | DispatchClass_Mandatory

export interface DispatchClass_Normal {
    __kind: 'Normal'
}

export interface DispatchClass_Operational {
    __kind: 'Operational'
}

export interface DispatchClass_Mandatory {
    __kind: 'Mandatory'
}

export type Pays = Pays_Yes | Pays_No

export interface Pays_Yes {
    __kind: 'Yes'
}

export interface Pays_No {
    __kind: 'No'
}

export interface DispatchErrorModule {
    index: number
    error: number
}

export type TokenError = TokenError_NoFunds | TokenError_WouldDie | TokenError_BelowMinimum | TokenError_CannotCreate | TokenError_UnknownAsset | TokenError_Frozen | TokenError_Underflow | TokenError_Overflow

export interface TokenError_NoFunds {
    __kind: 'NoFunds'
}

export interface TokenError_WouldDie {
    __kind: 'WouldDie'
}

export interface TokenError_BelowMinimum {
    __kind: 'BelowMinimum'
}

export interface TokenError_CannotCreate {
    __kind: 'CannotCreate'
}

export interface TokenError_UnknownAsset {
    __kind: 'UnknownAsset'
}

export interface TokenError_Frozen {
    __kind: 'Frozen'
}

export interface TokenError_Underflow {
    __kind: 'Underflow'
}

export interface TokenError_Overflow {
    __kind: 'Overflow'
}

export type ArithmeticError = ArithmeticError_Underflow | ArithmeticError_Overflow | ArithmeticError_DivisionByZero

export interface ArithmeticError_Underflow {
    __kind: 'Underflow'
}

export interface ArithmeticError_Overflow {
    __kind: 'Overflow'
}

export interface ArithmeticError_DivisionByZero {
    __kind: 'DivisionByZero'
}

export type ExitSucceed = ExitSucceed_Stopped | ExitSucceed_Returned | ExitSucceed_Suicided

export interface ExitSucceed_Stopped {
    __kind: 'Stopped'
}

export interface ExitSucceed_Returned {
    __kind: 'Returned'
}

export interface ExitSucceed_Suicided {
    __kind: 'Suicided'
}

export type ExitError = ExitError_StackUnderflow | ExitError_StackOverflow | ExitError_InvalidJump | ExitError_InvalidRange | ExitError_DesignatedInvalid | ExitError_CallTooDeep | ExitError_CreateCollision | ExitError_CreateContractLimit | ExitError_OutOfOffset | ExitError_OutOfGas | ExitError_OutOfFund | ExitError_PCUnderflow | ExitError_CreateEmpty | ExitError_Other

export interface ExitError_StackUnderflow {
    __kind: 'StackUnderflow'
}

export interface ExitError_StackOverflow {
    __kind: 'StackOverflow'
}

export interface ExitError_InvalidJump {
    __kind: 'InvalidJump'
}

export interface ExitError_InvalidRange {
    __kind: 'InvalidRange'
}

export interface ExitError_DesignatedInvalid {
    __kind: 'DesignatedInvalid'
}

export interface ExitError_CallTooDeep {
    __kind: 'CallTooDeep'
}

export interface ExitError_CreateCollision {
    __kind: 'CreateCollision'
}

export interface ExitError_CreateContractLimit {
    __kind: 'CreateContractLimit'
}

export interface ExitError_OutOfOffset {
    __kind: 'OutOfOffset'
}

export interface ExitError_OutOfGas {
    __kind: 'OutOfGas'
}

export interface ExitError_OutOfFund {
    __kind: 'OutOfFund'
}

export interface ExitError_PCUnderflow {
    __kind: 'PCUnderflow'
}

export interface ExitError_CreateEmpty {
    __kind: 'CreateEmpty'
}

export interface ExitError_Other {
    __kind: 'Other'
    value: string
}

export type ExitRevert = ExitRevert_Reverted

export interface ExitRevert_Reverted {
    __kind: 'Reverted'
}

export type ExitFatal = ExitFatal_NotSupported | ExitFatal_UnhandledInterrupt | ExitFatal_CallErrorAsFatal | ExitFatal_Other

export interface ExitFatal_NotSupported {
    __kind: 'NotSupported'
}

export interface ExitFatal_UnhandledInterrupt {
    __kind: 'UnhandledInterrupt'
}

export interface ExitFatal_CallErrorAsFatal {
    __kind: 'CallErrorAsFatal'
    value: ExitError
}

export interface ExitFatal_Other {
    __kind: 'Other'
    value: string
}

export interface GrandpaPrevote {
    targetHash: Uint8Array
    targetNumber: number
}
