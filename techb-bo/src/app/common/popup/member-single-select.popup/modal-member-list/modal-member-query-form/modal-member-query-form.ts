import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'modal-member-query-form',
  templateUrl: './modal-member-query-form.html',
  styleUrls: ['./modal-member-query-form.css'],
})
export class ModalMemberQueryForm extends BOBaseQueryFormController {

 constructor() {
   super();

 }

 preparedFormControlsConfig() {

  let config = {
    keyword:[],
    // regdate : [],
    sms : [],
    'sms[0]': '',
    'sms[1]': '',
    mailing : [],
    'mailing[0]': '',
    'mailing[1]': '',
    group_seq: '',
    // 'type[]': [],
    status : [],
    'status[0]': '',
    'status[1]': '',
    'status[2]':'',
    'status[3]': '',
    'member_order_cnt[min]' : [],
    'member_order_cnt[max]' : [],
    'member_order_price[min]' : [],
    'member_order_price[max]' : [],
    'emoney[min]' : [],
    'emoney[max]' : [],
    // 'cash[min]' : [],
    // 'cash[max]' : [],
    // 'point[min]' : [],
    // 'point[max]' : [],
    'birthday[min]' : [],
    'birthday[max]' : [],
    'regist_date[min]' : [],
    'regist_date[max]' : [],
    'review_cnt[min]' : [],
    'review_cnt[max]' : [],
    'login_cnt[min]' : [],
    'login_cnt[max]' : [],
    provider_seq : []
  };
    return config;
  }


}

//////////////////////////////////////////////////////////
