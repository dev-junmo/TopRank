/*
  not used

















import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';

import { BSBaseStore } from '@app/common/store/bs-base.store';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BoardContentStore } from '@app/common/store/board-content.store';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Component({
  selector: 'board-goods-qna-update',
  templateUrl: './board-goods-qna-update.html',
  styleUrls: ['./board-goods-qna-update.css']
})
export class BoardGoodsQNAUpdatePage extends BSUpdateFormController  {

  id ;
  private file;
  public data;
  public clientURL = AppConfigService.frontURL;

  constructor (
    baseStore: BSBaseStore,
    private boardContentStore: BoardContentStore,
    protected router: Router,
    protected arouter: ActivatedRoute,
    private fileuploader : BSFileUploader,
    alert: BSAlertService,
    public modal: BsModalService) {

      super(baseStore, router, arouter, alert);

  }

  // ngOnInit() {
  // }

  initController(config: any) {
    console.log("BSUpdateFormController::initController command=", config);
    //{{baseUrl}}/common/config/basic

    config.store.command = 'admin/goods/goodsqna';
    // config.store.params = 'boardid=notice';

    // config.store.id = 'icon';
    // config.title.update = "";
    config.gotoPrevPageAfterSubmit = true;

    return config;
  }


  preparedFormControlsConfig() {
    let config = {
      subject: [],
      contents: [],
      upload: [],

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
        upload : resp.url
     });
    }));
  }


  preparedLoadData(resp) {
      console.log("BSUpdateFormController::preparedLoadData resp =", resp);
      this.data = resp;
      this.file = resp.upload;

    // this.bsForm.patchValue({
    //   pc_url : resp.url,
    //   mobile_url : resp.mobile_url,
    //   banner_name : resp.banner_name,
    //   use_status : resp.use_status
    // })
      return resp;
  }


  preparedSaveData(value) {
      console.log("BSUpdateFormController::preparedLoadData resp =", value);

      return value;
  }

  onSubmit() {
    let data = this.preparedSaveData(this.bsForm.value);
    if (data == false) return;

    this.alert.confirm("저장 하시겠습니까?").subscribe(resp => {
      if(this.isUpdateMode == true) {
          console.log(this.bsForm.value);
            this.boardContentStore.updateQNA(this.id , data).subscribe( resp => {
              this.loadData();
              this.alert.show("수정 되었습니다.");
              this.didSubmited();
              if (this.config.gotoPrevPageAfterSubmit == true) {
                  this._router.navigate(['../..'],{ relativeTo:this.activatedRouter });
              }
            });
      } else {
        this.boardContentStore.createQNA(data).subscribe( resp => {
            this.alert.show("생성 되었습니다.");
            this.clearData();
            this.didSubmited();
            if (this.config.gotoPrevPageAfterSubmit == true) {
                this._router.navigate(['..'],{ relativeTo:this.activatedRouter });
            }
        });
    }
    });
  }

}
*/