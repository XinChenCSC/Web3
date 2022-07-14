import { LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject, Observable, Subject, Subscription, of, observable } from 'rxjs';
import { Web3Service } from 'src/app/services/web3/web3.service';

export interface PriceData {
  watched: boolean | undefined;
  symbol: string | undefined;
  price: number | undefined;
  address: string | undefined;
  type:  'Crypto' | 'Forex' | 'Equities' | "Commodities";
}

@Component({
  selector: 'app-ffx-material-table',
  templateUrl: './ffx-material-table.component.html',
  styleUrls: ['./ffx-material-table.component.css']
})
export class FfxMaterialTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = ['watched', 'symbol', 'price', 'type', 'address',];
  dataSource: MatTableDataSource<PriceData>;


  contractAddresses$:string[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer, private web3: Web3Service) {
    this.dataSource = new MatTableDataSource([] as PriceData[]);
  };

  ngOnInit(): void {
    this.web3.priceData$.subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
