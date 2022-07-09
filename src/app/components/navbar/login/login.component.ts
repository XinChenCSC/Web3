import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/contract/web3.service';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accounts: string[] | undefined;
  faWallet = faWallet;

  constructor(
    private web3: Web3Service) {
  }

  ngOnInit(): void {
  }

  Connect() {
    this.web3.connectAccount().then(response => {
      this.accounts = response
    })
  }

  Disconnect() {
    this.web3.disconnectAccount();
    this.accounts = undefined;
  }

}
