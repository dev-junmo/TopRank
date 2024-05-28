import { Component , Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'year-month-day-query-form',
  templateUrl: './year-month-day-query-form.html',
  styleUrls: ['./year-month-day-query-form.css'],
})
export class YearMonthDayQueryForm extends BOBaseQueryFormController {

    @Input() timeUse = true;    //시간만 사용안하는경우 
    @Input() set type(value) {
        this.showType = value;
        this.style = value;
    };    //스타일 고정인경우 ex) 월별,일별,시간별 사용없이 모두 사용함.
    

    private yearList:any = [];
    private monthList:any = [];
    private dayList:any = [];

    public style;

    private selectYear;
    private selectMonth;
    private selectDay;

    private searchDate = new Date().getFullYear();

    private showType = 'month';
    constructor() {
        super();
        this.selectYear = new Date().getFullYear();
        this.selectMonth = new Date().getMonth()+1;
        this.selectDay = new Date().getUTCDate();
        if(this.selectMonth < 10) {
            this.selectMonth = '0' + this.selectMonth.toString();
        }
        if(this.selectDay < 10) {
            this.selectDay = '0' + this.selectDay.toString();
        }
        console.log(this.selectYear , this.selectMonth , this.selectDay);
        
        for(let i = 2016; i <= this.searchDate ; i++) {
            this.yearList.push(i);
        }
        for(let i:any = 1; i <= 12 ; i++) {
            if(i < 10) {
                i = '0' + i.toString();
            }
            this.monthList.push(i.toString());
        }
        for(let i:any = 1; i <= 31 ; i++) {
            if(i < 10) {
                i = '0' + i.toString();
            }
            this.dayList.push(i.toString());
        }
    }

    preparedFormControlsConfig() {
        

        let config = {
            search_date: new Date().getFullYear(),
            search_type: 'month'
        };


        return config;
    }

    onChangeSearchType() {
        this.showType = this.bsForm.value.search_type;
        console.log(this.showType);
        this.onChageDate(this.showType);
    }

    onChageDate(type) {
        let date;

        if(this.showType == "month") {
            date = this.selectYear;
        } else if (this.showType == "day") {
            date = this.selectYear + this.selectMonth;
        } else {
            date = this.selectYear + this.selectMonth + this.selectDay;
        }
        this.bsForm.get('search_date').setValue(date);
        console.log(date , this.bsForm.value);
    }
}


//////////////////////////////////////////////////////////
