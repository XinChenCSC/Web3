import { Component, Input, OnInit } from '@angular/core';
import { faStar as filledStar  } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar }  from '@fortawesome/free-regular-svg-icons' ;
import { Web3Service } from 'src/app/services/web3/web3.service';


@Component({
  selector: '[app-ffx-tr]',
  templateUrl: './ffx-tr.component.html',
  styleUrls: ['./ffx-tr.component.css'],
  template:`

`
})
export class FfxTrComponent implements OnInit {
  @Input("address") address: string | undefined;
  Watched:boolean = false ;
  Symbol:string = "";
  Price:number = 0;
  filledStar = filledStar;
  regularStar = regularStar;

  constructor(private web3: Web3Service) {
  }


  ngOnInit() {
    console.log("Row for " + this.address + " created");
      if(this.address){
      this.web3.symbol$[this.address].subscribe({
        next: (s:any) => {
          this.Symbol = s;
        }});

      this.web3.price$[this.address].subscribe({
        next: (p:any) => {
          this.Price = p;
        }});
    }
}


}
