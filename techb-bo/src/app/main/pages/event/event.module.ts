import { EventRoutingModule } from './event.routing';
import { EventComponent } from './event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// 기본 모듈 입니다.
import { BOCommonModule } from '@app/common/bo-common.module';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { BoardModule } from '../board/board.module';

// 리스트페이지의 경우 넣어주세요.
import { DataTableModule } from '@app/common/data-table/index';
import { BoardContentStore } from '@app/common/store/board-content.store';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { GradeStore } from '../../../common/store/grade.store';
import { ConfigStore } from '../../../common/store/config.store';
import { EventStore } from '../../../common/store/event.store';
import { CouponStore } from '../../../common/store/coupon.store';
//import { CouponCreatePage } from './coupon-create/coupon-create.page';
import { BoardStore } from '../../../common/store/board.store';
import { AuctionStore } from '../../../common/store/auction.store';
//import { OnlineCouponCreatePage } from './online-coupon-create/online-coupon-create.page';
import { EmoneyCreatePage } from './emoney-create/emoney-create.page';
// event
import { EventListPage } from './event/event-list/event-list.page';
import { EventQueryForm } from './event/event-list/event-query-form/event-query-form';
import { EventUpdatePage } from './event/event-update/event-update.page';
// planshop
import { EventPlanShopListPage } from './planshop/event-planshop-list/event-planshop-list.page';
import { EventPlanShopQueryForm } from './planshop/event-planshop-list/event-planshop-query-form/event-planshop-query-form';
import { EventPlanShopUpdatePage } from './planshop/event-planshop-update/event-planshop-update';
import { EventPlanShopUpdate2Page } from './planshop/event-planshop-update2/event-planshop-update2';

import { DiscountEventUpdatePage } from './discount-event/discount-event-update/discount-event-update.page';
import { DiscountEventListPage } from './discount-event/discount-event-list/discount-event-list.page';
import { DiscountEventQueryForm } from './discount-event/discount-event-list/discount-event-query-form/discount-event-query-form';
import { PlanShopConfigUpdatePage } from './planshop/planshop-config/planshop-config-update.page';
//coupon
import { CouponQueryForm } from './coupon/coupon-list/coupon-query-form/coupon-query-form';
import { CouponListPage } from './coupon/coupon-list/coupon-list.page';
import { CouponUpdatePage } from './coupon/coupon-update/coupon-update.page';
import { CouponIssueListPage } from './coupon/coupon-issue-list/coupon-issue-list.page';
import { CouponIssueQueryForm } from './coupon/coupon-issue-list/coupon-issue-query-form/coupon-issue-query-form';
import { CouponIssueView } from './coupon/coupon-issue/coupon-issue.view';
import { BenefitsListItemView } from './coupon/benefits-list-item-view/benefits-list-item.view';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    BOCommonModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    BoardModule

  ],
  declarations: [
    EventComponent,
    // CouponQueryForm,
    EventQueryForm,
    CouponListPage,
    BenefitsListItemView,
    CouponIssueView,
    //CouponCreatePage,
    //OnlineCouponCreatePage,
    EmoneyCreatePage,

    EventListPage,
    EventUpdatePage,

    //planshop
    EventPlanShopListPage,
    EventPlanShopQueryForm,
    EventPlanShopUpdatePage,
    EventPlanShopUpdate2Page,
    PlanShopConfigUpdatePage,

    //discount event
    DiscountEventQueryForm,
    DiscountEventListPage,
    DiscountEventUpdatePage,

    //coupon
    CouponQueryForm,
    CouponListPage,
    BenefitsListItemView,
    CouponIssueView,
    CouponUpdatePage,
    CouponIssueListPage,
    CouponIssueQueryForm,
    //PrintCouponUpdatePage,

  ],
  providers:[
     ConfigStore, CouponStore , BoardStore,
     BoardContentStore, EventStore, AuctionStore
  ]
})
export class EventModule { }
