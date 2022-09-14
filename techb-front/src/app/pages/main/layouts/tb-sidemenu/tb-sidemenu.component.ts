import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../common/service/app.service';
import { AuthService } from '../../../../service/auth.service';
import { environment } from '../../../../../environments/environment';
import { BSAlertService } from '../../../../../common/ui/bs-alert';


@Component({
    selector: 'tb-sidemenu',
    templateUrl: './tb-sidemenu.component.html',
    styleUrls: ['./tb-sidemenu.component.css']
})
export class TBSidemenuComponent implements OnInit {

    public isLogined: boolean = false; //로그인 세션이 없을시
    public selectedBoardMenu: boolean = false;
    public userName: string = '';

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        public appService: AppService,
        private alert: BSAlertService,
        private auth: AuthService,
        ) {
            
        }

    ngOnInit() {
        setTimeout(()=> {
            this.isLogined = this.auth.isLogined();
            if(this.isLogined) {
                this.userName = this.auth.userName;
                if(!this.userName) {
                    this.userName = this.auth.userNickName;
                }
            } 
        }, 100);
    }

    onClickLoginBtn() {
        this.router.navigateByUrl('/account/login');
    }

    onClickUserBtn() {
        let origin =  this.appService.isShowMenuPopup;
        setTimeout(()=> {
            this.appService.isShowMenuPopup = !origin;
        },1);
    }

    onClickBoardBtn() {
        // this.selectedBoardMenu = !this.selectedBoardMenu;
        this.alert.show('준비중입니다.');
    }

    onClickLogout() {
        this.auth.logout().subscribe(resp => {
            console.log("onClickLogout resp =>", resp);
            this.router.navigateByUrl('/main/home');
        });
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
