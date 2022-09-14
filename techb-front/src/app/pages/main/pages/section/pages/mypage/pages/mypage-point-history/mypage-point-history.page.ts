import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { PointStore } from '../../../../../../../../store/point.store';
import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert';
import { RewardStore } from '../../../../../../../../store/reward.store';
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'mypage-point-history-page',
    templateUrl: './mypage-point-history.page.html',
    styleUrls: ['./mypage-point-history.page.css']
})
export class MypagePointHistoryPage {
    public isShowExchangePopup: boolean = false;
    public isShowDrawPopup: boolean = false;
    public isPointHistory: boolean = true;
    public isAccountHolder: boolean = false;    // ??
    public accountCheck: boolean = false; //실계좌 확인

    public exchangePoint;
    public withDrawPoint;
    public withDrawlForm = this.formBuilder.group({
        withdraw_point: '',
        bank_name: '',
        bank_account: '',
        bank_account_holder: ''
    });

    // data
    public balance: any;

    public bankList = [
        {id: 1, name: "농협은행"},
        {id: 2, name: "국민은행"},
        {id: 3, name: "카카오뱅크"},
        {id: 4, name: "신한은행"},
        {id: 5, name: "우리은행"},
        {id: 6, name: "기업은행"},
        {id: 7, name: "KEB하나은행"},
        {id: 8, name: "새마을금고"},
        {id: 9, name: "토스뱅크"},
        {id: 10, name: "부산은행"},
        {id: 11, name: "대구은행"},
        {id: 12, name: "케이뱅크"},
        {id: 13, name: "신협"},
        {id: 14, name: "우체국"},
        {id: 15, name: "SC제일은행"},
        {id: 16, name: "경남은행"},
        {id: 17, name: "수협"},
        {id: 18, name: "광주은행"},
        {id: 19, name: "전북은행"},
        {id: 20, name: "제주은행"},
        {id: 21, name: "씨티은행"},
        {id: 22, name: "KDB산업은행"},
    ];


    constructor(
        private router :Router,
        private pointStore: PointStore,
        private rewardStore: RewardStore,
        private formBuilder : FormBuilder,
        private appService: AppService,
        public activateRouter: ActivatedRoute,
        private auth: AuthService,
        private alert: BSAlertService
        ) {
            this.loadBalance(); 
            console.log('bankList',this.bankList);
    }  

    loadBalance() {
        this.pointStore.getBalance().subscribe(resp => {
            this.balance = resp;
            this.rewardStore.getBalance().subscribe(resp=> {
                this.balance.reward_point = resp.reward_point;
            })
        });
    }

    // ======event handler==
            
    // 리워드 팝업 event =========
    //공통
    // 팝업 type click event
    onClickPopup(type) {
        if(type == 'exchange') {
            this.isShowExchangePopup = true;
        } else if(type == 'draw') {
            this.isShowDrawPopup = true;
        }
    }
    //닫기 버튼시 exchangePoint reset
    onClickHideExchangePopup(type) {
        if(type == 'exchange') {
            this.isShowExchangePopup = false;
            this.exchangePoint = '';
        } else if(type == 'draw') {
            this.hidePopupWithdraw();            
        }
    }

    hidePopupWithdraw() {
        this.isShowDrawPopup = false;
        this.accountCheck = false;
        this.isAccountHolder = false;

        this.resetForm();
    }

    resetForm() {
        this.withDrawlForm.reset();
        this.withDrawlForm.controls.bank_name.setValue('');
        // this.withDrawlForm.controls.withdraw_point.setValue('');
        // this.withDrawlForm.controls.bank_account.setValue('');
        // this.withDrawlForm.controls.bank_account_holder.setValue('');
    }
    
    // 리워드 포인트 전환
    //포인트 전환하기 전액 버튼
    onClickExchangeFullPoint() {
        this.exchangePoint = this.balance.reward_point;
    }

    //현재포인트와 입력 포인트 비교
    checkExchangePoint() {
        if(this.exchangePoint > this.balance.reward_point) {
            this.alert.show('보유 포인트보다 많은 포인트를 입력하셨습니다.<br>포인트를 다시 입력해주세요.');
            this.exchangePoint = '';
            return false;
        }
        return true;
    }

    //전환하기 submit
    onSubmitExchange() {
        if(!this.checkExchangePoint()) {
            return;
        }

        let exchange_point = this.exchangePoint;
        console.log('onClickExchangeSubmit exchange_point =>', exchange_point);

        this.isShowExchangePopup = false;

        this.rewardStore.exchangePoint(exchange_point).subscribe(resp => {
            this.isShowExchangePopup = false;
            this.alert.show('포인트가 성공적으로 전환되었습니다.');
            // reload list
            if (this.balance && resp.reward_point) {
                this.balance.reward_point = resp.reward_point;
            }
        });
    }
    
    // 리워드 포인트 인출
    //포인트 인출하기 전액 버튼
    onClickDrawlFullPoint() {
        this.withDrawlForm.controls.withdraw_point.setValue(this.balance.reward_point);
    }
    
    //현재포인트와 입력 포인트 비교
    checkDrawlPoint() {
        if(this.withDrawlForm.value.withdraw_point > this.balance.reward_point) {
            this.alert.show('보유 포인트보다 많은 포인트를 입력하셨습니다.<br>포인트를 다시 입력해주세요.');
            return false;
        }
        return true;
    }

    // 예금주 입력값 버튼 disabled
    onKeyupAccountHolder(value) {
        console.log('onKeyupAccount value => ', value);
        if(!value || value.length == 0){
            this.isAccountHolder = false;
            return;
        }
        console.log('onKeyupAccount true this.accountCheck => ', this.isAccountHolder);
        this.isAccountHolder = true;
    }

    // 실계좌 확인하기
    onClickAccountCheck() {
        this.accountCheck = true;
    }

    isValid() {
        console.log('isValid this.withDrawlForm.value =>', this.withDrawlForm.value);
        if(!this.withDrawlForm.value.withdraw_point) {
            return false;
        }
        if(!this.withDrawlForm.value.bank_name) {    
            return false;
        }
        if(!this.withDrawlForm.value.bank_account) {
            return false;
        }
        if(!this.withDrawlForm.value.bank_account_holder || !this.accountCheck) {
            return false;
        }
        
        return true;
    }   

    //인출하기 submit
    onSubmitWithDrawl() {
        // let withdrawal_point = this.withDrawPoint;
        if(!this.checkDrawlPoint()) {
            return;
        }

        console.log('onClicDrawSubmit this.withDrawlForm.value =>', this.withDrawlForm.value);
        let params = this.withDrawlForm.value;
        this.rewardStore.withdrawalPoint(params).subscribe(resp => {
            this.isShowDrawPopup = false;
            this.alert.show('포인트인출이 신청되었습니다<br>(확인 후 15일 이후에 입금될 예정입니다.)').subscribe(_resp => {
                // reload list
                if (this.balance && resp.reward_point) {
                    this.balance.reward_point = resp.reward_point;
                }
            });
        });

        this.hidePopupWithdraw();   

    }
}
