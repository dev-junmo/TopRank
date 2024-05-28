import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { BOAuthService } from './bo-auth.service';

@Injectable()
export class BOProviderAuthGuard implements CanActivate {

    constructor(public auth: BOAuthService, public router: Router) {
      
    }

    canActivate(): boolean {

        console.log("BOProviderAuthGuard::canActivate =>");
        if (!this.auth.isLogin(true)) {
            this.auth.gotoProviderLoginPage();
            return false;
        }
        return true;
    }
}
