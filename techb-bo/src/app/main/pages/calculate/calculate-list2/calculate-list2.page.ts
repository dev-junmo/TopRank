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
  selector: 'calculate-list2-page',
  templateUrl: './calculate-list2.page.html',
  styleUrls: ['./calculate-list2.page.css']
})
export class CalculateList2Page extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    private goodsNameColumnWidth = 205;
    private recipientNameColumnWidth = 100;
    private orderNameColumnWidth = 110;

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
        config.store.command = 'admin/account/account';

        // 초기에 파라미터 변화로 로딩이 진행되는데 그러면 안되서 수정함
        config.usePageLocationParams = true;
        config.initialLoad = false;

        //초기값
        let ym = moment().format('YYYYMM');

        this.defaultQuery = {
            'account_ym[min]': ym,
            'account_ym[max]': ym
        };

        return config;
    }

    onChangedAccountStatus(item, seq, value) {

        console.log('onChangedAccountStatus event, value =>', event, value);

        this.alert.confirmWithInputMessage('이월 처리 하시겠습니까?\n(이월사유 입력: 선택사항)', '확인', '확인', '취소', true).subscribe((resp)=>{

            console.log('onChangedAccountStatus::confirm resp =>', resp);

            if (resp !== 'CANCEL') {
               this.changeAccountStatus(seq, value, resp);
            }
        });
    }
    changeAccountStatus(seq, value, title) {
        let params = {
            title: title,
            items:  [{
                seq: seq,
                account_status: value
            }]
        };

        this.saleStore.changeAccountStatus(params).subscribe(resp => {
            this.reloadList();
            this.alert.show('저장되었습니다.');
        });
    }
    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {
        console.log('whcarrot', params);
        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    /////////////////////////////
    // 데이타테이블 버튼 클릭 시
    onClickDetail(id) {
        window.open('crm/' + id + '/member', '_blank');
        // this.router.navigate(['crm/' + id + '/member']);
    }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query =>', query);
        this.saleStore.calcDownloadExcel(query);
    }

    onClickOrderNewWindow(code) {
        this.appConfig.openWindowSafeProvider('main/order/order/view/' +  code);
    }

    //선택저장버튼
    onClickSaveSelectedItem(event) {
        let params = {items: []};

        if(Array.isArray(event.rows)) for(let row of event.rows) {
            if(row.item.account_status != 'complete') {
                params.items.push({
                    seq: row.item.seq,
                    account_status: 'carried'
                });
            }
        }

        this.alert.confirmWithInputMessage('이월 처리 하시겠습니까?\n(이월사유 입력: 선택사항)', '확인', '확인', '취소', true).subscribe((resp)=>{
            if (resp !== 'CANCEL') {
                params['title'] = resp;
                this.saleStore.changeAccountStatus(params).subscribe(resp => {
                    this.reloadList();
                    this.alert.show('저장되었습니다.');
                });
            }
        });

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

