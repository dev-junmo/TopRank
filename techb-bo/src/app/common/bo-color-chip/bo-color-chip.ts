import { element } from 'protractor';
import { Component, ElementRef, OnInit, EventEmitter, Input, Output, Inject, ViewChild, ComponentRef } from '@angular/core';
import { BSApi } from '@bricks/common/core/bs-api';

@Component({
  selector: 'bo-color-chip',
  templateUrl: './bo-color-chip.html',
  styleUrls: ['./bo-color-chip.css'],
})
export class BOColorChip {

    public _color: string;
    @Input() set color(value) {
        this._color = 'transparent' + ' ' + value;
    }

    constructor(private api: BSApi) {
     //console.log(this.color);
    }

    /*
           <bo-color-chip [color]="'#333443'"></bo-color-chip>
    */

    // colors() {
    //   console.log('컬러ㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓ', this.color);
    //   let color = 'transparent' + ' ' + this.color;
    //   console.log('색깔!!!!!!!!!!!!', color);
    //   return color;
    // }

}
