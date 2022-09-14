import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeStatusComponent } from './status/status.component';
import { HomeDashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent,      
    children: [
      { path: '', redirectTo: 'dashboard',  pathMatch: 'full'},
      // 주차현황
      { path: 'dashboard', component: HomeDashboardComponent },
      { path: 'status', component: HomeStatusComponent },
    ]
  },
  
];

// const routes: Routes = [
//   {
//       path: '',
//       component: GoodsComponent,
//       children: [
//           { path: '', redirectTo: 'goods/list',  pathMatch: 'full'},

//           // 일반상품
//           { path: 'goods', redirectTo: 'goods/list',  pathMatch: 'full' },
//           { path: 'goods/list', component: GoodsListPage },
//           // { path: 'goods/update/:id', component: GoodsCreateComponent },
//           // { path: 'goods/create', component: GoodsCreateComponent },

//           // 티켓상품
//           { path: 'goods-ticket', redirectTo: 'goods-ticket/list',  pathMatch: 'full' },
//           { path: 'goods-ticket/list', component: GoodsListPage },
//           // { path: 'goods-ticket/update/:id', component: GoodsCreateComponent },
//           // { path: 'goods-ticket/create', component: GoodsCreateComponent },
    
//           // 패키지/복합상품
//           // { path: 'package', redirectTo: 'package/list',  pathMatch: 'full' },
//           // { path: 'package/list', component: GoodsPackageListPage },
//           // { path: 'package/update/:id', component: PackageGoodsCreateComponent },
//           // { path: 'package/create', component: PackageGoodsCreateComponent },
    
//           // 스타옥션
//           { path: 'auction', redirectTo: 'auction/list',  pathMatch: 'full' },
//           { path: 'auction/list', component: GoodsAuctionListPage },
//           // { path: 'auction/update/:id', component: GoodsCreateComponent },
//           // { path: 'auction/create', component: GoodsCreateComponent },

//           // 사은품
//           { path: 'gift', redirectTo: 'gift/list',  pathMatch: 'full' },
//           { path: 'gift/list', component: GiftListPage },
//           { path: 'gift/update/:id', component: GiftCreateComponent },
//           { path: 'gift/create', component: GiftCreateComponent },

//           //일괄변경
//           { path: 'batch/icon', component: BatchIconPage },
//           { path: 'batch/price', component: BatchPricePage },
//           { path: 'batch/new', component: NewBatchComponent },
//           { path: 'batch/category', component: BatchCategoryPage },
//           { path: 'batch/basic_info', component: BatchBasicInfoPage },
//           { path: 'batch/sale_point', component: BatchSalePointPage },
          
//           { path: 'batch/sale_point', component: BatchSalePointPage },
//           { path: 'batch/naverep', component: BatchNaverEpPage },
//           { path: 'batch/common_info', component: BatchCommonInfoPage },
//           { path: 'batch/delivery', component: BatchEmoneyDeliveryPage },
//           { path: 'batch/goods', component: BatchGoodsComponent },
//           { path: 'batch/notice', component: BatchNoticePage },
          
//           // 재고관리
//           { path: 'stock', redirectTo: 'stock/list',  pathMatch: 'full' },
//           { path: 'stock/list', component: StockListPage },

//           // 재입고 관리
//           { path: 'restock', redirectTo: 'restock/list',  pathMatch: 'full' },
//           { path: 'restock/list', component: RestockListPage },

//           // 미정리
//           { path: 'batch/goods_info_noti', component: BatchGoodsInfoNotiPage },
//           { path: 'batch/goods_info', component: BatchGoodsInfoPage },
//           { path: 'batch/recommend_goods', component: BatchRecommendGoodsPage },
//           { path: 'category', component: CategoryComponent },
//           { path: 'brand', component: BrandComponent },
//           { path: 'program', component: ProgramComponent },

//           // icon
//           { path: 'icon', redirectTo: 'icon/list',  pathMatch: 'full' },
//           { path: 'icon/list', component: GoodsIconListComponent },
//           { path: 'icon/create', component: GoodsIconUpdateComponent },
//           { path: 'icon/update/:id', component: GoodsIconUpdateComponent },

//           // common
//           { path: 'common-info', redirectTo: 'common-info/list',  pathMatch: 'full' },
//           { path: 'common-info/list', component: GoodsCommonInfoListComponent },
//           { path: 'common-info/create', component: GoodsCommonInfoUpdateComponent },
//           { path: 'common-info/update/:id', component: GoodsCommonInfoUpdateComponent },

//           //gallery list
//           { path: 'gallery', redirectTo: 'gallery/list',  pathMatch: 'full' },
//           { path: 'gallery/list', component: GoodsGalleryListPage },
//           { path: 'gallery/create', component: GoodsGalleryListPage },
//           { path: 'gallery/update/:id', component: GoodsGalleryUpdatePage },

//       // { path: 'goods-gallery/:id', component: GoodsGalleryList },
//       ]
//   },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
