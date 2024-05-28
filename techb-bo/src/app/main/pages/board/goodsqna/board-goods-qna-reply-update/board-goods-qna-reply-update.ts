// import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
// import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

// import { Router } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';
// import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
// import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';

// import { BSBaseStore } from '@app/common/store/bs-base.store';

// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// import { BoardContentStore } from '@app/common/store/board-content.store';
// import { AppConfigService } from '@app/providers/service/app-config.service';

// @Component({
//   selector: 'board-goods-qna-reply-update',
//   templateUrl: './board-goods-qna-reply-update.html',
//   styleUrls: ['./board-goods-qna-reply-update.css']
// })
// export class BoardGooodsQNAReplyUpdatePage extends BSUpdateFormController  {

//   id ;
//   public data;
//   private file;
//   private str : string;
//   constructor (
//     baseStore: BSBaseStore,
//     private boardContentStore: BoardContentStore,
//     protected router: Router,
//     protected arouter: ActivatedRoute,
//     public appConfig: AppConfigService,
//     private fileuploader : BSFileUploader,
//     alert: BSAlertService,
//     public modal: BsModalService) {

//       super(baseStore, router, arouter, alert);

//   }

//   // ngOnInit() {
//   // }

//   initController(config: any) {
//     console.log("BSUpdateFormController::initController command=", config);
//     //{{baseUrl}}/common/config/basic

//     config.store.command = 'admin/goods/goodsqna';
//     config.gotoPrevPageAfterSubmit = true;

//     return config;
//   }


//   preparedFormControlsConfig() {
//     let config = {
//       seq: [],
//       boardid: ['goodsqna'],
//       contents: [],
//       re_subject: [],
//       re_contents: [],
//       hidden: [],
//       reply: ['y']
//       // upload: [],

//     };

//     return config;
//   }





//   preparedLoadData(resp) {
//       console.log("BSUpdateFormController::preparedLoadData resp =", resp);
//       this.data = resp;
//       // if(resp.re_date) {
//       //   this.isUpdateMode = true;
//       // } else {
//       //   this.isUpdateMode = false;
//       // }
//       return resp;
//   }


//   preparedSaveData(value) {
//       console.log("BSUpdateFormController::preparedLoadData resp =", value);
//       this.bsForm.patchValue({
//         seq : value.seq,
//         // boardid: value.boardid,
//         hidden: value.hidden,
//         contents : value.contents,
//         upload: value.upload

//       });
//       return value;
//   }

//   onSubmit() {
//     let data = this.preparedSaveData(this.bsForm.value);
//     if (data == false) return;

//     if(!this.bsForm.value.re_contents && !this.bsForm.value.re_subject) {
//       this.alert.show('답변을 입력하세요.');
//       return;
//     }

//     this.alert.confirm("답변을 등록하시겠습니까?").subscribe(resp => {
//         if(this.isUpdateMode == true) {
//             console.log(this.bsForm.value);
//             this.boardContentStore.updateQNA(this.id , data).subscribe( resp => {
//                 this.alert.show("답변이 등록 되었습니다.");
//                 window.history.back();
//                 //this.appConfig.naviagteSafeProvider('/main/board/goods_qna');
//                 //this.router.navigate(['/main/board/goods_qna'],{ relativeTo:this.activatedRouter });
//             });
//         }
//     });
//   }


//   // didSubmited() {
//   //   this.config.gotoPrevPageAfterSubmit = false;
//   //   this._router.navigate(['../..'],{ relativeTo:this.activatedRouter });
//   // }



// }
