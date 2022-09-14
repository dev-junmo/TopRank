import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

export interface DataTableParams {
    offset?: number;
    limit?: number;
    sortBy?: string;
    sortAsc?: boolean;
}

@Injectable()
export class BSDatatableStore extends BSBaseStore {

    // command : 'board/boarddata';

    public params: string = '';

    constructor(api: BSApi) {

        super(api);

        //this.init(command);
        //this.command = command;

        // if (!command) {
        //     try {
        //         throw new Error('Error');
        //     }
        //     catch(e) {
        //         console.log(e);
        //     }
        // }
    }

    ////page=1&limit=10
    public paramsToQueryString(params) {

        console.log("paramsToQueryString params => ", params);

        // params.test = ['a','b'];  // test=a,b

        let result = [];

        if (params.offset != null) {
            let page = Math.floor(params.offset / params.limit) + 1;
            result.push(['paging[page]', page]); // page
        }
        if (params.limit != null) {
            result.push(['paging[limit]', params.limit]);
        }
        if (params.sortBy != null) {
            result.push(['order[0][column]', params.sortBy]);  // 여러게 처리 만들어야 !!
        }
        if (params.sortAsc != null) {
            result.push(['order[0][dir]', params.sortAsc ? 'ASC' : 'DESC']);
        }

        return result.map(param => param.join('=')).join('&');
    }

    list(params: DataTableParams = null, extraParams = {}) {

        //console.log('query string = ', this.paramsToQueryString(params), this.params, extraParams);

        let command;

        if (params) {
            let paramsString: string = this.paramsToQueryString(params);

            if(this.params) {
                paramsString += '&';
                paramsString += this.params;
            }

            command =  this.command + '?' + paramsString;
        } else {
            command = this.command;
        }

        return this.api.get( command, extraParams);
        //return this.api.get( this.command + '?' + this.paramsToQueryString(params), params);

        // console.log('query string = ', this.paramsToQueryString(params));
        // return this.api.get( this.command + '?' + this.paramsToQueryString(params))
        //     .map(resp => resp.json());

        /*.toPromise()
            .then((resp: Response) => ({
                items: resp.json(),
                count: Number(resp.headers.get('X-Total-Count'))
            }));*/
    }
    
    savePosition(seqs, postions, keyName) {
        let params = {
            "type": 'position',
            "position": postions
        };
        params[keyName] = seqs;
        return this.api.put(this.command, params);
    }

    // update(id, item) {
    //     return this.api.put(this.command + id , item);
    // }

    // delete(id) {
    //     return this.api.delete(this.command + '/' + id);
    // }

}
