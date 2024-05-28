import { Directive, Input, Output, OnInit, ContentChild, EventEmitter } from '@angular/core';

@Directive({
  selector: 'bo-period-query-option-config'
})
export class BSPeriodOptionConfig implements OnInit {

  @Input() value: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}


