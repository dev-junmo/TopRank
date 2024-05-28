import { BSApi } from '../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ResponsiveState } from 'ng2-responsive';

import 'rxjs/add/operator/map';
import { Subject, Observable } from 'rxjs/Rx';
//import { AppService } from '../common/service/app.service';

@Injectable()
export class GoodsStore {

    private _onChangeCart: Subject<any> = new Subject<any>();
    //private device;

    constructor(
        public api: BSApi,
        //public appService: AppService,
        private thestate: ResponsiveState) {

        //this.device = this.appService.getDevice();
    }

    get(goods_seq) {
        return this.api.get('product/goods/'+ goods_seq);
    }

    list() {
        return this.api.get('product/goods');
    }

    search(keyword, tempKey) {
        return this.api.get('product/goods/get/search', {
            keyword: keyword, 
            store_name: tempKey // 임시코드 store_name 필드에 망고가 포함된것을 임시로 가져오도독 함
        });    
    }

    ///////////////////////////
    // 구독

    getWithSubscribe(goodsSeq, keyword) {
        return this.api.get('product/goods/get-with-subscribe/'+ goodsSeq, {keyword: keyword});
    }

    // subscribe(goodsSeq) {
    //     return this.api.put('product/goods/subscribe/'+ goodsSeq, {});
    // }

    // unsubscribe(goodsSeq) {
    //     return this.api.put('product/goods/unsubscribe/'+ goodsSeq, {});
    // }

}
