import { BSApi } from '../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

import 'rxjs/add/operator/map';
import { Subject, Observable } from 'rxjs/Rx';
import { AppService } from '../common/service/app.service';

@Injectable()
export class MockStore extends BSBaseStore {
    
    constructor(public api: BSApi) {
        super(api, '');
    }

    get() {
        return this.api.get('mock');
    }
}
