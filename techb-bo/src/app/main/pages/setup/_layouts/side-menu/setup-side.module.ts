// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SetupSideComponent } from './setup-side.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SetupSideComponent,
  ],
  imports: [
    // BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    CommonModule
  ],
  exports : [
    SetupSideComponent
  ], 
  providers: [],  
})
export class SetupSideModule { }
