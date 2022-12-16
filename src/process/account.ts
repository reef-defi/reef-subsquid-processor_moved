// import { SubstrateBlock } from "@subsquid/substrate-processor";
// import { Store } from "@subsquid/typeorm-store";
// import { AccountData, EventData, EventRaw } from "../interfaces/interfaces";
// import { Account, Block, Event, Extrinsic } from "../model";
// import { provider } from "../processor";
// import { DeriveBalancesAll, DeriveAccountRegistration } from "@polkadot/api-derive/types";
// import { toChecksumAddress } from "../util";

// export const processAccount = async (address: string, blockHeader: SubstrateBlock, active = true): Promise<AccountData> => {
//     const [evmAddress, balances, identity] = await Promise.all([
//         getEvmAddress(address),
//         getBalances(address),
//         getIdentity(address),
//     ]);
//     const evmNonce = await getEvmNonce(evmAddress);

//     const accountData = {
//         id: address,
//         evmAddress: evmAddress,
//         blockId: blockHeader.id,
//         identity: JSON.stringify(identity),
//         active: active,
//         freeBalance: BigInt(balances.freeBalance.toString()),
//         lockedBalance: BigInt(balances.lockedBalance.toString()),
//         availableBalance: BigInt(balances.availableBalance.toString()),
//         reservedBalance: BigInt(balances.reservedBalance.toString()),
//         vestedBalance: BigInt(balances.vestingLocked.toString()),
//         votingBalance: BigInt(balances.votingBalance.toString()),
//         nonce: Number(balances.accountNonce),
//         evmNonce: evmNonce,
//         timestamp: new Date(blockHeader.timestamp),
//         blockHeight: blockHeader.height
//     };

//     return accountData;
// }

// export const saveAccounts = async (accountsData: AccountData[], blocks: Map<string, Block>, store: Store): Promise<Map<string, Account>> => {
//     const accounts: Map<string, Account> = new Map();
//     accountsData.forEach(accountData => {
//         const block = blocks.get(accountData.blockId);
//         if (!block) throw new Error(`Block ${accountData.blockId} not found`); // TODO: handle this error
        
//         accounts.set(accountData.id, new Account ({
//             ...accountData,
//             block: block
//         }));
//     });

//     await store.save([...accounts.values()]);

//     return accounts;
// }

// const getEvmAddress = async (address: string): Promise<string> => {
//     return await provider.api.query.evm.accounts(address)
//         .then((res): any => {
//             const addr = res.toString();
//             const evmAddr = addr !== '' ? toChecksumAddress(addr) : addr;
//             return evmAddr;
//         });
// };

// const getBalances = async (address: string): Promise<DeriveBalancesAll> => {
//     return await provider.api.derive.balances.all(address);
// };

// const getIdentity = async (address: string): Promise<DeriveAccountRegistration> => {
//     return await provider.api.derive.accounts.identity(address);
// };

// const getEvmNonce = async (evmAddress: string): Promise<number> => {
//     if (evmAddress === '') return 0;
//     return await provider.api.query.evm.accounts(evmAddress)
//         .then((res): any => res.toJSON())
//         .then((res) => res?.nonce || 0);
// };