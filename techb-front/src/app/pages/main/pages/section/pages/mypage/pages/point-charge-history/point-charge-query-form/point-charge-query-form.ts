import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '../../../../../../../../../../common/framework/bs-query-form.controller';

@Component({
  selector: 'point-charge-query-form',
  templateUrl: './point-charge-query-form.html',
  styleUrls: ['./point-charge-query-form.css'],
})
export class PointChargeQueryForm extends BOBaseQueryFormController {
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


