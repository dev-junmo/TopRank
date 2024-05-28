import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, TemplateRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';
// import { GoodsStore } from './../../store/goods.store';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ResponsiveState } from 'ng2-responsive';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { EmailStore } from '@app/common/store/email.store';
// import { AuthService } from '../../../../common-ui/account/providers/service/auth.service';
import { BOAuthService } from '../../../providers/service/bo-auth.service';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';


@Component({
  selector: 'send-email-create-popup',
  templateUrl: './send-email-create.popup.html',
  styleUrls: ['./send-email-create.popup.css'],
//   encapsulation: ViewEncapsulation.None
})
export class SendEmailCreatePopup implements AfterViewInit {

    @ViewChild('templateEmail') templateEmail: TemplateRef<any>;

    template: TemplateRef<any>;
    private emailForm: FormGroup;
    private to_email;
    subject: Subject<any>;

    constructor(
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private emailStore: EmailStore,
        private auth :BOAuthService,
        private alert: BSAlertService,

        // private resonsiveState : ResponsiveState,
        private router : Router
    ) {

        this.emailForm = this.fb.group({
            to_email: [],
            to_name: [''],
            subject: [],
            contents: [''],
            from_name: [auth.managerName],
            from_email: [auth.managerEmail],

        });

            // this.resonsiveState.deviceObserver.subscribe((val) => {
            //     console.log(val);
            //     if ( val !== 'mobile') {
            //         this.device = 'pc';
            //     }
            // });
    }

    ngAfterViewInit() {
        if(this.to_email) {
            this.emailForm.get('to_email').setValue(this.to_email);
        }


        // console.log("ReviewViewPopup::ngOnInit this.reviewSeq = ", this.reviewSeq);
        // this.goodsStore.getReview(this.reviewSeq).subscribe((resp=>{
        //     console.log("ReviewViewPopup::ngOnInit resp = ", resp);
        //     this.goodsData = resp;

        //     setTimeout(() => {
        //         if(this.device == 'pc'){
        //             this.subSwiper.update();
        //         } else {
        //             this.subSwiperMobile.update();
        //         }
        //     }, 500);
        // }));
    }

    onCancel() {
        this.bsModalRef.hide();
    }

    onOk() {

        if(this.submitEamil(this.emailForm.value) == true){
            this.bsModalRef.hide();
        }

    }

    submitEamil(form) {

        if(!this.emailForm.value.to_email) {
            alert("받는사람 이메일을 입력하세요!");
            return false;
        }
        if(!this.emailForm.value.subject) {
            alert("제목을 입력하세요!");
            return false;
        }
        if(!this.emailForm.value.contents) {
            alert("내용을 입력하세요!");
            return false;
        }

        this.emailStore.sendEmail(form).subscribe(resp => {
            // this.emailForm.patchValue({

            // });
            this.alert.show('등록성공');
            if (this.subject) {
                this.subject.next('ok');
            }
        });

        return true;
    }


}

