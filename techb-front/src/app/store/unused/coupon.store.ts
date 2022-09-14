import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class CouponStore  extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'member/coupon');
    }

    registCoupon(coupon) {
        return this.api.post(this.command, coupon);
    }

    // get(useType) {
    //     let params = {
    //         use_status : useType
    //     }
    //     return this.api.get(this.command +'/download', params );
    // }

    list(page = 1, limit = 5, filter?) {

        let params: any = {
            'order[0][column]' : 'download_seq',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (filter) {
            params['use_status'] = filter;
        }

        return this.api.get(this.command +'/download', params );
    }

    // getDownLoadCp() {
    //     return this.api.get(this.command +'/downloadable' );
    // }

    listDownable(page = 1, limit = 5, filter?) {

        let params: any = {
            'order[0][column]' : 'coupon_seq',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (filter) {
            params['use_status'] = filter;
        }

        return this.api.get(this.command + '/downloadable', params );
    }

    downloadCoupon(seq) {
        let params = {
            coupon_seq : seq
        };
        return this.api.post(this.command + '/download' , params);
    }

}
