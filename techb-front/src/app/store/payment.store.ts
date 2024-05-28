import { Injectable } from '@angular/core';
import { BSApi } from '../../common/core/bs-api';

@Injectable()
export class PaymentStore  {

    constructor(public api: BSApi) {}

    //point-charge: bankInfo, free_point, charge_point
    get() {
        return this.api.get('point/point-charge-info');
    }
    
    pointCharge(params) {
        return this.api.post('point/point-charge',params);
    }
   
}
