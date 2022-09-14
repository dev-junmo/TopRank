import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '../../../../../../../../../../../../common/framework'; 

@Component({
  selector: 'reward-point-query-form',
  templateUrl: './reward-point-query-form.html',
  styleUrls: ['./reward-point-query-form.css'],
})
export class RewardPointQueryForm extends BOBaseQueryFormController {
    @Input() itemCount = 0;
    constructor() {
        super();
    }

    preparedFormControlsConfig() {
        let config = {
            regist_date: [],
            state: []
        };

        return config;
    }
}


