import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BOCommonModule } from '@app/common/bo-common.module';
import { BSCommonModule } from '@bricks/common/bs-common.module';

// 리스트페이지의 경우 넣어주세요.
import { DataTableModule } from '@app/common/data-table/index';


//
///////////////////////////////////////////////////////////////////

// import { NoticeQueryForm } from './notice/board-notice-list/notice-query-form/notice-query-form';
// import { BoardNoticeListPage } from './notice/board-notice-list/board-notice-list.page';

//import { BoardNoticeUpdatePage } from './notice/board-notice-update/board-notice-update';

import { BoardContentQueryForm } from './board-content-list/board-content-query-form/board-content-query-form';
import { UiSwitchModule } from 'ngx-toggle-switch';
// import { BoardContentDatatable } from './board-content-list/app-board-content-data-table/app-board-content-data-table';
import { BoardListQueryForm } from './board-manage/board-manage-list/board-manage-list-query-form/board-list-query-form';

import { BoardStore } from '@app/common/store/board.store';
import { BoardContentStore } from '@app/common/store/board-content.store';
import { GoodsBestReviewStore } from '@app/common/store/goods-best-review.store';

// import { BOCommonModule } from './../../../common/bo-common.module';

import { BoardRoutingModule } from './board.routing';

// board
import { BoardComponent } from './board.component';

////////////////////////////////////
// 게시판 관리
import { BoardManageListPage } from './board-manage/board-manage-list/board-manage-list.page';
import { BoardManageCreatePage } from './board-manage/board-manage-create/board-manage-create.page';

///////////////////////////////////
// 표준 보드 컴포넌트
import { BoardListPage } from './board/board-list/board-list.page';
import { BoardQueryForm } from './board/board-list/board-query-form/board-query-form';

import { BoardUpdatePage } from './board/board-update/board-update.page';
import { BoardViewView } from './board/board-view/board-view.view';
import { BoardCommentView } from './board/board-comment-view/board-comment-view.view';

import { BoardConfigService } from './board/board.config.service';


// form
//import { BOFormSubmitButton } from './board-content-list/board-query-form/bo-form-submit-button/bo-form-submit-button';
//import { BOFormShow } from './board-content-list/board-query-form/bo-form-show/bo-form-show';

import { GoodsReviewStore } from '../../../common/store/goods-review-list.store';

// board/boardContentlist
import { BoardContentListPage } from './board-content-list/board-content-list.page';
import { BoardContentListView } from './board-content-list/board-content-list.view/board-content-list.view';

// board/faq
//import { BoardFAQListPage } from './faq/board-faq-list/board-faq-list.page';
//import { BoardFAQQueryForm } from './faq/board-faq-list/board-faq-query-form/board-faq-query-form';
//import { BoardFAQUpdatePage } from './faq/board-faq-update/board-faq-update';

// board/goodsqna
import { BoardGoodsQNAListPage } from './goodsqna/board-goods-qna-list/board-goods-qna-list.page';
import { BoardGoodsQNAQueryForm } from './goodsqna/board-goods-qna-list/board-goods-qna-query-form/board-goods-qna-query-form';
// board/goodsreview
import { BoardGoodsReviewListPage } from './goodsreview/board-goods-review-list/board-goods-review-list.page';
import { BoardGoodsReviewQueryForm } from './goodsreview/board-goods-review-list/board-goods-review-query-form/board-good-sreview-query-form';
// board/mbqna
//import { BoardMyQNAListPage } from './myqna/board-myqna-list/board-myqna-list.page';
//import { BoardMyQNAQueryForm } from './myqna/board-myqna-list/board-myqna-query-form/board-myqna-query-form';
//import { BoardMyQNAUpdatePage } from './myqna/board-myqna-update/board-myqna-update';
//import { BoardReplyUpdatePage } from './myqna/board-reply-update/board-reply-update';
import { BoardGoodsReviewUpdatePage } from './goodsreview/board-goods-review-update/board-goods-review-update';
//import { BoardGoodsQNAUpdatePage } from './goodsqna/board-goods-qna-update/board-goods-qna-update';
//import { BoardGooodsQNAReplyUpdatePage } from './goodsqna/board-goods-qna-reply-update/board-goods-qna-reply-update';
//board/goods-best-review
import { BoardGoodsBestReviewQueryForm } from './goods-best-review/board-goods-best-review-list/board-goods-best-review-query-form/board-good-best-review-query-form';
import { BoardGoodsBestReviewListPage } from './goods-best-review/board-goods-best-review-list/board-goods-best-review-list.page';
import { BoardGoodsBestReviewUpdatePage } from './goods-best-review/board-goods-best-review-update/board-goods-best-review-update';

//import { ProviderListQueryFormComponent } from '../setup/provider/provider-list/provider-list-query-form/provider-list-query-form.component';
//import { ProviderNoticeListPage } from './provider/provider-notice-list/provider-notice-list.page';
//import { ProviderNoticeUpdatePage } from './provider/provider-notice-update/provider-notice-update';
//import { ProviderNoticeQueryForm } from './provider/provider-notice-list/provider-notice-query-form/provider-notice-query-form';


@NgModule({
    imports: [
        // angular
        ReactiveFormsModule,
        FormsModule,

        //
        BSCommonModule,
        BOCommonModule,

        //
        BoardRoutingModule,
        UiSwitchModule,
        CommonModule,
        DataTableModule,

    ],
    declarations: [
        BoardManageCreatePage,

        BoardComponent,
        BoardContentListPage, // 1.게시글 관리
        BoardManageListPage, // 2.게시판 관리
        BoardViewView,
        BoardCommentView,
        BoardContentListView,

        // common board
        BoardListPage,
        BoardQueryForm,
        BoardUpdatePage,

        BoardListQueryForm,
        BoardContentQueryForm,

        //notice
        // BoardNoticeListPage,
        // NoticeQueryForm,
        //BoardNoticeUpdatePage,

        // faq
        //BoardFAQListPage,
        //BoardFAQQueryForm,
        //BoardFAQUpdatePage,
        // goods-qna
        BoardGoodsQNAListPage,
        BoardGoodsQNAQueryForm,
        //BoardGoodsQNAUpdatePage,
        //BoardGooodsQNAReplyUpdatePage,

        // goods-review
        BoardGoodsReviewListPage,
        BoardGoodsReviewQueryForm,
        BoardGoodsReviewUpdatePage,

        // myqna
        //BoardMyQNAListPage,
        //BoardMyQNAQueryForm,
        //BoardMyQNAUpdatePage,
        //BoardReplyUpdatePage,

        //goods-best-review
        BoardGoodsBestReviewQueryForm,
        BoardGoodsBestReviewListPage,
        BoardGoodsBestReviewUpdatePage,

        /*provider-notice */
        //ProviderNoticeQueryForm,
        //ProviderNoticeListPage,
        //ProviderNoticeUpdatePage,
        // form
        // BOFormSubmitButton,
        // BOFormShow,

        // DataTableDemo1,
        // DataTableDemo1Remote,
        // DataTableDemo2,
        // Demo1DataTableHeader,
        // BoardContentDatatable,
    ],
    exports: [
        BoardViewView,
        BoardCommentView
    ],
    providers: [
        BoardStore, BoardContentStore,
        GoodsReviewStore,
        GoodsBestReviewStore,

        // common board
        BoardConfigService
    ]
})
export class BoardModule { }
