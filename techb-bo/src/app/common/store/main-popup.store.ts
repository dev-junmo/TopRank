import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class MainPopupStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/popup');
    }

    changeUseStatus(seq , use_status) {
        let params =  {
            use_status: use_status,
            popup_seq: [seq]
        }
        return this.api.put(this.command , params)
    }
}
