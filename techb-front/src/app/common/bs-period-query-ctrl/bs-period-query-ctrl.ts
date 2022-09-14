import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import * as moment from 'moment';

@Component({
  selector: 'bs-period-query-ctrl',
  templateUrl: './bs-period-query-ctrl.html',
  styleUrls: ['./bs-period-query-ctrl.css']
})
export class BSPeriodQueryCtrl implements OnInit {

    @Input() initialSubmit: boolean = true;
    private _selectedIndex;

    @Input() set setDate(params) {
        console.log('BSPeriodQueryCtrl::setDate params =>', params);
        this.sDate = moment(params.sDate, 'YYYY-MM-DD').toDate();
        this.eDate = moment(params.eDate, 'YYYY-MM-DD').toDate();
        this.dateToIndex();
    }
    @Input() set selectIndex(index) {
        switch (index) {
            case 0: {
                this.onClicWeek(); break;
            }
            case 1: {
                this.onClicMonth(); break;
            }
            case 2: {
                this.onClick3Month(); break;
            }
            case 3: {
                this.onClick6Month(); break;
            }
            case 4: {
                this.onClickAll(); break;
            }
            default: {
                this._selectedIndex = -1;
            }
        }

        if (this.initialSubmit) {
            this.onClickQuery();
        }
    }
    public sDate = null;
    public eDate = null;

    public stringStartDate() {
        let sDate = '';
        if (this.sDate) {
            sDate = moment(this.sDate).format('YYYY-MM-DD');
        }
        return sDate;
    }

    public stringEndSDate() {
        let eDate = '';
        if (this.eDate) {
            eDate = moment(this.eDate).format('YYYY-MM-DD');
        }
        return eDate;
    }

    locale = 'ko';
    locales = listLocales();

    @Output() submit = new EventEmitter();

    constructor(private _localeService: BsLocaleService) {
        this._localeService.use(this.locale);

    }

    ngOnInit() {

    }

    // date
    private _getToday() {
        const today = moment().toDate();
        return today; // { year: today.years, month: today.months + 1, day: today.date};
    }

    private _getPrevDateFromToday(years, months, weeks, days) {
        const date = moment().add(years, 'years').add(months, 'months')
                    .add(weeks, 'weeks').add(days, 'days').toDate();
        return date;
        //return { year: date.years, month: date.months + 1, day: date.date};
    }

    onClicWeek() {
        this._selectedIndex = 0;
        this.eDate = this._getToday();
        this.sDate = this._getPrevDateFromToday(0,0,-1,0);
    }

    onClicMonth() {
        this._selectedIndex = 1;
        this.eDate = this._getToday();
        this.sDate = this._getPrevDateFromToday(0,-1,0,0);
    }

    onClick3Month() {
        this._selectedIndex = 2;
        this.eDate = this._getToday();
        this.sDate = this._getPrevDateFromToday(0,-3,0,0);
    }

    onClick6Month() {
        this._selectedIndex = 3;
        this.eDate = this._getToday();
        this.sDate = this._getPrevDateFromToday(0,-6,0,0);
    }

    onClickAll() {
        this._selectedIndex = 4;
        this.eDate = null;
        this.sDate = null;
    }

    // 조회하기 버튼을 누른 경우
    onClickQuery() {

        //console.log("sDate =>", moment(this.sDate).format('YYYY-MM-DD'));
        let sDate = '';
        let eDate = '';

        if (this.sDate) {
            sDate = moment(this.sDate).format('YYYY-MM-DD');
        }

        if (this.eDate) {
            eDate = moment(this.eDate).format('YYYY-MM-DD');
        }
        this.submit.emit({sDate: sDate, eDate: eDate, selectedIndex: this._selectedIndex});
    }

    dateToIndex() {
        console.log('dateToIndex sDate, eDate =>', this.sDate, this.eDate);        

        if (!this.sDate || !this.eDate) {
            this._selectedIndex = 5;
            return;
        }
     
        let eDate = moment(this.eDate).format('YYYY-MM-DD');

        if (moment(this.sDate).add(1, 'weeks').format('YYYY-MM-DD') == eDate) {
            console.log('dateToIndex 1주간');
            this._selectedIndex = 0;
        } else if (moment(this.sDate).add(1, 'months').format('YYYY-MM-DD') == eDate) {
            console.log('dateToIndex 1개월');
            this._selectedIndex = 1;
        } else if (moment(this.sDate).add(3, 'months').format('YYYY-MM-DD') == eDate) {
            console.log('dateToIndex 3개월');
            this._selectedIndex = 2;
        } else if (moment(this.sDate).add(6, 'months').format('YYYY-MM-DD') == eDate) {
            console.log('dateToIndex 6개월');
            this._selectedIndex = 3;
        } else {
            this._selectedIndex = -1;
        }
        console.log('dateToIndex _selectedIndex =>', this._selectedIndex);   
    }
}

