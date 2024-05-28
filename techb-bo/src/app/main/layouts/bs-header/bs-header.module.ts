import { BOCommonModule } from './../../../common/bo-common.module';
import { BSSearchBoxComponent } from './bs-search-box/bs-search-box.component';
import { CommonModule } from '@angular/common';

//import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BSHeaderComponent } from '../bs-header/bs-header.component';
import { BSAccountBoxComponent } from './bs-account-box/bs-account-box.component';
import { BSLogoComponent } from './bs-logo/bs-logo.component';
import { BSTopMenuComponent } from './bs-top-menu/bs-top-menu.component';
import { ToolBoxComponent } from './app-tool-box/app-tool-box.component';

@NgModule({
  declarations: [
    BSHeaderComponent,

    BSAccountBoxComponent,
    BSLogoComponent,
    BSTopMenuComponent,
    ToolBoxComponent,
    BSSearchBoxComponent,

  ],
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    BOCommonModule
  ],
  exports : [
    BSHeaderComponent
  ],
  providers: []
})
export class BSHeaderModule { }
