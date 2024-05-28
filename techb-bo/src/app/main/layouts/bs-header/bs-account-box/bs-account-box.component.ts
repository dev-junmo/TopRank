import { Component, OnInit } from '@angular/core';
import { BOAuthService } from '../../../../providers/service/bo-auth.service';
import { Router } from '@angular/router';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BSApi } from '@bricks/common/core/bs-api';
import { AdminStore } from './../../../../common/store/admin.store';

@Component({
  selector: 'bs-account-box',
  templateUrl: './bs-account-box.component.html',
  styleUrls: ['./bs-account-box.component.css']
})
export class BSAccountBoxComponent implements OnInit {

    public isLogin : boolean = false;
    public isShowBox: boolean = false;

    public name;
    private email;
    public seq;
    public id;

    constructor(
        private auth : BOAuthService,
        protected router: Router,
        private adminStore: AdminStore,
        public api: BSApi,
        private appConfig: AppConfigService
    ) {

    }

    ngOnInit() {
        this.isLogin = this.auth.isLogin(this.appConfig.isProvider);
        console.log("BSAccountBoxComponent::ngOnInit isLogin =>", this.isLogin);

        if (this.isLogin) {
            this.setLoginUserInfo();
        }
    }

    onClickShowbox(){
        this.isShowBox = !this.isShowBox;
    }

    onClickLogin() {
        this.router.navigate(['/login']);
    }

    onClickSetting(seq) {

        if (this.appConfig.isProvider) {
            this.router.navigate(['/provider/main/setup/provider/update']);
        } else {
            this.router.navigate(['/main/setup/admin/update/' + seq]);
        }
        
        // this.router.navigate(['/admin/manager/manager/my/' + seq]);
        // return this.api.put('admin/manager/manager/my/' + seq);
        // this.adminStore.updateInfo(seq).subscribe( resp => {
        //     });
    }

    onClickLogout() {
        this.auth.logout(this.appConfig.isProvider).subscribe(resp => {

            console.log("onClickLogout resp =>", resp);

            if (this.appConfig.isProvider) {
                this.router.navigate(['/provider/login']);
            } else {
                this.router.navigate(['/login'])
            }

        });
    }

    // updateLoginUserInfo(reload = true) {

    //     // update session
    //     if (reload == true) {
    //         this.auth.updateSession().subscribe(() => {
    //             this.setLoginUserInfo();
    //         });
    //     } else {
    //         this.setLoginUserInfo();
    //     }
    // }

    setLoginUserInfo() {

        if (!this.appConfig.isProvider) {
            this.name = this.auth.managerName;
            this.email = this.auth.managerEmail;
            this.seq = this.auth.managerSeq;
            this.id = this.auth.managerId;
        } else {
            this.name = this.auth.providerName;
            this.email = this.auth.providerEmail;
            this.seq = this.auth.providerSeq;
            this.id = this.auth.providerId;
        }

        console.log("setLoginUserInfo name, email, seq =>", this.name, this.email, this.seq);
    }

}
