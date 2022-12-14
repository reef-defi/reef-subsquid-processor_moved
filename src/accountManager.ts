import { Store } from "@subsquid/typeorm-store";
import { ethers } from "ethers";
import { Account } from "./model";
import { provider } from "./processor";
import { findNativeAddress, toChecksumAddress } from "./util";

export class AccountManager {  
    accounts: {[address: string]: Account};
  
    constructor() {
      this.accounts = {};
    }
  
    async process(address: string, blockHeight: number, timestamp: Date, active = true): Promise<void> {
      // If account does not exist, we extract his info and store it
      if (!this.accounts[address] || this.accounts[address].blockHeight < blockHeight) {
        this.accounts[address] = await this.accountInfo(address, blockHeight, timestamp, active);
        // return new Account({...this.accounts[address]});
      }

      // If account is killed, we update the active flag
      if (!active) {
        this.accounts[address].active = false;
        // return new Account({...this.accounts[address]});
      }
  
      // Account already stored and up to date
      // return undefined;
    }
  
    // async useEvm(evmAddress: string, blockHeight: number, timestamp: Date, ): Promise<string> {
    //   // If for some reason evmAddress is not valid, return address: 0x
    //   if (!ethers.utils.isAddress(evmAddress)) {
    //     return '0x';
    //   }
  
    //   // Node/Empty/Root address is presented as 0x
    //   if (evmAddress === ethers.constants.AddressZero) {
    //     return '0x';
    //   }
    //   const address = await findNativeAddress(evmAddress);
  
    //   // Address can also be of contract and for this case node returns empty string
    //   // We are only processing accounts in accounts manager!
    //   if (address !== '') {
    //     await this.use(address, blockHeight, timestamp);
    //     return address;
    //   }
  
    //   return '0x';
    // }
  
    async save(store: Store): Promise<void> {
      const accounts = Object.keys(this.accounts);
      const usedAccounts = accounts.map((address) => this.accounts[address]);
  
      if (usedAccounts.length === 0) {
        return;
      }
  
      // Saving used accounts
      await store.save(usedAccounts);
  
    //   // Converting accounts into token holders
    //   const tokenHolders: TokenHolder[] = usedaccounts
    //     .map((account) => ({
    //       timestamp: account.timestamp,
    //       signerAddress: account.address,
    //       tokenAddress: REEF_CONTRACT_ADDRESS,
    //       info: { ...REEF_DEFAULT_DATA },
    //       balance: account.freeBalance,
    //       type: 'Account',
    //       evmAddress: '',
    //       nftId: null,
    //     }));
  
    //   // Updating account native token holder
    //   logger.info('Updating native token holders for used accounts');
    //   await insertAccountTokenHolders(tokenHolders);
    }
  
    private async accountInfo(address: string, blockHeight: number, timestamp: Date, active: boolean): Promise<Account> {
      const [evmAddress, balances, identity] = await Promise.all([
        provider.api.query.evmAccounts.evmAddresses(address),
        provider.api.derive.balances.all(address),
        provider.api.derive.accounts.identity(address),
      ]);
  
      // TODO clean below code
      const addr = evmAddress.toString();
      const evmAddr = addr !== ''
        ? toChecksumAddress(addr)
        : addr;
  
      const evmNonce: string | null = addr !== ''
        ? await provider.api.query.evm.accounts(addr)
          .then((res): any => res.toJSON())
          .then((res) => res?.nonce || 0)
        : 0;
  
        const account: Account = new Account({
            id: address,
            evmAddress: evmAddr,
            identity: identity,
            active: active,
            freeBalance: BigInt(balances.freeBalance.toString()),
            lockedBalance: BigInt(balances.lockedBalance.toString()),
            availableBalance: BigInt(balances.availableBalance.toString()),
            reservedBalance: BigInt(balances.reservedBalance.toString()),
            vestedBalance: BigInt(balances.vestingLocked.toString()),
            votingBalance: BigInt(balances.votingBalance.toString()),
            nonce: Number(balances.accountNonce),
            evmNonce: Number(evmNonce) || 0,
            blockHeight: blockHeight,
            timestamp: timestamp,
        });
    
        return account;
    }
  }

  