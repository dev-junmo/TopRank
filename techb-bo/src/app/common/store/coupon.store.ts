import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class CouponStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/coupon/coupon');
    }

    create(params, isOnline = true) {

        let method = 'online';
        if (isOnline == false) {
            method = 'offline';
        }
        return this.api.post(this.command + '/' + method, params);
    }

    // createPrint(params) {
    //     return this.api.post(this.command + '/offline', params);
    // }

    update(id, params, isOnline = true) {

        let method = 'online';
        if (isOnline == false) {
            method = 'offline';
        }

        return this.api.put(this.command + '/' + method + '/' + id , params);
    }

    // offlineUpdateCoupon(id, params) {
    //     return this.api.put('admin/coupon/coupon/offline/' + id , params);
    // }

    copyCoupon(params) {
        return this.api.post('admin/shop/coupon/coupon/copy',params);
    }

    // 쿠폰 발급
    issueCoupon(params) {
        return this.api.post('admin/shop/coupon/download', params);
    }


    //인증번호 보기
    getPrintCouponCodeList(coupon_seq, keyword?) {

        let params = {
            'coupon_seq' : coupon_seq
        };

        if (keyword) {
            params['keyword'] = keyword;
        }

        return this.api.get('admin/shop/coupon/offlinecoupon', params);
    }

    // //검색
    // search(couponSeq, keyword) {
    //     let params = {
    //         'coupon_seq' : couponSeq
    //         'keyword' : keyword
    //     };

    //     return this.api.get('admin/shop/coupon/offlinecoupon', params);
    // }
}
