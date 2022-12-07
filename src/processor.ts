import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  SubstrateBlock,
} from "@subsquid/substrate-processor";
import { Equal, In } from "typeorm";
import { ethers } from "ethers";
import { Provider } from '@reef-defi/evm-provider';
import { WsProvider } from '@polkadot/api';
import * as erc20 from "./abi/ERC20";
import * as erc721 from "./abi/ERC721";
import * as erc1155 from "./abi/ERC1155";
import { EventData } from "@subsquid/substrate-processor/lib/interfaces/dataSelection";
import { processBlock } from "./process/block";
import { Block, Contract, EvmEvent, Transfer } from "./model";
import { blockIdToHeight } from "./util";
import { Event } from "./types/support";
import { EvmEventData, EvmLog, TransferData } from "./interfaces/interfaces";
import { processErc20Transfer } from "./process/erc20Transfer";
import { processErc721Transfer } from "./process/erc721Transfer";
import { processErc1155SingleTransfer } from "./process/erc1155SingleTransfer";
import { processErc1155BatchTransfer } from "./process/erc1155BatchTransfer";
import { processEvmLog } from "./process/evmLogEvent";

const RPC_URL = "wss://rpc-testnet.reefscan.com/ws";

export const provider = new Provider({
  provider: new WsProvider(RPC_URL),
});
const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBlockRange( {from: 2_382_590, to: 2_382_620} )
  .setDataSource({
    chain: RPC_URL,
    archive: 'http://localhost:8888/graphql'
  })
  .addEvent("*")
  .includeAllBlocks(); // Force the processor to fetch the header data for all the blocks (by default, the processor fetches the block data only for all blocks that contain log items it was subscribed to)

export type Item = BatchProcessorItem<typeof processor>;
export type Context = BatchContext<Store, Item>;

let transfersData: TransferData[] = [];
let evmEventsData: EvmEventData[] = [];

processor.run(database, async (ctx) => {
  await provider.api.isReadyOrError;

  let blocks: Block[] = [];
  const maxBatchSize = 10;

  for (const block of ctx.blocks) {
    blocks.push(processBlock(block.header));

    for (const item of block.items) {
      if (item.kind === "event" && item.event.phase === "ApplyExtrinsic") {
        switch (item.name as string) {
          case 'EVM.Log': 
            await selectEvmLogEvent(item.event as EvmLog, block.header);
            break;
          case 'EVM.Created': 
            console.log(`EVM.Created\n => new contract address: ${item.event.args}`);
            break;
          case 'EVM.ExecutedFailed': 
            console.log('Evm.ExecutedFailed');
            break;
      
          case 'EvmAccounts.ClaimAccount': 
            console.log(`EvmAccounts.ClaimAccount\n => evm address: ${item.event.args[1]}`);
            break;
      
          case 'Balances.Endowed': 
            console.log(`Balances.Endowed\n => address: ${item.event.args[0]}, amount?: ${item.event.args[1]}`);
            break;
          case 'Balances.Reserved': 
            console.log(`Balances.Reserved\n => address: ${item.event.args[0]}, amount?: ${item.event.args[1]}`);
            break;
          case 'Balances.Transfer': 
            console.log(`Balances.Transfer\n => from: ${item.event.args[0]}, to: ${item.event.args[1]}, amount: ${item.event.args[2]}`);
            break;
      
          case 'Staking.Rewarded': 
            console.log('Staking.Rewarded');
            break;
      
          case 'System.KilledAccount': 
            console.log('System.KilledAccount');
            break;
      
          default: 
            // console.log('default event: ', item.name);
        }
      }
    }

    // Until we reach last `maxBatchSize` blocks, save every `maxBatchSize` blocks to prevent memory overflow. 
    // TODO - Check optimal batch size and whether it's better to have separate processes.
    if (blocks.length && (blocks.length >= maxBatchSize || block.header.height + maxBatchSize > ctx.blocks[ctx.blocks.length - 1].header.height)) {
      console.log(`Saving blocks from ${blockIdToHeight(blocks[0].id)} to ${block.header.height}`);

      await ctx.store.insert(blocks);

      const contractAddresses: Set<string> = new Set();
      for (const transferData of transfersData) {
        contractAddresses.add(transferData.tokenAddress);
      }
      for (const evmEventData of evmEventsData) {
        contractAddresses.add(evmEventData.contractAddress);
      }
      const contracts = await ctx.store.findBy(Contract, {address: In([...contractAddresses])}).then((q) => new Map(q.map((i) => [i.address, i])))

      const transfers: Transfer[] = transfersData.map((transferData) => {
        const block = blocks.find((block) => block.id === transferData.blockId);
        if (!block) throw new Error('Block not found'); // TODO - handle this error

        let tokenContract = contracts.get(transferData.tokenAddress);
        if (!tokenContract) throw new Error('Contract not found'); // TODO - handle this error

        return new Transfer({
          ...transferData,
          block,
          tokenContract,
          // to,
          // from,
          feeAmount: 0n, // TODO - get fee amount from extrinsicData
          denom: "TODO", // TODO: get symbol from contract
        });
      });

      const evmEvents: EvmEvent[] = evmEventsData.map((evmEventData) => {
        const _block = blocks.find((block) => block.id === evmEventData.blockId);
        if (!_block) throw new Error('Block not found'); // TODO - handle this error

        let contract = contracts.get(evmEventData.contractAddress);
        if (!contract) throw new Error('Contract not found'); // TODO - handle this error

        return new EvmEvent({
          ...evmEventData,
          block: _block,
          extrinsicIndex: 0, // TODO - get extrinsic index from extrinsicData
          contract,
        });
      });
      
      await ctx.store.insert(transfers);
      await ctx.store.insert(evmEvents);

      console.log('Blocks saved');

      blocks = [];
      transfersData = [];
      evmEventsData = [];
    }
  }
});

const selectEvmLogEvent = async (event: EvmLog, blockHeader: SubstrateBlock) => {
  switch (event.args.topics[0]) {
    case erc20.events.Transfer.topic: 
      const erc20TransferData = await processErc20Transfer(event, blockHeader);
      if (erc20TransferData) transfersData.push(erc20TransferData);
      break;
    case erc721.events.Transfer.topic:
      transfersData.push(await processErc721Transfer(event, blockHeader));
      break;
    case erc1155.events.TransferSingle.topic: 
      transfersData.push(await processErc1155SingleTransfer(event, blockHeader));
      break;
    case erc1155.events.TransferBatch.topic:
      transfersData.push(...await processErc1155BatchTransfer(event, blockHeader));
      break;
    default:
     const evmEventData = await processEvmLog(event, blockHeader);
     if (evmEventData) evmEventsData.push(evmEventData);
  }
};