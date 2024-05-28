import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main.routing';
import { MainComponent } from './main.component';


// techb
// import { TBFooterComponent } from './layouts/tb-footer/tb-footer.component';
// import { TBHeaderComponent } from './layouts/tb-header/tb-header.component';
// import { TBSidemenuComponent } from './layouts/tb-sidemenu/tb-sidemenu.component';
// import { DashboardPageComponent } from './pages/dashboard/dashboard.page';
// import { HomePageComponent } from './pages/home/home.page';
// import { SearchKeywordPageComponent } from './pages/search-keyword/search-keyword.page';
// import { RankingSearchPageComponent } from './pages/ranking-search/ranking-search.page';
// import { ProductsPageComponent } from './pages/products/products.page';
// import { TrendPageComponent } from './pages/trend/trend.page';
// import { PopularKeywordPageComponent } from './pages/popular-keyword/popular-keyword.page';
// import { BoardPageComponent } from './pages/board/board.page';


////////////////////////////////////////////////////////////////////////////////////////////////

import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

import { BoardContentStore } from './../../store/board-content.store';
import { CategoryStore } from '../../store/category.store';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface , SwiperModule} from 'ngx-swiper-wrapper';
import { BSCommonModule } from '../../../common/bs-common.module';
// const SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// }
import { ResponsiveDefinition } from '../../../environments/environment';
// import { HomePageComponent } from './pages/home/pages/home.page';
// import { MypagePageComponent } from './pages/mypage/maypage.page';

import { SectionModule } from './pages/section/section.module';
import { HomeModule } from './pages/home/home.module';
import { TBSidemenuComponent } from './layouts/tb-sidemenu/tb-sidemenu.component';
import { MainCommonModule } from './common/main-common.module';
import { DashboardStore } from '../../store/dashboard.store';
import { FooterStore } from '../../store/footer.store';
import { BsFooterComponent } from '../../layouts/bs-footer/bs-footer.component';

@NgModule({
  imports: [
    MainRoutingModule,
    //SwiperModule,
    //BSCommonUIModule,
    BSCommonModule,
    MainCommonModule,
    CommonModule,
    ResponsiveModule,
    SwiperModule,
    AppCommonModule,
    FormsModule,

    SectionModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  
  declarations: [
    MainComponent,
    TBSidemenuComponent,
    BsFooterComponent,
    /////////////////////////////////////////////////
 
  ],
  providers: [
    { provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
    //GoodsStore,
    BoardContentStore,
    CategoryStore,
    DashboardStore,
    //MainStore
    FooterStore,
  ],
  exports : [
    
  ]
})
export class MainModule { }
