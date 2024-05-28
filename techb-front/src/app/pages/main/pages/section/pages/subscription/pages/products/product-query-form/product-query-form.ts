import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '../../../../../../../../../../common/framework/bs-query-form.controller';

@Component({
  selector: 'product-query-form',
  templateUrl: './product-query-form.html',
  styleUrls: ['./product-query-form.css'],
})
export class ProductQueryForm extends BOBaseQueryFormController {
    constructor() {
        super();
    }

    preparedFormControlsConfig() {
        let config = {
            regist_date: [],

        };

        return config;
    }
}


