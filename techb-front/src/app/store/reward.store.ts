import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSApi } from '../../common/core/bs-api';
import { BSDatatableStore, DataTableParams } from '../../common/framework/index';

@Injectable()
export class RewardStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('point/reward-point'); 
    }
    //리워드 포인트
    getBalance() {
        return this.api.get(this.command + '/balance');
    }
    //전환
    exchangePoint(point) {
        return this.api.post(this.command + '/exchange', {exchange_point: point});
    }
    //인출
    withdrawalPoint(params) {
        return this.api.post('point/reward-point-withdraw', params);
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
