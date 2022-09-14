import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '../../../../../../../../../../common/framework';

@Component({
  selector: 'point-usage-query-form',
  templateUrl: './point-usage-query-form.html',
  styleUrls: ['./point-usage-query-form.css'],
})
export class PointUsageQueryForm extends BOBaseQueryFormController {
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


