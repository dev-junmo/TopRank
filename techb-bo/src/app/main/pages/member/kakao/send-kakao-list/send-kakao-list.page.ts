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

import { SendSMSCreatePopupService } from '../../../../../providers/popups/send-sms-create.popup';

@Component({
  selector: 'send-kakao-list-page',
  templateUrl: './send-kakao-list.page.html',
  styleUrls: ['./send-kakao-list.page.css']
})
export class SendKakaoListPage extends BSDatatableController  {

    @ViewChild(DataTable) dataTable: DataTable;

    constructor(
        public datatableStore: BSDatatableStore,
        //loading: Ng4LoadingSpinnerService,
        private sendSMSCreatePopupService: SendSMSCreatePopupService,
        protected router: Router,
        alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modal: BSModalService,
        ) {
        super(datatableStore, router, activateRouter, alert);

    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);
        config.store.command = 'admin/etc/msg/kko';
        return config;
    }

    public preparedParams(params) {
        // 리스트로 params를 전달하기 전에 여기서 수정합니다.
        return params;
    }

    onClickSendSMS() {
        this.sendSMSCreatePopupService.popup(null).subscribe(resp => {
            if (resp == 'OK') {
                this.alert.show('카카오톡 메세지가 발송됐습니다.');
            } else {
                this.alert.show('카카오톡 메세지 발송이 실패하였습니다.');
            }
            this.reloadList();
        });
    }

    deleteSelectedItem(event, keyName) {
        let count: number = event.rows.length;
        let rolls: number = count;

        this.alert.confirm(rolls + "개의 아이템을 삭제 하시겠습니까?").subscribe((result) => {

            let params = [];
            for(let row of event.rows) {
                console.log("BSUpdateFormController::deleteSelectedItem", row, row.item[keyName]);
                console.assert(row.item[keyName]);
                let id = row.item[keyName];
                params.push(id);
                this.datatableStore.delete(params).subscribe( resp => {
                    rolls--;
                    if (rolls == 0) {
                        this.reloadList();
                        this.alert.show(count + "개의 아이템이 삭제 되었습니다.");
                    }
                });
            }
        });
    }
}

