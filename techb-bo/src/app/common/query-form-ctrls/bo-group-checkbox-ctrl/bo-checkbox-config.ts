import { Directive, Input, Output, OnInit, ContentChild, EventEmitter } from '@angular/core';

@Directive({
  selector: 'bo-checkbox-config'
})
export class BOCheckBoxConfig implements OnInit {

    @Input() title: string;
    @Input() value: string;
    @Input() bgColor: string;

    // @Output() click = new EventEmitter<any>();
   
    constructor() { }

    ngOnInit() {
    }

    // fireOnClick(selectedRows) {
    //     this.click.emit({ id : this.id, rows: selectedRows});
    // }
}
