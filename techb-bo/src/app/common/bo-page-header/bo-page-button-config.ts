import { Directive, Input, Output, OnInit, ContentChild, EventEmitter } from '@angular/core';

@Directive({
  selector: 'bo-page-button-config'
})
export class BOPageButtonConfig implements OnInit {

    @Input() title: string;
    @Input() styleType: string;
    @Input() imgUrl: string;
    @Input() hidden: boolean = false;
    @Input() disabeld: boolean = false;
    @Output() click = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    fireOnClick() {
        this.click.emit();
    }
}
