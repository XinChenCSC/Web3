import {Inject, Injectable} from '@angular/core';
import { WEB3 } from '../../core/web3';
import { Subject } from 'rxjs';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { provider } from 'web3-core';
import pricefeed from 'src/app/resources/abis/pricefeed';

export interface PriceFeedData {
  description: string;
  latestAnswer: number;
  latestTimeStamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public accountsObservable = new Subject<string[]>();
  web3Modal;
  web3js:  any;
  provider: provider | undefined;
  accounts: string[] | undefined;
  balance: string | undefined;

  constructor(@Inject(WEB3) private web3: Web3) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: '39f269efdc464dbf97ac75f0baebb5a7', // required change this with your own infura id
          description: 'Scan the qr code and sign in',
          qrcodeModalOptions: {
            mobileLinks: [
              'rainbow',
              'metamask',
              'argent',
              'trust',
              'imtoken',
              'pillar'
            ]
          }
        }
      },
      injected: {
        display: {
          logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
          name: 'metamask',
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional change this with the net you want to use like rinkeby etc
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }


  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    if (this.provider) {
      this.web3js = new Web3(this.provider);
    } // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    return this.accounts;
  }

  async disconnectAccount(): Promise<void> {
    this.web3Modal.clearCachedProvider();
    return undefined;
  }

  async getBalance(): Promise<string> {
    if(this.accounts) {
      return this.web3js.eth.getBalance(this.accounts[0]);
    } return "";
  }

  async getPriceData(address: string): Promise<PriceFeedData> {
    const contract = new this.web3js.eth.Contract(pricefeed, address);
    return {
      description : await contract.methods.description().call(),
      latestAnswer : await contract.methods.latestAnswer().call(),
      latestTimeStamp : await contract.methods.latestTimestamp().call(),
    };

  }

}

