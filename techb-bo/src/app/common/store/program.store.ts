import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class ProgramStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/shop/program/');
    }


    loadData(id){
        return this.api.get(this.command + 'tree/' + id);
    }
    
    loadList(){
        return this.api.get(this.command + 'program' , {});
        // return this.api.get(this.command);
    }
       
    create(data){
        return this.api.post(this.command + 'tree' , data);
    }

    delete(id) {
        return this.api.delete(this.command + 'program/' + id);
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
        return this.api.put('admin/shop/program/tree/' + id , params);
    }

    sceneGoods(seq, page){
        let params = {
            page : page
        }
        return this.api.get('admin/shop/program/scene_goods/' + seq , params);

    }

    
    goodsProgram(){
        return this.api.get(this.command + 'program/children');
    }

    getChildren(id){
        return this.api.get(this.command + 'program/children/' + id);
    }

    // 그장명그아이템 api에 연결된 프로그램
    getProgramsSceneGoods() {
        return this.api.get('admin/shop/program/scene_goods', { 
            'order[0][column]': 'seq',
            'order[0][dir]': 'DESC'
        });
    }
}
