import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSApi } from '../../common/core/bs-api';
import { BSDatatableStore, DataTableParams } from '../../common/framework/index';

@Injectable()
export class PointChargeStore extends BSDatatableStore {
    constructor(api: BSApi) {
        super(api);
        this.init('point/point-charge'); 
    }

    // get(){
    //     let params = {
    //         'order[0][column]' : 'position',
    //         'order[0][dir]' : 'asc'
    //     }
    //     return this.api.get(this.command  , params);
    // }

    // delete(id) {

    //     //seq로 삭제
    //     return this.api.delete(this.command + '/' +id);
    // }
}
