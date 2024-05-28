import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class TicketStore  extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'shop/mypage/order/order_catalog');
    }


    list(page = 1, limit = 5, sDate?, eDate?, filter?) {

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

        switch (filter) {
            case 'request': {
                params['steps[]'] = '15';
                break;
            }
            case 'complete': {
                params['steps[]'] = '25';
                break;
            }
            case 'ready': {
                params['steps[]'] = '55';
                params['socialcp_confirm'] = 'N';
                break;
            }
            case 'used': {
                params['steps[]'] = '55';
                params['socialcp_confirm'] = 'Y';
                break;
            }
            case 'cancel': {
                params['steps[]'] = '85';
                break;
            }
        }

        params['ticket'] = 'Y';

        return this.api.get(this.command, params);
    }

    get(seq){

        return this.api.get('shop/mypage/order/order_view?ticket=Y&order_seq='+ seq);
    }


}
