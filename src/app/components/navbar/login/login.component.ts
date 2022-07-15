import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accountList$: string[] | undefined;
  faWallet = faWallet;

  constructor( private web3: Web3Service ){}

  ngOnInit(): void {
  }

  Connect() {
    this.web3.connectAccount();
    this.web3.metamaskAccounts$.subscribe((data:string[]) => this.accountList$ = data)
  }

  Disconnect() {
    this.web3.disconnectAccount();
    this.accountList$ = undefined;
  }

  Authenticate(){
    return
  }

  GetWatchlist(){
    return
  }
}
