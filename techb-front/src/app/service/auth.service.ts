import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Rx";
import { BSApi } from '../../common/core/bs-api';
import { BSAlertService } from '../../common/ui/bs-alert/index';
import { environment } from '../../environments/environment';

const TOKEN_KEY: string = 'TBClientTokenKey'; 

@Injectable()
export class AuthService {

    // state
    public _isLogined: boolean = undefined;

    // user Info
    public userid: string;
    public userSeq: string;
    public userName: string;
    public userNickName: string;
    public userEmail: string;
    public userMobile: string;
    public userGroupSeq: string;
    // public userBirthDay: string;
    // public userSex: string;
    public userGroupName: string;
    public userZipcode: string;

    // public isFirstSessionCall: boolean = true;

    constructor(
        private api: BSApi, 
        protected alert: BSAlertService, 
        private router: Router
        ) {

        this.init();

        // 로그인 여부 체크
        // setTimeout(()=> {
        //     // this.updateSession();
        //     // if (this.isFirstSessionCall) {
        //     //         this.updateSession();
        //     // }            
        // },1);    
    

        // 세션 업데이트는 액션중심으로 함
    }

    init() {
        // this.updateSession().subscribe(resp => {
        //     if (!this.isLogined()) {
        //         // if (this._loadToken()) {
        //         //     this.login(this.userid, this.user)
        //         // }
        //     }
        // });
    }

// address: ""
// address_detail: ""
// address_street: ""
// address_type: null
// birth_type: "sola"
// birthday: "1986-09-29"
// cellphone: "010-4444-5555"
// email: "techb@naver.com"
// group_seq: 1
// member_seq: 15
// order_cnt: 0
// order_sum: 0
// sex: "male"
// status: "done"
// user_name: "유저명"
// userid: "010-4444-5555"
// zipcode: ""


    setUserObject(member) {
        this.userid = member.userid;
        this.userSeq = member.member_seq;
        this.userName = member.user_name;
        this.userNickName = member.nickname;
        this.userEmail = member.email;
        this.userMobile = member.cellphone;
        this.userGroupSeq = member.group_seq;
        this.userZipcode = member.zipcode;
        // if (member.member_group.group_name) {
        //     this.userGroupName = member.member_group.group_name;
        // }
    }

    getUserObject() {
        let user = {
            userid : this.userid,
            userSeq : this.userSeq,
            userName: this.userName,
            userNickName: this.userNickName,
            userEmail : this.userEmail,
            userMobile : this.userMobile,
            userGroupSeq : this.userGroupSeq,
            userGroupName: this.userGroupName,
            zipcode: this.userZipcode
        };
        console.log('getUserObject user =>', user);
        return user;
    }

    login(userid, password, isAutoLogin = false, isSaveId = false, ignoreErrorAlert = false) {
        return this.api.postWithForm('member/session', {userid: userid, password: password}, ignoreErrorAlert).map(resp => {
            if(resp.userid) {
                this._isLogined = true;
                this.setUserObject(resp);

                // 자동 로그인일 경우
                if (isAutoLogin) {  
                    this._saveToken();
                } else {
                    this._removeToken();
                }

                // 아이디 저장일 경우
                if (isSaveId) {
                    this._saveId(resp.userid);
                } else {
                    this._removeId();
                }

                return this.getUserObject();
            } else {
                this._isLogined = false;
                //this._removeToken();
                return {userid: ''};
            }
        });
    }

    /////////////////////////////////////////////////////////////////
    //
    //

    // set userInfo(member) {
    //     this.userSeq = member.member_seq;
    //     this.userName = member.user_name;
    //     this.userEmail = member.email;
    //     this.userMobile = member.cellphone;
    //     this.userGroupSeq = member.group_seq;
    // }

    get userInfo() {
        let userInfo = {
            userSeq : this.userSeq,
            userName: this.userName,
            userNickName: this.userNickName, 
            userEmail : this.userEmail,
            userMobile : this.userMobile,
            userGroupSeq : this.userGroupSeq,
            userGroupName: this.userGroupName,
            // userBirthDay: this.userBirthDay,
            // userSex: this.userSex,
        };
        console.log('get userInfo user =>', userInfo);
        return userInfo;
    }

    // gotoPageAfterLoggedIn(url, altUrl = '') {       
    //     console.log('gotoPageAfterLoggedIn url, altUrl =>', url, altUrl);
    //     this._firstLoginCheck();

    //     if (!this._isLogined) {
    //         this.alert.confirm("로그인이 필요합니다.<br>로그인 페이지로 이동하시겠습니까?").subscribe((result) => {
                
    //             // 상대좌표라면
    //             if (url && url.charAt(0) == '/') {
    //                 url = this.appEnvService.frontAppURL + url;
    //             }

    //             // 상대좌표라면
    //             if (altUrl && altUrl.charAt(0) == '/') {
    //                 altUrl = this.appEnvService.frontAppURL + altUrl;
    //             }

    //             console.log('gotoPageAfterLoggedIn2 url, altUrl =>', url, altUrl);
    //             // params to query
    //             this.login(url, altUrl);
    //         });            
    //     } else {
    //         if (url && url.charAt(0) == '/') {
    //             console.log('gotoPageAfterLoggedIn url =>', url);
    //             this.router.navigateByUrl(url);
    //         } else {
    //             window.location.href = url;
    //         }
    //     }
    // }    
    
    // 이 페이지에 권한이 있으면 true, 
    // 없으면 로그인 할지 묻고
    // yes 하면 로그인, no하면 home으로  
    hasAuthThisPage(redirectUrl = '/') : Observable<boolean> {
        return new Observable<boolean>(observer => {
            console.log('hasAuthThisPage redirectUrl =>', redirectUrl);
        
            // 서버로의 호출이면 일단 로그인 처리 하고 updateSession 한다.
            // if (this.isFromUserServer()) {
            //     console.log('hasAuthThisPage same');
            //     observer.next(true);
            //     observer.complete();
            //     this.updateSession(); 
            // } else {
                this.updateSession().subscribe((_resp) => {
                      if (!this._isLogined) {
                        this.alert.confirm("로그인이 필요합니다.<br>로그인 페이지로 이동하시겠습니까?", "", "확인", "취소", true).subscribe((result) => {
                            if (result == "OK") {
                                // 상대좌표라면
                                if (redirectUrl && redirectUrl.charAt(0) == '/') {
                                    redirectUrl = environment.frontAppURL + redirectUrl;
                                }
                                this.navigateToLoginPage(redirectUrl);
                            } else {
                                this.router.navigateByUrl('/');
                            } 
                            observer.next(false);
                            observer.complete();               
                        });
                        return false;
                    }
                    console.log('hasAuthThisPage _isLogined =>', this._isLogined);
                    observer.next(true);
                    observer.complete();
                });
            //}
        });
    }
    
    // hasAuthAndPoint(redirectUrl = '/') {
    //     let tempPoint = 0;
    //     return new Observable<boolean>((observer) => {
    //         this.hasAuthThisPage(redirectUrl).subscribe((isLogin) => {
    //             if (isLogin) {
    //                 if (tempPoint > 0) {
    //                     observer.next(true);
    //                 } else {
    //                     this.alert.confirm("포인트가 부족하여 '포인트 충전페이지'로 이동합니다.", "", "확인", "취소", true).subscribe((result) => {
    //                         if (result == "OK") {
    //                             // 충전페이지로 이동
    //                             this.router.navigateByUrl('/main/section/payment/point-charge');                            
    //                         }
    //                         observer.next(false); 
    //                     });
    //                 }
    //                 observer.complete();
    //             } else {
    //                 observer.next(false);
    //                 observer.complete();
    //             }
    //         });
    //         // setTimeout(() => {
    //         //   console.log('done!');
    //         //   this.detailService.tempData = [1, 2, 3];
    //         //   observer.next(true);
    //         //   observer.complete();
    //         // }, 1000 * 5);
    //     });
    // }


    //}

    // 이 페이지에 권한이 있으면 true, 
    // 없으면 로그인 할지 묻고
    // yes 하면 로그인, no하면 그대로 

    // loginAfterConfirm(returnURL = '') {

    //     console.log('loginAfterConfirm returnURL =>', returnURL);        

    //     if (!returnURL) {
    //         returnURL = window.location.href;
    //     }

    //     this._firstLoginCheck();

    //     // 로그인 체크
    //     if (!this._isLogined) {
    //         this.alert.confirm("로그인이 필요합니다.<br>로그인 페이지로 이동하시겠습니까?").subscribe((result) => {

    //             this.login(returnURL);

    //             // if (result == "OK") {
    //             //     this.login(returnURL);
    //             // } else {
    //             //     if (cancelUrl && cancelUrl.length > 0) {
    //             //         this.router.navigateByUrl(cancelUrl);
    //             //     }
    //             // }                
    //         });
    //         return false;
    //     }
    //     return true;
    // }

    ////////////////////////////////////////////////////////////////
    // logout

    // logout(returnURL = '') {

    //     console.log('AuthService::logout');

    //     if (!returnURL) {
    //         returnURL = window.location.href;
    //     }

    //     // console.log('logout url =>', this._getLogoutURL(returnURL));
    //     // window.location.href = this._getLogoutURL(returnURL);        
    // }

    logout() {
        const subject = new Subject<any>();
        this.api.delete('member/session', null, null, true).subscribe(resp => {
            console.log("AuthService::logout session =>", resp);
            this.updateSession().subscribe((resp) => {
                    subject.next(resp);
                    // window.location.reload(true);
            });
        }, error => {
            this.updateSession().subscribe((resp) => {
                subject.next(resp);
            });
        });
        return subject;
    }

    // signUp() {
    //     window.location.href = this._getSignUpURL();
    // }
    
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    // login / logout

    navigateToLoginPage(returnURL = '') {
        console.log('AuthService::navigateToLoginPage returnURL =>', returnURL);
  
        if (!returnURL) {
            returnURL = window.location.href;
        }       
        window.location.href = `/account/login?redirect_url=${btoa(returnURL)}`;
    }

    // callNeedLoginForApp(url = null) {
        
    //     if (!url) {
    //         url = window.location.href;
    //     }

    //     if (this.appEnvService.isTvingIOS()) {
    //         let message = {"action" : "needLogin", "param1" : url};
    //         console.log('callNeedLoginForApp message =>', message);
    //         webkit.messageHandlers.mall.postMessage(JSON.stringify(message));        
    //     } else if(this.appEnvService.isAndriod()) {
    //         mall.needLogin(url);
    //     }       
    // }    
    
    ///////////////////////////////////////////////////
    // state

    // _firstLoginCheck() {
    //     console.log('_firstLoginCheck _isLogined =>', this._isLogined);
    //     if (this._isLogined !== undefined) {
    //         return;
    //     }        
       
    //     this._isLogined = false;
    //     //this._isLogined = this._loadToken();   
    //     console.log('_firstLoginCheck2 _isLogined =>', this._isLogined);

    //     this.updateSession();        
    // }

    public isLogined(refresh:boolean = false) {

        //this._firstLoginCheck();

        // 너무 많이 호출됨, 해더 같은데서 템플릿에 연결해서 그런듯한데 아직 모름 #todo
        // console.log('AuthService::isLogined');

        return this._isLogined;
    }  

    public isLoginedCheckUserSeq() {
        return this.userSeq && this.userSeq.length > 0;
    }    

    // 이미로그인 된 경우는 로컬쿠키에서 값을 얻음
    // 이후 updateSession 해서 세션을 상실했을 경우 불일치 문제가 있음

    getSessionDataSafe() {
        console.log('getSessionDataSafe userSeq, userGroupSeq =>', this.userSeq, this.userGroupSeq);

        // 1. 이미 로컬메모리에 있으면
        if (this.userSeq && this.userSeq !== '') {
            let subject = new Subject<any>();
            setTimeout(()=> {
                subject.next(this.getUserObject());
            },1);
            return subject;
        }
        
        // 2. 토큰에서
        // let isLogined = this._loadToken();        
        // if (isLogined) {
        //     let subject = new Subject<any>();
        //     setTimeout(()=> {
        //         subject.next({
        //             userSeq : this.userSeq,
        //             userName: this.userName,
        //             userEmail : this.userEmail,
        //             userMobile : this.userMobile,
        //             userGroupSeq : this.userGroupSeq}
        //         );
        //     },1);

        //     console.log('getSessionDataSafe1');
        //     return subject;
        // } 

        // 3. Api 요청
        console.log('getSessionDataSafe2');
        return this.updateSession();
    }
  
    updateSession() {

        let subject = new Subject<any>();

        ////////////////////////////////////////////
        // 1분이내 재실행 방지
        // if (this.ableUpdateSession == false) { 
        //     setTimeout(() => {
        //         subject.next({userName: ''});
        //     },10);
        //     return subject.asObservable(); 
        // }

        // this.ableUpdateSession = false;
        // setTimeout(() => {
        //     this.ableUpdateSession = true;
        // }, 1000*60*5);
        ////////////////////////////////////////////////    
        let referrer = document.referrer;
        let params: any = {
            // 'referrer' : referrer
        }        

        this.api.get('member/session', params).subscribe(resp => {
            if(resp.userid && resp.userid.length > 0) {
                this._isLogined = true;
                
                this.setUserObject(resp);
                subject.next(this.getUserObject());
            } else {
                this._isLogined = false;
                //this._removeToken();
                subject.next({userid: ''});
            }

            console.log("AuthService::updateSession _isLogined /  session =>",this._isLogined, resp);
        },
        error => {
            subject.error({});
        });

        return subject.asObservable(); 
    }

    //////////////////////////////////////////
    // 자동로그인
    _loadToken() {
        let token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return false;
        }
        console.log('_loadToken token =>', token);

        let _token = JSON.parse(token);
        this.setUserObject(_token);
        return true;
    }

    _saveToken() {
        let obj = this.getUserObject();
        console.log('_saveToken token =>', obj);

        // set token
        localStorage.setItem(TOKEN_KEY, JSON.stringify(obj));
    }
    _removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    ////////////////////////
    // save id
    getSavedId() {
        return this._loadId();
    }

    _loadId() {
        let obj = localStorage.getItem(TOKEN_KEY + '_id');
        if (!obj) {
            return false;
        }
        console.log('_loadId obj =>', obj);

        let _obj = JSON.parse(obj);
        if (!_obj.id) {
            return false;
        }
        return _obj.id;
    }

    _saveId(id) {
        let obj = { id: id};
        localStorage.setItem(TOKEN_KEY + '_id', JSON.stringify(obj));
    }

    _removeId() {
        localStorage.removeItem(TOKEN_KEY + '_id');
    }

}
