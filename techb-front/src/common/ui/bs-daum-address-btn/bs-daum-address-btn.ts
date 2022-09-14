import { Component, OnInit, TemplateRef , ViewChild , Input, Output, EventEmitter ,ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bs-daum-address-btn',
    templateUrl: './bs-daum-address-btn.html',
    styleUrls: ['./bs-daum-address-btn.css'],
    encapsulation: ViewEncapsulation.None
})
export class BSDaumAddressBtn implements OnInit {

    @Input() type: string = 'popup';
    @Input() isMobile: boolean = false;
    @Output() result = new EventEmitter<Object>();

    // popup, layer, inline
    
    public options:any = {};

    // popup
    public optionsPopup = {
        class: ['btn','ng-regular','ads-btn'],
        type: 'popup',  // popup 또는 layer
        //target: 'layer',
        // width: 600, //window.innerWidth - 50,
        // height: 600, //window.innerWidth - 20,
        border: 2
    };

    // layer 
    public optionsLayer = {
        class: ['btn','ng-regular','ads-btn'],
        type: 'layer',  // popup 또는 layer
        target: 'layer',
        width: 450, //window.innerWidth - 50,
        height: 300, //window.innerWidth - 20,
        border: 2
    };

    // inline 
    public optionsInline = {
        class: ['btn','ng-regular','ads-btn'],
        type: 'inline',  // popup 또는 layer
        target: 'wrap',
        border: 3
    };

    constructor() {

        //this.options = this.optionsPopup;

        // #todo, 타블릿, 별도 처리 하는 부분 봐야 함
        if(window.innerWidth > 767) {
            this.isMobile = false;
        } else {
            this.isMobile = true;
        }

        //화면보다 작으면 줄인다.
        if (this.isMobile && window.innerWidth < 767) {
            this.optionsLayer.width = window.innerWidth - 60;
            this.optionsLayer.height = window.innerHeight - 300;

            // 아이폰5에서 최소 길이 확보
            if (this.optionsLayer.width < 266) {
                this.optionsLayer.width = 266;
            }            

            if (this.optionsLayer.height < 300) {
                this.optionsLayer.height = 300;
            }          
        }    
        
        console.log('BSDaumAddressBtn::constructor optionsLayer.width, optionsLayer.height =>', 
            this.optionsLayer.width, this.optionsLayer.height);
    }

    ngOnInit() {             

        if (this.type == 'popup') {
            this.options = this.optionsPopup;
        } else if (this.type == 'layer') {
            this.options = this.optionsLayer;           
        } else if (this.type == 'inline') {
            this.options = this.optionsInline;           
        }      

        
        //alert(this.type);
    }    
  
    onChangeAddress(event) {
        console.log(' onChangeAddress event =>', event);            
        this.result.emit(event);
    }

}

