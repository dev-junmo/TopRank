import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';



//기본모듈
import { BOCommonModule } from '@app/common/bo-common.module';
import { BSCommonModule } from '@bricks/common/bs-common.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

//리스트페이지의경우
import { DataTableModule } from '@app/common/data-table/index';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { DatePipe } from '@angular/common';

//order 
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order.routing';

// list
import {OrderListPage} from './order/order-list.page';

//store
import { OrderListStore } from '@app/common/store/order-list.store'; 

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    BOCommonModule,
    DataTableModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    OrderComponent,
    OrderListPage,
   
  ],
  providers:[
    OrderListStore,
  ],

})
export class OrderModule { }
