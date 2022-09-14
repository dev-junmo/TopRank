import { Component, Injectable, Input, ContentChildren, QueryList, AfterContentInit, ViewChild } from '@angular/core';
import { BOBaseForm } from '../../form/bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BSInputFormCtrl } from '../bs-input.ctrl/bs-input.ctrl';
import { BSInputConfig } from './bs-input-config';

/*
    validator 전달 처리해야함
*/

@Component({
  selector: 'bs-group-input',
  templateUrl: './bs-group-input.ctrl.html',
  styleUrls: ['./bs-group-input.ctrl.css']
})
export class BSGroupInputFormCtrl extends BOBaseForm implements AfterContentInit {

    subForm: FormGroup;

    @Input() name: string;
    @Input() style: string;
    @Input() value: string;
    @Input() separator: string = '-';

    @ContentChildren(BSInputConfig) inputs: QueryList<BSInputConfig>;
    @ViewChild('bsInputId') inputCtrl: BSInputFormCtrl;

    constructor(private fb: FormBuilder) {
        super();
    }

    onInit() {

        //let inputs_ = this.inputs.toArray();
        let ctrl = this.formGroup.get(this.name);
        ctrl.valueChanges.subscribe(data => this.onValueChanged(data));

    }

    ngAfterContentInit() {
        console.log("inputs=>", this.inputs);
        //this.name + '[' + i + ']'

        let inputs = this.inputs.toArray();
        let ctrls: any = {};

        let i = 0;
        for (let ctrl of inputs) {
        ctrls[this.name + '[' + i + ']'] = [];
        i++;
        }

        console.log("------------", ctrls);

        this.subForm = this.fb.group(ctrls);
    }

    onValueChanged(data) {
        if (!data) return;
        console.log("BSGroupInputFormCtrl::onValueChanged =>", data);

        let array: Array<any> = [];

        try {
            //throw new Error('Error');
            array = data.split(this.separator);
        } catch(e) {
            console.log(e);
            return;
        }

        let i = 0;
        for(let value of array) {
          let ctrl = this.subForm.get(this.name + '[' + i + ']');
          if(ctrl) {
            ctrl.patchValue(value);
          }
          i++;
        }
    }

  // 입력값이 바뀔 때 호출됨
  onChange(event, index) {

    let inputs = this.inputs.toArray();
    let ctrl = this.formGroup.get(this.name);

    console.log("onChange =", this.name, event.target.name, inputs, index, ctrl.value);  // sms[0], sms[1]
    
    // null check
    let j = 0;
    let checkValue = '';
    for(let item of inputs) {
      let _value = '';
      let ctrl = this.subForm.get(this.name + '[' + j + ']');
      if (ctrl.value) {
        if (ctrl.value.indexOf(this.separator) !== -1) {
          alert('입력값에 ' + this.separator + '문자는 사용하실 수 없습니다.');
          _value = '';
        } else {
          _value = ctrl.value;
        }        
      }
      // add value
      checkValue += _value;
      j++;
    }

    if (!checkValue) {
      console.log("BSGroupInputFormCtrl::onChange checkValue=>", checkValue);
      ctrl.patchValue(checkValue);
      return;
    }

    // make value
    let value : string = '';
    let i = 0;
    for(let item of inputs) {
      let _value = '';
      let ctrl = this.subForm.get(this.name + '[' + i + ']');
      if (ctrl.value) {
        _value = ctrl.value;
      }

      // add value
      value += _value;

      // add separator
      if (i != inputs.length-1)
        value += this.separator;

      i++;
    }
    console.log("BSGroupInputFormCtrl::onChange value=>", value);
    ctrl.patchValue(value);

  }
}
