import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Component({
  selector: 'coupon-query-form',
  templateUrl: './coupon-query-form.html',
  styleUrls: ['./coupon-query-form.css'],
})
export class CouponQueryForm extends BOBaseQueryFormController {

 constructor(public appConfig: AppConfigService) {
   super();
 }

 preparedFormControlsConfig() {

   let config = {
      hidden: [],
      regist_date: [],
      ext_date: [],
      search_text: [],
      limit_goods_price:0
   };

   return config;
  }
}
/////////////////////////////////////////////////////////////
/*

  search_text : [],
     type : [],
    'type[0]' : '',
    'type[1]' : '',
    'type[2]' : '',
    'type[3]' : '',
    'type[4]' : '',
    'type[5]' : '',
    'type[6]' : '',
    'type[7]' : '',
    'type[8]' : '',
    'type[9]' : '',
    'type[10]' : '',
    'type[11]' : '',
    'type[12]' : '',
    'type[13]' : '',
    'type[14]' : '',
    'type[15]' : '',
    'type[16]' : '',
    'type[17]' : '',
    use_type : [],
    'use_type[0]': '',
    'use_type[1]': '',
    issue_stop : [],
    'issue_stop[0]': '',
    'issue_stop[1]': '',
    coupon_same_time: [],
    limit_goods_price :[],
    sale_agent :[],
    sale_payment : [],
    sale_referer : []*/
