import { Injectable, TemplateRef , ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { SendEmailCreatePopup } from './send-email-create.popup';

@Injectable()
export class SendEmailCreatePopupService {

    // modal이므로 한번에 한창만 띄워져 있음
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    public popup(email) {

        const subject = new Subject<any>();

        // if (this.bsModalRef) {
        //     this.hide();
        // }

        let initialState = {
            to_email : email,
            subject: subject
        };

        this.bsModalRef = this.modalService.show( SendEmailCreatePopup, {
            // initialState,
            ignoreBackdropClick: false,
            initialState,
            class:'custom modal-popup',

        });
        //this.subSwiper.update();

        return subject.asObservable();
    }

    public hide() {
        this.bsModalRef.hide();
        this.bsModalRef = null;
    }
}
