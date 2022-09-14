import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BOBaseForm } from '../../form/bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { numberValidator } from '../../form/validator/bs-validators';

@Component({
  selector: 'bs-input',
  templateUrl: './bs-input.ctrl.html',
  styleUrls: ['./bs-input.ctrl.css']
})
export class BSInputFormCtrl extends BOBaseForm { 
  @Input() style: string;
  @Input() placeholder: string;

  @Input() type: string = 'text';

  // validators
  @Input() set required(value: boolean) {

    // alert(value);
    this._required = value;
    let ctrl = this.formGroup.get(this.name);
    if (ctrl) {
        this.resetValidators();
    }
  };

  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() email: boolean;
  @Input() number: boolean;

  //state
  @Input() disabled: boolean = false;

  @Output() valueChanged = new EventEmitter<string>();
  @Output() submit = new EventEmitter<any>();

  //private ctrl: AbstractControl;

  constructor() {
    super();
  }

  onInit() {
    console.assert(this.name);
    console.assert(this.formGroup);
    this.ctrl = this.formGroup.get(this.name);

    console.log("BSInputFormCtrl::onInit name, ctrl", this.name, this.ctrl);

    this.resetValidators();
  }

  // get ctrl() {
  //   console.log("ctrlId() ctrl, id", this.formGroup, this.name);
  //   return this.formGroup.get(this.name);
  // }

  resetValidators() {
    //new FormControl('', [Validators.required, Validators.minLength(4)])
    if (!this.name || !this.formGroup) {
        console.assert(this.name);
        console.assert(this.formGroup);
        return;
    }

    const formCtrl = this.formGroup.get(this.name);
    let validators: Array<any> = [];

    if (this._required === true) {
        validators.push(Validators.required);
    }
    if (this.email === true) {
        validators.push(Validators.email);
    }
    if (this.minlength > 0) {
        validators.push(Validators.minLength(this.minlength));
    }
    if (this.maxlength > 0) {
        validators.push(Validators.maxLength(this.maxlength));
    }
    if (this.number === true) {
        validators.push(numberValidator());
    }

    //if (validators.length) {
      formCtrl.setValidators(validators);
      formCtrl.updateValueAndValidity();
    //}

    // let exisitingValidators = formCtrl.validators;
    // this.site_id_control.setValidators(Validators.compose([...existingValidators , exampleValidator]))
  }

  onChangeValueForOptionCode(event) {
    console.log('onChangeValueForOptionCode2 value =>', event.target.value);
    this.valueChanged.emit(event.target.value);
  }
}
