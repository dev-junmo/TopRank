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

import { OrderListStore } from '@app/common/store/order-list.store';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.css']
})
export class OrderListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    constructor(
        public pointStore: OrderListStore,
        protected router: Router,
        alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modal: BSModalService,
        ) {
        super(pointStore, router, activateRouter, alert);

    }

}
