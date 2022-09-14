import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class DashBoardStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        //this.init('admin/dashboard');
        this.init('rawdata');
    }

    get() {
        // let params = {
        //     // 'paging[page]': '1',
        //     // 'paging[limit]': '10',
        //     'order[0][column]' : 'regist_date',
        //     'order[0][dir]': 'desc',
        // }   
        
        // if (!all) {
        //     params['paging[page]'] = '1';
        //     params['paging[limit]']= '10';
        // }
        // return this.api.get(this.command, params);
        return this.api.get(this.command);
    }

    getBoardNoticePopup() {
        return this.api.get('admin/board/boarddata/popup');
    }

}
