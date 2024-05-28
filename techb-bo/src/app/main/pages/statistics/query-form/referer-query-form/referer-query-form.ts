import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

import { BrandStore } from '@app/common/store/brand.store';
import { CategoryStore } from '@app/common/store/category.store';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Component({
  selector: 'referer-query-form',
  templateUrl: './referer-query-form.html',
  styleUrls: ['./referer-query-form.css'],
})
export class RefererQueryForm extends BOBaseQueryFormController {

    constructor(public categoryStore: CategoryStore,
        public brandStore: BrandStore,
        public appConfig: AppConfigService) {
        super();

        this.categoryStore.get().subscribe(resp => {
            this.category[0] = resp.list;
        });
        this.brandStore.goodsBrand().subscribe(resp => {
            this.brand[0] = resp.list;
        });
    }

    public category:any = [[]];
    public brand:any = [[]];
    public selectCategory:any;
    public selectBrand:any;

    public initialIndexOfPeriod = 1;

    preparedFormControlsConfig() {

        let config = {
            search_type:'view_cnt',
            keyword:'',
            goods_name: '',
            provider_seq: '',
            category_link: '',
            brand_link: '',
            'order[column]': '',
            'period': '',
        };

        return config;
    }

    willSubmit(query) {
        console.log(query);
        // if(query.adult_goods == true) {
        //     this.bsForm.get('adult_goods').setValue('Y');
        // } else if(query.adult_goods == false) {
        //     this.bsForm.get('adult_goods').setValue('N');
        // }
        // if(this.selectPrice == 'consumer_price') {
        //     query['price[max]'] = '';
        //     query['price[min]'] = '';
        // } else {
        //     query['consumer_price[max]'] = '';
        //     query['consumer_price[min]'] = '';
        // }
        return query;
    }




    //카테고리 셀렉트 선택시
    onClickCategory(index,value) {
        console.log(index,value);
        let _select = value;
        // this.selectCategory = value;

        if(index == 0) {
            this.selectCategory = [];
            this.selectCategory[index] = value;
        } else if (index == 1) {
            this.selectCategory.splice(2);
            this.selectCategory.splice(3);
            this.category.splice(3);
            this.selectCategory[index] = value;
        } else {
            this.selectCategory[index] = value;
        }

        if(!value) {
            _select = this.selectCategory[index - 1];
        }

        console.log(this.selectCategory);
        this.bsForm.get('category_link').setValue(_select);
        console.log(this.bsForm.value.category_link);

        this.loadCategotyList(parseInt(index) + 1, value);
    }

    loadCategotyList(index,value){
        this.categoryStore.getChildren(value).subscribe(resp => {
            this.category[index] = resp.list;
            console.log(this.category);
        });
    }

    //브랜드셀렉트 선택시
    onClickBrand(index,value) {
        console.log(index,value);
        let _select = value;
        // this.selectBrand = value;

        if(index == 0) {
            this.selectBrand = [];
            this.brand.splice(2);
            this.brand.splice(3);
            this.selectBrand[index] = value;
        } else if (index == 1) {
            this.selectBrand.splice(2);
            this.selectBrand.splice(3);
            this.brand.splice(3);
            this.selectBrand[index] = value;
        } else {
            this.selectBrand[index] = value;
        }


        if(!value) {
            _select = this.selectBrand[index - 1];
        }

        console.log(this.selectBrand);
        this.bsForm.get('brand_link').setValue(_select);
        console.log(this.bsForm.value.brand_link);

        this.loadBrandList(parseInt(index) + 1,value);
    }

    loadBrandList(index,value){
        this.brandStore.getChildren(value).subscribe(resp => {
            this.brand[index] = resp.list;
            console.log(this.brand);
            console.log(this.selectBrand);
        });
    }


}


//////////////////////////////////////////////////////////
