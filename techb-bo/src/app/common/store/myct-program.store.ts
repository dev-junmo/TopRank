import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';

@Injectable()
export class MyctProgramGoodsStore  {

    constructor(public api: BSApi) {}

    delProgram(id) {
        return this.api.delete('admin/etc/banner/goods/' + id);
    }

    registProgram(data , bannerSeq) {
        let params = {
            banner_goods  : [{
            goods_seq : data.goods_seq,
            banner_seq : bannerSeq
            }]
        };
        return this.api.post('admin/etc/banner/goods', params);
    }

    getProgramList(id) {
        return this.api.get('admin/etc/banner/mycity/original/' + id);
    }
}
