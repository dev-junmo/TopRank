import { OnInit, ViewChild, AfterViewInit, HostListener, Output, EventEmitter} from '@angular/core';
import { Router, Event as RouterEvent , NavigationStart , NavigationEnd , NavigationCancel , NavigationError } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BSDatatableStore } from './bs-datatable.store';
import * as moment from 'moment';
import { BSAlertService } from '../ui/bs-alert/index';
import { DataTable } from '../../app/common/data-table/index';
import { BSApi } from '../core/bs-api';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { URLSearchParams } from "@angular/http";

export class BSDatatableController  implements OnInit, AfterViewInit  {
    // core data
    public _data;
    public items = [];
    public itemCount = 0;
    public itemsEx = [];

    // ui지원
    public isEmpty: boolean = false;

    // params
    public dataTableParams: any = {sortBy: '', sortAsc: false, offset: 0, limit: 10};
    public query: any;    
    public defaultQuery: any;
    // 외부 component
    private queryForm: any;

    // command
    private command: string;
    private params: any;

    // config
    public usePageLocationParams: boolean = true;   // 주소를 기반으로 page처리 함
    public useMovePosition: boolean = false;        // 리스트의 순성 변경 기능
    public initialLoad: boolean = true;     
    public keyName = 'seq';
    public title: string; // 삭제해야 함
   
    // 상단에 공지사항(중요글)를 표시함
    public displayNoticeListAtTop: boolean = true;
    public noticeListFieldName = 'notice_list';     
    public noticeListTotalFieldName = 'notice_list_total';
   
    // service
    protected _router: Router;
    
    private curruntUrl;

    // position
    private startPosition = 1;
    private itemsPosMap = [];

    @ViewChild("bsDatatable") dataTable: DataTable;

    constructor(
        public datatableStore: BSDatatableStore,
        router: Router,
        protected activateRouter: ActivatedRoute,
        protected alert: BSAlertService) {

        this._router = router;
        console.assert(this._router);

        console.log("BSDatatableController::constructor _router.url =>", this._router.url);

        //this.pageKey = this._router.url;
        // active route
        //patchDatatableStoreCommand()
        
        router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationStart) {
                
                let url = event.url;
                let urls = url.split('?');
                console.log("BSDatatableController::NavigationStart event, urls =>", event, urls);
                
                if (urls.length > 0) {

                    if (this.curruntUrl != urls[0]) {
                        console.log("BSDatatableController::NavigationStart2 curruntUrl =>", this.curruntUrl);
                        this.resetForPageChanged();                
                    }
                    this.curruntUrl = urls[0];
                        
                    // if (this.usePageLocationParams) {
                    //     this.loadLocationHash(urls[1]);
                    //     if (this.datatableStore.command) {
                    //         console.log("BSDatatableController::NavigationEnd reloadList =>", event, urls);
                    //         //this.reloadList();
                    //     }
                    // }
                }
            }
        });

    }   

    ngOnInit() {        
        console.log("BSDatatableController::ngOnInit");
        console.assert(this.activateRouter);     

        // 주소를 쓰면 initalload를 말아야 *************
        
        // 만약에 page기반의 리스트를 쓰면 초기에 initialLoad를 하게 되면 이중로딩이 된다.
        // 그래서 초기로드는 끈다.

        // init()에서 해주지만 그러면 늦기 떄문에 여기서 별도로 한번 해준다.
        // 늦다? query에서 호출하는 것보다 

        // 여기서 끄면!!! 항상 끄는 것과 같다. 
        // init() -> initController -> usePageLocationParams = false!!
        // 안끄면 이중로딩
        
        // datatableController 쓰면 datatable의 초기로딩은 안함
        console.assert(this.dataTable);
        if (this.dataTable) {
            this.dataTable.initialLoad = false;    
        }          
    }

    ngAfterViewInit() {      
        console.log("BSDatatableController::ngAfterViewInit");
        this._triggerList();
    }    

    _triggerList() {
        // 여기에서 config값을 가져와야 usePageLocationParams, initialLoad 값이 세팅된다.
        this.init();
        
        // datatable에서 initialLoad를 모두 false로 하고 페이지주소이용아니면 수동 reload한다.
        console.log('_triggerList usePageLocationParams, initialLoad =>', this.usePageLocationParams, this.initialLoad);

        // 주소이용안하는 경우
        if (!this.usePageLocationParams) {
            if (this.initialLoad) {
                this.dataTable.reloadItems();
            } 
            // else {
            //     return;
            // }
        } 

        // 주소이용하는 경우
        // if (!this.initialLoad) {
        //     return;
        // }

        // datatable에 초기 sortby 값을 얻기 위해서 ngAfterViewInit에서 처리 한다.

        if (this.usePageLocationParams) {
            Observable.combineLatest( this.activateRouter.params, this.activateRouter.queryParams,
                (params, queryParams) => ({ params, queryParams})
            ).subscribe(resp => {
                console.log('_triggerList::combineLatest resp =>', resp);    
                this.loadListByLocation(resp.queryParams);
            });    
        }
       
        // // hash changed
        // this.activateRouter.fragment.subscribe(hash => {            
            
        //     console.log('ngAfterViewInit::activateRouter hash =>', hash);
        //     this.loadListByLocation(hash);
        // });

    }

    //ngAfterViewChecked

    resetForPageChanged() {
        console.log('resetForPageChanged query, queryForm =>', this.query, this.queryForm);
       
        // reset queryForm
        this.query = null;
        if (this.queryForm) {
                this.queryForm.reset();
        }     
    }

    init() {
        if (!this.datatableStore || !this.datatableStore.command) {
            // alert('내부오류::BSDatatableController datatableStore를 연결하세요. 또는 store에 command를 설정해주세요.');
            return;
        }

        // reset config
        let config: any = {
            store: {
                command: this.datatableStore.command,
            },
            title: '',
            usePageLocationParams: true,    // popup창의 경우 이 옵션을 false로 해주어야 파라미터를 안보낸다.
            initialLoad: true,              // 처음에 데이타를 한번 로드함
            queryForm: null,                // 연결할 쿼리폼
            displayNoticeListAtTop: true,
            useMovePosition: false,
            keyName: 'seq'
        };

       // initController
       const config_ = this.initController(config);
       console.log("BSDatatableController::init() config= ", config_);

       // apply config
       this.command = config_.store.command;
       this.params = config_.store.params;
       this.usePageLocationParams = config_.usePageLocationParams;  //////////////////////////////
       this.queryForm = config_.queryForm;
       if (config_.title && config_.title.length > 0) {
            this.title = config_.title; 
       }
       this.useMovePosition = config_.useMovePosition;
       this.keyName = config_.keyName;

       if(this.dataTable) {
            this.initialLoad = config_.initialLoad;
       } else {
           this.initialLoad = false;
       }
       this.displayNoticeListAtTop = config_.displayNoticeListAtTop;
       
       // 만약에 page기반의 리스트를 쓰면 초기에 initialLoad를 하게 되면 이중로딩이 된다.
       // 그래서 초기로드는 끈다.
       if (this.usePageLocationParams) {
           if (this.dataTable) {
                this.dataTable.initialLoad = false;
           } 
       }
      
       // reset command
       this.patchDatatableStoreCommand();
       
       // reset params
       if (this.dataTable) {
            this.dataTableParams = this.dataTable.getDataTableParams();
       }       
   
       console.log('init dataTableParams =>', this.dataTableParams);
    }  

    public initDatatableParams(dataTableParams) {
        this.dataTableParams = dataTableParams;
    }

    private _setPageAndParams(dataTableParams, query) {
        if (dataTableParams) {
            this.dataTableParams = dataTableParams;        
        }
        this.query = query;
        this._updatePage();
    }

    private _updatePage() {
        this.setPage(Math.floor(this.dataTableParams.offset / this.dataTableParams.limit) + 1);        
    }

    setPage(page) {

        console.log('setPage page, dataTableParams.limit =>', page, this.dataTableParams.limit);

        if (this.dataTable) {
            this.dataTable.setPageAndNoReload(page);
        }        
        this.dataTableParams.offset = (page -1) * this.dataTableParams.limit;
    }

    setStoreCommand(command, params?) {
        this.command = command;
        //this.datatableStore.command = command;
        if (params) {
            this.params = params;
            //this.datatableStore.params = params;
        }
    }

    afterInit() {

    }

    // datatableStore가 실글톤이 어서 command바뀌는 버그가 있음
    patchDatatableStoreCommand() {
        this.datatableStore.command = this.command;
        this.datatableStore.params = this.params;

        //this.dataTableParams, this.query
    }

    ///////////////////////////////////////////////////////
    // overide

    // 두번 호출 되는 문제가 있는데 
    // 한번은 기본 호출
    // 한번은 loadListByLocation 주소 변경 시 호출
    
    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);

        // config
        // let config: any = {
        //     store: {
        //         command: this.datatableStore.command,
        //     },
        //     title: ''
        // };

        return config;
    }

    public preparedParams(params) {

        return params;
    }   

    public preparedLoadData(items) {
        return items;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // 리스트 함수 

    // reloadItems -> 주소변경 -> loadListByLocation
    // reloadWithQuery -> 주소변경 -> loadListByLocation

    // * 초기 로딩 시 
    // 1. 우선 reloadItems 호출되고 
    // 2. 별개로 주소도 받아서 호출 됨  => 2중 호출 문제
    // usePageLocationParams 일때 초기 로딩을 안한다.

    // * 게시판 변경 시 

    // 1.datatable에서 호출         -> reloadItems -> datatableParams갱신 
    //                              _triggerloadListByURL
    //                              _loadList
    //                              시작 시, 페이지를 바꿀때

    // 2.queryForm에서 호출         -> reloadWithQuery -> query 갱신 ->   
    //                                  _triggerloadListByURL
    //                                  _loadList

    // 3.주소 변경                  -> loadListByLocation ->  datatableParams갱신, query 갱신 -> _loadList  
 
    // 4.코드에서 직접호출          -> reloadList -> 파라미터 없이 처리  -> _loadList 
    
   
    //////////////////////////////////////////////
    // 1.datatable에서 호출

    reloadItems(dataTableParams?: any) {

        this.init();
        
        console.log("reloadItems  dataTableParams =>", dataTableParams);
        console.assert(this.datatableStore.command);
        if (!this.datatableStore.command) {
            // alert("내부오류 : 데이타를 로딩할 command가 존재하지 않습니다." );
            return;
        }
       
        // update dataTableParams
        if (dataTableParams) {
            this.dataTableParams = Object.assign(this.dataTableParams, dataTableParams);
        }
        // if (dataTableParams) {
        //     if (dataTableParams.sortBy !== undefined) {
        //         this.dataTableParams.sortBy = dataTableParams.sortBy;
        //     }
        //     if (dataTableParams.sortAsc !== undefined) {
        //         this.dataTableParams.sortAsc = dataTableParams.sortAsc;
        //     }
        //     if (dataTableParams.offset !== undefined) {
        //         this.dataTableParams.offset = dataTableParams.offset;
        //     }
        //     if (dataTableParams.limit !== undefined) {
        //         this.dataTableParams.limit = dataTableParams.limit;
        //     }
        // }

        console.log("reloadItems3  dataTableParams, query, usePageLocationParams => ", 
            dataTableParams, this.query, this.usePageLocationParams);        

        /////////////////////////////////////////////////////////////////////////////////
        // 바로 로딩 또는 주소를 변경하여 로딩 

        if (this.usePageLocationParams) {
            this._triggerloadListByURL(this.dataTableParams, this.query);
        } else {
            this._loadList();            
        }        
    }    

    //////////////////////////////////////////////
    // 2.queryForm에서 호출 

    reloadWithQuery(newQuery: any) {

        this.init();

        console.log('reloadWithQuery newQuery =>', newQuery);

        this.setPage(1);
        this._data = null;
        this.items = []; 
        if (this.usePageLocationParams) {
            // this._triggerloadListByURL(this.dataTableParams, this.query);
            if (this.equalQuery(this.query, newQuery)) {
                console.log('reloadWithQuery refresh');
                this.loadListByLocation(newQuery);     
            } else {
                console.log('reloadWithQuery 주소기반조회');
                this._triggerloadListByURL(this.dataTableParams, newQuery);
            }
            this.query  = newQuery;
        } else {
            this.query  = newQuery;
            this._loadList();            
        }        
    }

    equalQuery(baseQuery, newQuery) {
        // 기존 필드를 기준으로 체크해야 함 / 필드를 한정하기 어려우니
        // 없음도 다름이끼 때문에 존재여부 체크 없이 다른지 비교 만 함 
        for(let key in baseQuery) {
            // 다른 값
            if (baseQuery[key] != newQuery[key]) {
                return false;
            }
        }
        return true;
    }

    //////////////////////////////////////////////
    // 3. 주소 변경

    // 주소가 변경되면 주소를 기반으로 데이타 로딩한다.
    loadListByLocation(queryParams?) {        

        // init을 호출하냐 마냐  
        // 이 함수가 reuter에서 바로 호출 되기 때문에 같은 class간 page변경 시 init호출이 안되서 여기에 넣음
        // router에 넣어도 됨 
        this.init();
        
        console.log('loadListByLocation queryParams =>', queryParams, this.usePageLocationParams);

        if (!this.usePageLocationParams) {
            return;
        }      
        
        console.log('loadListByLocation2 dataTableParams, query =>', this.dataTableParams, this.query);              

        let dataTableParams = null;

        // 주소로 부터 queryParams을 받으면 datatableParmas와 query로 나눈다.
        if (queryParams && Object.keys(queryParams).length > 0) {

            // null 과 undefinded는 다르다. 여기서 확인
            if (queryParams.sortBy !== undefined || queryParams.sortAsc !== undefined || 
                queryParams.offset !== undefined || queryParams.limit !== undefined) {

                dataTableParams = {};

                if (queryParams.sortBy !== null) {
                    dataTableParams.sortBy = queryParams.sortBy;
                }
                if (queryParams.sortAsc !== null) {
                    dataTableParams.sortAsc = queryParams.sortAsc == 'false'? false: true;
                }
                if (queryParams.offset !== null) {
                    dataTableParams.offset = queryParams.offset;
                }
                if (queryParams.limit !== null) {
                    dataTableParams.limit = queryParams.limit;
                }                
            }            
            
            //let query = {sortBy: null, sortAsc: null, offset: null, limit: null }; 
            let query: any = {};
            query = Object.assign(query, queryParams);
            if (query.sortBy !== null) {
                delete query.sortBy;    
            }
            if (query.sortAsc !== null) {
                delete query.sortAsc;    
            }
            if (query.offset !== null) {
                delete query.offset;    
            }
            if (query.limit !== null) {
                delete query.limit;    
            }

            //hash = JSON.parse(hash);
            console.log('loadListByLocation3 dataTableParams, query =>', dataTableParams, query);
            
            this._setPageAndParams(dataTableParams, query);
                                            
        } else {
            this.setPage(1);
        }

        this._loadList();   
    }

    ////////////////////////////////////////////
    // 4.코드에서 직접호출 

    // 현재 페이지를 유지하고 reload만 한다.
    
    reloadList() {
        console.log('reloadList');

        if (!this.datatableStore.command) {
            return;
        }
        
        this._loadList();
    }    


    //////////////////////////////////////////////////////////////////////
    //
    // load 내부함수

    
    // 바로 로딩 안하고 URL을 변경해서 로딩을 실행한다.
    _triggerloadListByURL(dataTableParams, query) {

        console.log('BSDatatableController::_triggerloadListByURL params =>', dataTableParams, query);

        if (!dataTableParams) {
            dataTableParams = {};
        }

        if (!query) {
            query = {};
        }        

        let params = Object.assign(dataTableParams, query);
        console.log('BSDatatableController::_triggerloadListByURL params =>', params);

        this._router.navigate([],{
              relativeTo: this.activateRouter,
              queryParams: params//,
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

    _loadList() {

        // Override preparedParams 
        if (!this.query) {
            this.query = this.defaultQuery || {};
        }
        this.query = this.preparedParams(this.query);

        //
        this.patchDatatableStoreCommand();

        console.log('_loadList command, params, dataTableParams, query =>', this.command, this.params);
        
        this.setPage( (this.dataTableParams.offset / this.dataTableParams.limit) + 1);

        this.datatableStore.list(this.dataTableParams, this.query).subscribe((resp) => {
            
            this._data = resp;
            this.items = this.preparedLoadData(resp.list);
            this.itemCount = resp.total;

            // 리스트 없음 테스트
            // this.items = [];
            // this.itemCount = 101;
           
            // 명확히 데이타가 없는지 체크
            if (this.itemCount > 0) {
                this.isEmpty = false;
            } else {
                this.isEmpty = true;
            }

            // 만약 위치 변경 기능을 사용하면
            if (this.useMovePosition) {
                if (this.items.length > 0) {
                    console.assert(this.items[0][this.keyName])
                    if (!this.items[0][this.keyName]) {
                        this.alert.show("위치변경 기능을 사용하기 위해서는 우선 keyName을 설정해야 합니다.", "내부오류");
                        return;
                    }
                }
                this.items = this.sortByPosition(this.items);
                this._saveItemPosition(this.items);
                if (this.items.length > 0) {
                    this.startPosition = this.items[0].position;
                }                
            }

            // notice list 처리            
            if (this.displayNoticeListAtTop && resp[this.noticeListFieldName]) {
                this.itemsEx = resp[this.noticeListFieldName];
            } else {
                this.itemsEx = [];
            }
            console.log('_loadList items, itemCount =>', 
                this.items, this.itemCount, resp[this.noticeListTotalFieldName]);
        });
    }    

    /////////////////////////////////////////////////////////////////
    // Method

    public createItem(params?) {

        console.log("params = ", params);

        //this.router.url
        console.log("BSUpdateFormController::createItem router=", this._router.url);
        console.assert(this._router);
        console.assert(this.activateRouter);

        // get id from router
        /*
        if (this.activateRouter.params) {
            this.activateRouter.params.subscribe(params => {
                console.log("BSUpdateFormController::createItem params = ", params['id']);

                if( params['id'] === 'create' ||
                    params['id'] === 'update' ||
                    params['id'] === 'list') {
                    this._router.navigate(['../create'],{ relativeTo: this.activateRouter });
                } else {
                    this._router.navigate(['create'],{ relativeTo: this.activateRouter });
                }
            });
        } else {*/
            let urls = this._router.url.split('?');
            urls = urls[0].split('/');

            console.log("BSUpdateFormController::createItem2 router=", urls);

            if (urls[urls.length - 1]) {
                let last = urls[urls.length - 1];
                if( last === 'create' ||
                    last === 'update' ||
                    last === 'list') {
                        if (params) {
                            this._router.navigate(['../create'], { relativeTo: this.activateRouter, queryParams: params});
                        } else {
                            this._router.navigate(['../create'], { relativeTo: this.activateRouter });
                        }

                } else {
                    if (params) {
                        this._router.navigate(['create'], { relativeTo: this.activateRouter, queryParams: params });
                    } else {
                        this._router.navigate(['create'], { relativeTo: this.activateRouter });
                    }
                }
            } else {
                if (params) {
                    this._router.navigate(['create'], { relativeTo: this.activateRouter, queryParams: params });
                } else {
                    this._router.navigate(['create'], { relativeTo: this.activateRouter });
                }
            }
        //}
    }

    public updateItem(id) {

        console.assert(this.activateRouter);
        console.assert(id);
        console.log('BSDatatableController::updateItem id=', id);

        let urls = this._router.url.split('?');
            urls = urls[0].split('/');


        if (urls[urls.length - 1]) {
            let last = urls[urls.length - 1];
            if( last === 'create' ||
                last === 'update' ||
                last === 'list') {
                this._router.navigate(['../update/' + id],{ relativeTo: this.activateRouter });
            } else {
                this._router.navigate(['update/' + id],{ relativeTo: this.activateRouter });
            }
        } else {
            this._router.navigate([id],{ relativeTo: this.activateRouter });
        }
    }

    public deleteItem(id) {

        this.alert.confirm("삭제 하시겠습니까?").subscribe((result) => {
            this.patchDatatableStoreCommand();
            this.datatableStore.delete(id).subscribe( resp => {
                this.reloadList();
                this.alert.show("삭제 되었습니다.");
            });
        });
    }

    public deleteSelectedItem(event: any, keyName: string) {

        console.log("BSUpdateFormController::deleteSelectedItem event=", event);
        console.assert(event);
        console.assert(event.rows && event.rows.length > 0);

        let count: number = event.rows.length;
        let rolls: number = count;

        this.alert.confirm(rolls + "개의 선택항목을 삭제 하시겠습니까?").subscribe((result) => {

            for(let row of event.rows) {
                console.log("BSUpdateFormController::deleteSelectedItem", row, row.item[keyName]);
                console.assert(row.item[keyName]);
                let id = row.item[keyName];
                this.patchDatatableStoreCommand();
                this.datatableStore.delete(id).subscribe( resp => {
                    rolls--;
                    if (rolls == 0) {
                        this.reloadList();
                        this.alert.show(count + "개의 아이템이 삭제 되었습니다.");
                    }
                });
            }
        });

    }

    ///////////////////////////////////////////////////////////
    // 순서 조정

    public movePositionUp(event) {
        this._reposition(event, 'up');
    }

    public movePositionDown(event) {
        this._reposition(event, 'down');
    }

    public movePositionTop(event) {
        this._reposition(event, 'top');
    }

    public movePositionBottom(event) {
        this._reposition(event, 'bottom');
    }

    // up, down
    private _reposition(event, dir) {

        if (!this.useMovePosition) {
            this.alert.show('위치이동기능을 사용하려면 useMovePosition값과 keyName값을 설정해주세요.', '내부오류');
            return;
        }

        console.log("MainBannerListComponent::_reposition event =>", event);
        console.assert(event);
        console.assert(event.rows && event.rows.length > 0);

        let count: number = event.rows.length;        

        // 리스트의 아이템을 선택한 순서에 따로 순서가 다르게 배열이 온다.
        // 이렇게 되면 위치 변경 처리에 문제가 되므로
        // 위치 변경 작업전에 position순으로 소팅을 한다.
        let _items = [];
        for(let row of event.rows) {
            _items.push(row.item);
        }
        _items = this.sortByPosition(_items);
        console.log('_reposition selected items =>', _items);

        if (dir == 'up') {              
            for(let item of _items) {
                if (!this.positionToUp(item)) { return; }                   
            }    
        } else if (dir == 'down') {
            for(let item of _items.reverse()) {
                if (!this.positionToDown(item)) { return; }
            }
        } else if(dir == 'top') {
            let newItems = _items;  // top position
            for(let item of this.items) {
                let exist: boolean = false;
                for(let newItem of _items) {
                    if (newItem[this.keyName] == item[this.keyName]) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    newItems.push(item);
                } 
            }
            this.items = this._repositionItems(newItems, false);
            console.log('positionToTop newItems, items =>', newItems, this.items);
        } else if(dir == "bottom") {
            let newItems = [];  // top position
            for(let item of this.items) {
                let exist: boolean = false;
                for(let newItem of _items) {
                    if (newItem[this.keyName] == item[this.keyName]) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    newItems.push(item);
                } 
            }

            // add last item
            for(let item of _items) {
                newItems.push(item);
            }

            this.items = this._repositionItems(newItems, false);
            console.log('positionToBottom newItems, items =>', newItems, this.items);
        }
    }

    positionToUp(item) {
        let prevPos = item.position - 1;
        let prevIndex = prevPos - this.startPosition;
        console.log('positionToUp item, prevIndex, item.position, startPosition =>',item, prevIndex, item.position, this.startPosition);        
        if (prevIndex < 0 || !this.items[prevIndex]) { return false; }
      
        // replace
        this.items[prevIndex].position = item.position;
        item.position = prevPos;

        this.items = this._repositionItems(this.items);
        console.log('positionToUp items =>', this.items);

        return true;
    }

    positionToDown(item) {
        let nextPos = item.position + 1;
        let nextIndex = nextPos - this.startPosition;
        console.log('positionToDown item, nextIndex, item.position, startPosition =>',item, nextIndex, item.position, this.startPosition);
        if (nextIndex >= this.items.length || !this.items[nextIndex]) { return false; }

        // replace
        this.items[nextIndex].position = item.position;
        item.position = nextPos;

        this.items = this._repositionItems(this.items);
        console.log('positionToDown items =>', this.items);
        return true;
    }

    sortByPosition(list) {
        // position으로 소팅
        list.sort((a, b) => {
            if (a.position > b.position) {
                return 1;
            }

            if (a.position < b.position) {
                return -1;
            }
            return 0;
        });

        console.log('sortByPosition list =>',list);
        return list;
    }

    // 현재 배열의 순서에 따라 포지션을 다시 부여 한다.

    // 1. 포지션은 이미 변경되었는데 배열이 순서대로 안되어 있을 경우 
    // 2. 배열은 순서대로 있는데 포지션이 안변경 되어 있을 경우 이 둘다를 처리한다.
    private _repositionItems(items, isPositionSort = true) {
        console.log('_repositionItems items, isPositionSort =>', items, isPositionSort);
        let items2;

        if (isPositionSort) {
            items2 = this.sortByPosition(items);
        } else {
            items2 = items;
        }

        let pos = this.startPosition;  
        for(let item of items2) {
            item.position = pos;
            pos++;
        }

        return items2;
    }

    public savePosition() {
        
        console.log('onClickSubmitPositoin items, itemsPosMap =>', this.items, this.itemsPosMap);

        if (!this.useMovePosition) {
            this.alert.show('위치이동기능을 사용하려면 useMovePosition값과 keyName값을 설정해주세요.', '내부오류');
            return;
        }
       
        let changed = this._getChangedPosLists();
        
        this.datatableStore.savePosition(changed.seqs , changed.poses, this.keyName).subscribe((resp=>{
            this.reloadList();
            this._saveItemPosition(this.items);
        }));
    }

    private _getChangedPosLists() {
        // 포지션이 변경된 아이템을 취합한다.
        let seqs = [];
        let poses = [];
        for(let item of this.items) {               
            if (this.itemsPosMap[item[this.keyName]] !== item.position ) {
                seqs.push(item[this.keyName]);
                poses.push(item.position);    
            }
        }
        console.log('_getChangedPosLists seqs, poses =>', seqs, poses);
        return { seqs: seqs, poses: poses};
    }

    private _saveItemPosition(items) {
        let itemsPosMap = [];
        for(let item of items) {
            itemsPosMap[item[this.keyName]] = item.position;
        }
        this.itemsPosMap = itemsPosMap;
        console.log('saveItemPosition itemsPosMap =>', this.itemsPosMap);
    }


    ///////////////////////////////////////////////////////////
    // 선택 다운로드 : 기본 리스트 다운로드

    onClickDownloadExcel(event, columns?, apiUrl?) {

        console.log("onClickSelectDownloadExcel event =>", event);

        console.assert(this.dataTable);

        let headers = [];

        if (!columns) {
            columns = this.dataTable.columns;
        }

        for(let column of columns.toArray()) {

            if (!column.property || !column.header) {
                continue;
            }

            console.log("columns =>", column.property, column.header, column.width);
            headers.push({key: column.property, value: column.header});
        }

        this.downloadExcel(headers, this.dataTable.page, this.dataTable.limit, apiUrl);
    }

    downloadExcel(headers, page, limit, apiUrl) {

        let params = {};
        if (this.query) {
            params = Object.assign({}, this.query);
        }

        params['paging[page]'] = page;
        params['paging[limit]'] = limit;

        for(let header of headers) {
            params['headers[' + header.key + ']'] = header.value;
        }

        console.log("downloadExcel params =>", params);

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }
        }

        let url = 'admin/shop/goods/goods';

        if (apiUrl) {
            url = apiUrl;
        }

        window.open(BSApi.url + '/' + url +'/xlsx'+ '?_MIME=xlsx&'  +  p.toString() , '_blank');
    }

     // PageCacheProc() {

    //     if (!this.usePageLocationParams) { return; }
    //     //console.log("PageCacheProc location.path =>", this.location);

    //     // 처음 들어와서 hash가 있을 때만 로딩한다.
    //     // load hash
    //     if (this.cacheQuery) {
    //         this.dataTableParams = this.cacheQuery[0];
    //         this.query = this.cacheQuery[1];
    //         console.log("PageCacheProc Set =>", this.dataTableParams, this.query);

    //         this.setPage( (this.dataTableParams.offset / this.dataTableParams.limit) + 1);
    //         this.cacheQuery = null;
    //     }

    //     // write hash
    //     let hash = [
    //         this.dataTableParams,
    //         this.query
    //     ];
        
    //     let _hash = encodeURIComponent(JSON.stringify(hash));
    //     if(window.location.hash !== _hash) {
    //         window.location.hash = _hash;
    //         console.log('PageCacheProc2 hash =>', window.location.hash, _hash);           
    //     }
    //     //window.location.replace(window.location.href);
        
    //     // query : 시작시에는 queryParams
    //     // if (!this.query && this.dataTableParams.offset == 0) {

    //     //     let data = this.appConfig.getPageQuery(this.pageKey);
    //     //     if(data) {
    //     //         this.dataTableParams = data.dataTableParams;
    //     //         this.query = data.queryParams;
    //     //         this.setPage( (this.dataTableParams.offset / this.dataTableParams.limit) + 1);

    //     //     }
    //     // } else {
    //     //     //this.appConfig.setPageQuery(this.pageKey, this.dataTableParams, this.query);
    //     //     let hash = {
    //     //         dataTableParams: dataTableParams,
    //     //         queryParams: query
    //     //     };
    //     //     console.log("dddddddddd", JSON.stringify(hash));
    //     //     window.location.hash = JSON.stringify(hash);

    //     // }
    // }


    // private _loadHash(hash) {

    //     if (!hash) { return null; }

    //     // 앞에 #이 붙어 있으면 떼기
    //     let ar = hash.split('#');
    //     if (ar.length == 1) {
    //         hash = ar[0];
    //     } else {
    //         hash = ar[1];
    //     }
    //     console.log("loadLocationHash ar, hash =>", hash);

    //     // if (!window.location.hash) { return; }
    //     // let hash = window.location.hash.substr(1);
    //     hash = decodeURIComponent(hash);
    //     console.log("loadLocationHash2 hash =>", hash);
    //     return JSON.parse(hash);
    // }

    ///////////////////////////////////
    //
    // mobile
    //

    ///////////////////////////////////
    // infinite scroll

    // @HostListener('window:scroll', ['$event'])
    // onWindowScroll($event) {
    //     // inifinty
    //     this._checkInfinityScroll();
    // }

    // public infiniteScrollDistance = 75;     // 75%
    // public infiniteScrollThrottle = 1500;   // 1.5sec
    // public isInfiniteOnlyMobile: boolean = true; 

    // @Output() onInfinityScroll = new EventEmitter<any>();
    
    // private _isIgnoreInfiniteEvent = false;

    // private _checkInfinityScroll() {
    //     let scrollPercent = this._getScrollPercent();
    //     if (scrollPercent > this.infiniteScrollDistance && scrollPercent !== 100) {
    //         //console.log('_checkInfinityScroll scrollPercent, ignoreScrollEvent =>', scrollPercent);
    //         if (!this._isIgnoreInfiniteEvent) {
    //             //console.log('_checkInfinityScroll scrollPercent, ignoreScrollEvent =>', scrollPercent, this.ignoreScrollEvent);
    //             this._isIgnoreInfiniteEvent = true;
    //             //if (this.isInfiniteOnlyMobile && this.appService. == 'pc') {
    //             //    this.appService.fireInfinityScrolled();
    //             //}
    //             this.onInfinityScroll.emit();
    //             this.onInfinityScrolled();

    //             // 한버 발생하면 1초이내는 다시 발생하지 않는다.
    //             // 그동안 페이지가 늘어나야 함
    //             setTimeout(()=> {
    //                 this._isIgnoreInfiniteEvent = false;

    //                 // 이것은 왜 해주는지 아직 모르겠음
    //                 // let scrollPercent = this._getScrollPercent();
    //                 // if (scrollPercent > 99) {
    //                 //     this.onInfinityScroll.emit();
    //                 // }
    //             }, this.infiniteScrollThrottle);
    //         }
    //     }
    // }

    // // override
    // onInfinityScrolled() {
    //     console.log('========================> infinite scrolled');
    // }

    // private _getScrollPercent() {
    //     var h = document.documentElement,
    //         b = document.body,
    //         st = 'scrollTop',
    //         sh = 'scrollHeight';
    //     return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    // }


}
