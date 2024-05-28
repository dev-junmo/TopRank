import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class PointChargeStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/point/point-charge');
    }

    complete(chargePointSeq, memberSeq, chargePoint, freePoint, paymentTotalPrice) {
        let params = {
            member_seq: memberSeq, 
            charge_point: chargePoint, 
            charge_free_point: freePoint,
            payment_total_price: paymentTotalPrice
        };
        return this.api.put(this.command + '/complete/' + chargePointSeq, params);
    }

    cancel(chargePointSeq) {
        let params = {
        };
        return this.api.put(this.command + '/cancel/' + chargePointSeq, params);
    }

    expireAll() {
        let params = {
        };
        return this.api.put(this.command + '/expire-all', params);
    }
}
