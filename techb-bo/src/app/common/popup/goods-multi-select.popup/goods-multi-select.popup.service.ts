import { Injectable } from '@angular/core';
import { GoodsMultiSelectPopup } from './goods-multi-select.popup';
import { BOModalDialogService } from '../bo-modal-dialog/index';

// import 'rxjs/add/operator/map';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';

// import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { BsModalService } from 'ngx-bootstrap';


@Injectable()
export class GoodsMultiSelectPopupService {

    constructor(public modalService: BOModalDialogService) {
    }

    // popup( providerSeqs = null, isGift = false) {
    //     let title = '상품 선택';
    //     if( isGift === true) {
    //         title = '사은품 상품 선택';
    //     }
    //     return this.modalService.popupWidthComponent(GoodsMultiSelectPopup, title, '선택', '취소', 
    //         { isGift : isGift, providerSeqs: providerSeqs}, 'large');
    // }

    // popupForGift(query) {
    //     let title = '상품선택';
    //     return this.modalService.popupWidthComponent(GoodsMultiSelectPopup, title, '선택', '취소', 
    //         { providerSeqs: providerSeqs }, 'large');
    // }

    popupWithProvider(providerSeqs) {
        let title = '상품선택';
        return this.modalService.popupWidthComponent(GoodsMultiSelectPopup, title, '선택', '취소', 
            { providerSeqs: providerSeqs }, 'large');
    }

    popup(query = null) {

        let title = '상품선택';
        return this.modalService.popupWidthComponent(GoodsMultiSelectPopup, title, '선택', '취소', 
            { query : query }, 'large');
    }


}
