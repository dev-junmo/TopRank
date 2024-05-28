import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'year-query-form',
  templateUrl: './year-query-form.html',
  styleUrls: ['./year-query-form.css'],
})
export class YearQueryForm extends BOBaseQueryFormController {

    constructor() {
        super();
        for(let i = 2016; i <=  new Date().getFullYear() ; i++) {
            this.yearList.push(i);
        }
    }
    public yearList:any = [];
    public selectYear = new Date().getFullYear();

    preparedFormControlsConfig() {

        let config = {
            search_date:  new Date().getFullYear(),
        };

        return config;
    }

}


//////////////////////////////////////////////////////////
