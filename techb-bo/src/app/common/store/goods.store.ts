import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class GoodsStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/goods');
    }

}
