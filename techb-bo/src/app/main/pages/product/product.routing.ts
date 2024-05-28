import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//product 
import { ProductComponent } from './product.component';

//page
import { GoodsListPage } from './goods/goods-list.page';
import { ProductListPage } from './product/product-list.page';


const routes: Routes = [
  {
    path: '',
    component: ProductComponent,  
    children: [

      { path: '', redirectTo: 'list'},
      { path: 'list', component: ProductListPage },      
      
      { path: 'product', redirectTo: 'product/list',  pathMatch: 'full' },
      { path: 'product/list', component: ProductListPage },

      { path: 'goods', redirectTo: 'goods/list',  pathMatch: 'full' },
      { path: 'goods/list', component: GoodsListPage },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }


