import { Component , Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import * as moment from 'moment';
    
@Component({
  selector: 'visit-statistics-query-form',
  templateUrl: './visit-statistics-query-form.html',
  styleUrls: ['./visit-statistics-query-form.css'],
})
export class VisitStatisticsQueryForm extends BOBaseQueryFormController {

    @Input() hasDataType: boolean = true;
    @Input() hasPeriodType: boolean = true;
    @Input() dateType: string = 'month'; // month, day, hour

    @Input() hasDataTypeWithdrawal: boolean = true;

    private nowYear;
    private nowMonth;

    public years = [
    {
        title: '전체',
        value: '',
    }
    ];
    public month = [
    {
        title: '전체',
        value: '',
    }
    ];

    constructor() {
        super();
    }

    preparedFormControlsConfig() {
        let config = {
            search_type: 'join',            // 종류: join, visit, withdrawal 
            date_type : 'month',            // 유형: month, day, hour
            search_date: [],
            period_s_y: [],
            period_s_m: [],
            period_e_y: [],
            period_e_m: [],
            period: '',
        };
        return config;
    }

    onDateTypeChanged(value) {
        console.log('onDateTypeChanged value =>', value);
        this.dateType = value;
    }

    afterInitQueryForm() {
        this.nowYear = new Date().getFullYear().toString();
        this.nowMonth = new Date().getMonth() + 1;
        this.nowMonth = this.nowMonth.toString();

        if( this.nowMonth.length != 2) {
            this.nowMonth = '0' + this.nowMonth;
        }

        console.log('init nowYear =>', this.nowYear);

        this.loadYear();
        this.loadMonth();

        console.assert(this.bsForm);

        this.bsForm.get('period_s_y').setValue(this.nowYear);
        this.bsForm.get('period_s_m').setValue('01');
        this.bsForm.get('period_e_y').setValue(this.nowYear);
        this.bsForm.get('period_e_m').setValue('12');
    }

    willSubmit(query) {

        console.log('willSubmit query, dateType =>', query, this.dateType);
        if (this.dateType == 'month') {
            query['search_date[min]'] = query.period_s_y + '-' + query.period_s_m;
            query['search_date[max]'] = query.period_e_y + '-' + query.period_e_m;    
        }
        return query;
    }

    loadYear() {
        // let years = [];
        let year = new Date().getFullYear();

        // range.push(year);
        for (let i = 2016; i <= year; i++) {
        let j = String(i);
            this.years.push({title: j + '년' , value : j});
        }

        console.log('loadYear years =>', this.years);
    }

    loadMonth() {
        for(let i = 1; i < 13; i ++) {
        let m = String(i);
        let k = m;
        if(k.length != 2) {
            k = '0' + k;
        }
        this.month.push({title: m + '월' , value : k});
        }

        console.log('loadMonth month =>', this.month);
    }

    // 전체
    onClickAll() {
        this.bsForm.get('period_s_y').setValue('');
        this.bsForm.get('period_s_m').setValue('');
        this.bsForm.get('period_e_y').setValue('');
        this.bsForm.get('period_e_m').setValue('');
    }
}


//////////////////////////////////////////////////////////
