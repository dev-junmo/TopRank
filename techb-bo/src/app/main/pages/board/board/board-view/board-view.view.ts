import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BOAuthService } from '../../../../../providers/service/bo-auth.service';
import { BoardContentStore } from '@app/common/store/board-content.store';

@Component({
  selector: 'board-view',
  templateUrl: './board-view.view.html',
  styleUrls: ['./board-view.view.css']
})
export class BoardViewView {

    public _boardItem: any;
    @Input() set boardItem(data) {
        console.log('BoardViewView::boardItem data =>', data);
        this._boardItem = data;
    }
    @Input() boardId: string;
    @Input() boardConfig: any;

    @Output() onClickButton = new EventEmitter();

    // let config = {
    //     auth : {
    //         read: false,
    //         write: false
    //     },
    //     ui : {
    //         createBtn: true,
    //         userBoard: false,
    //         userBoardItem: false
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

    constructor(
        private auth : BOAuthService,
        public boardContentStore: BoardContentStore) {

        console.log('BoardViewView _boardItem =>', this._boardItem);
        //public OrderStore: OrderListStore,
        //alert: BSAlertService,
        //activateRouter: ActivatedRoute,
        //protected router: Router) {

        //super(OrderStore, router, activateRouter, alert);
    }

    // 답변
    onClickRecontentsItem(seq) {
        console.log('onClickReplyItem seq =>', seq);
        this.onClickButton.emit({item: this._boardItem, command: 'recontents', seq: seq});
    }

    // 답글
    onClickReplyItem(seq) {
        console.log('onClickReplyItem seq =>', seq);
        this.onClickButton.emit({item: this._boardItem, command: 'reply', seq: seq});
    }

    // 수정
    onClickUpdateItem(seq) {
        console.log('onClickUpdateItem seq =>', seq);
        this.onClickButton.emit({item: this._boardItem, command: 'modify', seq: seq});
    }

    // 삭제
    onClickRemoveItem(seq) {
        console.log('onClickRemoveItem seq =>', seq);
        this.onClickButton.emit({item: this._boardItem, command: 'remove', seq: seq});
    }



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


    onFileDownload(upload) {
        console.log('onFileDownload upload =>', upload);

        if (upload && upload.length > 0) {
            window.open(upload, '_blank');
        }
    }

    // onFileDownload(re_upload) {
    //     console.log('onFileDownload re_upload =>', re_upload);

    //     if (re_upload && re_upload.length > 0) {
    //         window.open(re_upload[0], '_blank');
    //     }
    // }


}
