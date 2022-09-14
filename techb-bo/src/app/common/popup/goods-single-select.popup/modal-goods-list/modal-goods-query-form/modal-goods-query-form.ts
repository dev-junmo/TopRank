import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import { CategoryStore } from '@app/common/store/category.store';
import { BrandStore } from '@app/common/store/brand.store';
import { ProgramStore } from '@app/common/store/program.store';

// import { AppConfigService } from '@app/providers/service/app-config.service';
// import { GoodsIconStore } from '@app/common/store/goods-icon.store';


@Component({
  selector: 'modal-goods-query-form',
  templateUrl: './modal-goods-query-form.html',
  styleUrls: ['./modal-goods-query-form.css'],
})
export class ModalGoodsQueryForm extends BOBaseQueryFormController {

    public category:any = [[]];
    public brand:any = [[]];
    public program:any = [[]];

    private selectCategory:any;
    private selectBrand:any;
    private selectProgram:any;

    preparedFormControlsConfig() {

        let config = {
            keyword: [],
            provider_seq: [],
            'provider_status[0]': '',
            'provider_status[1]': '',
            goods_category: [],
            goods_location_no: [],
            'goods_status[0]': '',
            'goods_status[1]': '',
            'goods_status[2]': '',
            'goods_status[3]': '',
            'goods_view[0]' : 'look',
            'goods_view[1]' : '',
            category: [],
            category_link :[],
            brand_link :[],
            program_link :[],
            brand: [],
            goods_brand: [],
            goods_brand_no: [],
            'consumer_price[min]' : [],
            'consumer_price[max]': [],
            'price[min]' : [],
            'price[max]': [],
            'page_view[min]': [],
            'page_view[max]': [],
            tot_stock: [],
            'tot_stock[min]': [],
            'tot_stock[max]': [],
            sale_seq: [],
            event_seq: [],
            gift_seq: [],
            goods_addinfo: [],
            goods_addinfo_title: [],
            commission_type: [],
            'commission_rate[min]': [],
            'commission_rate[max]': [],
            string_price_use: [],
            member_string_price_use: [],
            allmember_string_price_use: [],
            'favorite_chk[0]': '',
            'favorite_chk[1]': '',
            auction_yn:[],
            'tax[0]': [],
            'tax[1]': [],
            'reserve_policy[0]': '',
            'reserve_policy[1]': '',
            'cancel_type[0]': '',
            'cancel_type[1]': '',
            adult_goods: 'N',
            'shipping_policy[0]': '',
            'shipping_policy[1]': '',
            option_international_shipping_status: [],
            'feed_status[0]': '',
            'feed_status[1]': '',
            'openmarket[0]': '',
            'openmarket[1]': '',
            'openmarket[2]': '',
            'openmarket[3]': '',
            'openmarket[4]': '',
            'openmarket[5]': '',

            'restock_notify_use[0]': '',
            'restock_notify_use[1]': '',
            goods_story: [],
            board : [''],

            'period': '',

            search_text: []
        };
        return config;
    }

    constructor(
        public categoryStore: CategoryStore,
        // public appConfig: AppConfigService,
        public brandStore: BrandStore,
        public programStore: ProgramStore,
        // public goodsIconStore: GoodsIconStore
        ) {
        super();

        setTimeout(() => {
            this.categoryStore.get().subscribe(resp => {
                this.category[0] = resp.list;
            });
            this.brandStore.goodsBrand().subscribe(resp => {
                this.brand[0] = resp.list;
            });
            this.programStore.goodsProgram().subscribe(resp => {
                this.program[0] = resp.list;
            });
        }, 1000);
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

    //프로그램 셀렉트 선택시
    onClickProgram(index,value) {
        console.log(index,value);
        let _select = value;
        // this.selectProgram = value;

        if(index == 0) {
            this.selectProgram = [];
            this.program.splice(2);
            this.program.splice(3);
            this.selectProgram[index] = value;
        } else if (index == 1) {
            this.selectProgram.splice(2);
            this.selectProgram.splice(3);
            this.program.splice(3);
            this.selectProgram[index] = value;
        } else {
            this.selectProgram[index] = value;
        }


        if(!value) {
            _select = this.selectProgram[index - 1];
        }


        console.log(this.selectProgram);
        this.bsForm.get('program_link').setValue(_select);
        console.log(this.bsForm.value.program_link);

        this.loadProgramList(parseInt(index) + 1,value);
        }

    loadProgramList(index,value){
        this.programStore.getChildren(value).subscribe(resp => {
            this.program[index] = resp.list;
            console.log(this.program);
            console.log(this.selectProgram);
        });
    }

    
    //카테고리 셀렉트 선택시
    onClickCategory(index,value) {
        console.log(index,value);
        let _select = value;

    //   if(!value) {
    //     index = index - 1;
    //     console.log('index값', index);
    //   }
    //   console.log('value값' ,value , this.category);
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

        // public brand:any = [[]];
        // private selectBrand:any;
        // //브랜드셀렉트 선택시
        // onClickBrand(index,value) {
        //     console.log(index,value);
        //     let _select = value;
        //     // this.selectBrand = value;

        //     if(index == 0) {
        //         this.selectBrand = [];
        //         this.brand.splice(2);
        //         this.brand.splice(3);
        //         this.selectBrand[index] = value;
        //     } else if (index == 1) {
        //         this.selectBrand.splice(2);
        //         this.selectBrand.splice(3);
        //         this.brand.splice(3);
        //         this.selectBrand[index] = value;
        //     } else {
        //         this.selectBrand[index] = value;
        //     }


        //     if(!value) {
        //         _select = this.selectBrand[index - 1];
        //     }

        //     console.log(this.selectBrand);
        //     this.bsForm.get('brand_link').setValue(_select);
        //     console.log(this.bsForm.value.brand_link);

        //     this.loadBrandList(parseInt(index) + 1,value);
        // }

        // loadBrandList(index,value){
        //     this.brandStore.getChildren(value).subscribe(resp => {
        //         this.brand[index] = resp.list;
        //         console.log(this.brand);
        //         console.log(this.selectBrand);
        //     });
        // }


        // public program:any = [[]];
        // private selectProgram:any;
        // //프로그램 셀렉트 선택시
        // onClickProgram(index,value) {
        //     console.log(index,value);
        //     let _select = value;
        //     // this.selectProgram = value;

        //     if(index == 0) {
        //         this.selectProgram = [];
        //         this.program.splice(2);
        //         this.program.splice(3);
        //         this.selectProgram[index] = value;
        //     } else if (index == 1) {
        //         this.selectProgram.splice(2);
        //         this.selectProgram.splice(3);
        //         this.program.splice(3);
        //         this.selectProgram[index] = value;
        //     } else {
        //         this.selectProgram[index] = value;
        //     }


        //     if(!value) {
        //         _select = this.selectProgram[index - 1];
        //     }


        //     console.log(this.selectProgram);
        //     this.bsForm.get('program_link').setValue(_select);
        //     console.log(this.bsForm.value.program_link);

        //     this.loadProgramList(parseInt(index) + 1,value);
        //     }

        // loadProgramList(index,value){
        //     this.programStore.getChildren(value).subscribe(resp => {
        //         this.program[index] = resp.list;
        //         console.log(this.program);
        //         console.log(this.selectProgram);
        //     });
        // }

}

//////////////////////////////////////////////////////////
