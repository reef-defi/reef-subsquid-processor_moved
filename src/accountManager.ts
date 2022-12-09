import { ethers } from "ethers";
import { Account } from "./model";
import { provider } from "./processor";
import { findNativeAddress, toChecksumAddress } from "./util";

export class AccountManager {  
    allAccounts: {[address: string]: Account};
  
    constructor() {
      this.allAccounts = {};
    }
  
    async process(address: string, blockHeight: number, timestamp: Date, active = true): Promise<Account | undefined> {
      // If account does not exist, we extract his info and store it
      if (!this.allAccounts[address]) {
        this.allAccounts[address] = await this.accountInfo(address, blockHeight, timestamp, active);
        return new Account({...this.allAccounts[address]});
      }

      // If account is killed, we update the active flag
      if (!active) {
        this.allAccounts[address].active = false;
        return new Account({...this.allAccounts[address]});
      }
  
        // Account already stored and up to date
        return undefined;
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
    //   // We are only processing allAccounts in allAccounts manager!
    //   if (address !== '') {
    //     await this.use(address, blockHeight, timestamp);
    //     return address;
    //   }
  
    //   return '0x';
    // }
  
    async save(): Promise<void> {
      const allAccounts = Object.keys(this.allAccounts);
      const usedallAccounts = allAccounts.map((address) => this.allAccounts[address]);
  
      if (usedallAccounts.length === 0) {
        return;
      }
  
      // Saving used allAccounts
    //   await insertallAccounts(usedallAccounts);
  
    //   // Converting allAccounts into token holders
    //   const tokenHolders: TokenHolder[] = usedallAccounts
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
    //   logger.info('Updating native token holders for used allAccounts');
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
  
        const account: Account = {
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
        };
    
        return account;
    }
  }

  