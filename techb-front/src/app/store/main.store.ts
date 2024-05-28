import { BSApi } from '../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

import 'rxjs/add/operator/map';
import { Subject, Observable } from 'rxjs/Rx';
import { AppService } from '../common/service/app.service';

@Injectable()
export class MainStore extends BSBaseStore {

    // mail data
    public data: any = null;
    private requetedMainData: boolean = false;
    private _onChangeMainItem: Subject<any> = new Subject<any>();


    public navigationData: any = null;
    private _navigationDataEvent: Subject<any> = new Subject<any>();

    private device;

    constructor(public api: BSApi) {
        super(api, '');
    }

    getMainDisplayDataPan3(device, groupSeq = null) {
        let command = 'front/app/main';
        let params:any = {
            view: device,
            group_seq: groupSeq
        };

        this.api.get(command, params, null, false, true).subscribe(resp => {
            console.log('getMainDisplayDataPan3:get params, resp =>', params, resp);
            this.data = resp;
            this._onChangeMainItem.next(this.data);
        });
    }

    getMainDisplayData(device, groupSeq = null) {
        console.log('getMainDisplayData groupSeq =>', groupSeq);

        let command = 'front/main/202106';
        this._getMainDisplayData(command, device, groupSeq);        

        return this._onChangeMainItem;
    }

    getMainDisplayData_old(device, groupSeq = null) {

        console.log('getMainDisplayData_old groupSeq =>', groupSeq);

        let params:any = {
            view: device,
            group_seq: groupSeq
        };

        let command = 'front/main';
        return this.api.get(command, params, null, false, true);
    }

    _getMainDisplayData(command, device, groupSeq) {
        console.log('_getMainDisplayData groupSeq, data =>', groupSeq, this.data);

        // cache
        if (this.data) {
            setTimeout(()=>{
                this._onChangeMainItem.next(this.data);
            },1);
        } else {
            // 한번만 호출되게
            if (this.requetedMainData == true) {
                return this._onChangeMainItem;
            }
            this.requetedMainData = true;

            let params:any = {
                view: device,
                group_seq: groupSeq
            };

            console.log('_getMainDisplayData:get params =>', params);
            this.api.get(command, params, null, false, true).subscribe(resp => {
                console.log('_getMainDisplayData:get params, resp =>', params, resp);
                this.data = resp;
                this._onChangeMainItem.next(this.data);
            });
        }

        // load main data
        // if (this.requetedItem == false) {
        //     this.requetedItem = true;
        //     this.api.get('front/main?view=' + device, null, null, false, true).subscribe(resp => {
        //         this.data = resp;
        //         this._onChangeMainItem.next(this.data);
        //     });
        // }
    }

    getStarGoods(device){
        let params = {
            view: device
        }
        return this.api.get('etc/banner/stargoods',params);
    }

    // getNavigation(device?) {

    //     if (device) {
    //         this.device = device;
    //     }

    //     // cache
    //     if (this.navigationData) {
    //         setTimeout(()=>{
    //             this._navigationDataEvent.next(this.navigationData);
    //         },1);
    //     } else {

    //         let params = {};
    //         if (this.device == 'mobile') {
    //             params = { 'view': 'mobile'};
    //         }

    //         console.log('getNavigation device, params =>', this.device, params);

    //         this.api.get('front/navigation', params, null, false, true).subscribe(resp => {
    //             this.navigationData = resp;
    //             this._navigationDataEvent.next(this.navigationData);
    //         });
    //     }
    //     return this._navigationDataEvent;
    // }

    // listenChangeCart() {
    //     return this._onChangeCart;
    // }

    // delete(id) {
    //     //seq로 삭제
    //     return this.api.delete(this.command + '/boardmanager/' + id);
    // }
    // create(item){
    //     return this.api.post(this.command, item);
    // }
}
