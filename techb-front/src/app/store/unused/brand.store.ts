import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class BrandStore  extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'shop/brand/brand');
    }

    getBrand(params) {
        return this.api.get(this.command, params);
    }

    setFavoriteBrand(params) {
        return this.api.post('member/memberbrand', params);
    }

    deleteFavoriteBrand(brandId) {
        return this.api.delete('member/memberbrand/' + brandId );
    }

    setFavoriteMiniShop(params) {
        return this.api.post('member/memberminishop', params);
    }

    deleteFavoriteMiniShop(miniId) {
        return this.api.delete('member/memberminishop/' + miniId );
    }

    //call mobile all brand
    getAllBrand() {
        let params = {
            'view' : 'mobile'
        }
        return this.api.get('front/brand', params);
    }


}
