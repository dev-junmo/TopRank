import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../../../../../common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

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
// import { MypagePageComponent } from './pages/mypage/maypage.page';
// import { SectionComponent } from './section.component';

import { MypageRoutingModule } from './mypage.routing';
import { MypageComponent } from './mypage.component';
import { MypageHomePage } from './pages/mypage-home/mypage-home.page'; 
import { MypageNavigationView } from './layout/mypage-navigation/mypage-navigation.view';

//import { PointHistoryPageComponent } from './pages/point-history/point-history.page';
import { PointChargeHistoryPageComponent } from './pages/point-charge-history/point-charge-history.page';
import { PointChargeQueryForm } from './pages/point-charge-history/point-charge-query-form/point-charge-query-form';

import { PointQueryForm } from './pages/point-history/pages/point-history-list/point-query-form/point-query-form'; 
import { PointHistoryListPageComponent } from './pages/point-history/pages/point-history-list/point-history-list.page';
import { RewardPointQueryForm } from './pages/point-history/pages/reward-point-history-list/reward-point-query-form/reward-point-query-form';
import { RewardPointHistoryListPageComponent } from './pages/point-history/pages/reward-point-history-list/reward-point-history-list.page';

import { InquiryHistoryPageComponent } from './pages/inquiry-history/inquiry-history.page';
import { EditProfilePageComponent } from './pages/edit-profile/edit-profile.page';

import { PointUsageQueryForm } from './pages/point-usage-history/point-usage-query-form/point-usage-query-form';  
import { PointUsageHistoryPageComponent } from './pages/point-usage-history/point-usage-history.page';

// stores
import { MemberStore } from '../../../../../../store/member.store';
import { ProductStore } from '../../../../../../store/product.store';
import { PointStore } from '../../../../../../store/point.store';
import { PointChargeStore } from '../../../../../../store/point-charge.store';
import { OrderStore } from '../../../../../../store/order.store';
import { RewardStore } from '../../../../../../store/reward.store';
import { MypagePointHistoryPage } from './pages/mypage-point-history/mypage-point-history.page';

@NgModule({
  imports: [
    MypageRoutingModule,
    //SwiperModule,
    //BSCommonUIModule,
    BSCommonModule,
    CommonModule,
    ResponsiveModule,
    SwiperModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  
  declarations: [
    MypageComponent,
    MypageHomePage,
    MypagePointHistoryPage,
    MypageNavigationView,

    //PointHistoryPageComponent,
    PointQueryForm,    
    PointHistoryListPageComponent,  
    RewardPointQueryForm,    
    RewardPointHistoryListPageComponent,
    
    PointChargeQueryForm,    
    PointChargeHistoryPageComponent,

    PointUsageQueryForm,
    PointUsageHistoryPageComponent,
    
    InquiryHistoryPageComponent,
    EditProfilePageComponent,
 
  ],
    providers: [
        { provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
        MemberStore,
        ProductStore,
        PointStore,
        PointChargeStore,
        OrderStore,
        RewardStore,
    ],
    exports : [
    
    ]
})
export class MypageModule { }
