import { Subject } from 'rxjs/Rx';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { ConfigStore } from '@app/common/store/config.store';

import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { ConfigStore } from '@app/common/store/config.store';
import { AutoSearchStore } from '@app/common/store/search-word.store';

@Component({
  selector: 'app-auto-search',
  templateUrl: './auto-search.component.html',
  styleUrls: ['./auto-search.component.css']
})
export class AutoSearchComponent extends BSUpdateFormController {

  constructor(
    public baseStore: AutoSearchStore,
    public configStore: ConfigStore,
    protected router: Router,
    route: ActivatedRoute,
    alert: BSAlertService) {

      super(baseStore, router, route, alert);

  }

  initController(config: any) {
    console.log("BSUpdateFormController::initController command=", config);

    config.store.command = 'etc/searchword';
    config.store.id = 'auto';
    // config.store.params = {};

    // config.store.command = 'etc';
    // config.store.id = 'searchword';
    // config.store.params = { page:'popular'};

    return config;
  }

  preparedFormControlsConfig() {
    let config = {
      auto_search: []
    };

    return config;
  }

  preparedLoadData(resp) {
      console.log("BSUpdateFormController::preparedLoadData resp =", resp);

      let data: any = {};

      data.auto_search = resp.auto_search.value;

      console.log("data00000=",data);

      return data;

  }

  preparedSaveData(value) {
    console.log("BSUpdateFormController::preparedLoadData resp =", value);


    return value;
  }



}
