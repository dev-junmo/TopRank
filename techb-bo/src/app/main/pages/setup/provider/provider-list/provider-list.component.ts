import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { ProviderStore } from '../../../../../common/store/provider.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { AppConfigService } from '@app/providers/service/app-config.service';

import { BSApi } from '@bricks/common/core/bs-api';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent extends BSDatatableController {

  //@ViewChild(DataTable) dataTable: DataTable;

  constructor(public providerStore: ProviderStore,
    alert: BSAlertService,
    public appConfig: AppConfigService,
    protected router: Router,
    activateRouter: ActivatedRoute
    ) {
        super(providerStore, router, activateRouter, alert);

    }

    initController(config: any) {

        console.log('initController command =>', config);

        config.store.command = 'admin/provider/provider';
        //config.store.params = 'no_company=Y';

        return config;
    }
    ////////////////////////////////////////////////////
    // 검색 다운로드
    // 쿼리, order, 해더 X, page X

    onClickSearchDownloadExcel() {

        let params = {};

        if (this.query) {
            params = this.query;
        }

        console.log("onClickSearchDownloadExcel params =>", params);

        this.downloadExcel(params);
    }
    ////////////////////////////////////////////////////
    // 선택 다운로드
    // goods_seq, 쿼리 X, order X, 해더 X, page X

    onClickSelectDownloadExcel(event) {

        if (!event.rows || event.rows.length == 0) {
            this.alert.show("다운로드 할 항목을 선택해주세요.");
            return;
        }

        // if (event.rows.length > 20) {
        //     this.alert.show("'선택다운로드'는 최대 20개까지만 가능합니다.<br>더 많은 리스트를 원하시면 '검색다운로드'를 이용해주세요.");
        //     return;
        // }

        let i = 0;
        let params = [];
        for(let row of event.rows) {
            params['provider_seq[' + i + ']'] = row.item.provider_seq;
            i++;

            // 20개 제한
            // if (i >= 20) {
            //     break;
            // }

        }

        this.downloadExcel(params);
    }
    downloadExcel(params) {

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }
        }
        let url = this.appConfig.getSafeProviderUrl('admin/provider/provider');
        console.log("dowloadExcel params, url =>", params, url);

        window.open(BSApi.url + '/' + url +'/xlsx?' +  p.toString() , '_blank');
    }

}
