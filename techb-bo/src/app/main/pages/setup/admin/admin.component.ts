import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit , ViewChild } from '@angular/core';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    constructor(
        public datatableStore: BSDatatableStore,
        alert: BSAlertService,
        protected router: Router,
        activateRouter: ActivatedRoute) {
        super(datatableStore, router, activateRouter, alert);
    }

    ////////////////////////////////////////////////////
    // Override

    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);

        config.store.command = 'admin/manager/manager';
        return config;
    }

    onClickHeaderBtn(id) {

    //////////////////////
    // 버튼 이벤트 처리 예

    //alert("최종 버튼 클릭 onclick id = " + id);


    //////////////////////
    // confirm 사용예

    // this.alert.confirm("메세지", "타이틀").subscribe((result)=>{
    //     alert(result);
    // });


    //////////////////////
    // alert 사용예

    // this.alert.show("ddddddd");


    //////////////////////
    // modal 사용예

    //this.modal.show('');


  }

  /////////////////////////////
  // 데이타테이블 row 클릭 시

  rowClick(rowEvent) {
      console.log('Clicked: ' + rowEvent.row.item);
  }

  rowDoubleClick(rowEvent) {
      alert('Double clicked: ' + rowEvent.row.item);
  }

  rowTooltip(item) { return item.jobTitle; }

 

}
