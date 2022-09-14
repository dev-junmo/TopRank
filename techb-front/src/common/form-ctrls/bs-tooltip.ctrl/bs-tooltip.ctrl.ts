import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bs-tooltip',
  templateUrl: './bs-tooltip.ctrl.html',
  styleUrls: ['./bs-tooltip.ctrl.css'],
  encapsulation: ViewEncapsulation.None
})
export class BSTooltipCtrl {

  @Input() text: string;

  public isShowTootip: boolean = false;

  constructor() {
    //super();
  }

  showTooltip(){
    this.isShowTootip = true;
  }
  
  hideTooltop() {
    this.isShowTootip = false;
  }
}
