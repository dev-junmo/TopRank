import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class MyctBestGoodsStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/mycity/best');
    }
    
    // delete(id) {
    //     //seq로 삭제
    //     return this.api.delete(this.command + '/' + id);
    // }

    changeShowHide(seq, use_status) {
        let param = {
            "use_status": use_status,
            "best_seq": [
                seq,
            ],
            "type": "state"
        };
        return this.api.put(this.command , param);
    }
}
