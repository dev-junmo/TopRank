import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class EventStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/event/event');
    }

    get(id) {
        //seq로 삭제
        return this.api.get(this.command + '/' +id);
    }


    updateDisplay(seq, item) {
        return this.api.put(this.command + '/display/' + seq, item);
    }

    copyEvent(seq) {

        return this.api.post(this.command + '/event_copy/' + seq , {});        
    }

    showHideGift(id , item) {
        return this.api.put('admin/gift/gift/display/' + id , item);
    }
}
