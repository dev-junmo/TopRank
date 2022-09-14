import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';


@Injectable()
export class GoodsReviewStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'goods/goodsreview');
    }

    // 작성한 리뷰
    list(page = 1, limit = 5, sDate?, eDate?,  type?) {
        console.log('GoodsReviewStore::list page, limit =>', page, limit);

        let params: any = {
            'order[0][column]' : 'regist_date',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (sDate) {
            params['regist_date[min]'] = sDate;
        }

        if (eDate) {
            params['regist_date[max]'] = eDate;
        }

        if (type) {
            params['use_type'] = type;
        }

        return this.api.get(this.command, params);
    }

    // 작성한 리뷰
    myList(page = 1, limit = 5, sDate?, eDate?,  type?) {

        let params: any = {
            'order[0][column]' : 'regist_date',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (sDate) {
            params['regist_date[min]'] = sDate;
        }

        if (eDate) {
            params['regist_date[max]'] = eDate;
        }

        if (type) {
            params['use_type'] = type;
        }

        return this.api.get(this.command + '/my', params);
    }

    // 작성가능한 상품후기
    // writableList() {
    //     return this.api.get(this.command + '/writable');
    // }

    writableList(page = 1, limit = 5, sDate?, eDate?,  type?) {

        let params: any = {
            //'order[0][column]' : 'regist_date',
            //'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (sDate) {
            params['regist_date[min]'] = sDate;
        }

        if (eDate) {
            params['regist_date[max]'] = eDate;
        }

        if (type) {
            params['use_type'] = type;
        }

        return this.api.get(this.command + '/writable', params);
    }

    deleteWrittenReview(id) {
        return this.api.delete(this.command + '/' + id);

    }


}
