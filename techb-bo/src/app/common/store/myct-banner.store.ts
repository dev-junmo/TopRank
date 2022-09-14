import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class MyctBannerStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/mycity/promotion');
    }
    
    // delete(id) {
    //     //seq로 삭제
    //     return this.api.delete(this.command + '/' + id);
    // }

    changeShowHide(seq , item) {
        let param = {
            "use_status": item.use_status,
            "promotion_seq": [
                seq,
            ],
            "type": "state"
        };
        return this.api.put(this.command , param)
    }
}
