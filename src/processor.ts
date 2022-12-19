import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { Provider } from '@reef-defi/evm-provider';
import { WsProvider } from '@polkadot/api';
import { processBlock, saveBlocks } from "./process/block";
import { Block } from "./model";
import { ContractData, EventData, EventRaw, EvmEventData, ExtrinsicData, TransferData } from "./interfaces/interfaces";
import { AccountManager } from "./accountManager";
import { processExtrinsic, saveExtrinsics } from "./process/extrinsic";
import { processEvent, saveEvents } from "./process/event";
import { processContractCreated, saveContracts } from "./process/contractCreated";
import { processClaimEvmAccount } from "./process/claimEvmAccount";
import { processEndowed } from "./process/endowed";
import { processReserved } from "./process/reserved";
import { processNativeTransfer } from "./process/nativeTransfer";
import { processStaking } from "./process/staking";
import { processKillAccount } from "./process/killAccount";
import { processEvmEvent, saveEvmEvents } from "./process/evmLogEvent";

const RPC_URL = "wss://rpc.reefscan.com/ws";

export const provider = new Provider({
  provider: new WsProvider(RPC_URL),
});

const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBlockRange( {from: 283070} )
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

  const blocks: Map<string, Block> = new Map();
  const extrinsicsData: Map<string, ExtrinsicData> = new Map();
  const eventsData: EventData[] = [];
  const contractsData: ContractData[] = [];
  const evmEventsData: EvmEventData[] = [];
  const transfersData: TransferData[] = [];
  const accountManager = new AccountManager();

  for (const block of ctx.blocks) {
    blocks.set(block.header.id, processBlock(block.header));

    for (const item of block.items) {
      if (item.kind === "event" && item.event.phase === "ApplyExtrinsic") {
        const eventRaw = item.event as EventRaw;
        
        if (!extrinsicsData.has(eventRaw.extrinsic.id)) {
          extrinsicsData.set(eventRaw.extrinsic.id, processExtrinsic(eventRaw.extrinsic, block.header));
        }

        eventsData.push(processEvent(eventRaw, block.header));

        switch (item.name as string) {
          case 'EVM.Log': 
            const {evmEventData, transfersData: td} = await processEvmEvent(eventRaw, block.header);
            if (evmEventData) evmEventsData.push(evmEventData);
            transfersData.concat(td);
            break;
          case 'EVM.Created':
            const contractData = processContractCreated(eventRaw, block.header);
            contractsData.push(contractData);
            break;
          case 'EVM.ExecutedFailed': 
          const {evmEventData: evmEventDataFailed } = await processEvmEvent(eventRaw, block.header);
          evmEventsData.push(evmEventDataFailed!);
            break;
      
          case 'EvmAccounts.ClaimAccount':
            await processClaimEvmAccount(eventRaw, block.header, accountManager);
            break;
      
          case 'Balances.Endowed': 
            await processEndowed(eventRaw, block.header, accountManager);
            break;
          case 'Balances.Reserved': 
            await processReserved(eventRaw, block.header, accountManager);
            break;
          case 'Balances.Transfer': 
            const transfer = await processNativeTransfer(eventRaw, block.header, accountManager);
            // TODO save transfer entity
            break;
      
          case 'Staking.Rewarded': 
            const staking = await processStaking(eventRaw, block.header, accountManager);
            // TODO save staking entity
            break;
      
          case 'System.KilledAccount': 
            await processKillAccount(eventRaw, block.header, accountManager);
            break;
        }
      }
    }    
  }

  console.log(`Saving blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`);

  await saveBlocks([...blocks.values()], ctx.store);
  const extrinsics = await saveExtrinsics([...extrinsicsData.values()], blocks, ctx.store);
  const events = await saveEvents(eventsData, blocks, extrinsics, ctx.store);
  const accounts = await accountManager.save(blocks, ctx.store);
  await saveContracts(contractsData, accounts, extrinsics, ctx.store);
  await saveEvmEvents(evmEventsData, blocks, events, ctx.store);
});