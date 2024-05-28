import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class OrderStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('order/order');
    }

}
