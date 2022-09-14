// basic
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

//store
import { GoodsStore } from '@app/common/store/goods.store';

@Component({
  selector: 'goods-list-page',
  templateUrl: './goods-list.page.html',
  styleUrls: ['./goods-list.page.css'],
})
export class GoodsListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;


    constructor(
        public goodsStore: GoodsStore,
        protected router: Router,
        alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modal: BSModalService,
        ) {
        super(goodsStore, router, activateRouter, alert);
      
    }

}

