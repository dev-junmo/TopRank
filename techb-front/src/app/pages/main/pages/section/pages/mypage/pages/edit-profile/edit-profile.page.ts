import { Component, OnInit } from '@angular/core';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../../environments/environment';
import { Router} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { MemberStore } from '../../../../../../../../store/member.store';
import { FormBuilder } from '@angular/forms';
import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert';


@Component({
    selector: 'edit-profile',
    templateUrl: './edit-profile.page.html',
    styleUrls: ['./edit-profile.page.css']
})
export class EditProfilePageComponent implements OnInit {
    
    public loginIdType: string;

    public isShowPassword: boolean = false;
    public isShowPasswordCheck: boolean = false; 

    public confirmPw: boolean = false;
    public password;
    
    public passwordCheck;
    public FIELD_STATE_TYPE = {'READY': 0, 'INVALID': 1, 'VALID': 2};
    
    public userInfo = {
        userId: '',
        userNickName: ''
    };
    public editProfileForm = this.formBuilder.group({
        password_new: '',
        email: '',
        zipcode: ''
    });

    public fieldState = {
        'password': this.FIELD_STATE_TYPE.READY, 
        'passwordCheck': this.FIELD_STATE_TYPE.READY, 
        'email': this.FIELD_STATE_TYPE.READY,   
        'zipcode': this.FIELD_STATE_TYPE.READY
    }

    constructor(
        private router :Router,
        private formBuilder: FormBuilder,
        private alert: BSAlertService,
        private memberStore: MemberStore,
        private appService: AppService,
        private auth: AuthService,
        ) {

    }

    ngOnInit() {
        this.loadFormDataFromSession();
        console.log('this.auth.getUserObject =>', this.auth.getUserObject());
    }

    loadFormDataFromSession() {
        let user = this.auth.getUserObject();

        this.userInfo.userId = user.userid;
        this.userInfo.userNickName = user.userNickName;


        if(user.userid.indexOf('@') == -1) {
            this.loginIdType = 'phone';
        } else {
            this.loginIdType = 'email';
        }
        //추천인코드

        let params = {
            email: user.userEmail,
            zipcode: user.zipcode
        }

        this.editProfileForm.patchValue(params);
    }
    
    //가입하기 활성화 확인 true = disabled
    validCheck() {
        // check required field 
        let fields = ['password', 'passwordCheck', 'email', 'zipcode'];
        let hasValid: boolean = false;

        for(let field of fields) {
            if (this.fieldState[field] == this.FIELD_STATE_TYPE.INVALID) {
                return false;
            } 
            if(this.fieldState[field] == this.FIELD_STATE_TYPE.VALID) {
                hasValid = true;
            }
        };

        if(this.fieldState['password'] == this.FIELD_STATE_TYPE.VALID) {
            if(this.fieldState['passwordCheck'] !== this.FIELD_STATE_TYPE.VALID) {
                return false;
            }
        }
        return hasValid;
    }

    // loadMemberData() {
    //     this.memberStore.get().subscribe(resp => {
            
    //     });
    // }

    //형식 체크
    onKeyup(fieldName, value) {
        console.log('onKeyup fieldName, value =>', fieldName, value);
        let regTelegram = /^(\d{9}):([0-9A-Za-z]{35})$/;
        let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        let regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[,.$@$!%*#?&])[A-Za-z\d$@$.,!%*#?&]{8,15}$/;
        
        if(fieldName == 'password' && this.fieldState['passwordCheck'] !== this.FIELD_STATE_TYPE.READY) {
            if( this.editProfileForm.value.password_new == this.passwordCheck) {
                this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.INVALID;
            }
        }

        if(!value || value.length == 0) {
            this.fieldState[fieldName] = this.FIELD_STATE_TYPE.READY;
            return;
        }

        if(fieldName == 'password_new') {
            if(regPassword.test(value) === true ) {
                this.fieldState['password_new'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['password_new'] = this.FIELD_STATE_TYPE.INVALID;
            }
        } else if(fieldName == 'passwordCheck') {
            if( this.editProfileForm.value.password_new == this.passwordCheck) {
                this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.INVALID;
            }
        } else if(fieldName == 'email') {
            if(regEmail.test(value) === true ) {
                this.fieldState['email'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['email'] = this.FIELD_STATE_TYPE.INVALID;
            }
        } else if(fieldName == 'zipcode') {
            if(regTelegram.test(value) === true) {
                this.fieldState['zipcode'] = this.FIELD_STATE_TYPE.VALID;
            }  else {
                this.fieldState['zipcode'] = this.FIELD_STATE_TYPE.INVALID;
            }
        }
    }

    // event handler 
    // 비밀번호 보이기/숨기기
    onClickShowPassword(type) {        
        if(type == 'check') {
            this.isShowPasswordCheck = !this.isShowPasswordCheck;
        } else {
            this.isShowPassword = !this.isShowPassword;
        }
    }

    onClickPasswordCheckBtn() {
        // 비밀번호 대조
        if(!this.password || this.password.length == 0) {
            this.alert.show('비밀번호를 입력해주세요.');
            return;
        }

        this.auth.login(this.auth.getUserObject().userid, this.password, false, false, true).subscribe(resp => {
            if(this.auth.isLogined()) {
                this.confirmPw = true;
                this.loadFormDataFromSession();
            } else {
                this.confirmPw = false;
            }
        }, error => {
            this.alert.show('비밀번호가 일치하지 않습니다.');
        });
    }

    onSubmit() {
        // 비밀번호 변경할 경우
        let params: any = this.editProfileForm.value;
        if(this.fieldState['passwordCheck'] == this.FIELD_STATE_TYPE.VALID) {
            params['password_new_confirm'] = params.password_new;
        } else {
            delete params.password_new;
        }

        // 기존 비밀번호
        params['password'] = this.password;
        
        //api 호출
        this.memberStore.editProfile(params).subscribe(resp => {
            this.alert.show('회원정보가 수정되었습니다.');         
            this.resetChangePassword();
        });
        console.log('edit-profile onSubmit editProfileForm value =>', this.editProfileForm.value);

        
        // login api . sub (resp => {
        //         this.editProfileForm.patchValue(resp)
        // },{ })
        // this.editProfileForm.patchValue(resp)
    }

    resetChangePassword() {
        this.editProfileForm.get('password_new').setValue('');
        this.passwordCheck = '';
        this.fieldState['password_new'] = this.FIELD_STATE_TYPE.READY;
        this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.READY;
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
