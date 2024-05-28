import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSBaseStore } from '@app/common/store/bs-base.store';

import { AdminStore } from './../../../../common/store/admin.store';
import { BOAuthService } from '../../../../providers/service/bo-auth.service';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { isArray } from 'util'; // #휴대전화 인증 추가

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent extends BSUpdateFormController {

    id;
    public data;
    private isShowTootip: boolean = false;
    private admin;
    private adminID;
    private loginLog;
    private historyLog;
    public disabledPasswordInput: boolean = false;
    public isShowIPAuth: boolean = false;
    private isReadonly : boolean = true;

    public boardAuth = [];

    constructor(
        baseStore: BSBaseStore,
        private adminStore: AdminStore,
        public auth : BOAuthService,
        private router: Router,
        private route: ActivatedRoute,
        alert: BSAlertService) {

        super(baseStore, router, route, alert);
    }

    initController(config: any) {
      console.log("AdminUpdateComponent::initController id, managerSeq =>", this.id, this.auth.managerSeq);

      config.store.command = 'admin/manager/manager';
      config.gotoPrevPageAfterSubmit = true;
      return config;
    }

    preparedFormControlsConfig() {
        let config = {
            manager_id: [],
            manager_yn: 'N',
            mpasswd: [],
            mpasswd_new: [],
            confirm_password: [],
            mname: [],
            memail:[],
            mphone: [],
            mcellphone: [],
            mphoto: [],
            ip: [],
            // mregdate: [],
            password_change: ['N'],
            gnb_icon_view: [],

            accessIP: this.fb.array([
                this.fb.group({ip1: '', ip2: '' , ip3: '', ip4: ''}),
            ]),
            hp_chk: 'N',

            // #휴대전화 인증 추가 
            auth_hp: this.fb.array([
                this.fb.group({hp:''})
            ]),
            // lastlogin_date:[],
            // limit_ip:[],
            // manager_auth:[],
            // manager_seq:[],
            // manager_id:[],
            // manager_log:[],
            // manager_yn:[],
            // member_download_passwd:[],
            // mphoto:[],
            // mregdate:[],
            // passwordChange:[],
            // passwordUpdateTime:[],
            // // mpasswd:[],
            // mname:[],
            // mphone:[],
            // mcellphone:[],
            // memail: [],
            // gnb_icon_view:[],

            // 권한설정
            manager_auth: this.fb.group({
            order_view:'N',
            order_deposit:'N',
            order_goods_export:'N',
            autodeposit_view:'N',
            autodeposit_act:'N',
            refund_view:'N',
            refund_act:'N',
            temporary_view:'N',
            personal_act:'N',
            sales_view:'N',

            goods_view:'N',
            goods_act:'N',
            goods_package_act:'N',
            goods_coupon_act:'N',
            goods_auction_act:'N',
            goods_gift_act:'N',

            member_view:'N',
            member_act:'N',
            member_promotion:'N',
            member_download:'N',
            dormancy_view:'N',
            withdrawal_view:'N',
            withdrawal_act:'N',
            member_send:'N',

            event_view:'N',
            event_act:'N',
            event_planshop_view:'N',
            event_planshop_act:'N',
            event_discount_view:'N',
            event_discount_act:'N',
            gift_view:'N',
            gift_act:'N',
            event_auction_view:'N',
            event_auction_act:'N',
            coupon_view:'N',
            coupon_act:'N',

            marketplace_act:'N',
            naverep_act:'N',

            provider_view:'N',
            provider_act:'N',

            account_view:'N',

            statistic_sales:'N',
            statistic_goods:'N',
            statistic_member:'N',
            statistic_visitor:'N',

            design_act:'N',
            setting_shipping_view:'N',
            setting_shipping_act:'N',
            setting_basic_view:'N',
            setting_basic_act:'N',
            setting_manager_view:'N',
            setting_manager_act:'N',
            setting_order_view:'N',
            setting_order_act:'N',
            setting_reserve_view:'N',
            setting_reserve_act:'N',
            setting_protect_view:'N',
            setting_protect_act:'N',
        }),
        };
        return config;
    }

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    loadBoardAuthData(data) {
        this.boardAuth = [];
        for(let item of data) {
            let obj = {
                view: (item.board_view == 1 || item.board_view == 2)? true: false,
                scret: item.board_view == 2? true: false,
                write: item.board_act == 1? true: false,
                boardid: item.boardid,
                name: item.name
            };
            this.boardAuth.push(obj);
        }
        console.log('loadBoardAuthData boardAuth =>', this.boardAuth);
    }

    saveBoardAuthData(value, uiData) {
        value.boardadmins = [];
        for(let item of uiData) {
            let obj = {
                board_view: 0,
                board_act: item.write? 1: 0,
                boardid: item.boardid,
                name: item.name
            };
            if (item.view) {
                obj.board_view = 1;
            }
            if (item.scret) {
                obj.board_view = 2;
            }
            value.boardadmins.push(obj);
        }
        console.log('saveBoardAuthData data.boardadmins =>', value.boardadmins);
    }

    preparedLoadData(resp) {
        console.log("AdminUpdateComponent::preparedLoadData resp =>", resp);
        this.data = resp;

        // board권한 데이타 UI용으로 변환
        //this.loadBoardAuthData(resp.boardadmins);

        // 비밀번호 변경 처리
        if(resp.password_change == 'Y') {
            this.bsForm.get('password_change').setValue('N');
        }

        // #휴대전화 인증 추가 
        // load auth_hp
        this.authHPFormArray.setValue([{hp: ''}]);
        let authHP = [];
        if (resp.auth_hp && resp.auth_hp.length > 0) {
            let idx = 0;
            if (!isArray(resp.auth_hp)) {
                resp.auth_hp = [resp.auth_hp];
            }
            for(let item of resp.auth_hp) {
                authHP.push({hp: item});
                if (idx != 0) {
                    let fg = this.fb.group({hp: ''});
                    this.authHPFormArray.push(fg);
                }
                idx++;
            }
        }
        resp.auth_hp = authHP;
        console.log("AdminUpdateComponent::preparedLoadData authHP =>", authHP);

        let ips = [];
        let i = 0;
        // 다 지우는 방법 
        this.accessIPFormArray.setValue([{ip1: [], ip2: [], ip3: [], ip4: []}]);
        console.log("this.accessIPFormArray =", this.accessIPFormArray);

        if(resp.limit_ip && resp.limit_ip.length > 0 ) {
            for(let itemIP of resp.limit_ip) {

                let item = itemIP.split('.');
                console.log("item =", item);

                if (i != 0) {
                    let fg = this.fb.group({ip1: item[0], ip2: item[1], ip3: item[2], ip4: item[3]});
                    console.log(fg);
                    this.accessIPFormArray.push(fg);
                }

                ips.push({ip1: item[0], ip2: item[1], ip3: item[2], ip4: item[3]});
                console.log(this.accessIPFormArray, ips);
                i++;
            }

            // _temp setvalue 시점 문제
            setTimeout(()=>{
                this.accessIPFormArray.setValue(ips);
            }, 1000);
        }

        if(resp.password_change == "Y"){
            this.disabledPasswordInput = false;
        } else{
            this.disabledPasswordInput = true;
        }

        // this.bsForm.get('accessIP').patchValue(resp.limit_ip);
        // console.log(this.bsForm, this.auth);

        // this.bsForm.patchValue({
        //   memail : this.auth.managerEmail,
        //   mname : this.auth.managerName,
        //   manager_seq : this.auth.managerSeq,
        //   manager_id : this.auth.managerId
        // });
        let data: any = {};
        // data.manager_id = resp.manager_id;
        // data.mphoto = resp.mphoto;
        // data.mname = resp.mname;
        // data.mcellphone = resp.mcellphone;
        // data.memail = resp.memail;
        // data.passwordChange = resp.passwordChange;
        // data.mphone = resp.mphone;
        // data.manager_log = resp.manager_log;
        // data.lastlogin_date = resp.lastlogin_date;
        // data.mregdate = resp.mregdate;
        // data.limit_ip = resp.limit_ip;
        // data.manager_yn = resp.manager_yn;

        // resp.limit_ip.split('|');
        // console.log(resp.limit_ip);
        // data.limit_ip[0] = resp.limit_ip.split('.')[0];
        // data.limit_ip[1] = resp.limit_ip.split('.')[1];
        // data.limit_ip[2] = resp.limit_ip.split('.')[2];
        // data.limit_ip[3] = resp.limit_ip.split('.')[3];

        // 게시판 권한



        // log
        // this.adminStore.loadManagerLog(this.auth.managerSeq).subscribe(resp => {
        //     this.loginLog = resp.list;

        //     console.log("loginLog=",resp);
        // });

        // this.adminStore.loadHistoryLog(this.auth.managerSeq).subscribe(resp => {
        //     this.historyLog = resp.list;
        //     console.log("historyLog=",resp);
        // });

        this.admin = data;
        return resp;
    }


    preparedSaveData(value) {
        console.log("preparedLoadData value, value.auth_hp =>", value, value.auth_hp);

        // board권한 데이타 UI용으로 변환
        this.saveBoardAuthData(value, this.boardAuth);

        if(value.password_change == 'Y') {
            if(value.mpasswd_new == '' || value.mpasswd_new == null || !value.mpasswd) {
            this.alert.show("비밀번호 입력창을 확인해주세요!");
            return false;
            }
        }

        // 생성일때
        if(!value.mpasswd && !this.id) {
            this.alert.show("비밀번호를 입력해주세요!");
            return false;
        }

        // 생성일때
        if (value.mpasswd !== value.confirm_password && !this.id) {
            this.alert.show("변경 할 비밀번호를 확인하세요!");
            return false;
        }

        if(value.mpasswd_new !== '' && value.mpasswd_new != null  && value.confirm_password !== '' && value.confirm_password !== null) {
            if(value.mpasswd_new !== value.confirm_password) {
            this.alert.show("변경 할 비밀번호를 확인하세요!");
            return false;
            }
        }

        // #휴대전화 인증 추가 
        // auth_hp 변환
        let hps = []; 
        if (value.auth_hp.length > 0) {
            for(let item of value.auth_hp) {
                if (item.hp) {
                    hps.push(item.hp);
                }
            }
        }
        value.auth_hp = hps;

        // ip 변환
        // let IPItems= [];
        // if(value.accessIP.length > 0) {
        //     let sucessIP = false;
        //     for(let item of value.accessIP) {
        //         if(item.ip1 && item.ip2) {
        //             IPItems.push(item.ip1 +'.'+ item.ip2 +'.'+ item.ip3 +'.'+ item.ip4);
        //         } else {
        //             sucessIP = true;
        //         }
        //     }
        //     if(!sucessIP) {
        //     value.limit_ip = IPItems;
        //     } else {
        //     value.limit_ip = [];
        //     }
        // }
        let IPItems= [];
        if(value.accessIP.length > 0) {
            for(let item of value.accessIP) {
                console.log('preparedSaveData item =>', item);
                let ips = '';
                if (item.ip1) {
                    ips = item.ip1;
                }
                if (item.ip1 && item.ip2) {
                    ips += '.' + item.ip2;
                } else {
                    IPItems.push(ips);
                    continue;    
                }
                if (item.ip1 && item.ip2 && item.ip3) {
                    ips += '.' + item.ip3;
                } else {
                    IPItems.push(ips);
                    continue;    
                } 
                if (item.ip1 && item.ip2 && item.ip3 && item.ip4) {
                    ips += '.' + item.ip4;
                } else {
                    IPItems.push(ips);
                    continue;    
                } 
                IPItems.push(ips);               
                continue;
            }
            value.limit_ip = IPItems;
        }

        if(value.password_change != 'Y') {
            //this.bsForm.removeControl('confirm_password');
            //value.confirm_password = undefined;
            value.password_change = 'N';
        }
        console.log("preparedLoadData2 resp =", value);

        // 슈퍼관리자가 아니고 내 페이지의 경우
        if (!this.auth.isManager && this.id == this.auth.managerSeq) {
            this.baseStore.command = 'admin/manager/manager/my';

            setTimeout(() => {
                this.baseStore.command = 'admin/manager/manager';
            }, 1000);
        }

        console.log("preparedLoadData2 value =>", value);
        return value;
    }

    onClickPassWord() {
        setTimeout(() => {
            if(this.bsForm.value.password_change ==  "Y") {
                this.disabledPasswordInput = false;
            } else if(this.bsForm.value.password_change ==  "" || this.bsForm.value.password_change == 'N') {
                this.disabledPasswordInput = true;
                return 0;
            }    
        }, 10);
    }

    // onClickIPAuth(){
    //     if(this.bsForm.value.manager_yn ==  "y"){
    //       // console.log("1",this.disabledPasswordInput);
    //       this.isShowIPAuth = true;
    //       this.bsForm.patchValue({
    //         manager_yn : 'y'
    //       });
    //       // console.log("2",this.disabledPasswordInput);
    //       return 0;
    //     }else if(this.bsForm.value.manager_yn ==  "" || this.bsForm.value.manager_yn == 'n'){
    //       // console.log("3",this.disabledPasswordInput);
    //       this.isShowIPAuth = false;
    //       this.bsForm.patchValue({
    //         manager_yn : 'n'
    //       });
    //       // console.log("4",this.disabledPasswordInput);
    //       return 0;
    //     }

    // }

    //   ipFormGroup(idx: string) {
    //     let formArray = this.bsForm.get('ip');
    //     let name: string = idx.toString();
    //     return formArray.get(name);
    // }
    
    onChangeAuth(event) {
      setTimeout(()=> {
        this.changeAuth(event.target.name);
      },1);
    }

    changeAuth(name) {
        //let name = event.target.name;
        let value = this.bsForm.get('manager_auth').get(name).value;
        console.log("onChangeAuth name, value =>", name, value);

        // A -> B
        // A가 N이면 -> B도 N
        // B가 Y되면 -> A는 Y

        // order_view -> order_deposit -> order_goods_export
        if (name == 'order_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('order_deposit').setValue('N');
            this.bsForm.get('manager_auth').get('order_goods_export').setValue('N');
        } else if (name == 'order_goods_export' && value == 'Y') {
            this.bsForm.get('manager_auth').get('order_deposit').setValue('Y');
            this.bsForm.get('manager_auth').get('order_view').setValue('Y');
        } else if (name == 'order_deposit' && value == 'Y') {
            this.bsForm.get('manager_auth').get('order_view').setValue('Y');
        }

        if (name == 'order_deposit' && value != 'Y') {
            this.bsForm.get('manager_auth').get('order_goods_export').setValue('N');
        }

        // order_privacy_view -> order_goods_export, refund_act, personal_act
        if (name == 'order_privacy_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('refund_act').setValue('N');
            this.bsForm.get('manager_auth').get('personal_act').setValue('N');
        }
        else if(name == 'refund_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('order_privacy_view').setValue('Y');
        }
        else if(name == 'personal_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('order_privacy_view').setValue('Y');
        }

        // autodeposit_view -> autodeposit_act
        if (name == 'autodeposit_view' && value != 'Y') {
                this.bsForm.get('manager_auth').get('autodeposit_act').setValue('N');
        } else if (name == 'autodeposit_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('autodeposit_view').setValue('Y');
        }

        // refund_view -> refund_act
        if (name == 'refund_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('refund_act').setValue('N');
        } else if (name == 'refund_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('refund_view').setValue('Y');
        }

        // goods_view -> goods_act
        if (name == 'goods_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('goods_act').setValue('N');
            this.bsForm.get('manager_auth').get('goods_package_act').setValue('N');
            this.bsForm.get('manager_auth').get('goods_coupon_act').setValue('N');
            this.bsForm.get('manager_auth').get('goods_auction_act').setValue('N');
            this.bsForm.get('manager_auth').get('goods_gift_act').setValue('N');
        } else if (name == 'goods_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('goods_view').setValue('Y');
        }  else if (name == 'goods_package_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('goods_view').setValue('Y');
        } else if (name == 'goods_coupon_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('goods_view').setValue('Y');
        } else if (name == 'goods_auction_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('goods_view').setValue('Y');
        } else if (name == 'goods_gift_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('goods_view').setValue('Y');
        }

        // member_view -> member_act -> member_promotion -> member_download
        if (name == 'member_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('member_act').setValue('N');
            this.bsForm.get('manager_auth').get('member_promotion').setValue('N');
            this.bsForm.get('manager_auth').get('member_download').setValue('N');

        } else if (name == 'member_download' && value == 'Y') {
            this.bsForm.get('manager_auth').get('member_promotion').setValue('Y');
            this.bsForm.get('manager_auth').get('member_act').setValue('Y');
            this.bsForm.get('manager_auth').get('member_view').setValue('Y');
        } else if (name == 'member_promotion' && value == 'Y') {
            this.bsForm.get('manager_auth').get('member_act').setValue('Y');
            this.bsForm.get('manager_auth').get('member_view').setValue('Y');
        } else if (name == 'member_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('member_view').setValue('Y');
        }

        if (name == 'member_act' && value != 'Y') {
            this.bsForm.get('manager_auth').get('member_promotion').setValue('N');
            this.bsForm.get('manager_auth').get('member_download').setValue('N');
        } else if (name == 'member_promotion' && value != 'Y') {
            this.bsForm.get('manager_auth').get('member_download').setValue('N');
        }

        // withdrawal_view -> withdrawal_act
        if (name == 'withdrawal_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('withdrawal_act').setValue('N');
        } else if (name == 'withdrawal_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('withdrawal_view').setValue('Y');
        }

        // event_view -> event_act
        if (name == 'event_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('event_act').setValue('N');
        } else if (name == 'event_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('event_view').setValue('Y');
        }

        // event_planshop_view -> event_planshop_act
        if (name == 'event_planshop_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('event_planshop_act').setValue('N');
        } else if (name == 'event_planshop_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('event_planshop_view').setValue('Y');
        }

        // event_discount_view -> event_discount_act
        if (name == 'event_discount_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('event_discount_act').setValue('N');
        } else if (name == 'event_discount_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('event_discount_view').setValue('Y');
        }

        // gift_view -> gift_act
        if (name == 'gift_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('gift_act').setValue('N');
        } else if (name == 'gift_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('gift_view').setValue('Y');
        }

        // event_auction_view -> event_auction_act
        if (name == 'event_auction_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('event_auction_act').setValue('N');
        } else if (name == 'event_auction_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('event_auction_view').setValue('Y');
        }

        // coupon_view -> coupon_act
        if (name == 'coupon_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('coupon_act').setValue('N');
        } else if (name == 'coupon_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('coupon_view').setValue('Y');
        }

        // provider_view -> provider_act
        if (name == 'provider_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('provider_act').setValue('N');
        } else if (name == 'provider_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('provider_view').setValue('Y');
        }

        // setting_shipping_view -> setting_shipping_act
        if (name == 'setting_shipping_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('setting_shipping_act').setValue('N');
        } else if (name == 'setting_shipping_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('setting_shipping_view').setValue('Y');
        }

        // setting_basic_view -> setting_basic_act
        if (name == 'setting_basic_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('setting_basic_act').setValue('N');
        } else if (name == 'setting_basic_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('setting_basic_view').setValue('Y');
        }


        // setting_manager_view -> setting_manager_act
        if (name == 'setting_manager_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('setting_manager_act').setValue('N');
        } else if (name == 'setting_manager_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('setting_manager_view').setValue('Y');
        }

        // setting_order_view -> setting_reserve_act
        if (name == 'setting_order_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('setting_order_act').setValue('N');
        } else if (name == 'setting_order_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('setting_order_view').setValue('Y');
        }

        // setting_reserve_view -> setting_reserve_act
        if (name == 'setting_reserve_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('setting_reserve_act').setValue('N');
        } else if (name == 'setting_reserve_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('setting_reserve_view').setValue('Y');
        }

        // setting_protect_view -> setting_protect_act
        if (name == 'setting_protect_view' && value != 'Y') {
            this.bsForm.get('manager_auth').get('setting_protect_act').setValue('N');
        } else if (name == 'setting_protect_act' && value == 'Y') {
            this.bsForm.get('manager_auth').get('setting_protect_view').setValue('Y');
        }
    }

    get accessIPFormArray(): FormArray {
        return this.bsForm.get('accessIP') as FormArray;
    }

    accessIPFromGroup(idx: string) {
        let formArray = this.bsForm.get('accessIP');
        let name: string = idx.toString();
        return formArray.get(name);
    }

    onClickAddIP() {
        let fg = this.fb.group({ ip1: '', ip2: '', ip3:'', ip4:'' });
        this.accessIPFormArray.push(fg);
    }

    onClickRemoveIP(idx) {
        this.accessIPFormArray.removeAt(idx);
    }

    /////////////////////////////////////////////////
    // #휴대전화 인증 추가 

    onClickAddAuthHP() {
        let fg = this.fb.group({ hp: ''});
        this.authHPFormArray.push(fg);
    }

    onClickRemoveAuthHP(idx) {
        this.authHPFormArray.removeAt(idx);
    }

    get authHPFormArray(): FormArray {
        return this.bsForm.get('auth_hp') as FormArray;
    }

    authHPFromGroup(idx: string) {
        let formArray = this.bsForm.get('auth_hp');
        let name: string = idx.toString();
        return formArray.get(name);
    }

    ////////////////////////////////////////////////////
    // 게시판 권한
    onChangedBoardAuth(type, board, value) {
        console.log('onChangedBoardAuth type, board, value =>', type, board, value);

        if (type == 'secret' && value == true) {
            board.view = true;
        } 
        if (type == 'view' && value == false) {
            board.scret = false;
            board.write = false;
        }
        if (type == 'write' && value == true) {
            board.view = true;
        }
    }

}
