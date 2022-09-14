import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'point-charge-query-form',
  templateUrl: './point-charge-query-form.html',
  styleUrls: ['./point-charge-query-form.css'],
})
export class PointChargeQueryForm extends BOBaseQueryFormController {

 constructor() {
   super();
 }

 preparedFormControlsConfig() {

   let config = {
    state:[], 
    charge_point : [],
    charge_free_point : [],
    member_seq: '',
    regist_date : [],
   };

   return config;
  }
}
