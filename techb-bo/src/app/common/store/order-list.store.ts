import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class OrderListStore extends BSDatatableStore {

    constructor(public api: BSApi){
        super(api);
        this.init('admin/order/order');
    }

}
