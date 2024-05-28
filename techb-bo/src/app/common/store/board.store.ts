import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class BoardStore extends BSDatatableStore {

    constructor(public api: BSApi, 
        ) {
        super(api);
        this.init('admin/board/boardmanager');
    }

    // getBoard(id){
    //     return this.api.get(this.command+'/'+ id);
    // }
    create(item){
        return this.api.post(this.command, item);
    }

    delete(id) {

        //seq로 삭제
        return this.api.delete(this.command + '/boardmanager/' + id);
    }  

    
}
