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
import { BoardContentStore } from '@app/common/store/board-content.store';
import { GoodsBestReviewStore } from '@app/common/store/goods-best-review.store'
import { BoardConfigService } from '../../board/board.config.service';
import { BoardStore } from '@app/common/store/board.store';

@Component({
  selector: 'board-goods-review-list-page',
  templateUrl: './board-goods-review-list.page.html',
  styleUrls: ['./board-goods-review-list.page.css']
})
export class BoardGoodsReviewListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    private isReadonly : boolean = true;
    private boardId: string = 'goods_review';
    public selectedItem: string;

    private sub: any;
    //private title: string;
    private list: any;
    private listLength: number;
    public apiURL: string = this.appConfig.apiURL;
    public clientURL: string = this.appConfig.clientURL;

    public boardConfig;
    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(public datatableStore: BSDatatableStore,
        private boardStore: BoardStore,
        private boardContentStore: BoardContentStore,
        private bestReviewStore : GoodsBestReviewStore,
        private modalService: BOModalDialogService,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService,
        public boardConfigService: BoardConfigService,

        ) {
        super(datatableStore, router, activateRouter, alert);

        // board 정보
        this.boardStore.get(this.boardId).subscribe((resp) => {
            this.boardConfig = this.boardConfigService.getConfig(this.boardId, resp);
        });

    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);

        config.store.command = 'admin/goods/goodsreview';

        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    onClickClientView() {
        // AppConfigService
        window.open(this.appConfig.clientURL + "/board/review/list");
    }

    onClickViewItem(item , template: TemplateRef<any>) {

        this.boardContentStore.getGoodsReview(item.seq).subscribe((resp) => {
            this.selectedItem = Object.assign(item, resp);
        });
        //this.selectedItem = item;


        this.modalService.popup(template, '게시글 보기' + '- 상품후기 게시판'  , '확인' , null , null, 'large' ).subscribe((resp)=>{
            if (resp == "OK") {
            } else if (resp == "CANCEL") {
            }
        });
    }

    onClickBestItem( id , checked , item) {

        this.alert.confirm('쇼핑몰에 베스트 영역에 해당 리뷰를 등록하시겠습니까?').subscribe(()=>{
            this.bestReviewStore.setBestItem(id, checked).subscribe(resp => {
                item.best = resp.best;
            });
        });
    }

    //복사
    // onClickCopy(boardId , seq) {
    //     this.boardContentStore.copyNotice(boardId , seq).subscribe(resp => {

    //     });
    // }

    onClickChangeHiddenStatus(event, item) {
        if(event == true) {
            item.hidden = 0;
        } else { item.hidden = 1; }
        let params = {
            hidden  : item.hidden
        }

        this.bestReviewStore.changeShowHide(item.seq, params).subscribe(resp => {
            console.log(resp);
        });
    }

    onClickButton(event) {

        console.log('onClickButton event =>', event);

        this.modalService.hide();

        if (event.command == 'modify') {
            this.updateItem(event.seq);
        } else if (event.command == 'remove') {
            this.deleteItem(event.seq);
        }
    }

    onClickSelectChangeHiddenStatus(event) {

        let count: number = event.rows.length;
        let rolls: number = count;

        this.alert.confirm(rolls + "개의 후기를 숨김처리 하시겠습니까?").subscribe((result) => {

            for(let row of event.rows) {

                let params = {
                    hidden  : 1
                }

                this.bestReviewStore.changeShowHide(row.item.seq, params).subscribe(resp => {
                    rolls--;
                    if (rolls == 0) {
                        this.reloadList();
                        this.alert.show(count + "개의 후기가 숨김 처리되었습니다.");
                    }
                });
            }
        });
    }

    //답변
    onClickGoReplyPage(seq) {
        this.appConfig.naviagteSafeProvider('main/board/goods_review/update/' + seq + '/recontents');
    }
    
}

