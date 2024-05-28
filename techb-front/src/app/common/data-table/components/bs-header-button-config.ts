import { Directive, Input, Output, OnInit, ContentChild, EventEmitter } from '@angular/core';

@Directive({
  selector: 'bs-header-button-config'
})
export class BSHeaderButtonConfig implements OnInit {

    @Input() id: string;
    @Input() title: string;
    @Input() align: string = 'left';
    @Input() styleType: string;
    @Input() enabled: boolean = false;

    @Output() click = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    fireOnClick(selectedRows) {
        this.click.emit({ id : this.id, rows: selectedRows});
    }
}
