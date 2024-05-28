import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../service/auth.service';

import { environment } from '../../../../../../../environments/environment';


@Component({
    selector: 'tb-header',
    templateUrl: './tb-header.component.html',
    styleUrls: ['./tb-header.component.css']
})
export class TBHeaderComponent implements OnInit {

    @Input () data;
    public isLogined: boolean;
    // public isShowMydashboardBtn: boolean = true;

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        private appService: AppService,
        private auth: AuthService,
        ) {
    }

    ngOnInit() {

        this.auth.updateSession().subscribe(resp => {
            if (resp.userid && resp.userid.length > 0) {
                this.isLogined = this.auth.isLogined();
            }
        });

        //
        // this.router.events.subscribe((event) => {
        //     this.isLogined = this.auth.isLogined();
        //     // if (event instanceof NavigationEnd) {
        //     //     this.isShowMydashboardBtn =  this.router.url !== '/main/section/dashboard' && this.isLogined;
        //     // }
        // });
    }

    // load() {
    //     this.footerStore.load().subscribe(resp => {
    //         this.data = resp;
    //         console.log("footer load1 ===== ");
    //     })
    // }

    // onClickBrand() {
    //     this.isHidden= !this.isHidden;

    // }

    // onClickAffiliate(){
    //     this.isHidden2= !this.isHidden2;
    // }

    // onClickLinkMenuItem() {
    //     this.isHidden = true;
    //     this.isHidden2 = true;
    // }

    // onClickTop(){
    //     // document.body.scrollTop = document.documentElement.scrollTop = 0;
    //     //window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    //     window.scrollTo(0,0);
    // }

    // onClickFaqMenuItem() {
    //     this.router.navigate(['/board/faq/list']);
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
