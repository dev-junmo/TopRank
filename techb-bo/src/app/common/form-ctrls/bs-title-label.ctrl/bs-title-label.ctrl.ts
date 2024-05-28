import { Component, OnInit, Input } from '@angular/core';
import { BOBaseForm } from '@app/common/form//bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bs-title-label-ctrl',
  templateUrl: './bs-title-label.ctrl.html',
  styleUrls: ['./bs-title-label.ctrl.css']
})
export class BSTitleLabelCtrl {

  @Input() title: string;
  @Input() description: string;

  private isShowTootip: boolean = false;

  constructor() {
    //super();
  }

  onInit() {
  }

  showTooltip(){
    this.isShowTootip = true;
  }

  hideTooltop(){
    this.isShowTootip = false;
  }
}
