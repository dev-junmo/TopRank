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


@Component({
  selector: 'sale-list-page',
  templateUrl: './sale-list.page.html',
  styleUrls: ['./sale-list.page.css']
})
export class SaleListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

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

    }


    initController(config: any) {
        console.log("SaleListPage::initController command =>", config);

        config.store.command = 'admin/account/sale/legacy';

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

    //excel
    onClickDownloadExcel(query) {
        console.log(query);
        this.saleStore.oldSaleDownloadExcel(query);
    }

    onClickOrderNewWindow(code) {
        this.appConfig.openWindowSafeProvider('main/order/order/view/' +  code);
    }
}

