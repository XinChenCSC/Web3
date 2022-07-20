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
import { HttpClient } from '@angular/common/http';
import { preProcessFile } from 'typescript';

interface response {
  publicAddress: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  getAccount(): any {
    throw new Error('Method not implemented.');
  }
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
  private watched: string[] = [];

  private _pricedata: PriceData[] = [];
  public priceData$: Subject<PriceData[]> = new Subject<PriceData[]>();
  private token: string | undefined;
  BACKEND_URL =
    'telnet://fantasticforex-env.eba-anp2m5xc.us-east-2.elasticbeanstalk.com';

  INFURA_ID = '39f269efdc464dbf97ac75f0baebb5a7';

  constructor(@Inject(WEB3) private web3: Web3, private http: HttpClient) {
    this.watched = [] as string[];
    this._pricedata = [] as PriceData[];

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: this.INFURA_ID,
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
  }

  async loadData() {
    for (const key of Object.keys(contractList)) {
      const contractInstance = new this.web3js.eth.Contract(
        pricefeedAbi,
        contractList[key].address
      );
      let symbol: string;
      let decimals: number;
      let latestAnswer: number;
      contractInstance.methods
        .description()
        .call({ from: this.metamaskAccounts[0] })
        .then((res: string) => (symbol = res))
        .then(() =>
          contractInstance.methods
            .latestAnswer()
            .call({ from: this.metamaskAccounts[0] })
            .then((res: number) => (latestAnswer = res))
        )
        .then(() =>
          contractInstance.methods
            .decimals()
            .call({ from: this.metamaskAccounts[0] })
            .then((res: number) => (decimals = res))
        )
        .then(() => {
          this._pricedata = [
            ...this._pricedata,
            {
              asset: contractList[key].asset,
              symbol: symbol,
              price: latestAnswer / Math.pow(10, decimals),
              address: key,
              watched: undefined,
              type: contractList[key].assetType,
            },
          ];
          this.priceData$.next(this._pricedata);
        });
    }
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.metamaskAccounts = await this.web3js.eth.getAccounts();
    this.metamaskAccounts$.next(this.metamaskAccounts);

    await this.loadData();
    this.getToken().then((res: string) => {
      this.token = res;
      console.log('Getting watch list');
      this.http
        .get<response>(this.BACKEND_URL + '/users/watchlist', {
          headers: {
            'jwt-token': this.token,
          },
        })
        .subscribe(async (data: any) => {
          console.log(`watched = ${data[0].address}`);
          this.watched = data.map((x: any) => x.address);
          console.log(this.watched);
          this._pricedata = this._pricedata.map((entity: PriceData) => {
            return {
              ...entity,
              watched: this.watched.includes(entity.address || ''),
            };
          });
          console.log(`watchlist = ${this.watched}`);
          this.priceData$.next(this._pricedata);
        });
        this.priceData$.next(this._pricedata);
    });

    this._pricedata = this._pricedata.map((entity: PriceData) => {
      return {
        ...entity,
        watched: this.watched.includes(entity.address || ''),
      };
    });
    this.priceData$.next(this._pricedata);

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

  async signMessage(message: string): Promise<string> {
    return this.web3.eth.personal.sign(
      message,
      this.metamaskAccounts[0],
      'null'
    );
  }

  getAccounts(): string[] {
    return this.metamaskAccounts;
  }

  public async getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let accounts: string[] = this.getAccounts();
      let nonce: string;
      let signature: string;

      const request_body = {
        publicAddress: accounts[0],
        message: 'null',
      };

      console.log(`Request body: ${JSON.stringify(request_body)}`);

      // fetch the nonce from the backend
      this.http
        .post<response>(
          this.BACKEND_URL + '/login/get',
          { publicAddress: accounts[0], message: 'null' },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .subscribe(async (data: any) => {
          nonce = data.message;
          console.log(`nonce = ${nonce}`);
          signature = await this.signMessage(nonce);
          console.log(`signature ${signature}`);

          // sign and send the request to the backend
          this.http
            .post<response>(
              this.BACKEND_URL + '/login/verify',
              { publicAddress: accounts[0], message: signature },
              { headers: { 'Content-Type': 'application/json' } }
            )
            .subscribe(async (data: any) => {
              console.log(`address = ${data.publicAddress}`);
              console.log(`token = ${data.message}`);
              resolve(data.message);
            });
        });
    });
  }

  public async toggleWatched(address: string): Promise<void> {

    this.watched = this.watched.includes(address)
      ? this.watched.filter((x) => x !== address)
      : [...this.watched, address];

    this._pricedata = this._pricedata.map((entity: PriceData) => {
      return {
        ...entity,
        watched: this.watched.includes(entity.address || ''),
      };
    });
    this.priceData$.next(this._pricedata);


    const payload = this.watched.map((x: string) => {
      return {"address": x};
    });

    console.log(`Sending ${JSON.stringify(payload)}`)

    this.http.post<response>(
      this.BACKEND_URL + '/users/replace',
      payload,
      { headers: { 'jwt-token': this.token }}
    ).subscribe(async (data: any) => {
      console.log(data);
    });
  }
}
