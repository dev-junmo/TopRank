import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class MainEventBannerStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/exhibition');
    }

    // delete(id) {
    //     //seq로 삭제
    //     return this.api.delete(this.command + '/' + id);
    // }

    changeUseStatus(seq , use_status) {
        let params =  {
            use_status: use_status,
            exhibition_seq: [seq],
            "type": 'state'
        }
        return this.api.put(this.command , params)
    }
}
