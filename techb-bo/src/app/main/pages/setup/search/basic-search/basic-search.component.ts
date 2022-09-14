import { Subject } from 'rxjs/Rx';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { ConfigStore } from '@app/common/store/config.store';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BasicSearchStore } from '@app/common/store/search-word.store';

//import { templateUrlForDeviceType } from '@app/common/core/device';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class BasicSearchComponent extends BSUpdateFormController {
  targets:['_selft','_blank']

  constructor(
    baseStore: BasicSearchStore,
    protected router: Router,
    route: ActivatedRoute,
    alert: BSAlertService) {

      super(baseStore, router, route, alert);

  }

  initController(config: any) {
    console.log("BSUpdateFormController::initController command=", config);

    // config.store.command = '/etc/searchword?page=basic';

    config.store.command = 'etc/searchword';
    config.store.id = 'main';
    // config.store.params = { page:'basic'};

    return config;
  }

  preparedFormControlsConfig() {
    let config = {
      search_word: this.fb.array([
        this.fb.group({ word: '', search_result_link: '', page_yn:'', page:'', search_result:'', search_result_target:'' }),
        this.fb.group({ word: '', search_result_link: '', page_yn:'', page:'', search_result:'', search_result_target:'' })
      ])
    };

    return config;
  }

  get searchWordsFormArray(): FormArray {
    return this.bsForm.get('search_word') as FormArray;
  }

  searchWordsFromGroup(idx: string) {
    let formArray = this.bsForm.get('search_word');
    let name: string = idx.toString();
    return formArray.get(name);
  }

  preparedLoadData(resp) {
      console.log("BSUpdateFormController::preparedLoadData resp =", resp);

      let data: any = {};
      data.search_word = resp.list;


      return data;
  }

  preparedSaveData(value) {
    console.log("BSUpdateFormController::preparedLoadData resp =", value);

    this.baseStore.command = 'etc/searchword';
    this.id = '';

    return value;
  }

  onClickAddBtn(){
    let fg = this.fb.group({ word: '', search_result_link: '', page_yn:'', page:'', search_result:'', search_result_target:'' });
    this.searchWordsFormArray.push(fg);
  }

  onClickRemoveBtn(idx){
    this.searchWordsFormArray.removeAt(idx);
  }




}
