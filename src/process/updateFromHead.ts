import { SubstrateBlock } from "@subsquid/substrate-processor";
import { BigNumber, ethers } from "ethers";
import { Account, ContractType, TokenHolder } from "../model";
import { ctx } from "../processor";
import { EvmAccountsEvmAddressesStorage, EVMAccountsStorage, IdentityIdentityOfStorage } from "../types/storage";
import { bufferToString, REEF_CONTRACT_ADDRESS, sleep } from "../util/util";
import * as erc20 from "../abi/ERC20";
import * as erc721 from "../abi/ERC721";
import * as erc1155 from "../abi/ERC1155";
import * as ss58 from '@subsquid/ss58';
import { getBalancesAccount } from "../util/balances/balances";
import { Not } from "typeorm";

const updateAccounts = async (accounts: Account[], blockHeader: SubstrateBlock) => {
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
    await ctx.store.save(accounts);
    ctx.log.info(`Accounts updated`);
}

const updateNativeTokenHolders = async (nativeTokenHolders: TokenHolder[]) => {
    // Update REEF balances
    nativeTokenHolders.forEach((tokenHolder) => {
        tokenHolder.balance = tokenHolder.signer?.freeBalance || 0n;
    });

    // Update token holders in DB
    await ctx.store.save(nativeTokenHolders);
    ctx.log.info(`Native token holders updated`);
}

const updateErc20TokenHolders = async (erc20TokenHolders: TokenHolder[], blockHeader: SubstrateBlock) => {
    // Update balances
    await updateErc20Balances(blockHeader, erc20TokenHolders);

    // Update token holders in DB
    await ctx.store.save(erc20TokenHolders);
    ctx.log.info(`ERC20 token holders updated`);
}

const updateErc721TokenHolders = async (erc721TokenHolders: TokenHolder[], blockHeader: SubstrateBlock) => {
    // Update balances
    await updateErc721Balances(blockHeader, erc721TokenHolders);

    // Update token holders in DB
    await ctx.store.save(erc721TokenHolders);
    ctx.log.info(`ERC721 token holders updated`);
}

const updateErc1155TokenHolders = async (erc1155TokenHolders: TokenHolder[], blockHeader: SubstrateBlock) => {
    // Update balances
    await updateErc1155Balances(blockHeader, erc1155TokenHolders);

    // Update token holders in DB
    await ctx.store.save(erc1155TokenHolders);
    ctx.log.info(`ERC1155 token holders updated`);
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

const updateErc20Balances = async (blockHeader: SubstrateBlock, tokenHolders: TokenHolder[]) => {
    await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            new erc20.Contract(ctx, blockHeader, tokenHolder.token.id).balanceOf(ownerAddress)
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

const updateErc721Balances = async (blockHeader: SubstrateBlock, tokenHolders: TokenHolder[]) => {
    await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            new erc721.Contract(ctx, blockHeader, tokenHolder.token.id).balanceOf(ownerAddress)
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

const updateErc1155Balances = async (blockHeader: SubstrateBlock, tokenHolders: TokenHolder[]) => {
    // TODO: Group by contract and call in batch with `balanceOfBatch` (controlling that the batch size is not too big)
    await Promise.all(
        tokenHolders.map((tokenHolder) => {
            const ownerAddress = tokenHolder.signer?.evmAddress || tokenHolder.evmAddress!;
            new erc1155.Contract(ctx, blockHeader, tokenHolder.token.id).balanceOf(ownerAddress, BigNumber.from(tokenHolder.nftId!))
                .then((balance) => { tokenHolder.balance = BigInt(balance.toString()) });
        })
    );
}

// Queries storage and updates database once head block has been reached
export const updateFromHead = async (blockHeader: SubstrateBlock) => {
    const BATCH_SIZE = process.env.BATCH_SIZE ? parseInt(process.env.BATCH_SIZE) : 0;
    const WAIT_TIME = process.env.WAIT_TIME ? parseInt(process.env.WAIT_TIME) : 10000;

    ctx.log.info(`Updating accounts and token holders from head block ${blockHeader.height}`);

    // Fetch accounts from DB and update them in batches
    const accounts = (await ctx.store.find(Account))
        .filter(account => !['0x', 'deleted'].includes(account.id));
    ctx.log.info(`Total accounts: ${accounts.length}`);
    for (let i = 0; i < accounts.length; i += BATCH_SIZE) {
        const batch = accounts.slice(i, i + BATCH_SIZE);
        ctx.log.info(`Updating accounts ${i} to ${i + batch.length}...`);
        await updateAccounts(batch, blockHeader);
        await sleep(WAIT_TIME);
    }

    // We have to wait for accounts to be updated so that we can get the EVM addresses and updated REEF balances
    // Fetch native token holders from DB and update them in batches
    const nativeTokenHolders = await ctx.store.find(TokenHolder, {
        where: { token: { id: REEF_CONTRACT_ADDRESS } },
        relations: { token: true, signer: true }
    });
    ctx.log.info(`Total native token holders: ${nativeTokenHolders.length}`);
    for (let i = 0; i < nativeTokenHolders.length; i += BATCH_SIZE) {
        const batch = nativeTokenHolders.slice(i, i + BATCH_SIZE);
        ctx.log.info(`Updating native token holders ${i} to ${i + batch.length}...`);
        await updateNativeTokenHolders(batch);
        await sleep(WAIT_TIME);
    }

    // Fetch ERC20 token holders from DB and update them in batches
    const erc20TokenHolders = await ctx.store.find(TokenHolder, {
        where: { token: { type: ContractType.ERC20, id: Not(REEF_CONTRACT_ADDRESS) } },
        relations: { token: true, signer: true } 
    });
    ctx.log.info(`Total ERC20 token holders: ${erc20TokenHolders.length}`);
    for (let i = 0; i < erc20TokenHolders.length; i += BATCH_SIZE) {
        const batch = erc20TokenHolders.slice(i, i + BATCH_SIZE);
        ctx.log.info(`Updating ERC20 token holders ${i} to ${i + batch.length}...`);
        await updateErc20TokenHolders(batch, blockHeader);
        await sleep(WAIT_TIME);
    }

    // Fetch ERC721 token holders from DB and update them in batches
    const erc721TokenHolders = await ctx.store.find(TokenHolder, {
        where: { token: { type: ContractType.ERC721 } },
        relations: { token: true, signer: true }
    });
    ctx.log.info(`Total ERC721 token holders: ${erc721TokenHolders.length}`);
    for (let i = 0; i < erc721TokenHolders.length; i += BATCH_SIZE) {
        const batch = erc721TokenHolders.slice(i, i + BATCH_SIZE);
        ctx.log.info(`Updating ERC721 token holders ${i} to ${i + batch.length}...`);
        await updateErc721TokenHolders(batch, blockHeader);
        await sleep(WAIT_TIME);
    }

    // Fetch ERC1155 token holders from DB and update them in batches
    const erc1155TokenHolders = await ctx.store.find(TokenHolder, {
        where: { token: { type: ContractType.ERC1155 } },
        relations: { token: true, signer: true }
    });
    ctx.log.info(`Total ERC1155 token holders: ${erc1155TokenHolders.length}`);
    for (let i = 0; i < erc1155TokenHolders.length; i += BATCH_SIZE) {
        const batch = erc1155TokenHolders.slice(i, i + BATCH_SIZE);
        ctx.log.info(`Updating ERC1155 token holders ${i} to ${i + batch.length}...`);
        await updateErc1155TokenHolders(batch, blockHeader);
        await sleep(WAIT_TIME);
    }
}
