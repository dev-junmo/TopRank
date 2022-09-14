import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';

@Injectable()
export class EventStore  {

    constructor(public api: BSApi) {}

    getEventBanner(id, device?) {
        return this.api.get('front/event/' + id + '?view=' + device);
    }
}
