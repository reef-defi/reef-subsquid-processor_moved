import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { Provider } from '@reef-defi/evm-provider';
import { WsProvider } from '@polkadot/api';
import * as erc20 from "./abi/ERC20";
import * as erc721 from "./abi/ERC721";
import * as erc1155 from "./abi/ERC1155";
import { processBlock, saveBlocks } from "./process/block";
import { Block, Contract, Event } from "./model";
import { EventData, EventRaw, ExtrinsicData } from "./interfaces/interfaces";
import { AccountManager } from "./accountManager";
import { processExtrinsic, saveExtrinsics } from "./process/extrinsic";
import { processEvent, saveEvents } from "./process/event";

const RPC_URL = "wss://rpc.reefscan.com/ws";

export const provider = new Provider({
  provider: new WsProvider(RPC_URL),
});

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

// let transfersData: TransferData[] = [];
// let evmEventsData: EvmEventData[] = [];

processor.run(database, async (ctx) => {
  await provider.api.isReadyOrError;

  const blocks: Map<string, Block> = new Map();
  const extrinsicsData: Map<string, ExtrinsicData> = new Map();
  const eventsData: Map<string, EventData> = new Map();
  // let contractsData: Map<string, ContractData> = new Map();

  const accountManager = new AccountManager();

  for (const block of ctx.blocks) {
    blocks.set(block.header.id, processBlock(block.header));

    for (const item of block.items) {
      if (item.kind === "event" && item.event.phase === "ApplyExtrinsic") {
        const eventRaw = item.event as EventRaw;
        
        if (!extrinsicsData.has(eventRaw.extrinsic.id)) {
          extrinsicsData.set(eventRaw.extrinsic.id, processExtrinsic(eventRaw.extrinsic, block.header));
        }

        eventsData.set(eventRaw.id, (processEvent(eventRaw, block.header)));

        switch (item.name as string) {
          case 'EVM.Log': 
            // await selectEvmLogEvent(eventRaw as EvmLog, block.header);
            break;
          case 'EVM.Created':
            // contracts.push(processContractCreated(eventRaw, block.header));
            break;
          case 'EVM.ExecutedFailed': 
            console.log('Evm.ExecutedFailed');
            break;
      
          case 'EvmAccounts.ClaimAccount':
            // await processClaimEvmAccount(eventRaw, block.header, accountManager);
            break;
      
          case 'Balances.Endowed': 
            // await processEndowed(eventRaw, block.header, accountManager);
            break;
          case 'Balances.Reserved': 
            // const accountReserved = await processReserved(eventRaw, block.header, accountManager);
            break;
          case 'Balances.Transfer': 
            // const transfer = await processNativeTransfer(eventRaw, block.header, accountManager);
            // TODO save transfer entity
            break;
      
          case 'Staking.Rewarded': 
            // const staking = await processStaking(eventRaw, block.header, accountManager);
            // TODO save staking entity
            break;
      
          case 'System.KilledAccount': 
            // await processKillAccount(eventRaw, block.header, accountManager);
            break;
        }
      }
    }    
  }

  console.log(`Saving blocks from ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length - 1].header.height}`);

  await saveBlocks([...blocks.values()], ctx.store);
  const extrinsics = await saveExtrinsics([...extrinsicsData.values()], blocks, ctx.store);
  const events = await saveEvents([...eventsData.values()], blocks, extrinsics, ctx.store);
  await accountManager.save(blocks, ctx.store);
  
  // await ctx.store.insert(contracts);

  // await ctx.store.save([...accountManager.accounts.values()]);

  // // Save contracts
  // const accountIds: Set<string> = new Set();
  // for (const contractData of contractsData) {
  //   accountIds.add(contractData.signerAddress);
  // }
  // const accountsFound = await ctx.store.findBy(Account, {id: In([...accountIds])}).then((q) => new Map(q.map((i) => [i.id, i])));

  // const contracts: Contract[] = contractsData.map((contractData) => {
  //   let signer = accountsFound.get(contractData.signerAddress);
  //   if (!signer) {
  //     signer = new Account({id: contractData.signerAddress})
  //     accountsFound.set(signer.id, signer)
  //   }

  //   return new Contract({
  //     ...contractData,
  //     signer,
  //     extrinsicId: 0, // TODO - get extrinsicId
  //   });
  // });
  // await ctx.store.save([...accountsFound.values()]);
  // await ctx.store.insert(contracts);

  // // Save transfers
  // const contractIds: Set<string> = new Set();
  // for (const transferData of transfersData) {
  //   contractIds.add(transferData.tokenAddress);
  // }
  // for (const evmEventData of evmEventsData) {
  //   contractIds.add(evmEventData.contractAddress);
  // }
  // const contractsFound = await ctx.store.findBy(Contract, {id: In([...contractIds])}).then((q) => new Map(q.map((i) => [i.id, i])))

  // const transfers: Transfer[] = transfersData.map((transferData) => {
  //   const _block = blocks.find((block) => block.id === transferData.blockId);
  //   if (!_block) throw new Error(`Block ${transferData.blockId} not found`); // TODO - handle this error

  //   let tokenContract = contractsFound.get(transferData.tokenAddress);
  //   if (!tokenContract) throw new Error(`Contract ${transferData.tokenAddress} notfound`); // TODO - handle this error

  //   return new Transfer({
  //     ...transferData,
  //     block: _block,
  //     tokenContract,
  //     // to,
  //     // from,
  //     feeAmount: 0n, // TODO - get fee amount from extrinsicData
  //     denom: "TODO", // TODO: get symbol from contract
  //   });
  // });

  // // Save evm events
  // const evmEvents: EvmEvent[] = evmEventsData.map((evmEventData) => {
  //   const _block = blocks.find((block) => block.id === evmEventData.blockId);
  //   if (!_block) throw new Error('Block not found'); // TODO - handle this error

  //   let contract = contractsFound.get(evmEventData.contractAddress);
  //   if (!contract) throw new Error(`Contract ${evmEventData.contractAddress} not found`); // TODO - handle this error

  //   return new EvmEvent({
  //     ...evmEventData,
  //     block: _block,
  //     extrinsicIndex: 0, // TODO - get extrinsic index from extrinsicData
  //     contract,
  //   });
  // });
  
  // await ctx.store.insert(transfers);
  // await ctx.store.insert(evmEvents);

  // transfersData = [];
  // evmEventsData = [];
});

// const selectEvmLogEvent = async (event: EvmLog, blockHeader: SubstrateBlock) => {
//   switch (event.args.topics[0]) {
//     case erc20.events.Transfer.topic: 
//       const erc20TransferData = await processErc20Transfer(event, blockHeader);
//       if (erc20TransferData) transfersData.push(erc20TransferData);
//       break;
//     case erc721.events.Transfer.topic:
//       transfersData.push(await processErc721Transfer(event, blockHeader));
//       break;
//     case erc1155.events.TransferSingle.topic: 
//       transfersData.push(await processErc1155SingleTransfer(event, blockHeader));
//       break;
//     case erc1155.events.TransferBatch.topic:
//       transfersData.push(...await processErc1155BatchTransfer(event, blockHeader));
//       break;
//     default:
//      const evmEventData = await processEvmLog(event, blockHeader);
//      if (evmEventData) evmEventsData.push(evmEventData);
//   }
// };