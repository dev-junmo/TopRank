import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class GoodsQNAStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'goods/goodsqna');
    }

    registGoodsQNA(items) {
        return this.api.post(this.command , items);
    }
    updateGoodsQNA(seq, items) {
        return this.api.put(this.command + '/' + seq, items);
    }


    delete(id) {
        return this.api.delete(this.command + '/' + id);
    }

    getGoodsItem(seq) {
        return this.api.get(this.command + '/' + seq);
    }

    // getList() {
    //     return this.api.get(this.command);
    // }

    // listAll(page = 1, limit = 10) {
    //     let params = {
    //         'order[0][column]' : 'seq',
    //         'order[0][dir]' : 'desc',
    //         'paging[page]': page,
    //         'paging[limit]': limit,
    //     }
    //     return this.api.get(this.command , params );
    // }

    list(page = 1, limit = 5, sDate?, eDate?,  filter?) {

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

        if (filter) {
            params['category'] = filter;
            //params['use_type'] = type;
        }

        return this.api.get(this.command, params);
    }

    myList(page = 1, limit = 5, sDate?, eDate?,  filter?) {

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

        if (filter) {
            params['category'] = filter;
            //params['use_type'] = type;
        }

        return this.api.get(this.command + '/my', params);
    }

    listByGoddsSeq(goodsSeq, page = 1, limit = 10) {
        let params = {
            goods_seq : goodsSeq,
            'order[0][column]' : 'seq',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit,
        }

        console.log('listByGoddsSeq url =>', this.command + '/goods_detail/list')

        return this.api.get(this.command + '/goods_detail/list', params );
    }

    listByGoodsSeqCached(goodsSeq, page = 1, limit = 10) {
        let params = {
            goods_seq : goodsSeq,
            'order[0][column]' : 'seq',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit,
        }
        return this.api.get(`${this.command}/goods_detail/list`, params, null, false, true);
    }

    getInGoodsDetail(seq) {
        return this.api.get(`${this.command}/goods_detail/${seq}`);
    }
    
    getMyGoodsQNA(seq) {
        let param = {goods_seq : 'my'}
        return this.api.get(this.command + '/' + seq , param)
    }
}
