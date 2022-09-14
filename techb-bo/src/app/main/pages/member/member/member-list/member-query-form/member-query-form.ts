import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'member-query-form',
  templateUrl: './member-query-form.html',
  styleUrls: ['./member-query-form.css'],
})
export class MemberQueryForm extends BOBaseQueryFormController {

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
// import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
// import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { BOGroupCheckBoxCtrl, BOCheckBoxConfig } from '@app/common/bo-common.module';

// @Component({
//   selector: 'member-query-form',
//   templateUrl: './member-query-form.html',
//   styleUrls: ['./member-query-form.css'],

// })
// export class MemberQueryForm implements OnInit {


//   options = ['', '1', '2', '3', '4']; // 등록유형 필드확인 필요
//   reply = ['', 'y', 'n'];
//   status = ['', '완료', '대기', '접수']; // 게시글종류 필드확인 필요

//   selected;
//   searchResults;

//   public submitted: boolean;


//   formMember: FormGroup;

//   constructor(private fb: FormBuilder) {

//     this.formMember = this.fb.group({
//       keyword:[],
//       'provider_seq' : []
//     });
//    }
//    ngOnInit() {
//     // let s = "2015-09-25";
//     // let dt = new Date(s.replace(/-/g, '/'));
//     // console.log(dt);
//     // console.log(this.formNotice.controls);
//     // console.log(moment(s).add(-6, 'months').format('YYYY-MM-DD'));
//     this.formMember.valueChanges.subscribe((data=>
//     console.log(data)))
//     }

//   onSubmit() {
//     alert("submit");
//     this.query.next(this.formMember.value);
//   }

//   onCheckboxChange(event) {
//     console.log("aaaaaaaaaaa =", event.target.id);
//     let ctrl = this.formMember.get(event.target.id);

//     console.log("aaaaaaaaaaa1", ctrl.value);

//     if (ctrl.value) {
//       ctrl.patchValue('y');
//     } else {
//       ctrl.patchValue('');
//     }

//     console.log("aaaaaaaaaaa2", ctrl.value);
//   }
// }
