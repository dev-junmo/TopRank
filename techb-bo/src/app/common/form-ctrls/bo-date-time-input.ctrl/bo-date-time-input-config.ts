import { Directive, Input, Output, OnInit, ContentChild, EventEmitter } from '@angular/core';

@Directive({
  selector: 'bs-date-time-option-config'
})
export class BSDateTimeOptionConfig implements OnInit {

  @Input() value: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}


