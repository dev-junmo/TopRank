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
  selector: 'grade-list-page',
  templateUrl: './grade-list.page.html',
  styleUrls: ['./grade-list.page.css']
})
export class GradeListPage extends BSDatatableController  {
    @ViewChild(DataTable) dataTable: DataTable;

    private gradeDetail;
    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(public gradeListStore: GradeListStore,
        private gradeStore :GradeStore ,
        //loading: Ng4LoadingSpinnerService,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute
        ) {
        super(gradeListStore, router, activateRouter, alert);
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    onClickDel(id) {

        alert(id +"삭제하시겠습니까?");
        this.gradeListStore.delete(id).subscribe(resp=>{
            this.reloadList();
        });
    }

    

    onCreatedGrade() {
        this.reloadList();
    }
    // //get grade info
    // onClickUpdate(gpSeq) {
    //     alert(gpSeq);
    //     // this.gradeStore.loadGradeitem(gpSeq).subscribe(resp=>{
    //     //     console.log(resp);
    //     //     this.gradeDetail = resp;
    //     // })
    // }
}

