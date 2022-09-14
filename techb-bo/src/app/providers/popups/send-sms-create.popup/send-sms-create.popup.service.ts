import { Injectable, TemplateRef , ViewChild } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { SendSMSCreatePopup } from './send-sms-create.popup';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SendSMSCreatePopupService {

    // modal이므로 한번에 한창만 띄워져 있음
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    public popup(mobilePhoneNumber, message?) {

        console.log('SendSMSCreatePopupService::popup mobilePhoneNumber, message =>', mobilePhoneNumber, message);

        const subject = new Subject<any>();

        // if (this.bsModalRef) {
        //     this.hide();
        // }

        let initialState = {
            mobilePhone: mobilePhoneNumber,
            message: message,
            subject : subject       // 제곡 아님 , observable
        }

        this.bsModalRef = this.modalService.show( SendSMSCreatePopup, {
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
