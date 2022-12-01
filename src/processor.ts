import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {
  BatchContext,
  BatchProcessorItem,
  EvmLogEvent,
  SubstrateBatchProcessor,
  SubstrateBlock,
} from "@subsquid/substrate-processor";
import { In } from "typeorm";
import { ethers } from "ethers";
import { Provider } from '@reef-defi/evm-provider';
import { WsProvider } from '@polkadot/api';
import * as erc20 from "./abi/erc20";
import * as erc721 from "./abi/erc721";
import * as erc1155 from "./abi/erc1155";
import { EventData } from "@subsquid/substrate-processor/lib/interfaces/dataSelection";

const RPC_URL = "wss://rpc.reefscan.com/ws";

// const provider = new Provider({
//     provider: new WsProvider(RPC_URL),
//   });
const database = new TypeormDatabase();
const processor = new SubstrateBatchProcessor()
  .setBlockRange( {from: 0} )
  .setDataSource({
    chain: RPC_URL,
    archive: 'http://localhost:8888/graphql'
  })
  .addEvent("*")
  // .includeAllBlocks(); // Force the processor to fetch the header data for all the blocks (by default, the processor fetches the block data only for all blocks that contain log items it was subscribed to)

type Item = BatchProcessorItem<typeof processor>;
type Context = BatchContext<Store, Item>;

processor.run(database, async (ctx) => {
//   await provider.api.isReadyOrError;

  for (const block of ctx.blocks) {
    // console.log(`Processing block ${block.header.height}`);
    for (const item of block.items) {
      // console.log(`Processing item ${item.name}`);
      if (item.kind === "event" && item.event.phase === "ApplyExtrinsic") {
        switch (item.name as string) {
          case 'EVM.Log': 
            selectEvmLogEvent(item.event);
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
  }
});

const selectEvmLogEvent = async (event: any) => {
  switch (event.args.topics[0]) {
    case erc20.events['Transfer(address,address,uint256)'].topic: 
      console.log('Transfer.ERC20');
      break;
    case erc721.events["Transfer(address,address,uint256)"].topic: 
      console.log('Transfer.ERC721');
      break;
    case erc1155.events["TransferSingle(address,address,address,uint256,uint256)"].topic: 
      console.log('TransferSingle.ERC1155');
      break;
    case erc1155.events["TransferBatch(address,address,address,uint256[],uint256[])"].topic:
      console.log('TransferBatch.ERC1155');
      break;
    default: 
      console.log('evm log event: ', event.args.topics[0]);
  }
};