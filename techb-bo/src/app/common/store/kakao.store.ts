import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';

@Injectable()
export class KakaoStore {

    constructor(public api: BSApi) {}

    getKakaoTemplate() {
        return this.api.get('admin/common/kko');
    }
    

}
