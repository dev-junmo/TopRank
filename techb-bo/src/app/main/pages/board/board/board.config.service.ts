import { Injectable } from '@angular/core';
import { BOAuthService } from '@app/providers/service/bo-auth.service';
import { AppConfigService } from '@app/providers/service/app-config.service';

// import { environment } from '@src/environments/environment';
// import { Router } from '@angular/router';

@Injectable()
export class BoardConfigService {    

    constructor(public auth: BOAuthService, 
        public appConfig: AppConfigService) { 

    }

    getConfig(boardId: string, boardData: any) {

        console.log('getConfig boardId, boardConfig =>', boardId, boardData);

        let config = {
            auth : {
                read: false,
                write: false,
                writeReply: false,
                delete: false,
            },
            ui : {
                createBtn: true,
                userBoard: false,   
                userBoardItem: false  
            },
            use : {
                reply: false,       // 답글
                recontents: false,  // 글내에 답변 
                secret: false,      // 비밀글
                file: false,        // 첨부파일
                notice: false,
                category: false,
                hidden: false,
                popup: false,        // 공지사항 팝업기능
                goods: false
            }
        };

        ////////////////////////////////
        // board config

        // auth
        config.auth.write = this.hasAuthWrite(boardData.boardadmin);
        if (this.appConfig.isProvider) {
            config.auth.write = false;
        }
        
        config.auth.delete = config.auth.write;
        config.auth.writeReply = config.auth.write;


        
        // 보드별 예외 처리
        if (boardId == 'notice') { 
            config.ui.userBoard = true;
            config.ui.userBoardItem = true;
            config.use.hidden = true;
        } else if (boardId == 'faq') {
            config.ui.userBoard = true;
            config.use.hidden = true;
        } else if (boardId == 'mbqna') {
            config.ui.createBtn = false;
            config.use.file = true;
        } else if (boardId == 'goods_qna') {

            config.use.goods = true;
            config.use.file = true;

            // 상품문의 게시판의 경우 입점사는 항상 답변 권한이 있음(본인글만 볼수 있음)
            if (this.appConfig.isProvider) {
                config.auth.writeReply = true;
            } 
        } else if (boardId == 'gs_seller_qna') {

            // 입점사 문의 게시판 - 입점사의 경우 쓰기 권한만 있음
            if (this.appConfig.isProvider) {
                config.auth.write = true;
                config.auth.delete = config.auth.write;
            }
        } else if(boardId == 'gs_seller_notice') {
            if (!this.appConfig.isProvider) {
                config.use.popup = true;
            }
        }

        // provider



        // use
        config.use.reply = (boardData.auth_reply_use == 'Y');
        config.use.recontents = (boardData.recontents_use == 'Y');
        config.use.secret = (boardData.secret_use == 'Y');
        config.use.file = (boardData.file_use == 'Y');    
        config.use.notice =  (boardData.notice_use == 'Y');
        config.use.category =  (boardData.category && boardData.category.length > 0); //(boardConfig.category_use == 'Y'); 

        if (boardId == 'incominglist') {
            config.use.reply = true;
            config.use.recontents = false;
        }

        console.log('getConfig2 config =>', config);

        return config;
    }

    // 수정 권한
    // 기존에 권한을 확인하는 방법 
    // 이제는 권한을 내려줘서 사용 안함
    hasAuthWrite(auth) {
        console.log('hasManageAuthForView auth =>', auth, this.auth.managerId);
   
        let hasAuth: boolean = false;
        if (!this.auth.managerId || !auth) { return false; }

        // 새로운 api로 권한 확인하기
        return auth.board_act == '1';



        // 이전에 API로 권한을 확인하기
        // for(let _manager of manager.list) {
        //     if (_manager.manager_id == this.auth.managerId) {
        //         console.log('hasManageAuthForView2 _manager =>', _manager);
        //         if (_manager.board_admin && _manager.board_admin[0]) {
        //             if (_manager.board_admin[0].board_act > 0) {
        //                 hasAuth = true;
        //             }
        //         }
        //     }
        // }
        //return hasAuth;
    }    
}