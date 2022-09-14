import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-toggle-switch';

// 기본 모듈 입니다.
import { BOCommonModule } from '@app/common/bo-common.module';

// 리스트페이지의 경우 넣어주세요.
import { DataTableModule } from '@app/common/data-table/index';


//product 
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product.routing';
import { GoodsQueryForm } from './goods/goods-query-form/goods-query-form';
import { ProductQueryForm } from './product/product-query-form/product-query-form';

//page
import { ProductListPage } from './product/product-list.page'
import { GoodsListPage } from './goods/goods-list.page';

// store
import { ProductListStore } from '@app/common/store/product-list.store';
import { GoodsStore } from '@app/common/store/goods.store';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    BOCommonModule,
    UiSwitchModule,

    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DataTableModule,
    BOCommonModule,
  ],
  declarations: [
 
    //product
    ProductComponent,
    ProductQueryForm,   
    ProductListPage,

    //goods
    GoodsQueryForm,
    GoodsListPage 

  ],
  providers: [
    ProductListStore,
    GoodsStore,
    
  ]
})

export class ProductModule { }
