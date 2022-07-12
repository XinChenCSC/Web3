import {Inject, Injectable} from '@angular/core';
import { WEB3 } from '../../core/web3';
import { Subject, Observable } from 'rxjs';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { provider } from 'web3-core';
import { contractList } from 'src/app/resources/contracts';
import pricefeedAbi from 'src/app/resources/abis/pricefeed';
import { PriceData } from 'src/app/interfaces/interfaces';
import { ADDRCONFIG } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public accountsObservable = new Subject<string[]>();
  web3Modal;
  web3js:  any;
  provider: any;
  accounts: any;
  balance: any;

  private accountStatusSource = new Subject<any>();
  contracts: ContractInterface[];
  accountStatus$ = this.accountStatusSource.asObservable();
  _priceData$: {[key: string]:PriceData} = {};

  priceData$ = new Subject<PriceData[]>();

  constructor(@Inject(WEB3) private web3: Web3) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: '39f269efdc464dbf97ac75f0baebb5a7',
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

    for( const key of Object.keys(contractList)) {
      this._priceData$[key] = {
        address: contractList[key].address,
        symbol: key,
        description: key,
        latestAnswer: 0,
        decimals: 0,
        price: 0,
        watched: false,
        assetType: contractList[key].assetType,
      };
      this.priceData$.next(Object.values(this._priceData$));
    }
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts);
    console.log(this.accounts);




    for( const key of Object.keys(contractList)) {

      console.log(contractList[key].address);
      const contractInstance = new this.web3js.eth.Contract(pricefeedAbi, contractList[key].address);

      contractInstance.methods.description().call({from: this.accounts[0]}).then((res: string) => {
        this._priceData$[key].symbol = res;
        this.priceData$.next(Object.values(this._priceData$));
      });

      contractInstance.methods.latestAnswer().call({from: this.accounts[0]})
        .then((latestAnswer: number) => {contractInstance.methods.decimals().call({from: this.accounts[0]})
          .then((decimals: number) => {
            this._priceData$[key].latestAnswer = latestAnswer;
            this._priceData$[key].decimals = decimals;
            this._priceData$[key].price = latestAnswer / Math.pow(10, decimals);
            this.priceData$.next(Object.values(this._priceData$));
          });
        });

  }
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
}

interface ContractInterface {
  address: string;
  abi: any[];
}
