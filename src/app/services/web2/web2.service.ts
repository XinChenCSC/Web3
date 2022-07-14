import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface response{
  publicAddress: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class Web2Service {
  private token: string | undefined;
  constructor(private web3: Web3Service, private http: HttpClient) {
  }

  public async connect() {
    const BACKEND_URL = 'http://fantasticforex-env.eba-anp2m5xc.us-east-2.elasticbeanstalk.com';
    let accounts:string[] = this.web3.getAccounts();
    let nonce: string;
    let signature: string;

    const request_body = {
      publicAddress: accounts[0],
      message: 'null'
    }

    console.log(`Request body: ${JSON.stringify(request_body)}`)

    // fetch the nonce from the backend
    this.http.post<response>( BACKEND_URL + '/login/get',
      { publicAddress: accounts[0], message: 'null' },
      { headers: { 'Content-Type': 'application/json' }})
      .subscribe(async (data: any) => {
        nonce = data.message;
        console.log(`nonce = ${nonce}`);
        signature = await this.web3.signMessage(nonce);
        console.log(`signature ${signature}`);

        // sign and send the request to the backend
        this.http.post<response>( BACKEND_URL + '/login/verify',
        { publicAddress: accounts[0], message: signature },
        { headers: { 'Content-Type': 'application/json' }})
          .subscribe(async (data: any) => {
            console.log(`data = ${data.publicAddress}`);
            console.log(`data.message = ${data.message}`);
            this.token = data.message;
          })
      })
    }
}
