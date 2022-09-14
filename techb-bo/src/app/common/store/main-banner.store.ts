import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class MainBannerStore extends BSDatatableStore {

    constructor(api: BSApi) {
        super(api);
        this.init('admin/etc/banner/main');
    }

    // changePosition(seqs, postions) {
    //     let param = {
    //         "type": 'position',
    //         "banner_seq": seqs,
    //         "position": postions
    //     };
    //     return this.api.put(this.command, param);
    // }

    // changeShowHide(seq , use_status) {
    //     let param = {
    //         use_status: use_status,
    //         banner_seq: [seq],
    //         "type": 'state'
    //     };
    //     return this.api.put(this.command, param);
    // }
}
