import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';

@Injectable({
  providedIn: 'root'
})
export class PricedataService {
  constructor(private web3 : Web3Service) {  }
}

fetchPrices
