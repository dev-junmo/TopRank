import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BSAlertComponent } from './bs-alert.component';

@Injectable()
export class BSAlertService {

    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    public show(message, title='',  okBtnText = '확인') {

        const subject = new Subject<any>();

        const initialState = {
            title: title,
            message: message,
            btnOkText: okBtnText,
            btnCancelText: '',
            subject : subject,
            needCancelFeedback: true
        };

        this.bsModalRef = this.modalService.show( BSAlertComponent, 
            { ignoreBackdropClick: true, initialState, class: 'alert mobile'});

        return subject.asObservable();
    }

    public confirm(message, title = '확인', okBtnText = '확인', cancelBtnText = '취소', needCancelFeedback = false) {

        const subject = new Subject<any>();

        const initialState = {
            title: title,
            message: message,
            btnOkText: okBtnText,
            btnCancelText: cancelBtnText,
            subject : subject,
            needCancelFeedback: needCancelFeedback
        };

        this.bsModalRef = this.modalService.show( BSAlertComponent, { ignoreBackdropClick: true, initialState , class: 'alert mobile'});		// entryComponent

        //this.modalService.onHide = 

        return subject.asObservable();
    }

    public techbShow(messageTitle, message, title = '', okBtnText = '확인') {

        const subject = new Subject<any>();

        const initialState = {
            messageTitle: messageTitle,
            title: title,
            message: message,
            btnOkText: okBtnText,
            btnCancelText: '',
            subject : subject,
            needCancelFeedback: true
        };

        this.bsModalRef = this.modalService.show( BSAlertComponent, 
            { ignoreBackdropClick: true, initialState, class: 'alert mobile'});

        return subject.asObservable();
    }

}
