import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class DisplayMainStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/maindisplay');
    }
    
    delete(id) {
        //seq로 삭제
        return this.api.delete(this.command + '/' + id);
    }
    changeShowHide(seq , show_status) {
        return this.api.put(this.command +'/show/seq/'+ seq , {show_status : show_status})
    }
    
}
