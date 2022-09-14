import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../common/service/app.service';
import { AuthService } from '../../../../service/auth.service';
import { BSAlertService } from '../../../../../common/ui/bs-alert';

@Component({
    selector: 'login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.css']
})
export class LoginPageComponent implements OnInit {

    public isShowPassword: boolean = false;

    loginForm = this.formBuilder.group({
        userid: '',
        password: '',
        autoLogin: false,
        saveId: false,
    });
    public redirectUrl: string;

    constructor(
        private router :Router,
        private appService: AppService,
        private alert: BSAlertService,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private activateRouter: ActivatedRoute
        ) {

    }

    ngOnInit() {
        // 아이디 저장
        let savedId = this.auth.getSavedId();
        if (savedId) {
            this.loginForm.get('userid').setValue(savedId);
            this.loginForm.get('saveId').setValue(true);
        }

        // redirect url
        this.activateRouter.queryParams.subscribe(queryParams => {
            if (queryParams.redirect_url) {
                this.redirectUrl = atob(queryParams.redirect_url); // queryparam전달 안도서 base64로 엔코딩되엉 옴
            }
        });
    }

    // onChangeAllCheck(value) {
    //     alert(value);
    //     //console.log('onChangeAllCheck event =>', event);
    // } 

    isValid() { 
        if(!this.loginForm.value.userid || this.loginForm.value.userid < 0) {
            this.alert.show('아이디를 입력해주세요.');
            return false;
        }
        
        if(!this.loginForm.value.password || this.loginForm.value.password < 0) {
            this.alert.show('비밀번호를 입력해주세요.');
            return false;
        }
        return true;
    }


    onSubmit() {
        if(!this.isValid()) {
            return;
        }
        
        console.log('onSubmit loginForm.value, redirectUrl =>', this.loginForm.value, this.redirectUrl);

        let userid = this.loginForm.value.userid;
        let regUserid = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        
        if(regUserid.test(userid) === true) {
            // this.alert.show('입력된 값은 휴대폰 입니다.');
        } else if(regEmail.test(userid) === true) {
            // this.alert.show('입력된 값은 이메일 입니다.');
        }

        this.auth.login(this.loginForm.value.userid, this.loginForm.value.password, 
            this.loginForm.value.autoLogin, this.loginForm.value.saveId, 
            ).subscribe(resp => {
            console.log('onSubmit::login resp =>', resp);
            if (resp && resp.userid) {
                let redirectUrl;
                if (this.redirectUrl) {
                    redirectUrl = this.redirectUrl;
                } else {
                    redirectUrl = '/main/section/dashboard';
                }
                //alert('이동 =>'+ redirectUrl)
                // 데쉬보드 페이지로 이동
                this.appService.navigate(redirectUrl);
            }
        });
    }

    onClickFindId() {
        this.alert.show('고객센터에 문의해 주시기 바랍니다.<br>(000-000-0000)','아이디 찾기');
    }

    onClickShowPassword() {
        this.isShowPassword = !this.isShowPassword;
        // this.alert.show(this.isShowPassword);
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
