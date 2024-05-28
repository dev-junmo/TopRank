import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
//import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';

import { BSBaseStore } from '@app/common/store/bs-base.store';

//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BoardStore } from '@app/common/store/board.store';
//import { BoardContentStore } from '@app/common/store/board-content.store';

import { DomSanitizer } from '@angular/platform-browser';

import { BoardConfigService } from '../board.config.service';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOAuthService } from '../../../../../providers/service/bo-auth.service';

import { FormArray, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'board-update',
  templateUrl: './board-update.page.html',
  styleUrls: ['./board-update.page.css']
})
export class BoardUpdatePage extends BSUpdateFormController  {

    public boardId;
    public boardConfig;
    public boardData;   // 게시판 정보
    //private file;

    public pageTitle;

    public clientURL = AppConfigService.frontURL;
    public fileName;
    public reFileName;

    public isRecontentsMode = false;    // 답변
    public isReplyMode = false; // 답글

    private apiUrl = 'admin/board/boarddata';

    private parentId = null;

    // popup 게시판 처리
    private isOpenPopup: boolean = false; // 팝업 열기 체크박스
    private popupOpenType = 'always'; // always, date

    constructor (
        baseStore: BSBaseStore,
        private boardStore: BoardStore,
        protected router: Router,
        protected activateRouter: ActivatedRoute,
        alert: BSAlertService,
        public boardConfigService: BoardConfigService,
        public appConfig: AppConfigService,
        public authService: BOAuthService,
        private sanitizer: DomSanitizer,) {

        super(baseStore, router, activateRouter, alert);

        if (activateRouter.params) {
            activateRouter.params.subscribe(params => {

                console.log('BoardUpdatePage::constructor::activateRouter params =>', params);

                this.boardId = params['boardId'];

                this.isRecontentsMode = (params['mode'] == 'recontents');
                this.isReplyMode = (params['mode'] == 'reply');

                // 상품문의일 경우
                if (this.boardId == 'goods_qna') {
                    this.apiUrl = 'admin/goods/goodsqna';
                }

                // 상품후기일 경우
                if (this.boardId == 'goods_review') {
                    this.apiUrl = 'admin/goods/goodsreview';
                }

                console.log('BoardUpdatePage::constructor::activateRouter boardId, isRecontentsMode =>', this.boardId, this.isRecontentsMode);
            });
        }
    }

    preparedFormControlsConfig() {

        let config = {
            boardid: [this.boardId],
            subject: [],
            contents: [],

            /////////////////
            upload: ['','','','',''], //new FormArray([this.fb.group({file:[]}),this.fb.group({file:[]}),this.fb.group({file:[]}),this.fb.group({file:[]}),this.fb.group({file:[]})]),
            upload2: new FormArray([
                this.fb.group({file:new FormControl(), fileName:''}),
                this.fb.group({file:new FormControl(), fileName:''}),
                this.fb.group({file:new FormControl(), fileName:''}),
                this.fb.group({file:new FormControl(), fileName:''}),
                this.fb.group({file:new FormControl(), fileName:''})
            ]),
            category: [],
            notice: ['0'],
            onlynotice: [],
            secret: 0,

            /////////////////
            re_subject: [],
            re_contents: [],
            re_upload:['','','','',''],
            re_upload2: new FormArray([
                this.fb.group({file:new FormControl(), fileName:''}),
                this.fb.group({file:new FormControl(), fileName:''}),
                this.fb.group({file:new FormControl(), fileName:''}),
                this.fb.group({file:new FormControl(), fileName:''}),
                this.fb.group({file:new FormControl(), fileName:''})
            ]),

            onlypopup: [],
            onlypopup_sdate: [],
            onlypopup_edate: [],

            hidden: 0,
        };

        return config;
    }


    // initController(config: any) {
    //   console.log("BSUpdateFormController::initController command=", config);
    //   //{{baseUrl}}/common/config/basic

    //   config.store.command = 'admin/goods/review/best';
    //   // config.store.params = 'boardid=notice';

    //   // config.store.id = 'icon';
    //   // config.title.update = "";
    //   config.gotoPrevPageAfterSubmit = true;

    //   return config;
    // }

    initController(config: any) {

        config.store.command = this.apiUrl;
        config.gotoPrevPageAfterSubmit = true;

        console.log("initController config =>", config);

        return config;
    }

    afterInit() {

        console.assert(this.boardId);

        if (this.boardId) {
            this._boardConfigLoad();
        }
    }

    _boardConfigLoad() {

        // 게시판 정보 로드
        this.boardStore.get(this.boardId).subscribe(resp => {
            this.boardData = resp;
            console.log("initController boardId, resp =>", this.boardId, resp);

            // cnofig
            this.boardConfig = this.boardConfigService.getConfig(this.boardId, this.boardData);

            // title
            let typeText = '등록';
            if (this.isUpdateMode) {
                typeText = '수정';
            }
            this.pageTitle = resp.name + ' 게시판 글 ' + typeText;

            if (this.isRecontentsMode) {
                this.pageTitle = resp.name + ' 게시판 - 글 답변';
            }

        });
    }

    preparedLoadData(resp) {

        console.log("BoardUpdatePage::preparedLoadData resp =>", resp);

        if (resp.upload) {
            resp.upload2 = [];
            let i = 0;
            for(let file of resp.upload) {
                if (resp.file_name && resp.file_name[i]) {
                    let obj = { file : file, fileName: resp.file_name[i]};
                    resp.upload2.push(obj);
                }                
                i++;
            }
        }

        if (resp.re_upload) {
            resp.re_upload2 = [];
            let i = 0;
            for(let file of resp.re_upload) {
                if (resp.re_file_name && resp.re_file_name[i]) {
                    let obj = { file : file, fileName: resp.re_file_name[i]};
                    resp.re_upload2.push(obj);
                }
                i++;
            }
        }


       
        if (this.isReplyMode) {

            this.isUpdateMode = false;
            this.parentId = this.id;

            if (this.isReplyMode) {
                this.id = '';
            }

            resp.subject = 'RE : ' + resp.subject;
            let index = resp.contents.indexOf('<body>');
            if (index == -1) {
                resp.contents = '<br><strong>------------- Original Message -------------</strong><br>' + resp.contents;
            } else {
                let reply = '<br><br><strong>---------------- Original Message ----------------</strong><br>';
                let contents = resp.contents;
                resp.contents = contents.slice(0, index+6) + reply + contents.slice(index+6);
            }
            this.bsForm.get('contents').setValue(this.sanitizer.bypassSecurityTrustHtml(resp.contents));

            console.log('afterPatchLoadData data =>', resp.contents);

            resp.upload = [];
            resp.file_name = [];
        }

        // update fileName
        if (resp.file_name && resp.file_name.length > 0) {
            this.fileName = resp.file_name[0];
        }

        if (resp.re_file_name && resp.re_file_name.length > 0) {
            this.reFileName = resp.re_file_name[0];
        }

        // category
        if (resp.category) {
            resp.category = resp.category.trim();
        }

        // load popup
        if (resp.onlypopup) {
            if (resp.onlypopup == 'd') {
                this.isOpenPopup = true;
                this.popupOpenType = 'date';
            } else if (resp.onlypopup == 'y') {
                this.isOpenPopup = true;
                this.popupOpenType = 'always';
            }
        }

        return resp;
    }

    afterPatchLoadData(data) {

    }

    preparedSaveData(value) {
        console.log("preparedSaveData value =>", value);
        console.log("preparedSaveData isOpenPopup, popupOpenType =>", this.isOpenPopup, this.popupOpenType);

        // save popup 
        if (this.isOpenPopup) {
            if (this.popupOpenType == "date") {
                if (!value.onlypopup_sdate || !value.onlypopup_edate) {
                    this.alert.show("팝업을 띄울 기간을 입력해주세요.");
                    return false;
                }
                value.onlypopup = 'd';
            } else {
                value.onlypopup = 'y';
            }
        } else {
            value.onlypopup = null;
        }

        console.log("preparedSaveData upload2 =>", value.upload2);
        value.upload = [];
        for(let item of value.upload2) {
            if (item.file) {
                value.upload.push(item.file);
            }
        }

        console.log("preparedSaveData re_upload2 =>", value.re_upload2);
        value.re_upload = [];
        for(let item of value.re_upload2) {
            if (item.file) {
                value.re_upload.push(item.file);
            }
        }

        console.log("preparedSaveData2 value =>", value);

        if (this.parentId) {
            value.seq = this.parentId;
        }

        return value;
    }

    onClickGoToFrontBoardView() {

        if (this.id) {
            let url = this.appConfig.clientURL + '/board/' + this.boardId + '/view/' + this.id;
            window.open(url);
        }
    }

    // preparedLoadData(resp) {
    //     console.log("BSUpdateFormController::preparedLoadData resp =", resp);
    //     this.file = resp.upload;

    //     if(resp.onlynotice == 1){
    //       this.bsForm.get('onlynotice').setValue(1);
    //     } else {
    //       this.bsForm.get('onlynotice').setValue(0);
    //     }

    //     return resp;
    // }


    // preparedSaveData(value) {
    //   if(value.onlynotice == 1) {
    //     this.bsForm.get('onlynotice').setValue(1);
    //     value.onlynotice = 1
    //   } else {
    //     this.bsForm.get('onlynotice').setValue(0);
    //     value.onlynotice = 0
    //   }
    //     console.log("BSUpdateFormController::preparedLoadData resp =", value);
    //     value.name = this.auth.managerName;
    //     return value;
    // }

    // onFileUpload($event) {

    //   console.log("fileupload event", $event);
    //   // let seq:boolean = true;
    //   this.fileuploader.fileUpload($event).subscribe((resp=>{
    //     console.log('fileuploader resp=', resp);
    //     this.file = resp.url;
    //     this.bsForm.patchValue({
    //       upload : resp.url
    //    });
    //   }));
    // }

    onChangeIsOpenPopup(value) {

    }

    getUploadFileFormGroup(arrayName, idx) {
        let _files = this.bsForm.get(arrayName);
        let idxs: string = idx.toString();       

        console.log('getUploadfileFormGroup bsForm, arrayName, idx, _files, _files.get(idxs) =>', this.bsForm, arrayName, idx, _files, _files.get(idxs));
        return _files.get(idxs);
    }

    onFileDownload(upload) {
        console.log('onFileDownload upload =>', upload);

        if (upload && upload.length > 0) {
            window.open(upload, '_blank');
        }
    }

    // fileupload event
    onFileUploaded(event, item) {
        item.value.fileName = event.fileName;
        console.log('onFileUploaded event, item =>', event, item);
    }


}
