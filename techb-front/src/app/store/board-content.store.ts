import { BSApi } from '../../common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

@Injectable()
export class BoardContentStore  extends BSBaseStore {

    constructor(public api: BSApi) {
        super(api, '');
    }

    getLatestItem(boardId) {
        let params = {
            'paging[page]': 1,
            'paging[limit]': 1,
            'order[0][column]': 'seq',
            'order[0][dir]': 'desc',
        };
        return this.api.get('board/boarddata?boardid=' + boardId, params);
    }

    getList(boardId) {
        return this.api.get('board/boarddata?boardid=' + boardId);
    }

    list(id, page, limit = 10,  category: string = '', searchText = '', order = 'seq') {

        let params = {
            'paging[page]': page,
            'paging[limit]': limit,
            'order[0][column]': order,
            'order[0][dir]': 'desc',
            hidden : 0
        };

        if (searchText) {
            params['search_text'] = searchText;
        }

        if (category) {
            category = category.trim();

            if (category != '전체') {
                params['category'] = category;
            }
        }

        return this.api.get('board/boarddata?boardid=' + id, params);
    }

    // searchList(id, search_text){
    //     let params = {
    //         'paging[limit]': 10,
    //         'order[0][column]': 'seq',
    //         'order[0][dir]': 'desc',
    //         search_text : search_text
    //     };
    //     return this.api.get('board/boarddata?boardid='+ id, params);
    // }

    eventList(id, page, limit, category, searchText) {

        let params = {
            'paging[page]': page,
            'paging[limit]': limit,
            'order[0][column]': 'seq',
            'order[0][dir]': 'desc',
            hidden : 0
        };

        if (searchText) {
            params['search_text'] = searchText;
        }

        if (category == 'finish') {
            params['finish'] = 'finish';
        } else if (category == 'ing') {
            params['finish'] = 'ing';
        } else if (category == 'winnerdate') {
            params['order[0][column]'] = 'ext_date';
            params['order[0][dir]'] = 'desc';
            params['finish[0]'] = 'finish';
            params['finish[1]'] = 'ing';
        }

        return this.api.get('board/boarddata?boardid=' + id, params);
    }

    reviewList(page){
        let params = {
            'paging[page]': page,
            'paging[limit]': 8,
            'order[0][column]': 'seq',
            'order[0][dir]': 'desc'
        };

        return this.api.get('shop/goods/goodsreview', params);
    }

    // faqList(id, category, page){
    //     let params = {
    //         category: category,
    //         'paging[page]': page,
    //         'paging[limit]': 6,
    //         'order[0][column]': 'seq',
    //         'order[0][dir]': 'desc'
    //     };
    //     return this.api.get('board/boarddata?boardid='+ id, params);
    // }

    view(id, category?, groupSeq?, viewKey?, boardId?) {
        let params = {
            hidden : 0,
            category: category,
            group_seq: groupSeq,
            view_key: viewKey
        };
        if (boardId) {
            params['boardid'] = boardId;
        }
        // if (id == 'latest') {

        // }
        return this.api.get('board/boarddata/'+ id, params);
    }

    create(item){

        return this.api.post('board/boarddata', item);
    }

    update(seq, item){
        return this.api.put('board/boarddata' + seq, item);
    }    

    /////////////////////////////////////////////////////////////////////
    // Comment
    
    // 댓글 목록
    loadCommentList(boardId, contentSeq, page, limit) {
        let params = {
            boardid: boardId,
            parent: contentSeq,
            'paging[page]': page,
            'paging[limit]': limit
        };
        return this.api.get('board/boardcomment' , params);
    }

    // 댓글 달기
    postComment(boardId, contentSeq, content, isSecret = false, parentComment = null) {
        let params = {
            boardid: boardId,
            parent: contentSeq,
            content: content,
            hidden: isSecret? 1:0
        };
        if (parentComment) {
            params['cmtparent'] = parentComment; 
        }
        return this.api.post('board/boardcomment', params);
    }

    // 답글 달기
    postReply(boardId, contentSeq, content, isSecret = false, parentComment) {
        
        return this.postComment(boardId, contentSeq, content, isSecret, parentComment);
    }

    deleteComment(seq) {
        return this.api.delete('board/boardcomment/'+ seq);
    }

    updateComment(seq, content, isSecret = false) {
        let params = {
            content: content,
            //hidden: isSecret? 1:0
        };
        return this.api.put('board/boardcomment/'+ seq, params);
    }
}
