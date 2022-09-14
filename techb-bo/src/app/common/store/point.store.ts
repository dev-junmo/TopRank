import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class PointStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/point/point');
    }

    insert(params) {
        // let params = {
        //     point_type: point_type,
        //     amount: amount,
        //     member_seq: member_seq,
        //     memo: memo
        // }
        return this.api.post('admin/point/point', params);
    }

    expiration() {
        return this.api.put('admin/point/point/expiration', {});
    }   

    
}
