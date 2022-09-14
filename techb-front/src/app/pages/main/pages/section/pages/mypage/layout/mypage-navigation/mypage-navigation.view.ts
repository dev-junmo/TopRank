import { Component, Input, OnInit } from '@angular/core';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../../environments/environment';
import { Router} from '@angular/router';
import { MemberStore } from '../../../../../../../../store/member.store';
import { RewardStore } from '../../../../../../../../store/reward.store';


@Component({
    selector: 'mypage-navigation-view',
    templateUrl: './mypage-navigation.view.html',
    styleUrls: ['./mypage-navigation.view.css']
})
export class MypageNavigationView implements OnInit {
    
    public loginIdType: string;
    public isShowSharePopup: boolean = false;
    public myProfile: any = {};

    // mobile
    public isShowBottomTelegramArea = false;
    public isShowUserTier = false;
    public isShowMoreActivityMenu = false;
    public isShowMorInfoMenu = false;

    constructor(
        private router :Router,
        private memberStore: MemberStore,
        private rewardStore: RewardStore,
        private appService: AppService,
        private auth: AuthService,
        ) {

    }

    ngOnInit() {
        this.memberStore.getSummary().subscribe(resp => {
            this.myProfile = resp;
            console.log('mypage-navigation-view Init::mypageStore get resp =>', this.myProfile);
            
            if(this.myProfile.member.userid.indexOf('@') == -1 ) {
                this.loginIdType = 'phone';
            } else {
                this.loginIdType = 'email';
            }
        });
    }

    onClickPopup() {
        this.isShowSharePopup = true;
    }

    //mobile member point 메뉴
    onClickBottomPoint() {
        this.isShowBottomTelegramArea = !this.isShowBottomTelegramArea;
    }

    onClickUserTier() {
        this.isShowUserTier = !this.isShowUserTier;
    }

    onClickMoreMenu(type) {
        if(type == 'activity') {
            this.isShowMoreActivityMenu = !this.isShowMoreActivityMenu;
        } else if ( type == 'info') {
            this.isShowMorInfoMenu = !this.isShowMorInfoMenu;
        }
    }

    // mobile copy 복사
    copyToRecommendCode(el, code) {
        console.log('copyToRecommendCode code => ', code);
        if (!code) { return; }
        this.appService.copyToClipboard(el, code);
    }

    // 모바일 로그아웃 버튼
    onClickLogout() {
        this.auth.logout().subscribe(resp => {
            this.router.navigate(['/main/home']);
        });
    }

    onClickCopyRecomandCode() {
        
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
 