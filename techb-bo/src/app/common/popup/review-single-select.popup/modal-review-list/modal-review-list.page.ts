// basic
import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter , TemplateRef } from '@angular/core';

import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

import { environment } from '../../../../../environments/environment';

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { GoodsBestReviewStore } from '@app/common/store/goods-best-review.store'

@Component({
  selector: 'modal-review-list-page',
  templateUrl: './modal-review-list.page.html',
  styleUrls: ['./modal-review-list.page.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ModalReviewListPage extends BSDatatableController {

    @Input() auction: boolean = false;
    @Output() selectedGoods = new EventEmitter<string>();
    @ViewChild(DataTable) dataTable: DataTable;

    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    public selectSeq;
    public frontAppURL = environment.frontAppURL;

    constructor(
        public datatableStore: BSDatatableStore,
        //loading: Ng4LoadingSpinnerService,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService,
        private modalService: BOModalDialogService,
        private bestReviewStore : GoodsBestReviewStore,
        ) {

        super(datatableStore, router, activateRouter, alert);

        console.log("GoodsListPage:constructor");
    }

    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);
        //{{baseUrl}}/common/config/basic

        config.store.command = 'admin/goods/goodsreview';
        config.store.params = 'hidden=0'


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
    // 데이타테이블 버튼 클릭 시

    onClickClientView() {
        // AppConfigService
        window.open(this.appConfig.clientURL + "/board/review/list");
    }

    onClickViewItem(item , template: TemplateRef<any> , viewType ) {

        console.log('onClickViewItem item , viewType =>', item , viewType);
        
        this.modalService.popup(template, '게시글 보기' + '- 상품후기 게시판'  , '확인' , null , null,'large' ).subscribe((resp)=>{
            if (resp == "OK") {
            } else if (resp == "CANCEL") {
            }
        });
    }

    onClickBestItem( id , checked , item) {
        console.log(id, checked);
        this.bestReviewStore.setBestItem(id, checked).subscribe(resp => {
            item.best = resp.best;
        });

    }


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


    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item) { return item.jobTitle; }

    onClickEdit(item) {
        alert(item.name +"수정");
    }

    onClickGoodsNumber(item){
        this.selectSeq = item.seq;
        this.selectedGoods.emit(item);
    }

}

