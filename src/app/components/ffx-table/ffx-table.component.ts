import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { contractList } from 'src/app/resources/contracts'
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
  addresses$:string[] = [ ];
  columnsToDisplay = ['symbol', 'price', 'address'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  loggedIn = false;

  constructor(private web3: Web3Service) {
  }

  ngOnInit(): void {
    this.addresses$ = Object.keys(contractList);
    console.log("Table created");
    console.log(this.addresses$);
  }

}
