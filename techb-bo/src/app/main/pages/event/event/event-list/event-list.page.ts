// basic
import { Component, OnInit, ViewChild } from '@angular/core';
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

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
// import { EventStore } from '@app/common/store/event.store';
import { BoardContentStore } from '@app/common/store/board-content.store';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Component({
  selector: 'event-list-page',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.css']
})
export class EventListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;
    public clientURL: string = this.appConfig.clientURL;

    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(public datatableStore: BSDatatableStore,
        private boardContentStore: BoardContentStore,        //loading: Ng4LoadingSpinnerService,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService,

        ) {
        super(boardContentStore, router, activateRouter, alert);

    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);

        config.store.command = 'admin/board/boarddata';
        config.store.params = 'boardid=onlinepromotion';

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

        //////////////////////
        // 버튼 이벤트 처리 예

        //alert("최종 버튼 클릭 onclick id = " + id);


        //////////////////////
        // confirm 사용예

        // this.alert.confirm("메세지", "타이틀").subscribe((result)=>{
        //     alert(result);
        // });


        //////////////////////
        // alert 사용예

        //this.alert.show("ddddddd");


        //////////////////////
        // modal 사용예

        //this.modal.show('');


    }

    onClickPrintBtn(id) {

        // 생성 버튼을 클릭했다면
        if (id == 'id-coupon-content-list-btn-create') {

            // 생성 페이지로 이동합니다.
            this.router.navigate(['/main/event/event/create']);
        }
    }
    /////////////////////////////
    // 데이타테이블 해더버튼 클릭 시

    onClickDTHeaderBtn(event) {
        console.log("onclick row=", event);
        alert("onClickDTHeaderBtn onclick");
    }

    /////////////////////////////
    // 데이타테이블 버튼 클릭 시

    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
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

        this.boardContentStore.update(item.seq, item).subscribe(resp => {
            console.log(resp);
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


  

    // deleteSelectedItem(event , keyName) {

    //     let count: number = event.rows.length;
    //     let rolls: number = count;

    //     this.alert.confirm(rolls + "개의 아이템을 삭제 하시겠습니까?").subscribe((result) => {

    //         for(let row of event.rows) {
    //             console.log("BSUpdateFormController::deleteSelectedItem", row, row.item[keyName]);
    //             console.assert(row.item[keyName]);
    //             let id = row.item[keyName];
    //             this.boardContentStore.deleteBoard(id).subscribe( resp => {
    //                 rolls--;
    //                 if (rolls == 0) {
    //                     this.reloadList();
    //                     this.alert.show(count + "개의 아이템이 삭제 되었습니다.");
    //                 }
    //             });
    //         }
    //     });
    // }


   
}

