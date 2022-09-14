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

import { GoodsStore } from '@app/common/store/goods.store';
import { BSFileUploader } from '@bricks/common/core/bs-fileuploader';

@Component({
  selector: 'app-pg-check',
  templateUrl: './pg-check.component.html',
  styleUrls: ['./pg-check.component.css']
})
export class PgCheckPage extends BSDatatableController  {

    public fileUploadInicisCardName = '';
    public fileUploadInicisVirtualName = '';
    public fileUploadNaverpayName = '';
    
    constructor(//public goodsStore: GoodsStore,
        public datatableStore: BSDatatableStore,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute,
        private fileUploader: BSFileUploader) {
        super(datatableStore, router, activateRouter, alert);
    }

    initController(config: any) {
        config.store.command = 'admin/account/pg_excel_upload_log';
        return config;
    }


    onFileUploadInicisCard($event) {
        this.fileUploadInicisCardName = $event.target.value;
        this.fileUploader.fileUpload($event, 'admin/account/pg/check/inicis', 'card').subscribe(resp => {
            this.reloadList();
            this.alert.show("이니시스 카드 내역이 적용 되었습니다.");
        }, error => {
            this.reloadList();
        });
    }

    onFileUploadInicisVirtual($event) {
        this.fileUploadInicisVirtualName = $event.target.value;
        this.fileUploader.fileUpload($event, 'admin/account/pg/check/inicis', 'virtual').subscribe(resp => {
            this.reloadList();
            this.alert.show("이니시스 가상계좌 내역이 적용 되었습니다.");
        }, error => {
            this.reloadList();
        });
    }

    onFileUploadNaverpay($event) {
        this.fileUploadNaverpayName = $event.target.value;
        this.fileUploader.fileUpload($event, 'admin/account/pg/check', 'naverpay').subscribe(resp => {
            this.reloadList();
            this.alert.show("네이버페이 내역이 적용 되었습니다.");
        }, error => {
            this.reloadList();
        });
    }
}
