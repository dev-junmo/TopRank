// basic
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';


// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { BoardContentStore } from '@app/common/store/board-content.store';

@Component({
  selector: 'order-list-page',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.css']
})
export class CrmOrderListPage extends BSDatatableController  {

    @ViewChild(DataTable) dataTable: DataTable;

    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(public boardContentStore: BoardContentStore,
        //loading: Ng4LoadingSpinnerService,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute
        ) {
        super(boardContentStore, router, activateRouter, alert);

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

    // onClickChangeHiddenStatus(event, item) {

    //     if(event == true)
    //         item.hidden = 1;
    //     if(event == false)
    //         item.hidden = 0;

    //     this.boardContentStore.update(item.seq, item).subscribe(resp => {
    //         console.log(resp);
    //     })
    // }


    //////////////////////////////////
    // 결제완료 버튼 클릭
    onClickCompletePayment(event) {

        console.log('onClickCompletePayment event =>', event);

        //

    }

}

