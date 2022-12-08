import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Account } from "../model";

export const processAccount = (blockHeader: SubstrateBlock): Account => {
    const account = new Account ({
        id: "",
        evmAddress: "",
        blockHeight: blockHeader.height,
        identity: "",
        active: true,
        freeBalance: 0n,
        lockedBalance: 0n,
        availableBalance: 0n,
        reservedBalance: 0n,
        vestedBalance: 0n,
        votingBalance: 0n,
        nonce: 0,
        evmNonce: 0,
        timestamp: new Date(blockHeader.timestamp),
    });

    return account;
}