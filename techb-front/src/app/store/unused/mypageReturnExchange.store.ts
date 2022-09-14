import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';


@Injectable()
export class MypageReturnExchangeStore extends BSBaseStore {

    // private command: string = 'shop/mypage/return/';

    constructor(private api: BSApi) {
        super(api, '');
    }

    //반품or환불페이지에 처음 들어갔을때 호출되는 데이터
    get(order_seq, shipping_provider_seq , mode?) {
        let params:any = {
            order_seq: order_seq,
            shipping_provider_seq: shipping_provider_seq
        }
        if(mode) {
            params.mode = mode;
        }
        return this.api.get('shop/mypage/return/order_return',params);
    }

    //취소/교환/반품 조회 상세페이지
    getDetail(return_code) {

        return this.api.get('shop/mypage/return/return_view?return_code=' + return_code);
    }

    postReturn(formValue, mode = null){


    // requestOrderRefundProcess(formValue, optionSeq, cancelEa) {

    //     formValue.items = [
    //         {
    //             option_seq: optionSeq,
    //             ea: cancelEa
    //         }
    //     ];
        if(mode) {
            formValue.mode = mode;
            formValue.return_shipping_price = formValue.return_shipping_price;
        }

        // let params = {
        //     order_seq: formValue.order_seq,
        //     items: formValue.items,
        //     return_shipping_price: formValue.return_shipping_price,
        //     mode: mode
        // }
        console.log(formValue);
        return this.api.post('shop/mypage/return/order_return_process', formValue);
    }

    getRefundPrice(value, mode=null) {
        let parmas:any = {
            order_seq : value.order_seq,
            return_method: value.return_method,
            cellphone: value.cellphone,
            sender_address_street: value.sender_address_street,
            sender_address: value.sender_address,
            refund_method: value.refund_method,
            mode : mode,
            return_shipping_price_method: value.return_shipping_price_method
            // items: value.items
        }

        let i = 0;
        for(let item of value.items) {
            console.log("계산~~~" , item);
            parmas['items['+i+'][ea]']= item.ea;
            parmas['items['+i+'][export_code]']= item.export_code;
            parmas['items['+i+'][item_seq]']= item.item_seq;
            parmas['items['+i+'][option_seq]']= item.option_seq;
            if(item.suboption_seq) {
                parmas['items['+i+'][suboption_seq]']= item.suboption_seq;
            }
            parmas['items['+i+'][export_item_seq]']= item.export_item_seq;
            parmas['items['+i+'][reason_code]']= item.reason_code;
            i++;
        }


        return this.api.get('shop/mypage/return/calculate',parmas);
    }

}
