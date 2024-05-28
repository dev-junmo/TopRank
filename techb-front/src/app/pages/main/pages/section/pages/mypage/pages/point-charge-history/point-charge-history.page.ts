import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { BSDatatableController } from '../../../../../../../../../common/framework/bs-datatable.controller';
import { PointChargeStore } from '../../../../../../../../store/point-charge.store';
import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert';
import { getISODayOfWeek } from 'ngx-bootstrap/chronos/units/day-of-week';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'point-charge-history',
    templateUrl: './point-charge-history.page.html',
    styleUrls: ['./point-charge-history.page.css']
})
export class PointChargeHistoryPageComponent extends BSDatatableController {

    public isPointChargeHistory: boolean = true;
    public isShowPaymentInfo: boolean = false;
    public payment_status: string = '입금 대기';    // 미사용 예정
    public selItem: any;

    public isQueryFormRequest: boolean = undefined; 
    public isShowSearchFilter: boolean = false;

    public bsForm = this.formBuilder.group({
        state: ''
    });


    constructor(
        private router :Router,
        private pointChargeStore: PointChargeStore,
        private appService: AppService,
        public activateRouter: ActivatedRoute,
        private formBuilder: FormBuilder,
        private auth: AuthService,
        alert: BSAlertService,
        ) {
            super(pointChargeStore, router, activateRouter, alert);   
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
            sortBy: 'point_charge_seq'
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

    onClickPopup(item) {
        console.log('onClickPopup item =>', item);
        
        this.selItem = item;
        
        this.selItem.nobankbook_expired_date_text = moment(item.nobankbook_expired_date).format('MM/DD(ddd)');

        this.isShowPaymentInfo = true;
    }

    onClickCopyBankInfo(el, bank) {
        console.assert(!bank);
        if (!bank) { return; }
        let bankAccount = bank.bank_name + ' ' + bank.account_num;
        this.appService.copyToClipboard(el, bankAccount);
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
