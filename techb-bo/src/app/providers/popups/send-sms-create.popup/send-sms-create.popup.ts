import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, TemplateRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs/Subject';
// import { GoodsStore } from './../../store/goods.store';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ResponsiveState } from 'ng2-responsive';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

import { SMSStore } from '@app/common/store/sms.store';


@Component({
  selector: 'send-sms-create-popup',
  templateUrl: './send-sms-create.popup.html',
  styleUrls: ['./send-sms-create.popup.css'],
//   encapsulation: ViewEncapsulation.None
})
export class SendSMSCreatePopup implements AfterViewInit {
    @ViewChild('templateSMS') templateSMS: TemplateRef<any>;
    template: TemplateRef<any>;
    private smsForm: FormGroup;

    private mobilePhone;
    private message;

    subject: Subject<any>;


    constructor(
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        alert: BSAlertService,
        private smsStore: SMSStore,
        // private resonsiveState : ResponsiveState,
        private router : Router
    ) {
        this.smsForm = this.fb.group({
            PHONE: [],
            MSG: [],
            // status: ['1']
        });
    }

    ngAfterViewInit() {
        console.log(this.mobilePhone);
        if(this.mobilePhone) {
            console.log(this.smsForm);
            this.smsForm.get('PHONE').setValue(this.mobilePhone);
        }

        if(this.message) {
            console.log(this.smsForm);
            this.smsForm.get('MSG').setValue(this.message);
        }

        // this.emailStore.sendEmail(this.emailForm).subscribe((resp => {
        //     console.log('sssssssend', resp);
        // }));
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

    onOk() {

        if(this.submitEamil(this.smsForm.value) == true) {
            this.bsModalRef.hide();
        }
    }

    submitEamil(form) {
        if(!this.smsForm.value.PHONE) {
            alert("핸드폰 번호를 입력해주세요.");
            return false;
        }
        if(!this.smsForm.value.MSG) {
            alert("메세지를 입력해주세요.");
            return false;
        }

        this.smsStore.sendSMS(form).subscribe(resp => {
            if (this.subject) {
                this.subject.next('OK');
            }
        }, error => {
            if (this.subject) {
                this.subject.next('FAIL');
            }
        });

        return true;
    }

    onCancel() {
        this.bsModalRef.hide();
    }


}

