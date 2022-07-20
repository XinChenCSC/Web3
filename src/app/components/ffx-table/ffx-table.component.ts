import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/web3/web3.service';
@Component({
  selector: 'app-ffx-table',
  templateUrl: './ffx-table.component.html',
  styleUrls: ['./ffx-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class FfxTableComponent implements OnInit {
  contractAddresses$:string[] = [];
  columnsToDisplay = ['symbol', 'price', 'address'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  loggedIn = false;

  constructor(private web3: Web3Service) {
    this.web3.contractAddresses$.subscribe({
      next: (contractAddresses: string[]) => {
        this.contractAddresses$ = contractAddresses;
      }});

  }

  ngOnInit(): void {
    console.log("Table created");
  }

}
