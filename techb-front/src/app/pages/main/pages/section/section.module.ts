import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../../../common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { MainRoutingModule } from '../../main.routing';
// import { MainComponent } from './main.component';


// techb
// import { TBFooterComponent } from '../../layouts/tb-footer/tb-footer.component';
// import { TBHeaderComponent } from '../../layouts/tb-header/tb-header.component';
// import { TBSidemenuComponent } from '../../layouts/tb-sidemenu/tb-sidemenu.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.page';
//import { HomePageComponent } from '../home/pages/home.page';
import { SearchKeywordPageComponent } from './pages/search-keyword/search-keyword.page';
import { RankingSearchPageComponent } from './pages/ranking-search/ranking-search/ranking-search.page';
import { TrendPageComponent } from './pages/trend/trend.page';
import { PopularKeywordPageComponent } from './pages/popular-keyword/popular-keyword.page';


// Views
import { PopularRankingView } from './pages/ranking-search/ranking-search/rank-search-result-view/popular-ranking-view/popular-ranking.view';
import { RecentSearchHistoryView } from './pages/ranking-search/ranking-search/rank-search-result-view/recent-search-history-view/recent-search-history.view';
import { RankSearchResultView } from './pages/ranking-search/ranking-search/rank-search-result-view/rank-search-result.view';

////////////////////////////////////////////////////////////////////////////////////////////////

import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface , SwiperModule} from 'ngx-swiper-wrapper';
import { BSCommonModule } from '../../../../../common/bs-common.module';
import { ResponsiveDefinition } from '../../../../../environments/environment';


import { SectionComponent } from './section.component';
import { SectionRoutingModule } from './section.routing';

import { TBFooterComponent } from './layouts/tb-footer/tb-footer.component';
import { TBHeaderComponent } from './layouts/tb-header/tb-header.component';
import { BoardModule } from './pages/board/board.module';
import { MypageModule } from './pages/mypage/mypage.module';
import { RankingTrackingDetailPageComponent } from './pages/ranking-search/ranking-tracking-detail/ranking-tracking-detail.page';
import { SubscriptionModule } from './pages/subscription/subscription.module';
import { PaymentModule } from './pages/payment/payment.module';
import { MainCommonModule } from '../../common/main-common.module';

import { KeywordStore } from '../../../../store/keyword.store'; 

@NgModule({
  imports: [
    SectionRoutingModule,
    //SwiperModule,
    //BSCommonUIModule,
    BSCommonModule,
    CommonModule,
    MainCommonModule,
    ResponsiveModule,
    SwiperModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    BoardModule,
    MypageModule,
    SubscriptionModule,
    PaymentModule,
  ],
  
  declarations: [
    SectionComponent,

    TBFooterComponent,
    TBHeaderComponent,

    DashboardPageComponent,
    
    SearchKeywordPageComponent,
    RankingSearchPageComponent,
    RankingTrackingDetailPageComponent,
    TrendPageComponent, 
    PopularKeywordPageComponent,

    // Views
    RankSearchResultView,
    PopularRankingView,
    RecentSearchHistoryView,

    /////////////////////////////////////////////////
 
  ],
  providers: [
    { provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
        KeywordStore, 
    // GoodsStore,
    // BoardContentStore,
    // CategoryStore,
    //MainStore
  ],
  exports : [
    
  ]
})
export class SectionModule { }
