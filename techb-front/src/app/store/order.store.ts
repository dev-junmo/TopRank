import { BSApi } from '../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

import 'rxjs/add/operator/map';
import { Subject, Observable } from 'rxjs/Rx';

import { AppService } from '../common/service/app.service';
import { BSDatatableStore, DataTableParams } from '../../common/framework/index';

// #todo : cart와 나중에 분리하기

@Injectable()
export class OrderStore extends BSDatatableStore {
    constructor(public api: BSApi, public appService: AppService) {
        super(api);
        this.init('order/order'); 
    }

    order(params) {
        return this.api.post('order/order',params);
    }

}
