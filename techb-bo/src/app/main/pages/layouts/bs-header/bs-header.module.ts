//import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BSHeaderComponent } from '../bs-header/bs-header.component';
import { BSAccountBoxComponent } from './bs-account-box/bs-account-box.component';
import { BSLogoComponent } from './bs-logo/bs-logo.component';
import { BSTopMenuComponent } from './bs-top-menu/bs-top-menu.component';

@NgModule({
  declarations: [
    BSHeaderComponent,

    BSAccountBoxComponent,
    BSLogoComponent,
    BSTopMenuComponent
  ],
  imports: [
    //BrowserModule,
    HttpModule,
    RouterModule
  ],
  exports : [
    BSHeaderComponent
  ],
  providers: []
})
export class BSHeaderModule { }
