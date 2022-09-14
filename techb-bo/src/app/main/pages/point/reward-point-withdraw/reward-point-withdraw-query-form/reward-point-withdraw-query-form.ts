import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'reward-point-withdraw-query-form',
  templateUrl: './reward-point-withdraw-query-form.html',
  styleUrls: ['./reward-point-withdraw-query-form.css'],
})
export class RewardPointWithdrawQueryForm extends BOBaseQueryFormController {

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


