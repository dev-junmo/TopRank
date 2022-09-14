// basic
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';

import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';


import { GradeListStore } from '@app/common/store/grade-list.store';
import { GradeStore } from '../../../../common/store/grade.store';

@Component({
  selector: 'member-group-list-page',
  templateUrl: './member-group-list.page.html',
  styleUrls: ['./member-group-list.page.css']
})
export class MemberGroupComponent extends BSDatatableController  {
    @ViewChild(DataTable) dataTable: DataTable;

    
    constructor(
        gradeStore: GradeStore,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute
        ) {
        super(gradeStore, router, activateRouter, alert);
    }

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }


}

