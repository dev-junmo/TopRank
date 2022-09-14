import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'send-kakao-query-form',
  templateUrl: './send-kakao-query-form.html',
  styleUrls: ['./send-kakao-query-form.css'],
})
export class SendKakaoQueryForm extends BOBaseQueryFormController {

  public initialIndexOfPeriod = 1;

  constructor() {
    super();
  }

  preparedFormControlsConfig() {

    let config = {
    regdate: [],
    sentdate: [],
    phone: [],
    etc1: []
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
