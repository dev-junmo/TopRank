import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AppService } from '../../../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../../../service/auth.service';
import { BSDatatableController } from '../../../../../../../../../../../common/framework';
import { PointStore } from '../../../../../../../../../../store/point.store';
import { BSAlertService } from '../../../../../../../../../../../common/ui/bs-alert';
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'point-history-list',
    templateUrl: './point-history-list.page.html',
    styleUrls: ['./point-history-list.page.css']
})
export class PointHistoryListPageComponent extends BSDatatableController {

    public isShowExchangePopup: boolean = false;
    public isShowDrawPopup: boolean = false;
    public isPointHistory: boolean = true;

    public isQueryFormRequest: boolean = undefined;
    public isShowSearchFilter: boolean = false;

    public bsForm = this.formBuilder.group({
        state: ''
    });

    // data
    public balance;

    constructor(
        private router :Router,
        private pointStore: PointStore,
        private appService: AppService,
        public activateRouter: ActivatedRoute,
        private formBuilder: FormBuilder,
        private auth: AuthService,
        alert: BSAlertService) {
        super(pointStore, router, activateRouter, alert);
        this.initMobileList();   
    }  

    initMobileList() {
        if (!this.appService.isMobile()) {
            return;
        }

        let params = {
            limit: 10,
            offset: 0,
            sortAsc: false,
            sortBy: "regist_date"
        };
        this.usePageLocationParams = false;
        //this.initDatatableParams(params);
        this.reloadItems(params);
    }

    initController(config: any) {
        console.log("PointHistoryPageComponent::initController command=", config);
        // config
        // let config: any = {
        //     store: {
        //         command: this.datatableStore.command,
        //     },
        //     title: ''
        // };
        this.loadBalance();
        config.usePageLocationParams = false;
        config.displayNoticeListAtTop = false;
        return config;
    }

    reloadItems(dataTableParams?: any) {
        this.isQueryFormRequest = false;        
        super.reloadItems(dataTableParams);
    }
    
    reloadWithQuery(newQuery: any) {
        this.isQueryFormRequest = true;
        
        // 종료일 검색 쿼리 안되서 하드 코딩 함
        // if (newQuery['start_date[max]']) {
        //     newQuery['end_date[max]'] = newQuery['start_date[max]'];
        //     delete newQuery['start_date[max]'];
        // }
        //!!
        super.reloadWithQuery(newQuery);
    }

    loadBalance() {
        // this.pointStore.getBalance().subscribe(resp => {
        //     this.balance = resp;
        // });
    }

    onClickPopup(type) {
        if(type == 'exchange') {
            this.isShowExchangePopup = true;
        } else if(type == 'draw') {
            this.isShowDrawPopup = true;
        }
    }

    //mobile  
    onClickLoad10MoreItems() {
        console.log('onClickLoad5MoreItems dataTableParams =>', this.dataTableParams);
        let params = this.dataTableParams; //{limit: 5, offset: 0, sortAsc: false, sortBy: 'product_seq'}
        params.offset = 0;
        params.limit = parseInt(params.limit) + 10;
        this.reloadItems(params);
    }

    onClickSearchFilter() {
        this.isShowSearchFilter = true;
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
            'regist_date[max]': null,
            'regist_date[min]': null
            // 'end_date[min]': null
        }
        this.bsForm.patchValue(filter);
    }

    onSubmit(filter) {
        this.isShowSearchFilter = false;
        this.reloadWithQuery(filter);
    }
}
