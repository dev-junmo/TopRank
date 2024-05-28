// import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
// import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

// import { Router } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';
// import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
// import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';
// import { BOAuthService } from '../../../../../providers/service/bo-auth.service';

// import { BSBaseStore } from '@app/common/store/bs-base.store';

// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// import { BoardContentStore } from '@app/common/store/board-content.store';

// @Component({
//   selector: 'provider-notice-update',
//   templateUrl: './provider-notice-update.html',
//   styleUrls: ['./provider-notice-update.css']
// })
// export class ProviderNoticeUpdatePage extends BSUpdateFormController  {

//   id ;
//   private file;
//   constructor (
//     baseStore: BSBaseStore,
//     private boardContentStore: BoardContentStore,
//     protected router: Router,
//     protected arouter: ActivatedRoute,
//     private fileuploader : BSFileUploader,
//     private auth : BOAuthService,
//     alert: BSAlertService,
//     public modal: BsModalService) {

//       super(baseStore, router, arouter, alert);

//   }

//   // ngOnInit() {
//   // }

//   initController(config: any) {
//     console.log("BSUpdateFormController::initController command=", config);
//     //{{baseUrl}}/common/config/basic

//     config.store.command = 'admin/board/boarddata';
//     // config.store.params = 'boardid=notice';

//     // config.store.id = 'icon';
//     // config.title.update = "";
//     config.gotoPrevPageAfterSubmit = true;

//     return config;
//   }


//   preparedFormControlsConfig() {
//     let config = {
//       boardid: ['gs_seller_notice'],
//       subject: [],
//       category: [],
//       onlynotice: ['0'],
//       hidden: [],
//       contents: [],
//       upload: [],

//     };

//     return config;
//   }



//   onFileUpload($event) {
//     console.log("fileupload event", $event);
//     // let seq:boolean = true;
//     this.fileuploader.fileUpload($event).subscribe((resp => {
//       console.log('fileuploader resp=', resp);
//       this.file = resp.url;
//       this.bsForm.patchValue({
//         upload : resp.url
//      });
//     }));
//   }


//   preparedLoadData(resp) {
//       console.log("BSUpdateFormController::preparedLoadData resp =", resp);
//       this.file = resp.upload;

//     // this.bsForm.patchValue({
//     //   pc_url : resp.url,
//     //   mobile_url : resp.mobile_url,
//     //   banner_name : resp.banner_name,
//     //   use_status : resp.use_status
//     // })
//       return resp;
//   }


//   preparedSaveData(value) {
//       console.log("BSUpdateFormController::preparedLoadData resp =", value);
//       value.name = this.auth.managerName;
//       return value;
//   }

// }
