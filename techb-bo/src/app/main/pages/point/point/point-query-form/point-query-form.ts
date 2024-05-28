import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'point-query-form',
  templateUrl: './point-query-form.html',
  styleUrls: ['./point-query-form.css'],
})
export class PointQueryForm extends BOBaseQueryFormController {

 constructor() {
   super();
 }

 preparedFormControlsConfig() {

   let config = {
    point_type : [],
    action : [],
    point : [],
    expire_date : [],
    regist_date : [],
    member_seq : '',
    memo : ''

    // amount[] : [],
    // amount[] : [],
    // 'remains[min]' : [],
    // 'remains[max]' : [],
   };

   return config;
  }
}


