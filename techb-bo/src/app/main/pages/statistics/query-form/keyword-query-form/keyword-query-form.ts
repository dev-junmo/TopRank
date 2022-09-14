import { Component , Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'keyword-query-form',
  templateUrl: './keyword-query-form.html',
  styleUrls: ['./keyword-query-form.css'],
})
export class KeywordQueryForm extends BOBaseQueryFormController { 
    constructor() {
        super();
    }

    preparedFormControlsConfig() {
        let config = {
            keyword: '',
            'period': '',
        };
        return config;
    }
}


//////////////////////////////////////////////////////////
