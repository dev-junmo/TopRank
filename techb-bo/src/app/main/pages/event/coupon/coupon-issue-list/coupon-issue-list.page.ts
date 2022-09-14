// basic
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
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

import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
// import { EventStore } from '@app/common/store/event.store';

@Component({
  selector: 'coupon-issue-list',
  templateUrl: './coupon-issue-list.page.html',
  styleUrls: ['./coupon-issue-list.page.css']
})
export class CouponIssueListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;
    @Input() couponSeq;
    @Input() data;
    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(public datatableStore: BSDatatableStore,       //loading: Ng4LoadingSpinnerService,
        alert: BSAlertService,
        private modal: BSModalService,
        private modalService: BOModalDialogService,
        protected router: Router,
        activateRouter: ActivatedRoute
        ) {
        super(datatableStore, router, activateRouter, alert);

    }

    initController(config: any) {
        console.log("CouponIssueListPage::initController config=", config);

        config.store.command = 'admin/shop/coupon/download';
        config.store.params = 'order[column]=download_seq&order[dir]=desc&coupon_seq=' + this.couponSeq;

        config.usePageLocationParams = false;
        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    // onClickCreateCoupon(template: TemplateRef<any>) {
    //     this.modalService.popup(template, '[오프라인 테스트 쿠폰] 발급/사용내역').subscribe((resp)=>{
    //         if (resp == "OK") {

    //         } else if (resp == "CANCEL") {

    //         }
    //     });
    // }

    isEnableDeleteBtn() {

        for(let item of this.items) {
            if (item.checked == true) {
                return true;
            }
        }

        return false;
    }

    onClickDeleteItems() {

        console.log("onClickDeleteItems");

        let items = [];

        for(let item of this.items) {
            console.log('deleteSelectedItem item =>', item);
            if (item.checked == true) {
                items.push(item);
            }
        }

        let count: number =items.length;
        let rolls: number = count;

        this.alert.confirm(rolls + "개의 발급을 취소 하시겠습니까?").subscribe((result) => {

            for(let item of items) {               
                
                this.datatableStore.delete(item.download_seq).subscribe(resp => {
                    rolls--;
                    if (rolls == 0) {
                        this.reloadList();
                        this.alert.show(count + "개의 쿠폰발급이 취소 되었습니다.");
                    }
                });
            }
        });
    }
}

