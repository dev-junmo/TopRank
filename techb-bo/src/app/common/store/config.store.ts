import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class ConfigStore extends BSBaseStore {

    constructor(api: BSApi) {
        super(api);
        this.command = 'admin/common/config';
    }

    reloadCS(){
        return this.api.get(this.command + "/cs", {});
        //.map(res => res.json());
        // return this.api.get(this.command);
    }
    updateCS(value){
        console.log("store" , value);
        return this.api.put(this.command + "/cs", value);
        //.map(res => res.json());
    }

    reloadBasic(){
        return this.api.get(this.command + "/basic" , {});
        //.map(res => res.json());
        // return this.api.get(this.command);
    }
    // updateBasic(value){
    //     console.log("store" , value);
    //     return this.api.put(this.command + "/basic", value)
    //     .map(res => res.json());
    // }

    reloadSearch(){
        return this.api.get(this.command + "/search" , {});
        //.map(res => res.json());
        // return this.api.get(this.command);
    }

    // reloadSearchWord(page){
    //     return this.api.get('etc/searchword?page='+ page, {})
    //     .map(res => res.json());
    //     // return this.api.get(this.command);
    // }

    // updateSearchWord(page,value){
    //     return this.api.put('etc/searchword/'+ page,value)
    //     .map(res => res.json());
    // }

    reloadGrade() {
        return this.api.get(this.command + "/grade_clone" , {})
        .map(res => res.json());
    }
    // delete(id) {

    //     //seq로 삭제
    //     return this.api.delete(this.command + '/boardmanager/' + id);
    // }

    // create(item){
    //     return this.api.post(this.command, item);
    // }

}
