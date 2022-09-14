import { Injectable } from '@angular/core';
import { GoodsSingleSelectPopup } from './goods-single-select.popup';
import { BOModalDialogService } from '../bo-modal-dialog/index';

// import 'rxjs/add/operator/map';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';

// import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { BsModalService } from 'ngx-bootstrap';


@Injectable()
export class GoodsSingleSelectPopupService {

    constructor(public modalService: BOModalDialogService) {
    }

    /////////////////////////////////////////////
    // auctionType = AUCTION_NONE, AUCTION_READY, AUCTION_ING

    popup(auctionType = 'AUCTION_NONE') {

        let title = '상품 선택';
        if (auctionType !== 'AUCTION_NONE') {
            title = '옥션상품 선택';
        }
        return this.modalService.popupWidthComponent(GoodsSingleSelectPopup, title, '닫기', null, { auctionType: auctionType }, 'large');
    }

}
