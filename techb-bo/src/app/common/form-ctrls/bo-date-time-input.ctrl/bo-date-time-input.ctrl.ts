import { Component, Injectable, Input, ContentChildren, QueryList } from '@angular/core';
import { BOBaseForm } from '@app/common/form/bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BSDateTimeOptionConfig } from './bo-date-time-input-config';

import {NgbDateAdapter, NgbDatepickerI18n, NgbDateStruct, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Component({
  selector: 'bo-date-time-input',
  templateUrl: './bo-date-time-input.ctrl.html',
  styleUrls: ['./bo-date-time-input.ctrl.css']
})
export class BODateTimeInputCtrl extends BOBaseForm {

    @Input() isDate: boolean = true;
    @Input() isTime: boolean = true;

    @Input() isTimeFormatHHSS: boolean = false;

    private subscribeOfSubCtrl;
    private subscribeOfCtrl;

    private curruntDate = null;

    subForm: FormGroup;
    mytime: Date;
    //private _selectedIndex;
    //@Input() defaultValue: string; // 마미작에 삭제!!!!!!!!!!!!!!!!!!!!!

    //private modelStart = null;
    //private modelEnd = null;
    //@ContentChildren(BSPeriod2OptionConfig) optionConfigs: QueryList<BSPeriod2OptionConfig>;

    constructor(private fb: FormBuilder) {
        super();
    }

    onInit() {

        this.subForm = this.fb.group({
            sdate: [],
            stime: []
            //edate : []
        });

        // if (this.ctrl) {
        //     this.setValueChanges();
        // }
    }

    onInitAterView() {
        this.listenEvent();
    }

    listenEvent() {

          // 데이타로 부터 초기값 로딩 
          if (!this.subscribeOfCtrl) {
            this.subscribeOfCtrl = this.ctrl.valueChanges.subscribe(data => this.onValueChangedFromCtrl(data));
          }
         
          // ui event -> 값세팅
          setTimeout(()=>{
              if (!this.subscribeOfSubCtrl) {
                this.subscribeOfSubCtrl = this.subForm.valueChanges.subscribe(data => this.onValueChangedFromSubForm(data));
              }
          }, 1000);

    }

    stopEvent() {
        if (this.subscribeOfCtrl) {
            this.subscribeOfCtrl.unsubscribe();
            delete this.subscribeOfCtrl;
        }
        if (this.subscribeOfSubCtrl) {
            this.subscribeOfSubCtrl.unsubscribe();
            delete this.subscribeOfSubCtrl;
        }
    }

    onValueChangedFromCtrl(data) {

        console.log("BODateTimeInputCtrl::onValueChangedFromCtrl name, data, curruntDate =>", 
            this.name, data, this.curruntDate);

        //if (data == this.curruntDate) { return; }

        // recursive 방지를 위해 
        this.stopEvent();
        
        this.setValue(data);

         // recursive 방지를 위해
         this.listenEvent(); 
    }

    // initValue() {

    //     console.log("initValue ctrl.value =>", this.ctrl.value);

    //     // 이미 값이 있다면
    //     if (this.ctrl && this.ctrl.value) {
    //         this.setValue(this.ctrl.value);
    //     }

    //     let sub = this.ctrl.valueChanges.subscribe(data => {

    //         console.log("22222222222222", data);

    //         sub.unsubscribe();

    //         this.setValue(data);
    //     });
    // }


    ////////////////////////////////////////////////////////
    // form ctrl 에 값을 저장

    setValue(value) {

        if (!this.ctrl) {
            console.log('BODateTimeInputCtrl::setValue1 ctrl =>', this.ctrl);
            return;
        }

        // null값이 세팅이 안되는 버그가 있음
        if (!value) {
            console.log('BODateTimeInputCtrl::setValue2 ctrl =>', value);
            return;        
        }

        console.log('BODateTimeInputCtrl::setValue3 value =>', value);

        if (this.isDate) {

            const _moment = moment(value);

            let date;
            if (_moment.isValid()) {
                date = _moment.toDate();
            } else {
                date = '';
                console.log('BODateTimeInputCtrl::setValue validFail =>', value);
 
            }

            console.log("setValue/sdate value, date =>", value, date);

            this.subForm.get('sdate').setValue(date);
        }

        if (this.isTime) {
            
            const _moment = moment(value);
            console.log('BODateTimeInputCtrl::setValue::isTime _moment =>', _moment);

            let date;
            if (_moment.isValid()) {
                date = _moment.toDate();
                console.log("setValue/stime value, date =>", value, date);
                this.subForm.get('stime').setValue(date);          
            } else {
                date = moment(value, 'HH:mm:ss').toDate();
                console.log('BODateTimeInputCtrl::setValue validFail =>', value, date);
                this.subForm.get('stime').setValue(date);   
            }
        }

        //var day = moment("1995-12-25");
        // 표준 날짜 형식인지 체크
        // if (data.indexOf('Z') != -1) {

        //     let date = new Date(data);

        //     if (this.isDate) {
        //         this.subForm.get('sdate').setValue(date);
        //     }

        //     if (this.isTime) {
        //         this.subForm.get('stime').setValue(date);
        //     }
        // }
    }

    // 컨트롤에 값이 patch, set되면 호출됨
    onValueChangedFromSubForm(event) {

        console.log("onValueChangedFromSubForm data =>", this.subForm.value, this.ctrl);

        if (!this.ctrl) return;

        let data = this.subForm.value;

        let dateStr = '';
        if (data.sdate) {
            const _moment = moment(data.sdate);
            dateStr = _moment.format('YYYY-MM-DD');
        }

        let timeStr = '';
        if (data.stime && data.stime != "Invalid Date") {
            const _moment = moment(data.stime);

            let timeFormate = 'HH:mm:ss';
            if (this.isTimeFormatHHSS) {
                timeFormate = 'HH:mm';
            }
            timeStr = _moment.format(timeFormate);
        }

        let value;
        if (this.isDate && this.isTime && dateStr && timeStr) {
            value = dateStr + ' ' + timeStr;
        } else if (this.isDate && dateStr) {
            value = dateStr;
        } else if (this.isTime && timeStr) {
            value = timeStr;
        }

        console.log("onValueChangedFromSubForm2 data, value =>", data, value);

        // 값이 undefined여서 api에서 삭제가 안되는 버그가 있음
        if (!value) {
            value = null;
        }

        this.curruntDate = value;

        // recursive 방지를 위해 
        this.stopEvent();

        this.ctrl.setValue(value);

        // recursive 방지를 위해
        this.listenEvent(); 

        // if (this.endDateCtrl && data.edate) {
        //     // 모멘트와 ngdatepicker 데이타 불일치 조정
        //     let _data = {year: data.edate.year, month: data.edate.month-1, day: data.edate.day};
        //     const _moment = moment(_data);
        //     this.endDateCtrl.setValue(_moment.format('YYYY-MM-DD'));
        // }
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
