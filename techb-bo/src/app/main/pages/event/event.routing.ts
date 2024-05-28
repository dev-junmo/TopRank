import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event.component';
// import { CouponListPage } from './coupon-list/coupon-list.page';
// import { CouponCreatePage } from './coupon-create/coupon-create.page';
// import { OnlineCouponCreatePage } from './online-coupon-create/online-coupon-create.page';
import { EmoneyCreatePage } from './emoney-create/emoney-create.page';
import { EventListPage } from './event/event-list/event-list.page';
import { EventUpdatePage } from './event/event-update/event-update.page';
import { EventPlanShopListPage } from './planshop/event-planshop-list/event-planshop-list.page';
import { EventPlanShopUpdatePage } from './planshop/event-planshop-update/event-planshop-update';
import { EventPlanShopUpdate2Page } from './planshop/event-planshop-update2/event-planshop-update2';
import { DiscountEventListPage } from './discount-event/discount-event-list/discount-event-list.page';
import { DiscountEventUpdatePage } from './discount-event/discount-event-update/discount-event-update.page';
import { PlanShopConfigUpdatePage } from './planshop/planshop-config/planshop-config-update.page';
import { CouponListPage } from './coupon/coupon-list/coupon-list.page';
import { CouponUpdatePage } from './coupon/coupon-update/coupon-update.page';

const routes: Routes = [{

    path: '',
    component: EventComponent,
    children: [
        { path: '', redirectTo: 'planshop/list'},

        //event crud
        { path: 'event', redirectTo: 'event/list',  pathMatch: 'full' },
        { path: 'event/list', component: EventListPage },
        { path: 'event/create', component: EventUpdatePage },
        { path: 'event/update/:id', component: EventUpdatePage },

        //planshop crud
        { path: 'planshop', redirectTo: 'planshop/list',  pathMatch: 'full' },
        { path: 'planshop/config', component: PlanShopConfigUpdatePage },
        { path: 'planshop/list', component: EventPlanShopListPage },
        { path: 'planshop/create', component: EventPlanShopUpdatePage },
        { path: 'planshop/update/:id', component: EventPlanShopUpdatePage },

        { path: 'planshop/create2', component: EventPlanShopUpdate2Page },
        { path: 'planshop/update2/:id', component: EventPlanShopUpdate2Page },

        //discount event crud
        //planshop crud
        { path: 'discount', redirectTo: 'discount/list',  pathMatch: 'full' },
        { path: 'discount/list', component: DiscountEventListPage },
        { path: 'discount/create', component: DiscountEventUpdatePage },
        { path: 'discount/update/:id', component: DiscountEventUpdatePage },

        // coupon
        { path: 'coupon', redirectTo: 'coupon/list',  pathMatch: 'full' },
        { path: 'coupon/list', component: CouponListPage },
        { path: 'coupon/create', component: CouponUpdatePage },
        { path: 'coupon/update/:id', component: CouponUpdatePage },

        // print coupon
        { path: 'coupon-print/list',  redirectTo: 'coupon/list' },
        { path: 'coupon-print/create/:type', component: CouponUpdatePage },

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }

/*
const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolver
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];
*/


