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


  Connect() {
    this.web3.connectAccount().then(response => {
      console.log(response);
      this.data = response
    })
  }

  GetBalance() {
    this.web3.getBalance().then(response => {
      console.log(response);
      this.balance = response
    })
  }

  GetPrice(){
    this.web3.getPrice("0xb49f677943BC038e9857d61E7d053CaA2C1734C1").then(response => {
      console.log(response);
      this.price = response
    })
  }

}
