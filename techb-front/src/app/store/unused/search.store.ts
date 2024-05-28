import { Injectable } from '@angular/core';
import { BSApi } from '../../../common/core/bs-api';
import { BSBaseStore } from '../bs-base.store';

@Injectable()
export class SearchStore extends BSBaseStore {

    constructor(public api: BSApi) {
        super(api, 'etc/');
    }

    popularWord(){
        return this.api.get(this.command + 'searchword/popular');
    }

    recentWord(){
        return this.api.get(this.command + 'searchrecent');

    }

    autoComplete(text){
        return this.api.get(this.command + 'searchlist/autocomplete', {search_text : text});
    }
    
    deleteAllRecentWord(){
        return this.api.delete(this.command + 'searchrecent/all');
    }

    deleteRecentWord(seq){
        return this.api.delete(this.command + 'searchrecent/' + seq);

    }

    getSearchData(text, params?) {
        if (!params) {
            params = {};
        }
        params['search_text'] = text;
        return this.api.get('front/search', params);
    }
}
