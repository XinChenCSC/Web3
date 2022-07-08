import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PriceTableComponent } from './components/price-table/price-table.component';
import { PriceTableRowComponent } from './components/price-table/price-table-row/price-table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    PriceTableComponent,
    PriceTableRowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
