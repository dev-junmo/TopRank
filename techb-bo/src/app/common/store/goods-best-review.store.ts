import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

@Injectable()
export class GoodsBestReviewStore {

    constructor(public api: BSApi) {

    }

    setBestItem(id , best) {
        let params = {
            best : best,
        };
        return this.api.put('admin/goods/goodsreview/' + id , params);
    }

    // update(id, item) {
    //     return this.api.put('goods/review/best/' + id , item);
    // }
    changeShowHide(id , params) {
        // let params = {
        //     bestreview_seq : [
        //         id
        //     ],
        // }
        return this.api.put('admin/goods/goodsreview/' + id,  params);
    }
    bestChangeShowHide(item) {
        return this.api.put('admin/goods/review/best/use_status',  item);
    }

    delBestReview(id) {
        return this.api.delete('admin/goods/review/best/' + id);
    }
    // sendEmail(params) {
    //     return this.api.post('etc/email' , params);
    // }
}
