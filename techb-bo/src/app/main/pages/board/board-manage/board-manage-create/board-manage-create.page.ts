import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSBaseStore } from '@app/common/store/bs-base.store';
//import { BoardStore } from '@app/common/store/board.store';

@Component({
  selector: 'board-manage-create',
  templateUrl: './board-manage-create.page.html',
  styleUrls: ['./board-manage-create.page.css']
})
export class BoardManageCreatePage extends BSUpdateFormController {

  public skinType = "default"; // 기본값
  isShowTootip;

  constructor(
    baseStore: BSBaseStore,
    protected router: Router,
    route: ActivatedRoute,
    alert: BSAlertService) {

      super(baseStore, router, route, alert);

  }

 ///////////////////////////////////////////////////////
 // overide
 // 별도의 스토어를 안만들어도 되는 경우
 // 1. 그냥 basestore를 넣어준다. 그런데 basestore에서 command를 정의할 수 없으니
 // 2. initController를 override해서 command를 꼭 정의해주어야 한다.
  // initController(command: string) {

 // command = 'common/config';
 // console.log("BasicComponent::initController command=", command);
 // return command;

 // let config: any = {
 //     store: {
 //         command: '',
 //         id:''
 //     }
 // };

 initController(config: any) {
   console.log("BSUpdateFormController::initController command=", config);
   //{{baseUrl}}/common/config/basic

   config.store.command = 'admin/board/boardmanager';
   config.title.create = '게시판 생성';
   config.title.update = '게시판 수정';

   return config;
 }

 /////////////////////////////////////////////////////////
 //
 preparedFormControlsConfig() {
   let config = {
    id: [],
    name: [],
    skin_type: [],
    auth_read: [],
    auth_write: [],
    auth_reply: [],
    auth_cmt: [],
    auth_read_use: [],
    auth_write_use: [],
    auth_reply_use: [],
    recontents_use: [],     // 답변기능으로 새로 추가
    auth_cmt_use: [],       
    autowrite_use: [],
    secret_use: [],
    writer_date: [],
    write_admin_type: [],
    write_admin: [],
    recommend_type: [],
    cmt_recommend_type: [],
    pagenum: [],
    gallery_list_w: [],
    gallery_list_h: [],
    icon_new_day: [],
    icon_hot_visit: [],
    video_use: [],
    video_type: [],
    write_show: [],
    list_show: [],
    show_name_type: [],
    show_grade_type: [],
   };

   return config;
 }

 //////////////////////////////////////////
 // overide

 preparedLoadData(resp) {
     console.log("BSUpdateFormController::preparedLoadData resp =", resp);

     let data: any = resp;

     //data.domain = resp.domain.value;
     //...
     // 받을 때

     console.log("data =", data);

     return data;
 }

  //////////////////////////////////////////
  // overide

  preparedSaveData(value) {
    console.log("BSUpdateFormController::preparedLoadData resp =", value);

    return value;
  }


}

///////////////////////////////////////////////////////////////////////////////
// import { ActivatedRoute } from '@angular/router';
// import { BoardStore } from '@app/common/store/board.store';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

// @Component({
//   selector: 'app-board-create',
//   templateUrl: './board-create.component.html',
//   styleUrls: ['./board-create.component.css']
// })
// export class BoardManageCreatePage implements OnInit {

//   private id: number;
//   private sub: any;
//   private editMode: boolean = false;
//   private title: string = '게시판 생성';
//   formBoard: FormGroup;

//   private skinType = "default"; // 기본값

//   private isShowTootip: boolean = false;

//   constructor(private fb: FormBuilder, private boardStore : BoardStore,
//               private activateRouter: ActivatedRoute) {

//     this.formBoard = fb.group({
//       id: [],
//       name: [],
//       skin_type: [],
//       auth_read: [],
//       auth_write: [],
//       auth_reply: [],
//       auth_cmt: [],
//       auth_read_use: [],
//       auth_write_use: [],
//       auth_reply_use: [],
//       auth_cmt_use: [],
//       autowrite_use: [],
//       secret_use: [],
//       writer_date: [],
//       write_admin_type: [],
//       write_admin: [],
//       recommend_type: [],
//       cmt_recommend_type: [],
//       pagenum: [],
//       gallery_list_w: [],
//       gallery_list_h: [],
//       icon_new_day: [],
//       icon_hot_visit: [],
//       video_use: [],
//       video_type: [],
//       write_show: [],
//       list_show: [],
//       show_name_type: [],
//       show_grade_type: [],
//     });
//   }

//   ngOnInit() {

//     this.sub = this.activateRouter.params.subscribe(params => {
//       this.id = +params['id'];
//     });

//     if(this.id)
//     {
//       this.editMode = true;
//       this.title = '게시판 수정';

//       this.boardStore.getBoard(this.id).subscribe( resp => {

//         console.log("resp =", resp);

//         this.formBoard.patchValue(resp);
//       });
//     }
//   }

//   onSubmit() {
//     // this.submitted = true;
//     console.log(this.formBoard.value);
//     if(this.editMode == true){
//       this.boardStore.update(this.id, this.formBoard.value).subscribe(resp => {
//         alert("보드수정");
//       })
//     }
//     else{
//       this.boardStore.create(this.formBoard.value).subscribe( resp => {
//         alert("보드생성!");
//       })
//     }
//   }
// }
