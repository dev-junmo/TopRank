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
import { RewardPointWithdrawStore } from '@app/common/store/reward-point-withdraw.store';

@Component({
  selector: 'app-reward-point-withdraw-page',
  templateUrl: './reward-point-withdraw-list.page.html',
  styleUrls: ['./reward-point-withdraw-list.page.css']
})
export class RewardPointWithdrawListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;
    form: FormGroup;

    constructor(
        public rewardPointWithdrawStore: RewardPointWithdrawStore,
        protected router: Router,
        public alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modalService: BOModalDialogService, 
        fb :FormBuilder
        ) {
        super(rewardPointWithdrawStore, router, activateRouter, alert);
        

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

    onClickComplete(item) {
        if (!item) { return; }
        let msg = `${item.member.userid}번 고객님께 인출요청을 완료 처리하시겠습니까?`;
        this.alert.confirm(msg).subscribe((result) => {
            this.rewardPointWithdrawStore.complete(item.reward_point_withdraw_seq).subscribe(resp => {
                console.log('onClickComplete resp =>', resp);
                this.alert.show('처리가 완료되었습니다.').subscribe(() => {
                    this.reloadList();
                });
            });
        });   
    }

   
}

