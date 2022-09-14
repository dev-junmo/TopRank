import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class ProductListStore extends BSDatatableStore {

    constructor(public api: BSApi){
        super(api);
        this.init('admin/product/product');
    }

    // 승인
    confirm(productSeq) {
        let params = {
            state: 'confirm'
        };
        return this.api.put(this.command + '/confirm/' + productSeq, params);
    }

    // 취소
    cancel(productSeq) {
        let params = {
            state: 'cancel'
        };
        return this.api.put(this.command + '/cancel/' + productSeq, params);
    }

    //시용여부
    setEnabled(productSeq, enabled: boolean) {
        if (!productSeq) { return; }
        let params = {
            enabled: enabled? 'Y': 'N'
        }
        return this.api.put(this.command + '/' + productSeq, params);
    }

    //자동연장여부
    setIsAutoExtension(productSeq, isAutoExtension: boolean) {
        if (!productSeq) { return; }
        let params = {
            auto_extension: isAutoExtension? 'Y': 'N'
        }
        return this.api.put(this.command + '/' + productSeq, params);
    }

    //자동연장우선순위여부
    setIsAutoExtensionPriority(productSeq, isAutoExtensionPriority: boolean) {
        if (!productSeq) { return; }
        let params = {
            is_auto_extension_priority: isAutoExtensionPriority? 'Y': 'N'
        }
        return this.api.put(this.command + '/' + productSeq, params);
    }
}
