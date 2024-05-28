import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataTable } from '@app/common/data-table/components/table';
import { BoardStore } from '@app/common/store/board.store';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

@Component({
  selector: 'board-manage-list-page',
  templateUrl: './board-manage-list.page.html',
  styleUrls: ['./board-manage-list.page.css'/*, '../../../app.component.css'*/],
})

export class BoardManageListPage extends BSDatatableController  {

    public clientURL: string = this.appConfig.clientURL;

    buttons: any = [{title: '게시판 생성', styleType: 'm-darkgrey'}]
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(public boardStore: BoardStore,
        public datatableStore: BSDatatableStore,
        alert: BSAlertService,
        protected router: Router,
        public appConfig: AppConfigService,
        activateRouter: ActivatedRoute) {
        super(boardStore, router, activateRouter, alert);
    }

    initController(config: any) {

        console.log("BoardListPage::initController command=", config);
        config.store.command = 'admin/board/boardmanager';       
        return config;
    }

    onClickSelectedBoard(event) {
        console.log("onclick row=", event);
        this.alert.confirm(event.rows.length +"개의 게시판을 삭제하시겠습니까?").subscribe((result) => {
          for(let items of event.rows){
            console.log("seq",items.item.seq);
            this.boardStore.delete(items.item.seq).subscribe(resp =>{
                this.reloadList();
            });
          }
        });
    }

    //   onClickDel(id) {

    //     alert(id +"삭제하시겠습니까?");
    //     this.boardStore.delete(id).subscribe(resp=>{
    //         this.dataTable.reloadList();
    //     });
    //   }

    onClickEdit(id){
        this.router.navigate(['main/board/update', id]);
    }

    // 게시글관리

    onClickContentManager(id) {

        if (id == 'onlinepromotion') {
        this.alert.show('온라인프로모션 게시판은 이벤트관리페이지로 이동합니다.').subscribe(()=>{
            this.appConfig.naviagteSafeProvider('/main/event/event/list');
        });
        } else {
        this.appConfig.naviagteSafeProvider('/main/board/' + id + '/list');
        }
    }

    // 사용자화면 
    onClickFrontBoardView(id) {
        //<a target="_blank" href="{{clientURL+'/board/'+item.id + '/list'}}">
        let url = this.clientURL +'/board/' + id + '/list';

        if(id == 'goods_review') {
        url = this.clientURL +'/board/review/list';
        }

        // 새창링크
        window.open(url);
    }

}
