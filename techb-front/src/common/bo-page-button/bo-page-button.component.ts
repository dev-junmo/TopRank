import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bo-page-button',
  templateUrl: './bo-page-button.component.html',
  styleUrls: ['./bo-page-button.component.css']
})
export class BOPageButtonComponent implements OnInit {

  @Input() id : string;
  @Input() title: string;
  @Input() type: string;
  @Input() imgUrl: string;
  @Input() disabled: boolean = false;

  //@Output() click = new EventEmitter<string>();

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
    's-whitegray',
    'square-s-red',
    'square-m-darknavy1',
    'square-m-darknavy2',
    's-greyborder',
    'black-back-btn',
    'black-border-btn',
    'new-all',
    'new-square-white-border',
    'square-m-black-btn',
    'square-m-white-btn',
    'square-m-red-btn',
    'square-m-grey-btn',
    'square-s-black-btn',
    'square-s-white-btn',
    'square-s-grey-btn',
    'square-s-greyborder-btn',
    'square-s-navy-btn',
    'square-s-red-btn'
  ]

  constructor() { }

  ngOnInit() {
  }

  addButtonClass(){

    for(let type of this.types) {
      if (type == this.type)
        return this.type;
    }

    return null;
  }

  onClick() {
    //alert("bo-page-button =" + this.id);
    //this.click.emit(this.id);
  }

}
