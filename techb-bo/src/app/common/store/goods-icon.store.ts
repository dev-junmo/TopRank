import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class GoodsIconStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/shop/goods/icon');
    }

    get(){
        // order[0][column]=position&order[0][dir]=asc
        let params = {
            'order[0][column]' : 'position',
            'order[0][dir]' : 'asc'
        }
        return this.api.get(this.command  , params);


    }

    delete(id) {

        //seq로 삭제
        return this.api.delete(this.command + '/' +id);
    }


    batchIcon(params) {

        return this.api.put('admin/shop/goods/goods_batch' , params);
    }
}
