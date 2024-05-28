import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder } from '@angular/forms';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../../environments/environment';

import { BSDatatableController } from '../../../../../../../../../common/framework/bs-datatable.controller';
import { ProductStore } from '../../../../../../../../store/product.store';
import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert';
import * as moment from 'moment';

@Component({
    selector: 'products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.css']
})
export class ProductsPageComponent extends BSDatatableController {

    public rankPopupType: string;

    public isShowPopup: boolean = false;
    public isQueryFormRequest: boolean = undefined;

    //mobile 
    public isShowSearchFilter: boolean = false;
    public isShowRankingPopup: boolean = false;
    public goodsSelectData = [];
    
    public platformData = {
        '네이버': {
            url: 'https://search.naver.com/search.naver?ie=UTF-8&query=',
        },
        '네이버쇼핑': {
            url: 'https://search.naver.com/search.naver?ie=UTF-8&query=',
        },
        '쿠팡': {
            url: 'https://search.naver.com/search.naver?ie=UTF-8&query=',
        },
    };

    bsForm = this.formBuilder.group({
        keyword: '',
        enabled: '',
        auto_extension: '',
        goods_seq: ''       
    });

    
    // getFormValue(controlName) {
    //     if (!this.bsForm) { return; }
    //     return this
    // }



    constructor(
        private router :Router,
        public productStore: ProductStore,
        private appService: AppService,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        public activateRouter: ActivatedRoute,
        public alert: BSAlertService,
        ) 
    {
        super(productStore, router, activateRouter, alert);   
        this.initMobileList();
    }

    initMobileList() {
        if (!this.appService.isMobile()) {
            return;
        }

        let params = {
            limit: 5,
            offset: 0,
            sortAsc: false,
            sortBy: "product_seq"
        };
        this.usePageLocationParams = false;
        //this.initDatatableParams(params);
        this.reloadItems(params);

        this.productStore.getGoodsList().subscribe(resp => {
            this.goodsSelectData = resp.list;
            console.log('productStore getGoodsList resp', this.goodsSelectData);
        });
    }

    initController(config) {
        // store: {
        //     command: this.datatableStore.command,
        // },
        // title: '',
        // usePageLocationParams: true,    // popup창의 경우 이 옵션을 false로 해주어야 파라미터를 안보낸다.
        // initialLoad: true,              // 처음에 데이타를 한번 로드함
        // queryForm: null,                // 연결할 쿼리폼
        // displayNoticeListAtTop: true,
        // useMovePosition: false,
        // keyName: 'seq'
        config.usePageLocationParams = false;
        config.displayNoticeListAtTop = false;
        return config;
    }

    // private _isUsingProduct() {
        // if(!this.data.list || !this.data.list.length ) {
    //         this.isUsingProduct == !this.isUsingProduct;
    //     }
    // }

    preparedLoadData(items) {
        // 잔여일, 7일 -> 7
        for(let item of items) {
            item.product_period = parseInt(item.product_period);
            item.remainingDays = this.getRemainingDays(item);
            item.productMidText = `${item.product_mid.substr(0,5)}\n${item.product_mid.substr(5,6)}`;
        }

        //product_mid
        console.log('preparedLoadData items =>', items);
        return items;
    }

    getFormValueAsText(controlName, value) {
        if (controlName == 'enabled') {
            let _value = '전체';
            let controlValue = value.enabled;
            if (controlValue == 'Y') {
                _value = '사용';
            } else if(controlValue == 'N') {
                _value = '미사용';
            }
            return _value;
        } else if (controlName == 'auto_extension') {
            let _value = '전체';
            let controlValue = value.auto_extension;
            if (controlValue == 'Y') {
                _value = '자동';
            } else if (controlValue == 'N') {
                _value = '수동';
            }
            return _value;
            // console.log('getFormValueAsText =>', value[controlName]);
            //return moment(value[controlName]).toDate();
            // return value[controlName];
        } else if (controlName == 'goods_seq') {
            let _value;
            let controlValue = value.goods_seq;

            if (controlValue == '') {
                _value = '전체'
            } else if (controlValue) {
                for(let item of this.goodsSelectData) {
                    if(item.goods_seq == controlValue) {
                        _value = item.goods_name;
                        break;
                    }
                }
            }
            return _value;
        }
        return '';
    }

    getRemainingDays(item) {
        if (!item.end_date) { return; }
        return moment(item.end_date).diff(moment(), "days");
    }

    reloadItems(dataTableParams?: any) {
        this.isQueryFormRequest = false;        
        super.reloadItems(dataTableParams);
    }

    reloadWithQuery(newQuery: any) {
        this.isQueryFormRequest = true;
        
        // 종료일 검색 쿼리 안되서 하드 코딩 함
        if (newQuery['start_date[max]']) {
            newQuery['end_date[max]'] = newQuery['start_date[max]'];
            delete newQuery['start_date[max]'];
        }
        //!!
        super.reloadWithQuery(newQuery);
    }

    onClickPopup(type, productSeq?) {
        this.rankPopupType = type;
        this.isShowPopup = true;

        if(this.rankPopupType == 'ranking') { 
            //this.isShowRankingPopup = true;
            // 
            //데이터를 요청
            //productSeq[0]
        } else if(this.rankPopupType == 'reset') {
            // this.isShowResetPopup = true;
            //데이터 초기화 요청
            //productSeq[]로

            // this.productStore.resetRankData(memberSeq, productSeq).subscribe((resp) => {
            //     this.rankResetDate = resp.reset_date;
            // });
        }
    }

    onClickRequstExtendBtn(event) {
        console.assert(event);
        console.assert(event.rows && event.rows.length > 0);
    
        let count: number = event.rows.length;        
    
        let _items = [];
        for(let row of event.rows) {
            _items.push(row.item);
        }    
        console.log('onClickRequstExtendBtn _items =>', _items);
    }

    onClickResetProductsBtn(event) {
        console.assert(event);
        console.assert(event.rows && event.rows.length > 0);
        this.rankPopupType = 'reset';
        this.isShowPopup = true;
    
        let count: number = event.rows.length;        
    
        let _items = [];
        for(let row of event.rows) {
            _items.push(row.item);
        }    
        console.log('onClickResetBtn _items =>', _items);

        //onClickPopup('reset')
    }

    onClickRemoveProductsBtn(event) {
        console.assert(event);
        console.assert(event.rows && event.rows.length > 0);
    
        let count: number = event.rows.length;        
    
        let _items = [];
        for(let row of event.rows) {
            _items.push(row.item);
        }    
        console.log('onClickRemoveProductsBtn _items =>', _items);
    }

    onClickPlatform(item) {
        if (!item || !item.goods || !item.goods.goods_platform) {
            return;
        }
        let platformName = item.goods.goods_platform;
        this.appService.navigate(this.platformData[platformName].url + item.goods.goods_name);
    }

    //mobile 
    onClickSearchFilterBtn() {
        this.isShowSearchFilter = true;
    }

    onClickRankingPopup(productSeq?) {
        this.isShowRankingPopup = true;
    }

    onClickSearchOption(value) {
        this.alert.show(value);
    }
    onClickProductDetail(item) {
        if(!item || !item.product_seq) {
            return;
        }
        if(item.state == 'cancel' || item.state == 'ready') {
            return;
        }

        let productDetail = '/main/section/subscription/products/product-detail/';
        this.appService.navigate(productDetail + item.product_seq);
        // routerLink="/main/section/subscription/products/product-detail/{{item.product_seq}}"
    }
    onClickResetFilter() {
        console.log('onClickResetFilter filter =>');
        // enabled: ""
        // group_seq: ""
        // is_auto_extension_priority: ""
        // keyword: ""
        // period: ""
        // start_date[max]: null
        // start_date[min]: null
        let filter = {
            'start_date[max]': null,
            'start_date[min]': null
            // 'end_date[min]': null
        }
        this.bsForm.patchValue(filter);
    }

    //////////////////////////////////////
    // mobile list
    
    onClickLoad5MoreItems() {
        console.log('onClickLoad5MoreItems dataTableParams =>', this.dataTableParams);
        let params = this.dataTableParams; //{limit: 5, offset: 0, sortAsc: false, sortBy: 'product_seq'}
        params.offset = 0;
        params.limit = parseInt(params.limit) + 5;
        this.reloadItems(params);
    }

    onSubmit(filter) {
        this.isShowSearchFilter = false;
    }
}
