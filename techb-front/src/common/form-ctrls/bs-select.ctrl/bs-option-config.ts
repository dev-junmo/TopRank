import { Directive, Input, Output, OnInit, ContentChild, EventEmitter } from '@angular/core';

@Directive({
  selector: 'bs-option-config'
})
export class BSSelectOptionConfig {

  // <option [disabled]="true" *ngFor="let item of options"
  //                    [value]="item">{{item}}일</option>

  @Input() disabled: boolean;
  @Input() value: string;
  @Input() label: string;

  constructor() {
    // console.assert(this.value);
    // console.assert(this.label);
  }


}
