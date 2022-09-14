import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { User } from '../../../../providers/model/model.user';
// import { User } from '../../../../account/providers/model/model.user';
import { BOAuthService } from '../../../providers/service/bo-auth.service';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';

import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    style: string = "square";
    loginForm: FormGroup;
    submitted = false;
    leftTimeInterval;

    public loginTypeText: string = "관리자";
    public redirectUrl: string = '/main/home';

    public certificationNumber: number;

    public leftTime;

    public password: string;
    public passwordConfirm: string;

    public phoneNumbers = [];
    public selectedNumber: string;

    @ViewChild('templateSendingCode') template: TemplateRef<any>;
    @ViewChild('templateSendingCodeNumber') templateCodeNumber: TemplateRef<any>;
    @ViewChild('templateChangePW') templateChangePW: TemplateRef<any>;

    constructor(
        private router : Router,
        public authService : BOAuthService,
        public appConfig: AppConfigService,
        private alert : BSAlertService,
        private popupService: BOModalDialogService,
        private activateRoute : ActivatedRoute,
        private fb : FormBuilder) {

        this.loginForm = this.fb.group({
            manager_id: [],
            mpasswd: [],
            main_id: [],
            main_pwd: [],
        });
    }

    ngOnInit() {
        if (this.appConfig.isProvider) {
            this.loginTypeText = '입점사';
            this.redirectUrl = '/provider/main/home';
        }

        let url = this.activateRoute.snapshot.queryParams.redirecturl;
        if (url) {
            this.redirectUrl = url;
        }
        console.log('LoginComponent::ngOnInit queryParams =>', this.redirectUrl);
    }


    login(value) {

        console.log('login =>', value);

        this.submitted = true;

        // if (this.appConfig.isProvider) {

        //     if (!value.main_id || value.main_id.length == 0) {
        //         this.alert.show('아이디를 입력해주세요.');
        //         return;
        //     }

        //     if (!value.main_pwd || value.main_pwd.length == 0) {
        //         this.alert.show('비밀번호를 입력해주세요.');
        //         return;
        //     }

        //     // provider login
        //     value.main_id = value.main_id.trim();

        //     // 프로바이더라 관리자값은 삭제함
        //     value.manager_id = undefined;
        //     value.mpasswd = undefined;
        // } else {

            if (!value.manager_id || value.manager_id.length == 0) {
                this.alert.show('아이디를 입력해주세요.');
                return;
            }

            if (!value.mpasswd || value.mpasswd.length == 0) {
                this.alert.show('비밀번호를 입력해주세요.');
                return;
            }

            value.manager_id = value.manager_id.trim();

            // 관리자라 프로바이더 값은 삭제함
            value.main_id = undefined;
            value.main_pwd = undefined;
        // }

        this.authService.login(value, this.appConfig.isProvider).subscribe(data => {
            console.log('LoginComponent::login data =>', data);
            if (data.login) {
                let message = "로그인에 성공하였습니다.<br><br>";

                let lastDate;
                if (data.login.lastlogin_date) {
                    lastDate = moment(data.login.lastlogin_date).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    lastDate = '최초로그인';
                }
                message += "이전 로그인 일시 : " + lastDate + "<br>";

                let lastIp;
                if (data.login.lastlogin_ip) {
                    lastIp = data.login.lastlogin_ip;
                } else {
                    lastIp = '최초로그인';
                }

                message += "이전 로그인 IP : " + lastIp + "<br>";
                this.alert.show(message).subscribe(()=> {

                });
            }

            console.log("LoginComponent::login data =>", data, this.redirectUrl);

            //let clientURL

            this.router.navigate([this.redirectUrl]);

        }, error => {
            console.log("LoginComponent::login error =>", error);

            if (error.code == 9033) {  // 인증 휴대폰 선택
                this.popupSelectPhoneNumber(error.error.data);
            } else {
                this.alert.show(error.message).subscribe(()=> {
                    if (error.code == 1212) {
                        this.popupVerificationNumber();
                    } else if (error.code == 4700)  { // 비밀번호 유효기간 만료
                        this.popupChangePassword();
                    } else if (error.code == 3900) {     // 비밀번호 변경 필요
                        this.popupChangePassword();
                    } else if (error.code == 1800) {     // 비밀번호 변경 완료
                        this.clearForm();
                    }
                });
            }
        });
    }

    popupSelectPhoneNumber(numbers) {
        this.phoneNumbers = numbers;
        this.selectedNumber = numbers[0];
        this.popupService.popup(this.templateCodeNumber, null, '확인', null, null, 'mini').subscribe((resp)=>{

            if (resp == "OK") {
                this.loginForm.value.auth_hp = this.selectedNumber;
                this.login(this.loginForm.value);
                this.loginForm.value.auth_hp = '';

            } else if (resp == "CANCEL") {

            }
        });

         //인증받을 휴대폰번호 마스킹상태로 auth_hp 파라미터로 요청
    }

    onClickResendCertificationNumber() {
        clearInterval(this.leftTimeInterval);
        this.popupService.hide();
        this.loginForm.value.auth_hp = this.selectedNumber;
        this.login(this.loginForm.value);
        this.loginForm.value.auth_hp = '';
    }

    clearForm() {
        this.loginForm.get('manager_id').setValue('');
        this.loginForm.get('main_id').setValue('');
        this.loginForm.get('mpasswd').setValue('');
        this.loginForm.get('main_pwd').setValue('');
    }

    popupChangePassword() {

        this.popupService.popup(this.templateChangePW, '비밀번호 변경', '확인', null, null, 'mini').subscribe((resp)=>{

            if (resp == "OK") {

                console.log('LoginComponent::popupChangePassword password, passwordConfirm =>', this.password, this.passwordConfirm)
                this.loginForm.value.new_pwd1 = this.password;
                this.loginForm.value.new_pwd2 = this.passwordConfirm;
                this.login(this.loginForm.value);

                this.loginForm.value.new_pwd1  = '';
                this.loginForm.value.new_pwd2  = '';

            } else if (resp == "CANCEL") {

            }
        });
    }

    popupVerificationNumber() {
        let startDate = new Date(new Date().getTime() + 3 * 60 * 1000);
        this.leftTimeInterval = setInterval(() => {
            let now = new Date();
            let diffTime: number =  startDate.getTime() - now.getTime();

            // clear
            if (diffTime <= 0) {
                this.leftTime = '기간만료';
                clearInterval(this.leftTimeInterval);
                diffTime = 0;
            } else {
                this.leftTime = moment.utc(diffTime).format("mm:ss");
            }
        }, 100);

        this.popupService.popup(this.template, '인증번호 입력', '확인', null, null, 'mini').subscribe((resp)=>{

            if (resp == "OK") {
                this.loginForm.value.otp = this.certificationNumber;
                this.login(this.loginForm.value);
                clearInterval(this.leftTimeInterval);
            } else if (resp == "CANCEL") {
                clearInterval(this.leftTimeInterval);
            }
        });
    }}
