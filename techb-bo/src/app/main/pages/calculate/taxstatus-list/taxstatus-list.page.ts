// basic
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { AppConfigService } from '@app/providers/service/app-config.service';

import { SaleStore } from '../../../../common/store/sale.store';

import * as moment from 'moment';

@Component({
  selector: 'taxstatus-list-page',
  templateUrl: './taxstatus-list.page.html',
  styleUrls: ['./taxstatus-list.page.css']
})
export class TaxStatusListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    public taxStatus:any = {
        tax_status: ''
    };

    constructor(
        public datatableStore: BSDatatableStore,
        protected router: Router,
        alert: BSAlertService,
        private saleStore: SaleStore,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService,


        ) {
        super(datatableStore, router, activateRouter, alert);
    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);
        config.store.command = 'admin/account/account/master/tax';

        // 초기에 파라미터 변화로 로딩이 진행되는데 그러면 안되서 수정함
        config.usePageLocationParams = false;
        config.initialLoad = false;

        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    /////////////////////////////

    onChangedTaxStatus(providerSeq, accountYM, taxStatus) {

        console.log('onChangedTaxStatus taxStatus =>', taxStatus);

        let params = {
            items: [{
                tax_status: taxStatus,
                provider_seq: providerSeq,
                account_ym: accountYM
            }]
        };

        this.saleStore.changeTaxStatus(params).subscribe(resp => {
            this.reloadList();
            this.alert.show('저장되었습니다.');
        });

    }
    // 데이타테이블 버튼 클릭 시
    onClickDetail(id) {
        window.open('crm/' + id + '/member', '_blank');
        // this.router.navigate(['crm/' + id + '/member']);
    }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query =>', query);
        this.saleStore.taxstatusDownloadExcel(query);
    }

    onClickOrderNewWindow(code) {
        this.appConfig.openWindowSafeProvider('main/order/order/view/' +  code);
    }

    onClickInputAllTaxStatus(event, taxStatus) {
        for(let item of this.items) {
            item.tax_status_temp = taxStatus.tax_status_temp;
            item.tax_status = taxStatus.tax_status_temp;
        }
    }

    onChangedAllTaxStatus(item, temp) {
        item.tax_status = temp;
    }

    onClickSaveTaxStatus(item) {
        this.alert.confirm('저장 하시겠습니까?', '확인', '확인', '취소', true).subscribe((resp)=>{
            if (resp == 'OK') {
                this.onChangedTaxStatus(item.provider_seq, item.account_ym, item.tax_status);
            } else if (resp == 'CANCEL') {
            }
        });
    }

    onClickSaveSelectedItem(event) {
        let params = {items: []};

        if(Array.isArray(event.rows)) for(let row of event.rows) {
            params.items.push({
                provider_seq: row.item.provider_seq,
                account_ym: row.item.account_ym,
                tax_status: row.item.tax_status
            });
        }

        this.alert.confirm('저장 하시겠습니까?', '확인', '확인', '취소', true).subscribe((resp)=>{
            if (resp == 'OK') {
                this.saleStore.changeTaxStatus(params).subscribe(resp => {
                    this.reloadList();
                    this.alert.show('저장되었습니다.');
                });
            } else if (resp == 'CANCEL') {
            }

        });
    }
}

