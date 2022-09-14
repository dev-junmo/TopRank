import { Injectable } from '@angular/core';
import { BSApi } from '../../common/core/bs-api';

@Injectable()
export class DashboardStore  {

    constructor(public api: BSApi) {}

    getUsingGoods() {
        return this.api.get('member/display/using-goods');
    }
}
