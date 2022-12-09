import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Account } from "../model";
import { accountManager, provider } from "../processor";
import { Event } from "../types/support";
import { hexToNativeAddress } from "../util";

export const processStaking = async (event: Event, blockHeader: SubstrateBlock): Promise<{staking: any, accounts: Account[]}> => {
    let signer = hexToNativeAddress(event.args[0]);
    const amount = event.args[1];

    const accounts = [];
    let signerAccount = await accountManager.process(signer, blockHeader.height, new Date(blockHeader.timestamp));
    if (signerAccount) {
        accounts.push(signerAccount);
    }

    const rewardDestination = await provider.api.query.staking.payee.at(blockHeader.hash, signer);
    // If account has speficied different reward destination we switch the staking signer to that one
    if (rewardDestination.isAccount) {
        signer = rewardDestination.asAccount.toString();
        signerAccount = await accountManager.process(signer, blockHeader.height, new Date(blockHeader.timestamp));
        if (signerAccount) {
            accounts.push(signerAccount);
        }
    }

    // TODO staking entity

    return {staking: null, accounts};
}