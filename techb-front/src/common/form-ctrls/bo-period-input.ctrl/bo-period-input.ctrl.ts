import { Component, Injectable, Input, ContentChildren, QueryList } from '@angular/core';
import { BOBaseForm } from '../../form/bo-base-form/bo-base-form';

import { FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BSPeriod2OptionConfig } from './bo-period-input-config';

import {NgbDateAdapter, NgbDatepickerI18n, NgbDateStruct, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'bo-period-input',
  templateUrl: './bo-period-input.ctrl.html',
  styleUrls: ['./bo-period-input.ctrl.css']
})
export class BOPeriodInputCtrl extends BOBaseForm {

    //@Input() startDateName: string;
    @Input() endDateName: string;

    //private startDateCtrl: AbstractControl;
    public endDateCtrl: AbstractControl;

    private _selectedIndex;

     @Input() defaultValue: string; // 마미작에 삭제!!!!!!!!!!!!!!!!!!!!!

    subForm: FormGroup;

    private modelStart = null;
    private modelEnd = null;

    private curruntStartDate;
    private curruntEndDate;

    //@ContentChildren(BSPeriod2OptionConfig) optionConfigs: QueryList<BSPeriod2OptionConfig>;

    constructor(private fb: FormBuilder) {
        super();
    }

    onInit() {

        this.subForm = this.fb.group({
            sdate : [],
            edate : []
        });

        //this.subForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onInitAterView() {
        //console.assert(this.startDateName);
        console.assert(this.endDateName);

        //this.startDateCtrl = this.createControl(this.startDateName);
        this.endDateCtrl = this.createControl(this.endDateName);

        console.assert(this.ctrl);
        console.assert(this.endDateCtrl);

        console.log("BOPeriodInputCtrl::onInitAterView");

        // 초기값 설정
        let sub1 = this.ctrl.valueChanges.subscribe(data => {
            console.log("onInitAterView data =>", data);

            if (data == this.curruntStartDate) { return; }
            //sub1.unsubscribe();

            if (!data) return;


            const _moment = moment(data);
            this.subForm.get('sdate').setValue(_moment.toDate());
            // // 표준 날짜 형식인지 체크
            // if (data.indexOf('Z') != -1) {
            //     this.subForm.get('sdate').setValue(new Date(data));
            // }
        });

        let sub2 = this.endDateCtrl.valueChanges.subscribe(data => {

            if (data == this.curruntEndDate) { return; }
            //sub2.unsubscribe();
            if (!data) return;

            const _moment = moment(data);
            console.log("_moment = ", _moment);
            this.subForm.get('edate').setValue(_moment.toDate());

            // 표준 날짜 형식인지 체크
            // if (data.indexOf('Z') != -1) {
            //     this.subForm.get('edate').setValue(new Date(data));
            // }
        });


        setTimeout(()=>{
            //console.log("33333333333333");
            this.subForm.valueChanges.subscribe(data => this.onValueChanged(data));
        }, 1000);

    }

    // 컨트롤에 값이 patch, set되면 호출됨
    onValueChanged(data) {

        // 2018-11-10 14:00:00
        console.log("onValueChanged data = ", data);
        if (this.ctrl && data.sdate) {

            // 모멘트와 ngdatepicker 데이타 불일치 조정
            //let _data = {year: data.sdate.year, month: data.sdate.month-1, day: data.sdate.day};
            const _moment = moment(data.sdate);
            let value = _moment.format('YYYY-MM-DD');
            this.curruntStartDate = value;
            this.ctrl.setValue(value);

        }

        if (this.endDateCtrl && data.edate) {

            if (this.endDateCtrl.value) {

            }
            // 모멘트와 ngdatepicker 데이타 불일치 조정
            //let _data = {year: data.edate.year, month: data.edate.month-1, day: data.edate.day};
            const _moment = moment(data.edate);
            let value = _moment.format('YYYY-MM-DD');
            this.curruntEndDate = value;
            this.endDateCtrl.setValue(value);

        }
    }


    resetValidators() {
        //new FormControl('', [Validators.required, Validators.minLength(4)])
        if (!this.name || !this.formGroup) {
            console.assert(this.name);
            console.assert(this.formGroup);
            return;
        }

        if (!this.ctrl || !this.endDateCtrl) {
            console.assert(this.ctrl);
            console.assert(this.endDateCtrl);
            return;
        }

        let validators: Array<any> = [];

        if (this._required === true) {
            validators.push(Validators.required);
        }

        this.ctrl.setValidators(validators);
        this.ctrl.updateValueAndValidity();

        this.endDateCtrl.setValidators(validators);
        this.endDateCtrl.updateValueAndValidity();
    }

  // date
//   private _getToday() {
//     const today = moment().toObject();
//     return { year: today.years, month: today.months + 1, day: today.date};
//   }

//   private _getPrevDateFromToday(years, months, weeks, days) {
//     const date = moment().add(years, 'years').add(months, 'months')
//                   .add(weeks, 'weeks').add(days, 'days').toObject();
//     return { year: date.years, month: date.months + 1, day: date.date};
//   }

//   // 오늘
//   onClickToday() {
//     this._selectedIndex = 0;
//     this.modelEnd = this._getToday();
//     this.modelStart = this.modelEnd;
//   }

//   // 3일간
//   onClick3Days() {
//     this._selectedIndex = 1;
//     this.modelEnd = this._getToday();
//     this.modelStart = this._getPrevDateFromToday(0,0,0,-3);
//   }

//   // 일주일
//   onClickWeek() {
//     this._selectedIndex = 2;
//     this.modelEnd = this._getToday();
//     this.modelStart = this._getPrevDateFromToday(0,0,-1,0);
//   }

//   // 일개월
//   onClickMonth() {
//     this._selectedIndex = 3;
//     this.modelEnd = this._getToday();
//     this.modelStart = this._getPrevDateFromToday(0,-1,0,0);
//   }

//   // 전체
//   onClickAll() {
//     this._selectedIndex = 4;
//     this.modelEnd = null;
//     this.modelStart = null;
//   }






}
