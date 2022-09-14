import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bs-button',
  templateUrl: './bs-button.html',
  styleUrls: ['./bs-button.css']
})
export class BSButton implements OnInit {

    @Input() id : string;
    @Input() title: string;
    @Input() type: string;
    @Input() disabled: boolean = true;

    @Input() imgUrl: string;
    @Input() imgUrlDisabled: string;

    //@Output() click = new EventEmitter();

    public isImageButton: boolean = false;

    private types : Array<string> = [

        'l-navy',//
        'm-darkgrey',
        'm-navy',
        'm-white',
        'mh-darkgrey',
        'm-lightgrey-border',//
        'm-grey-border',//
        'round-s-grey',
        'round-m-grey',
        'round-s-white',
        'round-m-darkgrey',//
        'round-m-white',
        'round-m-white-red',//
        'round-m-white-border',
        's-darkblue',//
        'xs-darkblue',//
        's-lightgrey',
        's-lightnavy',
        's-grey',
        'm-darkblue',//
        'm-black',
        'sh-grey',
        'square-ss-white',
        'square-ss-grey',
        's-white',//
        's-darkgrey',//
        's-red',//
        'white-s-border',
        'square-s-red',
        'square-m-darknavy1',
        'square-m-darknavy2',
        'square-m-black-btn',
        'square-m-white-btn',
        'square-s-black-btn',
        'square-s-white-btn',
        'square-s-greyborder-btn',
        'square-s-navy-btn',
        'square-s-red-btn',

        //tb-btn
        'tb-choice-btn',

        // arrow
        'image-s-down-btn',
        'image-s-dbl-down-btn',
        'image-s-up-btn',
        'image-s-dbl-up-btn',
        'image-s-x-btn'

        // 'square-s-down-btn',
        // 'square-s-dbl-down-btn',
        // 'square-s-up-btn',
        // 'square-s-dbl-up-btn',
    ]

    constructor() { }

    ngOnInit() {

        if (this.type == 'image-s-down-btn') {
            this.imgUrl = 'assets/img/display/on_down.png';
            this.imgUrlDisabled = 'assets/img/display/off_down.png';
            this.isImageButton = true;
        } else if (this.type == 'image-s-dbl-down-btn') {
            this.imgUrl = 'assets/img/display/on_down_skip.png';
            this.imgUrlDisabled = 'assets/img/display/off_down_skip.png';
            this.isImageButton = true;
        } else if (this.type == 'image-s-up-btn') {
            this.imgUrl = 'assets/img/display/on_up.png';
            this.imgUrlDisabled = 'assets/img/display/off_up.png';
            this.isImageButton = true;
        } else if (this.type == 'image-s-dbl-up-btn') {
            this.imgUrl = 'assets/img/display/on_up_skip.png';
            this.imgUrlDisabled = 'assets/img/display/off_up_skip.png';
            this.isImageButton = true;
        } else if (this.type == 'image-s-x-btn') {
            this.imgUrl = 'assets/img/display/on_x_btn.png';
            this.imgUrlDisabled = 'assets/img/display/on_x_btn.png'; // temp
            this.isImageButton = true;
        } 
    }

    addButtonClass() {

        for(let type of this.types) {

            if (type == this.type) {
                return this.type;
            }
        }

        return null;
    }

    onClick() {
        //alert('click')
        //alert("bo-page-button =" + this.id);
        //this.click.emit(this.id);
    }

}
