import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 기본 모듈 입니다.
import { BOCommonModule } from '@app/common/bo-common.module';

import { DisplayRoutingModule } from './display.routing';

import { DisplayComponent } from './display.component';
//home
import { HomeComponent } from './home/home.component';

// store
//import { PointStore } from '@app/common/store/point.store';


@NgModule({
  imports: [
    DisplayRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BOCommonModule,
  ],
  declarations: [
    DisplayComponent,
    HomeComponent


  ],
  providers: [
    //PointStore, 
    
  ]
})

export class DisplayModule { }
