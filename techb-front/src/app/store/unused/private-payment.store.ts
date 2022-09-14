import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class PrivatePaymnetStore  extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'shop/mypage/person/personal');
    }


    getItems() {
        return this.api.get(this.command);
    }
}
