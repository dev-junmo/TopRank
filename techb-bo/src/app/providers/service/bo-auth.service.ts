import { Injectable, EventEmitter } from '@angular/core';
import { BSApi } from '@bricks/common/core/bs-api';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BOModalDialogService } from '../../common/popup/bo-modal-dialog';
import { Http, RequestOptions, Headers } from "@angular/http";

@Injectable()
export class BOAuthService {

    // 로그인 유형
    public isProvider: boolean = false;
    public isProviderByManager: boolean = false;

    // manager session
    public loginURL: string = '/login';
    public _isLogined: boolean = null;
    public managerId: string;
    public managerName: string;
    public managerEmail: string;
    public managerSeq: string;
    public isManager: boolean = false;

    // provider session
    public providerLoginURL: string = '/provider/login';
    public _isProviderLogined: boolean = null;
    public providerId: string;
    public providerName: string;
    public providerEmail: string;
    public providerSeq: string;
    public pmember: string;

    // 권한 정보
    public authData: any;
    public boardAuthData: any;

    public listenLoginEvent = new EventEmitter();
    public listenLogoutEvent = new EventEmitter();

    constructor(
        private api: BSApi,
        protected router: Router,
        private modalService: BOModalDialogService,
        protected alert: BSAlertService) {

        console.log("BOAuthService::constructor _isLogined", this._isLogined, this.isProvider, this.router);

        // setTimeout(()=> {
        //     this.updateSession();
        // },1);

        // // 1시간 간격
        // setInterval(()=> {
        //     this.updateSession();
        // }, 1000*60*60);
    }

    public isLogin(isProvider = false) {
        if (isProvider) {
            return this.isProviderLogin();
        }

        console.log('isLogin _isLogined =>', this._isLogined);

        if (this._isLogined === null) {
            console.log("BOAuthService::isLogined => 최소 null로 비로그인 판단됨");

            this.updateSession().subscribe((resp) => {
                //subject.next(resp);
            });

            let token = localStorage.getItem("managerSeq");
            if (token) {
                console.log("isLogin1 token2 =>", token);
                this.loadToken(token);
                return true;
            }

            return false;
        } else if (this._isLogined === false) {
            let token = localStorage.getItem("managerSeq");
            if (token) {
                console.log("isLogin1 token3 =>", token);
                this.loadToken(token);
                return true;
            }
            return false;
        }
        return this._isLogined;
    }

    public isProviderLogin() {

        console.log("isProviderLogin _isProviderLogined =>", this._isProviderLogined);

        if (this._isProviderLogined === null) {
            console.log("BOAuthService::isProviderLogined => 최소 null로 비로그인 판단됨");

            this.updateSession(true).subscribe((resp) => {

            });

            let token = localStorage.getItem("providerSeq");
            if (token) {
                console.log("isLogin1 token2 =>", token);
                this.loadToken(token);
                return true;
            }
            return false;
        } else if (this._isProviderLogined === false) {
            let token = localStorage.getItem("providerSeq");
            if (token) {
                console.log("isLogin1 token3 =>", token);
                this.loadToken(token);
                return true;
            }
            return false;
        }
        return this._isProviderLogined;
    }

    public gotoLoginPage() {
        this.router.navigate([this.loginURL]);
    }

    public gotoProviderLoginPage() {
        this.router.navigate([this.providerLoginURL]);
    }

    login(value, isProvider: boolean = false) {

        this.isProvider = isProvider;

        // 이렇게 안해도 변환을 해주지만 여기서는 이렇게 명시적으로 하는 것으로
        if (isProvider) {
            return this._login(value, 'provider/session');
        }
        return this._login(value, 'admin/session');
    }

    // 입점사관리자 로그인 / 관리자로
    loginProviderByManager(providerSeq, providerId, providerName, pmember) {

        let params = {
            manager_id: this.managerId,
            manager_seq: this.managerSeq,
            provider_seq: providerSeq,
            provider_id: providerId,
            provider_name: providerName,
            pmember: pmember
        };

        this.isProviderByManager = true;

        console.log("loginProviderByManager params =>", params);

        const subject = new Subject<any>();

        this.api.post('admin/provider/provider/provider_login', params, null, true).subscribe(resp => {
            //console.log("AccountBoxComponent:login resp =", resp);
            console.log('BOAuthService::login success resp =>', resp);
            this.listenLoginEvent.emit();

            this.updateSession(true).subscribe(_resp => {
                subject.next({session:_resp, login: resp});

            }, error => {
                subject.error(error);
            });

        }, error => {
            console.log('BOAuthService::login error =>', error);
            subject.error(error);
        });

        return subject;
    }

    _login(value, command) {

        console.log("_login =>", value, command);

        const subject = new Subject<any>();

        let body:URLSearchParams = new URLSearchParams();
        body.append('manager_id', value.manager_id);
        body.append('mpasswd', value.mpasswd);
        let headers = new Headers();
        console.log(headers);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('enctype', 'multipart/form-data');  
        headers.append('Accept', 'application/json');

        //headers.append('Accept', '*/*');
        let options = new RequestOptions({ withCredentials: true, headers: headers });

        this.api.post2(command, body.toString(), options).subscribe(resp => {
        // this.api.post(command, value, null, true).subscribe(resp => {
            //console.log("AccountBoxComponent:login resp =", resp);
            console.log('BOAuthService::login success resp =>', resp);
            this.listenLoginEvent.emit();

            this.updateSession(this.isProvider).subscribe(_resp => {
                subject.next({session:_resp, login: resp});
            }, error => {
                subject.error(error);
            });
        }, error => {
            console.log('BOAuthService::login error =>', error);
            subject.error(error);
        });

        return subject;
    }

    logout(isProvider = false) {

        let command;
        if (isProvider) {
            command = 'provider/session';
        } else {
            command = 'admin/session';
        }

        return this._logout(command);
    }

    _logout(command) {

        const subject = new Subject<any>();

        this.api.delete(command).subscribe(resp => {

            console.log("BOAuthService::logout session =>", resp);

            this.updateSession(this.isProvider).subscribe((resp) => {

                console.log("BOAuthService::logout2 resp =>", resp);
                this.listenLogoutEvent.emit();
                // 로그아웃 성공 시
                subject.next(resp);
            }, (error) => {

                console.log("BOAuthService::logout3 error =>", error);
                this.listenLogoutEvent.emit();
                // updateSession에서 기대 세션이 없으면 error로 보냄
                subject.next(error);
            });
        });

        return subject;
        //return this.api.delete('member/session');
    }

    updateSession(isProvider?: boolean) {

        if (isProvider) {
            this.isProvider = isProvider;
        }

        console.log("BOAuthService::updateSession isProvider =>", this.isProvider);

        let subject = new Subject<any>();

        this.isManager = false;

        this.api.get('admin/session').subscribe(resp => {
            console.log("BOAuthService::updateSession session =>", resp);

            // temp
            if (resp.manager_seq) {
                resp = {
                    passport: {
                        user: {
                            manager: resp
                        }
                    }
                };
            }
            // 
            if (!this.isProvider) {
                // check manager session
                if(resp.passport && resp.passport.user.manager) {
                    this._isLogined = true;
                    this.managerId = resp.passport.user.manager.manager_id;
                    this.managerName = resp.passport.user.manager.mname;
                    this.managerSeq = resp.passport.user.manager.manager_seq;
                    this.isManager = resp.passport.user.manager.manager_yn == 'Y';  // 슈퍼관리자인지
                    this.authData = resp.passport.user.manager.manager_auth;
                    this.boardAuthData = resp.passport.user.manager.boardadmin;

                    console.log("BOAuthService::updateSession2 managerId, managerName, managerSeq, isManager, authData, boardAuthData =>",
                        this.managerId, this.managerName, this.managerSeq, this.isManager, this.authData, this.boardAuthData);

                    let obj = {
                        managerId : this.managerId,
                        managerName : this.managerName,
                        managerSeq : this.managerSeq,
                        authData: this.authData,
                        isManager: this.isManager
                    };

                    // set token
                    localStorage.setItem("managerSeq", JSON.stringify(obj));
                    subject.next(obj);
                } else {
                    this._isLogined = false;

                    // set token
                    localStorage.removeItem("managerSeq");

                    subject.error({managerName: ''});
                }
            } else {
                // check provider session
                if(resp.passport &&
                    resp.passport.user.provider &&
                    resp.passport.user.provider.provider_id &&
                    resp.passport.user.provider.provider_seq) {

                    this._isProviderLogined = true;
                    this.providerId = resp.passport.user.provider.provider_id;
                    this.providerName = resp.passport.user.provider.provider_name;
                    this.providerSeq = resp.passport.user.provider.provider_seq;
                    this.pmember = resp.passport.user.provider.pmember;

                    let obj = {
                        providerId : this.providerId,
                        providerName : this.providerName,
                        providerSeq : this.providerSeq,
                        pmember: this.pmember
                    };

                    // set token
                    localStorage.setItem("providerSeq", JSON.stringify(obj));

                    console.log('BOAuthService::updateSession writeToken =>', JSON.stringify(obj));

                    subject.next(obj);

                } else {
                    this._isProviderLogined = false;

                    // set token
                    localStorage.removeItem("providerSeq");

                    subject.error({providerName: ''});
                }
            }

            console.log("BOAuthService::updateSession _isLogined =>", this._isLogined);

        },
        error => {
            subject.error({});
        });

        return subject;
    }

    loadToken(token) {

        token = JSON.parse(token);

        if(token.managerId) {
            this.managerId = token.managerId;
            this.managerName = token.managerName;
            this.managerSeq = token.managerSeq;
            this.authData = token.authData;
            this.isManager = token.isManager;
        }

        if (token.providerId) {
            this.providerId = token.providerId;
            this.providerName = token.providerName;
            this.providerSeq = token.providerSeq;
        }

        // 로그인에 성공했으면
        if ((this.managerId && this.managerId.length > 0) ||
            (this.providerId && this.providerId.length > 0)) {

            this.listenLoginEvent.emit();
        }
    }

    getProviderSeqInSession() {
        return this.providerSeq;
    }

    hasAuth(key) {

        //console.log('BOAuthService::hasAuth key, authData =>', key, this.authData);

        if (!this.authData || !key || key.length == 0) { return false; }
        return this.authData[key] == 'Y';
    }
}
