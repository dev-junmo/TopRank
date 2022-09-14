import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../../../common/app-common.module';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { MainRoutingModule } from '../../main.routing';
// import { MainComponent } from './main.component';


////////////////////////////////////////////////////////////////////////////////////////////////

import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

// import { BoardContentStore } from './../../store/board-content.store';
// import { CategoryStore } from '../../store/category.store';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface , SwiperModule} from 'ngx-swiper-wrapper';
import { BSCommonModule } from '../../../../../common/bs-common.module';
// const SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// }
import { ResponsiveDefinition } from '../../../../../environments/environment';
import { HomeRoutingModule } from './home.routing';
// import { MypagePageComponent } from './pages/mypage/maypage.page';
// import { SectionComponent } from './section.component';

import { HomeComponent } from './home.component';
import { HomePageComponent } from '../home/pages/home/home.page';

import { TBFooterComponent } from './layouts/tb-footer/tb-footer.component';
import { TBHeaderComponent } from './layouts/tb-header/tb-header.component';
import { MainCommonModule } from '../../common/main-common.module';
import { MockStore } from '../../../../store/mock.store';

@NgModule({
  imports: [
    HomeRoutingModule,
    //SwiperModule,
    //BSCommonUIModule,
    BSCommonModule,
    CommonModule,
    MainCommonModule,
    ResponsiveModule,
    SwiperModule,
    AppCommonModule,
    FormsModule,
  ],
  
  declarations: [
    // SectionComponent,

    TBFooterComponent,
    TBHeaderComponent,
    HomeComponent,
    HomePageComponent,

    // DashboardPageComponent,
    // HomePageComponent,
    // SearchKeywordPageComponent,
    // RankingSearchPageComponent,
    // ProductsPageComponent,
    // TrendPageComponent, 
    // PopularKeywordPageComponent,
    // BoardPageComponent,
    // MypagePageComponent,

    /////////////////////////////////////////////////
 
  ],
  providers: [
    { provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
    MockStore,
    // GoodsStore,
    // BoardContentStore,
    // CategoryStore,
    //MainStore
  ],
  exports : [
    
  ]
})
export class HomeModule { }
