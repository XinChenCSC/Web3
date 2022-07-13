declare let window: any;

import {Component} from '@angular/core';
import {Web3Service} from "./services/web3/web3.service";


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
  accountList$: string[] = [];


  constructor(private web3: Web3Service) {
    this.web3.metamaskAccounts$.subscribe({
      next: (accountList: string[]) => {
        this.accountList$ = accountList;
      }})
  }
}
