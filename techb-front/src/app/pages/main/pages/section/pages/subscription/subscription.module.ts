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
import { DataTableModule } from  '../../../../../../common/data-table';

// const SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// }
import { ResponsiveDefinition } from '../../../../../../../environments/environment';
import { SubscriptionRoutingModule } from './subscription.routing';
import { SubscriptionComponent } from './subscription.component';
import { ProductsPageComponent } from './pages/products/products.page';
import { ProductQueryForm } from './pages/products/product-query-form/product-query-form';
import { ProductDetailPageComponent } from './pages/product-detail/product-detail.page';
import { ProductStore } from '../../../../../../store/product.store';





@NgModule({
  imports: [
    SubscriptionRoutingModule,
    //SwiperModule,
    //BSCommonUIModule,
    BSCommonModule,
    CommonModule,
    ResponsiveModule,
    SwiperModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    DataTableModule // list component
  ],
  
  declarations: [
    SubscriptionComponent,

    ProductsPageComponent,
    ProductQueryForm,

    ProductDetailPageComponent,

    // Views


    /////////////////////////////////////////////////
 
  ],
  providers: [
    { provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
    // GoodsStore,
    // BoardContentStore,
    // CategoryStore,
    //MainStore
    ProductStore,
  ],
  exports : [
    
  ]
})
export class SubscriptionModule { }
