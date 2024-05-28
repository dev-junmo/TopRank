import { Component, Input } from '@angular/core';
import { Router, Event as RouterEvent , NavigationStart , NavigationEnd , NavigationCancel , NavigationError } from '@angular/router';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Component({
  selector: 'bo-side-menu',
  templateUrl: './bo-side-menu.component.html',
  styleUrls: ['./bo-side-menu.component.css']
})
export class BOSideMenuComponent {

    @Input() config: any;
    @Input() set authData(value) {
        console.log('BOSideMenuComponent authData =>', value);
        if (!value) {
            console.log('authData  그냥 pass');
            return;
        }
        if (value) {
            this.updateMenuWithAuth(value);
        }       
    }

    @Input() set boardAuthData(value) {
        console.log('BOSideMenuComponent boardAuthData =>', value);
        if (!value || Object.keys(value).length == 0) {
            console.log('boardAuthData  그냥 pass');
            return;
        }
        if (value) {
            this.updateMenuWithBoardAuth(value);
        }       
    }

    private isOpen: boolean = true;

    constructor(public router: Router, public appConfig: AppConfigService,) {

    }

    ngOnInit() {
        this.checkActive();
        this.router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });        
        
    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationEnd) {
            console.log('BOSideMenuComponent::navigationInterceptor::NavigationEnd');
            this.checkActive();
        }
    }

    openContent(item) {
        if(item.isOpen == undefined) {
            item.isOpen = true;
        }
        item.isOpen = !item.isOpen;
    }

    updateMenuWithBoardAuth(boardAuth) {
        console.log('updateMenuWithBoardAuth boardAuth =>', boardAuth);
        if (!boardAuth) {
            //this.allShowHideMenu(false);
            return;
        }

        for(let item of this.config) {
            let result = this.hasBoardAuth(item, boardAuth);
            if (result == 'Y') { item.isShow = true; }
            for(let subitem of item.items) {
                let result =  this.hasBoardAuth(subitem, boardAuth);
                if (result == 'Y') { subitem.isShow = true; }
                if (result == 'N') { subitem.isShow = false; }
            }
        } 
    }

    hasBoardAuth(item, boardAuth) {
        console.log('hasBoardAuth item.title, item.boardAuth =>', item.title, item.boardAuth);

        // 메뉴옵션에 권한 정보를 안넣어줌
        if (!item.boardAuth || !item.boardId || item.boardAuth.length == 0 || item.boardId.length == 0) {
            console.log('hasBoardAuth 권한정보 없음 : NA');
            return 'NA';
        }
        // 메뉴옵션에 권한 정보 넣어줬는데 서버에서 권한 정보를 못받음
        if (!boardAuth[item.boardId] || Object.keys(boardAuth[item.boardId]).length == 0) {
            console.log(item.boardId + '에 해당하는 권한정보 없음 : false');
            return 'N';
        }     
        console.log('hasBoardAuth item.title, item.boardAuth, result =>', item.title, item.boardAuth, boardAuth[item.boardId][item.boardAuth] === true);
        if (boardAuth[item.boardId][item.boardAuth] === true) {
            return 'Y'; 
        }
        return 'N';
    }

    updateMenuWithAuth(auth) {
        if (!auth) {
            //this.allShowHideMenu(true);
            return;
        }

        for(let item of this.config) {
            item.isShow = this.hasAuth(item, auth);
            for(let subitem of item.items) {
                subitem.isShow = this.hasAuth(subitem, auth);
            }
        } 
    }

    hasAuth(item, auth) {
        console.log('hasAuth item.title, item.auth =>', item.title, item.auth);
        if (!item.auth) {
            console.log('hasAuth 권한정보 없음 : true');
            return true;
        }
        console.log('hasAuth item.title, item.auth, result =>', item.title, item.auth, auth[item.auth] == "Y");
        return auth[item.auth] == "Y";
    }

    allShowHideMenu(isShow) {
        console.log('allShowHideMenu 권한데이타 없어서 모두 안보이게 처리함');
        for(let item of this.config) {
            item.isShow = isShow;
            for(let subitem of item.items) {
                subitem = isShow;
            }
        }
    }

    checkActive() {

        // let urlList = this.router.url.split('/');
        // let key;

        // console.log("checkActive urlList =>", urlList);

        // if ((!this.appConfig.isProvider && urlList.length > 4) ||
        //    (this.appConfig.isProvider && urlList.length > 5)) {

        //     if (this.appConfig.isProvider) {
        //       key = urlList[4];
        //     } else {
        //       key = urlList[3];
        //     }
        // }

        // console.log("checkActive key, config =>", key, this.config);
       
        // for(let top of this.config) {
        //     for(let item of top.items) {
        //         let urlList = item.url.split('/');               
        //         if(key == urlList[0]) {
        //             item.selected = true;
        //             console.log("checkActive urlList =>", key, urlList[0]);
        //         } else {
        //             item.selected = false;
        //         }
        //     }
        // }
    }
}
