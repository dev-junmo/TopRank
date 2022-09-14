import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'order-query-form',
  templateUrl: './order-query-form.html',
  styleUrls: ['./order-query-form.css'],

})
export class OrderQueryForm extends BOBaseQueryFormController {

  options = ['', '1', '2', '3', '4']; // 등록유형 필드확인 필요
  reply = ['', 'y', 'n'];
  status = ['', '완료', '대기', '접수']; // 게시글종류 필드확인 필요

  //formNotice: FormGroup;

  constructor() {
    super();
    //this.formNotice = this.bsForm;
   }

  preparedFormControlsConfig() {

    let config = {
    //   //test:[],
    //   skin:[],
    //   hidden : [],
    //   //regdate : [],
    //   re_contents : [''],
    //   board : [''],
    // //  category: [''],
    // //   date : this.fb.group({
    // //     sdate : [],
    // //     edate : []
    // //   }),
    //   search_text : []
    };

    return config;
  }
}
