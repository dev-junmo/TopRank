import { Component, OnInit } from '@angular/core';
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { Router, Event as RouterEvent , NavigationStart , NavigationEnd , NavigationCancel , NavigationError } from '@angular/router';
import { BSLoadingService } from '@bricks/common/core/bs-loading';
import { BOAuthService } from '../../../../providers/service/bo-auth.service';

@Component({
  selector: 'bs-top-menu',
  templateUrl: './bs-top-menu.component.html',
  styleUrls: ['./bs-top-menu.component.css']
})
export class BSTopMenuComponent implements OnInit {

    public topMenu;

    private _topMenu: any = [
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-00",
        title : "홈",
        url : "/main/home",
        //icon: 'flaticon-cogwheel',
        show : true,
        notiCount  : 0,
        authkey: ''
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-01",
        title : "상점",
        url : "/main/setup",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0,
        authkey: ''
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-02",
        title : "컨텐츠",
        url : "/main/goods",
        show : false,
        notiCount  : 0,
        authkey: 'goods_ui'
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-03",
        title : "주문",
        url : "/main/order",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0,
        authkey: 'order_ui'
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-09",
        title : "전시",
        url : "/main/display",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0,
        authkey: 'design_ui'
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-04",
        title : "게시판",
        url : "/main/board",
        //icon: 'flaticon-cogwheel',
        show : false,
        authkey: 'board_ui'
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-05",
        title : "발송",
        url : "/main/member",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0,
        authkey: 'member_ui'
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-08",
        title : "이벤트",
        url : "/main/event",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0,
        authkey: 'event_ui'
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-07",
        title : "정산",
        url : "/main/calculate",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0,
        authkey: 'account_ui'
      },
      {
        stype  : "bs-type-menuitem",
        id : "id-menu-06",
        title : "통계",
        url : "/main/statistics",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0,
        authkey: 'sale_ui'
      },
    ];

    // 입점사용 topmenu

    private _topMenuProvider: any = [
    {
        stype  : "bs-type-menuitem",
        id : "id-menu-00",
        title : "홈",
        url : "/provider/main/home",
        //icon: 'flaticon-cogwheel',
        show : true,
        notiCount  : 0
    },
    {
        stype  : "bs-type-menuitem",
        id : "id-menu-01",
        title : "상점",
        url : "/provider/main/setup/provider/update",       //provider/main/setup/provider/update/112
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0
    },
    {
        stype  : "bs-type-menuitem",
        id : "id-menu-02",
        title : "상품",
        url : "/provider/main/goods",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0
    },
    {
        stype  : "bs-type-menuitem",
        id : "id-menu-03",
        title : "주문",
        url : "/provider/main/order",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0
    },
    {
        stype  : "bs-type-menuitem",
        id : "id-menu-04",
        title : "게시판",
        url : "/provider/main/board",
        //icon: 'flaticon-cogwheel',
        show : false
    },
    // {
    //     stype  : "bs-type-menuitem",
    //     id : "id-menu-08",
    //     title : "이벤트관리",
    //     url : "/provider/main/event",
    //     //icon: 'flaticon-cogwheel',
    //     show : false,
    //     notiCount  : 0
    // },
    {
        stype  : "bs-type-menuitem",
        id : "id-menu-07",
        title : "정산",
        url : "/provider/main/calculate",
        //icon: 'flaticon-cogwheel',
        show : false,
        notiCount  : 0
    },
    ];

    private menu;

  constructor(public router: Router,
        public loading: BSLoadingService,
        public auth: BOAuthService,
        public appConfig: AppConfigService,) {
    console.log(this.router.url , this.router.urlHandlingStrategy);
  }

    ngOnInit() {

        this.topMenu = this.appConfig.isProvider? this._topMenuProvider : this._topMenu;

        this.router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });

        this.checkActive();

        if (this.auth.listenLoginEvent) {
            this.auth.listenLoginEvent.subscribe(() => {
                console.log('BSTopMenuComponent::ngOnInit login event');
            });
        }

        if (this.auth.listenLogoutEvent) {
            this.auth.listenLogoutEvent.subscribe(() => {
                console.log('BSTopMenuComponent::ngOnInit logout event');
            });
        }
    }

    navigationInterceptor(event: RouterEvent): void {

        if (event instanceof NavigationStart) {
            console.log('navigationInterceptor-NavigationStart');
            this.loading.start('BSTopMenuComponent::NavigationStart');

        }

        if (event instanceof NavigationEnd) {
            console.log('navigationInterceptor-NavigationEnd');
            this.loading.nextSession();
            this.loading.end('NavigationEnd');

            // 클릭해서 이동했을 때 메뉴 선택 표시
            // 주소로 이동 했을 때는 여기 적용 안됨
            for(let item of this.topMenu) {
                if(item == this.menu) {
                    item.show = true;
                } else {
                    item.show = false;
                }
            }

            // 현재 주소를 기반으로 선택을 처리 함 
            this.checkActive();
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
          console.log('navigationInterceptor-NavigationCancel');
          this.loading.end('NavigationCancel');
        }

        if (event instanceof NavigationError) {
          console.log('navigationInterceptor-NavigationError');
          this.loading.end('NavigationError');
        }
    }

    hasAuth(menuItem) {
        if (!menuItem.authkey) {
            return true;
        }
        return this.auth.hasAuth(menuItem.authkey);
    }

    onClickMenuItem(menu) {

        this.menu = menu;
        this.loading.show('onClickMenuItem');
        setTimeout(() => {
            this.router.navigate([menu.url],{});
            //this.loading.end('onClickMenuItem');
        }, 1);
    }

    checkActive() {

        let urlList = this.router.url.split('/');
        let url;

        if (this.appConfig.isProvider) {
            url = '/'+ urlList[1] + '/' + urlList[2] + '/' + urlList[3];
        } else {
            url = '/'+ urlList[1] + '/' +urlList[2];
        }

        console.log("checkActive url =>", url);

        for(let item of this.topMenu) {

            if(item.url.substr(0, url.length) == url) {
                item.show = true;
            } else {
                item.show = false;
            }
        }
    }
}
