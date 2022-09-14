import { ViewChild } from '@angular/core';
import { BSPagination } from './bs-pagination/bs-pagination';
import { ReplaceHtmlToTextPipe } from '../../../common/pipe/string.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

//////////////////

// list sample

//_sample
/* filter

<select class="my-top-select" (change)="onClickFilter($event.target.value)">
    <option [value]="''">전체</option>
    <option [value]="'use'">사용</option>
    <option [value]="'plus'">적립</option>
    <option [value]="'expire'">소멸</option>
    <option [value]="'cancel'">취소</option>
</select>
*/

//_sample
/* pagination

<bs-pagination
    #pagination
    [countPerPage]="5"
    [totalItemsCount]="listCount"
    (changedPage)="changedPage($event)">
</bs-pagination>
*/



//_sample
/* infiiteScroll

infiniteScroll (scrolled)="onInfiniteScrolled()" [scrollWindow]="true" [infiniteScrollDistance]="1"
// [scrollWindow] = "true"  // default
*/

// _sampe
/*
    preparedData() {

        this.myQnaStore.list(
            this.page, 5,   // 리스트
            this.period.sDate, this.period.eDate, // 기간조회
            this.filter   // 필터
        ).subscribe((resp => {
            this.listProcessWithResponse(resp);
            // for(let item of resp.list) {
            //     if(item.contents) {
            //         item.contents = item.contents.replace(/(?:\r\n|\r|\n)/g, '<br>');
            //     }
            //     if(item.re_contents) {
            //         item.re_contents = item.re_contents.replace(/(?:\r\n|\r|\n)/g, '<br>');
            //     }
            // }
        }));
    }
*/

//_sample
/*
    *이건 뭔지 모르겠음

    myList(page = 1, limit = 5, sDate?, eDate?,  filter?) {

        let params: any = {
            'order[0][column]' : 'regist_date',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (sDate) {
            params['regist_date[min]'] = sDate;
        }

        if (eDate) {
            params['regist_date[max]'] = eDate;
        }

        if (filter) {
            params['filter'] = filter;
        }

        return this.api.get(this.command + '/my', params);
    }
*/

export class BSBaseListController {

    @ViewChild('pagination') pagination: BSPagination;

    // option
    public useUrlBaseList: boolean = false;
    public usePeroid: boolean = false;
    public useQueryParams: boolean = false;

    // list
    public listCount: number;
    public list: any;
    public page: number = 1;
    public limit: number = 5;
    public dir: string = 'desc';

    // 기간조회
    public period: any;

    // 추가파라미터
    public category: string;
    public filter: string; // = 'regist_date';
    
    private isAppendList: boolean = false;

    constructor(protected activateRouter: ActivatedRoute, 
        protected router: Router) {
        //setTimeout(() => {
            this.activateRouter.queryParams.subscribe(queryParams => {
                console.log('BSBaseListController::constructor queryParams =>', queryParams);
                setTimeout(() => {
                    this._loadByQueryParams(queryParams);
                }, 10);
            }); 
        //}, 10);
    }

    /////////////////////////////////////////////////////////////////////////
    //
    // private _routerProcess() {
    //     this.activateRouter.queryParams.subscribe(queryParams => {
    //         this._loadListByQueryParams(queryParams);
    //     });
    // }

    // private _loadListByQueryParams(params) {
    //     if (params.page) {
    //         this.page = params.page;
    //     }
    //     if (params.page) {
    //         this.page = params.page;
    //     }
    //     if (params.page) {
    //         this.page = params.page;
    //     }
    //     if (params.page) {
    //         this.page = params.page;
    //     }    
    // }   

    /////////////////////////////////////////////////////////////////////////
    // 리스트

    public reloadList() {
        this.clearPage();
        this.loadList();
    }

    resetList() {
        this.clearPage();
        this.filter = null;
        this.period = null;
        this.category = null;       
    }

    clearPage() {
        if (this.pagination) {
            this.pagination.resetPage();
        }
        this.page = 1;
        //this.listCount = 0;
        this.list = [];
    }

    loadList(isAppendList = false) {
        this.isAppendList = isAppendList;
        if (this.useUrlBaseList) {
            console.log('BSBaseListController::loadList =>', this.router.url);
            this._requestByUrl();
        } else {
            if (this.useQueryParams) {
                this.preparedDataWithQueryParams(this.page, this.limit, this.period, this.filter, this.category);
            } else {
                this.preparedData(); 
            }
        }
    }

    listProcessWithResponse(resp) {
        console.assert(resp.list);
        console.assert(resp.total !== undefined);

        this.listProcessWithList(resp.list, resp.total);
    }

    listProcessWithList(list, total) {
        this.listCount = total;

        if (!this.list) {
            this.list = [];
        }

        // 리스트
        if (this.isAppendList) {
            this.list = this.list.concat(list);
        } else {
            this.list = list;
        }

        let  replaceHtmlToTextPipe= new ReplaceHtmlToTextPipe();
        for(let item of this.list) {
            if (item.subject) {
                item.subject = replaceHtmlToTextPipe.transform(item.subject);
            }
        }

        console.log("listProcessWithList list, total = ", this.list, this.listCount);
    }

    // 기간 조회 버튼을 누른 경우
    onSubmitPeriodQuery(period) {

        // 초기에 이게 호출되게 되어 있어서 초기 로딩이 됨
        console.log("onSubmitPeriodQuery period=", period);
        this.period = period;

        this.clearPage();
        this.loadList();
    }

    // 페이지
    changedPage(page) {
        console.log("changedPage page = ", page);
        this.page = page;
        this.loadList();
    }

    onInfiniteScrolled() {
        // console.assert(false;
        console.log("onInfiniteScrolled >>>>>>>>>>>>>>>>>>>>>>");
        this.page++;
        this.loadList(true);
    }


    // 필터
    onClickFilter(filter, dir = 'desc') {
        console.log('onClickFilter filter =>', filter);
        this.filter = filter;

        if (dir) { this.dir = dir; }

        this.clearPage();
        this.loadList();
    }

     // 필터
     onClickCategory(category, dir = 'desc') {
        console.log(category);
        this.category = category;

        if (dir) { this.dir = dir; }

        this.clearPage();
        this.loadList();
    }

    ////////////////////////////////////////
    // url기반 리스트

    private _requestByUrl() {
        let queryParams = {
            page: this.page, 
            limit: this.limit,   // 리스트
            filter: this.filter
        };

        if (this.usePeroid) {
            if (this.period && this.period.sDate && this.period.eDate) {
                queryParams['sdate'] = this.period.sDate;
                queryParams['edate'] = this.period.eDate;
            } else {
                this.period.sDate = moment(this._getPrevDateFromToday(0,-3,0,0)).format('YYYY-MM-DD');
                this.period.eDate = moment(this._getToday()).format('YYYY-MM-DD');
                queryParams['sdate'] = this.period.sDate;
                queryParams['edate'] = this.period.eDate;
            }
        }     

        let url = this.router.url.split('?')[0];
        console.log('_requestByUrl queryParams, period =>', queryParams, this.period);
        this.router.navigate([url], { queryParams: queryParams });
    }

    private _getToday() {
        const today = moment().toDate();
        return today; // { year: today.years, month: today.months + 1, day: today.date};
    }

    private _getPrevDateFromToday(years, months, weeks, days) {
        const date = moment().add(years, 'years').add(months, 'months')
                    .add(weeks, 'weeks').add(days, 'days').toDate();
        return date;
    }


    protected _loadByQueryParams(queryParams) {
        console.log('_loadByQueryParams  queryParams =>', queryParams);
        
        if (queryParams.page) {
            this.page = parseInt(queryParams.page);
        } else {
            this.page = 1;
        }
        
        if (queryParams.limit) {
            this.limit = queryParams.limit;
        } else {
            this.limit = 5;
        }

        if (queryParams.category) {
            this.category = queryParams.category;
        }

        if (this.usePeroid) {
            if (queryParams.sdate && queryParams.edate) {
                this.period = {
                    sDate: queryParams.sdate,
                    eDate: queryParams.edate
                };
            } else {
                this.period = {  
                    sDate: moment(this._getPrevDateFromToday(0,-3,0,0)).format('YYYY-MM-DD'),
                    eDate: moment(this._getToday()).format('YYYY-MM-DD')
                };
            }    
        }
        
        if (queryParams.filter) {
            this.filter = queryParams.filter;
        }
        console.log('_loadByQueryParams2  queryParams =>', queryParams);

        this.preparedDataWithQueryParams(this.page, this.limit, this.period, this.filter, this.category);
    }

    //
    ///////////////////////////


    ////////////////////////////////////////////////////////
    // overide

    preparedData() {

    }

    preparedDataWithQueryParams(page, limit, period, filter, category) {

    }

    /////////////////////////////////////////////////////////
    //
    // preparedData() {
    //
    //     this.goodsReviewStore.myList(
    //         this.page, 5,   // 리스트
    //         this.period.sDate, this.period.eDate, // 기간조회
    //         this.filter,   // 필터
    //         this.category
    //     ).subscribe((resp => {
    //
    //         this.listProcessWithResponse(resp);
    //         console.log('listCount = ', resp.total);
    //     }));
    // }


}
