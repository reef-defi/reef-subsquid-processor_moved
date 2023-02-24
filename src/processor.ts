import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { EventRaw } from "./interfaces/interfaces";
import { AccountManager } from "./process/accountManager";
import { BlockManager } from "./process/blockManager";
import { ExtrinsicManager } from "./process/extrinsicManager";
import { EventManager } from "./process/eventManager";
import { ContractManager } from "./process/contractManager";
import { EvmEventManager } from "./process/evmEventManager";
import { TransferManager } from "./process/transferManager";
import { TokenHolderManager } from "./process/tokenHolderManager";
import { StakingManager } from "./process/stakingManager";
import { fetchModules, hexToNativeAddress, MetadataModule, REEF_CONTRACT_ADDRESS } from "./util/util";
import { KnownArchives, lookupArchive } from "@subsquid/archive-registry";
import { VerifiedContract } from "./model";
import { updateFromHead } from "./process/updateFromHead";
import * as ss58 from '@subsquid/ss58';
import { SystemAccountStorage } from "./types/storage";

const network = process.env.NETWORK;
if (!network) {
  throw new Error('Network not set in environment.')
}

const RPC_URL = process.env[`NODE_RPC_WS_${network.toUpperCase()}`];
const AQUARIUM_ARCHIVE_NAME = process.env[`ARCHIVE_LOOKUP_NAME_${network.toUpperCase()}`] as KnownArchives;
console.log('NETWORK=',network, ' RPC=', RPC_URL, ' AQUARIUM_ARCHIVE_NAME=', AQUARIUM_ARCHIVE_NAME);
const ARCHIVE = lookupArchive(AQUARIUM_ARCHIVE_NAME);

const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBlockRange({ from: 1408889 })
  .setDataSource({ chain: RPC_URL, archive: ARCHIVE })
  .setTypesBundle('assets/typesBundle.json')
  .addEvent("*")
  .includeAllBlocks(); // Force the processor to fetch the header data for all the blocks (by default, the processor fetches the block data only for all blocks that contain log items it was subscribed to)

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;
export let reefVerifiedContract: VerifiedContract;
export let ctx: Context;
export let modules: MetadataModule[];
export let headReached = process.env.HEAD_REACHED === 'true'; // default to false
export const pinToIPFSEnabled = process.env.PIN_TO_IPFS !== 'false'; // default to true

// Avoid type errors when serializing BigInts
(BigInt.prototype as any).toJSON = function () { return this.toString(); };

processor.run(database, async (ctx_) => {
  ctx = ctx_;

  const reefVerifiedContract_ = await ctx.store.get(VerifiedContract, REEF_CONTRACT_ADDRESS);
  if (reefVerifiedContract_) {
    reefVerifiedContract = reefVerifiedContract_;
  } else {
    throw new Error('REEF verified contract not found in the database');
  }

  const modules_ = await fetchModules(ctx.blocks[0].header);
  if (modules_.length) {
    modules = modules_;
  } else {
    throw new Error('Metadata modules not found');
  }

  const blockManager: BlockManager = new BlockManager();
  const extrinsicManager: ExtrinsicManager = new ExtrinsicManager();
  const eventManager: EventManager = new EventManager();
  const contractManager: ContractManager = new ContractManager();
  const evmEventManager: EvmEventManager = new EvmEventManager();
  const tokenHolderManager: TokenHolderManager = new TokenHolderManager();
  const stakingManager: StakingManager = new StakingManager();
  const transferManager: TransferManager = new TransferManager(tokenHolderManager);
  const accountManager = new AccountManager(tokenHolderManager);

  for (const block of ctx.blocks) {
    // Test SystemAccountStorage ********************************
    const address = "5GsS9iiuAqWr2RmXu1nJfaW11GT3o9sTVyMko7hkPx6GhYMr";
    const addressBytes = ss58.decode(address).bytes;

    const storageAI = new SystemAccountStorage(ctx, block.header);
    if (storageAI.isV5) {
        const accountInfo = await storageAI.asV5.get(addressBytes); // ERROR here
        console.log('accountInfo', accountInfo);
    }
    // ***********************************************************
    
    if (!headReached && ctx.isHead) {
      headReached = true;
      await updateFromHead(block.header)
    }

    blockManager.process(block.header);

    ctx.log.debug(`Processing block ${block.header.height}`);

    for (const item of block.items) {
      if (item.kind === "event" && item.event.phase === "ApplyExtrinsic") {
        const eventRaw = item.event as EventRaw;

        const feeAmount = await extrinsicManager.process(eventRaw.extrinsic, block.header);
        eventManager.process(eventRaw, block.header);

        switch (item.name as string) {
          case 'EVM.Log':
            await evmEventManager.process(eventRaw, block.header, feeAmount, transferManager, accountManager, ctx.store);
            break;
          case 'EVM.Created':
            await contractManager.process(eventRaw, block.header);
            break;
          case 'EVM.ExecutedFailed':
            await evmEventManager.process(eventRaw, block.header, feeAmount, transferManager, accountManager);
            break;

          case 'EvmAccounts.ClaimAccount':
            const addressClaimer = hexToNativeAddress(eventRaw.args[0]);
            await accountManager.process(addressClaimer, block.header);
            break;

          case 'Balances.Endowed':
            const addressEndowed = hexToNativeAddress(eventRaw.args[0]);
            await accountManager.process(addressEndowed, block.header);
            break;
          case 'Balances.Reserved':
            const addressReserved = hexToNativeAddress(eventRaw.args[0]);
            await accountManager.process(addressReserved, block.header);
            break;
          case 'Balances.Transfer':
            await transferManager.process(eventRaw, block.header, accountManager, reefVerifiedContract, feeAmount, true);
            break;

          case 'Staking.Rewarded':
            await stakingManager.process(eventRaw, block.header, accountManager);
            break;

          case 'System.KilledAccount':
            const address = hexToNativeAddress(eventRaw.args);
            await accountManager.process(address, block.header, false);
            break;
        }
      }
    }
  }

  ctx.log.info(`Saving blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`);

  const blocks = await blockManager.save();
  const extrinsics = await extrinsicManager.save(blocks);
  const events = await eventManager.save(blocks, extrinsics);
  const accounts = await accountManager.save(blocks);
  await contractManager.save(accounts, extrinsics);
  await evmEventManager.save(blocks, events);
  await transferManager.save(blocks, extrinsics, accounts);
  await tokenHolderManager.save(accounts);
  await stakingManager.save(accounts, events);
});
