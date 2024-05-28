import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class NewStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/common/new');
    }

    get() {
        return this.api.get("admin/common/config/goods");
    }

    icon(day) {
        let params = {
            new_icon  : day
        }

        return this.api.put(this.command + '/icon' , params);
    }

    category(day) {
        let params = {
            new_category : day
        }

        return this.api.put(this.command + '/category', params);
    }
}
