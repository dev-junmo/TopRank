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

import { PointChargeStore } from '@app/common/store/point-charge.store';
import { query } from '@angular/core/src/render3/instructions';
import { Alert } from 'selenium-webdriver';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';

@Component({
  selector: 'app-point-charge-page',
  templateUrl: './point-charge-list.page.html',
  styleUrls: ['./point-charge-list.page.css']
})
export class PointChargeListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    constructor(
        public pointChargeStore: PointChargeStore,
        protected router: Router,
        public alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modal: BSModalService,
        ) {
        super(pointChargeStore, router, activateRouter, alert);

    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    // 승인 
    onClickComplete(item) {
        if (!item) { return; }
        let msg = `입금확인 처리하고 ${item.member_seq}번 고객님께 유료포인트 ${item.charge_point}와 무료포인트 ${item.charge_free_point}를 지급하시겠습니까?`;
        this.alert.confirm(msg).subscribe((result) => {
            this.pointChargeStore.complete(item.point_charge_seq, item.member_seq, item.charge_point, item.charge_free_point, item.payment_total_price).subscribe(resp => {
                console.log('pointChargeStore.complete resp =>', resp);
                this.alert.show('처리가 완료되었습니다.').subscribe(() => {
                    this.reloadList();
                });
            });
        });   
    }

    // 취소 처리 
    onClickCancel(seq) {
        this.alert.confirm('취소처리를 진행하시겠습니까?').subscribe((result) => {
            this.pointChargeStore.cancel(seq).subscribe(resp => {
                this.alert.show('처리가 완료되었습니다.').subscribe(() => {
                    this.reloadList();
                });
            });
        });   
    }

    onClickExpireAll() {
        this.alert.confirm('만료처리를 진행하시겠습니까?').subscribe((result) => {
            this.pointChargeStore.expireAll().subscribe(resp => {
                console.log('pointChargeStore.expireAll resp =>', resp);
                this.alert.show('처리가 완료되었습니다.').subscribe(() => {
                    this.reloadList();
                });
            });
        });   
    }
    
}

