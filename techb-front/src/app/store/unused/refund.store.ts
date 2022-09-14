import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';


@Injectable()
export class RefundStore extends BSBaseStore {

    constructor(public api: BSApi) {
        super(api, 'member/refundaccount');
    }

    // delete(id) {

    //     //seq로 삭제
    //     return this.api.delete(this.command + '/boardmanager/' + id);
    // }
    get() {
        return this.api.get(this.command);
    }
    create(item){
        return this.api.post(this.command, item);
    }
    delete() {
        return this.api.delete(this.command);
    }
}
