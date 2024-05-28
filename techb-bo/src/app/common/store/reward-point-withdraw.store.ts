import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class RewardPointWithdrawStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/point/reward-point-withdraw');
    } 
    
    complete(seq) {
        return this.api.put(this.command + '/complete/'+ seq, {});
    }    
}
