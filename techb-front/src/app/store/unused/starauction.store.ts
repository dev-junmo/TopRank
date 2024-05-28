import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';


@Injectable()
export class StarAuctionStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'shop/goods/auction');
    }

    list(page, limit, orderType , orderDir) {
        let params: any = {
            'order[column]': orderType,
            'order[dir]': orderDir,
            'paging[page]': page,
            'paging[limit]': limit
        }

        if (!orderType) {
            params['order[column]'] = 'regist_date';
        }
        return this.api.get(this.command, params);
   }

   getAuctionSuccessful(id) {
    let params: any = {
        'order[column]': 'auction_price',
        'order[dir]': 'desc',
        success_yn : 'y',
        event_seq : id
    }
    return this.api.get('admin/shop/goods/auction_bidder', params);
   }

//    getActiveAuction() {
//        return this.api.get('shop/goods/auction/member');
//    }

    listForMember(page = 1, limit = 6, sDate?, eDate?,  filter?) {

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
            params['member_status'] = filter;
            // if (filter == 'ing') {
            //     params['auction_status'] = 1;
            // } else if (filter == 'won') {
            //     params['auction_status'] = 2;
            // } else if (filter == 'auctioned') {
            //     params['auction_status[0]'] = 3;
            //     params['auction_status[1]'] = 4;
            // }
        }
        return this.api.get('shop/goods/auction/member', params);
    }



}
