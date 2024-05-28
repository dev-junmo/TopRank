import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../../../../../common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { MainRoutingModule } from '../../../../main.routing';

////////////////////////////////////////////////////////////////////////////////////////////////

import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

// import { BoardContentStore } from './../../store/board-content.store';
// import { CategoryStore } from '../../store/category.store';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface , SwiperModule} from 'ngx-swiper-wrapper';
import { BSCommonModule } from '../../../../../../../common/bs-common.module';
// const SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// }
import { ResponsiveDefinition } from '../../../../../../../environments/environment';
import { PaymentRoutingModule } from './payment.routing';
import { PaymentComponent } from './payment.component';
import { PointChargePageComponent } from './pages/point-charge/point-charge.page';
import { PurchaseKeywordPageComponent } from './pages/purchase-keyword/purchase-keyword.page';
import { PointChargeCompletedPageComponent } from './pages/point-charge-completed/point-charge-completed.page';
import { PurchaseKeywordCompletedPageComponent } from './pages/purchase-keyword-completed/purchase-keyword-completed.page';

import { MainCommonModule } from '../../../../common/main-common.module';
import { PaymentStore } from '../../../../../../store/payment.store';
import { GoodsStore } from '../../../../../../store/goods.store';

@NgModule({
  imports: [
    PaymentRoutingModule,
    //SwiperModule,
    //BSCommonUIModule,
    BSCommonModule,
    CommonModule,
    ResponsiveModule,
    SwiperModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainCommonModule
  ],
  
  declarations: [
    PaymentComponent,

    // Views
    PointChargePageComponent,
    PurchaseKeywordPageComponent,
    PointChargeCompletedPageComponent,
    PurchaseKeywordCompletedPageComponent,


    /////////////////////////////////////////////////
 
  ],
  providers: [
    { provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
    // BoardContentStore,
    // CategoryStore,
    //MainStore
    PaymentStore,
    GoodsStore,
  ],
  exports : [
    
  ]
})
export class PaymentModule { }
