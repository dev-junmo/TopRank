import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculateComponent } from './calculate.component';
import { CalculateListPage } from './calculate-list/calculate-list.page';
import { SaleListPage } from './sale-list/sale-list.page';
import { SaleList2Page } from './sale-list2/sale-list2.page';
import { HoldListPage } from './hold-list/hold-list.page';
import { CalculateList2Page } from './calculate-list2/calculate-list2.page';
import { SettlementListPage } from './settlement-list/settlement-list.page';
import { TaxStatusListPage } from './taxstatus-list/taxstatus-list.page';
import { PgCheckPage } from './pg-check/pg-check.component';


const routes: Routes = [
  {
    path: '',
    component: CalculateComponent,
    children: [

      { path: '', redirectTo: 'sale/list',  pathMatch: 'full' },

      // 판매내역
      { path: 'sale', redirectTo: 'sale/list',  pathMatch: 'full' },
      { path: 'sale/list', component: SaleList2Page },

      // 보류정산
      { path: 'hold', redirectTo: 'hold/list',  pathMatch: 'full' },
      { path: 'hold/list', component: HoldListPage },

      // PG검수업로드
      { path: 'pg', redirectTo: 'pg/check',  pathMatch: 'full' },
      { path: 'pg/check', component: PgCheckPage },

      // 정산현황
      { path: 'calculate', redirectTo: 'calculate/list',  pathMatch: 'full' },
      { path: 'calculate/list', component: CalculateList2Page },

      // 정산현황(요약)
      { path: 'settlement', redirectTo: 'settlement/list',  pathMatch: 'full' },
      { path: 'settlement/list', component: SettlementListPage },

       // 세금계산서 발행
       { path: 'taxstatus', redirectTo: 'taxstatus/list',  pathMatch: 'full' },
       { path: 'taxstatus/list', component: TaxStatusListPage },

      // (구)판매현황
      { path: 'sale-old', redirectTo: 'calculate-old/list',  pathMatch: 'full' },
      { path: 'sale-old/list', component: SaleListPage }, //판매현황

      // (구)정산현황
      { path: 'calculate-old', redirectTo: 'calculate-old/list',  pathMatch: 'full' }, //정산현황
      { path: 'calculate-old/list', component: CalculateListPage },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculateRoutingModule { }
