import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
//import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class TreeStore extends BSBaseStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/category');
    }

    loadData(id){
        return this.api.get(this.command + '/tree/' + id);
    }

    getChildrenData(id){
        return this.api.get(this.command + '/tree/' + id);
    }

    create(data){
        return this.api.post(this.command + '/tree' , data);
    }
    delete(id) {
        return this.api.delete(this.command + '/tree/' + id);
    }

    moveTree(id, moveData) {
        console.log(moveData);
        let params = {}
        if(moveData.parent.virtual){
            params = {
                ref: 2,
                position: moveData.index,
                is_copy: 0
            };
        } else {
            params = {
                ref: parseInt(moveData.parent.id),
                position: moveData.index,
                is_copy: 0
            };
        }
        console.log(params);
        return this.api.put(this.command + '/tree/' + id , params);
    }
    ///////////

    getData(category_id){
        return this.api.get(this.command + '/category/' + category_id);
    }

}
