import { ActivatedRoute, NavigationStart, NavigationEnd, UrlSegment, UrlHandlingStrategy } from '@angular/router';
import { Component, ViewChild, Output, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router} from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';
//import { MenuStore } from './../../store/menu.store';
import { BsTopMenuComponent } from './bs-top-menu/bs-top-menu.component';
import { AuthService } from '../../service/auth.service';
import { BSAlertService } from '../../../common/ui/bs-alert/index';
import { ResponsiveState } from 'ng2-responsive';
import { OrderStore } from './../../store/order.store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
// import { GoodsStore } from '../../store/goods.store';
// import { MainStore } from '../../store/main.store';
import { AppService } from '../../common/service/app.service';
import { mergeAll } from 'rxjs/operators';

@Component({
    selector: 'bs-header-m',
    templateUrl: './bs-header.view.m.html',
    styleUrls: ['./bs-header.view.m.css'],
    animations: [
        trigger('slide', [
            transition('void => *', [
                style({
                    transform: 'translateX(-100%)',
                }),
                animate(100,
                    style({
                        transform: 'translateX(0)',
                    })
                )
            ]),
            transition('* => void', [
                style({}),
                animate(100,
                    style({
                        transform: 'translateX(-100%)',
                    })
                )
            ])
        ])
    ]
})
export class BSHeaderMobileView implements OnInit {
    //techb
    // public isLogined: boolean = false;

    public userName: string = '';

    /////////////////////////////////////////////////////
    @ViewChild('popupMenu') popupMenu: BsTopMenuComponent;

    @Input() cartCount: number = 0;    
    @Input() isShowHamburger: boolean = false;
    
    
    private isShowMenu : boolean = false;
    private isShowprogram : boolean = false;
    private isShowSearch: boolean = false;
    
    private showMenuTitle;
    
    private menuData: any = {};
    private programMenus: any[][] = [[]];
    private categoryMenus: any[] = [];
    private selCateMenus: any;
    private menuImg: any;

    private ignoreShowMenu: boolean = false;
    //private categoryMenus: Map<string, any[]> = new Map<string, any[]>();

    private sortMenu =
    {
        id : "mypage_menu",
        xtype : "bs-side-menu",
        config : {
            collapsible : true
        },
        items : [
            {
                    title:"NEW",
                    active: true,
                    params: 'new'
            },
            {
                    title: "BEST",
                    active: true,
                    params: 'best'
            },
            {
                title: "REVIEW",
                active: true,
                params: 'review'
            },
            {
                title: "ALL PRODUCT",
                active: true,
                params: 'new'
            }
        ]
    };

    private device = 'mobile';
    //private cartEA: number = 0;

    private lastParams;
    private title: string = 'logo';
    public headerType;
    public headerBtnType;
    private headerLength = 'short';

    // private side: string = 'hamburger';
    private prevUrl: string = '';
    private categoryTitle;
    public planshop;

    public usePlanshop: boolean = true;
    public menuList = [];
    public menuListTablet = [];

    public currUrl;

    constructor( public activateRouter: ActivatedRoute,
        private location : Location,
        //public menu : MenuStore,
        private router :Router,
        private auth: AuthService,
        protected alert: BSAlertService,
        //private goodsStore: GoodsStore,
        private thestate: ResponsiveState,
        private order: OrderStore ,
        public appService: AppService,
        //private mainStore : MainStore
        ) {
        this.router.events.subscribe((event:any) => {
            // scroll to top
            if (event instanceof NavigationStart) {
                this.ignoreShowMenu = true;
                this.hidePopupMenu();
            }
            if (event instanceof NavigationEnd) {
                console.log("event = ", event);
                this.updateTitle(event.urlAfterRedirects);
                this.currUrl = event.urlAfterRedirects;
                setTimeout(()=>{
                        this.ignoreShowMenu = false;
                }, 3000);
            }
        });

        this.device = this.appService.getDevice();


        // const urlParams = Observable.combineLatest(
        //         this.activateRouter.params,
        //         this.activateRouter.queryParams,
        //         (params, queryParams) => ({ ...params, ...queryParams})
        // );

        // // Subscribe to the single observable, giving us both
        // urlParams.subscribe(params => {
        //         this.lastParams = params;        // 10mm 안에 다른 값이 와도 마지막 값 두번 처리한다.

        //         console.log("last params = ", this.lastParams)
        //         // 이벤트가 바뀌때 이전 이벤트로 한번더 호출하는 버그를 수정하기 위해
        //         // setTimeout(()=>{
        //         //         //this.loadCategoryWithParams(this.lastPrams);
        //         // }, 10);
        // });

    }

    ngOnInit() {
        
    }

    get isLogined() {
        let _isLogined = this.auth.isLogined();
        if(!_isLogined) {
            return false;
        }
        
        this.userName = this.auth.userName;
        if(!this.userName) {
            this.userName = this.auth.userNickName;
        }

        return _isLogined;
    }

    getCategory() {

    }

    onClickItem(url) {
        this.router.navigateByUrl(url);
    } 

    updateTitle(url) {
        console.log("updateTitle url =>", url, url.indexOf('mode'), url.split('mode=') );
        //alert(url.substring(0, 15));
        /////goods/category/010900020002?activeCategory=010900020001

        // todo : 정확히 하기 위해서 끝에 /까지 체크해야 함

        this.prevUrl = '';

        let mode = url.indexOf('mode');

        // home
        if (url.substring(0, 5) == "/home") {
            this.title = 'logo';
            this.headerType = 'main';
            this.headerBtnType = 'membership'
        }
        else if(url.substring(0,10) == "/main/home") {
            this.title = 'logo';
            this.headerType='main';
            this.headerBtnType = 'membership'
        }
        else if(url.substring(0,23) == "/main/section/dashboard") {
            this.title = 'logo';
            this.headerType='main';
            this.headerBtnType = 'membership'
        }
        //마이대시보드 버튼
        else if(url.substring(0,25) == "/main/section/mypage/home") {
            this.title = 'logo';
            this.headerType = 'main';
            this.headerBtnType = 'dashboard'
        }
        else if(url.substring(21,57) == "/point-charge/point-charge-completed") {
            this.title = 'logo';
            this.headerType = 'main';
            this.headerBtnType = 'dashboard'
        }
        else if(url.substring(21,67) == "/pusrchase-keyword/purchase-keyword-completed") {
            this.title = 'logo';
            this.headerType = 'main';
            this.headerBtnType = 'dashboard'
        }

        else if(url.substring(0,8) == "/account"){
            this.title = 'logo';
            this.headerType = 'login';
        }

        else {
            this.title = '';
            this.headerType = 'sub';
        }


    //    //  program
    //     else if (url.substring(0, 22) == "/goods/program/section") {
    //         this.title = 'PROGRAM';
    //         this.headerType = 'sub';
    //     }
    //     else if (url.substring(0, 15) == "/goods/program/") {
    //         this.title = 'PROGRAM';
    //         this.headerType = 'sub';
    //         //this.prevUrl = '/goods/program/section';
    //     }
    //     // myct
    //     else if (url.substring(0, 11) == "/goods/myct") {
    //             this.title = 'MYCT';
    //             this.headerType = 'sub';
    //     }
       
    //     // goods
    //     else if (url.substring(0, 12) == "/goods/view/") {
    //         this.title = '';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 18) == "/goods/goods-info/") {
    //         this.title = '상품상세정보';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 20) == "/goods/starauction") {
    //         this.title = 'starAuction';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 18) == "/goods/view-review") {
    //         this.title = '상품후기';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 15) == "/goods/view-qna") {
    //         this.title = '상품 Q&A';
    //         this.headerType = 'sub';            
    //     }

    //     // /goods/category/...
    //     else if (url.substring(0, 19) == "/goods/category/new") {
    //         this.title = 'NEW'
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 20) == "/goods/category/best") {
    //         this.title = 'BEST'
    //         this.headerType = 'sub';
    //     }
    //     else if (url.substring(0, 15) == "/goods/category") {

    //         let params = url.substring(16).split('?');

    //         // this.goodsStore.getCategoryTitle(params[0]).subscribe((resp=>{
    //         //     if (resp.title) {
    //         //         this.title = resp.title;
    //         //     }
    //         // }));

    //         this.headerType = 'sub';
    //     }

    //     // cart
    //     else if (url.substring(0, 11) == "/order/cart") {
    //         this.title = '장바구니';
    //         this.headerType = 'popup';
    //     } else if (url.substring(0, 22) == "/order/checkout/choice") {
    //         this.title = '주문/결제';
    //         this.headerType = 'popup';
    //     } else if (url.substring(0, 22) == "/order/checkout/direct") {
    //         this.title = '주문/결제';
    //         this.headerType = 'popup';
    //     } else if (url.substring(0, 15) == "/order/complete") {
    //         this.title = '주문완료';
    //         this.headerType = 'popup';
    //         this.prevUrl = "/home";
    //     }

    //     // mypage
    //     else if (url.substring(0, 12) == "/mypage/main") {
    //         this.title = '마이티빙몰';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 16) == "/mypage/purchase") {
    //         this.title = '주문배송조회';
    //         this.headerType = 'sub';
    //         this.prevUrl = "/mypage/main";
    //     } else if (url.substring(0, 23) == "/mypage/purchase/detail") {
    //         this.title = '주문/배송 상세 조회';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 28) == "/mypage/purchase-cancel/list") {
    //         this.title = '취소/교환/반품 조회';
    //         this.headerType = 'sub';
    //         this.headerLength = 'long';
    //         this.prevUrl = "/mypage/main";
    //     } else if(url.substring(0, 32) == '/mypage/purchase-cancel/detail/R') {
    //         this.title = '교환/반품 상세';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 30) == "/mypage/purchase-cancel/detail") {
    //         this.title = '주문 상세조회';
    //         this.headerType = 'sub';
    //         this.headerLength = 'long';
    //     } else if (url.substring(0, 23) == "/mypage/payment/create/") {
    //         this.title = '결제 취소';
    //         this.headerType = 'sub';

    //         let types = url.split(';');
    //         if (!types[1] || types[1] !== "type=payment") {
    //             this.title = '주문 취소';
    //         }
    //     } else if(url.split('mode=')[1] == 'return') {
    //         this.title = '반품 신청';
    //         this.headerType = 'sub';

    //     } else if(url.split('mode=')[1] == 'exchange') {
    //         this.title = '교환 신청';
    //         this.headerType = 'sub';
    //     } else if(url.split('mode=')[1] == 'return_coupon') {
    //         this.title = '티켓취소 신청';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 14) == "/mypage/ticket") {
    //             this.title = '티켓 예매 조회';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 23) == "/mypage/private-payment") {
    //             this.title = '개인 결제';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 24) == "/mypage/my-favorite-shop") {
    //             this.title = '나의 브랜드샵';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 24) == "/mypage/my-purchase-shop") {
    //             this.title = '나의 구매샵';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 27) == "/mypage/transction-document") {
    //             this.title = '거래증빙서류 확인';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 14) == "/mypage/emoney") {
    //             this.title = '적립금';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 14) == "/mypage/coupon") {
    //             this.title = '쿠폰';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 13) == "/mypage/point") {
    //             this.title = '포인트';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 23) == "/mypage/activity/my-qna") {
    //             this.title = '1:1문의 내역';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 20) == "/mypage/activity/qna") {
    //             this.title = '상품 Q&A 내역';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 23) == "/mypage/activity/review") {
    //             this.title = '상품 후기';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 24) == "/mypage/activity/summary") {
    //             this.title = '나의 옥션 현황';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 24) == "/mypage/activity/restock") {
    //             this.title = '재입고 알림';
    //             this.headerType = 'sub';

    //     } else if (url.substring(0, 15) == "/mypage/address") {
    //         if (window.innerWidth < 330) {
    //             this.title = '배송지/환불계좌'; 
    //         } else {
    //             this.title = '배송지/환불계좌 관리';            
    //         }
    //         this.headerType = 'sub';
    //         this.headerLength = 'long';
    //         this.prevUrl = "/mypage/main";
    //     }

    //     // board
    //     else if (url.substring(0, 13) == "/board/notice") {
    //             this.title = '공지사항';
    //             this.headerType = 'sub';
    //     } else if (url.substring(0, 10) == "/board/faq") {
    //             this.title = 'FAQ';
    //             this.headerType = 'sub';
    //     } else if (url.substring(0, 11) == "/board/view") {
    //             this.title = '게시판 상세';
    //             this.headerType = 'sub';
    //     } else if (url.substring(0, 18) == "/board/review/list") {
    //         this.title    = 'REVIEW';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 27) == "/board/onlinepromotion/list") {
    //         this.title = 'EVENT';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 27) == "/board/onlinepromotion/view") {
    //         this.title = '이벤트 상세';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 27) == "/board/planshop/list") {
    //         this.title = '기획전';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 20) == "/board/planshop/view" ||
    //         url.substring(0, 12) == "/goods/plan/") {
    //         this.title = '기획전 상세';
    //         this.headerType = 'sub';
    //     }
    //     else if (url.substring(0, 22) == "/goods/brand/view/0032") {
    //         this.title = 'FUNSHOP';
    //         this.headerType = 'sub';
    //     }        
    //     else if (url.substring(0, 18) == "/goods/brand/view/") {
    //         this.title = '브랜드 상세';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 21) == "/goods/minishop/view/") {
    //         this.title = '미니샵 상세';
    //         this.headerType = 'sub';
    //     } else if (url.substring(0, 13) == "/goods/brand/") {
    //         this.title = 'BRAND';
    //         this.headerType = 'sub';
    //     }
    //     //search

    //     else if (url.substring(0, 18) == '/goods/search-page') {
    //         this.title = '검색';
    //         this.headerType = 'sub';
    //     }
    //     else if (url.substring(0, 22) == '/goods/search?keyword=') {
    //         this.title = '검색';
    //         this.headerType = 'sub';
    //     }
    //     else if (url.substring(0, 10) == '/promotion') {
    //         //this.title = '';
    //         this.headerType = 'sub';
    //     }
        // other
        console.log("updateTitle headerType, title =>", this.headerType, this.title, url.substring(0, 18));
    }

    loadProgramMenu(items,node_banner) {
        if(items.length < 1) return;

        let maxColnum = 5;
        let row = 0;
        let col = 0;

        for(let item of items) {

            this.programMenus[row][col++] = item;

            // next page
            if (col > 4) {
                row++;
                col = 0;
                this.programMenus[row] = [];
            }
        }
        this.programMenus['node_banner'] = node_banner;
        console.log("program items = ",items, this.programMenus);
    }

    clickSearch() {
        this.isShowSearch = !this.isShowSearch;
    }

    onClickdHamburgerBtn(){
        this.isShowHamburger = !this.isShowHamburger;
    }

    onClickMenuItem() {
        this.isShowHamburger = false;
    }

    onClickSNSMenuItem() {
        // this.isShowHamburger = false;
        // this.appService.navigateNewWindow('https://www.instagram.com/tvingmall.official');
    }

    

    onClickMenuItemWithUrl(url) {
        this.isShowHamburger = false;
        this.router.navigateByUrl(url);
    }

    onClickLogoInHamburger() {
        this.isShowHamburger = false;
    }

    hoverItem(event) {
        console.log("hoverItem1 event = ", event);

        if (this.ignoreShowMenu == true) return;

        console.log("hoverItem2 event = ", event);

        // 프로그램에 마우스 오버
        if(event.title == 'program') {

                // 프로그램 메뉴 보이기
                this.isShowprogram = true;
                this.isShowMenu = false;
                //this.loadProgramMenu();

        } else if(event.title == '') {
                console.log("hoverItem2 event.event.pageY = ", event.event.pageY);
                if (event.event.pageY < 150) {
                        console.log("hoverItem2 hide");
                        this.hidePopupMenu();
                }
        } else {
                console.log("hoverItem2 other");
                this.isShowprogram = false;
                this.isShowMenu = true;

                this.showMenuTitle = event.title;
                // temp
                let temp = event.title;

                // if (event.title =="fashion") {
                //         temp = "패션";
                // }

                this.selCateMenus = this.categoryMenus[temp];

                // this.menuImg = this.selCateMenus.node_banner[0];
                console.log("hoverItem selCateMenus = ", this.selCateMenus);
                console.log("showMenuTitleshowMenuTitleshowMenuTitleshowMenuTitleshowMenuTitle", this.showMenuTitle);
                // console.log(this.selCateMenus.node_banner);

                // console.assert(this.selCateMenus);

        }

    }

    leaveItem(event) {
            console.log("BSHeaderComponent::leaveItem event, pageY, screendY = ", event, event.pageY, event.screenY);
            if (event.pageY < 150) {
                    console.log("hide menu event.pageY < 122 = ", event.pageY);
                    this.hidePopupMenu();
            }

    }

    hidePopupMenu() {
        this.isShowprogram = false;
        this.isShowMenu = false;

        if (this.popupMenu)
            this.popupMenu.unselectAll();
    }

    onClickTopMenu(){
        this.isShowprogram = false;
        this.isShowMenu = false;

        this.popupMenu.unselectAll();
    }

    onClickProgramMenuItem(programCode) {

        this.popupMenu.unselectAll();

        if(this.isShowprogram == true) {
                this.isShowprogram = false;
        }

        this.router.navigate(['goods/program/' + programCode]);
    }

    onClickNavication(categoryCode: string, params?) {

        if (!categoryCode) return;

        let rootCode: string = categoryCode.substring(0, 4);

        this.popupMenu.unselectAll();

        if(this.isShowMenu == true) {
            this.isShowMenu = false;
            if (params) {
                this.router.navigate(['goods/category/' + rootCode], { queryParams: {
                        sort: params,
                        activeCategory: categoryCode
                    }});
            } else {
                this.router.navigate(['goods/category/' + rootCode], { queryParams: {
                        activeCategory: categoryCode
                    }});
            }
        }
    }

    // updateLoginUserInfo(reload = true) {

    //     // update session
    //     if (reload == true) {
    //         this.auth.updateSession().subscribe(() => {
    //                 this.setLoginUserInfo();
    //         });
    //     } else {
    //         this.setLoginUserInfo();
    //     }
    // }

    // setLoginUserInfo() {
    //     this.isLogin = this.auth.isLogined();
    //     this.userName = this.auth.userName;
    // }

    // 모바일 로그인 버튼
   
    onClickLogin() {
        //this.auth.login();             
    }

    // 모바일 로그아웃 버튼
    onClickLogout() {
        this.isShowHamburger = false;
        this.auth.logout().subscribe(resp => {
            this.router.navigate(['/main/home']);
        });
    }

    onClickNoticeMenuItem() {

        this.isShowHamburger = false;
        this.router.navigate(['/board/notice/list']);
    }

    onClickFaqMenuItem() {
        this.isShowHamburger = false;
        this.router.navigate(['/board/faq/list']);
    }

    onClickHomeMenuItem() {
        this.isShowHamburger = false;
        this.router.navigate(['/home']);
    }

    onClickMyQNA() {
        // this.isShowHamburger = false;
        // let url = this.appService.frontAppURL + '/mypage/activity/my-qna';       
        // this.auth.gotoPageAfterLoggedIn(url);
    }

    onClickCustomerCenter() {
        this.isShowHamburger = false;
        this.router.navigate(['/board/notice/list']);
    }

    //모바일기능
    // getCartEa(){

    //     this.order.getCartEA().subscribe(resp => {
    //             this.cartEA = resp;
    //     });
    // }

    onClickCloseBtn() {
        this.isShowHamburger = false;
    }


    // 뒤로가기 버튼 클릭 시 
    onClickBackBtn() {

        console.log('onClickBackBtn prevUrl =>', this.prevUrl);

        if (this.prevUrl) {
            //alert(this.prevUrl)
            this.router.navigate([this.prevUrl]); 
            return;          
        } 

        if (window.history.length == 0) {
            this.router.navigate(['/']);
            return;
        }
        
        let apiUrl = this.appService.apiURL;
        let referrer = document.referrer;
        if (referrer && referrer.substring(0, apiUrl.length) == apiUrl) {
            window.history.go(-3);
            return;
        }
        
        window.history.back();

            // angular에서 referrer 의미없음

            // let referrer = document.referrer;
            // let except: boolean = false;     
            
            // if (referrer) {
            //     let frontAppURL = this.appService.frontAppURL;
   
            //     if (referrer.length >= frontAppURL.length && 
            //         referrer.substring(0, frontAppURL.length) !== frontAppURL) {
            //         except = true;
            //     }    
            // } else {
            //     except = true;
            // }
           
            // console.log('onClickBackBtn2 referrer, except =>', referrer, except);            
            
            // #todo 히스트뢰 back 없으면 홈으로
            // mallapi체크 필요

            // if (window.history.length == 0 || except) {
            //     this.router.navigate(['/']);
            // } else {
            //     this.location.back();
            // }
        //}
    }  
}
