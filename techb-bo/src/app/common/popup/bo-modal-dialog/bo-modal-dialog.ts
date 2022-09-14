import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'bo-modal',
  templateUrl: './bo-modal-dialog.html',
  styleUrls: ['./bo-modal-dialog.css'],
  encapsulation: ViewEncapsulation.None
})
export class BOModalDialog implements OnInit {

    title: string;
    template: TemplateRef<any>;
    btnOkText: string = 'Ok';
    btnCancelText: string = 'Cancel';

    subject: Subject<any>;

    //option
    autoClose: boolean = true;
    auction: boolean = false;

    constructor(public bsModalRef: BsModalRef) {
        console.log("BOModalDialog::constructor bsModalRef = ", bsModalRef);        
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

