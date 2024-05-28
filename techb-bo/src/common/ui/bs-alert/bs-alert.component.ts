import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import { BSModalDialogService } from '../../../common/ui/bs-modal-dialog/index';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-alert',
  templateUrl: './bs-alert.component.html',
  styleUrls: ['./bs-alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BSAlertComponent implements OnInit {

  title: string;
  message: string;
  btnOkText: string = 'Ok';
  btnCancelText: string = 'Cancel';
  needCancelFeedback: boolean = false;
  useAppendMessage: boolean = false;

  subject: Subject<any>;
  appendMessage: string = '';

  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit() {

  }

  onOk() {
    this.bsModalRef.hide();

    if (this.subject) {
        if (this.useAppendMessage) {
            this.subject.next(this.appendMessage);
            this.appendMessage = '';
        } else {
            this.subject.next('OK');
        }      
    }
  }

  onCancel() {
    this.bsModalRef.hide();

    if (this.subject && this.needCancelFeedback === true) {
      this.subject.next('CANCEL');
    }
  }
}

