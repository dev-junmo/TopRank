import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class GoodsSubInfoStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/shop/goods/goodssubinfo');
    }

    // get() {
    //     //seq로 삭제
    //     return this.api.get(this.command);
    // }

    // makeGoodsCode() {
    //     // alert("makeGoodsCode");
    //     return this.api.post('admin/shop/goods/goods/tmp_code' , {});
    // }


    //////////////////////////////////////////////////////////
    //

    // getGoodsInfoList() {

    //     return this.api.get('admin/shop/goods/goodsinfo');
    // }

    // deleteGoodsInfo(id) {
    //     return this.api.delete('admin/shop/goods/goodsinfo/' + id);
    // }


}
