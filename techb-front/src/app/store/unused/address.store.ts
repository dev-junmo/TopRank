import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class AddressStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'member/address');
    }



    // delete(id) {

    //     //seq로 삭제
    //     return this.api.delete(this.command + '/boardmanager/' + id);
    // }
    list(page = 1, limit = 5) {

        let params: any = {
            'order[0][column]' : 'default',
            'order[0][dir]' : 'desc',
            'order[1][column]' : 'regist_date',
            'order[1][dir]' : 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };
        return this.api.get(this.command + '/often' , params);
    }

    get(params) {
        return this.api.get(this.command , params);
    }
    getItem(id) {
        return this.api.get(this.command + '/' + id );
    }
    setAddress(id) {
        let params = '';
        return this.api.put(this.command + '/default/' + id , params);
    }
    create(item) {
        return this.api.post(this.command + '/often' , item);
    }
    update(id, item) {
        return this.api.put(this.command + '/' + id , item);

    }
    delete(id) {
        return this.api.delete(this.command + '/' + id);
    }

    loadRecent(){
        return this.api.get('shop/mypage/order/recent_address');
    }

    getLately() {
        return this.api.get('member/address/lately');
    }
}
