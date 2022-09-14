import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'bs-modal',
  templateUrl: './bs-modal-dialog.html',
  styleUrls: ['./bs-modal-dialog.css'],
  encapsulation: ViewEncapsulation.None
})
export class BSModalDialog implements OnInit {

    title: string;
    template: TemplateRef<any>;
    btnOkText: string = 'Ok';
    btnCancelText: string = 'Cancel';

    subject: Subject<any>;

    //option
    autoClose: boolean = true;


    constructor(public bsModalRef: BsModalRef) {
        console.log("BSModalDialog::constructor bsModalRef = ", bsModalRef);
    }

    ngOnInit() {
        console.log("template = ", this.template);
    }

    onOk() {

        if (this.autoClose == true) {
            this.bsModalRef.hide();
        }

        if (this.subject) {
            this.subject.next('OK');
        }
    }

    onCancel() {

        if (this.autoClose == true) {
            this.bsModalRef.hide();
        }

        if (this.subject) {
            this.subject.next('CANCEL');
        }
    }
}

