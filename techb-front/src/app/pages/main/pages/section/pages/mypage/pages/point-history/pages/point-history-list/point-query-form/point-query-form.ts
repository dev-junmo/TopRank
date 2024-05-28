import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '../../../../../../../../../../../../common/framework';

@Component({
  selector: 'point-query-form',
  templateUrl: './point-query-form.html',
  styleUrls: ['./point-query-form.css'],
})
export class PointQueryForm extends BOBaseQueryFormController {
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


