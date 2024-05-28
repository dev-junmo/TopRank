import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class MyQNAStore extends BSBaseStore {

    constructor(private api: BSApi) {
        super(api, 'board/boarddata');
    }

    list(page = 1, limit = 5, sDate?, eDate?,  type?) {

        let params: any = {
            'boardid': 'mbqna',
            'order[0][column]': 'seq',
            'order[0][dir]': 'desc',
            'paging[page]': page,
            'paging[limit]': limit
        };

        if (sDate) {
            params['regist_date[min]'] = sDate;
        }

        if (eDate) {
            params['regist_date[max]'] = eDate;
        }

        if (type) {
            params['category'] = type;
        }

        return this.api.get(this.command + '/my', params);
    }

    // get(page = 1, limit = 5) {

    //     return this.api.get(this.command + '?boardid=mbqna', {
    //             'paging[page]': page,
    //             'paging[limit]': limit,
    //             'order[0][column]': 'seq',
    //             'order[0][dir]': 'desc'
    //         });
    // }

    getBoardDetail(boardSeq) {
        return this.api.get(this.command + '/' + boardSeq +'?mypage=y');

    }
    delete(id) {
        return this.api.delete(this.command + '/' + id);
    }

    create(items) {
        return this.api.post(this.command , items);
    }

    update(id, params) {
        return this.api.put(this.command + '/' + id, params);
    }
}
