import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { URLSearchParams } from "@angular/http";

import { AppConfigService } from '@app/providers/service/app-config.service';

@Injectable()
export class SaleStore {

    constructor(public api: BSApi,
        public appConfig: AppConfigService,) {
    }

    getSaleSummary(params){
        return this.api.get('admin/account/sale/summary', params);
    }

    getHoldSummary(params){
        return this.api.get('admin/account/account/summary', params);
    }

    // getMaster(){
    //     return this.api.get('admin/account/account/master');
    // }

    changeRequestStatus(params) {
        return this.api.put(this.appConfig.getSafeProviderUrl('admin/account/account/master/request_status'), params);
    }
    changeMasterAccountStatus(params) {
        return this.api.put('admin/account/account/master/account_status', params);
    }
    changeTaxStatus(params) {
        return this.api.put('admin/account/account/master/tax_status', params);
    }

    changeAccountStatus(params) {
        return this.api.put('admin/account/account/account_status', params);
    }
    oldSaleDownloadExcel(params) {

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }//
        }
        let url = this.appConfig.getSafeProviderUrl('/admin/account/sale/xlsx/legacy?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

    oldCalcDownloadExcel(params) {

        console.log("calcDownloadExcel params =>", params);

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }//
        }

        let url = this.appConfig.getSafeProviderUrl('/admin/account/account/xlsx/legacy?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }
    saleDownloadExcel(params) {

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }//
        }
        let url = this.appConfig.getSafeProviderUrl('/admin/account/sale/xlsx?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

    calcDownloadExcel(params) {

        console.log("calcDownloadExcel params =>", params);

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }//
        }

        let url = this.appConfig.getSafeProviderUrl('/admin/account/account/xlsx?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

    taxstatusDownloadExcel(params) {

        console.log("taxstatusDownloadExcel params =>", params);

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }//
        }

        let url = this.appConfig.getSafeProviderUrl('/admin/account/account/master/tax/xlsx?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

    settleDownloadExcel(params) {

        console.log("settleDownloadExcel params =>", params);

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }//
        }

        let url = this.appConfig.getSafeProviderUrl('/admin/account/account/master/xlsx?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }


    // getBoard(id){
    //     return this.api.get(this.command+'/'+ id);
    // }

    // update(seq, item){
    //     console.log("api item", item)
    //     return this.api.put(this.command+ '/boardmanager/'+seq, item);
    // }

}
