import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/navbar/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContentComponent } from './components/content/content.component';
import { FfxTableComponent } from './pages/ffx-table/ffx-table.component';
import { FfxAssetComponent } from './pages/ffx-asset/ffx-asset.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import {MatNativeDateModule} from '@angular/material/core';
import { PleaseLogInComponent } from './components/please-log-in/please-log-in.component';
import { FooterComponent } from './footer/footer.component';



const appRoutes: Routes = [
  { path: '', component: FfxTableComponent },
  { path: ':id', component: FfxAssetComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ContentComponent,
    FfxTableComponent,
    FfxAssetComponent,
    PageNotFoundComponent,
    PleaseLogInComponent,
    FooterComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
