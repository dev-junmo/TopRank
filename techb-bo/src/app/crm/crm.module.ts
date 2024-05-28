import { NgModule , Pipe } from '@angular/core';

import { BOCommonModule } from '../common/bo-common.module';
import { CrmComponent } from './crm.component';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor,  } from '@angular/forms';
import { CrmRoutingModule } from './crm.routing';
// import { BSHeaderComponent } from '../pages/layouts/bs-header/bs-header.component';
import { CrmSidemenuComponent } from './layout/crm-sidemenu/crm-sidemenu.component';
import { CrmMemberComponent } from './pages/crm-member/crm-member.component';
import { CrmHeaderComponent } from './layout/crm-header/crm-header.component';
import { CommonModule } from '@angular/common';
import { CrmHomeComponent } from './pages/crm-home/crm-home.component';
import { MemberListStore } from '../common/store/member-list.store';
import { CrmActivityComponent } from './pages/crm-activity/crm-activity.component';
import { CrmOrderListPage } from './pages/crm-order/order-list.page';
import { OrderQueryForm } from './pages/crm-order/order-query-form/order-query-form';

import { CrmReturnComponent } from './pages/crm-return/crm-return.component';
import { CrmRefundComponent } from './pages/crm-refund/crm-refund.component';
import { CrmEmoneyComponent } from './pages/crm-emoney/crm-emoney.component';
import { CrmPointComponent } from './pages/crm-point/crm-point.component';
import { CrmCouponComponent } from './pages/crm-coupon/crm-coupon.component';
import { CrmReviewComponent } from './pages/crm-review/crm-review.component';
import { CrmQnaComponent } from './pages/crm-qna/crm-qna.component';
import { CrmDqnaComponent } from './pages/crm-dqna/crm-dqna.component';
import { CrmCshistoryComponent } from './pages/crm-cshistory/crm-cshistory.component';
import { CrmLogComponent } from './pages/crm-log/crm-log.component';

import { DataTableModule } from '@app/common/data-table/index';

import { BoardStore } from '../common/store/board.store';
import { BoardContentStore } from '../common/store/board-content.store';
import { CrmSideConsultComponent } from './layout/crm-side-consult/crm-side-consult.component';


@NgModule({
  imports: [
    CrmRoutingModule,
    BOCommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule
  ],
  declarations: [
    CrmComponent, CrmMemberComponent ,CrmSidemenuComponent, CrmHeaderComponent, CrmSideConsultComponent,
    CrmHomeComponent, CrmActivityComponent, CrmOrderListPage, CrmReturnComponent,
    CrmRefundComponent, CrmEmoneyComponent, CrmPointComponent, CrmCouponComponent,
    CrmReviewComponent, CrmQnaComponent, CrmDqnaComponent, CrmCshistoryComponent, CrmLogComponent,OrderQueryForm
  ],
  providers: [MemberListStore ,  BoardStore, BoardContentStore,
]
})
export class CrmModule { }
