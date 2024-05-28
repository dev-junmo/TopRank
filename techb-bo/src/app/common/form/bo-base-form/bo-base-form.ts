import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, Validators, FormBuilder, NgControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'bo-base-form',
    templateUrl: './bo-base-form.html',
    styleUrls: ['./bo-base-form.css']
})
export class BOBaseForm implements AfterViewInit, OnInit {

    @Input() formGroupName: string;
    @Input() formGroup: FormGroup;
    @Input() name: string;
    @Input() style: string;
    @Input() value: string;
    @Input() disabled: boolean = false;

    public _required: boolean;

    // validators
    @Input() set required(value: boolean) {
        this._required = value;

        if (this.ctrl) {
            this.resetValidators();
        }
    };


    public ctrl: AbstractControl;

    constructor() {

    }

    ngOnInit() {
        console.assert(this.formGroup);
        console.assert(this.name);

        console.log("BOBaseForm::ngOnInit name, formGroup =>", this.name, this.formGroup);

        // 폼컨트롤 선언을 안했어도 자동으로 컨트롤을 추가함
        this.ctrl = this.formGroup.get(this.name);
        if (!this.ctrl) {
            this.formGroup.addControl(this.name, new FormControl(''));
            this.ctrl = this.formGroup.get(this.name);
        }
        console.assert(this.ctrl);

        console.log("BOBaseForm::ngOnInit2 ctrl =>", this.ctrl);

        this.onInit()

    }

    public onInit() {

    }

    ngAfterViewInit() {

        console.log("ngAfterViewInit => ", this.name);

        this.onInitAterView();
        this.resetValidators();
    }

    public onInitAterView() {

    }

    resetValidators() {

        if (!this.name || !this.formGroup) {
            console.assert(this.name);
            console.assert(this.formGroup);
            return;
        }

        if (!this.ctrl) {
            //console.assert(this.ctrl);
            return;
        }

        let validators: Array<any> = [];

        if (this._required === true) {
            validators.push(Validators.required);
            console.log("resetValidators required => ", this.ctrl);
        }

        this.ctrl.setValidators(validators);
        this.ctrl.updateValueAndValidity();

        console.log('resetValidators name =>', this.name, this.formGroup, this.ctrl);
    }

    //////////////////////////////////////////////////////////////
    //  
    createControl(name) {
        // 폼컨트롤 선언을 안했어도 자동으로 컨트롤을 추가함
        let ctrl: AbstractControl = this.formGroup.get(name);
        if (!ctrl) {
            this.formGroup.addControl(name, new FormControl(''));
            ctrl =  this.formGroup.get(name);
        }
        return ctrl;
    }

    removeControl(name) {

        // 폼컨트롤 선언을 안했어도 자동으로 컨트롤을 추가함
        let ctrl: AbstractControl = this.formGroup.get(name);
        if (ctrl) {
            this.formGroup.removeControl(name);
        }
    }


}
