// import { Component,ViewChild,Output,Input , OnInit, ViewEncapsulation } from '@angular/core';
// import { ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
// import { Router} from '@angular/router';

// import { trigger, state, style, animate, transition } from '@angular/animations';
// import { MainStore } from './../../store/main.store';

// import { BsTopMenuComponent } from './bs-top-menu/bs-top-menu.component';
// import { BSAuthService } from '../../common/service/bs-auth.service';
// import { BSAlertService } from '../../../common/ui/bs-alert/index';
// import { ResponsiveState } from 'ng2-responsive';
// import { OrderStore } from './../../store/order.store';
// import { AppService } from '../../common/service/app.service';

// @Component({
//   selector: 'bs-header',
//   templateUrl: './bs-header.component.html',
//   styleUrls: ['./bs-header.component.css'],
//   encapsulation: ViewEncapsulation.None,
//   animations: [
//     // the fade-in/fade-out animation.
//     trigger('fadeInOut', [

//       // the "in" style determines the "resting" state of the element when it is visible.
//       state('in', style({opacity: 1})),

//       // fade in when created. this could also be written as transition('void => *')
//       transition(':enter', [
//         style({opacity: 0}),
//         animate(200 )
//       ]),

//       // fade out when destroyed. this could also be written as transition('void => *')
//       transition(':leave',
//         animate(200, style({opacity: 0})))
//     ])
//   ]
// })
// export class BSHeaderComponent implements OnInit {

//     @ViewChild('popupMenu') popupMenu: BsTopMenuComponent;

//     @Input() cartCount: number = 0;
//     @Input() showTopBanner: boolean = false;

//     private isShowHamburger: boolean = false;
//     private isShowMenu : boolean = false;
//     private isShowprogramMenu : boolean = false;
//     private isShowSearch: boolean = false;

//     private showMenuTitle;

//     private menuData: any = {};
//     public usePlanshop: boolean = true;

//     private programMenus: any[][] = [[]];
//     private categoryMenus: any[] = [];
//     private selCateMenus: any;
//     private menuImg: any;

//     public searchKeyword: string = '';

//   private ignoreShowMenu: boolean = false;
//   //private categoryMenus: Map<string, any[]> = new Map<string, any[]>();

//   private sortMenu =
//   {
//     id : "mypage_menu",
//     xtype : "bs-side-menu",
//     config : {
//       collapsible : true
//     },
//     items : [
//       {
//           title:"NEW",
//           active: true,
//           params: 'new'
//       },
//       {
//           title: "BEST",
//           active: true,
//           params: 'best'
//       },
//       {
//         title: "REVIEW",
//         active: true,
//         params: 'review'
//       },
//       {
//         title: "ALL PRODUCT",
//         active: true,
//         params: 'new'
//       }
//     ]
//   };

//     private device = 'mobile';
//     private cartEA: number = 0;

//     public categoryMenu;

//     constructor( public activatedRouter: ActivatedRoute,
//         public mainStore : MainStore,
//         public appService: AppService,
//         private router :Router,
//         private auth: BSAuthService,
//         protected alert: BSAlertService,
//         private thestate: ResponsiveState,
//         private order: OrderStore ) {

//         this.router.events.subscribe((event:any) => {

//             // scroll to top
//             if (event instanceof NavigationStart) {
//                 this.ignoreShowMenu = true;
//                 this.hidePopupMenu();
//             }
//             if (event instanceof NavigationEnd) {
//                 setTimeout(()=>{
//                     this.ignoreShowMenu = false;
//                 }, 3000);
//             }
//         });

//         this.device = this.appService.getDevice();


//     }

//     ngOnInit() {
//         // 초기 로딩 시 session 후 카트수량 가져오게 일부러 지연해줌
//         if(this.device == 'mobile') {
//             setTimeout(() => {
//                 this.getCartEa();
//             }, 1000);
//         }

//         if (this.activatedRouter) {
//             this.activatedRouter.params.subscribe(params => {
//                 console.log("header activate", params);
//                 this.loadMenuNavigation();
//             });
//         }        
//     }

//     loadMenuNavigation() {

//         console.log('BSHeaderComponent::loadMenuNavigation');

//         // navigation
//         this.mainStore.getNavigation(this.appService.getDevice()).subscribe(resp => {

//             if (resp.navigation) {
//                 this.menuData = resp.navigation;
//                 console.log('BSHeaderComponent::getNavigation menuData =>', this.menuData);
//             }

//             if(resp.planshop_use && resp.planshop_use == 'y') {
//                 this.usePlanshop = true;
//             } else {
//                 this.usePlanshop = false;
//             }

//             this.categoryMenu = [];
//             for(let menuItem of this.menuData) {
//                 if (menuItem.title == "PROGRAM") {
//                     this.loadProgramMenu(menuItem.children,menuItem.node_banner);
//                 }
//                 else if (menuItem.title && menuItem.category_code) {
//                     this.categoryMenus[menuItem.title] = menuItem;

//                     // #현정 : 여기서 화살표의 위치를 지정합니다.
//                     let item = menuItem;
//                     if (item.title == '굿즈') {
//                         item.left = '542px';
//                     } else if (item.title == '패션') {
//                         item.left = '625px';
//                     } else if (item.title == '뷰티') {
//                         item.left = '708px';
//                     } else if (item.title == '라이프') {
//                         item.left = '800px';
//                     } else if (item.title == '키즈') {
//                         item.left = '890px';
//                     } else if (item.title == '가전') {
//                         item.left = '975px';
//                     } else if (item.title == '디지털') {
//                         item.left = '1070px';
//                     }

//                     this.categoryMenu.push(item);

//                 }
//             }

//             console.log("header::loadMenuNavigation resp, categoryMenu => ", resp, this.categoryMenu);
//         });
//     }

//     loadProgramMenu(items,node_banner) {
//         console.log('loadProgramMenu items, node_banner =>', items, node_banner);
//         console.assert(items);        
//         if(items.length < 1) return;

//         let maxColnum = 5;
//         let row = 0;
//         let col = 0;

//         for(let item of items) {

//         this.programMenus[row][col++] = item;

//         // next page
//         if (col > 4) {
//             row++;
//             col = 0;
//             this.programMenus[row] = [];
//         }
//         }
//         this.programMenus['node_banner'] = node_banner;
//         console.log("program items = ",items, this.programMenus);
//     }

//     onClickdHamburgerBtn(){
//         this.isShowHamburger = !this.isShowHamburger;
//     }


//     hoverItem(event) {

//         console.log("hoverItem1 event = ", event);
//         if (this.ignoreShowMenu == true) return;
//         console.log("hoverItem2 event = ", event);

//         let title: string = event.title;
//         title = title.toLowerCase();

//         // 프로그램에 마우스 오버
//         if(title == 'program') {

//             // 프로그램 메뉴 보이기
//             this.isShowprogramMenu = true;
//             this.isShowMenu = false;
//             //this.loadProgramMenu();

//         } else if(title == '') {
//             console.log("hoverItem2 event.event.pageY = ", event.event.pageY);
//             this.hidePopupMenu();

//             // // 상단의 메인 배너가 없으면 150이 메뉴 경계선 임
//             // if (!showTopBanner) {
//             //     if (event.event.pageY < 150) {
//             //         console.log("hoverItem2 hide");
//             //         this.hidePopupMenu();
//             //     }
//             // } else {
//             //     // 상단에 배너가 있으면
//             //     if (event.event.pageY < 150) {
//             //         console.log("hoverItem2 hide");
//             //         this.hidePopupMenu();
//             //     }
//             // }

//         } else {

//             this.isShowprogramMenu = false;
//             this.isShowMenu = true;

//             this.showMenuTitle = event.title;
//             // temp
//             let temp = event.title;

//             // if (event.title =="fashion") {
//             //     temp = "패션";
//             // }

//             this.selCateMenus = this.categoryMenus[temp];

//             // if(this.selCateMenus.node_banner[0].link_url.split('-')) {

//             // }
//             // this.menuImg = this.selCateMenus.node_banner[0];
//             // console.log("hoverItem selCateMenus = ", this.selCateMenus.node_banner[0].link_url.split('-'));
//             // console.log("hoverItem selCateMenus = ", this.selCateMenus);
//             // console.log("showMenuTitleshowMenuTitleshowMenuTitleshowMenuTitleshowMenuTitle", this.showMenuTitle);
//             // console.log(this.selCateMenus.node_banner);

//             // console.assert(this.selCateMenus);


//             console.log("hoverItem2 showMenuTitle =>", this.showMenuTitle);
//         }

//     }

//     leaveItem(event) {
//         console.log("BSHeaderComponent::leaveItem event, pageY, screendY = ", event, event.pageY, event.screenY);
//         //this.hidePopupMenu();
//         // if (event.pageY < 150) {
//         //     console.log("hide menu event.pageY < 122 = ", event.pageY);
//         //     this.hidePopupMenu();
//         // }

//     }

//     overLogoBox(event) {
//         this.hidePopupMenu();
//     }

//     overPopupMenu(event)  {
//         console.log("overPopupMenu",event);
//     }

//     // 팝업 메뉴를 마우스가 벗어나면
//     leavePoupMenu() {
//         console.log("leavePoupMenu",event);
//         this.hidePopupMenu();
//     }

//     hidePopupMenu() {
//       this.isShowprogramMenu = false;
//       this.isShowMenu = false;

//       if (this.popupMenu)
//         this.popupMenu.unselectAll();
//     }


//     onClickTopMenu(){
//       this.isShowprogramMenu = false;
//       this.isShowMenu = false;

//       this.popupMenu.unselectAll();
//     }

//     onClickProgramMenuItem(programCode) {

//         this.popupMenu.unselectAll();

//         if(this.isShowprogramMenu == true) {
//             this.isShowprogramMenu = false;
//         }

//         this.router.navigate(['goods/program/' + programCode]);
//     }

//     onClickNavication(categoryCode: string, params?) {

//         if (!categoryCode) return;

//         let rootCode: string = categoryCode.substring(0, 4);

//         this.popupMenu.unselectAll();

//         if(this.isShowMenu == true) {
//             this.isShowMenu = false;
//             if (params) {
//                 this.router.navigate(['goods/category/' + rootCode], { queryParams: {
//                     sort: params,
//                     activeCategory: categoryCode
//                  }});
//             } else {
//                 this.router.navigate(['goods/category/' + rootCode], { queryParams: {
//                     activeCategory: categoryCode
//                  }});
//             }
//         }
//     }

//     onClickMenuItem(){
//         this.isShowHamburger = false;
//     }

//     //모바일기능
//     getCartEa(){
//         this.order.getCartEA().subscribe(resp => {
//             this.cartEA = resp;
//         });
//     }

//     onClickCartBtn(){
//        this.onClickMenuItem();
//     }

//     ////////////////////////////////////////////////////////////////////////
//     //
//     // onSearchChange(value) {
//     //     this.searchKeyword = value;  
//     // }

//     onFocus(event, isFocus) {
//         this.isShowSearch = isFocus;
//     }

//     clickSearch() {
//         this.isShowSearch = !this.isShowSearch;
//     }

//     onClickSearch(text, type) {
//         if(text) {
//             this.searchKeyword = text;
//         }
//         console.log('onClickSearch =>', this.searchKeyword);
//         if(!this.searchKeyword){
//             this.alert.show("검색어를입력하세요.");
//             return ;
//         }
//         this.router.navigated = false;
//         this.router.navigate(['goods/search'], { queryParams: { keyword: this.searchKeyword, type:type}} );
//         this.isShowSearch = false;
//     }

// }
