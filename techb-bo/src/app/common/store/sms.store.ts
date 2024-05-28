import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

@Injectable()
export class SMSStore {

    constructor(public api: BSApi) {

    }

    sendSMS(params) {
        return this.api.post('admin/etc/msg/kko' , params);
    }
}
