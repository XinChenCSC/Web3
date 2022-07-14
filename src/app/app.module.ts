import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/navbar/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FfxTableComponent } from './components/ffx-table/ffx-table.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import {MatNativeDateModule} from '@angular/material/core';
import { PleaseLogInComponent } from './components/please-log-in/please-log-in.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthenticateComponent } from './components/navbar/login/authenticate/authenticate.component';
import { FfxTrComponent } from './components/ffx-table/ffx-tr/ffx-tr.component';
import { FfxMaterialTableComponent } from './components/ffx-material-table/ffx-material-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



const appRoutes: Routes = [
  { path: '', component: FfxMaterialTableComponent },
  { path: ':id', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FfxTableComponent,
    PageNotFoundComponent,
    PleaseLogInComponent,
    FooterComponent,
    AuthenticateComponent,
    FfxTrComponent,
    FfxMaterialTableComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatNativeDateModule,
    SharedModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
