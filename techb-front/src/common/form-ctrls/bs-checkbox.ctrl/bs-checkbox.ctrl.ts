import { Component, Injectable, Input, ContentChildren, QueryList, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { BOBaseForm } from '../../form/bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, AbstractControl, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BSUUIDService } from '../../core/bs-uuid.service';


@Component({
    selector: 'bs-checkbox',
    templateUrl: './bs-checkbox.ctrl.html',
    styleUrls: ['./bs-checkbox.ctrl.css']
})
export class BSCheckBoxFormCtrl extends BOBaseForm {
    //trueFalse: boolean =  false;
    //@Input() name: string;
    @Input() label: string;
    @Input() value: string;
    @Input() uncheckedValue: string = '';
    @Input() style: string = "square-checkbox";
    @Input() modelValue;
    @Input() disabled: boolean = false;
    @Input() hidden: boolean = false;

    @Output() changeValue = new EventEmitter();

    public seq: number;

    subForm: FormGroup;
    public subCtrl: AbstractControl;


    constructor(private fb: FormBuilder, private bsUUIDService: BSUUIDService) {
        super();
        this.seq = bsUUIDService.seq();
    }

    onInit() {

        console.assert(this.name);

        this.subForm = this.fb.group({});
        this.subForm.addControl(this.name, new FormControl(''));
        this.subCtrl = this.subForm.get(this.name);
        console.assert(this.subCtrl);
        //this.subCtrl.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onInitAterView() {

        // 초기에 로딩 후 컨트롤을 체크안하면 uncheckedValue가 안들어가는 버그 수정
        // 이 시점에 value가 이미 로딩이 되서 y로 나옴
        // 그래서 이 경우는 초기값 세팅을 하지 않음
        if (this.uncheckedValue) {
            console.log('BSCheckBoxFormCtrl::onInitAterView::setValue uncheckedValue, ctrl.getValue() =>', this.uncheckedValue, this.ctrl.value);
            if (!this.ctrl.value) {
                this.ctrl.setValue(this.uncheckedValue);
            }
        }

        this.ctrl.valueChanges.subscribe(data => this.onValueChanged(data));    

        // if (!this.formGroup) {
        //     console.log("warnig : 컨트롤에 formgroup입력해주세요.");
        // }

        // console.log("onInit => ", this.name, this.formGroup);


        // 초기값 세팅을 위해서
        // setTimeout(()=>{

        //     let ctrl = this.formGroup.get(this.name);
        //     console.log("onValueChanged1 name, 현재값, bs컨트롤값= ", this.name, ctrl.value, this.value);

        //     // checkbox는 값이 있으면 checked, 없으면 unchecked되는데
        //     // 데이타가 N같은 값인데 true가 되는 현상이 있어서 아래와 같이 처리

        //     if (ctrl.value != this.value) {
        //         console.log("onValueChanged2 name, 현재값, bs컨트롤값= ", this.name, ctrl.value, this.value);
        //         //ctrl.setValue('');
        //         setTimeout(()=> {
        //             ctrl.setValue(false);
        //         }, 1000);

        //     } else {
        //         //ctrl.setValue(true);
        //     }

        //     console.assert(this.name);
        //     this.ctrl.valueChanges.subscribe(data => this.onValueChanged(data));

        // }, 1);

        // load
        //let ctrl = this.formGroup.get(this.name);
        //console.log("style",this.style);


    }

    // 폼컨트롤에 값이 patch, set되면 호출됨

    // data ----> ctrl

    onValueChanged(value) {

        console.log("BSCheckBoxFormCtrl::onValueChanged name, currValue, tureValue =>", this.name, value, this.value);

        let ctrl = this.formGroup.get(this.name);

        // 1과 1을 비교했는데 다른 값으로 나옴 , 숫자 문자 문제인듯해서 ===를 ==로 변경함
        if (value == this.value) {
            console.log("같은 값", this.name, value, this.value);
            this.subCtrl.setValue(true);
        } else {
            console.log("다른 값", this.name, value, this.value);
            this.subCtrl.setValue(false);
        }
    }

    // subform ----->

    onChange(event) {

        console.log("onChange =>", this.subCtrl.value);    // sms[0], sms[1]

        let value;
        if (this.subCtrl.value === true) {
            value = this.value;
        } else {
            value = this.uncheckedValue;
        }

        this.ctrl.patchValue(value);
        // console.log("BSCheckBoxFormCtrl::onChange value=", ctrl.value);
        this.changeValue.emit(value);
    }
}
