import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmComponent } from './crm.component';
import { CrmMemberComponent } from './pages/crm-member/crm-member.component';
import { CrmHomeComponent } from './pages/crm-home/crm-home.component';
import { CrmActivityComponent } from './pages/crm-activity/crm-activity.component';
import { CrmOrderListPage } from './pages/crm-order/order-list.page';
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

const routes: Routes = [
  { path: ':id', component: CrmComponent,
    children: [
      { path: '', component: CrmMemberComponent },
      { path: 'member', component: CrmMemberComponent },
      // { path: 'member/:id', component: CrmMemberComponent},
      { path: 'activity', component: CrmActivityComponent },
      { path: 'order', component: CrmOrderListPage },
      { path: 'return', component: CrmReturnComponent },
      { path: 'refund', component: CrmRefundComponent },
      { path: 'emoney', component: CrmEmoneyComponent },
      { path: 'point', component: CrmPointComponent },
      { path: 'coupon', component: CrmCouponComponent },
      { path: 'review', component: CrmReviewComponent },
      { path: 'qna', component: CrmQnaComponent },
      { path: 'dqna', component: CrmDqnaComponent },
      { path: 'cshistory', component: CrmCshistoryComponent },
      { path: 'log', component: CrmLogComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutingModule { }
