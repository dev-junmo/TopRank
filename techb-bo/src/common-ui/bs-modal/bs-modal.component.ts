import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-modal',
  templateUrl: './bs-modal.component.html',
  styleUrls: ['./bs-modal.component.css']
})
export class BSModalComponent implements OnInit {

  title: string;
  subTitle: string;

  message: string;
  btnOkText: string = 'OK';
  btnCancelText: string = 'Cancel';

  subject: Subject<any>;

  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit() {

  }

  // onOk() {
  //   this.bsModalRef.hide();

  //   if (this.subject) {
  //     this.subject.next('OK');
  //   }
  // }

  onCancel() {
    this.bsModalRef.hide();

    // if (this.subject) {
    //   this.subject.next('Cancel');
    // }
  }
}

