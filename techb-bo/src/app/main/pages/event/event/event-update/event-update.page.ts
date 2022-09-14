import { EventStore } from '@app/common/store/event.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';

import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';
import { BoardContentStore } from '@app/common/store/board-content.store';
import { BOAuthService } from '../../../../../providers/service/bo-auth.service';

import * as moment from 'moment';

@Component({
  selector: 'event-update',
  templateUrl: './event-update.page.html',
  styleUrls: ['./event-update.page.css']
})
export class EventUpdatePage extends BSUpdateFormController  {

    id ;
    private file;
    private data;
    constructor (
        baseStore: BSBaseStore,
        private boardContentStore: BoardContentStore,
        public auth : BOAuthService,
        protected router: Router,
        protected arouter: ActivatedRoute,
        private fileuploader : BSFileUploader,
        alert: BSAlertService,
    ) {

        super(baseStore, router, arouter, alert);
    }

    // ngOnInit() {
    // }

    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);
        //{{baseUrl}}/common/config/basic

        config.store.command = 'admin/board/boarddata';
        config.store.params = {boardid: 'onlinepromotion'};

        // config.store.id = 'icon';
        // config.title.update = "";
        config.gotoPrevPageAfterSubmit = true;

        return config;
    }


    preparedFormControlsConfig() {
        let config = {
        boardid: ['onlinepromotion'],
        subject: [],
        contents: [],
        adddata: [],
        ext_date: [],
        mobile_banner: [],
        mobile_contents: []

        };

        return config;
    }

    onFileUpload($event) {
        console.log("fileupload event", $event);
        // let seq:boolean = true;
        this.fileuploader.fileUpload($event).subscribe((resp=>{
        console.log('fileuploader resp=', resp);
        this.file = resp.url;
        this.bsForm.patchValue({
            adddata : resp.url
        });
        }));
    }


    preparedLoadData(resp) {
        console.log("BSUpdateFormController::preparedLoadData resp =", resp);
        this.data = resp;
        this.file = resp.adddata;

        // this.bsForm.patchValue({
        //   pc_url : resp.url,
        //   mobile_url : resp.mobile_url,
        //   banner_name : resp.banner_name,
        //   use_status : resp.use_status
        // })
        return resp;
    }


    preparedSaveData(value) {
        if(value.m_date > value.d_date) {
        this.alert.show('이벤트 기간은 시작일보다 종료일이 이전일 수 없습니다.');
        return false;
        }

        

        // if(value.d_date > value.ext_date) {
        //   this.alert.show('당첨자 발표일을 확인해주세요.');
        //   return false;
        // }

        console.log("BSUpdateFormController::preparedLoadData resp =", value);
        this.bsForm.patchValue({
            boardid : value.boardid
        });

        if(!this.id) {
        //   if(value.m_date < moment().format()) {
        //     this.alert.show('이벤트 기간을 확인해주세요.');
        //     return false;
        //   }
        value.name = this.auth.managerName;
        }
        return value;
    }

    // onSubmit() {
    //   let data = this.preparedSaveData(this.bsForm.value);
    //   if (data == false) return;

    //   if(this.isUpdateMode == true) {
    //       console.log(this.bsForm.value);
    //         this.boardContentStore.update(this.id , data).subscribe( resp => {
    //             this.alert.show("수정 되었습니다.");
    //             this.router.navigate(['/main/event/event/list'],{ relativeTo:this.activatedRouter });
    //         });
    //   } else {
    //     this.boardContentStore.regist(data).subscribe( resp => {
    //       this.alert.show("등록되었습니다.");
    //       this.router.navigate(['/main/event/event/list'],{ relativeTo:this.activatedRouter });
    //     });
    //   }
    // }





}
