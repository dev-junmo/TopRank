import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import { AppConfigService } from '@app/providers/service/app-config.service';
import * as moment from 'moment';

@Component({
    selector: 'sale-query-form2',
    templateUrl: './sale-query-form2.html',
    styleUrls: ['./sale-query-form2.css'],
})
export class SaleQueryForm2 extends BOBaseQueryFormController {

    private providerYN: boolean = false;

    constructor(public appConfig: AppConfigService) {
        super();
    }

    preparedFormControlsConfig() {

        let config = {
            search_start_date: [],
            search_end_date: [],
            search_type: [],
            search_text: [],
            search_date_type : [],
            //'deposit_date[min]': moment().format('YYYY-MM') + '-01',
            //'deposit_date[max]': moment().format('YYYY-MM-DD'),
            provider_seq : null,
            channel: [],
            actual_pg_check: [],
        };

        // 당월 1일
        // 당일

        return config;
    }

    afterInitQueryForm() {
        this.bsForm.get('deposit_date[min]').setValue(moment().format('YYYY-MM') + '-01');
        this.bsForm.get('deposit_date[max]').setValue(moment().format('YYYY-MM-DD'));
    }

    onChangeState(evt , value) {
        // let provider = evt.target.value;
        // console.log('value' , provider , evt, value);
        if(value ==  '' || value == '1')  {
            this.providerYN = true;
        } else {
            this.providerYN = false;
        }
    }
}

