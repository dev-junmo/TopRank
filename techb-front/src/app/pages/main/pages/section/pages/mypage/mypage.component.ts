import { Component, OnInit } from '@angular/core';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../service/auth.service';
import { environment } from '../../../../../../../environments/environment';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';


@Component({
    selector: 'app-mypage',
    templateUrl: './mypage.component.html',
    styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        private appService: AppService,
        private auth: AuthService,
        ) {
        if (this.appService.isDesktopViewMode()) {
            this._redirectDesktopHome();
        }        
    }

    ngOnInit() {

    }

    // 데스크탑에서 home으로 가면 home/point로 가야 함 
    _redirectDesktopHome() {
        let currUrl = this.router.url;
        let urls = currUrl.split('/');
        console.log('_redirectDesktopHome urls =>', urls);
        if (urls[urls.length-1] == 'home') {
            this.router.navigate(['/main/section/mypage/home/point']);
        }
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
