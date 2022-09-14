import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class GradeStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/member/member_group');
    }
    
    
    delete(id) {

        //seq로 삭제
        return this.api.delete(this.command + '/boardmanager/' + id);
    }

    create(item){
        return this.api.post(this.command, item);
    }

    lostGradeList() {
        return this.api.get(this.command, );

    }

    loadGradeitem(id) {
        console.log(id);
        return this.api.get(this.command +'/'+ id );

    }

}
