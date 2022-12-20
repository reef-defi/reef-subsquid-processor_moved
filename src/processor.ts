import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { Provider } from '@reef-defi/evm-provider';
import { WsProvider } from '@polkadot/api';
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
import { hexToNativeAddress } from "./util";

const RPC_URL = "wss://rpc.reefscan.com/ws";

export const provider = new Provider({ provider: new WsProvider(RPC_URL) });

const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBlockRange( {from: 0} )
  .setDataSource({
    chain: RPC_URL,
    archive: 'http://localhost:8888/graphql'
  })
  .addEvent("*")
  .includeAllBlocks(); // Force the processor to fetch the header data for all the blocks (by default, the processor fetches the block data only for all blocks that contain log items it was subscribed to)

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;

processor.run(database, async (ctx) => {
  await provider.api.isReadyOrError;

  const blockManager: BlockManager = new BlockManager();
  const extrinsicManager: ExtrinsicManager = new ExtrinsicManager();
  const eventManager: EventManager = new EventManager();
  const contractManager: ContractManager = new ContractManager();
  const evmEventManager: EvmEventManager = new EvmEventManager();
  const transferManager: TransferManager = new TransferManager();
  const tokenHolderManager: TokenHolderManager = new TokenHolderManager();
  const stakingManager: StakingManager = new StakingManager();
  const accountManager = new AccountManager(tokenHolderManager);

  for (const block of ctx.blocks) {
    blockManager.process(block.header);

    for (const item of block.items) {
      if (item.kind === "event" && item.event.phase === "ApplyExtrinsic") {
        const eventRaw = item.event as EventRaw;
        
        extrinsicManager.process(eventRaw.extrinsic, block.header);
        eventManager.process(eventRaw, block.header);

        switch (item.name as string) {
          case 'EVM.Log': 
            await evmEventManager.process(eventRaw, block.header, transferManager, accountManager, ctx.store);
            break;
          case 'EVM.Created':
            contractManager.process(eventRaw, block.header);
            break;
          case 'EVM.ExecutedFailed': 
            await evmEventManager.process(eventRaw, block.header, transferManager, accountManager);
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
            await transferManager.process(eventRaw, block.header, accountManager, true);
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

  console.log(`Saving blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`);

  const blocks = await blockManager.save(ctx.store);
  const extrinsics = await extrinsicManager.save(blocks, ctx.store);
  const events = await eventManager.save(blocks, extrinsics, ctx.store);
  const accounts = await accountManager.save(blocks, ctx.store);
  await contractManager.save(accounts, extrinsics, ctx.store);
  await evmEventManager.save(blocks, events, ctx.store);
  await transferManager.save(blocks, extrinsics, accounts, ctx.store);
  await tokenHolderManager.save(accounts, ctx.store);
  await stakingManager.save(accounts, events, ctx.store);
});