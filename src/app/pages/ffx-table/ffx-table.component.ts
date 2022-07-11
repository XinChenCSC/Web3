import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { Component } from '@angular/core';
import { faStar as filledStar  } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar }  from '@fortawesome/free-regular-svg-icons' ;

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
export class FfxTableComponent {
  dataSource = PRICE_DATA;
  columnsToDisplay = ['symbol', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedPriceData: PeriodicElement | null | undefined;
  filledStar = filledStar;
  regularStar = regularStar;
}

export interface PeriodicElement {
  watched: boolean;
  symbol: string;
  price: number;
  description: string;
}

const PRICE_DATA: PeriodicElement[] = [
  {
    watched: true,
    symbol: 'JPY/USD',
    price: 0.0089,
    description: `The yen (Japanese: 円, symbol: ¥; code: JPY; also abbreviated as JP¥) is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar (US$) and the euro.[2] It is also widely used as a third reserve currency after the US dollar and the euro.`,
  },
  {
    watched: true,
    symbol: 'EUR/USD',
    price: 1.1021,
    description: `The euro (symbol: €; code: EUR) is the official currency of 19 out of the 27 member states of the European Union. This group of states is known as the eurozone or, officially, the euro area, and includes about 349 million citizens as of 2019.[12][13] The euro is divided into 100 cents.`,
  },
  {
    watched: false,
    symbol: 'GBP/USD',
    price: 1.3282,
    description: `The pound sterling (symbol: £; code: GBP) is the currency of the United Kingdom.`,
  },
];
