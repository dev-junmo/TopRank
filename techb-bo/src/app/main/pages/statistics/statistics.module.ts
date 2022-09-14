import { StatisticsRoutingModule } from './statistics.routing';
import { StatisticsComponent } from './statistics.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';

import { BSCommonModule } from '@bricks/common/bs-common.module';
import { BOCommonModule } from '@app/common/bo-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// query form
import { VisitStatisticsQueryForm } from './query-form/visit-statistics-query-form/visit-statistics-query-form';
import { SalesStatisticsQueryForm } from './query-form/sales-statistics-query-form/sales-statistics-query-form';

// page

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

// 상품통계
import { CartStatisticsComponent } from './goods/cart-statistics/cart-statistics.component';
import { RefererGoodsStatisticsComponent } from './goods/referer-goods-statistics/referer-goods-statistics.component';
import { SearchGoodsStatisticsComponent } from './goods/search-statistics/search-statistics.component';


import { YearQueryForm } from './query-form/year-query-form/year-query-form';
import { CartQueryForm } from './query-form/cart-query-form/cart-query-form';
import { RefererQueryForm } from './query-form/referer-query-form/referer-query-form';

import { YearMonthDayQueryForm } from './query-form/year-month-day-query-form/year-month-day-query-form';
import { KeywordQueryForm } from './query-form/keyword-query-form/keyword-query-form';


import { BSBaseStore } from '@app/common/store/bs-base.store';
import { StatisticsStore } from '@app/common/store/statistics.store';
import { BrandStore } from '@app/common/store/brand.store';

import { BsChartModule } from '@bricks/ui/bs-chart/bs-chart.module';

@NgModule({
    imports: [
        CommonModule,
        StatisticsRoutingModule,
        BOCommonModule,
        BSCommonModule,
        BsChartModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [

        StatisticsComponent,
        
        // query form
        VisitStatisticsQueryForm,
        SalesStatisticsQueryForm,
        
        // 고객통계
        GenderStatisticsComponent,
        AgeStatisticsComponent,
        DayOfWeekStatisticsComponent,
        HourlyStatisticsComponent,
        ReferStatisticsComponent,

        // 매출통계
        AllSalesStatisticsComponent,
        CategorySalesStatisticsComponent,
        ProviderSalesStatisticsComponent,
        PaymentSalesStatisticsComponent,
        GoodsStatisticsComponent,

        // 상품통계
        CartStatisticsComponent,
        RefererGoodsStatisticsComponent,
        SearchGoodsStatisticsComponent,
    
        ///////////////////////////////////
        // 미사용 
        YearQueryForm,
        YearMonthDayQueryForm,
        CartQueryForm,
        RefererQueryForm,
        KeywordQueryForm,
    ],
    providers: [
        DecimalPipe,
        BSBaseStore,
        StatisticsStore,
        BrandStore,    
    ]
})
export class StatisticsModule { }
