import { EventStore } from '@app/common/store/event.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BOAuthService } from '../../../../../providers/service/bo-auth.service';

import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';
import { BoardContentStore } from '@app/common/store/board-content.store';
import * as moment from 'moment';

@Component({
  selector: 'event-planshop-update',
  templateUrl: './event-planshop-update.html',
  styleUrls: ['./event-planshop-update.css']
})
export class EventPlanShopUpdatePage extends BSUpdateFormController  {

  id ;
  private banner;
  private thumbnail;

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
    config.store.params = {boardid: 'planshop'};

    // config.store.id = 'icon';
    // config.title.update = "";
    config.gotoPrevPageAfterSubmit = true;

    return config;
  }


  preparedFormControlsConfig() {
    let config = {
      boardid: ['planshop'],
      subject: [],
      contents: [''],
      notice: ['0'],
      hidden: ['0'],
      thumbnail_url: [],
      banner_url: [],
      link_url: [],
      mobile_contents: [],
      mobile_thumbnail: [],
      cmt_position: 'none',
      cmt_per_page: 10,
      skin: '',
      hidden_cmt_use: 'unuse'
    };

    return config;
  }



  onThumbnailUpload($event) {
    console.log("fileupload event", $event);
    // let seq:boolean = true;
    this.fileuploader.fileUpload($event).subscribe((resp=>{
      console.log('fileuploader resp=', resp);
      this.thumbnail = resp.url;
      this.bsForm.patchValue({
        thumbnail_url : resp.url
     });
    }));
  }

  onBannerUpload($event) {
    console.log("fileupload event", $event);
    // let seq:boolean = true;
    this.fileuploader.fileUpload($event).subscribe((resp=>{
      console.log('fileuploader resp=', resp);
      this.banner = resp.url;
      this.bsForm.patchValue({
        banner_url : resp.url
     });
    }));
  }


  preparedLoadData(resp) {
      console.log("BSUpdateFormController::preparedLoadData resp =", resp);
      this.data = resp;
      this.thumbnail = resp.thumbnail_url;
      this.banner = resp.banner_url;


      return resp;
  }


    preparedSaveData(value) {
        if(value.m_date > value.d_date) {
            this.alert.show('기획전 기간을 확인해주세요.');
            return false;
        }
 
        if (!value.link_url && !(value.contents && value.mobile_contents)) {
            this.alert.show('연결URL을 입력하거나 PC, 모바일 컨텐츠를 입력해주세요.');
            return false;
        }


        console.log("BSUpdateFormController::preparedLoadData resp =", value);
        
        this.bsForm.patchValue({
            boardid : 'planshop',
            notice : 0,
            hidden: 0,
            contents: '기획전 배너'
        });

        if(!this.id) {

            // if(value.m_date < moment().format()) {
            //   this.alert.show('기획전 기간을 확인해주세요.');
            //   return false;
            // }
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
  //             this.router.navigate(['/main/event/planshop/list'],{ relativeTo:this.activatedRouter });
  //         });
  //   } else {
  //     this.boardContentStore.regist(data).subscribe( resp => {
  //       this.alert.show("등록되었습니다.");
  //       this.router.navigate(['/main/event/planshop/list'],{ relativeTo:this.activatedRouter });
  //     });
  //   }
  // }



}
