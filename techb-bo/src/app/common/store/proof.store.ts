import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { URLSearchParams } from "@angular/http";
import { AppConfigService } from '@app/providers/service/app-config.service';

@Injectable()
export class ProofStore extends BSDatatableStore {

    constructor(api: BSApi,
        public appConfig: AppConfigService,
        public alert: BSAlertService) {
        super(api);
        this.init('admin/etc/sales');
    }

    get(id) {
        return this.api.get(this.command + '/' + id);
    }

    put(id,params) {
        return this.api.put(this.command + '/' + id , params);
    }

    // 세금계산서는 /tax 현금영수증은 /cash

    apply(type, params) {
        return this.api.post(this.command + '/' + type, params);
    }

    tstepPut(id , params) {
        return this.api.put(this.command + '/tstep/' + id , params);
    }

    getLog(id) {
        return this.api.get(this.command + '/sales_log/' + id);
    }


    // 엑셀 다운로드
    downloadExcel(seqs, queryParams) {

        let params = Object.assign({}, queryParams);

        if (seqs) {

            // if (seqs.length >= 20) {
            //     this.alert.show("'선택다운로드'는 최대 20개까지만 가능합니다.<br>더 많은 리스트를 원하시면 '검색다운로드'를 이용해주세요.");
            // }

            let i = 0;
            for(let seq of seqs) {
                params['seq['+ i +']'] = seq;
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

        let url = this.appConfig.getSafeProviderUrl('/admin/etc/sales/xlsx?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

}
