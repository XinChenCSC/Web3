import { Component, Inject, OnInit } from '@angular/core';
import { WEB3 } from 'src/app/core/web3';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  constructor(private web3: Web3Service) { }

  ngOnInit(): void {

  }

  Sign(){
    console.log("Signing in...");
    this.web3.signMessage("message");
  };
}
