import { BSApi } from '../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ResponsiveState } from 'ng2-responsive';

import 'rxjs/add/operator/map';
import { Subject, Observable } from 'rxjs/Rx';

const TBKEYWORDS_HISTORY = 'TBKeyowrdsHistory';

@Injectable()
export class KeywordStore {

    private key: string;
    private _list = {};

    constructor(
        public api: BSApi,
        private thestate: ResponsiveState,
        ) {
    
    }

    init(key) {
        this.key = key;
        this._list[this.key] = []; 
        console.log('keywordStore list[] =>', this._list);
    }

    list() {
        let _list = localStorage.getItem(TBKEYWORDS_HISTORY);
        this._list = JSON.parse(_list);

        console.log('keywordStore::list list[] =>', this._list);
        if(!this._list || Array.isArray(this._list)) {
            this._list = {};
        }
        
        return this._list[this.key]? this._list[this.key] : [];
    }

    create(obj) {
        if(!this._list) {
            this._list = {};
        }
        if(!this._list[this.key]) {
            this._list[this.key] = [];
        }
        //동일한 키워드 삭제
        let idx = 0;
        console.log('keywordStore::create list[] =>', obj, this._list);
        
        if (this.key == '_keyword') {
            for(let keyword of this._list[this.key]) {
                if(keyword.keyword == obj.keyword) {
                    this._list[this.key].splice(idx, 1);
                    break;
                }
                idx++;
            }     
        } else {
            let idx = this._list[this.key].findIndex(item => { 
                return obj.name == item.name && obj.keyword == item.keyword
            });
            if (idx !== -1) {
                this._list[this.key].splice(idx, 1);
            }
        }
        //키워드 추가
        this._list[this.key].push(obj);
        console.log('keywordStore::create2 list[] =>', this._list, JSON.stringify(this._list));
        
        localStorage.setItem(TBKEYWORDS_HISTORY, JSON.stringify(this._list));

        return this._list[this.key];
    }

    delete(keyword, name?) {
        let idx = 0;
        for(let data of this._list[this.key]) {
            if(data.keyword == keyword) {
                if(name) {
                    if (data.name == name) {
                        this._list[this.key].splice(idx, 1);
                        break;
                    } 
                } else {
                    this._list[this.key].splice(idx, 1);
                    break;
                } 
            }
            idx++;
        }
        localStorage.setItem(TBKEYWORDS_HISTORY, JSON.stringify(this._list));

        return this._list[this.key];
    }
}
