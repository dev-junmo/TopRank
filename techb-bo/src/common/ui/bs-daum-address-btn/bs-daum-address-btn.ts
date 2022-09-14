import { Component, OnInit, TemplateRef , ViewChild , Input, Output, EventEmitter ,ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bs-daum-address-btn',
    templateUrl: './bs-daum-address-btn.html',
    styleUrls: ['./bs-daum-address-btn.css'],
    encapsulation: ViewEncapsulation.None
})
export class BSDaumAddressBtn {

    @Output() result = new EventEmitter<Object>();
    @Input() height: any;

    public options = {
        class: ['btn','ng-regular','ads-btn'],
        //type: 'layer',
        //target: 'layer',
        //width: 500,
        //height: 400,
        //border: 1
    };
  
     onChangeAddress(event) {
        console.log(event);            
        this.result.emit(event);
    }

}

