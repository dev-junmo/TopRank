// basic
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
//import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';

import { BoardContentStore } from '@app/common/store/board-content.store';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { BoardConfigService } from '../../../board/board/board.config.service';
import { BoardStore } from '@app/common/store/board.store';

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
// import { EventStore } from '@app/common/store/event.store';

@Component({
  selector: 'event-planshop-list-page',
  templateUrl: './event-planshop-list.page.html',
  styleUrls: ['./event-planshop-list.page.css']
})
export class EventPlanShopListPage extends BSDatatableController  {

    @ViewChild(DataTable) dataTable: DataTable;

    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.
    public clientURL: string = this.appConfig.clientURL;
    public apiURL: string = this.appConfig.apiURL;

    public selectedBoardId;
    public parentContentId;
    public selectedItem;
    public boardConfig;
    
    constructor(public datatableStore: BSDatatableStore,
        private boardContentStore : BoardContentStore,     //loading: Ng4LoadingSpinnerService,
        alert: BSAlertService,
        private modalService: BOModalDialogService,
        protected router: Router,
        private boardStore: BoardStore,
        public boardConfigService: BoardConfigService,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService,

        ) {
        super(datatableStore, router, activateRouter, alert);

    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);

        config.store.command = 'admin/board/boarddata';
        config.store.params = 'boardid=planshop';

        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    /////////////////////////////////////////////////////////
    // 파이프로 만들 필요 없는 내부 데이타 변환
    // 자주쓰는 변환만 파이프로 만든다.




    /////////////////////////////
    // 페이지 해더 버튼 클릭 시

    onClickCouponBtn(id) {

        // 생성 버튼을 클릭했다면
        if (id == 'id-board-content-list-btn-online-create') {

            // 생성 페이지로 이동합니다.
            this.router.navigate(['/main/event/event/create']);
        }
    }

    onClickPrintBtn(id) {

        // 생성 버튼을 클릭했다면
        if (id == 'id-coupon-content-list-btn-create') {

            // 생성 페이지로 이동합니다.
            this.router.navigate(['/main/event/event/create']);
        }
    }
    

    rowTooltip(item) { return item.jobTitle; }

    onClickEdit(id) {
        this.router.navigate(['main/event/event/update/'+ id]);
        // alert(item.name +"수정");
    }

  
    onClickChangeHiddenStatus(event, item) {

        if(event == true)
            item.hidden = 0;
        if(event == false)
            item.hidden = 1;

        this.boardContentStore.updateHidden(item.seq, item).subscribe(resp => {
            console.log(resp);
        });
    }

    deleteItem(id) {
        this.alert.confirm("삭제 하시겠습니까?").subscribe((result) => {
            this.boardContentStore.delete(id).subscribe( resp => {
                this.reloadList();
                this.alert.show("삭제 되었습니다.");
            });
        });
    }

    onClickCopy(boardId , seq) {
        console.log(boardId , seq);
        this.alert.confirm("복사 하시겠습니까?").subscribe(resp =>{
            this.boardContentStore.copyNotice(boardId , seq).subscribe(resp => {
                this.alert.show("복사되었습니다.");
                this.reloadList();
            });
        });
    }

    deleteSelectedItem(event , keyName) {

        let count: number = event.rows.length;
        let rolls: number = count;

        this.alert.confirm(rolls + "개의 아이템을 삭제 하시겠습니까?").subscribe((result) => {

            for(let row of event.rows) {
                console.log("BSUpdateFormController::deleteSelectedItem", row, row.item[keyName]);
                console.assert(row.item[keyName]);
                let id = row.item[keyName];
                this.boardContentStore.delete(id).subscribe( resp => {
                    rolls--;
                    if (rolls == 0) {
                        this.reloadList();
                        this.alert.show(count + "개의 아이템이 삭제 되었습니다.");
                    }
                });
            }
        });
    }

    goToPageClient() {
        window.open(this.clientURL + "/board/planshop/list");

    }

    updateItem(item) {

        console.log('updateItem item =>', item);

        //{ relativeTo: this.activateRouter }

        if (item.skin == 'planshop') {
            this.router.navigate(['../update2/' + item.seq],{ relativeTo: this.activateRouter });        
        } else {
            this.router.navigate(['../update/' + item.seq],{ relativeTo: this.activateRouter });
        }        
    }

    createItem2() {
        this.router.navigate(['../create2/' ],{ relativeTo: this.activateRouter });
    }   

    ////////////////////////////////////////////////////////////////////////////////////    
    // 댓글 관리
    onClickCommentManageBtn(item, template: TemplateRef<any>) {
        console.log('onClickCommentManageBtn item =>', item);

        this.selectedBoardId = 'planshop';
        this.parentContentId = item.seq;
        this.boardContentStore.get(item.seq).subscribe((resp) => {
            this.selectedItem = Object.assign(item, resp);

            this.boardStore.get('planshop').subscribe((resp2)=>{    
                this.boardConfig = this.boardConfigService.getConfig(this.selectedBoardId, resp2);
                
                console.log('onClickCommentManageBtn selectedBoardId, boardConfig, selectedItem =>', 
                    this.selectedBoardId, this.boardConfig, this.selectedItem);

                this.modalService.popup(template, '기획전 댓글관리'  , '확인' , null , null, 'large' ).subscribe((resp)=>{
                    if (resp == "OK") {
                    } else if (resp == "CANCEL") {
                    }
                });
            });
        });   
    }
}

