import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculateRoutingModule } from './calculate.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 기본 모듈 입니다.
import { BOCommonModule } from '@app/common/bo-common.module';

// 리스트페이지의 경우 넣어주세요.
import { DataTableModule } from '@app/common/data-table/index';

import { CalculateComponent } from './calculate.component';
import { CalculateListPage } from './calculate-list/calculate-list.page';
import { calculateQueryForm } from './calculate-list/calculate-query-form/calculate-query-form';

import { SaleListPage } from './sale-list/sale-list.page';
import { SaleList2Page } from './sale-list2/sale-list2.page';

import { SaleQueryForm } from './sale-list/sale-query-form/sale-query-form';
import { SaleQueryForm2 } from './sale-list2/sale-query-form2/sale-query-form2';

import { HoldListPage } from './hold-list/hold-list.page';
import { HoldQueryForm } from './hold-list/hold-query-form/hold-query-form';

import { CalculateList2Page } from './calculate-list2/calculate-list2.page';
import { calculateQueryForm2 } from './calculate-list2/calculate-query-form2/calculate-query-form2';

import { SettlementListPage } from './settlement-list/settlement-list.page';
import { SettlementQueryForm } from './settlement-list/settlement-query-form/settlement-query-form';

import { TaxStatusListPage } from './taxstatus-list/taxstatus-list.page';
import { taxstatusQueryForm } from './taxstatus-list/taxstatus-query-form/taxstatus-query-form';
import { PgCheckPage } from './pg-check/pg-check.component';

@NgModule({
  imports: [
    CommonModule,
    BOCommonModule,
    CalculateRoutingModule,
    DataTableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CalculateComponent,
    CalculateListPage,
    CalculateList2Page,
    SettlementListPage,
    SettlementQueryForm,
    calculateQueryForm,
    calculateQueryForm2,
    SaleListPage,
    SaleList2Page,
    HoldListPage,
    PgCheckPage,
    SaleQueryForm,
    SaleQueryForm2,
    HoldQueryForm,
    TaxStatusListPage,
    taxstatusQueryForm

  ]
})
export class CalculateModule { }
