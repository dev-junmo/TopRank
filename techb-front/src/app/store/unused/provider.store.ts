import { BSApi } from '../../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class ProviderStore extends BSBaseStore {

    constructor(api: BSApi) {
        super(api, 'provider/provider');
    }

    // delete(id) {

    //     //seq로 삭제
    //     return this.api.delete(this.command + '/boardmanager/' + id);
    // }

    // create(item){
    //     return this.api.post(this.command, item);
    // }
}
