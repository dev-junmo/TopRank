import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Injectable()
export class ProviderStore extends BSDatatableStore {

    constructor(public api: BSApi,
        public appConfig: AppConfigService,) {
        super(api);
        this.init('admin/provider/provider');
    }

    get(id, includeMainCompany: boolean = true) {

        let params = {};
        if (includeMainCompany) {
            params = {
                no_company: 'Y'
            }
        }

        return this.api.get(this.command + '/' + id , params);
    }

    listAll(includeBasicCompany: boolean = false) {

        let params = { no_company: 'Y'};
        if (includeBasicCompany == true) {
            params.no_company = 'N';
        }
        return this.api.get(this.command, params).map(res => {
            res.list.sort((a, b)=> { return a.provider_name.localeCompare(b.provider_name); });
            console.log('listAll::map res =>', res);
            return res;
        });
    }

    search(providerName) {
        if(!providerName || providerName.length == 0) {
            return;
        }
        providerName = providerName.trim();
        return this.api.get(this.command, { no_company: 'Y', provider_name: providerName});
    }

    confirmDuplication(id) {
        let params = {
            id : id
        }
        return this.api.get(this.command + '/' + 'check_id' , params);
    }

    // confirmMemberDuplication(id) {
    //     return this.api.get(this.command + '/' + 'check_id' , { id: id});
    // }

    ///////////////////////////////////////////////////////////////
    // provider members

    private commandMember = 'admin/provider/provider_member';

    getMembers(seq) {
        return this.api.get(this.commandMember, { provider_seq: seq});
    }

    removeMembers(seq) {
        return this.api.delete(this.commandMember + '/' + seq, {});
    }

}

