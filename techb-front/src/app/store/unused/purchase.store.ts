import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class PurchaseStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'shop/mypage');
    }

    // 주문조회

    list(page = 1, limit = 5, sDate?, eDate?,  type?) {

        let params: any = {
            'order[0][column]' : 'regist_date',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (sDate) {
            params['regist_date[min]'] = sDate;
        }

        if (eDate) {
            params['regist_date[max]'] = eDate;
        }

        if (type == '35') {     // 상품준비중
            params['steps[0]'] = '35';
            params['steps[1]'] = '40';
            params['steps[2]'] = '45';
        } else if (type == '55') {    //상품출고완료
            params['steps[0]'] = '50';
            params['steps[1]'] = '55';
        } else if (type == '65') {  // 배송중
            params['steps[0]'] = '60';
            params['steps[1]'] = '65';
        } else if (type == '75') {  // 배송완료
            params['steps[0]'] = '70';
            params['steps[1]'] = '75';
        } else if (type == "buy_confirm") {
            params['buy_confirm'] = 'y';
        } else if (type) {
            params['steps[]'] = type;
        }

        return this.api.get(this.command + '/order/order_catalog', params);
    }

    // 취소/교환/반품 리스트

    listExcept(page = 1, limit = 5, sDate?, eDate?,  type?) {

        let params: any = {
            'order[0][column]' : 'regist_date',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (sDate) {
            params['regist_date[min]'] = sDate;
        }

        if (eDate) {
            params['regist_date[max]'] = eDate;
        }

        if (type) {
            params['filter_type'] = type;
        }

        return this.api.get(this.command + '/refund/refund_catalog_list', params);
    }



    orderStatus(){
        return this.api.get(this.command + '/order/order_status');
    }

    loadDetail(order_seq, ticket = ''){
        return this.api.get(this.command + '/order/order_view?order_seq=' + order_seq + '&ticket=' + ticket);
    }

    purchaseList() {
        return this.api.get(this.command + '/orderbrand');
    }

    favoriteList() {
        return this.api.get('member/memberbrand');

    }

    // 구매확정 팝업 클릭시 호출
    getOrderConfirm(export_code){
        return this.api.get(this.command + '/order/buy_confirm?export_code=' + export_code);
    }

    // 구매확정 클릭시 호출
    putOrderConfirm(optionSeq) {
        let params = {
            items: [
                { option_seq: optionSeq }
            ]
        };

        return this.api.put(this.command + '/order/buy_confirm_process_for_item' , params);
    }

    //배송정보변경

    changeShippingInfo(data) {
        return this.api.put('shop/mypage/order/recipient' , data);
    }

}
