import { SubstrateBlock } from "@subsquid/substrate-processor";
import { BigNumber, ethers } from "ethers";
import { Account, ContractType, TokenHolder } from "../model";
import { ctx } from "../processor";
import { EvmAccountsEvmAddressesStorage, EVMAccountsStorage, IdentityIdentityOfStorage } from "../types/storage";
import { bufferToString, REEF_CONTRACT_ADDRESS } from "../util/util";
import * as erc20 from "../abi/ERC20";
import * as erc721 from "../abi/ERC721";
import * as erc1155 from "../abi/ERC1155";
import * as ss58 from '@subsquid/ss58';
import { getBalancesAccount } from "../util/balances/balances";
import { Not } from "typeorm";

const updateAccounts = async (blockHeader: SubstrateBlock) => {
    // Fetch all accounts in DB
    const accounts = (await ctx.store.find(Account))
        .filter(account => !['0x', 'deleted'].includes(account.id));

    // Get current EVM addresses, native balances and identities
    const addresses = accounts.map((a) => { return ss58.decode(a.id).bytes });
    const [evmAddresses, balances, identities] = await Promise.all([
        getEvmAddresses(blockHeader, addresses),
        getNativeBalances(blockHeader, addresses),
        getIdentities(blockHeader, addresses)
    ]);

    // Update accounts
    accounts.forEach((account, i) => {
        account.evmAddress = evmAddresses ? evmAddresses[i] : '';
        account.identity = identities ? identities[i] : null;
        account.freeBalance = balances ? balances[i].freeBalance : 0n;
        account.lockedBalance = balances ? balances[i].lockedBalance : 0n;
        account.availableBalance = balances ? balances[i].availableBalance : 0n;
        account.reservedBalance = balances ? balances[i].reservedBalance : 0n;
        account.vestedBalance = balances ? balances[i].vestingLocked : 0n;
        account.votingBalance = balances ? balances[i].votingBalance : 0n;
        account.nonce = balances ? balances[i].accountNonce : 0;
    });

    // Get and update EVM nonces
    if (evmAddresses) {
        const evmNonces = await getEvmNonces(blockHeader, evmAddresses);
        if (evmNonces && evmNonces.size > 0) {
            accounts.forEach((account) => {
                if (account.evmAddress && evmNonces.get(account.evmAddress)) {
                    account.evmNonce = evmNonces.get(account.evmAddress)!;
                }
            });
        }
    }

    // Update accounts in DB
    ctx.log.info(`Updating ${accounts.length} accounts`);
    await ctx.store.save(accounts);
    ctx.log.info(`Accounts updated`);
}

const updateTokenHolders = async (blockHeader: SubstrateBlock) => {
    // // Fetch token holders from DB
    const nativeTokenHolders = await ctx.store.find(TokenHolder, {
        where: { token: { id: REEF_CONTRACT_ADDRESS } },
        relations: { token: true, signer: true }
    });
    const erc20TokenHolders = await ctx.store.find(TokenHolder, {
        where: { token: { type: ContractType.ERC20, id: Not(REEF_CONTRACT_ADDRESS) } },
        relations: { token: true, signer: true } 
    });
    const erc721TokenHolders = await ctx.store.find(TokenHolder, {
        where: { token: { type: ContractType.ERC721 } },
        relations: { token: true, signer: true }
    });
    const erc1155TokenHolders = await ctx.store.find(TokenHolder, {
        where: { token: { type: ContractType.ERC1155 } },
        relations: { token: true, signer: true }
    });

    // Update REEF balances
    nativeTokenHolders.forEach((tokenHolder) => {
        tokenHolder.balance = tokenHolder.signer?.freeBalance || 0n;
    });

    // Get current EVM addresses, native balances and identities
    await Promise.all([
        getErc20Balances(blockHeader, erc20TokenHolders),
        getErc721Balances(blockHeader, erc721TokenHolders),
        getErc1155Balances(blockHeader, erc1155TokenHolders)
    ]);

    // Update token holders in DB
    ctx.log.info(`Updating ${nativeTokenHolders.length + erc20TokenHolders.length + 
        erc721TokenHolders.length + erc1155TokenHolders.length} token holders`);
    await ctx.store.save([
        ...nativeTokenHolders,
        ...erc20TokenHolders,
        ...erc721TokenHolders,
        ...erc1155TokenHolders
    ]);
    ctx.log.info(`Token holders updated`);
}

const getEvmAddresses = async(blockHeader: SubstrateBlock, addresses: Uint8Array[]) => {
    const storage = new EvmAccountsEvmAddressesStorage(ctx, blockHeader);

    if (!storage.isExists) return undefined;
    
    if (storage.isV5) {
        const res = await storage.asV5.getMany(addresses);
        return res.map((r) => r ? bufferToString(r as Buffer) : '');
    } else {
        throw new Error("Unknown storage version");
    }
}

const getIdentities = async (blockHeader: SubstrateBlock, addresses: Uint8Array[]) => {
    const storage = new IdentityIdentityOfStorage(ctx, blockHeader);

    if (!storage.isExists) return undefined;
    
    if (storage.isV5) {
        // TODO: format reponses (https://github.com/polkadot-js/api/blob/v6.4.2/packages/api-derive/src/accounts/identity.ts)
        return storage.asV5.getMany(addresses);
    } else {
        throw new Error("Unknown storage version");
    }
}

const getEvmNonces = async (blockHeader: SubstrateBlock, evmAddresses: string[]) => {
   const evmAddressesBytes: Uint8Array[] = evmAddresses
    .filter(evmAddress => evmAddress !== '')
    .map((evmAddress) => { return ethers.utils.arrayify(evmAddress) });

    const storage = new EVMAccountsStorage(ctx, blockHeader);

    if (!storage.isExists) return undefined;

    let accountsInfo = [];    
    if (storage.isV5) {
        accountsInfo = await storage.asV5.getMany(evmAddressesBytes);
    } else {
        throw new Error("Unknown storage version");
    }

    const evmNonces: Map<string, number> = new Map();
    accountsInfo.forEach((accountInfo, index) => {
        evmNonces.set(evmAddresses[index], accountInfo?.nonce || 0);
     });

    return evmNonces;
}

const getNativeBalances = async (blockHeader: SubstrateBlock, addresses: Uint8Array[]) => {
    // TODO: Adapt getBalancesAccount to work with process multiple addresses
    return await Promise.all(
        addresses.map((address) => getBalancesAccount(blockHeader, address))
    );
}

const getErc20Balances = async (blockHeader: SubstrateBlock, tokenHolders: TokenHolder[]) => {
    return await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            new erc20.Contract(ctx, blockHeader, tokenHolder.token.id).balanceOf(ownerAddress)
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

const getErc721Balances = async (blockHeader: SubstrateBlock, tokenHolders: TokenHolder[]) => {
    return await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            new erc721.Contract(ctx, blockHeader, tokenHolder.token.id).balanceOf(ownerAddress)
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

const getErc1155Balances = async (blockHeader: SubstrateBlock, tokenHolders: TokenHolder[]) => {
    // TODO: Group by contract and call in batch with `balanceOfBatch` (controlling that the batch size is not too big)
    return await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            new erc1155.Contract(ctx, blockHeader, tokenHolder.token.id).balanceOf(ownerAddress, BigNumber.from(tokenHolder.nftId!))
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

// Queries storage and updates database once head block has been reached
// TODO - Process in batches, as the number of accounts and token holders can be very large
export const updateFromHead = async (blockHeader: SubstrateBlock) => {
    ctx.log.info(`Updating accounts and token holders from head block ${blockHeader.height}`);
    await updateAccounts(blockHeader);
    // We have to wait for accounts to be updated so that we can get the EVM addresses and updated REEF balances
    await updateTokenHolders(blockHeader);
}


  