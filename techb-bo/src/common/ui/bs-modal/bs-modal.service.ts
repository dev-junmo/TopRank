import { Injectable, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BSModal } from './bs-modal';

@Injectable()
export class BSModalService {

    // modal이므로 한번에 한창만 띄워져 있음
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    public popup(template: TemplateRef<any>) {
        // if (this.bsModalRef) {
        //     this.hide();
        // }
        this.bsModalRef = this.modalService.show( template, { ignoreBackdropClick: true});
    }

    public hide() {
        this.bsModalRef.hide();
        //this.bsModalRef = null;
    }
}
