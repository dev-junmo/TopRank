import { EventStore } from '@app/common/store/event.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';

@Component({
  selector: 'planshop-config-update',
  templateUrl: './planshop-config-update.page.html',
  styleUrls: ['./planshop-config-update.page.css']
})
export class PlanShopConfigUpdatePage extends BSUpdateFormController {

    id ;
    private file;
    private data;
    constructor (
      baseStore: BSBaseStore,
      protected router: Router,
      protected arouter: ActivatedRoute,
      alert: BSAlertService,
    ) {
        super(baseStore, router, arouter, alert);
    }

    // ngOnInit() {
    // }
    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);
        //{{baseUrl}}/common/config/basic

        config.store.command = 'admin/common/config/navigator';
        config.store.id = 'planshop';
        // config.title.update = "";

        return config;
      }


    preparedFormControlsConfig() {
      let config = {
        value: []

      };

      return config;
    }


    // preparedLoadData(resp) {
    //     console.log("BSUpdateFormController::preparedLoadData resp =", resp);
    //     this.data = resp;
    //     this.file = resp.adddata;

    //   // this.bsForm.patchValue({
    //   //   pc_url : resp.url,
    //   //   mobile_url : resp.mobile_url,
    //   //   banner_name : resp.banner_name,
    //   //   use_status : resp.use_status
    //   // })
    //     return resp;
    // }

    preparedSaveData(value) {
        console.log("BSUpdateFormController::preparedLoadData resp =", value);

        return value;
    }

  }
