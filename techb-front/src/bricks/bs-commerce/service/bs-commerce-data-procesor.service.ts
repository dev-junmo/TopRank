import { Injectable } from '@angular/core';

@Injectable()
export class BSCommerceDataProcesorService {

    constructor() { }


    public makeRowspanInItems(items, shippingGroupInfo) {
        console.log("shipping makeRowspanInItems = ",items,shippingGroupInfo)

        let shippingInfo;
        if (shippingGroupInfo) {
            shippingInfo = Object.keys(shippingGroupInfo);
            console.log(shippingInfo);
        }

        // row span
        let idx = 0;
        for(let shipping of shippingInfo) {

            let rowspan = shippingGroupInfo[shipping].rowspan;
            console.log("shipping info = ", shippingGroupInfo[shipping], rowspan);
            for(let i = 0; i < rowspan; i++) {
                if (i == 0)
                    items[idx].rowspan = rowspan;
                else
                    items[idx].rowspan = 0;
                console.log("idx = ", idx, items[idx].rowspan);
                idx++;
            }
        }
        console.log("rowspan = ", items);
    }

    ////////////////////////////////////////////////////
    // options
    public itemOptionsFromItems(items) {

        let options = [];
        for(let item of items) {
            for(let option of item.options) {

                // option = item + option
                option.shipping_provider_seq = item.shipping_provider_seq;
                option.goods_name = item.goods_name;
                option.image = item.image;
                option.goods_seq = item.goods_seq;
                option.goods_type = item.goods_type;
                option.goods_kind = option.goods_kind || item.goods_kind;
                
                if(item.shipping_method_name) {
                    option.shipping_method_name = item.shipping_method_name;
                }
                if(item.goods_shipping_cost) {
                    option.goods_shipping_cost = item.goods_shipping_cost;
                }
                if(item.b_provider_name) {
                    option.b_provider_name = item.b_provider_name;
                }

                if(item.refund_able_ea) {
                    option.refund_able_ea = item.refund_able_ea;
                }
                if(item.return_able_ea) {
                    option.return_able_ea = item.return_able_ea;
                }
                if(item.cancel_type) {
                    option.cancel_type = item.cancel_type;
                }

                // 배송정보
                // option.b_provider_name = item.b_provider_name;
                // option.goods_shipping_cost = item.goods_shipping_cost;

                // if (item.shipping_method == "delivery") {
                //     option.shipping_method_name = "택배(선불)";
                // } else if (item.shipping_method == "each_delivery") {
                //     option.shipping_method_name = "개별배송";
                // } else {
                //     option.shipping_method_name = "";
                // }
                // option.shipping_method_name = item.shipping_method_name;

                options.push(option);
            }
        }
        return options;
    }

    ////////////////////////////////////////////////////
    //
    public itemsFromExportList(exportList) {
        // for(let itemExports of exportList) {
        //     for(let goods of this.orderData.items) {
        //         for(let option of goods.options) {
        //             //
        //             option.goods_name = goods.goods_name;
        //             option.image = goods.image;
        //             option.b_provider_name = goods.b_provider_name;
        //             if(itemExports.item_seq == option.item_seq){
        //                 option.export_code = itemExports.export_code;
        //             }
        //             // option.data_shipping = goods.data_shipping;
        //             this.orderGoodsList.push(option);
        //         }
        //     }
        // }
    }
}
