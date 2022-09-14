// basic
import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

import { GoodsStore } from '@app/common/store/goods.store';

@Component({
  selector: 'modal-goods-list-page',
  templateUrl: './modal-goods-list.page.html',
  styleUrls: ['./modal-goods-list.page.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ModalGoodsListPage extends BSDatatableController {

    @Input() auctionType: string = 'AUCTION_NONE';
    @Output() selectedGoods = new EventEmitter<string>();
    @ViewChild(DataTable) dataTable: DataTable;

    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    public selectSeq;

    constructor(public goodsStore: GoodsStore,
        public datatableStore: BSDatatableStore,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute
        ) {

        super(datatableStore, router, activateRouter, alert);

        console.log("GoodsListPage:constructor");
    }

    initController(config: any) {

        console.log("initController auctionType =>", this.auctionType);
        config.store.command = 'admin/shop/goods/goods';

        // auctionType
        if (this.auctionType !== 'AUCTION_NONE') {

            config.store.command = 'admin/shop/goods/auction';

            if (this.auctionType === 'AUCTION_READY') {
                config.store.params = 'has_auction=N'; // 옵션에 이벤트가 연결되어 있는지?
            } else if (this.auctionType === 'AUCTION_ING') {
                config.store.params = 'has_auction=Y';
            }
        }

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

    /////////////////////////////////////////////////////////
    // 파이프로 만들 필요 없는 내부 데이타 변환
    // 자주쓰는 변환만 파이프로 만든다.

    /////////////////////////////
    // 데이타테이블 버튼 클릭 시

    // rowClick(rowEvent) {
    //     console.log('Clicked: ' + rowEvent.row.item.name);
    // }

    // rowTooltip(item) { return item.jobTitle; }

    // onClickEdit(item) {
    //     alert(item.name +"수정");
    // }

    // onClickChangeHiddenStatus(event, item) {

    //     if(event == true)
    //         item.hidden = 1;
    //     if(event == false)
    //         item.hidden = 0;

    //     this.goodsStore.update(item.seq, item).subscribe(resp => {
    //         console.log(resp);
    //     })
    // }

    onClickGoodsNumber(item){
        this.selectSeq = item.seq;
        this.selectedGoods.emit(item);
    }

}

