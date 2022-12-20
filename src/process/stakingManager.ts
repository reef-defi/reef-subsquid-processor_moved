import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { AccountManager } from "./accountManager";
import { EventRaw, StakingData } from "../interfaces/interfaces";
import { Account, Event, Staking, StakingType } from "../model";
import { provider } from "../processor";
import { hexToNativeAddress } from "../util";

export class StakingManager {  
    stakingsData: StakingData[] = [];
  
    async process(eventRaw: EventRaw, blockHeader: SubstrateBlock, accountManager: AccountManager) {
        let signerAddress = hexToNativeAddress(eventRaw.args[0]);
        const amount = eventRaw.args[1];
    
        await accountManager.process(signerAddress, blockHeader);
    
        const rewardDestination = await provider.api.query.staking.payee.at(blockHeader.hash, signerAddress);
        // If account has speficied different reward destination we switch the staking signer to that one
        if (rewardDestination.isAccount) {
            signerAddress = rewardDestination.asAccount.toString();
            await accountManager.process(signerAddress, blockHeader);
        }
    
        const stakingData = {
            id: eventRaw.id,
            signerAddress: signerAddress,
            type: StakingType.Reward,
            amount: amount,
            timestamp: new Date(blockHeader.timestamp)
        };

        this.stakingsData.push(stakingData);
    }
  
    async save(accounts: Map<string, Account>, events: Map<string, Event>, store: Store) {
        const stakings: Staking[] = [];

        // TODO: process in parallel
        for (const stakingData of this.stakingsData) {
            // Search signer account in cached accounts
            let signer = accounts.get(stakingData.signerAddress);
            if (!signer) {
                // If not found, query the database
                signer = await store.get(Account, stakingData.signerAddress);
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
    
        await store.save(stakings);
    }
  }

  