import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsComponent } from './statistics.component';

// pages

// 고객통계
import { GenderStatisticsComponent } from './member/gender-statistics/gender-statistics.component';
import { AgeStatisticsComponent } from './member/age-statistics/age-statistics.component';
import { DayOfWeekStatisticsComponent } from './member/dayofweek-statistics/dayofweek-statistics.component';
import { HourlyStatisticsComponent } from './member/hourly-statistics/hourly-statistics.component';
import { ReferStatisticsComponent } from './member/refer-statistics/refer-statistics.component';

// 매출통계
import { AllSalesStatisticsComponent } from './sales/all-sales-statistics/all-sales-statistics.component';
import { CategorySalesStatisticsComponent } from './sales/category-sales-statistics/category-sales-statistics.component';
import { ProviderSalesStatisticsComponent } from './sales/provider-sales-statistics/provider-sales-statistics.component';
import { PaymentSalesStatisticsComponent } from './sales/payment-sales-statistics/payment-sales-statistics.component';
import { GoodsStatisticsComponent } from './sales/goods-sales-statistics/goods-statistics.component';

import { CartStatisticsComponent } from './goods/cart-statistics/cart-statistics.component';
import { RefererGoodsStatisticsComponent } from './goods/referer-goods-statistics/referer-goods-statistics.component';
import { SearchGoodsStatisticsComponent } from './goods/search-statistics/search-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: [
        { path: '', redirectTo: 'sales/all-sales-statistics', pathMatch: 'full' },

        //매출 통계
        { path: 'sales/all-sales-statistics', component: AllSalesStatisticsComponent },
        { path: 'sales/category-sales-statistics', component: CategorySalesStatisticsComponent },
        { path: 'sales/provider-sales-statistics', component: ProviderSalesStatisticsComponent },
        { path: 'sales/payment-sales-statistics', component: PaymentSalesStatisticsComponent },
        { path: 'sales/goods-sales-statistics', component: GoodsStatisticsComponent },
   
        //상품통계
        { path: 'goods/cart-statistics', component: CartStatisticsComponent },
        { path: 'goods/referer-statistics', component: RefererGoodsStatisticsComponent},
        { path: 'goods/search-statistics', component: SearchGoodsStatisticsComponent },

        //고객통계
        { path: 'member/gender-statistics', component: GenderStatisticsComponent },
        { path: 'member/age-statistics', component: AgeStatisticsComponent },
        { path: 'member/day-statistics', component: DayOfWeekStatisticsComponent },
        { path: 'member/hourly-statistics', component: HourlyStatisticsComponent },
        { path: 'member/refer-statistics', component: ReferStatisticsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }

/*
const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolver
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];
*/

