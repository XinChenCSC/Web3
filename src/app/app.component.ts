import {Component} from '@angular/core';
import {Web3Service} from "./services/contract/web3.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authenticated: boolean = false;
  data: string[] | undefined;
  balance: string | undefined;
  price: any;


  constructor(
    private web3: Web3Service) {
  }


  GetBalance() {
    this.web3.getBalance().then(response => {
      console.log(response);
      this.balance = response
    })
  }

}
