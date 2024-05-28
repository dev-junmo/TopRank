// basic
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

import { SendSMSCreatePopupService } from '../../../../../providers/popups/send-sms-create.popup';
import { SendEmailCreatePopupService } from '../../../../../providers/popups/send-email-create.popup';

import { MemberListStore } from '@app/common/store/member-list.store';

@Component({
  selector: 'member-list-page',
  templateUrl: './member-list.page.html',
  styleUrls: ['./member-list.page.css']
})
export class MemberListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    constructor(
        public memberListStore: MemberListStore,
        private sendSMSCreatePopupService: SendSMSCreatePopupService,
        private sendEmailCreatePopupService: SendEmailCreatePopupService,
        //loading: Ng4LoadingSpinnerService,
        protected router: Router,
        alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modal: BSModalService,
        ) {
        super(memberListStore, router, activateRouter, alert);

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




    //카카오톡 수동발송
    onClickSendSMS() {
        this.sendSMSCreatePopupService.popup(null);
    }

    //이메일 수동발송
    onClickSendEmail() {
        this.sendEmailCreatePopupService.popup(null);
    }

    ////////////////////////////////////////////////////
    // 엑셀다운로드

    ////////////////////////////////////////////////////
    // 검색 다운로드

    onClickSearchDownloadExcel() {

        console.log('onClickSearchDownloadExcel query =>', this.query);
        this.memberListStore.downloadExcel(null, this.query);
    }

    ////////////////////////////////////////////////////
    // 선택 다운로드

    onClickSelectDownloadExcel(event) {

        if (!event.rows || event.rows.length == 0) {
            this.alert.show("다운로드 할 항목을 선택해주세요.");
            return;
        }

        // if (event.rows.length > 20) {
        //     this.alert.show("'선택다운로드'는 최대 20개까지만 가능합니다.<br>더 많은 리스트를 원하시면 '검색다운로드'를 이용해주세요.");
        //     return;
        // }

        let memberSeqs = [];
        for(let row of event.rows) {
            memberSeqs.push(row.item.member_seq);
        }

        this.memberListStore.downloadExcel(memberSeqs, null);
    }
}

