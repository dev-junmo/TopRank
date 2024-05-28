// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Router } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';
// import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

// import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
// import { BSBaseStore } from '@app/common/store/bs-base.store';

// @Component({
//   selector: 'app-ticket-goods-create',
//   templateUrl: './ticket-goods-create.component.html',
//   styleUrls: ['./ticket-goods-create.component.css']
// })
// export class TicketGoodsCreateComponent extends BSUpdateFormController {

//   private sub: any;
//   private goodsId: number;

//   constructor(
//     baseStore: BSBaseStore,
//     protected router: Router,
//     route: ActivatedRoute,
//     alert: BSAlertService,
//     private activateRouter: ActivatedRoute) {

//     super(baseStore, router, route, alert);

//     this.sub = this.activateRouter.params.subscribe(params => {
//       this.goodsId = +params['id'];
//     });
//   }

//   initController(config: any) {
//     console.log("BSUpdateFormController::initController command=", config);

//     config.store.command = 'shop/goods/goods';
//     config.store.id = this.goodsId;
//     config.isMergeLoadingData = true;
//     return config;
//   }

//  /////////////////////////////////////////////////////////
//  //
//  preparedFormControlsConfig() {

//   let config = {
//     first_category: [],
//       provider_status: [],
//       goods_view: [],
//       goods_name: [],
//       //
//       autowrite_use: [],
//       test: [],
//       //
//       goods_code: [],
//       goods_story: [],
//       purchase_goods_name: [],
//       goods_status: [],
//       restock_notify_use: [],
//       socialcp_event: [],
//       adult_goods: [],
//       cancel_type: [],

//       hscode: [],
//       tax: [],
//       keyword: [],
//       openmarket_keyword: [],
//       min_purchase_ea: [],
//       min_purchase_limit: [],
//       max_purchase_ea: [],
//       max_purchase_limit:[],
//       consumer_price: [],
//       price: [],
//       reserve_policy: [],
//       reserve_rate: [],
//       chk_goods_name_linkage: [],
//       option_international_shipping_status_view: [],
//       sub_option_use: [],
//       contents: [],
//       mobile_contents: [],
//       common_contents: [],
//       admin_memo: [],
//       admin_log: [],
//       stock: [],
//       bad_stock: [],
//       safe_stock: [],
//       supply_price: [],
//       infomation: [],
//       socialcp_input_type: [],
//       socialcp_cancel_type: [],
//       socialcp_cancel_use_refund: [],
//       socialcp_use_return: [],
//       socialcp_cancel_day: [],
//       socialcp_cancel_percent: [],
//       socialcp_cancel_payoption: [],
//       socialcp_cancel_payoption_percent: [],
//       socialcp_use_emoney_day: [],
//       socialcp_use_emoney_percent: [],


//   };

//    return config;
//  }


//  preparedLoadData(resp) {
//      console.log("BSUpdateFormController::preparedLoadData resp =", resp);


//      console.log("data =", resp);

//      return resp;
//  }


//   preparedSaveData(value) {
//     console.log("BSUpdateFormController::preparedLoadData resp =", value);

//     return value;
//   }


// }
