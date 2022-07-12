import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faStar as filledStar  } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar }  from '@fortawesome/free-regular-svg-icons' ;
import { PriceData } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
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
  priceData$: PriceData[] = [];
  columnsToDisplay = ['symbol', 'price', 'address'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedPriceData: PriceData | null | undefined;
  filledStar = filledStar;
  regularStar = regularStar;
  loggedIn = false;

  constructor(private web3: Web3Service) { }

  ngOnInit(): void {
    this.web3.priceData$.subscribe({
      next: (priceData: PriceData[]) => {
        this.priceData$ = priceData;
        this.update(priceData);
      }
    }
    );
  }

  update(data: PriceData[]){
    console.log(data);
  }

}
