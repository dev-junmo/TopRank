import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';
import { URLSearchParams } from "@angular/http";

@Injectable()
export class StatisticsStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/stats');
    }   

    ////////////////////////////////////////////////
    // 매출 통계

    // 매출통계 - 전체
    getAllSalesData(params) {
        return this.api.get(this.command + '/stats/total', params);
    }

    downloadAllSalesData(params) {
        this.downloadExcel(this.command + '/stats/xlsx/total', params);
    }

    // 매출통계 - 카테고리
    getCategorySalesData(params) {
        return this.api.get(this.command + '/stats/category', params);
    }

    downloadCategorySalesData(params) {
        this.downloadExcel(this.command + '/stats/xlsx/category', params);
    }

    // 매출통계 - 입점사
    getProviderSalesData(params) {
        return this.api.get(this.command + '/stats/provider', params);
    }

    downloadProviderSalesData(params) {
        this.downloadExcel(this.command + '/stats/xlsx/provider', params);
    }

    // 매출통계 - 결제수단
    getPaymentSalesData(params) {
        return this.api.get(this.command + '/stats/payment', params);
    }

    downloadPaymentSalesData(params) {
        this.downloadExcel(this.command + '/stats/xlsx/payment', params);
    }

    //매출통계-상품별
    getGoodsData(params, column) {
        // let params = {
        //     'search_date[min]' : '',
        //     'search_date[max]' : '',
        //     goods_name: '',
        //     provider_seq: '',
        //     category_link: '',
        //     brand_link: '',
        //     //'order[column]': column
        //     order: column
        // }

        // if(query) {
        //     params = {
        //         'search_date[min]' : query['search_date[min]'],
        //         'search_date[max]' : query['search_date[max]'],
        //         goods_name: query.goods_name,
        //         provider_seq: query.provider_seq,
        //         category_link: query.category_link,
        //         brand_link: query.brand_link,
        //         order: column,
        //     }
        // }
        params['order'] = column;

        console.log("getGoodsData params =>", params);
        return this.api.get(this.command + '/goods', params );
    }

    downloadGoodsData(params, column) {
        params['order'] = column;
        this.downloadExcel(this.command + '/goods/xlsx', params); //
    }


    ////////////////////////////////////////////////
    // 상품 통계

    //상품통계-장바구니
    getCartData(params, column) {
        // let params = {
        //     'search_date[min]' : '',
        //     'search_date[max]' : '',
        //     goods_name: '',
        //     provider_seq: '',
        //     category_link: '',
        //     brand_link: '',
        //     'order[column]': column
        // }

        // if(query) {
        //     params = {
        //         'search_date[min]' : query['search_date[min]'],
        //         'search_date[max]' : query['search_date[max]'],
        //         goods_name: query.goods_name,
        //         provider_seq: query.provider_seq,
        //         category_link: query.category_link,
        //         brand_link: query.brand_link,
        //         'order[column]': column,
        //     }
        // }
        params['order[column]'] = column;
        return this.api.get(this.command + '/goods_cart' , params);
    }

    downloadCartData(params, column) {
        params['order[column]'] = column;
        this.downloadExcel(this.command + '/goods_cart/xlsx', params); //
    }

    // 상품통계 - 유입경로
    getRefererGoodsData(params) {
        return this.api.get(this.command + '/goods/referer', params);
    }

    downloadRefererGoodsData(params) {
        this.downloadExcel(this.command + '/goods/xlsx/referer', params);
    }

    // 상품통계 - 검색어 
    getSearchGoodsData(params) {
        return this.api.get(this.command + '/goods/search', params);
    }

    downloadSearchGoodsData(params) {
        this.downloadExcel(this.command + '/goods/xlsx/search', params);
    }

    ////////////////////////////////////////////////
    // 고객 통계

     // 고객통계 - 성별
    getGenderData(params) {
        return this.api.get(this.command + '/user/gender', params);
    }

    downloadGenderData(params) {
        this.downloadExcel(this.command + '/user/xlsx/gender', params);
    }

    // 고객통계 - 연령별
    getAgeData(params) {
        return this.api.get(this.command + '/user/age', params);
    }

    downloadAgeData(params) {
        this.downloadExcel(this.command + '/user/xlsx/age', params);
    }

    // 고객통계- 요일별
    getDayOfWeekData(params) {
        return this.api.get(this.command + '/user/weekday', params);
    }

    downloadDayOfWeekData(params) {
        this.downloadExcel(this.command + '/user/xlsx/weekday', params);
    }

    // 고객통계- 시간별
    getHourlyData(params) {
        return this.api.get(this.command + '/user/hourly', params);
    }

    downloadHourlyData(params) {
        this.downloadExcel(this.command + '/user/xlsx/hourly', params);
    }

    // 고객통계- 유입경로
    getReferData(params) {
        return this.api.get(this.command + '/user/refer', params);
    }

    downloadReferData(params) {
        this.downloadExcel(this.command + '/user/xlsx/refer', params);
    }

    /////////////////////////////////////////////////////////////

    downloadExcel(url, params) {
        let paramsURL  = '';
        if (params) {
            const p = new URLSearchParams();
            if (params) {
                for (const key in params) {
                    p.set(key, params[key]);
                }
            }

            paramsURL = '?'  +  p.toString();
        }
        window.open(BSApi.url + '/' + url + paramsURL, '_blank');
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //
    // 이전에 작업한 내용
    //
    
    //고객통계-성별 엑셀다운로드
    // getGenderDataExel(date) {
    //     let params = {
    //         search_date: date
    //     }
    //     return this.api.get(this.command + '/user_gender_xlsx', params );
    // }    

    //고객통계-연령별 엑셀다운로드
    // getAgeDataExel(type,date) {
    //     let params = {
    //         search_type: type,
    //         search_date: date
    //     }
    //     return this.api.get(this.command + '/user_age_xlsx' , params );
    // }

    //고객통계-지역별
    // getAeaData(date) {
    //     let params = {
    //         search_date: date
    //     }
    //     return this.api.get(this.command + '/user_area' , params );
    // }

    //고객통계-지역별 엑셀다운로드
    // getAeaDataExel(date) {
    //     let params = {
    //         search_date: date
    //     }
    //     return this.api.get(this.command + '/user_area_xlsx', params );
    // }

    //고객통계-월별/일별/시간별
    // getWeekDayData(type,date) {
    //     let params = {
    //         search_type: type,
    //         search_date: date
    //     }
    //     return this.api.get(this.command + '/user_weekday' , params );
    // }

    //고객통계-시간별(유입경로)
    // getRefererData(date) {
    //     let params = {
    //         search_date: date
    //     }
    //     return this.api.get(this.command + '/user_referer' , params );
    // }

    //고객통계--월별/일별/시간별 엑셀다운로드
    // getWeekDayDataExel(type,date) {
    //     let params = {
    //         search_type: type,
    //         search_date: date
    //     }
    //     return this.api.get(this.command + '/user_weekday_xlsx' , params );
    // }

    //상품통계-검색어(목록)
    // getSearchData(query) {
    //     let params = {
    //         'regist_date[min]' : '',
    //         'regist_date[max]' : '',
    //         keyword: '',
    //     }

    //     if(query) {
    //         params = {
    //             'regist_date[min]' : query['regist_date[min]'],
    //             'regist_date[max]' : query['regist_date[max]'],
    //             keyword: query.keyword,
    //         }
    //     }
    //     return this.api.get(this.command + '/goods_keyword_list' , params );
    // }

    //상품통계-검색어(상세)
    // getSearchDetailData() {
    //     return this.api.get(this.command + '/goods_keyword_detail' );
    // }

    //상품통계-검색어 엑셀다운로드
    // getSearchDataExel() {
    //     return this.api.get(this.command + '/goods_keyword_xlsx' );
    // }

    //상품통계-장바구니 엑셀다운로드
    // getCartDataExel() {
    //     return this.api.get(this.command + '/goods_cart_xlsx' );
    // }

}
