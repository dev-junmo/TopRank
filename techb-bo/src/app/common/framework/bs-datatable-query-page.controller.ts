import { OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, Event as RouterEvent , NavigationStart , ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { DataTable } from '@app/common/data-table/index';

export class BSDatatableQueryPageController  implements OnInit, AfterViewInit  {

    public query: any;    
    public defaultQuery: any = {};
    
    // 외부 component
    private queryForm: any;
   
    // service
    protected _router: Router;
    private curruntUrl;

    @ViewChild("bsDatatable") dataTable: DataTable;
    
    constructor(
        public router: Router,
        public activateRouter: ActivatedRoute) {

        this._router = router;
        console.assert(this._router);
        console.log("BSDatatableQueryPageController::constructor _router.url =>", this._router.url);
        
        router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationStart) {
                
                let url = event.url;
                let urls = url.split('?');
                console.log("BSDatatableQueryPageController::NavigationStart event, urls =>", event, urls);
                
                if (urls.length > 0) {

                    if (this.curruntUrl != urls[0]) {
                        console.log("BSDatatableQueryPageController::NavigationStart2 curruntUrl =>", this.curruntUrl);
                        this.resetForPageChanged();                
                    }
                    this.curruntUrl = urls[0];
                }
            }
        });

    }   

    ngOnInit() {        
        console.log("BSDatatableQueryPageController::ngOnInit");
        console.assert(this.activateRouter);     
        console.assert(this.dataTable);
        if (this.dataTable) {
            this.dataTable.initialLoad = false;    
        }          
    }

    ngAfterViewInit() {      
        console.log("BSDatatableQueryPageController::ngAfterViewInit");
        this._triggerList();
    }    

    _triggerList() {
        console.log("_triggerList activateRouter, activateRouter.params =>", this.activateRouter, this.activateRouter.params);

        if (!this.activateRouter) { 
            this.loadListByLocation();
            return; 
        }

        Observable.combineLatest( this.activateRouter.params, this.activateRouter.queryParams,
            (params, queryParams) => ({ params, queryParams})
        ).subscribe(resp => {
            console.log('urlParams resp =>', resp);    
            this.loadListByLocation(resp.queryParams);
        });
    }

    resetForPageChanged() {
        console.log('resetForPageChanged query, queryForm =>', this.query, this.queryForm);
       
        // reset queryForm
        this.query = null;
        if (this.queryForm) {
                this.queryForm.reset();
        }     
    }

    //////////////////////////////////////////////
    // 2.queryForm에서 호출 

    reloadWithQuery(newQuery:any) {
        console.log('reloadWithQuery newQuery, this.query =>', newQuery, this.query);

        if (this.equalQuery(this.query, newQuery)) {
            console.log('reloadWithQuery refresh');
            this.loadList(this.query);     
        } else {
            console.log('reloadWithQuery 주소기반조회');
            this._triggerloadListByURL(newQuery);
        }
    }

    /*
    http://localhost:4201/main/order/cancel/list?
        keyword=&period=&provider_seq%5B%5D=&
        order_type%5B0%5D=&order_type%5B1%5D=&order_type%5B2%5D=&payment%5B0%5D=&payment%5B1%5D=&payment%5B2%5D=&payment%5B3%5D=&payment%5B4%5D=&payment%5B5%5D=&payment%5B6%5D=&goods_kind%5B0%5D=&goods_kind%5B1%5D=&regist_date%5Bmin%5D=2021-01-15&regist_date%5Bmax%5D=2021-01-18
    
    */
    equalQuery(baseQuery, newQuery) {
  
        // 기존 필드 기준으로 체크
        for(let key in baseQuery) {
            // 다른 값
            if (baseQuery[key] != newQuery[key]) {
                return false;
            }
        }

        // 새 필드 기준으로 체크
        for(let key in newQuery) {
            // 다른 값
            if (newQuery[key] && baseQuery[key] != newQuery[key]) {
                return false;
            }
        }
        return true;
    }

    //////////////////////////////////////////////
    // 3. 주소 변경

    // 주소가 변경되면 주소를 기반으로 데이타 로딩한다.
    loadListByLocation(queryParams?) {     
        
        console.log('loadListByLocation queryParams, Object.keys(queryParams), defaultQuery =>', 
            queryParams, this.defaultQuery);

        if (!queryParams || Object.keys(queryParams).length == 0) {
            this.query =  Object.assign({}, this.defaultQuery);
        } else {
            this.query = Object.assign({}, queryParams);;
        }
        
        this.loadList(this.query);   
    }

    //////////////////////////////////////////////////////////////////////
    //
    // load 내부함수

    
    // 바로 로딩 안하고 URL을 변경해서 로딩을 실행한다.
    _triggerloadListByURL(query) {

        // if (!dataTableParams) {
        //     dataTableParams = {};
        // }

        if (!query) {
            query = {};
        }        

        // let params = Object.assign(dataTableParams, query);
        console.log('BSDatatableQueryPageController::_triggerloadListByURL params =>', query);

        this._router.navigate([],{
              relativeTo: this.activateRouter,
              queryParams: query//,
              //queryParamsHandling: 'merge'
        });
      
        // write hash
        // let hash = [
        //     dataTableParams,
        //     query
        // ];
        
        // let _hash = encodeURIComponent(JSON.stringify(hash));
        // if(window.location.hash !== _hash) {
        //     window.location.hash = _hash;
        //     console.log('_triggerloadListByURL hash =>', window.location.hash, _hash);           
        // }
    }   

    //////////////////////////////////////////////
    // overide

    loadList(query = null, refesh = null) {
        console.log('BSDatatableQueryPageController::loadList 여기서 리스트를 로드하세요.');
        console.log('BSDatatableQueryPageController::loadList2 query =>', query);
    }


}
