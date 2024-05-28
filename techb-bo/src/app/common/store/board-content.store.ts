import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import { BSDatatableStore, DataTableParams } from './bs-datatable.store';

@Injectable()
export class BoardContentStore extends BSDatatableStore {

    constructor(public api: BSApi) {
        super(api);
        this.init('admin/board/boarddata');
    }

    ///////////////////////////////////////////////
    //  todo : store중복됨

    /////////////////////////////////////////////////////
    // 일반 board

    get(id, countViews: boolean = true) {
        return this.view(id, countViews);
    }

    view(id, countViews: boolean = true) {
        let params = {
            hidden : 0
        };

        return this.api.get('admin/board/boarddata/'+ id, params);
    }

    getList(boardId , page , limit, query?) {

        let params = {
            'paging[page]': page,
            'paging[limit]': limit,
            'order[0][column]' : 'regist_date',
            'order[0][dir]': 'desc',
        }

        if (query) {
            params = Object.assign(params, query);
        }

        return this.api.get(this.command + '/?boardid=' + boardId , params, null, true);
    }

    /////////////////////////////////////////////
    // 상품후기

    getGoodsReview(id) {

        let params = {
            hidden : 0
        };

        return this.api.get('admin/goods/goodsreview/'+ id, params);
    }

    loadReviewList(page, limit, query?) {

        let params = {
            'paging[page]': page,
            'paging[limit]': limit,
            'order[0][column]' : 'regist_date',
            'order[0][dir]': 'desc',
        }

        if (query) {
            params = Object.assign(params, query);
        }

        return this.api.get('admin/goods/goodsreview' , params, null, true);

    }

    ///////////////////////////////////////
    // 상품문의

    getGoodsQNA(id) {
        let params = {
            hidden : 0
        };
        return this.api.get('admin/goods/goodsqna/'+ id, params);
    }

    loadQNAList(page, limit, query?) {

        let params = {
            'paging[page]': page,
            'paging[limit]': limit,
            'order[0][column]': 'regist_date',
            'order[0][dir]': 'desc',
        }

        if (query) {
            params = Object.assign(params, query);
        }

        return this.api.get('admin/goods/goodsqna', params, null, true);
    }

    createQNA(params) {
        return this.api.post('admin/goods/goodsqna', params);
    }

    updateQNA(id, params) {
        return this.api.put('admin/goods/goodsqna/' + id , params);
    }

    regist(params) {
        return this.api.post(this.command , params);
    }

    update(id, item) {
        return this.api.put(this.command + '/' + id , item);
    }

    updateHidden(id, item) {
        return this.api.put(this.command + '/use_status', item);
    }

    delete(id){
        return this.api.delete(this.command + '/' + id);
    }

    ////////////////////
    /*notice */

    copyNotice(boardId , seq) {
        let params = {
            boardid : boardId,
            seq : [ seq ]
        };
        return this.api.post('admin/board/boarddata/copy_boarddata' , params);
    }

    /////////////////////////////////
    // 댓글 
    
    // 목록
    loadCommentList(boardId, content_seq, page, limit) {
        let params = {
            boardid: boardId,
            parent: content_seq,
            'paging[page]': page,
            'paging[limit]': limit
        };
        return this.api.get('admin/board/boardcomment' , params);
    }

    // 댓글 달기
    postComment(boardId, content_seq, content, hidden, parentComment = null) {
        let params = {
            boardid: boardId,
            parent: content_seq,
            content: content,
            hidden: hidden
        };
        if (parentComment) {
            params['cmtparent'] = parentComment; 
        }
        return this.api.post('admin/board/boardcomment' , params);
    }

    // 답글 달기
    postReply(boardId, content_seq, content, hidden, parentComment) {
        
        return this.postComment(boardId, content_seq, content, hidden, parentComment);
    }

    updateComment(seq, content, isSecret = false) {
        let params = {
            content: content,
            //hidden: isSecret? 1:0
        };
        return this.api.put('admin/board/boardcomment/'+ seq, params);
    }

    downloadComment(boardId, content_seq) {
        let params = {
            boardid: boardId,
            parent: content_seq
        };
        const p = new URLSearchParams();
        if (params) {
            for (const key in params) {
                p.set(key, params[key]);
            }//
        }
        let url = '/admin/board/boardcomment/xlsx?';
        window.open(BSApi.url + url +  p.toString(), '_blank');
    }

    // getList(boardId,query = null, page, limit) {
    //     if(query) {
    //         return this.api.get(this.command , query , params);

    //     } else {
    //         return this.api.get(this.command + '/?boardid=' + boardId , params);
    //     }
    // }

    /*   getList(boardId , page , limit , params?) {

        params['paging[page]'] = page;
        params['paging[limit'] = limit;
        // let params = {
        //     'paging[page]': page,
        //     'paging[limit]': limit
        // }

        return this.api.get(this.command + '/?boardid=' + boardId , params);
    }

    loadReviewList(page, limit , params?) {
        params['paging[page]'] = page;
        params['paging[limit'] = limit;

        return this.api.get('goods/goodsreview' , params);

    }

    loadQNAList(page, limit , params?) {

        params['paging[page]'] = page;
        params['paging[limit'] = limit;

        return this.api.get('goods/goodsqna', params);
    } */
}
