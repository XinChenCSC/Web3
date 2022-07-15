import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  of,
  observable,
} from 'rxjs';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { MatTableFilter } from 'mat-table-filter';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

export interface PriceData {
  watched: boolean | undefined;
  asset: string | undefined;
  symbol: string | undefined;
  price: number | undefined;
  address: string | undefined;
  type: 'Crypto' | 'Forex' | 'Equities' | 'Commodities' | undefined;
}

export class Pricedata {
  watched: boolean | undefined;
  asset: string | undefined;
  symbol: string | undefined;
  price: number | undefined;
  address: string | undefined;
  type: 'Crypto' | 'Forex' | 'Equities' | 'Commodities' | undefined;
}

@Component({
  selector: 'app-ffx-material-table',
  templateUrl: './ffx-material-table.component.html',
  styleUrls: ['./ffx-material-table.component.css'],
})
export class FfxMaterialTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['watched', 'asset', 'symbol', 'price', 'type'];
  dataSource: MatTableDataSource<PriceData>;
  filterType: MatTableFilter = MatTableFilter.STARTS_WITH;
  filterEntity: PriceData;
  filledStar = filledStar;
  regularstar = regularStar;

  contractAddresses$: string[] = [];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private web3: Web3Service,
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.filterEntity = new Pricedata();
  }

  ngOnInit(): void {
    this.filterType = MatTableFilter.ANYWHERE;
    this.web3.priceData$.subscribe((data) => (this.dataSource.data = data));
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ToggleWatched(item: PriceData) {
    console.log('Toggling watched for ' + item.address);
  }
}
