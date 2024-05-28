// basic
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
//import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { SaleStore } from '../../../../common/store/sale.store';
import { AppConfigService } from '@app/providers/service/app-config.service';

import * as moment from 'moment';

@Component({
  selector: 'hold-list-page',
  templateUrl: './hold-list.page.html',
  styleUrls: ['./hold-list.page.css']
})
export class HoldListPage extends BSDatatableController {

    public summary;

    @ViewChild(DataTable) dataTable: DataTable;

    private goodsNameColumnWidth = 140;
    private recipientNameColumnWidth = 100;
    private orderNameColumnWidth = 110;

    constructor(
        public datatableStore: BSDatatableStore,
        //loading: Ng4LoadingSpinnerService,
        protected router: Router,
        alert: BSAlertService,
        private saleStore: SaleStore,
        public appConfig: AppConfigService,
        activateRouter: ActivatedRoute,
        //private modal: BSModalService,
        ) {
        super(datatableStore, router, activateRouter, alert);

       // 타이머 사용 이유 : constructor 에서 query를 세팅하니 폼생성전에 control을 get해서 오류가 남
       setTimeout(()=> {
        // 초반에 summary만 한번 호출해 달라고 함
        this.query = {
            'deposit_date[min]': moment().format('YYYY-MM') + '-01',
            'deposit_date[max]': moment().format('YYYY-MM-DD')
        };

        this.saleStore.getHoldSummary(this.query).subscribe(resp => {
            this.summary = resp;
            console.log("SaleListPage::constructor query, summary =>", this.query, this.summary);
        });
    }, 2000);

    }


    initController(config: any) {
        console.log("SaleListPage::initController command =>", config);

        config.store.command = 'admin/account/sale';

        // 초기에 파라미터 변화로 로딩이 진행되는데 그러면 안되서 수정함
        config.usePageLocationParams = false;
        config.initialLoad = false;

        // this.saleStore.getHoldSummary().subscribe(resp => {
        //     this.holdsummary = resp;
        //     console.log("SaleListPage::initController holdsummary =>", this.holdsummary);
        // });

        return config;
    }
    onChangedAccountStatus(item, seq, value) {

        console.log('onChangedAccountStatus event, value =>', event, value);

        this.alert.confirm('값을 변경하시겠습니까?', '확인', '확인', '취소', true).subscribe((resp)=>{

            console.log('onChangedAccountStatus::confirm resp =>', resp);

            if (resp == 'OK') {
               this.changeAccountStatus(seq, value);

            } else if (resp == 'CANCEL') {
                // rollback
                if (value == 'standby') {
                    item.account_status = 'hold';
                } else {
                    item.account_status = 'standby';
                }
            }

        });
    }
    changeAccountStatus(seq, value) {
        let params = [{
            seq: seq,
            account_status: value,
        }];

        this.saleStore.changeAccountStatus(params).subscribe(resp => {
            this.reloadList();
        });
    }
    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        params.account_status = 'carried';

        return params;
    }

    public preparedLoadData(items) {

        if (this._data.summary) {
            this.summary = this._data.summary;
        }

        return items;
    }

    //excel
    onClickDownloadExcel(query) {
        console.log(query);
        this.saleStore.saleDownloadExcel(query);
    }

    onClickOrderNewWindow(code) {
        this.appConfig.openWindowSafeProvider('main/order/order/view/' +  code);
    }

    onClickCalculateHold() {
        this.reloadItems();
    }
    onClickGoodsNameColumnExpand() {
        this.goodsNameColumnWidth += 100;
    }
    onClickRecipientNameColumnExpand(){
        this.recipientNameColumnWidth += 100;
    }
    onClickOrderNameColumnExpand(){
        this.orderNameColumnWidth += 100;
    }
}

