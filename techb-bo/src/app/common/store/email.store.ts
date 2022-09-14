import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

@Injectable()
export class EmailStore {

    constructor(public api: BSApi) {

    }

    sendEmail(params) {
        return this.api.post('admin/etc/email' , params);
    }

    deleteEmail(params) {
        console.log(params);
        return this.api.delete('admin/log/logemail' , params);
    }
}
