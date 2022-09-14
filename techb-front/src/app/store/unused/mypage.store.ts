import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';
import { AppService } from '../../common/service/app.service';

@Injectable()
export class MypageStore extends BSBaseStore {
    //myPurchaseMobileGoodsSlideConfig

    constructor(private api: BSApi,
        public appService: AppService) {
        super(api, 'front/mypage');
    }

    get() {
        return this.api.get(this.command+ '?view=' + this.appService.getDevice());
    }

    getPoint() {
        return this.api.get('cjone/point?view=' + this.appService.getDevice());
    }
}
