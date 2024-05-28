import { Injectable } from '@angular/core';
import { MemberSingleSelectPopup } from './member-single-select.popup';
import { BOModalDialogService } from '../bo-modal-dialog/index';

// import 'rxjs/add/operator/map';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';

// import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { BsModalService } from 'ngx-bootstrap';


@Injectable()
export class MemberSelectPopupService {

    constructor(public modalService: BOModalDialogService) {
    }

    popup(multiSelect = false) {

        let title = '회원 선택';
        let okButtonTitle = '닫기';
        let cancelButtonTitle = null;

        if (multiSelect) {
            okButtonTitle = '선택 한 회원 적용';
            cancelButtonTitle = '취소';
        }

        return this.modalService.popupWidthComponent(MemberSingleSelectPopup, title, okButtonTitle,
            cancelButtonTitle, { multiSelect: multiSelect }, 'large');
    }

}
