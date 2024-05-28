import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class MainStarGoodsStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/stargoods');
    }

    // delete(id) {
    //     //seq로 삭제
    //     return this.api.delete(this.command + '/' + id);
    // }

    changeUseStatus(seq , item) {
        let params =  {
            use_status: item.use_status,
            stargoods_seq: [seq],
            "type":'state'
        }

        return this.api.put(this.command , params)
    }
}
