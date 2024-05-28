// basic
import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter , TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';



// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';




// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { MemberListStore } from '@app/common/store/member-list.store';

@Component({
  selector: 'modal-member-list-page',
  templateUrl: './modal-member-list.page.html',
  styleUrls: ['./modal-member-list.page.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ModalMemberListPage extends BSDatatableController {

    @Input() multiSelect: boolean = false;
    @Output() selectedMember = new EventEmitter<string>();
    @ViewChild(DataTable) dataTable: DataTable;

    public rowTooltip;
    //////////////////////////////////////////
    /////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    public selectSeq;

    constructor(
        public memberListStore : MemberListStore,
        protected router: Router,
        alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modal: BSModalService,
        ) {
        super(memberListStore, router, activateRouter, alert);


    }

    initController(config: any) {

        console.log("BSUpdateFormController::initController command=", config);
        //{{baseUrl}}/common/config/basic

        config.store.command = 'admin/member/member';
        config.usePageLocationParams = false;

        return config;
    }

    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }

    onClickMember(item){

        this.selectSeq = item.member_seq;
        this.selectedMember.emit(item);
    }

    public getSelectedMembers() {

        console.log("getSelectedMembers =>", this.dataTable.selectedRows);

        let members = [];
        for(let row of this.dataTable.selectedRows) {
            members.push(row.item);
        }

        return members;
    }

    //selectedMember

}

