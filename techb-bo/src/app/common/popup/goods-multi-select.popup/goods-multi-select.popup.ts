import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BOModalDialog } from '../bo-modal-dialog/index';
import { ModalGoodsDragListPage } from './modal-goods-drag-list/modal-goods-drag-list.page';

@Component({
  selector: 'goods-multi-select-popup',
  templateUrl: './goods-multi-select.popup.html',
  styleUrls: ['./goods-multi-select.popup.css', '../bo-modal-dialog/bo-modal-dialog.css'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsMultiSelectPopup extends BOModalDialog {

    public isGift = false;
    public providerSeqs;
    public query;
    
    constructor(bsModalRef: BsModalRef) {
        super(bsModalRef);

        console.log("BOModalDialog::constructor bsModalRef = ", bsModalRef);
    }

    @ViewChild('goodDragList') goodDragList: ModalGoodsDragListPage;
    // onSelectedGoods(goodsSeq) {
    //     if (this.autoClose == true) {
    //         this.bsModalRef.hide();
    //     }
    //     if (this.subject) {
    //         this.subject.next({goodsSeq: goodsSeq});
    //     }
    // }

    onOk() {

        if (this.autoClose == true) {
            this.bsModalRef.hide();
        }

        if (this.subject) {
            this.subject.next(this.goodDragList.targetList);
        }
    }

    onCancel() {
        this.bsModalRef.hide();

    }
}
