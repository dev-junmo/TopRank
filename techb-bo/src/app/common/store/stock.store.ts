import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { URLSearchParams } from "@angular/http";
import { AppConfigService } from '../../providers/service/app-config.service';

@Injectable()
export class StockStore {

    constructor(public api: BSApi, public appConfig: AppConfigService) {
    }

    updateOptionStock(params) {
        return this.api.put('admin/shop/goods/goods_import_item', params);
    }

    /*   sendMSGReStock(params){
    let url = 'admin/shop/goods/goods/send_service';
    if (params.restock_notify_seq){
        url = '/' + params.restock_notify_seq;
    }
    return this.api.put(url,{send_list:params})
    } */

    sendMSGReStockEa(id,params){
        let url = 'admin/shop/goods/goods/send_service/'+id;
        return this.api.put(url, { send_list: params });
    }

    // 주문목록 엑셀 다운로드
    downloadExcel(optionCodes, queryParams) {

        let params = Object.assign({}, queryParams);

        // optionCodes
        if (optionCodes) {
            let i = 0;
            for(let orderSeq of optionCodes) {
                params['option_code['+ i +']'] = orderSeq;
                i++;
            }
        }

        // params
        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }
        }

        console.log('downloadExcel params =>', p.toString());

        let url = this.appConfig.getSafeProviderUrl('/admin/goods/supply/supply/supply_xlsx?');
        console.log("StockStore::dowloadExcel params, url =>", params, url);

        //window.open(BSApi.url + '/' + url +'/xlsx?' +  p.toString() , '_blank');

        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

     // stockDownloadExcel(params) {

    //     const p = new URLSearchParams();
    //     if (params) {
    //         for (const key in params) {
    //             p.set(key, params[key]);
    //         }//
    //     }
    //     window.open(BSApi.url + '/admin/goods/supply/supply/supply_xlsx?'  +  p.toString() , '_blank');
    // }

    sendMessage(restockNotifySeqs,  sendTime = null ) {

        let params = {
            restock_notify_seq: restockNotifySeqs
        };

        if (sendTime) {
            params['send_time'] = sendTime;
        }

        return this.api.put('admin/shop/goods/goods/send_service' , params);
    }
}
