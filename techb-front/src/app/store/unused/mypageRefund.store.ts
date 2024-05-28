import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';


@Injectable()
export class MypageRefundStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'shop/mypage/refund/');
    }

    list() {
        return this.api.get(this.command + 'refund_modify');
    }

    getDetail(refund_code) {
        return this.api.get(this.command + 'refund_view?refund_code=' + refund_code);
    }

    //결제취소 -> 환불변경 get
    getOrderRefund(order_seq , mode?) {
        let params = {
            mode : mode
        }
        return this.api.get(this.command + 'order_refund?order_seq=' + order_seq , params);
    }

    //결제취소 - 취소신청
    requestOrderRefundProcess(formValue) {
        return this.api.post(this.command + 'order_refund_process' , formValue);
    }


    cancelOrder(value) {
        let params = {
            order_seq: value.order_seq,
            order_cancel_reason : value.order_cancel_reason ,
        }
        return this.api.put('shop/mypage/order/cancel' , params);
    }

    getDeliveryCompanyList() {
        return this.api.get('common/config/delivery_url');
    }

    //이니시스 예금주 일치확인
    checkInisisDepositor(value) {

        // user_name 예금주noacct  계좌번호banksett 은행코드

        let params = {
            user_name : value.bank_depositor,
            noacct: value.bank_account,
            banksett: value.bank_code
        }

        return this.api.get('shop/order/inicis/result_bank_info' , params);
    }

    //이니시스 예금주 확인
    checkDepositor(bankCode, bankAccount) {

        console.log("checkDepositor  value.bank_account, value.bank_code =>", bankAccount, bankCode);

        return this.api.get('shop/order/inicis/result_name?noacct=' + bankAccount + '&banksett=' + bankCode );
    }

}
