import { BSApi } from '../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class FooterStore  extends BSBaseStore {

    
    public data: any = null;
    private requetedData: boolean = false;
    private _onChangeFooterData: Subject<any> = new Subject<any>();
    
    constructor(public api: BSApi) {
        super(api, '');
    }

    load() {

        // cache
        if (this.data) {
            //alert("use cache");
            setTimeout(()=>{
                this._onChangeFooterData.next(this.data);
            },10);            
            //return;
        }
        
        // load main data
        if (this.requetedData == false) {
            this.requetedData = true;
            this.api.get('front/common', null, null, false, true).subscribe(resp => {
                //alert("save cache");
                this.data = resp;
                this._onChangeFooterData.next(this.data);
            });
        }        

        return this._onChangeFooterData;


        // return this.api.get('front/common');
    }

}
