import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../../common/service/app.service';
import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert';
import { AuthService } from '../../../../../../../../service/auth.service';
import { PaymentStore } from '../../../../../../../../store/payment.store';
import * as moment from 'moment';


@Component({
    selector: 'point-charge',
    templateUrl: './point-charge.page.html',
    styleUrls: ['./point-charge.page.css']
})
export class PointChargePageComponent implements OnInit {

    public inputPoint: number;
    private _lastInputPoint: number;
    public chargePointForInputPoint: number;
    public freePointForInputPoint: number;


    public isAgreeTerms: boolean = false;
    public isShowPointBeforeInfo: boolean = false;
    public isShowPointAfterInfo: boolean = false;

    public expiredDate;

    public chargeInfo = {
        beforePoint: 0,
        beforeFreePoint: 0,
        ingPoint: 0,
        ingFreePoint: 0,
        afterPoint: 0,
        afterFreePoint: 0,
        totalPrice: 0
    }

    public accountBanks = [];
    
    pointForm = this.formBuilder.group({
        charge_point: '500',
        charge_free_point: '',
        nobankbook: this.formBuilder.group({
            account_seq: '1',
            depositor: '',
            cash_receipt: this.formBuilder.group({
                is_apply_receipt: 'N',
                receipts_type: 'business',
                company_number: '',
                phone_number: ''
            })
        }),
    });

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        private appService: AppService,
        private paymentStore: PaymentStore,
        private auth: AuthService,
        private alert: BSAlertService,
        private formBuilder: FormBuilder,
        ) {
            this.expiredDate = moment().add(24, 'hours');
        }

    ngOnInit() {
        this.updateChargeInfo();
        this.loadPaymentInfo();
    }

    loadPaymentInfo() {
        this.paymentStore.get().subscribe(resp => {
            console.log('loadPaymentInfo::get resp =>', resp);
        
            this.updateChargeInfo(resp.chargePoint, resp.freePoint);
            this.accountBanks = resp.bank.list;
        });
    }

    getBankAccountTitle(item) {
        return `${item.bank_name} ${item.account_num} ${item.account_name}`;
    }

    updateChargeInfo(chargePoint?, freePoint?) {
        if(chargePoint) {
            this.chargeInfo.beforePoint = parseInt(chargePoint);
        }
        if(freePoint) {
            this.chargeInfo.beforeFreePoint = parseInt(freePoint);
        }

        if(this.chargeInfo.beforePoint == undefined || this.chargeInfo.beforeFreePoint == undefined) {
            return;
        }

        if(this.pointForm.value.charge_point == 0) {
            let inputPoint = !this.inputPoint? 0 : Math.floor(this.inputPoint / 100);
            
            this.chargeInfo.ingPoint = inputPoint;
            this.chargeInfo.ingFreePoint  = Math.floor(inputPoint / 10);

            this.chargeInfo.totalPrice = Math.floor((this.inputPoint + this.inputPoint / 10) / 10) *10;
        } else {
            this.chargeInfo.ingPoint = parseInt(this.pointForm.value.charge_point);
            this.chargeInfo.ingFreePoint  = Math.floor(this.pointForm.value.charge_point / 10);

            let totalPrice = this.chargeInfo.ingPoint * 100;
            this.chargeInfo.totalPrice = totalPrice + (totalPrice / 10);
        }

        this.chargeInfo.afterPoint =  this.chargeInfo.beforePoint + this.chargeInfo.ingPoint;
        this.chargeInfo.afterFreePoint =  this.chargeInfo.beforeFreePoint + this.chargeInfo.ingFreePoint; 
        
        console.log('updateChargeInfo chargeInfo, inputPoint, pointForm.value.charge_point =>', this.chargeInfo, this.inputPoint, this.pointForm.value.charge_point);
    }

    isApplyReceipt() {
        return this.pointForm.controls.nobankbook.value.cash_receipt.is_apply_receipt == "Y";
    }


    onChangePoint() {
        this.updateChargeInfo();
    }

    //옵션 변경시 입력했던 값 유지x
    onChangeReceiptOption() {
        if(this.pointForm.value.nobankbook.cash_receipt.receipts_type == 'business') {
            this.pointForm.get('nobankbook.cash_receipt.phone_number').setValue('');
        } else if(this.pointForm.value.nobankbook.cash_receipt.receipts_type == 'personal') {
            this.pointForm.get('nobankbook.cash_receipt.company_number').setValue('');
        }
    }
    
    //입력할 때마다 값 반영해주기
    onKeyUpInputBox() {
        if (this.inputPoint > 99999999) {
            this.inputPoint = this._lastInputPoint;// 이전값을 넣어줌
        }
        this._lastInputPoint = this.inputPoint;

        this.chargePointForInputPoint = Math.floor(this.inputPoint / 100);
        this.freePointForInputPoint = Math.floor(this.chargePointForInputPoint / 10);

        console.log('onKeyUpInputBox pointForm =>', this.pointForm);
        this.pointForm.controls.charge_point.setValue('0');
        
        this.updateChargeInfo();
    }
    isValid() {

        // 직접 입력 시 금액 
        if(this.pointForm.value.charge_point == '0' && !this.inputPoint) {
            this.alert.show('금액을 입력해주세요.');
            return false;
        }

        // 입금자명
        if(!this.pointForm.value.nobankbook.depositor) {
            this.alert.show('입금자명을 입력해주세요.', '결제 수단 작성이 완료되지 않았습니다.');
            return false;
        }

        if(this.pointForm.value.nobankbook.cash_receipt.is_apply_receipt == "Y"){
            // 현급영수증 신청시 // 사업자시 사업자 번호 입력 
            if(this.pointForm.value.nobankbook.cash_receipt.receipts_type == 'business' && !this.pointForm.value.nobankbook.cash_receipt.company_number) {
                this.alert.show('현금영수증 번호를 입력해주세요.', '결제 수단 작성이 완료되지 않았습니다.');
                return false;
            } else if(this.pointForm.value.nobankbook.cash_receipt.receipts_type == 'personal' && !this.pointForm.value.nobankbook.cash_receipt.phone_number) {
                this.alert.show('현금영수증 번호를 입력해주세요.', '결제 수단 작성이 완료되지 않았습니다.');
                return false;
            }
        }

        if(!this.isAgreeTerms) {
            this.alert.show('약관에 동의해주세요.');
            return false;
        }

        return true;
    }

    onSubmitPointCharge() {

        if (!this.isValid()) {
            return;
        }

        // params
        let params = this.pointForm.value;
        if(this.pointForm.value.charge_point == 0) {
            params.charge_point = Math.floor(this.inputPoint/100);
        }
        if(this.pointForm.value.nobankbook.cash_receipt.is_apply_receipt == "N") {
            params.nobankbook.cash_receipt.receipts_type = ""
        }

        params.nobankbook.account_seq = parseInt(params.nobankbook.account_seq);
        
        console.assert(this.auth.userSeq);
        params['member_seq'] = this.auth.userSeq;
        params['payment_total_price'] = this.chargeInfo.totalPrice;
        params.nobankbook['nobankbook_expired_date'] = this.expiredDate.format('YYYY-MM-DD 23:59:59');

        params.charge_point = parseInt(this.pointForm.value.charge_point);
        params.charge_free_point = Math.floor( params.charge_point / 10);

        console.log('onSubmitPointCharge::chargePointForm =>', params);
        // params.nobankbook.account_seq
        let accountItem = this.accountBanks.find(item => item.account_seq == params.nobankbook.account_seq);
        // api 호출
        this.paymentStore.pointCharge(params).subscribe(resp => {
            let queryParams = {
                expiredDate: params.nobankbook.nobankbook_expired_date,
                totalPrice: this.chargeInfo.totalPrice,
                // bank: //item.bank_name + item.account_num + item.account_name
            }
            if (accountItem) {
                queryParams['bankAccount'] = `${accountItem.bank_name} ${accountItem.account_num}`;
                queryParams['bankAccountName'] = accountItem.account_name;
                
            }
            this.router.navigate(['/main/section/payment/point-charge/point-charge-completed'], { queryParams: queryParams });
            //console.log('queryParams ===>', queryParams );
        });
        console.log('onSubmitPointCharge pointForm =>', this.pointForm, params);
    }

    // mobile
    onClickPointChargeInfo(type) {
        if(type == 'before') {
            this.isShowPointBeforeInfo = !this.isShowPointBeforeInfo;
        } else if(type == 'after') {
            this.isShowPointAfterInfo = !this.isShowPointAfterInfo;
        }
    }
    
    // public _category() {
    //     this.goodsCategory = this.goods.categories.split('>');
    // }

    // load() {
    //     this.footerStore.load().subscribe(resp => {
    //         this.data = resp;
    //         console.log("footer load1 ===== ");
    //     })
    // }

    // onClickBrand() {
    //     this.isHidden= !this.isHidden;

    // }

    // onClickAffiliate(){
    //     this.isHidden2= !this.isHidden2;
    // }

    // onClickLinkMenuItem() {
    //     this.isHidden = true;
    //     this.isHidden2 = true;
    // }

    // onClickTop(){
    //     // document.body.scrollTop = document.documentElement.scrollTop = 0;
    //     //window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    //     window.scrollTo(0,0);
    // }

    // onClickFaqMenuItem() {
    //     this.router.navigate(['/board/faq/list']);
    // }

    // onClickNoticeMenuItem() {
    //     this.router.navigate(['/board/notice/list']);
    // }


    // onClickMain(){
    //     this.router.navigate(['/home']);
    //     setTimeout(() => {
    //         window.scrollTo(0,0);
    //     }, 10);
    // }

    // onClickMyQNA() {
    //     let url = this.appService.frontAppURL + '/mypage/activity/my-qna';
    //     this.auth.gotoPageAfterLoggedIn(url);
    // }

}
