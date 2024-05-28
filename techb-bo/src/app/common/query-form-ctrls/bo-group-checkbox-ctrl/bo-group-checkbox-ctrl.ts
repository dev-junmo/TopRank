import { Component, Injectable, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators, FormBuilder, NgControl } from '@angular/forms';

import { BOBaseForm } from '@app/common/form//bo-base-form/bo-base-form';
import { BOCheckBoxConfig } from './bo-checkbox-config';

//////////////////////////////////////////////////////////////////////////
//
// 1.상위의 폼그룹과 연결되어 있어 this.formGroup로 사용가능
// 2. onInit()

@Component({
    selector: 'bo-group-checkbox',
    templateUrl: './bo-group-checkbox-ctrl.html',
    styleUrls: ['./bo-group-checkbox-ctrl.css']
})
export class BOGroupCheckBoxCtrl extends BOBaseForm implements AfterContentInit {

    //@Input() title: string;
    @Input() name: string;
    @Input() hasAllBtn: boolean = false;

    @ContentChildren(BOCheckBoxConfig) checkboxs: QueryList<BOCheckBoxConfig>;

    constructor() {
        super();
    }

    ngAfterContentInit() {

        let checks = this.checkboxs.toArray();

        let i = 0;
        for( let option of checks) {
            let name: string = this.name + '[' + i + ']';
            this.ctrl = this.formGroup.get(name);

            console.log("BOGroupCheckBoxCtrl::ngAfterContentInit name = ", name, this.ctrl);

            if (!this.ctrl) {
                this.formGroup.addControl(name, new FormControl(''));
            }

            i++;
        }

        this.formGroup.removeControl(this.name);
    }

    onCheckboxChange(event, index) {

        let checks = this.checkboxs.toArray();

        console.log("onCheckboxChange =", event.target.id, checks, index, checks[index].value);    // sms[0], sms[1]
        let ctrl = this.formGroup.get(event.target.id);

        if (ctrl.value) {
            ctrl.patchValue(checks[index].value);     /// 여기
        } else {
            ctrl.patchValue('');
        }
    }

    onClickAllBtn() {
        let checks = this.checkboxs.toArray();

        // 전체가 true인자 체크
        let isAllTrue = true;
        let j = 0;
        for (let checkbox of checks) {
            let name = this.name + '[' + j + ']';
            let ctrl = this.formGroup.get(name);
            if (ctrl.value === false || ctrl.value === '') {
                isAllTrue = false;
                break;
            }
            j++;
        }

        let i = 0;
        for (let checkbox of checks) {
            let name = this.name + '[' + i + ']';
            let ctrl = this.formGroup.get(name);

            //if (ctrl.value == false)
            if (isAllTrue === true) {
                ctrl.setValue(false);
                ctrl.setValue('');
            } else {
                ctrl.setValue(true);
                ctrl.setValue(checks[i].value);
            }
            i++;
        }
    }
}
