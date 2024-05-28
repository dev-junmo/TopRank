import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';
import { Options } from 'selenium-webdriver/ie';
import { diPublic } from '@angular/core/src/render3/instructions';

@Injectable()
export class PrivatePaymentStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/order/person');
    }

    delete(id) {
        return this.api.delete('admin/order/person/' + id , {});
    }

    makeCart(value , member_seq) {
        let params: any = {
            goods : [

            ]
        }
        for(let item of value) {
            let _good:any = {
                goods_seq: item.goods_seq,
                member_seq: member_seq,
                options: [],
                inputs:[],
                suboptions:[]
            }
            let i = 0;
            let j = 0;
            let k = 0;

            for(let option of item.options) {
                if(option.selected == true) {
                    let _op = {
                        option_seq : option.option_seq,
                        ea: option.ea
                    }
                    _good.options.push(_op);
                }

            }
            for(let input of item.option_inputs) {
                if(input.selected == true) {
                    let _input = {
                        input_seq : input.input_seq,
                        value : input.value
                    }
                    _good.inputs.push(_input);
                }

            }
            for(let sub of item.suboptions) {
                if(sub.selected == true) {
                   let _sub = {
                        suboption_seq: sub.suboption_seq,
                        ea: sub.ea
                    }
                    _good.suboptions.push(_sub);

                }
            }
            params.goods.push(_good)
        }

        return this.api.post('admin/order/person/cart' , params);
    }

    //////////////////////////////////////////////////////////////////////////////
    // cart

    addCart(goodsCartItem) {
        return this.api.post('admin/order/person/cart/add' , goodsCartItem);
    }

    getCart(memberSeq) {
        return this.api.get('admin/order/person/cart', { member_seq: memberSeq });
    }

    getPrice(option_seq = null, params) {
        let i = 0;
        if(option_seq){
            for(let item of option_seq){
                params['cart_option_seqs['+i+']'] = item;
                console.log('cart_option_seqs push params == ', params)
                i ++;
            }
        }
        console.log("order/calculate params, option_seq => " , params, option_seq);

        //admin/order/person
        // _todo : 예전에 오류 alert 안뜨게 해놨는데
        //return this.api.get(this.command + 'order/calculate',params,null,true);
        return this.api.get('admin/order/person/cart',params);
    }

    deleteCartItem(seqs){
        let params = {
            cart_option_seq:seqs
        };
        console.log(params);

        return this.api.delete('admin/order/person/cart', params);
    }

    modifyOptionEa(cartOptionSeq, ea) {
        let params = {
            ea: ea
        }

        return this.api.put('admin/order/person/cart/cartoption/ea/' + cartOptionSeq, params);
    }

    modifySubOptionEa(cartSubOptionSeq, ea) {
        let params = {
            ea: ea
        }

        return this.api.put('admin/order/person/cart/cartsuboption/ea/' + cartSubOptionSeq, params);
    }

    modifyShippingEnuri(cartOptionSeq, shipping_enuri_sale) {
        let params = {
            shipping_enuri_sale: shipping_enuri_sale
        }

        return this.api.put('admin/order/person/cart/cartoption/enuri/' + cartOptionSeq, params);
    }


    modifyOptionEnuri(cartOptionSeq, enuri_sale_unit) {
        let params = {
            enuri_sale_unit: enuri_sale_unit
        }

        return this.api.put('admin/order/person/cart/cartoption/enuri/' + cartOptionSeq, params);
    }

    modifySubOptionEnuri(cartSubOptionSeq, enuri_sale_unit) {
        let params = {
            enuri_sale_unit: enuri_sale_unit
        }

        return this.api.put('admin/order/person/cart/cartsuboption/enuri/' + cartSubOptionSeq, params);
    }
}
