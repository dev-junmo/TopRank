import { Injectable } from '@angular/core';
import { BSApi } from '@bricks/common/core/bs-api';

//import { BSApi } from '@bricks/common/core/bs-api';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class BSBaseStore {
    // command + method + id

    public command: string;
    public getMethod: string;
    public putMethod: string;
    public id: string;

    public seq: string;

    constructor(public api: BSApi) {
        console.log('BSBaseStore::constructor api = ', this.api);
    }

    public init(command: string, id?: string) {
        this.command = command;
        if (this.id) {
            this.id = id;
        }
    }

    public setCommand(command: string) {
        console.assert(command);
        this.command = command;
    }

    create(params: any) {
        console.log("BSBaseStore::create id, params =", params);
        return this.api.post(this.command, params);
    }

    get(id, params?: any) {
        let url = this.command;
        if (this.getMethod) {
            url += '/' + this.getMethod;
        }
        if (id) {
            url += '/' + id;
        }

        return this.api.get(url, params);
    }

    list() {
        return this.api.get(this.command);
    }

    update(id, params: any) {
        console.log("BSBaseStore::update id, params =", this.id, params);
        let url = this.command;
        if (this.putMethod) {
            url += '/' + this.putMethod;
        }
        if (id) {
            url += '/' + id;
        }
        return this.api.put(url, params);
    }

    delete(id) {
        console.log("BSBaseStore::delete id, params =", this.id);
        let url = this.command;
        if (id) url += '/' + id;
        return this.api.delete(url);
    }

    // updateInfo(seq) {
    //     return this.api.put('admin/manager/manager/my/' + seq);
    // }
}
