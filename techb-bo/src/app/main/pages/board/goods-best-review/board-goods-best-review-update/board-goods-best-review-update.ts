import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';

import { BSBaseStore } from '@app/common/store/bs-base.store';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//import { BoardContentStore } from '@app/common/store/board-content.store';

@Component({
  selector: 'board-goods-best-review-update',
  templateUrl: './board-goods-best-review-update.html',
  styleUrls: ['./board-goods-best-review-update.css']
})
export class BoardGoodsBestReviewUpdatePage extends BSUpdateFormController  {

    id ;
    private data;
    private file;
    isReadonly : boolean = true;
    
    constructor (
        baseStore: BSBaseStore,
        //private boardContentStore: BoardContentStore,
        protected router: Router,
        protected arouter: ActivatedRoute,
        private fileuploader : BSFileUploader,
        alert: BSAlertService,
        public modal: BsModalService) {

        super(baseStore, router, arouter, alert);

    }

    preparedFormControlsConfig() {
        let config = {
          subject: [],
          use_status: [],
          review_seq: [],
          pc_image: [],
          pc_url: [],
          mobile_image: [],
          mobile_url: []

        };

        return config;
    }

    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);
        //{{baseUrl}}/common/config/basic

        config.store.command = 'admin/goods/review/best';
        // config.store.params = 'boardid=notice';

        // config.store.id = 'icon';
        // config.title.update = "";
        config.gotoPrevPageAfterSubmit = true;

        return config;
    }

  

  
  preparedLoadData(resp) {
    console.log("BSUpdateFormController::preparedLoadData resp =", resp);

    return resp;
}



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


  


  preparedSaveData(value) {
      console.log("BSUpdateFormController::preparedLoadData resp =", value);

      return value;
  }

}
