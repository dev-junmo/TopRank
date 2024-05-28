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
import { SendEmailCreatePopupService } from '../../../../../providers/popups/send-email-create.popup';
import { EmailStore } from '../../../../../common/store/email.store';

@Component({
  selector: 'send-email-list-page',
  templateUrl: './send-email-list.page.html',
  styleUrls: ['./send-email-list.page.css']
})
export class SendEmailListPage extends BSDatatableController  {

    @ViewChild(DataTable) dataTable: DataTable;

    constructor(
        public datatableStore: BSDatatableStore,
        private emailStore: EmailStore,
        //loading: Ng4LoadingSpinnerService,
        protected router: Router,
        alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private sendEmailCreatePopupService: SendEmailCreatePopupService,
        private modal: BSModalService,
        ) {
        super(datatableStore, router, activateRouter, alert);

    }



    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);

        config.store.command = 'admin/etc/log/email/personal';

        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }



    onClickSendEmail() {
        this.sendEmailCreatePopupService.popup(null).subscribe(()=>{
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
                this.emailStore.deleteEmail(params).subscribe( resp => {
                    rolls--;
                    if (rolls == 0) {
                        this.reloadList();
                        this.alert.show(count + "개의 아이템이 삭제 되었습니다.");
                    }
                });
            }
        });

    }
    /////////////////////////////
    // 데이타테이블 버튼 클릭 시
    // onClickDetail(id) {
    //     window.open('crm/' + id + '/member', '_blank');
    // }

    // rowClick(rowEvent) {
    //     console.log('Clicked: ' + rowEvent.row.item.name);
    // }

    // rowDoubleClick(rowEvent) {
    //     alert('Double clicked: ' + rowEvent.row.item.name);
    // }

    // rowTooltip(item) { return item.jobTitle; }

    // onClickEdit(item) {
    //     alert(item.name +"수정");
    // }    

   
}

