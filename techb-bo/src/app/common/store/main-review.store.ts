import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class MainReviewStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/goodsreview');
    }
    
    // delete(id) {
    //     //seq로 삭제
    //     return this.api.delete(this.command + '/' + id);
    // }
    changeUseStatus(seq , use_status) {
        let param = {
            "use_status": use_status,
            "goodsreview_seq": [
                seq,
            ],
            "type": "state"
        };
        return this.api.put(this.command , param)
    }
}
