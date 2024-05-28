import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../../../../common/service/app.service';
import { AuthService } from '../../../../service/auth.service';
import { BSAlertService } from '../../../../../common/ui/bs-alert';
import { environment } from '../../../../../environments/environment';
import { runInThisContext } from 'vm';
import { MemberStore } from '../../../../store/member.store';


@Component({
    selector: 'find-pw',
    templateUrl: './find-pw.page.html',
    styleUrls: ['./find-pw.page.css']
})
export class FindPwPageComponent implements OnInit {
    
    public selectedFindTabName: string = 'email';
    public step: string = 'findId';

    findIdForm = this.formBuilder.group({
        userIdWithEmail: '',
        userIdWithPhone: '',
        email: '',
    });


    constructor(
        private router :Router,
        private memberStore: MemberStore,
        private formBuilder: FormBuilder,
        private appService: AppService,
        private auth: AuthService,
        private alert: BSAlertService,
        ) {
    }

    ngOnInit() {
    }

    isPhoneValid(value) {
        let regPhone = /^(01[0-9])([0-9]{4})([0-9]{4})$/;

        if(regPhone.test(value) === false) {
            this.alert.show('휴대폰 항목은 휴대폰 형식이여야 합니다.');
            return false;
        }
        return true;
    }

    isValid(value) {
        let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        if(regEmail.test(value) === false) {
            this.alert.show('이메일 항목은 이메일 형식이여야 합니다.');
            return false;
        }
        return true;
    }

    onClickSelectedTab(tabName) {
        this.selectedFindTabName = tabName;
        this.step = 'findId';

        this.findIdForm.controls.userIdWithPhone.setValue('');
        this.findIdForm.controls.userIdWithEmail.setValue('');
    }

    onSubmitId() {
        if (this.selectedFindTabName == 'phone' && this.step == 'findId') {
            this.onClickNext();
            return;
        }
        let formValue = this.findIdForm.value;
        let id, email;

        if (this.selectedFindTabName == 'email') {
            if(!this.findIdForm.value.userIdWithEmail || this.findIdForm.value.userIdWithEmail.length == 0) {
                this.alert.show('비밀번호를 찾으려는 이메일 아이디를 입력해 주세요.');
                return;
            }  
            id = formValue.userIdWithEmail;
            email = formValue.userIdWithEmail;
        } else if (this.selectedFindTabName == 'phone') {
            id = formValue.userIdWithPhone;
            email =  formValue.email;
        }

        // email 형식 체크
        if (!this.isValid(email)) {
            return;
        }

        console.log('onSubmitId findIdForm.value =>', this.findIdForm.value);
        this.memberStore.findPw(id, email).subscribe(resp => {
            console.log('onSubmitId:::findPw resp =>', resp);
            this.alert.show('로그인 후 비밀번호를 꼭 변경해주세요!','입력하신 이메일 주소로<br>임시 비밀번호가 전송되었습니다.').subscribe(resp => {
                this.router.navigate(['account/login']);
            });
        });


    }

    onClickNext() {
        let formValue = this.findIdForm.value;
        
        console.log('onClickNext formValue =>', formValue);
        // phone 형식 체크
        if (!this.isPhoneValid(formValue.userIdWithPhone)) {
            return;
        }

        if (this.selectedFindTabName == 'phone') {
            if(!this.findIdForm.value.userIdWithPhone || this.findIdForm.value.userIdWithPhone.length == 0) {
                this.alert.show('비밀번호를 찾으려는 휴대폰 아이디를 입력해 주세요.');
            } else {
                this.step = 'email';
            }
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
