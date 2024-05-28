import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BOModalDialog } from '../bo-modal-dialog/index';
import { ModalMemberListPage } from './modal-member-list/modal-member-list.page';
@Component({
  selector: 'member-single-select-popup',
  templateUrl: './member-single-select.popup.html',
  styleUrls: ['./member-single-select.popup.css', '../bo-modal-dialog/bo-modal-dialog.css'],
  encapsulation: ViewEncapsulation.None
})

export class MemberSingleSelectPopup extends BOModalDialog {

    public multiSelect;

    @ViewChild('memberListPage') memberListPage: ModalMemberListPage;


    constructor(bsModalRef: BsModalRef) {
        super(bsModalRef);
        console.log("BOModalDialog::constructor bsModalRef = ", bsModalRef);
    }

    // 단일건으로 선택을 누른 경우

    onSelectedMember(item) {

        if (this.autoClose == true) {
            this.bsModalRef.hide();
        }
        if (this.subject) {
            this.subject.next(item);
        }
    }

    //

    onOk() {

        console.log("onOk getSelectedMembers =>", this.memberListPage.getSelectedMembers());

        if (this.subject) {
            this.subject.next(this.memberListPage.getSelectedMembers());
        }

        if (this.autoClose == true) {
            this.bsModalRef.hide();
        }
    }

    // onCancel() {

    //     if (this.autoClose == true) {
    //         this.bsModalRef.hide();
    //     }

    //     if (this.subject) {
    //         this.subject.next('CANCEL');
    //     }
    // }
}
