import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

import { BSHeaderModule } from './layouts/bs-header/bs-header.module';
// import { LoginComponent } from './pages/auth/login.component';
import { BOCommonModule } from '@app/common/bo-common.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    BOCommonModule,
    BSHeaderModule
  ],
  declarations: [
    MainComponent,
    // LoginComponent
  ],
  exports : [
    MainComponent
  ]

})
export class MainModule { }
