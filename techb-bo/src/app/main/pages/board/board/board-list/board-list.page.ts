// basic
import { Component, OnInit, ViewChild , TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';

// alert, modal
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

// datatable -리스트페이지에 필요
//import { DataTable } from '@app/common/data-table';
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { BoardContentStore } from '@app/common/store/board-content.store';


import { AppConfigService } from '@app/providers/service/app-config.service';
import { BoardStore } from '@app/common/store/board.store';

import { BoardQueryForm } from './board-query-form/board-query-form';
import { BoardConfigService } from '../board.config.service';
//import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'board-list-page',
  templateUrl: './board-list.page.html',
  styleUrls: ['./board-list.page.css']
})
export class BoardListPage extends BSDatatableController  {

    //@ViewChild(DataTable) dataTable: DataTable;
    @ViewChild(DataTable) dataTable: DataTable;
    form: FormGroup;
    
    

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
        public boardConfigService: BoardConfigService,
        //private sanitizer: DomSanitizer
        ) {

        super(datatableStore, router, activateRouter, alert);

        console.assert(activateRouter.params);
        /*
        activateRouter.params.subscribe(params => {

            this.boardId = params['id'];

            // // board 정보
            // this.boardStore.get(this.boardId).subscribe((resp)=>{
            //     this.boardData = resp;
            //     this.pageTitle = this.boardData.name +'게시판 글관리';
            //     this.boardConfig = this.boardConfigService.getConfig(this.boardId, this.boardData);
            //     console.log("BoardListPage::constructor boardId, resp, boardConfig =>", this.boardId, resp, this.boardConfig);

            //     console.log('BoardListPage::constructor activateRouter.snapshot.queryParams =>', activateRouter.snapshot.queryParams);
            //     if (activateRouter.snapshot.queryParams.view_popup == 'true') {

            //         this.seqForPopupView = activateRouter.snapshot.queryParams.seq;
            //     }

            // });
        });

        */
    }
/*
    initController(config: any) {

        console.log("BoardListPage::initController command=", config);

        config.store.command = 'admin/board/boarddata';
        config.store.params = 'boardid=' + this.boardId;
        config.queryForm = this.boardQueryForm;
        config.displayNoticeListAtTop = true;   // default : true

        return config;
    }

    public preparedLoadData(items) {
        console.log('BoardListPage::preparedLoadData1 items =>', items, this._data);
        if (this._data.notice_list && this._data.notice_list.length > 0) {
            items = this._data.notice_list.concat(items);
            console.log('BoardListPage::preparedLoadData items =>', items);
        }        
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

    ////////////////////////////////////////////////////////////////////

    onClickChangeHiddenStatus(event, item) {

        console.log('onClickChangeHiddenStatus event =>', event);

        if(event == true)
            item.hidden = 0;
        if(event == false)
            item.hidden = 1;

        this.boardContentStore.update(item.seq, item).subscribe(resp => {
            console.log('onClickChangeHiddenStatus2 resp =>', resp);
            this.reloadList();
        });
    }

    //답변
    onClickGoRecontentsPage(seq) {
        console.log('onClickGoRecontentsPage seq =>', seq);
        this.appConfig.naviagteSafeProvider('main/board/' + this.boardId + '/update/' + seq + '/recontents');
    }

    // 답글
    onClickGoReplyPage(seq) {
        this.appConfig.naviagteSafeProvider('main/board/' + this.boardId + '/update/' + seq + '/reply');
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

    onClickViewItem(item, template: TemplateRef<any>) {

        console.log('onClickViewItem item =>', item);

        // sanitizer
        //item.contents = this.sanitizer.bypassSecurityTrustHtml(item.contents)

        this.boardContentStore.view(item.seq).subscribe((resp) => {
            this.selectedItem = Object.assign(item, resp);
        });

        //this.selectedItem = item;


        this.modalService.popup(template, '게시글 보기', '확인' , null , null,'large').subscribe((resp) => {
            if (resp == "OK") {

            } else if (resp == "CANCEL") {

            }
        });
    }

    // 사용자 게시판 화면
    onClickGoToFrontBoardView() {
        let url = this.appConfig.clientURL + '/board/' + this.boardId + '/list';
        window.open(url);
    }

    onClickButton(event) {

        console.log('onClickButton event =>', event);

        this.modalService.hide();

        if (event.command == 'modify') {
            this.updateItem(event.seq);
        } else if (event.command == 'recontents') {
            this.onClickGoRecontentsPage(event.seq);
        } else if (event.command == 'reply') {
            this.onClickGoReplyPage(event.seq);
        } if (event.command == 'remove') {
            this.deleteItem(event.seq);
        }
    }



    // resetBoardConfig() {

    //     console.log('resetBoardConfig query =>', this.query);

    //     this.pageTitle = '';

    //     // reset query form
    //     if (this.boardQueryForm) {
    //         this.boardQueryForm.reset();
    //     }
    // }

    // preparedLoadData(items) {
    //     return items;
    // }

    onClickDownGoodsSample(file) {
        console.log('onClickDownGoodsSample file =>', file);
        window.open(file, '_blank');
    }

*/
}

