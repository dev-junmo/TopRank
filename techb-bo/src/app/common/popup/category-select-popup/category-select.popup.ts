import { Component, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BOModalDialog } from '../bo-modal-dialog/index';

@Component({
  selector: 'category-select-popup',
  templateUrl: './category-select.popup.html',
  styleUrls: ['./category-select.popup.css', '../bo-modal-dialog/bo-modal-dialog.css'],
  encapsulation: ViewEncapsulation.None

})
export class CategorySelectPopup extends BOModalDialog {
    constructor(bsModalRef: BsModalRef) {
        super(bsModalRef);
        console.log("BOModalDialog::constructor bsModalRef = ", bsModalRef);
    }
}
