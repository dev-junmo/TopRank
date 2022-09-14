import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class CategoryStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/category/category/children');
    }

    get(){
        return this.api.get(this.command);
    }

    getChildren(category_code){
        return this.api.get(this.command + '/' + category_code);
    }
}
