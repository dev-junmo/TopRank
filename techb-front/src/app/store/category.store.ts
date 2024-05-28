import { Injectable } from '@angular/core';
import { BSApi } from '../../common/core/bs-api';
import { BSBaseStore } from './bs-base.store';

@Injectable()
export class CategoryStore extends BSBaseStore {

    private commandFront: string = 'front/category';
    //private command: string = 'shop/category/category';

    constructor(private api: BSApi) {
        super(api, 'shop/category/category');
    }

    /////////////////////////////////////////////////////
    // category


    getCategory(id) {
        return this.api.get(this.command + '/' + id );
    }

    getChildCategory(id) {
        return this.api.get(this.commandFront + '/' +  id );
    }

    //category 정보 (형제
    getSiblingCategory(id) {
        return this.api.get(this.command + '/sibling/' + id );
    }


    /////////////////////////////////////////////////////
    // program

    getProgramSection(device, cacheable = true, groupSeq?) {
        console.log('getProgramSection groupSeq =>', groupSeq);
        let params:any = {
            view: device,
            group_seq: groupSeq
        };
        return this.api.get( 'front/program', params, null, false, cacheable);
    }

    getProgram(id, cacheable?) {
        return this.api.get('shop/program/program/' + id, null, null, false, cacheable);
    }

    getProgramBanner(){
        return this.api.get('etc/banner');
    }

    getProgramMainBanner(){
        return this.api.get('etc/banner/main');
    }
    
    getMainDisplay() {
        return this.api.get('etc/maindisplay');
    }

    // getProgramItems() {
    //     return this.api.get()
    // }

    getSceneGoods(id, page, cacheable?){
        let params = {
            page : 1,
            limit: 20
        };
        return this.api.get('shop/program/scene_goods/' + id , params, null, true, cacheable);
    }


    /////////////////////////////////////////////////////
    // brand

    getBrandData(id) {
        return this.api.get('front/brand/' +  id );
    }

    getMiniShopData(id) {
        return this.api.get('front/minishop/' +  id );
    }




}
