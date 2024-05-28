import { Subject } from 'rxjs/Rx';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { BSBaseStore } from '@app/common/store/bs-base.store';
import { ConfigStore } from '@app/common/store/config.store';
import { PopularStore } from '@app/common/store/search-word.store';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopularComponent extends BSUpdateFormController {

    options = ['2', '15', '30', '60', '90']; // 등록유형 필드확인 필요

    private pop;
    public disable;

    constructor(
        public configStore: ConfigStore,
        public baseStore: PopularStore,
        protected router: Router,
        route: ActivatedRoute,
        alert: BSAlertService) {

        super(baseStore, router, route, alert);

    }

    initController(config: any) {
        console.log("initController config =>", config);

        //breezestudio.gq/admin/etc/searchword/popular

        config.store.command = 'admin/etc/searchword';
        config.store.id = 'popular';
        // config.store.params = { page: 'popular' };

        //1.common/config/search
        //2.searchword?page=popular

        return config;
    }

    // 보내는 값
    // search_word : [ {word: '', search_result_link:''},
    // {word: '', search_result_link:''},
    // {word: '', search_result_link:''},
    // {word: '', search_result_link:''},]

    // 받은 값
    //
    // "list": [
    //   {
    //       "word_seq": 371,
    //       "page_yn": "n",
    //       "page": "recommend",
    //       "word": "박근철",         <-------------!!
    //       "search_result": "direct",
    //       "search_result_target": "_self",
    //       "search_result_link": "www.breezestudio.co.kr", <-----------!!
    //       "regist_date": "2018-05-28T09:34:32.000Z"
    //   },

    preparedFormControlsConfig() {

        let config = {
        popular_search: [],
        popular_search_limit_day: [],
        search_word: this.fb.array([
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' }),
            this.fb.group({ keyword: '', search_result_link: '' })])
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
        console.log("searchWordsFormArray", this.searchWordsFormArray.controls)

        let data: any = {};
        data.search_word = resp.list;
        data.popular_search = resp.popular_search;
        data.popular_search_limit_day = resp.popular_search_limit_day;

        if(resp.popular_search == 'y') {
        this.disable = false;
        } else {
        this.disable = true;
        }

        console.log("BSUpdateFormController::preparedLoadData resp =", data);

        console.assert(data.popular_search);
        return data;

        //return resp;
    }

    preparedSaveData(value) {
        console.log("preparedLoadData resp =", value);


        return value;
    }

    //////////////////////////////////////////
    // overide : submit한 후처리에 필요

    public didSubmited() {
        /*아현 여기 작성해주세요.*/
        //this.configStore.updateSearchWord();
    }

    onClickRadio() {
        if(this.bsForm.value.popular_search == 'y') {
            this.disable = false;
        } else {
            this.disable = true;
        }
        console.log(this.disable)
    }





}
