import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class MainSceneGoodsStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/scene_goods');
    }

    // delete(id) {
    //     //seq로 삭제
    //     return this.api.delete(this.command + '/' + id);
    // }

    update(seq , use_status) {
        let params =  {
            use_status: use_status,
            scene_goods_seq: [seq],
            "type":'state'
        }
        return this.api.put(this.command , params)
    }
}
