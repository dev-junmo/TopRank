import { Subject } from 'rxjs/Rx';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder ,FormArray } from '@angular/forms';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { ConfigStore } from '@app/common/store/config.store';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { RecommendStore } from '@app/common/store/search-word.store';


@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecommendComponent extends BSUpdateFormController {

  constructor(
    public configStore: ConfigStore,
    public baseStore : RecommendStore,
    protected router: Router,
    route: ActivatedRoute,
    alert: BSAlertService) {

      super(baseStore, router, route, alert);

  }

  private disable:boolean;

  initController(config: any) {
    console.log("BSUpdateFormController::initController command=", config);

    config.store.command = 'admin/etc/searchword';
    config.store.id = 'recommend';
    // config.store.params = { page:'recommend'};

    return config;
  }

  preparedFormControlsConfig() {
    let config = {
      recommend_search: [],
      search_word: this.fb.array([
        this.fb.group({ keyword: '', search_result_link: '' }),
        this.fb.group({ keyword: '', search_result_link: '' }),
        // this.fb.group({ keyword: '', search_result_link: '' }),
        // this.fb.group({ keyword: '', search_result_link: '' }),
        // this.fb.group({ keyword: '', search_result_link: '' }),
        // this.fb.group({ keyword: '', search_result_link: '' }),
        // this.fb.group({ keyword: '', search_result_link: '' }),
        // this.fb.group({ keyword: '', search_result_link: '' }),
        // this.fb.group({ keyword: '', search_result_link: '' }),
        this.fb.group({ keyword: '', search_result_link: '' })])
    };

    console.assert(config.recommend_search);
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
      data.recommend_search = resp.recommend_search;


      if(data.recommend_search == 'y') {
        this.disable = true;
      } else {
        this.disable = false;
      }

      // this.configStore.command = 'common/config';

      // this.configStore.reloadSearch().subscribe(resp=>{
      //     data.recommend_search = resp.recommend_search.value;
      //     this.bsForm.patchValue(data);
      // });


      return data;

  }

  preparedSaveData(value) {
      console.log("BSUpdateFormController::preparedLoadData resp =", value);
      // if(value.recommend_search == ""){
      //   value.recommend_search = "n"
      // }

      // this.baseStore.command = 'etc/searchword';
      // this.id = '';
      // this.extLoadParams = { page: 'popular' };

      return value;
  }

  onChangeRecommedSearch() {
    if(this.bsForm.value.recommend_search == 'y') {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }




}
