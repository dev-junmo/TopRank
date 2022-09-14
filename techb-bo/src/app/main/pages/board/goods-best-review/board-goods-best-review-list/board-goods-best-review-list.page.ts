// basic
import { Component, OnInit, ViewChild , TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';
import { AppConfigService } from '@app/providers/service/app-config.service';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';

import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
//import { BoardContentStore } from '@app/common/store/board-content.store';
import { GoodsBestReviewStore } from '@app/common/store/goods-best-review.store';


@Component({
  selector: 'board-goods-best-review-list-page',
  templateUrl: './board-goods-best-review-list.page.html',
  styleUrls: ['./board-goods-best-review-list.page.css']
})
export class BoardGoodsBestReviewListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    private selectedItem;
    private isReadonly : boolean = true;
    private boardId: string;
    private sub: any;
    //private title: string;
    private list: any;
    private listLength: number;
    public clientURL: string = this.appConfig.clientURL;
    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(public datatableStore: BSDatatableStore,
        //loading: Ng4LoadingSpinnerService,
        private bestReviewStore : GoodsBestReviewStore,
        private modalService: BOModalDialogService,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService,
        ) {
        super(datatableStore, router, activateRouter, alert);

    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);
        config.store.command = 'admin/goods/review/best/list';

        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    onClickupdateItem(seq) {
        this.router.navigate(['/main/board/goods-best-review/update/' + seq]);
    }

    onClickClientView() {
        // AppConfigService
        window.open(this.appConfig.clientURL + "/board/review/list");
    }

    // onClickViewItem(item , template: TemplateRef<any>) {

    //     // best review를 후기 형식과 같게 함
    //     if (item.goodsreview) {
    //         this.selectedItem = item.goodsreview;
    //         if (item.goodsreview.goods) {
    //             this.selectedItem.goods_image = item.goodsreview.goods.image;
    //         }
    //     }

    //     this.modalService.popup(template, '게시글 보기' + '- 베스트상품후기 게시판'  , '확인' , null , null ).subscribe((resp)=>{
    //         if (resp == "OK") {
    //         } else if (resp == "CANCEL") {
    //         }
    //     });
    // }

    //복사
    // onClickCopy(boardId , seq) {
    //     this.boardContentStore.copyNotice(boardId , seq).subscribe(resp => {

    //     });
    // }

    onClickChangeHiddenStatus(event, item) {
        if(event == true)
            item.use_status = 'use';
        if(event == false)
             item.use_status = 'unuse';
        console.log(event, item);
        this.bestReviewStore.bestChangeShowHide(item).subscribe(resp => {
            console.log(resp);

        });
    }

    onClickBestItem(id, none , item) {
        console.log(id, none, item);
        this.bestReviewStore.setBestItem(id, none).subscribe(resp => {
            console.log(resp);

            item.goodsreview.best = resp.best;
            this.reloadList();

        });
    }
}

