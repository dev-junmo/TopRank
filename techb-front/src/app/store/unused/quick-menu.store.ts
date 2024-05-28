import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

import 'rxjs/add/operator/map';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class QuickMenuStore extends BSBaseStore {

    private _onChangeData: Subject<any> = new Subject<any>();

    constructor(private api: BSApi) {
        super(api, 'etc/history/recent');

        // // 1분에 한번씩
        // setInterval(()=>{
        //     this._onChangeData.next();
        // }, 3600000);
    }

    listenChangeData() {
        return this._onChangeData;
    }

    fireChangeData() {

        // 10초 후에 한번 호출
        setTimeout(()=>{
            this._onChangeData.next();
        }, 5000);
    }


    get() {

        return this.api.get(this.command);
    }

    delete(seq){
        return this.api.delete(this.command +'/'+ seq);
    }

}
