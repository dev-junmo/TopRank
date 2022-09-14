import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class EMoneyStore  extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'member/emoney');
    }


    list(page = 1, limit = 5, sDate?, eDate?,  type?) {

        let params: any = {
            'order[0][column]' : 'regist_date',
            'order[0][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (sDate) {
            params['regist_date[min]'] = sDate;
        }

        if (eDate) {
            params['regist_date[max]'] = eDate;
        }

        if (type) {
            params['use_type'] = type;
        }

        return this.api.get(this.command, params);
    }
}
