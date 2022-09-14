import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bo-submit-button-form',
  templateUrl: './bo-submit-button-form.html',
  styleUrls: ['./bo-submit-button-form.css']
})
export class BOSubmitButtonForm implements OnInit {

    @Input() title: string = '적용';
    @Input() hasCancelBtn: boolean = false;
    @Output() clickCancel = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    onClickCancel() {
        this.clickCancel.emit({});
    }
}
