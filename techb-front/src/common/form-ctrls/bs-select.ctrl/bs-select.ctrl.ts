import { BSApi } from '../../core/bs-api';
import { Component, OnInit, Input, Output, ContentChildren, QueryList, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BOBaseForm } from '../../form/bo-base-form/bo-base-form';
import { FormControl, AbstractControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BSSelectOptionConfig } from './bs-option-config';
import { isArray } from 'util';

@Component({
  selector: 'bs-select',
  templateUrl: './bs-select.ctrl.html',
  styleUrls: ['./bs-select.ctrl.css'],
  encapsulation: ViewEncapsulation.None
})
export class BSSelectFormCtrl extends BOBaseForm {

    @ContentChildren(BSSelectOptionConfig) optionConfigs: QueryList<BSSelectOptionConfig>;

    //@Input() defaultValue: string = '';
    @Input() optionInitLabel: string = '선택';
    @Input() optionInitValue: string = null;    // todo : bsselect 기본값처리

    @Input() allowUnselected: boolean = true;

    @Input() set data(value) {
        if (!value || value.length == 0) { return; }

        this._data = value;
        // optionValueField 이 값을 넣어줬는데 없다고 나와서 
        setTimeout(() => {
            this.clearOptions();
            this._loadData(this._data);  
        },1);
    }
    @Input() optionApiUrl: string;
    @Input() optionLabelField: string;
    @Input() optionValueField: string;
    @Input() optionRoot: string = 'list'; // resp.list 라면

    @Input() editable: boolean = false;
    @Input() width: number = 131;

    @Output() valueChanged = new EventEmitter<any>(); // $event를 넘기고 있어서 value를 따로 만듦
    @Output() keywordChanged = new EventEmitter<any>();
    @Output() valueChangedwithValue = new EventEmitter<any>();

    private _data: any;

    public options: Array<any> = [{ value: null, label: '선택', disabled: false}];


    ///////////////////////////////////////////////
    //
    public label;
    public isShowOptions: boolean = false;

    constructor( public api: BSApi
                //protected alert: BSAlertService)
                ) {
        super();
    }

    clearOptions() {

        //editable은 '선택' 항목이 없음
        if (this.editable) {
            this.allowUnselected = false;
        }

        this.options = []; 
        if (this.allowUnselected) {
            this.options = [{ value: null, label: '선택', disabled: false}];
        }
    }

    onInit() {

        console.log('onInit ctrl.value =>', this.ctrl.value);

        //선택값은 null , 그런데 기본값 null을 다양하게 정의해서 '선택'이 선택되게 하려면 변경해야함
        if (this.ctrl.value === '' || this.ctrl.value === []) {
            this.ctrl.setValue(null);
        }
    }

    onInitAterView() {

        if (!this.allowUnselected) {
            this.options = [];
        } else {
            this.options[0].label = this.optionInitLabel;
            this.options[0].value = this.optionInitValue;
        }

        console.log("onInitAterView options =>", this.options);

        console.assert(this.optionConfigs);
        if (this.optionConfigs && this.optionConfigs.length > 0) {
            for(let item of this.optionConfigs.toArray()) {
                this.options.push({value: item.value, label: item.label, disabled: item.disabled});
            }
        }
        console.log("BSSelectFormCtrl::onInitAterView() this.optionConfigs=>", this.optionConfigs, this.options);

        console.assert(this.formGroup);

        // 직접 api 호출 방식
        if (this._data) {
            this._loadData(this._data);
        } else if (this.optionApiUrl) {
            this.loadData();
        }
    }



    public loadData() {

        console.assert(this.optionApiUrl);

        this.api.get(this.optionApiUrl).subscribe( resp => {

            console.log("BSSelectFormCtrl::loadData resp = ", resp);
            console.assert(resp);

            let list = resp;
            if (this.optionRoot) {
                list = resp[this.optionRoot];
            }

            this._loadData(list);
        });

    }

    _loadData(list) {

        this.clearOptions();
       
        console.log('_loadData list, this.optionLabelField =>', list, this.optionLabelField);
        if (!list) { return; }

        for(let item of list) {

            let value;
            let label = '';

            // value
            if (this.optionValueField) {
                value = item[this.optionValueField];
            } else {
                value = item;
            }
            console.assert(value);

            // label
            if (this.optionLabelField) {
                // if(isArray(this.optionLabelField)){
                //     for(let field of this.optionLabelField){
                //         if(item[field]) label += item[field];
                //         else label += field;
                //     }
                // }else{
                    label = item[this.optionLabelField];
                    if (label) {
                        label = label.trim();
                    }
                //}
            } else {

                // value가 없어서 label을 value로 쓸경우
                if (value) {
                    value = value.trim();
                }
                label = value;
            }

            //console.log('_loadData value =>', value);
            this.options.push({value:value, label:label, disabled:false});
        }
    }

    onClickEvent(event) {
        this.valueChanged.emit(event);
        this.valueChangedwithValue.emit(event.target.value);
    }


    ////////////////////////////////////////////////////////
    // editable checkbox

    onClickOption(option) {
        console.log('BSSelectFormCtrl::onClickOpton option =>', option);
        this.label = option.label;
        this.ctrl.setValue(option.value);

        this.valueChangedwithValue.emit(option.value);
    }

    onChangeLabel(event, dropdown) {
        setTimeout(() => {
            //this.label = event.data;

            // 한글이 경우 마지막 글자가 바로 값으로 오지 않고 다음 글자를 입력 한 후 한글자씩 밀려서 온다.
            // 마지막 글자가 event.data이다.
            let tempText = '';
            if (this.label) {
                tempText += this.label;
            }
            if (event.data && this.checkKor(event.data)) {
                tempText += event.data;
            }
            console.log('BSSelectFormCtrl::onChangeLabel this.label, event.data, tempText =>', this.label, event.data, tempText);
            this.keywordChanged.emit(tempText);

            if (dropdown) {
                //if (this.label.length > 0) {
                    dropdown.show();
                //} else {
                //    dropdown.hide();
                //}
            }

        }, 1);
    }

    checkKor(str) { 
        const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g; if(regExp.test(str)){ return true; }else{ return false; } 
    }
}
