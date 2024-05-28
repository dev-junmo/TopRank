import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BOModalDialog } from '../bo-modal-dialog/index';

@Component({
  selector: 'review-single-select-popup',
  templateUrl: './review-single-select.popup.html',
  styleUrls: ['./review-single-select.popup.css', '../bo-modal-dialog/bo-modal-dialog.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewSingleSelectPopup extends BOModalDialog {
    constructor(bsModalRef: BsModalRef) {
        super(bsModalRef);
        console.log("BOModalDialog::constructor bsModalRef = ", bsModalRef);
    }

    onSelectedGoods(item) {
        if (this.autoClose == true) {
            this.bsModalRef.hide();
        }
        if (this.subject) {
            this.subject.next(item);
        }
    }

    onOk() {

        if (this.autoClose == true) {
            this.bsModalRef.hide();
        }

        if (this.subject) {
            this.subject.next();
        }
    }
}
