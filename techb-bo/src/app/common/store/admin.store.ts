import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class AdminStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/manager/manager');
    }

    getChannelStatus(channelId) {
        return this.api.get('live/status/' + channelId);
    }


    // get(id){
    //     return this.api.get(this.command + '/' + id , {})
    //     .map(res => res.json());
    //     // return this.api.get(this.command);
    // }
    loadManagerLog(id){
        return this.api.get("admin/log/managerlog?manager_seq=" + id , {});
        //.map(res => res.json());
        // return this.api.get(this.command);
    }
    loadHistoryLog(id){
        return this.api.get("admin/manager/manageractionhistory?manager_seq="  + id , {});
        //.map(res => res.json());
        // return this.api.get(this.command);
    }
    // updateAdmin(id,value){
    //     return this.api.put(this.command + '/' + id , value)
    //     .map(res => res.json());
    //     // return this.api.get(this.command);
    // }


    // delete(id) {

    //     //seq로 삭제
    //     return this.api.delete(this.command + '/boardmanager/' + id);
    // }

    // create(item){
    //     return this.api.post(this.command, item);
    // }

    // updateInfo(seq) {
    //     return this.api.get('admin/manager/manager/my/' + seq);
    // }
}
