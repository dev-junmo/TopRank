import { Component, OnInit, Input } from '@angular/core';
import { BOBaseForm } from '@app/common/form//bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bs-input-title-ctrl',
  templateUrl: './bs-input-title.ctrl.html',
  styleUrls: ['./bs-input-title.ctrl.css']
})
export class BSInputTitleFormCtrl extends BOBaseForm {

  @Input() id: string;
  @Input() title: string;
  @Input() style: string;
  @Input() placeholder: string;

  @Input() value: string;
  
  // validators
  @Input() required: boolean;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() email: boolean;

  constructor() {
    super();
  }

  onInit() {
    this.resetValidators();
  }

  get ctrlId() { 
    //console.log("ctrlId() ctrl, id", this.group.get(this.id), this.id);
    return this.formGroup.get(this.id); 
  }

  resetValidators() {
    //new FormControl('', [Validators.required, Validators.minLength(4)])
    const formCtrl = this.formGroup.get(this.id);
    let validators: Array<any> = [];

    if (this.required === true) {
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
    
    formCtrl.setValidators(validators);
    formCtrl.updateValueAndValidity();

    // let exisitingValidators = formCtrl.validators;
    // this.site_id_control.setValidators(Validators.compose([...existingValidators , exampleValidator]))
  }
}
