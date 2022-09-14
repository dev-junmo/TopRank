// import { Component, OnInit } from '@angular/core';
// import { Router } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';
// import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

// import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
// import { BSBaseStore } from '@app/common/store/bs-base.store';

// @Component({
//   selector: 'app-grade-benefit-update',
//   templateUrl: './grade-benefit-update.component.html',
//   styleUrls: ['./grade-benefit-update.component.css']
// })
// export class GradeBenefitUpdateComponent extends BSUpdateFormController  {

//   constructor(
//     baseStore: BSBaseStore,
//     protected router: Router,
//     route: ActivatedRoute,
//     alert: BSAlertService) {
//       super(baseStore, router, route, alert);
//   }

// initController(config: any) {
//   console.log("BSUpdateFormController::initController command=", config);

//   config.store.command = 'admin/member/membergroup';
//   config.store.id = '';

//   return config;
// }


// preparedFormControlsConfig() {

//   let config = {
//     sale_title : [],
//     sale_use: [],
//     sale_limit_price: [],
//     // sale_price_type: [],
//     sale_option_price: [],
//     // sale_option_price_type:[],
//     sale_price: [],
//     point_use: [],
//     point_limit_price: [],
//     point_price: [],
//     reserve_price: [],
//   };

//    return config;
//  }

//  preparedLoadData(resp) {
//   console.log("BSUpdateFormController::preparedLoadData resp =", resp);


//   if (resp.use_type === "AUTO") {
//     resp['order_sum_ea[0]']  = resp.order_sum_ea;
//     resp['order_sum_cnt[0]']  = resp.order_sum_cnt;
//     resp['order_sum_price[0]']  = resp.order_sum_price;
//     resp['order_sum_use[0]'] = resp.order_sum_use;

//   } else if ( resp.use_type === "AUTOPART") {
//     resp['order_sum_ea[1]']  = resp.order_sum_ea;
//     resp['order_sum_cnt[1]']  = resp.order_sum_cnt;
//     resp['order_sum_price[1]']  = resp.order_sum_price;
//     resp['order_sum_use[1]'] = resp.order_sum_use;
//   }

//   return resp;
//  }

//  preparedSaveData(value) {
//   console.log("BSUpdateFormController::preparedLoadData resp =", value);

//   return value;
// }

// }
