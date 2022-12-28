import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "./accountManager";
import { EventRaw, StakingData } from "../interfaces/interfaces";
import { Account, Event, Staking, StakingType } from "../model";
import { ctx } from "../processor";
import { findNativeAddress, hexToNativeAddress } from "../util/util";
import { StakingPayeeStorage } from "../types/storage";
import * as ss58 from '@subsquid/ss58';
export class StakingManager {  
    stakingsData: StakingData[] = [];
  
    async process(eventRaw: EventRaw, blockHeader: SubstrateBlock, accountManager: AccountManager) {
        let signerAddress = hexToNativeAddress(eventRaw.args[0]);
        const amount = eventRaw.args[1];
    
        await accountManager.process(signerAddress, blockHeader);
    
        // TODO
        // const addressBytes = ss58.decode(signerAddress).bytes;
        // const rewardDestination = await this.getStakingPayee(blockHeader, addressBytes);
        // // If account has speficied different reward destination we switch the staking signer to that one
        // if (rewardDestination?.__kind === 'Account' && rewardDestination.value) {
        //     const signerEvmAddress = uint8ArrayToString(rewardDestination.value);
        //     signerAddress = await findNativeAddress(blockHeader, signerEvmAddress);
        //     await accountManager.process(signerAddress, blockHeader);
        // }
    
        const stakingData = {
            id: eventRaw.id,
            signerAddress: signerAddress,
            type: StakingType.Reward,
            amount: amount,
            timestamp: new Date(blockHeader.timestamp)
        };

        this.stakingsData.push(stakingData);
    }
  
    async save(accounts: Map<string, Account>, events: Map<string, Event>) {
        const stakings: Staking[] = [];

        // TODO: process in parallel
        for (const stakingData of this.stakingsData) {
            // Search signer account in cached accounts
            let signer = accounts.get(stakingData.signerAddress);
            if (!signer) {
                // If not found, query the database
                signer = await ctx.store.get(Account, stakingData.signerAddress);
                if (!signer) throw new Error(`Account ${stakingData.signerAddress} not found`); // TODO: handle this error
            }
    
            const event = events.get(stakingData.id);
            if (!event) throw new Error(`Event ${stakingData.id} not found`); // TODO: handle this error
            
            stakings.push(new Staking ({
                ...stakingData,
                signer: signer,
                event: event
            }));
        };
    
        await ctx.store.save(stakings);
    }

    private async getStakingPayee(blockHeader: SubstrateBlock, address: Uint8Array) {
        const storage = new StakingPayeeStorage(ctx, blockHeader);

        if (!storage.isExists) {
            return undefined
        } else if (storage.isV5) {
            return storage.asV5.get(address);
        } else {
            throw new Error("Unknown storage version");
        }
    }
}

  