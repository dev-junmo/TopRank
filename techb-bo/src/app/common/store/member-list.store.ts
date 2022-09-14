import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { AppConfigService } from '../../providers/service/app-config.service';

@Injectable()
export class MemberListStore extends BSDatatableStore {


    constructor(public api: BSApi,
        public appConfig: AppConfigService,
        public alert: BSAlertService) {
        super(api);
        this.init('admin/member/member');
    }

    loadUserData(id?: string){
        if (!id)
            id = this.id;

        return this.api.get(this.command +"/"+ id, {});
        //.map(res => res.json());
        // return this.api.get(this.command);
    }

    // 엑셀 다운로드
    downloadExcel(memberSeqs, queryParams) {

        let params = Object.assign({}, queryParams);

        if (memberSeqs) {

            // if (memberSeqs.length >= 20) {
            //     this.alert.show("'선택다운로드'는 최대 20개까지만 가능합니다.<br>더 많은 리스트를 원하시면 '검색다운로드'를 이용해주세요.");
            // }

            let i = 0;
            for(let memberSeq of memberSeqs) {
                params['member_seq['+ i +']'] = memberSeq;
                i++;

                // 20개 제한
                // if (i >= 20) {
                //     break;
                // }

            }
        }

        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }
        }

        console.log('downloadExcel params =>', p.toString());

        let url = this.appConfig.getSafeProviderUrl( '/admin/member/member/xlsx?');
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

    listOfMemberGroupSales() {
        return this.api.get('admin/member/membergroupsale');
    }

    listOfGroups() {
        return this.api.get('admin/member/membergroup/simple');
    }
}
