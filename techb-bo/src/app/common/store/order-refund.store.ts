import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { URLSearchParams } from "@angular/http";
import { AppConfigService } from '@app/providers/service/app-config.service';

@Injectable()
export class OrderRefundStore {

    private command = 'admin/order/refund';
    constructor(public api: BSApi,
        public appConfig: AppConfigService,
        public alert: BSAlertService) {
        //this.init('admin/refund');
    }

    list(params?) {
        return this.api.get(this.command + "/catalog" , params);
    }

    getView(refundId) {

        console.assert(refundId);
        if (!refundId) return;
     
        return this.api.get(this.command + "/view/"+ refundId);
    }

    update(formdata) {

        return this.api.post("admin/order/refund/save" ,  formdata);
    }

    adminMemoupdate(data) {
        let params = {
            admin_memo: data.admin_memo
        }

        return this.api.put("admin/order/refund/admin_memo/" + data.refund_seq  ,  params);
    }

    // 환불리스트
    // list(page = 1, limit = 5, sDate?, eDate?,  type?) {

    //     let params: any = {
    //         'order[0][column]' : 'regist_date',
    //         'order[0][dir]' : 'desc',
    //         'paging[page]': page,
    //         'paging[limit]': limit
    //     };

    //     //keyword&keyword_type

    //     if (sDate) {
    //         params['regist_date[min]'] = sDate;
    //     }

    //     if (eDate) {
    //         params['regist_date[max]'] = eDate;
    //     }

    //     if (type) {
    //         params['use_type'] = type;
    //     }

    //     return this.api.get(this.command, params);
    // }

    // 엑셀 다운로드
    downloadExcel(refundCodes, queryParams) {

        let params = Object.assign({}, queryParams);

        if (refundCodes) {

            // if (refundCodes.length >= 20) {
            //     this.alert.show("'선택다운로드'는 최대 20개까지만 가능합니다.<br>더 많은 리스트를 원하시면 '검색다운로드'를 이용해주세요.");
            // }

            let i = 0;
            for(let refundCode of refundCodes) {
                params['refund_code['+ i +']'] = refundCode;
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
        let url = this.appConfig.getSafeProviderUrl( '/admin/order/refund/xlsx?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

    delete(refundCode)  {

        // let params = {
        //     'return_code' : returnCode
        // };

        return this.api.put('admin/order/refund/request_cancel/' + refundCode, {});
    }

}

