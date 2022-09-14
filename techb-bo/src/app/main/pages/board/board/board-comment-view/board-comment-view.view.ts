// basic
import { Router, ActivatedRoute } from "@angular/router";
import { Component, Input, Output, EventEmitter } from '@angular/core';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

//
import { BoardContentStore } from '@app/common/store/board-content.store';

// datatable -리스트페이지에 필요
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';

import { AppConfigService } from '@app/providers/service/app-config.service';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { BoardConfigService } from '../../../board/board/board.config.service';
import { BoardStore } from '@app/common/store/board.store';

import { DataTable, DataTableRow } from '@app/common/data-table/index';


@Component({
  selector: 'board-comment-view',
  templateUrl: './board-comment-view.view.html',
  styleUrls: ['./board-comment-view.view.css']
})
export class BoardCommentView extends BSDatatableController {

    public _oriContentData: any;    // 원글 데이타
    //public _commentData: any;       

    @Input() boardId: string;
    @Input() parentContentId: string;
    @Input() boardConfig: any;
  
    public newCommentData;
    public isSecret: boolean;

    @Input() set oriContentData(data) {
        console.log('BoardCommentView::oriContentData data =>', data);
        this._oriContentData = data;
    }

    // @Input() set commentData(data) {
    //     console.log('BoardCommentView::commentData data =>', data);
    //     this._commentData = data;
    // }
    
    @Output() onClickButton = new EventEmitter();

    // let config = {
    //     auth : {
    //         read: false,
    //         write: false
    //     },
    //     ui : {
    //         createBtn: true,
    //         userBoard: false,
    //         useroriContentData: false
    //     },
    //     use : {
    //         reply: false,
    //         secret: false,
    //         file: false,
    //         category: false // not used
    //     }
    // };

    // public viewType = '';
    // @Input() viewType: string;
    // @Input() hasReply: boolean = false;
    // isReadonly : boolean = true;

    public max;

    constructor(public datatableStore: BSDatatableStore,
        private boardContentStore : BoardContentStore,     //loading: Ng4LoadingSpinnerService,
        alert: BSAlertService,
        private modalService: BOModalDialogService,
        protected router: Router,
        private boardStore: BoardStore,
        public boardConfigService: BoardConfigService,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService) {
        super(datatableStore, router, activateRouter, alert);

    }

    initController(config: any) {
        console.log("initController cofig =>", config);
        config.store.command = 'admin/board/boardcomment';
        config.usePageLocationParams = false; 
        return config;
    }    

    public preparedParams(params) {
        console.log('preparedParams params =>', params);
        params.boardid = this.boardId;
        params.parent = this.parentContentId;        
        return params;
    }

    public preparedLoadData(items) {

        for(let item of items) {
            item.isSecret = item.hidden;
        }

        return items;
    }


    onClickPostComment() {
        if (!this.newCommentData || this.newCommentData.length == 0) {
            this.alert.show("내용을 입력해주세요.");
            return;
        } 
       
        this.boardContentStore.postComment(this.boardId, this.parentContentId, this.newCommentData, this.isSecret? 1:0).subscribe((resp) => {
            this.newCommentData = '';
            this.alert.show("댓글이 등록되었습니다.");
            this.reloadList();
        });
    }

    onClickPostReply(item) {
        if (!item.newReplyData || item.newReplyData.length == 0) {
            this.alert.show("내용을 입력해주세요.");
            return;
        } 
        // //boardId, content_seq, content, hidden, parentComment
        this.boardContentStore.postReply(this.boardId,  this.parentContentId, item.newReplyData, item.isSecret? 1:0, item.seq).subscribe((resp) => {
            item.newReplyData = '';
            this.alert.show("답글이 등록되었습니다.");
            this.reloadList();
        });
    }

    onClickExcelDownload(event) {
        this.boardContentStore.downloadComment(this.boardId, this.parentContentId);
        // .subscribe(()=>{
        //     //this.alert.show("엑셀파일을 다");
        // }, error => {
        //     this.alert.show("엑셀파일 다운로드에 오류가 발생하였습니다.");
        // });
    }

    onClickTitle(row) {
        console.log('BoardCommentView::onClickTitle row =>', row);
        row.expanded = !row.expanded;
    }

    //////////////////////////////////////////////////////////////////
    // 댓글/답글 수정

    // 댓글/답글 수정클릭 수정 
    onClickModifyComment(item) {
        item.isShowModify = true;
        item.newContent = item.content;
    }

    // 댓글/답글 수정 POST 
    onClickPostModifyComment(item) {
        this.alert.confirm('글을 수정하시겠습니까?').subscribe(result => {
            this.boardContentStore.updateComment(item.seq, item.newContent, item.isSecret).subscribe(resp => {
                item.newContent = '';
                this.alert.show('글이 수정되었습니다.');
                this.reloadList();
            });
        });
    }

    // 댓글/답글 수정취소
    onClickCancelModifyComment(item) {
        item.isShowModify = false;
        item.newContent = '';
        item.isSecret = false;
    }

    // onClickRow(event) {
    //     event.row.expanded = !event.row.expanded;
    // }

    // // 답변
    // onClickRecontentsItem(seq) {
    //     console.log('onClickReplyItem seq =>', seq);
    //     this.onClickButton.emit({item: this._oriContentData, command: 'recontents', seq: seq});
    // }

    // // 답글
    // onClickReplyItem(seq) {
    //     console.log('onClickReplyItem seq =>', seq);
    //     this.onClickButton.emit({item: this._oriContentData, command: 'reply', seq: seq});
    // }

    // // 수정
    // onClickUpdateItem(seq) {
    //     console.log('onClickUpdateItem seq =>', seq);
    //     this.onClickButton.emit({item: this._oriContentData, command: 'modify', seq: seq});
    // }

    // // 삭제
    // onClickRemoveItem(seq) {
    //     console.log('onClickRemoveItem seq =>', seq);
    //     this.onClickButton.emit({item: this._oriContentData, command: 'remove', seq: seq});
    // }



    // ngOnInit() {
    //     this.getData();
    // }

    // getData(){
    //     this.OrderStore.list().subscribe(resp=>{
    //         this.order = resp;
    //         console.log(resp);
    //     });
    // }

    // onClickBlank(id){
    //     window.open('main/order/view/' + id, '_blank');
    // }

    // onClickHeaderBtn(id) {

    // }


    // onClickDTHeaderBtn(event) {
    //     console.log("onclick row=", event);
    //     alert("onClickDTHeaderBtn onclick");
    // }

    // rowClick(rowEvent) {
    //     console.log('Clicked: ' + rowEvent.row.item.name);
    // }

    // rowDoubleClick(rowEvent) {
    //     alert('Double clicked: ' + rowEvent.row.item.name);
    // }

    // rowTooltip(item) { return item.jobTitle; }

    // onClickEdit(item) {
    //     alert(item.name +"수정");
    // }


    // onFileDownload(upload) {
    //     console.log('onFileDownload upload =>', upload);

    //     if (upload && upload.length > 0) {
    //         window.open(upload, '_blank');
    //     }
    // }

    // onFileDownload(re_upload) {
    //     console.log('onFileDownload re_upload =>', re_upload);

    //     if (re_upload && re_upload.length > 0) {
    //         window.open(re_upload[0], '_blank');
    //     }
    // }


}
