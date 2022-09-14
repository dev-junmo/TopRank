import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class PurchaseCancelStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'shop/mypage');
    }

    getRefundStatue(){
        return this.api.get('shop/mypage/refund/get_refund_status');

    }
    //반품신청
    requestReturn(refund_code) {
        return this.api.put('shop/mypage/return/request_cancel/' + refund_code , {});
    }
    //환뷸신청
    requestExchange(refund_code) {
        return this.api.put('shop/mypage/return/request_cancel/' + refund_code , {});        
    }

    //교환정보변경
    ChangeReturnAddress(params) {
        return this.api.put('shop/mypage/return/return_modify' , params );
    }
    //환뷸정보변경
    ChangeRefundAddress(params) {
        return this.api.put('shop/mypage/refund/refund_modify' , params);        
    }

}


// 교환
// PUT /shop/mypage/return/return_modify
// 환불
// PUT /shop/mypage/refund/refund_modif