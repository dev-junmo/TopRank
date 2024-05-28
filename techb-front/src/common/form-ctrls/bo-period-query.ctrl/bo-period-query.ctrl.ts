import { Component, Injectable, Input, Output, ContentChildren, QueryList, EventEmitter } from '@angular/core';
import { BOBaseForm } from '../../form/bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BSPeriodOptionConfig } from './bo-period-query-config';

import {NgbDateAdapter, NgbDatepickerI18n, NgbDateStruct, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Router, Event as RouterEvent , NavigationStart , NavigationEnd , NavigationCancel , NavigationError } from '@angular/router';

@Component({
  selector: 'bo-period-query',
  templateUrl: './bo-period-query.ctrl.html',
  styleUrls: ['./bo-period-query.ctrl.css']
})
export class BOPeriodQueryCtrl extends BOBaseForm {

    public _selectedIndexOfPeriod;
    public _initialIndexOfPeriodType = 0;

    @Input() set initialIndexOfPeriodType(index) {
        this._initialIndexOfPeriodType = index;
        console.log('initialIndexOfPeriodType _initialIndexOfPeriodType =>', this._initialIndexOfPeriodType);
    }

    @Input() set selectedIndexPeriod(index) {
        console.log('selectIndex =>', index);
        switch (index) {
            case 0: {
                this.onClickToday(); break;
            }
            case 1: {
                this.onClick3Days(); break;
            }
            case 2: {
                this.onClickWeek(); break;
            }
            case 3: {
                this.onClickMonth(); break;
            }
            case 4: {
                this.onClick3Month(); break;
            }
            case 5: {
                this.onClickAll(); break;
            }
        }
    }

    @Input() hasButtons: boolean = true;    // 버튼의 표시 여부

    @Input() hasTodayBtn: boolean = true;   
    @Input() has3DaysBtn: boolean = true;
    @Input() has1WeekBtn: boolean = true; 
    @Input() has1MonthBtn: boolean = true; 
    @Input() has3MonthBtn: boolean = false;
    @Input() hasAllBtn: boolean = true;

    @Output() submit = new EventEmitter<Object>();

    name: string;
    subForm: FormGroup;

    public modelStart = null;
    public modelEnd = null;

    @ContentChildren(BSPeriodOptionConfig) optionConfigs: QueryList<BSPeriodOptionConfig>;

    constructor(private fb: FormBuilder,
        private router: Router) {

        super();

        // this.router.events.subscribe((event: RouterEvent) => {
        //     // provider
        //     if (event instanceof NavigationStart) {
        //         console.log("BOPeriodQueryCtrl::NavigationStart::event =>", event);
        //     }
        //     if (event instanceof NavigationEnd) {
        //         console.log("BOPeriodQueryCtrl::NavigationEnd::event =>", event);
        //      }            
        // });

        this.subForm = this.fb.group({
            periodType: [],
            sdate : [],
            edate : []
        });
    }

    onInit() {

        // 초기 기간 버튼 선택 
        setTimeout(() => {
            if (!this._selectedIndexOfPeriod || this._selectedIndexOfPeriod == -1) {
                this._selectedIndexOfPeriod = 5;
            }
        }, 100);

        
        //this.updateSelectIndex();

        // name을 지정하면 BOBaseForm에서 bsForm에서 name으로 컨트롤을 가져온다.
        // 그럼 그 ctrl에 값을 넣고 빼는 처리를 한다.

        // subForm은 연결점이 없다.

        // let ctrl = this.formGroup.get(this.name);
        // ctrl.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onInitAterView() {

        console.log("BOPeriodQueryCtrl::optionConfigs =>", this.optionConfigs, this.subForm.get('periodType').value);

        let value = this.optionConfigs.toArray()[this._initialIndexOfPeriodType].value;
        this.subForm.get('periodType').patchValue(value);

        // 이걸 넣으면 항상 기간조회에 첫번째 값이 선택되어 버림        
        // 이걸 주석처리하면 주소에 query값이 세팅이 안됨 
        // 주소를 세팅하려면 기간 필드값이 결정 되야 함
        // 어차피 1개이면 선택해줌 
        
        // 주문통합에서 기간 기본 값이 없으면 안됨 
        // 주문통합에서는 query의 initailQuery = true, 기간조회 seletIndex, datatable initload = false
        
        // if (this.optionConfigs.toArray().length == 1 || this._initialIndexOfPeriodType !== -1) {
        //     if (this.optionConfigs.toArray().length == 1) {
        //         this._initialIndexOfPeriodType = 0;    
        //     }
        //     let init = this.optionConfigs.toArray()[this._initialIndexOfPeriodType].value;
        //     this.subForm.get('periodType').patchValue(init);
        // }
    
        // 초기값 설정
        // let sub1 = this.ctrl.valueChanges.subscribe(data => {
        //     console.log("onInitAterView::valueChanges1 data =>", data);

        //     // if (data == this.curruntStartDate) { return; }          
        //     // if (!data) return;

        //     // const _moment = moment(data);
        //     // this.subForm.get('sdate').setValue(_moment.toDate());
        // });

        // let sub2 = this.endDateCtrl.valueChanges.subscribe(data => {

        //     console.log("onInitAterView::valueChanges2 data =>", data);
        //     // if (data == this.curruntEndDate) { return; }
        //     // if (!data) return;

        //     // const _moment = moment(data);
        //     // console.log("_moment = ", _moment);
        //     // this.subForm.get('edate').setValue(_moment.toDate());
        // });

        this.subForm.valueChanges.subscribe(data => this.onValueChangedForSubForm(data));

        this.selectedIndexPeriod = -1;
        // 초기값 세팅을 위해 한번 호출해줌
        this.updatePeriodContorls(this.subForm.value);
    }

    // 서브폼에서 컨트롤에 값이 patch, set되면 호출됨

    onValueChangedForSubForm(data) {

        console.log("BOPeriodQueryCtrl::onValueChanged data =>", data);
        this.updatePeriodContorls(data);
        
    }

    // subform에 값이 바뀌었을때 호출됨
    updatePeriodContorls(data) {

        console.log('updatePeriodContorls data =>', data);          
        
        // 이전에 세팅된 값 삭제
        for(let item of this.optionConfigs.toArray()) {
            console.log("remove control = ", item.value);
            this.removeControl(item.value + '[max]');
            this.removeControl(item.value + '[min]');
        }

        // 새로 선택 된  기간유형으로 값세팅
        if (data.periodType && data.periodType !== '선택' /* && data.sdate && data.edate*/) {

            let startDateCtrl: AbstractControl;
            let endDateCtrl: AbstractControl;

            startDateCtrl = this.createControl(data.periodType + '[min]');
            endDateCtrl = this.createControl(data.periodType + '[max]');

            console.assert(startDateCtrl);
            console.assert(endDateCtrl);

            if (data.sdate) {
                const _moment1 = moment(data.sdate);
                startDateCtrl.setValue(_moment1.format('YYYY-MM-DD'));    
            } else {
                startDateCtrl.setValue(null);
            }
            
            if (data.edate) {
                const _moment2 = moment(data.edate);
                endDateCtrl.setValue(_moment2.format('YYYY-MM-DD'));    
            } else {
                endDateCtrl.setValue(null);
            }           

            // 데이타 바뀌어서 startDate, endDate
            startDateCtrl.valueChanges.subscribe(data => {
                console.log("updatePeriodContorls2 startDateCtrl data, modelStart =>", data, this.modelStart);

                if (this.modelStart !== data) {
                    console.log("updatePeriodContorls22 sdate set data =>", data);
                    this.subForm.get('sdate').setValue(data);                   
                }              
                
                this.updateSelectIndex();
                
            });

            endDateCtrl.valueChanges.subscribe(data => {
                console.log("updatePeriodContorls3 endDateCtrl data, modelEnd =>", data, this.modelEnd);

                if (this.modelEnd !== data) {
                    console.log("updatePeriodContorls33 edata set data =>", data);
                    this.subForm.get('edate').setValue(data);
                }
                
                // if (!this.modelEnd && !data) {
                //     this._selectedIndexOfPeriod = -1;
                // }

                this.updateSelectIndex();
    
            });
        }

        // const sdate = params.period.sdate;
        // params[params.period.periodType + '[min]'] = sdate.year + '-' + sdate.month  + '-' + sdate.day;

        // const edate = params.period.edate;
        // params[params.period.periodType + '[max]'] = edate.year + '-' + edate.month  + '-' + edate.day;


        // const _moment = moment(data.edate);
        // this.endDateCtrl.setValue(_moment.format('YYYY-MM-DD'));
        // this.ctrl.setValue(data);
        
    }

//   private _getPrevDateFromToday(years, months, weeks, days) {
//     const date = moment().add(years, 'years').add(months, 'months')
//                   .add(weeks, 'weeks').add(days, 'days').toObject();
//     return { year: date.years, month: date.months + 1, day: date.date};
//   }

    private _getPrevDateFromToday(years, months, weeks, days) : Date {
        const date = moment().add(years, 'years').add(months, 'months')
                .add(weeks, 'weeks').add(days, 'days').toDate();
        return date;
    }

    // 오늘
    onClickToday() {
        this._selectedIndexOfPeriod = 0;
        this.modelEnd = new Date();
        this.modelStart = this.modelEnd;

    }

    // 3일간
    onClick3Days() {
        this._selectedIndexOfPeriod = 1;
        this.modelEnd = new Date();
        this.modelStart = this._getPrevDateFromToday(0,0,0,-3);
    }

    // 일주일
    onClickWeek() {
        this._selectedIndexOfPeriod = 2;
        this.modelEnd = new Date();
        this.modelStart = this._getPrevDateFromToday(0,0,-1,0);
    }

    // 일개월
    onClickMonth() {
        this._selectedIndexOfPeriod = 3;
        this.modelEnd = new Date();
        this.modelStart = this._getPrevDateFromToday(0,-1,0,0);
    }

    // 3개월
    onClick3Month() {
        this._selectedIndexOfPeriod = 4;
        this.modelEnd = new Date();
        this.modelStart = this._getPrevDateFromToday(0,-3,0,0);
    }

    // 전체
    onClickAll() {
        this._selectedIndexOfPeriod = 5;
        this.modelEnd = null;
        this.modelStart = null;
    }

    updateSelectIndex() {

        setTimeout(() => {
            this.dateToIndex();
        }, 1);
        setTimeout(() => {
            this.dateToIndex();
        }, 1000);
    }

    dateToIndex() {

        console.log('dateToIndex modelStart, modelEnd =>', this.modelStart, this.modelEnd);        

        if (!this.modelStart || !this.modelEnd) {
            this._selectedIndexOfPeriod = 5;
            return;
        }
         
        if (this.modelStart == this.modelEnd) {
            // 오늘
            let today = moment().format('YYYY-MM-DD');
            if (this.modelStart == today) {
                console.log('dateToIndex::today');
                this._selectedIndexOfPeriod = 0;
            }
        } else if (moment(this.modelStart).add(3, 'days').format('YYYY-MM-DD') == this.modelEnd) {
            // 3일간
            console.log('dateToIndex 3일간');
            this._selectedIndexOfPeriod = 1;
        } else if (moment(this.modelStart).add(1, 'weeks').format('YYYY-MM-DD') == this.modelEnd) {
            // 1주간
            console.log('dateToIndex 1주간');
            this._selectedIndexOfPeriod = 2;
        } else if (moment(this.modelStart).add(1, 'months').format('YYYY-MM-DD') == this.modelEnd) {
            // 1주간
            console.log('dateToIndex 1개월');
            this._selectedIndexOfPeriod = 3;
        } else if (moment(this.modelStart).add(3, 'months').format('YYYY-MM-DD') == this.modelEnd) {
            // 1주간
            console.log('dateToIndex 3개월');
            this._selectedIndexOfPeriod = 4;
        } else {
            this._selectedIndexOfPeriod = -1;
        }



        // 3일간
        //let 3days = moment(this.modelStart).add(3, 'days').format('YYYY-MM-DD');


        // format('YYYY-MM-DD')

        //let start = moment("20111031", "YYYYMMDD")
        //moment('2016-03-12 13:00:00').add(1, 'day').format('LLL')

        // moment().add(years, 'years').add(months, 'months')
        //         .add(weeks, 'weeks').add(days, 'days').toDate();

        // if (!startDate || !endDate) {
        //     this._selectedIndexOfPeriod = -1;
        //     return;
        // }

        // this._selectedIndexOfPeriod = 1;
        // this.modelEnd = new Date();
        // this.modelStart = this._getPrevDateFromToday(0,0,0,-3);




        //const _moment1 = moment(data.sdate);
        //startDateCtrl.setValue(_moment1.format('YYYY-MM-DD')

    }

    // UI에서 값이 바뀌면 호출됨

    // onChange(event, index) {

    //   let inputs = this.inputs.toArray();
    //   let ctrl = this.formGroup.get(this.name);

    //   console.log("onChange =", this.name, event.target.name, inputs, index, ctrl.value);  // sms[0], sms[1]

    //   let value : string = '';
    //   let i = 0;
    //   for(let item of inputs) {
    //     let _value = '';
    //     let ctrl = this.subForm.get(this.name + '[' + i + ']');
    //     if (ctrl.value) _value = ctrl.value;

    //     value += _value;
    //     if (i != inputs.length-1)
    //       value += this.separator;

    //     i++;
    //   }
    //   console.log("value=", value);
    //   ctrl.patchValue(value);

    // }

}
