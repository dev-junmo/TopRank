import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class ProgramBannerStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/program');
    }
    
    delete(id) {

        //seq로 삭제
        return this.api.delete(this.command + '/' +id);
    }
    
    update(id , params) {
        return this.api.put('admin/etc/banner/program/' + id,  params);
    }
    


}
