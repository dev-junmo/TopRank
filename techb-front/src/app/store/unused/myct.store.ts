import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class MyctStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'front/mycity');
    }


    /////////////////////////////////////////////////////
    // program

    getMyctBanner(device?) {
        return this.api.get(this.command + '?view=' + device);
    }

}
