import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css' /*, '../../app.component.css'*/]
})
export class BoardComponent {

    public sideMenu;
    private _sideMenu: any = [
        {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "게시판 관리",
        auth: 'board_manger',
        //icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        //url : "board-list",
        items : [
            {
                title : "통합게시글 관리",
                auth: 'board_manger',
                url : "content-lists",
                selected: true
            },
            {
                title : "게시판 리스트",
                auth: 'board_manger',
                url : "board-manage",
                selected: true
            },
            // {
            //     title : "게시판 등록",
            //     url : "board/create",
            //     selected: false
            // },
        ]
      },

      {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "공지사항 관리",
        show : true,
        items : [


            {
                title : "공지사항 관리",
                boardAuth: 'board_view',
                boardId: 'notice',
                url : "notice",
                selected: false
            },
            {
                title : "입점사 공지사항 관리",
                boardAuth: 'board_view',
                boardId: 'gs_seller_notice',
                url : "gs_seller_notice",
                selected: false
            },
            {
                title : "FAQ 관리",
                boardAuth: 'board_view',
                boardId: 'faq',
                url : "faq",
                selected: false
            },
        ]
      },

      {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "문의 관리",
        //icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        //url : "board-list",
        items : [

            {
                title : "상품문의 관리",
                boardAuth: 'board_view',
                boardId: 'goods_qna',
                url : "goods_qna",
                selected: false
            },
            {
                title : "1:1문의 관리",
                boardAuth: 'board_view',
                boardId: 'mbqna',
                url : "mbqna",
                selected: false
            },
            {
                title : "입점사문의 관리",
                boardAuth: 'board_view',
                boardId: 'gs_seller_qna',
                url : "gs_seller_qna",
                selected: false
            },
        ]
      },

      {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "상품후기 관리",
        show : true,
        items : [
            {
                title : "상품후기 관리",
                boardAuth: 'board_view',
                boardId: 'goods_review',
                url : "goods_review",
                selected: false
            },
            {
                title : "베스트후기 관리",
                boardAuth: 'board_view',
                boardId: 'goods_review',
                url : "goods-best-review",
                selected: false
            },
        ]
      },

      {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "기타 게시판",
        show : true,
        items : [
            {
                title : "입고예정리스트",
                boardAuth: 'board_view',
                boardId: 'incominglist',
                url : "incominglist",
                selected: false
            },
        ]
      }

    ];

    private _sideProviderMenu: any = [
    {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "게시판 관리",
        show : true,
        items : [
            {
                title : "통합게시글 관리",
                url : "content-lists",
                selected: true
            },
        ]
    },
    {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "공지사항 관리",
        show : true,
        items : [
            {
                title : "입점사 공지사항 관리",    // 입점사 공지사항 관리
                url : "gs_seller_notice",
                selected: false
            },
        ]
    },

    {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "문의 관리",
        show : true,
        items : [

            {
                title : "상품문의 관리",
                url : "goods_qna",
                selected: false
            },

            {
                title : "입점사문의 관리",
                url : "gs_seller_qna",
                selected: false
            },

        ]
    },

    {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "상품후기 관리",
        //icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        //url : "board-list",
        items : [
            {
                title : "상품후기 관리",
                url : "goods_review",
                selected: false
            },
        ]
      }
    ];

    public authData;
    public boardAuthData;

    constructor(private appConfig: AppConfigService, public boAuthService: BOAuthService,) {

        console.log("SetupComponent isProvider =>", this.appConfig.isProvider);
        this.authData = boAuthService.authData;
        this.boardAuthData = boAuthService.boardAuthData;
        if (this.appConfig.isProvider) {
            this.sideMenu = this._sideProviderMenu;
        } else {
            this.sideMenu = this._sideMenu;
        }
    }

    ngOnInit() {
    }

}
