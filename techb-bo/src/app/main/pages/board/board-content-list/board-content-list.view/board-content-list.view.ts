import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Component({
  selector: 'board-content-list-view',
  templateUrl: './board-content-list.view.html',
  styleUrls: ['./board-content-list.view.css']
})
export class BoardContentListView {

    private boardData;
    public clientURL: string = this.appConfig.clientURL;


    @Input() data: any;
    @Input() boardId: string;  // normal, goodsreview
    @Input() hasReply: boolean = false;

    @Output() onSelectedItem = new EventEmitter();

    constructor(private modalService: BOModalDialogService,
        public appConfig: AppConfigService,
        ) {
        this.boardData = this.data;

    }

    onClickViewItem(item, template: TemplateRef<any>, boardId) {

        console.log('onClickViewItem boardData =>', this.boardData , item, boardId);

        this.onSelectedItem.emit({item: item, boardId: boardId});

        // this.boardData = item;

        // let boardTitle = '';
        // switch(viewType) {
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

}
