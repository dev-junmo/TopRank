import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSApi } from '../../common/core/bs-api';
import { BSDatatableStore, DataTableParams } from '../../common/framework/index';

@Injectable()
export class ProductStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('product/product'); 
    }

    getDetail(seq) {
        return this.api.get(this.command + '/get/detail/'+seq, {});
    }

    // hasProduct(goodsSeq, keyword) {
    //     let params = {
    //         goods_seq: goodsSeq,
    //         keyword: keyword,
    //         //member_seq: memberSeq,   
    //     }
    //     return this.api.get(this.command + '/get/query', params);
    // }

    getGoodsList() {
        return this.api.get('product/goods/get/member');
    }

    setEnabled(productSeq, enabled: boolean) {
        if (!productSeq) { return; }
        let params = {
            enabled: enabled? 'Y': 'N'
        }
        return this.api.put(this.command + '/' + productSeq, params);
    }

    setIsAutoExtension(productSeq, isAutoExtension: boolean) {
        if (!productSeq) { return; }
        let params = {
            auto_extension: isAutoExtension? 'Y': 'N'
        }
        return this.api.put(this.command + '/' + productSeq, params);
    }

    setIsAutoExtensionPriority(productSeq, isAutoExtensionPriority: boolean) {
        if (!productSeq) { return; }
        let params = {
            is_auto_extension_priority: isAutoExtensionPriority? 'Y': 'N'
        }
        return this.api.put(this.command + '/' + productSeq, params);
    }
}
