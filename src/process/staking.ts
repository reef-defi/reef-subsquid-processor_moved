import { SubstrateBlock } from "@subsquid/substrate-processor";
import { AccountManager } from "../accountManager";
import { provider } from "../processor";
import { Event as EventRaw } from "../types/support";
import { hexToNativeAddress } from "../util";

export const processStaking = async (eventRaw: EventRaw, blockHeader: SubstrateBlock, accountManager: AccountManager): Promise<any> => {
    let signer = hexToNativeAddress(eventRaw.args[0]);
    const amount = eventRaw.args[1];

    await accountManager.process(signer, blockHeader.height, new Date(blockHeader.timestamp));

    const rewardDestination = await provider.api.query.staking.payee.at(blockHeader.hash, signer);
    // If account has speficied different reward destination we switch the staking signer to that one
    if (rewardDestination.isAccount) {
        signer = rewardDestination.asAccount.toString();
        await accountManager.process(signer, blockHeader.height, new Date(blockHeader.timestamp));
    }

    // TODO staking entity

    return null;
}