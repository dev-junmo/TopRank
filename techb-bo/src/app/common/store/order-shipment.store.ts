import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Injectable()
export class OrderShipmentStore {

    private command = 'admin/order/export';
    constructor(public api: BSApi,
        public appConfig: AppConfigService,
        public alert: BSAlertService) {
        //this.init('admin/shipment');
    }

    list(params = {}, step?) {

        if (step) {
            params['export_status[]'] = step;
        }

        return this.api.get(this.command + "/catalog" , params);
    }

    listReady(params?) {
        return this.api.get("admin/order/order/order_export_popup" , params);
    }

    getView(shipmentId) {
        console.assert(shipmentId);
        if (!shipmentId) return;

        // let params = {
        //     shipment_code: shipmentId
        // };

        return this.api.get(this.command + "/view/"+ shipmentId);
    }

    // 출고준비중 처리
    stepToShipmentPreparingBatch(params) {

        return this.api.post("admin/order/export/order_export_popup" , params);
    }

    // 출고완료 변경
    stepToShipmentComplete(params: any) {

        console.log("stepToShipmentComplete items => ", params);
        return this.api.post('admin/order/export/complete_export', params);
    }

    // 배송중
    stepToDelivering(params: any) {

        //export_code

        return this.api.put('admin/order/export/going_delivery', params);
    }

    // 배송완료
    stepToDeliveryComplete(params: any) {

        //export_code

        return this.api.put('admin/order/export/complete_delivery', params);
    }

    //////////////////////////////////////////////////////////////
    // 상품준비로 되돌리기

    // recoverPreparingeProduct(exportCode) {

    //     let params = {
    //         'export_code' : exportCode
    //     };

    //     return this.api.put('admin/order/export/reverse_export', params);
    // }

    //////////////////////////////////////////////////////////////
    // 상품준비 되돌리기

    recoverPreparingeProduct(exportCode) {

        let params = {
            'export_code' : exportCode
        };

        return this.api.put('admin/order/export/reverse_export', params);
    }

    //////////////////////////////////////////////////////////////
    // 출고준비 되돌리기

    recoverShipmentPreparing(exportCode) {
        let params = {
            'export_code' : exportCode
        };
        return this.api.put('admin/order/export/reverse_export', params);
    }

    recoverShipmentPreparingMulti(params) {
        return this.api.put('admin/order/export/reverse_export', params);
    }

    //////////////////////////////////////////////////////////////
    // 출고완료 되돌리기

    recoverShipmentComplete(exportCode) {

        let params = {
            'export_code' : exportCode
        };

        return this.api.put('admin/order/export/reverse_export', params);
    }

    // 운송정보 변경
    changingDeliveryCode(params) {

        let _params = {
            goods_exports: params
            // 'export_code': exportCode,
            // 'delivery_company_code': deliveryCompanyCode,
            // 'delivery_number': deliveryNumber
        };

        return this.api.put('admin/order/export/export_modify', _params);
    }

    // 주문목록 엑셀 다운로드
    downloadExcel(criteria, exportSeqs, queryParams?) {


        let params = Object.assign({}, queryParams);
        params['criteria'] = criteria;

        if (exportSeqs) {

            // if (exportSeqs.length >= 20) {
            //     this.alert.show("'선택다운로드'는 최대 20개까지만 가능합니다.<br>더 많은 리스트를 원하시면 '검색다운로드'를 이용해주세요.");
            // }

            let i = 0;
            for(let orderSeq of exportSeqs) {
                params['export_code['+ i +']'] = orderSeq;
                i++;

                // 20개 제한
                // if (i >= 20) {
                //     break;
                // }
            }
        }

        console.log('OrderShipmentStore::downloadExcel criteria, exportSeqs, queryParams, params =>',
            criteria, exportSeqs, queryParams, params);

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }
        }

        console.log('OrderShipmentStore::downloadExcel p.toString() =>', p.toString());

        let url = this.appConfig.getSafeProviderUrl(  '/admin/order/export/xlsx?_MIME=xlsx&');

        console.log('OrderShipmentStore::downloadExcel2 url =>', BSApi.url + url +  p.toString());

        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

    downloadExcel2(params?) {

        //let options:RequestOptions = new RequestOptions();

        // Support easy query params for GET requests
        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
                // console.log("1paramsparamsparamsparams" ,params, p);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            // options.search = !options.search && p || options.search;
            console.log("2paramsparamsparamsparams" ,params, p.toString());
        }

        let url = this.appConfig.getSafeProviderUrl('/admin/order/export/wms?');
        window.open(BSApi.url + url +  p.toString(), '_blank');

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


}

