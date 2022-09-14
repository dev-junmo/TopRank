import { Component, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators, FormBuilder, NgControl } from '@angular/forms';

import { BOBaseForm } from '@app/common/form//bo-base-form/bo-base-form';
import {NgbDateAdapter, NgbDatepickerI18n, NgbDateStruct, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


// const 
//   // other languages you would support
// };

// @Injectable()
// export class CustomDatepickerI18n extends NgbDatepickerI18n {
 
//     constructor(private _i18n:I18n) {
//         super();
//     }
 
//     getWeekdayShortName(weekday:number):string {
//         return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
//     }
 
//     getMonthShortName(month:number):string {
//         return I18N_VALUES[this._i18n.language].months[month - 1];
//     }
 
//     getMonthFullName(month:number):string {
//         return this.getMonthShortName(month);
//     }
// }
@Component({
  selector: 'bo-period-form',
  templateUrl: './bo-period-form.html',
  styleUrls: ['./bo-period-form.css']
})
export class BOPeriodForm extends BOBaseForm {

  public modelStart = null;
  public modelEnd = null;

  //model: NgbDateStruct;
  //date: {year: number, month: number};
  constructor(private parserFormatter: NgbDateParserFormatter) {
    super();
  }
  
  // getWeekdayShortName(weekday:number):string {
  //   return this.I18N_VALUES['ko'].weekdays[weekday - 1];
  // }
  
  // getMonthShortName(month:number):string {
  //   return this.I18N_VALUES['ko'].months[month - 1];
  // }

  // getMonthFullName(month:number):string {
  //   return this.getMonthShortName(month);
  // }

  ////////////////////////////////////////////////////////////////////
  //

  // date
  getToday() {
    const today = moment().toObject();
    return { year: today.years, month: today.months + 1, day: today.date};
  }

  getPrevDateFromToday(years, months, weeks, days) {
    const date = moment().add(years, 'years').add(months, 'months')
                  .add(weeks, 'weeks').add(days, 'days').toObject();
    return { year: date.years, month: date.months + 1, day: date.date};
  }

  // 오늘
  onClickToday() {
    this.modelEnd = this.getToday();
    this.modelStart = this.modelEnd;
  }

  // 3일간
  onClick3Days() {
    this.modelEnd = this.getToday();
    this.modelStart = this.getPrevDateFromToday(0,0,0,-3);
  }

  // 일주일
  onClickWeek() {
    this.modelEnd = this.getToday();
    this.modelStart = this.getPrevDateFromToday(0,0,-1,0);
  }

  // 일개월
  onClickMonth() {
    this.modelEnd = this.getToday();
    this.modelStart = this.getPrevDateFromToday(0,-1,0,0);
  }

  // 전체
  onClickAll() {
    this.modelEnd = null;
    this.modelStart = null;
  }

  checkDates(formGroup: FormGroup) {
    if(formGroup.controls.edate.value < formGroup.controls.sdate.value) {
      return { notValid:true }
    }
    return null;
  }

}
