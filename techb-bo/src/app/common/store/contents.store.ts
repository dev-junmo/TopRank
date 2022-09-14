import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class ContentsStore extends BSDatatableStore {

    private appName = 'sleepy baby';
    private langCode = 'ko';
    constructor(api: BSApi) {
        super(api);
        this.init('content');
    }

    get(id) {
        //seq로 삭제
        return this.api.get(this.command + '/' +id);
    }

    

    goodsUpdate(id, params) {
        return this.api.put('content/' + id , params);
    }

    listAllTags() {
        return this.api.get(`tag?lang=${this.langCode}&app_name=${this.appName}`);
    }

    listAllGroups() {
        return this.api.get(`group`);
    }
}
