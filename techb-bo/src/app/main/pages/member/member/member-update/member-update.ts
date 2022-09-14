import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'member-update',
  templateUrl: './member-update.html',
  styleUrls: ['./member-update.css']
})
export class MemberUpdateComponent extends BSUpdateFormController  {

    //id ;
    constructor (
        baseStore: BSBaseStore,
        protected router: Router,
        protected arouter: ActivatedRoute,
        alert: BSAlertService,
        public modal: BsModalService) {
        super(baseStore, router, arouter, alert);
    }

    initController(config: any) {
        console.log("MemberUpdateComponent::initController command=", config);
        config.store.command = 'admin/member/member';
        config.gotoPrevPageAfterSubmit = true;
        return config;
    }

    preparedFormControlsConfig() {
      let config = {
        // icon_name: [],
      };

      return config;
    }


    preparedLoadData(resp) {
        console.log("BSUpdateFormController::preparedLoadData resp =", resp);

        return resp;
    }

    preparedSaveData(value) {
        console.log("BSUpdateFormController::preparedLoadData resp =", value);

        return value;
    }
}
