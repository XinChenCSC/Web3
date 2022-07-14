import { Inject, Injectable } from '@angular/core';
import { WEB3 } from '../../core/web3';
import { Subject, Observable } from 'rxjs';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { provider } from 'web3-core';
import { contractList } from 'src/app/resources/contracts';
import pricefeedAbi from 'src/app/resources/abis/pricefeed';
import { ADDRCONFIG } from 'dns';
import { PriceData } from 'src/app/components/ffx-material-table/ffx-material-table.component';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private metamaskAccounts: any;
  private web3Modal;
  web3js: any;
  provider: any;
  private balance: any;
  public addresses: string[] = [];

  public contractAddresses$ = new Subject<string[]>();
  public metamaskAccounts$ = new Subject<string[]>();

  public price$: { [key: string]: Subject<number> } = {};
  public symbol$: { [key: string]: Subject<string> } = {};
  public watched$: { [key: string]: Subject<boolean> } = {};

  private _pricedata: PriceData[] = [];
  public priceData$: Subject<PriceData[]> = new Subject<PriceData[]>();

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
              'pillar',
            ],
          },
        },
      },
      injected: {
        display: {
          logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
          name: 'metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
    };

    this.web3Modal = new Web3Modal({
      network: 'mainnet', // optional change this with the net you want to use like rinkeby etc
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)',
      },
    });

    for (const key of Object.keys(contractList)) {
      this.addresses.push(key);
      this.watched$[key] = new Subject<boolean>();
      this.symbol$[key] = new Subject<string>();
      this.price$[key] = new Subject<number>();
    }
    this.contractAddresses$.next(this.addresses);
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.metamaskAccounts = await this.web3js.eth.getAccounts();
    this.metamaskAccounts$.next(this.metamaskAccounts);
    console.log(this.metamaskAccounts);

    for (const key of Object.keys(contractList)) {
      const contractInstance = new this.web3js.eth.Contract(
        pricefeedAbi,
        contractList[key].address
      );
      let symbol: string;
      let decimals: number;
      let latestAnswer: number;

      contractInstance.methods.description()
        .call({ from: this.metamaskAccounts[0]})
        .then((res: string) => (symbol = res))
      .then(() => contractInstance.methods.latestAnswer()
        .call({ from: this.metamaskAccounts[0] })
        .then((res:number) => latestAnswer = res))
      .then(() => contractInstance.methods.decimals()
        .call({ from: this.metamaskAccounts[0]})
        .then((res: number) => decimals = res))
      .then(() => {
        this._pricedata = [
          ...this._pricedata,
          {
            symbol: symbol,
            price: latestAnswer / Math.pow(10, decimals),
            address: key,
            watched: false,
            type: contractList[key].assetType,
          },
        ];
          this.priceData$.next(this._pricedata);
      })
    }
  }

  async disconnectAccount(): Promise<void> {
    this.web3Modal.clearCachedProvider();
    return undefined;
  }

  async getBalance(): Promise<string> {
    if (this.metamaskAccounts) {
      return this.web3js.eth.getBalance(this.metamaskAccounts[0]);
    }
    return '';
  }

  async signMessage(message: string) {
    console.log(this.metamaskAccounts);
    this.web3.eth.personal
      .sign(message, this.metamaskAccounts[0], 'null')
      .then((res: string) => {
        console.log(res);
      });
  }
}
