// import { NoticeListPage } from './notice-list/notice-list.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board.component';


//import { BoardNoticeListPage } from './notice/board-notice-list/board-notice-list.page';
import { BoardContentListPage } from './board-content-list/board-content-list.page';

///////////////////////////////////
// 표준 보드 컴포넌트
import { BoardListPage } from './board/board-list/board-list.page';
import { BoardUpdatePage } from './board/board-update/board-update.page';

////////////////////////////////
// 게시판 관리 
import { BoardManageListPage } from './board-manage/board-manage-list/board-manage-list.page';
import { BoardManageCreatePage } from './board-manage/board-manage-create/board-manage-create.page';


//import { BoardFAQListPage } from './faq/board-faq-list/board-faq-list.page';
//import { BoardMyQNAListPage } from './myqna/board-myqna-list/board-myqna-list.page';
import { BoardGoodsQNAListPage } from './goodsqna/board-goods-qna-list/board-goods-qna-list.page';
import { BoardGoodsReviewListPage } from './goodsreview/board-goods-review-list/board-goods-review-list.page';
//import { BoardNoticeUpdatePage } from './notice/board-notice-update/board-notice-update';
//import { BoardFAQUpdatePage } from './faq/board-faq-update/board-faq-update';
//import { BoardMyQNAUpdatePage } from './myqna/board-myqna-update/board-myqna-update';
//import { BoardReplyUpdatePage } from './myqna/board-reply-update/board-reply-update';
//import { BoardGoodsQNAUpdatePage } from './goodsqna/board-goods-qna-update/board-goods-qna-update';
import { BoardGoodsReviewUpdatePage } from './goodsreview/board-goods-review-update/board-goods-review-update';
//import { BoardGooodsQNAReplyUpdatePage } from './goodsqna/board-goods-qna-reply-update/board-goods-qna-reply-update';

import { BoardGoodsBestReviewListPage } from './goods-best-review/board-goods-best-review-list/board-goods-best-review-list.page';
import { BoardGoodsBestReviewUpdatePage } from './goods-best-review/board-goods-best-review-update/board-goods-best-review-update';
//import { ProviderNoticeListPage } from './provider/provider-notice-list/provider-notice-list.page';
//import { ProviderNoticeUpdatePage } from './provider/provider-notice-update/provider-notice-update';


const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [


      { path: '', redirectTo: 'list' },
      { path: 'list', component: BoardListPage},

      { path: 'board', redirectTo: 'board/list',  pathMatch: 'full' },
      { path: 'board/list', component: BoardListPage },     
      

        //{ path: '', redirectTo: 'content-lists' },

        // 통합게시글관리
        
        // { path: 'content-lists', component: BoardContentListPage },
        // { path: 'content-lists/list', component: BoardContentListPage },

        // // 게시판 관리
        // { path: 'board-manage', redirectTo: 'board-manage/list',  pathMatch: 'full' },
        // { path: 'board-manage/list', component: BoardManageListPage },
        // { path: 'board-manage/create', component: BoardManageCreatePage },
        // { path: 'board-manage/update/:id', component: BoardManageCreatePage },

        // 공지사항 , notice
        // { path: 'notice', redirectTo: 'notice/list',  pathMatch: 'full' },
        // { path: 'notice/list', component: BoardNoticeListPage },
        // { path: 'notice/create', component: BoardNoticeUpdatePage },
        // { path: 'notice/update/:id', component: BoardNoticeUpdatePage },

        // 게시판 별도 페이지 routing role -> bouard_id/list

        // 입점사 공지사항
        // { path: 'gs_seller_notice', redirectTo: 'gs_seller_notice/list',  pathMatch: 'full' },      
        // { path: 'gs_seller_notice/list', component: ProviderNoticeListPage },
        // { path: 'gs_seller_notice/create', component: ProviderNoticeUpdatePage },
        // { path: 'gs_seller_notice/update/:id', component: ProviderNoticeUpdatePage },

        // faq
        // { path: 'faq', redirectTo: 'faq/list',  pathMatch: 'full' },
        // { path: 'faq/list', component: BoardFAQListPage },
        // { path: 'faq/create', component: BoardFAQUpdatePage },
        // { path: 'faq/update/:id', component: BoardFAQUpdatePage },

        // 1:1문의
        /////////////////////////////////////////////////////////////////
        // 표준 게시판 - 게시글 관리

        // #todo board/list, board/create 는 게시판 목록, 생성으로
        //       board/:id/content/list, 이렇게 하는게 좋겠음

        // { path: ':id', redirectTo: ':id/list',  pathMatch: 'full' },
        // { path: ':id/list', component: BoardListPage },
        // { path: ':boardId/update/:id', component: BoardUpdatePage },
        // { path: ':boardId/update/:id/:mode', component: BoardUpdatePage },                        
        // { path: ':boardId/create', component: BoardUpdatePage },
    ]
  }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
