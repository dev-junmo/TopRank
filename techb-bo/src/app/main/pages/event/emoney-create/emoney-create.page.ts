import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSBaseStore } from '@app/common/store/bs-base.store';

@Component({
  selector: 'emoney-create',
  templateUrl: './emoney-create.page.html',
  styleUrls: ['./emoney-create.page.css']
})

export class EmoneyCreatePage extends BSUpdateFormController {
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
 config.store.id = '';
 config.title.create = '게시판 생성';
 config.title.update = '게시판 수정';

 return config;
}

/////////////////////////////////////////////////////////
//
preparedFormControlsConfig() {
 let config = {
  emoney_use_limit: [],
  emoney_price_limit : [],
  min_emoney : [],
  max_emoney_policy :[],
  max_emoney_percent :[],
  max_emoney :[],
  default_reserve_percent :[],
  reserve_select :[],
  reserve_year : [],
  reserve_direct : []
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
