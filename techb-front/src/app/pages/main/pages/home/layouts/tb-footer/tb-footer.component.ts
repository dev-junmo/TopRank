import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../service/auth.service';

import { environment } from '../../../../../../../environments/environment';
import { Router } from '@angular/router';


@Component({
    selector: 'tb-footer',
    templateUrl: './tb-footer.component.html',
    styleUrls: ['./tb-footer.component.css']
})
export class TBFooterComponent implements OnInit {

    @Input () data;

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        private appService: AppService,
        private auth: AuthService,
        ) {

    }

    ngOnInit() {
    }

    // load() {
    //     this.footerStore.load().subscribe(resp => {
    //         this.data = resp;
    //         console.log("footer load1 ===== ");
    //     })
    // }

    // onClickTop(){
    //     // document.body.scrollTop = document.documentElement.scrollTop = 0;
    //     //window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    //     window.scrollTo(0,0);
    // }

    // onClickNoticeMenuItem() {
    //     this.router.navigate(['/board/notice/list']);
    // }


    // onClickMain(){
    //     this.router.navigate(['/home']);
    //     setTimeout(() => {
    //         window.scrollTo(0,0);
    //     }, 10);
    // }

    // onClickMyQNA() {
    //     let url = this.appService.frontAppURL + '/mypage/activity/my-qna';
    //     this.auth.gotoPageAfterLoggedIn(url);
    // }

}
