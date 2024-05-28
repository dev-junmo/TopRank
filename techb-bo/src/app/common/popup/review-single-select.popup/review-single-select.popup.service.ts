import { Injectable } from '@angular/core';
import { ReviewSingleSelectPopup } from './review-single-select.popup';
import { BOModalDialogService } from '../bo-modal-dialog/index';

// import 'rxjs/add/operator/map';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';

// import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { BsModalService } from 'ngx-bootstrap';


@Injectable()
export class ReviewSingleSelectPopupService {

    constructor(public modalService: BOModalDialogService) {
    }

    popup() {

        let title = '상품 후기 선택';
        return this.modalService.popupWidthComponent(ReviewSingleSelectPopup, title, '닫기', null, { }, 'large');
    }

}
