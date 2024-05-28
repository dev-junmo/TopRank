import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import { type } from 'os';

@Component({
  selector: 'coupon-issue-query-form',
  templateUrl: './coupon-issue-query-form.html',
  styleUrls: ['./coupon-issue-query-form.css'],
})
export class CouponIssueQueryForm extends BOBaseQueryFormController {

    @Input() type;

    constructor() {
        super();
    }

    preparedFormControlsConfig() {

        let config = {
            use_date: [],
            search_text: [],
            use_status: [],
            offline_input_serialnumber:[],
            regist_date: []
        };

        return config;
    }
}
