import { BSApi } from '../../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class AuctionStore  extends BSBaseStore {

    constructor(public api: BSApi) {
        super(api, '');
    }

    get(id) {
        return this.api.get('shop/goods/auction/' + id);
    }

    bidder(event_seq,price){
        let params ={
            event_seq: event_seq,
            auction_price: price
        }
        return this.api.post('shop/goods/auction_bidder' , params);
    }

}
