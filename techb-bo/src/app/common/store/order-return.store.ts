import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { URLSearchParams } from "@angular/http";
import { AppConfigService } from '@app/providers/service/app-config.service';

@Injectable()
export class OrderReturnStore {

    //{{baseUrl}}/admin/return/modify

    private command = 'admin/order/return';
    constructor(public api: BSApi,
        public appConfig: AppConfigService,
        public alert: BSAlertService) {
        //this.init('admin/return');
    }

    list(params?) {
        return this.api.get(this.command + "/catalog" , params);
    }

    getView(returnId) {
        // let params = {
        //     return_code: returnId
        // };

        // alert(returnId);
        return this.api.get(this.command + "/view/"+ returnId);
    }

    update(formdata) {

        return this.api.put(this.command + "/modify" ,  formdata);
    }

    updateMemo(returnId, formdata) {
        return this.api.put(this.command + "/admin_memo/" + returnId,  formdata);
    }


    getDeliveryComCode() {

        return this.api.get('common/config/delivery_url');
    }

    // 엑셀 다운로드
    downloadExcel(returnCodes, queryParams) {

        let params = Object.assign({}, queryParams);

        if (returnCodes) {

            // if (returnCodes.length >= 20) {
            //     this.alert.show("'선택다운로드'는 최대 20개까지만 가능합니다.<br>더 많은 리스트를 원하시면 '검색다운로드'를 이용해주세요.");
            // }

            let i = 0;
            for(let returnCode of returnCodes) {
                params['return_code['+ i +']'] = returnCode;
                i++;

                // 20개 제한
                // if (i >= 20) {
                //     break;
                // }

            }
        }

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }
        }

        console.log('downloadExcel params =>', p.toString());

        let url = this.appConfig.getSafeProviderUrl( '/admin/order/return/xlsx?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }


    delete(returnCode)  {

        // let params = {
        //     'return_code' : returnCode
        // };

        return this.api.put('admin/order/return/request_cancel/' + returnCode, {});
    }


}

