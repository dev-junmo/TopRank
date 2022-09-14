import { Directive, Input, Output, OnInit, ContentChild, EventEmitter } from '@angular/core';

@Directive({
  selector: 'bs-input-config'
})
export class BSInputConfig implements OnInit {

  // @Input() name: string;
  // @Input() style: string;
  @Input() placeholder: string;
  @Input() value: string;

  // validators
  @Input() required: boolean;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() email: boolean;
  @Input() number: boolean;

  //state
  @Input() disabled: boolean = false;
   
  constructor() { }

  ngOnInit() {
  }

}
