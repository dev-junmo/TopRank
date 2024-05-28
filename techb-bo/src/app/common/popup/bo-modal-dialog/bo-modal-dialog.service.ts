import { Injectable, TemplateRef , Component, ComponentRef} from '@angular/core';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BOModalDialog } from './bo-modal-dialog';

@Injectable()
export class BOModalDialogService {

    public bsModalRef: BsModalRef;
    public bsModalRefs: Array<BsModalRef> = [];
  
    constructor(private modalService: BsModalService) {
    }

    public popupWidthComponent(component: any,  title = '제목', okBtnText = '확인', cancelBtnText = '취소', 
        option = null, size ='medium') {
        return this._popup(null, component, title, okBtnText, cancelBtnText, option, size);
    }

    public popup(template: TemplateRef<any>, title = '제목', okBtnText = '확인', cancelBtnText = '취소', 
        option = null, size='medium') {
        return this._popup(template, null, title, okBtnText, cancelBtnText, option, size);
    }

    public hide() {

        if (this.bsModalRef) {
            this.bsModalRef.hide();
        }
    }

    // 창이 2개이상 중첩으로 떴을 떄 autoclose false일때 
    // 첫째창 안닫히는 버그 수정을 위해 임시로 처리 함 
    public hideAll() {
        for(let ref of this.bsModalRefs) {
            if (ref) {
                ref.hide();
            }
        }
    }

    private _popup( template: TemplateRef<any>, component: any,  title = '제목', okBtnText = '확인', 
        cancelBtnText = '취소', option = null, type='medium') {
     
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

        // optiion : 배경 선택여부
        // let ignoreBackdropClick: boolean = true;
        // if (option != null && option.ignoreBackdropClick !== undefined) {
        //     ignoreBackdropClick = option.ignoreBackdropClick;
        // }
        // // optiion : 닫기 버튼 누르면 닫힘
        // if (option != null && option.autoClose !== undefined) {
        //     initialState.autoClose = option.autoClose;
        // }

        // // auction
        // if (option != null && option.auction !== undefined) {
        //     initialState.auction = option.auction;
        // }

        // // multiSelect // #todo 일일이 이렇게 하면 안됨, 그냥 object를 복사하는 방식으로 처리
        // if (option != null && option.multiSelect !== undefined) {
        //     initialState.multiSelect = option.multiSelect;
        // }


        // if (this.bsModalRef) {
        //     this.hide();
        // }

        console.log("popup initialState =>", initialState, option);

        if (component) {
            this.bsModalRef = this.modalService.show( component,
                { /*ignoreBackdropClick: ignoreBackdropClick,*/ initialState, class: type});		// entryComponent
        } else {
            this.bsModalRef = this.modalService.show( BOModalDialog,
                { /*ignoreBackdropClick: ignoreBackdropClick,*/ initialState, class: type});		// entryComponent
        }

        this.bsModalRefs.push(this.bsModalRef);
        console.log("BOModalDialogService::_popup bsModalRef =>", this.bsModalRefs);
        return subject.asObservable();
    }
}
