import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class BrandStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/brand');
    }


    get(id){
        return this.api.get(this.command + '/tree/' + id , {});
        // return this.api.get(this.command);
    }

    loadList(){
        return this.api.get(this.command + '/brand' , {});
        // return this.api.get(this.command);
    }

    create(data){
        return this.api.post(this.command + '/tree' , data);
    }
    delete(id) {
        return this.api.delete(this.command + '/brand/' + id);
    }

    moveTree(id,moveData){
        console.log(moveData);
        let params = {}
        if(moveData.parent.virtual){
          params = {ref:2, position: moveData.index,is_copy: 0};
        } else {
          params = {ref:parseInt(moveData.parent.id), position: moveData.index,is_copy: 0};
        }
        console.log(params);
        return this.api.put('admin/brand/tree/' + id , params);
    }



    goodsBrand(){
        return this.api.get(this.command + '/brand/children');
    }

    getChildren(id){
        return this.api.get(this.command + '/brand/children/' + id);
    }
    // delete(id) {

    //     //seq로 삭제
    //     return this.api.delete(this.command + '/boardmanager/' + id);
    // }


    // create(item){
    //     return this.api.post(this.command, item);
    // }
}
