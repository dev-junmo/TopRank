// basic
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
// import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
import { CouponCopyPopupService } from '@app/common/popup/coupon-copy.popup/index'
import { CouponStore } from '@app/common/store/coupon.store';
import { CouponIssueView } from '../coupon-issue/coupon-issue.view';
// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
// import { EventStore } from '@app/common/store/event.store';

@Component({
  selector: 'coupon-list',
  templateUrl: './coupon-list.page.html',
  styleUrls: ['./coupon-list.page.css']
})
export class CouponListPage extends BSDatatableController  {

    @ViewChild(DataTable) dataTable: DataTable;
    @ViewChild('couponIssue') couponIssueView: CouponIssueView;

    // 쿠폰 발행 리스트 호출위해 템플릿에 전달하는 데이타
    private couponData;
    private couponSummaryData;
    private issueCouponData;
    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(public datatableStore: BSDatatableStore,       //loading: Ng4LoadingSpinnerService,
        alert: BSAlertService,
        private couponStore: CouponStore,
        private CouponCopyPopupService: CouponCopyPopupService,
        //private modal: BSModalService,
        private dialogService: BOModalDialogService,
        protected router: Router,
        protected activateRouter: ActivatedRoute


        ) {
        super(datatableStore, router, activateRouter, alert);

    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);

        config.store.command = 'admin/coupon/coupon';

        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }
    onClickInfoCoupon(template: TemplateRef<any>, item) {

        this.couponSummaryData = item;
        let title = '쿠폰 사용 가능한 상품 확인하기';
        this.dialogService.popup(template, title, '닫기', null, null, 'small').subscribe((resp)=>{

            //this.reloadList();

            if (resp == "OK") {


            } else if (resp == "CANCEL") {

            }
        });
    }
    onClickIssueCoupon(template: TemplateRef<any>, item) {

        this.couponData = item;

        //template: TemplateRef<any>, title = '제목', okBtnText = '확인', cancelBtnText = '취소', option = null, type='medium'

        let title = '[' + item.coupon_name + '] 발급하기';
        this.dialogService.popup(template, title, '발급하기', '취소하기').subscribe((resp)=>{
            if (resp == "OK") {

                console.log("onClickIssueCoupon2 issueCouponData =>", this.couponIssueView.getSubmitData());
                this.couponStore.issueCoupon(this.couponIssueView.getSubmitData()).subscribe(resp => {
                    console.log("onClickIssueCoupon3 resp =>", resp);
                    this.alert.show("쿠폰이 발급되었습니다.");

                    this.reloadList();
                });
            } else if (resp == "CANCEL") {

            }
        });
    }

    onClickIssueListCoupon(template: TemplateRef<any>, item) {

        console.log("onClickIssueListCoupon item =>", item);

        this.couponData = item;
        let title = '[' + item.coupon_name + '] 발급/사용내역';
        this.dialogService.popup(template, title, '닫기', null, null, 'large').subscribe((resp)=>{

            this.reloadList();

            if (resp == "OK") {


            } else if (resp == "CANCEL") {

            }
        });
    }

    // updateItems(type, id) {
    //     console.log('updateItems type =>', type);
    //     if(type == 'offline_coupon') {
    //         this.router.navigate(['/main/event/print-coupon/update/' + id]);
    //     } else {
    //         this.router.navigate(['/main/event/coupon/update/' + id ]);

    //     }

    // }

    onClickCopy(seq) {

        this.CouponCopyPopupService.popup(seq).subscribe((resp) => {

            let coupon_name =resp.get('name').value;
            let coupon_desc= resp.get('title').value;
            let result=resp.get('result').value;
            if(!result){
                this.alert.show('데이터를 입력해 주세요');
                return;
            }
            let param = { coupon_seq: seq, coupon_name: coupon_name, coupon_desc: coupon_desc}
            if (resp) {
                this.couponStore.copyCoupon(param).subscribe(resp => {
                    this.alert.show("복사 되었습니다.");
                    this.reloadList();
                });
                /* this.formGroup.get(this.name).setValue(url); */
            }
        }, error => {
            /* if (this.subject) {
                this.subject.next('FAIL');
            } */
        });
    }

}

