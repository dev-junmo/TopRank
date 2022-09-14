import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../common/service/app.service';
import { AuthService } from '../../../../service/auth.service';
import { environment } from '../../../../../environments/environment';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BSAlertService } from '../../../../../common/ui/bs-alert';
import { MemberStore } from '../../../../store/member.store';
import { unwatchFile } from 'fs';
import { runInThisContext } from 'vm';


@Component({
    selector: 'signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.css']
})
export class SignupPageComponent implements OnInit {
    
    @ViewChild('memberTermsContents') memberTemplate:TemplateRef<any>;
    @ViewChild('privacyTermsContents') privacyTemplate:TemplateRef<any>;
    @ViewChild('mailingTermsContents') mailingTemplate:TemplateRef<any>;

    public type;

    public passwordCheck: string;
    public termsTitle: string;
    public termsContents: any;
    public isShowPassword: boolean = false;
    public isShowCheckPassword: boolean = false;  
    
    public isShowTerms: boolean = false;
    public FIELD_STATE_TYPE = {'READY': 0, 'INVALID': 1, 'VALID': 2};

    // 중복 확인
    public isUniqueId: boolean = false;
    public isUniqueNickname: boolean = false;  

    // terms
    public termsType;
    public terms = {
        'memberTerms': {
            title: '회원 이용약관 동의',
        },
        'privacyTerms': {
            title: '개인정보 수집 및 이용에 관한 동의',
        },
        'mailingTerms': {
            title: '이메일 정보 수신 여부에 대한 동의',
        }
    }

    public termsTemplate:TemplateRef<any>;
    public fieldState = {
        'userid': this.FIELD_STATE_TYPE.READY,  // required
        'nickname': this.FIELD_STATE_TYPE.READY,    // required
        'password': this.FIELD_STATE_TYPE.READY,    // required
        'passwordCheck': this.FIELD_STATE_TYPE.READY,   // required
        'email': this.FIELD_STATE_TYPE.READY,   
        'recommend': this.FIELD_STATE_TYPE.READY,
        'telegram': this.FIELD_STATE_TYPE.READY
    }
    public termsCheckboxs = {
        all: false,
        member: false,
        privacy: false,
        age14: false,
        mailing: false
    };
    public signupForm = this.formBuilder.group({
        userid: '',
        email: '',
        password: '',
        nickname: '',
        parent_recommend_code: '',
        zipcode: ''
    });

    constructor(
        private router :Router,
        private memberStore: MemberStore,
        private appService: AppService,
        private auth: AuthService,
        private alert: BSAlertService,
        private formBuilder: FormBuilder,
        private activateRouter: ActivatedRoute
        ) {

        this.activateRouter.params.subscribe(params => {
            this.type = params['type'];
        });

    }

    ngOnInit() {
    }

    get typeName() {
        return this.type == "email"? '이메일': '휴대폰';
    }

    get placeholder() {
        return this.type == "email"? 'toprank@toprank.co.kr': '01012345678';
    }

    //전체 동의
    onChangeAllCheck(value) {
        console.log('onChangeAllCheck event =>', value);
        //this.termsCheckboxs.all = true;
        this.termsCheckboxs.member = value;
        this.termsCheckboxs.privacy = value;
        this.termsCheckboxs.age14 = value;
        this.termsCheckboxs.mailing = value;
    }

    onChangeAgreeCheck(value) {
        if(!value) {
            this.termsCheckboxs.all = false;
        }
    }

    //가입하기 활성화 확인 true = disabled
    requiredCheck() {
        // check required field 
        let requiredFields = ['userid', 'nickname', 'password', 'passwordCheck'];
        for(let field of requiredFields) {
            if (this.fieldState[field] !== this.FIELD_STATE_TYPE.VALID) {
                return false;
            }   
        }

        // check temrms 
        if(!this.termsCheckboxs.member || !this.termsCheckboxs.age14 || !this.termsCheckboxs.privacy) {
            return false;
        }
        return true;
    }

    isValid() {
        if (!this.isUniqueId) {
            this.alert.show('아이디 중복확인을 해주세요.');
            return false;
        }
        if (!this.isUniqueNickname) {
            this.alert.show('프로필명 중복확인을 해주세요.');
            return false;
        }
        // 중복확인 
        return true;
    }

    // id 중복확인
    onClickCheckUniqueIdBtn() {
        this.memberStore.useridUniqueCheck(this.signupForm.value.userid).subscribe(resp => {
            this.isUniqueId = true;
            this.alert.show('사용 가능한 아이디입니다.');
        }, error => {
            this.isUniqueId = false;
            this.alert.show(`입력한 [${this.signupForm.value.userid}] 는 이미 사용 중인 회원 아이디입니다.`);
        });
    }

    // nickname중복확인
    onClickCheckUniqueNicknameBtn() {
        this.memberStore.nicknameUniqueCheck(this.signupForm.value.nickname).subscribe(resp => {
            this.isUniqueNickname = true;
            this.alert.show('사용 가능한 프로필 명입니다.');
        }, error => {
            this.isUniqueNickname = false;
            this.alert.show(`입력한 [${this.signupForm.value.nickname}] 는 이미 사용 중인 프로필 명입니다.`);
        });
    }

    //형식 체크
    onKeyup(fieldName, value) {
        console.log('onKeyup fieldName, value =>', fieldName, value);
        let regUserid = /^01([0-9])([0-9]{4})([0-9]{4})$/;
        let regNickname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]{2,10}$/;
        let regRecommend = /^[a-zA-Z0-9]{1,}$/;
        let regTelegram = /^(\d{10}):([0-9A-Za-z]{35})$/;
        let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        let regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[,.$@$!%*#?&])[A-Za-z\d$@$.,!%*#?&]{8,15}$/;

        if(fieldName == 'password' && this.fieldState['passwordCheck'] !== this.FIELD_STATE_TYPE.READY) {
            if( this.signupForm.value.password == this.passwordCheck) {
                this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.INVALID;
            }
        }
        if(!value || value.length == 0) {
            this.fieldState[fieldName] = this.FIELD_STATE_TYPE.READY;
            return;
        }

        if (fieldName == 'userid') {
            this.isUniqueId = false;
            // validation check
            // let isValid = false;
            if (this.type == 'email') {
                if(regEmail.test(value) === true) {
                    // isValid = true;
                    this.fieldState['userid'] = this.FIELD_STATE_TYPE.VALID;
                }   else {
                    this.fieldState['userid'] = this.FIELD_STATE_TYPE.INVALID;
                }
            } else if(this.type == 'phone') {
                if(regUserid.test(value) === true) {
                    // isValid = true;
                    this.fieldState['userid'] = this.FIELD_STATE_TYPE.VALID;
                } else {
                    this.fieldState['userid'] = this.FIELD_STATE_TYPE.INVALID;
                }
            } 
        } else if(fieldName == 'password') {
            if(regPassword.test(value) === true ) {
                this.fieldState['password'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['password'] = this.FIELD_STATE_TYPE.INVALID;
            }
        } else if(fieldName == 'passwordCheck') {
            if( this.signupForm.value.password == this.passwordCheck) {
                this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['passwordCheck'] = this.FIELD_STATE_TYPE.INVALID;
            }
        } else if(fieldName == 'nickname') {
            this.isUniqueNickname = false;
            if(regNickname.test(value) === true ) {
                this.fieldState['nickname'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['nickname'] = this.FIELD_STATE_TYPE.INVALID;
            }
        } else if(fieldName == 'email') {
            if(regEmail.test(value) === true ) {
                this.fieldState['email'] = this.FIELD_STATE_TYPE.VALID;
            } else {
                this.fieldState['email'] = this.FIELD_STATE_TYPE.INVALID;
            }
        } else if(fieldName == 'recommend') {
            if(regRecommend.test(value) === true) {
                this.fieldState['recommend'] = this.FIELD_STATE_TYPE.VALID;
            }  else {
                this.fieldState['recommend'] = this.FIELD_STATE_TYPE.INVALID;
            }
        } else if(fieldName == 'telegram') {
            if(regTelegram.test(value) === true) {
                this.fieldState['telegram'] = this.FIELD_STATE_TYPE.VALID;
            }  else {
                this.fieldState['telegram'] = this.FIELD_STATE_TYPE.INVALID;
            }
        }
    }

    onSubmit() {
        // 중복확인 체크
        if (!this.isValid()) { return; }

        console.log('onSubmit signupForm.value =>', this.signupForm.value);
        
        let params = this.signupForm.value;
        console.log('onSubmit formValue =>', params);

        //회원가입 타입
        if(this.type == 'email') {
            params['email'] = this.signupForm.value.userid;
        } else {
            // params['cellphone'] = this.signupForm.value.userid;
        }

        //메일 수신 여부
        if(this.termsCheckboxs.mailing == true) {
            params['mailing'] = 'Y';
        } else {
            params['mailing'] = 'N';
        }

        this.memberStore.join(params).subscribe( resp => {
            this.alert.show('로그인 후 이용해주세요.', '회원가입이 완료되었습니다.').subscribe(resp => {
                if(resp == 'OK') {
                    this.router.navigate(['/account/login']);
                }
            });
        });
    }

    //password 숨기기/보이기
    onClickShowPassword(type) {
        if(type == 'basic') {
            this.isShowPassword = !this.isShowPassword;
        } else if(type == 'check') {
            this.isShowCheckPassword = !this.isShowCheckPassword;
        }
    }

    //아이디찾기 alert
    onClickFindId() {
        this.alert.show('고객센터에 문의해 주시기 바랍니다.<br>(000-000-0000)','아이디 찾기');
    }

    // terms popup
    onClickShowTermsBtn(type) {
        this.isShowTerms = true;
        console.log('onClickShowTermsBtn type =>', type);
        this.termsType = type;
        this.termsTitle = this.terms[type].title;
        if(type == 'memberTerms') {
            this.termsTemplate = this.memberTemplate
        } else if (type == 'privacyTerms') {
            this.termsTemplate = this.privacyTemplate
        }   else if (type == 'mailingTerms') {
            this.termsTemplate = this.mailingTemplate
        }
    }

    onClickTermsAgree(type) {
        this.isShowTerms = false;
        if(type == 'memberTerms') {
            this.termsCheckboxs.member = true;
        } else if (type == 'privacyTerms') {
            this.termsCheckboxs.privacy = true;
        }   else if (type == 'mailingTerms') {
            this.termsCheckboxs.mailing = true;
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
