//import { EventStore } from '@app/common/store/event.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';

@Component({
  selector: 'email-config-update',
  templateUrl: './email-config-update.page.html',
  styleUrls: ['./email-config-update.page.css']
})
export class EmailConfigUpdatePage extends BSUpdateFormController {

    id ;
    private file;
    public data;
    public contents;
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

        config.store.command = 'admin/common/email';
        config.store.id = 'order';
        // config.title.update = "";

        return config;
      }


    preparedFormControlsConfig() {
      let config = {
        email_code: [],
        title: [],
        contents:[],
        admin_email: [],        
        from: [],

        // 수신여부
        admin_yn: [],        
        user_yn: [],
      };

      return config;
    }


    preparedLoadData(resp) {
        console.log("BSUpdateFormController::preparedLoadData resp =", resp);
        this.data = resp;
        this.contents = resp.contents;

        // this.file = resp.adddata;

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
        this.bsForm.patchValue({
          from : this.data.from
        })
        return value;
    }

    onClickChangeTemp(evt) {
      this.id = evt.target.value;
      this.setId(this.id);
      this.loadData();
    }
  }
