import { BSApi } from '../../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from '../bs-base.store';


@Injectable()
export class BoardStore extends BSBaseStore {

    constructor(public api: BSApi) {
        super(api, 'board/boardmanager');
    }

    get(boardid){
        console.log("boardid", boardid);
        return this.api.get(this.command + '/' + boardid);
	}

    delete(id) {

        //seq로 삭제
        return this.api.delete(this.command + '/boardmanager/' + id);
    }

    create(item){
        return this.api.post(this.command, item);
    }



}
