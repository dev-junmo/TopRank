import { Injectable, TemplateRef ,ViewEncapsulation} from '@angular/core';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BSModalDialog } from './bs-modal-dialog';

@Injectable()
export class BSModalDialogService {

    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    public popupWidthComponent(component: any,  title = '제목', okBtnText = '확인', cancelBtnText = '취소',
        option = null, size ='medium', className = '') {
        return this._popup(null, component, title, okBtnText, cancelBtnText, option, size, className);
    }

    public popup(template: TemplateRef<any>, title = '제목', okBtnText = '확인', cancelBtnText = '취소',
        option = null, size='medium', className = '') {
        return this._popup(template, null, title, okBtnText, cancelBtnText, option, size, className);
    }

    public hide() {
        this.bsModalRef.hide();
        this.bsModalRef = null;
    }

    private _popup( template: TemplateRef<any>, component: any,  title = '제목', okBtnText = '확인',
        cancelBtnText = '취소', option = null, size = 'medium', className = '') {

        const subject = new Subject<any>();

        let initialState = {
            title: title,
            template: template,
            btnOkText: okBtnText,
            btnCancelText: cancelBtnText,
            subject : subject,
            ableBackClick: false,
            autoClose: true,
            ignoreBackdropClick: true
            //multiSelect: false,
        };

        initialState = Object.assign(initialState, option);

        console.log("popup initialState =>", initialState, option);

        let _className = '';
        
        if (size) {
            _className = size;
        }
        if (className) {
            _className += (' ' + className);    
        }
        _className += ' custom';        

        if (component) {
            this.bsModalRef = this.modalService.show( component,
                { /*ignoreBackdropClick: ignoreBackdropClick,*/ initialState, class: _className});		// entryComponent
        } else {
            this.bsModalRef = this.modalService.show( BSModalDialog,
                { /*ignoreBackdropClick: ignoreBackdropClick,*/ initialState, class: _className});		// entryComponent
        }

        console.log("BSModalDialogService::_popup bsModalRef, _className =>", this.bsModalRef, _className);

        return subject.asObservable();
    }

    // public popup(template: TemplateRef<any>,
    //     title = '제목', okBtnText = '확인', cancelBtnText = '취소',
    //     option = null) {

    //     const subject = new Subject<any>();

    //     let initialState = {
    //         title: title,
    //         template: template,
    //         btnOkText: okBtnText,
    //         btnCancelText: cancelBtnText,
    //         subject : subject,
    //         ableBackClick: false,
    //         autoClose: true,
    //         singleButton: false
    //     };

    //     // optiion : 배경 선택여부
    //     let ignoreBackdropClick: boolean = true;
    //     if (option != null && option.ignoreBackdropClick !== undefined) {
    //         ignoreBackdropClick = option.ignoreBackdropClick;
    //     }
    //     // optiion : 닫기 버튼 누르면 닫힘
    //     if (option != null && option.autoClose !== undefined) {
    //         initialState.autoClose = option.autoClose;
    //     }

    //     if (this.bsModalRef) {
    //         this.hide();
    //     }

    //     console.log("popup initialState = ", initialState, option);
    //     this.bsModalRef = this.modalService.show( BSModalDialog,
    //         { ignoreBackdropClick: ignoreBackdropClick, initialState, class: 'custom'});		// entryComponent

    //     return subject.asObservable();
    // }

    // public hide() {
    //     this.bsModalRef.hide();
    //     this.bsModalRef = null;
    // }


}
