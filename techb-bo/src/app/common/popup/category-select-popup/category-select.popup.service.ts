import { Injectable } from '@angular/core';
import { CategorySelectPopup } from './category-select.popup';
import { BOModalDialogService } from '../bo-modal-dialog/index';

@Injectable()
export class CategorySelectPopupService {

    constructor(public modalService: BOModalDialogService) {
    }

    popup() {
        return this.modalService.popupWidthComponent(CategorySelectPopup, '카테고리 선택', '닫기', null, null, 'large');
    }

}
