import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BOAuthService } from './bo-auth.service';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Injectable()
export class BOAuthGuard implements CanActivate {

    constructor(
        public appConfig: AppConfigService,
        public auth: BOAuthService, 
        public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        console.log("BOAuthGuard::canActivate =>", route.url[0].path, state.url, this.appConfig.isProvider, this.auth.isLogin());

        // check login
        if (!this.auth.isLogin(this.appConfig.isProvider)) {
            this.auth.gotoLoginPage();
            return false;
        }

        // /main/goods/goods/list

        // check menu auth
        // let _menu = state.url.split('/');
        // if (_menu.length > 2) {
        //     let menu = _menu[2];
        //     let map = {
        //         'goods': 'goods_ui', 
        //         'order': 'order_ui', 
        //         'board': 'board_ui', 
        //         'member': 'member_ui', 
        //         'statistics': 'sale_ui', 
        //         'calculate': 'account_ui', 
        //         'event': 'event_ui', 
        //         'display': 'design_ui'
        //     };

        //     if (!map[menu]) {
        //         return true;
        //     }

        //     console.log('BOAuthGuard::canActivate2 menu, auth =>', menu, map[menu]);               
        //     return this.auth.hasAuth(map[menu]);
        // }        

        return true;
    }
}
