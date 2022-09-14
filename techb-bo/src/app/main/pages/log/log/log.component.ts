import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit , ViewChild } from '@angular/core';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BOAuthService } from '../../../../providers/service/bo-auth.service';

@Component({
  selector: 'log-list',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogListComponent extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    constructor(
        public datatableStore: BSDatatableStore,
        alert: BSAlertService,
        protected router: Router,
        activateRouter: ActivatedRoute,
        public auth : BOAuthService) {
        super(datatableStore, router, activateRouter, alert);
    }

    ////////////////////////////////////////////////////
    // Override
    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);

        config.store.command = 'log/manager/manager';
        return config;
    } 
}
