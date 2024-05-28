import { Component, Output, EventEmitter, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';
//import { trigger, state, style, animate, transition } from '@angular/animations';
import { ResponsiveState } from 'ng2-responsive';
//import { AppService } from '../../../app/common/service/app.service';

import { BSDeviceService } from '../../service/bs-device.service';


@Component({
  selector: 'bs-tube-bar',
  templateUrl: './bs-tube-bar.html',
  styleUrls: ['./bs-tube-bar.css'],
//   animations: [
//     trigger('movePoint', [
//       state('in', style({width: '0%'})),
//       state('out', style({width: '100%'})),
//       transition('in => out', [
//         style({width: '100%'}),
//         animate(300)
//       ]),
//     //   transition('void => *', [
//     //     style({height: '0'}),
//     //     animate(100, style({height: '*'}))
//     //   ])
//     ])
//   ]
})
export class BSTubeBar implements AfterViewInit {

    private device;
    public tubePercent: any;
    private _point: number = 1;

    @ViewChild('tube1') elementView: ElementRef;

    @Input() width: any = 200;
    @Input() set point(value: number) {
        if(!value) return;
        this._point = value;
        this.update();
    }

    public _readOnly: boolean = false;
    @Input() set readOnly(value: boolean) {
        this._readOnly = value;
        this.update();
    }

    @Output() changePoint = new EventEmitter();

    private doneSetPoint:boolean = false;

    constructor(private resonsiveState : ResponsiveState,
        public deviceService: BSDeviceService) {
        this.device = this.deviceService.getDevice();

     }

    ngAfterViewInit() {

        console.log("BSTubeBar:ngAfterViewInit _point, ", this.elementView, this._point);

        setTimeout(()=>{
            this.setPoint(this._point);
        }, 100);
    }

    update() {

        if (this._readOnly) {
            this.displayPoint(this._point);
        } else {
            this.setPoint(this._point);
        }
    }
    // ngAfterViewChecked() {
    //     //console.log("BSTubeBar:ngAfterViewChecked _point, ", this.elementView, this._point);
    //     //setTimeout(()=>{
    //     if (this.doneSetPoint == false) {
    //         this.setPoint(this._point);
    //         this.doneSetPoint = true;
    //     }

    //     //}, 100);
    // }

    displayPoint(point) {

        // todo : 이 함수는 모바일에서만 테스트 되었음

        // if(this.device != 'pc') {
        //     this._point = point;
        //     this.tubePercent = (point - 1) / 4 * 100 ;
        //     return;
        // }

        if (!this.elementView) {
            console.log("setPoint elementView");
            return;
        }

        this._point = point;
        this.width = this.elementView.nativeElement.clientWidth;
        console.log("setPoint width =>", this.width, this._point);
        let _tubePercent = Math.round(30 / this.width * 100);

        let p = point - 1;
        let tpos = Math.round(_tubePercent / 4 * p);
        let pos = 100 / 4  * p + (_tubePercent - tpos);

        console.log("point, pos =>", point, _tubePercent, tpos, pos);

        this.tubePercent = pos;
        //this.tubePercent = point *

        // if(point == 1) {
        //     this.tubePercent = _tubePercent;
        // } else if (point == 5) {
        //     this.tubePercent = 100;
        // } else {
        //     //this.tubePercent = 50 + _tubePercent / 2;

        // }

    }

    setPoint(point) {

        point = parseInt(point);

        // if(this.device != 'pc') {
        //     this._point = point;
        //     this.changePoint.emit(point);
        //     if(point == 1) {
        //         this.tubePercent = 0;
        //     } else if(point == 3) {
        //         this.tubePercent = 55;
        //     } else if (point == 5) {
        //         this.tubePercent = 100;
        //     }            
        //     this.tubePercent = 0;
        //     console.log('setPoint2 point =>', this.tubePercent);
        //     return;
        // }

        if (!this.elementView) {            
            return;
        }

        this._point = point;
        this.width = this.elementView.nativeElement.clientWidth;
        console.log("setPoint width =>", this.width);
        let _tubePercent = Math.round(30 / this.width * 100);

        if(point == 1) {
            this.tubePercent = _tubePercent + 1;
        } else if(point == 3) {
            this.tubePercent = 50 + _tubePercent / 2;
        } else if (point == 5) {
            this.tubePercent = 100;
        }

        console.log('setPoint tubePercent, width =>', this.tubePercent, this.width);
        this.changePoint.emit(point);
    }

    onClickProgress(event) {
        console.log('onClickProgress _readOnly, width, event.offsetX =>',
            this.width, event.offsetX, this._readOnly, event.srcElement.clientWidth/3);

        if (this._readOnly) {
            return;
        }

        if(this.width / 3 > event.offsetX) {
            this.setPoint(1);
        } else if (this.width / 3 * 2 > event.offsetX ){
            this.setPoint(3);
        } else {
            this.setPoint(5);
        }
    }
}

