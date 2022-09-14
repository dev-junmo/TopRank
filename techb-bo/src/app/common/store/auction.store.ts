import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';

@Injectable()
export class AuctionStore {

    constructor(public api: BSApi) {}

    setSuccessBidders(items , biddersId) {
        let params = {
            event_seq : items.event_seq,
            auction_bidder_seq : [
                biddersId
            ]
        };
        return this.api.put('admin/event/auction_bidder/success' , params);
    }

    //낙찰자 삭제
    deleteSuccessBidders(items , biddersId) {
        let params = {
            event_seq : items.event_seq,
            auction_bidder_seq : [
                biddersId
            ],
        }
        return this.api.delete('admin/event/auction_bidder/success' , params);
    }
    //참여자 삭제
    deleteBidders(eventId , biddersId) {
        let params = {
            event_seq : eventId,
            auction_bidder_seq : [ 
                biddersId 
            ],
        };
        return this.api.delete('admin/event/auction_bidder' , params);
    }

    delBestReview(id) {
        return this.api.delete('admin/goods/review/best/' + id);
    }

    //옥션 종료
    updateAuctionStatus(type , id) {
        let params = {
            auction_status : type
        };
        return this.api.put('admin/event/auction/status/' + id , params);
    }
    
    updateDisplay(id, pararms) {
        return this.api.put('admin/event/auction/' + id, pararms);
    }

}
