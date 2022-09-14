import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { DataTable } from '@app/common/data-table/components/table';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import { BoardStore } from '@app/common/store/board.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

import { Component, ViewEncapsulation, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';

import { AppConfigService } from '@app/providers/service/app-config.service';
import { BoardStore } from '@app/common/store/board.store';
import { BoardConfigService } from '../../board/board.config.service';
import { BoardContentStore } from '@app/common/store/board-content.store';


@Component({
  selector: 'board-goods-qna-list-page',
  templateUrl: './board-goods-qna-list.page.html',
  styleUrls: ['./board-goods-qna-list.page.css']
})
export class BoardGoodsQNAListPage extends BSDatatableController  {

    @ViewChild(DataTable) dataTable: DataTable;

    private boardId: string = 'goods_qna';
    private sub: any;

    private list: any;
    private listLength: number;

    public apiURL: string = this.appConfig.apiURL;
    public clientURL: string = this.appConfig.clientURL;

    // 게시판 관리자 권한
    public boardConfig: any;

    public selectedItem;

    private seqForPopupView;

    @ViewChild('template') templateView: TemplateRef<any>;

    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(public datatableStore: BSDatatableStore,
        private boardStore: BoardStore,
        private boardContentStore: BoardContentStore,
        alert: BSAlertService,
        private modalService: BOModalDialogService,
        protected router: Router,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService,
        public boardConfigService: BoardConfigService
        ) {
        super(datatableStore, router, activateRouter, alert);        

        // board 정보
        this.boardStore.get(this.boardId).subscribe((resp) => {
           
            this.boardConfig = this.boardConfigService.getConfig(this.boardId, resp);

            if (activateRouter.snapshot.queryParams.view_popup == 'true') {

                this.seqForPopupView = activateRouter.snapshot.queryParams.seq;
            }
            
            if (this.boardConfig.auth.write) {
                this.dataTable.selectColumnVisible = true;
            }                
        });
    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);

        config.store.command = 'admin/goods/goodsqna';

        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    public preparedLoadData(items) {
        this.showViewPopupSafe(items);
        return items;
    }

    showViewPopupSafe(items) {
        setTimeout(() => {
            if (this.seqForPopupView) {
                this.showViewPopup(this.seqForPopupView, this.templateView, items);
            } else {
                setTimeout(() => {
                    this.showViewPopup(this.seqForPopupView, this.templateView, items);
                    console.log('preparedLoadData::showViewPopup lazy');
                }, 1000);
            }    
        }, 100);        
    }

    showViewPopup(seq, template: TemplateRef<any>, items) {

        console.log('showViewPopup seq, items =>', seq, items);

        let item = null;

        for(let _item of items) {
            if (_item.seq == seq) {
                this.onClickViewItem(_item, template);
                break;
            }
        }
    }


    /////////////////////////////////////////////////////////
    // 파이프로 만들 필요 없는 내부 데이타 변환
    // 자주쓰는 변환만 파이프로 만든다.


    //답변
    onClickGoReplyPage(seq) {
        this.appConfig.naviagteSafeProvider('main/board/' + this.boardId + '/update/' + seq + '/recontents');
    }

    onClickViewItem(item , template: TemplateRef<any>) {

        console.log('onClickViewItem item =>', item);

        // 조회수 증가를 위해 한번 호출해줌
        this.boardContentStore.getGoodsQNA(item.seq).subscribe((resp) => {
            this.selectedItem = Object.assign(item, resp);
        });

        this.modalService.popup(template, '게시글 보기' + ' - 상품문의 게시판'  , '확인' , null , null, 'large').subscribe((resp)=>{
            if (resp == "OK") {
            } else if (resp == "CANCEL") {
            }
        });
    }

    onClickChangeHiddenStatus(event, item) {

        console.log('onClickChangeHiddenStatus event =>', event);

        if(event == true)
            item.hidden = 0;
        if(event == false)
            item.hidden = 1;

        this.boardContentStore.updateQNA(item.seq, item).subscribe(resp => {
            console.log('onClickChangeHiddenStatus2 resp =>', resp);
            this.reloadList();
        });
    }

    onClickButton(event) {

        console.log('onClickButton event =>', event);

        this.modalService.hide();

        if (event.command == 'modify') {
            this.updateItem(event.seq);
        } else if (event.command == 'recontents') {
            this.onClickGoReplyPage(event.seq);
        } if (event.command == 'remove') {
            this.deleteItem(event.seq);
        }
    }
}

