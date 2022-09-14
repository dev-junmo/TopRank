import { Injectable, TemplateRef } from '@angular/core';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BSModalComponent } from './bs-modal.component';

@Injectable()
export class BSModalService {

    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    public show(template: TemplateRef<any>) {

        const subject = new Subject<any>();

        // this.modalRef = this.modalService.show(template);
        this.bsModalRef = this.modalService.show(template);

        return subject.asObservable();
    }
}
