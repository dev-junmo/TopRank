import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'reward-point-query-form',
  templateUrl: './reward-point-query-form.html',
  styleUrls: ['./reward-point-query-form.css'],
})
export class RewardPointQueryForm extends BOBaseQueryFormController {

 constructor() {
   super();
 }

 preparedFormControlsConfig() {

   let config = {
    reward_state : [],
    action : [],
    regist_date : [],
    member_seq : '',
    // amount[] : [],
    // amount[] : [],
    // 'remains[min]' : [],
    // 'remains[max]' : [],
   };

   return config;
  }
}


