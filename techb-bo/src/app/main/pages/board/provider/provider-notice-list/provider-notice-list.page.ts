// // basic
// import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { Router } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';

// // alert, modal
// import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
// import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
// import { BSModalService } from '@bricks/ui/bs-modal/index';

// import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
// import { BoardContentStore } from '@app/common/store/board-content.store';

// import { AppConfigService } from '@app/providers/service/app-config.service';

// @Component({
//   selector: 'provider-notice-list',
//   templateUrl: './provider-notice-list.page.html',
//   styleUrls: ['./provider-notice-list.page.css']
// })
// export class ProviderNoticeListPage extends BSDatatableController {

//     private boardData;
//     private boardConfig;
//     public hasModifyAuth: boolean = false;

//     constructor(public boardContentStore: BoardContentStore,
//         //loading: Ng4LoadingSpinnerService,
//         alert: BSAlertService,
//         private modalService: BOModalDialogService,
//         private modal: BSModalService,
//         protected router: Router,
//         activateRouter: ActivatedRoute,
//         public appConfig: AppConfigService,
//         ) {
//         super(boardContentStore, router, activateRouter, alert);

//         // load board data
//         // this.boardStore.get('notice').subscribe(resp => {
//         //     this.boardConfig = resp;
//         //     this.hasModifyAuth = this.boardStore.hasManageAuthForModify(resp.manager);
//         //     console.log('BoardNoticeListPage hasModifyAuth =>', this.hasModifyAuth);
//         // });
//     }

//     initController(config: any) {
//         console.log("BSDatatableController::initController command=", config);

//         config.store.command = 'admin/board/boarddata';
//         config.store.params = 'boardid=gs_seller_notice';

//         return config;
//     }

//     // onClickGoToFront() {
//     //     let url = this.appConfig.clientURL + '/board/notice/list';
//     //     window.open(url);
//     // }

//     /////////////////////////////////////////////////////////////
//     //복사
//     onClickCopy(boardId , seq) {
//         console.log(boardId , seq);
//         this.boardContentStore.copyNotice(boardId , seq).subscribe(resp => {
//             this.alert.show("복사되었습니다.");
//             this.reloadList();
//         });
//     }

//     // rowClick(rowEvent) {
//     //     console.log('Clicked: ' + rowEvent.row.item.name);
//     // }

//     onClickChangeHiddenStatus(event, item) {

//         if(event == true)
//             item.hidden = 0;
//         if(event == false)
//             item.hidden = 1;

//         this.datatableStore.update(item.seq, item).subscribe(resp => {
//             console.log(resp);
//         });
//     }

//     onClickViewItem(item , template: TemplateRef<any> , viewType ) {

//         this.boardData = item;
//         console.log(this.boardData , viewType);
//         this.modalService.popup(template, '게시글 보기' + '- 공지사항 게시판'  , '확인' , null , null).subscribe((resp)=>{
//             if (resp == "OK") {
//             } else if (resp == "CANCEL") {
//             }
//         });

//     }

//     deleteItem(id) {
//         this.alert.confirm("삭제 하시겠습니까?").subscribe((result) => {
//             this.boardContentStore.deleteBoard(id).subscribe( resp => {
//                 this.reloadList();
//                 this.alert.show("삭제 되었습니다.");
//             });
//         });
//     }


//     deleteSelectedItem(event , keyName) {

//         let count: number = event.rows.length;
//         let rolls: number = count;

//         this.alert.confirm(rolls + "개의 아이템을 삭제 하시겠습니까?").subscribe((result) => {

//             for(let row of event.rows) {
//                 console.log("BSUpdateFormController::deleteSelectedItem", row, row.item[keyName]);
//                 console.assert(row.item[keyName]);
//                 let id = row.item[keyName];
//                 this.boardContentStore.deleteBoard(id).subscribe( resp => {
//                     rolls--;
//                     if (rolls == 0) {
//                         this.reloadList();
//                         this.alert.show(count + "개의 아이템이 삭제 되었습니다.");
//                     }
//                 });
//             }
//         });
//     }

// }

