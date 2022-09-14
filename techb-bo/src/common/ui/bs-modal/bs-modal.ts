import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'bs-modal',
  templateUrl: './bs-modal.html',
  styleUrls: ['./bs-modal.css'],
  encapsulation: ViewEncapsulation.None
})
export class BSModal {

    template: TemplateRef<any>;

    constructor(public bsModalRef: BsModalRef) {

    }

}

