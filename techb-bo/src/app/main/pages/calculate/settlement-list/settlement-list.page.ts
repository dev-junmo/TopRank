// basic
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';
import { AppConfigService } from '@app/providers/service/app-config.service';

import { SaleStore } from '../../../../common/store/sale.store';

import * as moment from 'moment';

@Component({
  selector: 'settlement-list-page',
  templateUrl: './settlement-list.page.html',
  styleUrls: ['./settlement-list.page.css']
})
export class SettlementListPage extends BSDatatableController {
    
    @ViewChild('bsDatatable', {read: ElementRef}) dataTableEl1: ElementRef;
    @ViewChild('bsDatatable2', {read: ElementRef}) dataTableEl2: ElementRef;
    @ViewChild('bsDatatable2') dataTable2: DataTable;

    public allStatus:any = {
        request_status: '',
        account_status: ''
    };

    private enableEvent1: boolean = true;
    private enableEvent2: boolean = true;

    private timer1;
    private timer2;
    // constructor(el: ElementRef) {
    //     this.elementref = el;
    // }

    constructor(
        element: ElementRef,
        public datatableStore: BSDatatableStore,
        protected router: Router,
        alert: BSAlertService,
        private saleStore: SaleStore,
        activateRouter: ActivatedRoute,
        public appConfig: AppConfigService,


        ) {
        super(datatableStore, router, activateRouter, alert);

        //console.log('element.nativeElement =>', element.nativeElement);
        // this.saleStore.getMaster().subscribe(resp => {
        //     this.master = resp;
        //     console.log("SaleListPage::initController master =>", this.master);
        // });
    }

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);
        config.store.command = 'admin/account/account/master';

        // 초기에 파라미터 변화로 로딩이 진행되는데 그러면 안되서 수정함
        config.usePageLocationParams = false;
        config.initialLoad = false;

        this.syncScrollEventTables();

        return config;
    }

    syncScrollEventTables() {
        console.log('syncScrollEventTables dataTableEl1 =>', this.dataTableEl1.nativeElement.children[0].children[1]);
        console.log('syncScrollEventTables dataTableEl2 =>', this.dataTableEl2.nativeElement.children[0].children[1]);

        // $('#test1').onscroll = function() { document.getElementById('test2').scroll(0, document.getElementById('test1').scrollTop);}

        let el1, el2;
        if (this.dataTableEl1.nativeElement.children[0].children[1]) {
            el1 = this.dataTableEl1.nativeElement.children[0].children[1];
        }
        if (this.dataTableEl2.nativeElement.children[0].children[1]) {
            el2 = this.dataTableEl2.nativeElement.children[0].children[1];
        }

        console.log('syncScrollEventTables el1, el2 =>', el1, el2);

        if (el1 && el2) {
            el1.addEventListener("scroll", (event) => {

                if (!this.enableEvent1) {
                    return;
                }

                event.stopPropagation();
                event.preventDefault ();

                this.enableEvent2 = false;

                // set timer                
                if (this.timer1) {
                    clearTimeout(this.timer1);
                    this.timer1 = null;                    
                }
                this.timer1 = setTimeout(() => {
                    this.enableEvent2 = true;                   
                }, 100);

                el2.scroll(0, el1.scrollTop);
             
                event.stopPropagation();
                event.preventDefault ();

                console.log('syncScrollEventTables event, el1.scrollTop =>', event, el1.scrollTop);
            });
            el2.addEventListener("scroll", (event) => {
             
                if (!this.enableEvent2) {
                    return;
                }
                event.stopPropagation();
                event.preventDefault ();
                
                this.enableEvent1 = false;

                // set timer
                if (this.timer2) {
                    clearTimeout(this.timer2);
                    this.timer2 = null;                    
                }
                this.timer2 = setTimeout(() => {
                    this.enableEvent1 = true;                   
                }, 100);                

                el1.scroll(0, el2.scrollTop);

                event.stopPropagation();
                event.preventDefault ();
                console.log('syncScrollEventTables ******************event, el2.scrollTop =>', event, el2.scrollTop);           
            });
        }
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }   
    

    /////////////////////////////
    // 데이타테이블 버튼 클릭 시
    // onClickDetail(id) {
    //     window.open('crm/' + id + '/member', '_blank');
    //     // this.router.navigate(['crm/' + id + '/member']);
    // }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query =>', query);
        this.saleStore.settleDownloadExcel(query);
    }

    // onClickOrderNewWindow(code) {
    //     this.appConfig.openWindowSafeProvider('main/order/order/view/' +  code);
    // }

    onChangedAllRequestStatus(item, temp) {
        item.request_status = temp;
    }

    onChangedAllAccountStatus(item, temp) {
        item.account_status = temp;
    }

    // '기간' 클릭 시
    onClickCalculate(item) {
        let ym = item.account_ym;
        let year = (item.account_ym || '').substring(0, 4);
        let month = (item.account_ym || '').substring(4, 6);
        let url = `main/calculate/calculate/list?account_ym%5Bmin%5D=${ym}&account_ym%5Bmax%5D=${ym}`;
        url += `&account_s_y=${year}&account_s_m=${month}&account_e_y=${year}&account_e_m=${month}`;
        if(item.provider_seq == 1) {
            url += `&provider_seq%5B%5D=${item.provider_seq}`;
        }
        else {
            url += `&provider_seq%5B0%5D=${item.provider_seq}`;
        }
        this.appConfig.openWindowSafeProvider(url);
    }

    // '저장'버튼 클릭 시
    onClickSaveSettlement(item) {
        if(!this.appConfig.isProvider) {
            this.alert.confirmWithInputMessage('저장 하시겠습니까?\n(처리사유 입력: 선택사항)', '확인', '확인', '취소', true).subscribe((resp)=>{
                if (resp !== 'CANCEL') {
                    this.onChangedAccountStatus(item.provider_seq, item.account_ym, item.account_status, resp);
                }
            });
        }
        else {
            this.alert.confirm('저장 하시겠습니까?', '확인', '확인', '취소', true).subscribe((resp)=>{
                if (resp == 'OK') {
                    this.onChangedRequestStatus(item.provider_seq, item.account_ym, item.request_status);
                }
            });
        }
    }

    //
    onChangedAccountStatus(providerSeq, accountYM, status, title = '') {

        //console.log('onChangedAccountStatus value =>', value, this.query.account_ym, this.query.provider_seq);

        let params = {
            title: title,
            items: [{
                account_ym: accountYM,
                account_status: status,
                provider_seq: providerSeq
            }]
        };

        this.saleStore.changeMasterAccountStatus(params).subscribe(resp => {
            this.reloadList();
            this.alert.show('저장되었습니다.');
        });
    }

    //////////////////////////////////////////////////////
    onChangedRequestStatus(providerSeq, accountYM, value) {

        console.log('onChangedRequestStatus value =>', providerSeq, accountYM, value);

        let params = {
            items: [{
                provider_seq: providerSeq,
                account_ym: accountYM,
                request_status: value
            }]
        };

        this.saleStore.changeRequestStatus(params).subscribe(resp => {
            this.reloadList();
            this.alert.show('저장되었습니다.');
        });
    }


    // '일괄적용' 클릭 시
    onClickInputAllSettlement(event, allStatus) {

        console.log('onClickInputAllSettlement =>', this.dataTable.selectedRows, allStatus);

        for(let item of this.items) {

            if(!this.appConfig.isProvider) {
                item.account_status_temp = allStatus.account_status_temp;
                item.account_status = allStatus.account_status_temp;
            }
            else {
                item.request_status_temp = allStatus.request_status_temp;
                item.request_status = allStatus.request_status_temp;
            }
        }
    }


    // onClickSaveStock(item) {
    //     if(!this.appConfig.isProvider) {
    //         this.onChangedAccountStatus(item.provider_seq, item.account_ym, item.account_Status);
    //     }
    //     else {
    //         this.onChangedRequestStatus(item.provider_seq, item.account_ym, item.request_status);
    //     }
    // }

    // 선택 저장 버튼 클릭 시 
    onClickSaveSelectedItem(event) {
        let params = {items: []};

        if(Array.isArray(event.rows)) for(let row of event.rows) {
            let param = {
                title: '',
                provider_seq: row.item.provider_seq,
                account_ym: row.item.account_ym
            };

            if(!this.appConfig.isProvider) {
                param['account_status'] = row.item.account_status;
            }
            else {
                param['request_status'] = row.item.request_status;
            }

            params.items.push(param);
        }

        if(!this.appConfig.isProvider) {
            this.alert.confirmWithInputMessage('저장 하시겠습니까?\n(처리사유 입력: 선택사항)', '확인', '확인', '취소', true).subscribe((resp)=>{
                if (resp !== 'CANCEL') {
                    params['title'] = resp;
                    this.saleStore.changeMasterAccountStatus(params).subscribe(resp => {
                        this.reloadList();
                        this.alert.show('저장되었습니다.');
                    });
                }
            });
        }
        else {
            this.alert.confirm('저장 하시겠습니까?', '확인', '확인', '취소', true).subscribe((resp)=>{
                if (resp == 'OK') {
                    this.saleStore.changeRequestStatus(params).subscribe(resp => {
                        this.reloadList();
                        this.alert.show('저장되었습니다.');
                    });
                }
            });
        }
    }
}

