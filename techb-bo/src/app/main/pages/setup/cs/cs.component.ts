import { Component, OnInit } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

import { BSBaseStore } from '@app/common/store/bs-base.store';
//import { ConfigStore } from './../../../../common/store/config.store';

@Component({
  selector: 'app-cs',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.css']
})
export class CsComponent extends BSUpdateFormController {

  private isShowTootip: boolean = false;
  //private formCS: FormGroup;
  private resp : any;

  constructor(
    baseStore: BSBaseStore,
    protected router: Router,
    route: ActivatedRoute,
    alert: BSAlertService) {

      super(baseStore, router, route, alert);

  }

  initController(config: any) {
    console.log("BSUpdateFormController::initController command=", config);
    //{{baseUrl}}/common/config/basic

    config.store.command = 'admin/common/config';
    config.store.id = 'cs';
    //config.title.create = '게시판 생성';
    //config.title.update = '게시판 수정';

    return config;
  }


  preparedFormControlsConfig() {
     let config = {
      csPhone:[],
      csFax: [],
      csEmail: [],
      csOperation: [],
     };

     return config;
   }


  preparedLoadData(resp) {
    console.log("BSUpdateFormController::preparedLoadData resp =", resp);

    let data: any = {};
    data.csPhone = resp.csPhone.value;
    data.csOperation = resp.csOperation.value;
    data.csFax = resp.csFax.value;
    data.csEmail = resp.csEmail.value;


    // 받을 때

    console.log("data =", data);

    return data;
  }

  preparedSaveData(value) {
    console.log("BSUpdateFormController::preparedLoadData resp =", value);

    return value;
  }

}
