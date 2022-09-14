// basic
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BoardStore } from '@app/common/store/board.store';

// 내가 사용하는 스토어
import { BoardContentStore } from '@app/common/store/board-content.store';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
import { BoardConfigService } from '../board/board.config.service';
import { BSApi } from '@bricks/common/core/bs-api';

@Component({
  selector: 'board-content-list-page',
  templateUrl: './board-content-list.page.html',
  styleUrls: ['./board-content-list.page.css']
})
export class BoardContentListPage implements OnInit {

    public reviewList;
    private qnaList;
    public goodsQnaList;

    public list = [];

    public selectedBoardId;
    public selectedItem;
    public boardConfig;

    constructor(public boardContentStore: BoardContentStore,
        public bsapi: BSApi,
        public activatedRouter: ActivatedRoute,
        public appConfig: AppConfigService,
        private modalService: BOModalDialogService,
        public boardConfigService: BoardConfigService,
        private boardStore: BoardStore,
        public alert: BSAlertService,
        public router: Router) {

    }

    ngOnInit() {
        this.loadList();
    }

    loadList(query = null) {

        // 게시판 boardContent가 아닌 것

        // 상품문의
        this.boardContentStore.loadQNAList(1, 5, query).subscribe((resp) => {
            this.goodsQnaList = resp;
            console.log("loadList goodsQnaList => ", this.goodsQnaList);
        });

        // 상품후기
        this.boardContentStore.loadReviewList(1, 5, query).subscribe((resp) => {
            this.reviewList = resp;
            console.log("loadList reviewList => ", this.reviewList);
        });                
        
        // 게시판 boardContent인 것
        
        // 입점사문의
        // if (this.appConfig.isProvider) {
            this.boardContentStore.getList('gs_seller_qna', 1, 5, query).subscribe((resp) => {
                this.list['gs_seller_qna'] = resp;
                console.log("loadList gs_seller_qna => ", resp);
            });
        //}
     
        // 1:1문의
        if (!this.appConfig.isProvider) {
            this.boardContentStore.getList('mbqna', 1, 5, query).subscribe((resp) => {
                this.qnaList = resp;
                console.log("loadList qnaList => ", this.qnaList);
            });
        }
      
        // 공지사항
        if (!this.appConfig.isProvider) {
            this.boardContentStore.getList('notice', 1, 5, query).subscribe((resp) => {
                this.list['notice'] = resp;
                console.log("loadList notice => ", resp);
            });
        }

         // 입점사공지
        //if (this.appConfig.isProvider) {
            this.boardContentStore.getList('gs_seller_notice', 1, 5, query).subscribe((resp) => {
                this.list['gs_seller_notice'] = resp;
                console.log("loadList gs_seller_notice => ", resp);
            });
        //}

        //입고예정리스트
        if (!this.appConfig.isProvider) {
            this.boardContentStore.getList('incominglist', 1, 5, query).subscribe((resp) => {
                this.list['incominglist'] = resp;
                console.log("loadList incominglist => ", resp);
            });
        }

        //온라인프로모션
        if (!this.appConfig.isProvider) {
            this.boardContentStore.getList('onlinepromotion', 1, 5, query).subscribe((resp) => {
                this.list['onlinepromotion'] = resp;
                console.log("loadList onlinepromotion => ", resp);
            });
        }
    }

    // 조회폼에서 검색 버튼을 누른경우
    reloadWithQuery(query:any) {

        console.log('reloadWithQuery params =>', query);

        // 현재 api의 기간파라미터로 변경해줌
        // this.convertPeriodParams(query);

        this.loadList(query);

        // this.orderStore.list(query).subscribe((resp) => {
        //     this.data = resp;
        //     console.log("reloadWithQuery data => ", this.data);
        // });
    }

    // loadList() {
    //     this.orderStore.list().subscribe((resp) => {
    //         this.data = resp;
    //         console.log("loadList data => ", this.data);
    //     });
    // }

    // public convertPeriodParams(params) {

    //     if(!params || !params.period || !params.period.periodType || !params.period.sdate || !params.period.edate) return;

    //     console.log("convertPeriodParams params =>", params);

    //     const sdate = params.period.sdate;
    //     params[params.period.periodType + '[min]'] = sdate.year + '-' + sdate.month  + '-' + sdate.day;

    //     const edate = params.period.edate;
    //     params[params.period.periodType + '[max]'] = edate.year + '-' + edate.month  + '-' + edate.day;
    // }

    onSelectedItem(event, template: TemplateRef<any>) {

        console.log('onSelectedItem evnet, template =>', event, template);

        let itemSeq = event.item.seq;
        this.selectedBoardId = event.boardId;   
        
        // goods_qna, goods_review

        if (event.boardId == 'goods_qna') {
            // 조회수 올리고 올라간 조회 수 반영을 위해 다시 로딩한다.
            this.boardContentStore.getGoodsQNA(itemSeq).subscribe((resp) => {
                this.selectedItem = Object.assign(event.item, resp);              
            });
        } else if (event.boardId == 'goods_review') {
            // 조회수 올리고 올라간 조회 수 반영을 위해 다시 로딩한다.
            this.boardContentStore.getGoodsReview(itemSeq).subscribe((resp) => {
                this.selectedItem = Object.assign(event.item, resp);
            });
        } else {
            // 조회수 올리고 올라간 조회 수 반영을 위해 다시 로딩한다.
            this.boardContentStore.view(itemSeq).subscribe((resp) => {
                this.selectedItem = Object.assign(event.item, resp);
            });
        }

        this.boardStore.get(event.boardId).subscribe((resp2)=>{
    
            this.boardConfig = this.boardConfigService.getConfig(event.boardId, resp2);
            this.modalService.popup(template, '게시글 보기', '확인' , null , null,'large').subscribe((resp) => {
                if (resp == "OK") {

                } else if (resp == "CANCEL") {

                }
            });           
        });
      

        
        // item, viewType

        //this.boardData = item;        

        // let boardTitle = '';
        // switch(event.viewType) {
        //     case 'goodsreview' :
        //         boardTitle = '상품후기';
        //         break;
        //     case 'myqna' :
        //         boardTitle = '1:1문의';
        //         break;
        //     case 'goodsqna' :
        //         boardTitle = '상품문의';
        //          break;
        // }

        // let title = '게시글 보기';
        // if (boardTitle) {
        //     title += ' - ' + boardTitle + '게시판'; 
        // } 

        // this.modalService.popup(template, title, '확인' ,null , null ).subscribe((resp)=>{
        //     if (resp == "OK") {
        //     } else if (resp == "CANCEL") {
        //     }
        // });
    }

    // 팝업에서 '수정', '답변', '삭제' 버튼을 클릭한 경우
    onClickButton(event) {

        console.log('onClickButton event =>', event);

        if (this.modalService) {
            this.modalService.hide();
        }        

        if (event.item.boardid == 'onlinepromotion') {
            if (event.command == 'modify') {

                this.alert.show('온라인프로모션 게시판은 이벤트관리페이지로 이동합니다.').subscribe(()=>{
                    this.appConfig.naviagteSafeProvider('/main/event/event/update/' + event.item.seq);                    
                });     
                //this.router.navigate(['../'+ this.selectedBoardId + '/update/' + event.item.seq], 
                //    { relativeTo: this.activatedRouter });         
            } else if (event.command == 'reply') {
                
            } else if (event.command == 'recontents') {
                
            } if (event.command == 'remove') {
                this.deleteItem(event.item.seq);
            }

            return;
        } 

        if (event.command == 'modify') {
            this.router.navigate(['../'+ this.selectedBoardId + '/update/' + event.item.seq], 
                { relativeTo: this.activatedRouter });         
        } else if (event.command == 'reply') {
            this.router.navigate(['../'+ this.selectedBoardId + '/update/' + event.item.seq + '/reply'], 
                { relativeTo: this.activatedRouter });     
        } else if (event.command == 'recontents') {
            this.router.navigate(['../'+ this.selectedBoardId + '/update/' + event.item.seq + '/recontents'], 
                { relativeTo: this.activatedRouter });     
        } if (event.command == 'remove') {
            this.deleteItem(event.item.seq);
        } 
    }

    deleteItem(id, api?) {

        this.alert.confirm("삭제 하시겠습니까?").subscribe((result) => {
            this.boardContentStore.delete(id).subscribe( resp => {
                this.alert.show("삭제 되었습니다.");
                this.loadList();
            });
        });
    }

    gotoBoardList(id) {

        if (id == 'onlinepromotion') {
            this.alert.show('온라인프로모션 게시판은 이벤트관리페이지로 이동합니다.').subscribe(()=>{
            this.appConfig.naviagteSafeProvider('/main/event/event/list');
            });      
        } else {
            this.appConfig.naviagteSafeProvider('/main/board/' + id + '/list');
        }    
    }

    // onClickGoDetailPage(boardId) {

    //     let url;

    //     if (boardId == 'goods_review') {
    //         url = 'main/board/goods_review/list';
    //     } else if (boardId == 'mbqna') {
    //         url = 'main/board/mbqna/list';
    //     } else if (boardId == 'goods_qna') {
    //         url = 'main/board/goods_qna/list';
    //     }

    //     this.gotoLinkWithProvider(url);
    // }

    // gotoLinkWithProvider(url) {

    //     let _url;
    //     if(this.appConfig.isProvider) {
    //       _url = "/provider/" + url;
    //     } else {
    //       _url = url;
    //     }

    //     this.router.navigate([_url]);
    // }

}




