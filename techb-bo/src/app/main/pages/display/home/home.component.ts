import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
//import { BSModalService } from '@bricks/ui/bs-modal/index';

import { BSBaseStore } from '@app/common/store/bs-base.store';

//import { ConfigStore } from '@app/common/store/config.store';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-basic',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends BSUpdateFormController {

  // private isShowTootip: boolean = false;

  constructor (
    baseStore: BSBaseStore,
    protected router: Router,
    arouter: ActivatedRoute,
    alert: BSAlertService,
    public modal: BsModalService) {

      super(baseStore, router, arouter, alert);
  }

  initController(config: any) {
    console.log("BSUpdateFormController::initController command=", config);
    //{{baseUrl}}/common/config/basic

    config.store.command = 'admin/display/display-home';
    config.store.id = '1';
    //config.title.update = "";
    return config;
  }

  /////////////////////////////////////////////////////////
  //
  preparedFormControlsConfig() {
    let config = {
      home_footer_banner_pc: '',
      home_footer_banner_mobile: '',
      keyword_search: ''
    };
    return config;
  }

  //////////////////////////////////////////
  // overide

  preparedLoadData(resp) {
      console.log("BSUpdateFormController::preparedLoadData resp =", resp);

      return resp;
  }

   //////////////////////////////////////////
  // overide

  preparedSaveData(value) {
      console.log("BSUpdateFormController::preparedLoadData resp =", value);

      return value;
  }

}
