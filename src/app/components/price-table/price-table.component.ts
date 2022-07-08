import { Component, OnInit } from '@angular/core';
import { Web3Service, PriceFeedData} from 'src/app/services/contract/web3.service';

interface Contract {
  address: string;
  abi: any[];
}

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.css'],
})
export class PriceTableComponent implements OnInit {
  priceData: PriceFeedData | undefined;

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {}

  GetPriceData(address : string): void {
    this.web3.getPriceData(address).then((response) => {
      console.log(response);
      this.priceData = response;
    });
  }
}
