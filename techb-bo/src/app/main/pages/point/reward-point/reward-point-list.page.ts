import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

import { RewardPointStore } from '@app/common/store/reward-point.store';
import { m } from '@angular/core/src/render3';
import { add } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-reward-point-page',
  templateUrl: './reward-point-list.page.html',
  styleUrls: ['./reward-point-list.page.css']
})
export class RewardPointListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;
    form: FormGroup;

    constructor(
        public rewardPointStore: RewardPointStore,
        protected router: Router,
        alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modalService: BOModalDialogService, 
        fb :FormBuilder
        ) {
        super(rewardPointStore, router, activateRouter, alert);
        

        this.form = fb.group({
            point_type: 'charge',
            point: '0',
            member_seq: '',
            memo: '',
            remains : ''
        });
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }


    onClickManegePoint(template: TemplateRef<any>) {
        this.modalService.popup(template, '포인트관리', '확인', '취소', {autoClose: true}).subscribe((resp)=>{
            if (resp != "OK") {
                this.modalService.hide();
                return;
            }
            // api 호출 ,form data 전송
            console.log('onClickManegePoint::modalService.popup form.value =>', this.form.value);
            // this.pointStore.insert(this.form.value).subscribe(resp => {
            //     console.log('onClickManegePoint::insert resp =>', resp);
            // })
        });
    }
   
}

