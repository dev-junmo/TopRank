import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder ,FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProviderStore } from '@app/common/store/provider.store';
import { BSBaseStore } from '@app/common/store/bs-base.store';

import { BSFileUploader } from '@bricks/common/core/bs-fileuploader';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BOModalDialogService } from '../../../../../../common/popup/bo-modal-dialog';

import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOAuthService } from '@app/providers/service/bo-auth.service';

import { isArray } from 'util'; // #휴대전화 인증 추가

// store
import { MemberListStore } from '@app/common/store/member-list.store';
import { OrderReturnStore } from '../../../../../../common/store/order-return.store';

@Component({
    selector: 'app-provider-member-create',
    templateUrl: './provider-member-create.component.html',
    styleUrls: ['./provider-member-create.component.css'],
})
export class ProviderMemberCreateComponent extends BSUpdateFormController {

    bsForm: FormGroup;

    public _data;

    @Input() set data(value) {
        this._data = JSON.parse(JSON.stringify(value));
    }

    get data() {
        return this._data;
    }
 
    @Input() id;    // seq로 쓰임
    @Input() providerId;
    @Input() formItem;
    @Input() isMaster: boolean = false;

    @Output() afterAccountASubmit = new EventEmitter();

    //private providerId = null;
    formProvider: FormGroup;
    admin;
    adminID;
    private ipYN:boolean = false;
    private hpYN:boolean = false;
    private idValid: boolean = false;

    private deliveryCompanyList;
    private deliveryCompanyCodeList;

    public pageTitle;

    public shippingCostTitleText;
    public shippingCostDescText;

    // private providerShipping = {
    //     use_yn: 'y',
    //     summary: '',
    //     company_code: [],

    //     delivery_cost_policy: 'free',

    //     ifpay_free_price: '',
    //     ifpay_delivery_cost: '',
    //     pay_delivery_cost: '',

    //     order_delivery_free: '',

    //     delivery_price: '',
    //     add_delivery_cost: [],
    //     categories: [],

    //     return_zipcode: '',
    //     return_address: '',
    //     return_address_detail: '',

    //     sendding_address: '',
    //     sendding_address_detail: '',
    //     sendding_zipcode: '',

    //     // 구매혜택
    //     default_sale_seq: '',
    // };

    // 회원등급별 구매혜택
    // public memberGroupSales = [];
    // public memberGroupSaleMap = [];    
    // public saleSeq;

    //public providerMembers = [];

    constructor(
        baseStore: BSBaseStore,
        private orderReturnStore: OrderReturnStore,
        private modalService: BOModalDialogService,
        private fileUploader: BSFileUploader,
        public appConfig: AppConfigService,
        private router: Router,
        arouter: ActivatedRoute,
        private authService: BOAuthService,

        // store
        private providerStore : ProviderStore,        
        public memberStore: MemberListStore,
        alert: BSAlertService) {

        super(baseStore, router, arouter, alert);

        console.log("SetupComponent isProvider =>", this.appConfig.isProvider, authService.providerSeq);

        // 기본적으로는 page parameter로 id를 가져오고
        // 입점사의 경우 page parameter가 없고 자기 정보만 수정 가능하니 session에서 가져온다.
        // if (this.appConfig.isProvider && authService.providerSeq) {
        //     this.id = authService.providerSeq;
        //     //alert(this.id);
        // }
     }

    initController(config: any) {

        console.log("ProviderMemberCreateComponent::initController command=", config);

        config.store.command = 'admin/provider/provider_member';
        config.gotoPrevPageAfterSubmit = false;

        if (this.id) {
            this.pageTitle = '입점사 계정 수정';
        } else {
            this.pageTitle = '입점사 계정 등록';
        }

        if (this.appConfig.isProvider) {
            this.pageTitle = '입점사 계정 정보';
        }
        else {
            // // 회원등급별 구매혜택 설정로딩
            // this.memberStore.listOfMemberGroupSales().subscribe(resp => {
            //     this.memberGroupSales = resp.list;
            //     this.memberGroupSaleMap = [];
            //     for(let item of resp.list) {            
            //         item.member_group_sale_details2 = item.member_group_sale_details.slice(1); // ui table colspan구조와 맞추기 위해 '비회원'항목을 제거한다.
            //         this.memberGroupSaleMap[item.sale_seq] = item;
            //     }
            //     console.log('initController::listOfMemberGroupSales resp, memberGroupSaleMap =>', resp, this.memberGroupSaleMap);
            // });
        }

        //this.loadProviderMembers(this.id);
        return config;
    }

    // 입점사 멤버 리스트
    // loadProviderMembers(seq) {
    //     // 입점사 계정 목록
    //     this.providerStore.getMembers(seq).subscribe(resp => {
    //         this.providerMembers = resp.list;
    //         console.log('loadProviderMembers id, providerMembers =>', this.loadProviderMembers);
    //     }); 
    // }

    // 입점사 멤버 
    onClickDeleteProviderMember(seq) {
        this.alert.confirm("해당 입점사 계정 정보를 삭제하시겠습니까?").subscribe((result) => {
            this.providerStore.removeMembers(seq).subscribe(resp => {
            });
        });
    }

    preparedFormControlsConfig() {

        let config = {
            pmember_id:[],
            pmember_name:[],
            pmember_status: 'N',
            hp_chk: 'N',
            ip_chk: 'N',
            limit_use: [],
            limit_ip: this.fb.array([
                this.fb.group({ip1: '', ip2: '' , ip3: '', ip4: ''}),
            ]),
            auth_hp: this.fb.array([
                this.fb.group({hp:''})
            ]),
            change_pw: '',

            //manager_passwd: [], // detail
            //provider_passwd:[],
            //provider_gb: 'provider',
            //pgroup_seq:[],
            
            // calcu_day:[],
            // calcu_bank:[],
            // calcu_name:[],
            // calcu_num:[],
            // calcu_include: [],
            // charge:[],
            // admin_log: [],
            // admin_memo: [],
            // logo1: [],
            // info_name:[],
            // info_num:[],
            // info_ceo:[],
            // info_type: ['법인'],
            // info_type_num:[],
            // info_item:[],
            // info_fax: [],
            // info_email: [],
            // info_phone: [],
            // info_file: [],
            // info_status:[],
            // info_zipcode:[],
            // info_address1:[],
            // info_address2:[],
            // ds1: this.fb.group({ name: [], email: [], phone: [], mobile: [] }),
            // ds2: this.fb.group({ name: [], email: [], phone: [], mobile: [] }),
            // cs: this.fb.group({ name: [], email: [], phone: [], mobile: [] }),
            // md: this.fb.group({ name: [], email: [], phone: [], mobile: [] }),
            // calcu: this.fb.group({ name: [], email: [], phone: [], mobile: [] }),
             //main_visual: '',    // detail
            // #휴대전화 인증 추가 
          
            // hp1: '',    // detail
            // hp2: '',    // detail
            // hp3: '',    // detail
            //admin_memo: [], // detail
            //selleradmin_memo: [], // detail

            // regdate:[],
            // lastlogin_date:[],
            // update_date:[],
            // calcu_count:'1',
            //commission_type:[],
            
            //deli_group: 'provider',

            //provider_shipping: this.fb.group (this.providerShipping),

            // todo
            // return_zipcode: [],
            // return_address: [],
            // return_address_detail: [],
            // sendding_address: [],
            // sendding_address_detail: [],
            // sendding_zipcode: [],

            //provider_log: [],

            // 'limit_ip': fb.group({
            //    'limit_ip[0][0]': [],
            //    'limit_ip[0][1]': [],
            //    'limit_ip[0][2]': [],
            //    'limit_ip[0][3]': [],
            // }),
            // regdate:[],
            // lastlogin_date:[],
            // update_date:[],

            //minishop_use_status: 'unuse',
        };

        return config;
    }

    preparedLoadData(resp) {

        console.log("ProviderMemberCreateComponent::preparedLoadData resp =>", resp , this.bsForm, this.formProvider);

        this.data = resp;

        //this.saleSeq = resp.default_sale_seq;

        // if (!this.data.info_type) {
        //     this.data.info_type = '법인';
        // }

        //data.provider_shipping.add_delivery_cost

        // 여기 주석 처리 하면 안됨 , provider_shipping = null 때문에 오류님
        // if(!resp.provider_shipping) {
        //     resp.provider_shipping = this.providerShipping;
        // }

        if(this.data.ip_chk == 'Y') {
            this.ipYN = true;
        }

        if(this.data.hp_chk == 'Y') {
            this.hpYN = true;
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



        // resp.provider_passwd.setValue('');
        // resp.auth_hp.subString(0, 2).setValue(this.formProvider.value.hp1);
        // resp.auth_hp.subString(3, 6).setValue(this.formProvider.value.hp2);
        // resp.auth_hp.subString(7, 10).setValue(this.formProvider.value.hp3);

        // if (resp.provider_shipping) {
        // this.bsForm.value.return_zipcode = resp.provider_shipping.return_zipcode;
        // this.bsForm.value.return_address.setValue(resp.provider_shipping.return_address);
        // this.bsForm.value.return_address_detail.setValue(resp.provider_shipping.return_address_detail);

        // resp.sendding_zipcode.setValue(resp.provider_shipping.sendding_zipcode);
        // resp.sendding_address.setValue(resp.provider_shipping.sendding_address);
        // resp.sendding_address_detail.setValue(resp.provider_shipping.sendding_address_detail);
        // }

        if(resp.limit_ip && resp.limit_ip.length > 0) {
            //let ips = [];
            //let i = 0;

            //this.limitIPFormArray.setValue([{ip1: [], ip2: [], ip3: [], ip4: []}]);

            console.log("limitIPFormArray ", this.limitIPFormArray);

            this.limitIPFormArray.removeAt(0);

            console.log("limitIPFormArray2 ", this.limitIPFormArray);

            for(let itemIP of resp.limit_ip) {

                let item = itemIP.split('.');
                console.log("item =", item);



                //if (i != 0) {
                    let fg = this.fb.group({ip1: item[0], ip2: item[1], ip3: item[2], ip4: item[3]});
                    console.log(fg);
                    this.limitIPFormArray.push(fg);
                //}

                //ips.push({ip1: item[0], ip2: item[1], ip3: item[2], ip4: item[3]});

                //console.log(this.limitIPFormArray, ips);
                //i++;
            }

            // setTimeout(()=>{
            //     this.limitIPFormArray.setValue(ips);
            // }, 1);
        }

        // if (resp.provider_charge) {
        //     this.data.charge = resp.provider_charge.charge;
        //     this.data.comission_type = resp.provider_charge.commission_type;
        // }

        // this.getDeliveryCompanyList();
        // this.updateShippingInfoDisplay();

        return resp;
    }

    // onChangeSalesSet(value) {
    //     console.log('onChangeSalesSet value =>', value);
    //     this.saleSeq = value;
    // }

    // createDefaultShippingData(providerSeq) {
    //     let data = {
    //         add_delivery_cost: [],
    //         company_code: [],
    //         company_name: "",
    //         delivery_cost_policy: "free",
    //         delivery_price: 0,
    //         delivery_type: "free",
    //         direct_summary: null,
    //         direct_use_yn: null,
    //         except_issue_goods: [],
    //         if_free_price: 0,
    //         ifpay_delivery_cost: 0,
    //         ifpay_free_price: 0,
    //         ifpostpaid_delivery_cost: 0,
    //         ifpostpaid_delivery_cost_yn: "n",
    //         international: null,
    //         issue_brand_code: [],
    //         issue_categories: [],
    //         issue_category_code: [],
    //         issue_goods: [],
    //         multi_delivery_use_yn: null,
    //         order_delivery_free: null,
    //         pay_delivery_cost: 0,
    //         post_price: 0,
    //         post_yn: "N",
    //         postpaid_delivery_cost: 0,
    //         postpaid_delivery_cost_yn: "n",
    //         postpaid_delivery_summary: null,
    //         provider_seq: providerSeq,  ///////////////////////////////////
    //         quick_summary: null,
    //         quick_use_yn: null,
    //         return_address: "",
    //         return_address_detail: null,
    //         return_address_street: null,
    //         return_address_type: null,
    //         return_zipcode: "",
    //         sendding_address: "",
    //         sendding_address_detail: null,
    //         sendding_address_street: null,
    //         sendding_address_type: null,
    //         sendding_zipcode: "",
    //         seq: 157,   ///////////////////////////////////////
    //         summary: "",
    //         use_yn: "y",
    //     }
    //     return data;
    // }

    updateShippingInfoDisplay() {

        if (this.data.provider_shipping && this.data.provider_shipping.delivery_cost_policy) {

            let data = this.data.provider_shipping;
            let type = data.delivery_cost_policy;
            if (type == 'free') {
                this.shippingCostTitleText = '무료';
                this.shippingCostDescText = '';
            } else if (type == 'pay') {
                this.shippingCostTitleText = '유료'
                this.shippingCostDescText =   '선불->유료' + data.pay_delivery_cost + '원';
            } else if (type == 'ifpay') {
                this.shippingCostTitleText = '주문금액 기준 조건부 무료';
                this.shippingCostDescText = '할인 적용가의 합이 '+
                    data.ifpay_free_price + '원 이상이면 무료, 미만이면 선불 → 유료 : ' +
                    data.ifpay_delivery_cost + '원';
            }
        }
    }

    preparedSaveData(value) {

        console.log("preparedSaveData value =>", value, this.data);

        value.provider_seq = this.providerId;

        if (!this.id && !this.idValid) {
            this.alert.show("ID 중복확인을 진행해주세요.");
            return false;
        }

        let IPItems= [];
        if(value.limit_ip.length > 0) {
            for(let item of value.limit_ip) {
                if(item.ip1 || item.ip4) {
                    IPItems.push(item.ip1 +'.'+ item.ip2 +'.'+ item.ip3 +'.'+ item.ip4);
                }
            }
            value.limit_ip = IPItems;
        }

        // 수정에서 비밀번호 변경일때
        if(value.change_pw == 'Y' || !this.id) {
            if(value.provider_passwd !== value.provider_confirm_passwd) {
              this.alert.show("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
              return false;
            }
        }

        // #휴대전화 인증 추가 
        // auth_hp 변환
        let hps = []; 
        if (value.auth_hp.length > 0) {
            for(let item of value.auth_hp) {
                hps.push(item.hp);
            }
        }
        value.auth_hp = hps;

        console.log("preparedSaveData2 value =>", value);

        return value;
    }

    doSubmit() {
        this.forceGotoPrevPageAfterSubmit = false;
        super.submit();
    }

    didSubmited(value) {
        this.afterAccountASubmit.emit(value);
    }

    onClickDuplication(id) {
        this.providerStore.confirmDuplication(id).subscribe(resp => {
            if(resp == true) {
                this.alert.show("사용가능한 ID 입니다.");
                this.idValid = true;
            }
        });
    }

    changeIP(event) {

        console.log("changeIP event =>", this.bsForm.get('ip_chk'), this.bsForm.get('ip_chk').value == 'Y');
        this.ipYN = this.bsForm.get('ip_chk').value == 'Y';
    }

    changeHP(event) {
        this.hpYN = this.bsForm.get('hp_chk').value == 'Y';
    }


    get limitIPFormArray(): FormArray {
        return this.bsForm.get('limit_ip') as FormArray;
    }

    limitIPFromGroup(idx: string) {
        let formArray = this.bsForm.get('limit_ip');
        let name: string = idx.toString();
        return formArray.get(name);
    }

    onClickAddIP() {
        let fg = this.fb.group({ ip1: '', ip2: '', ip3:'', ip4:'' });
        this.limitIPFormArray.push(fg);
    }

    onClickRemoveIP(idx) {
        console.log(idx);
        if(idx != 0) {
            this.limitIPFormArray.removeAt(idx);
        }
    }

    // doSubmit() {
    //     // check validate
    //     if (!this.bsForm.valid) {
    //         this.validateAllFormFields(this.bsForm);
    //         this.alert.show("필수 입력값이 입력되지 않았습니다. 입력폼을 확인해주세요.");
    //         return;
    //     }

    //     this.alert.confirm("저장 하시겠습니까?").subscribe((result) => {
    //         let data = this.preparedSaveData(this.bsForm.value);
    //         if (data == false) {
    //             return;
    //         }

    //         if (this.isUpdateMode === true &&
    //             this.isMergeLoadingData === true &&
    //             this._data) {
    //             console.log("BSUpdateFormController::onSubmit _data = ", data, this._data, this.isUpdateMode);
    //             this._data = Object.assign(this._data, data);
    //             data = this._data;
    //             console.log("BSUpdateFormController::onSubmit _data2 = ", this._data, this.isUpdateMode);
    //         }

    //         if (this.isUpdateMode === true) {
    //             this.baseStore.update(this.id, data).subscribe( resp => {
    //                 this.alert.show("저장 되었습니다.").subscribe( res => {
    //                     this.loadData();
    //                 });
    //                 this.didSubmited(resp);
    //                 if (this.forceGotoPrevPageAfterSubmit) {

    //                     // ** 수정페이지 중에 다른 수정으로 이동, 서밋하면 다시 이전 페이지로 간다.
    //                     // history back이니

    //                     // 수정이 경우 수정 후 리스트 하면 쿼리 유지를 위해 history back한다.
    //                     if (window.history.length > 0) {
    //                         window.history.back();
    //                     } else {
    //                         this._router.navigate(['../..'], { relativeTo:this.activatedRouter });
    //                     }
    //                 }

    //                 this.forceGotoPrevPageAfterSubmit = false;
    //             });
    //         } else {
    //             this.baseStore.create(data).subscribe( resp => {
    //                 this.alert.show("생성 되었습니다.");
    //                 this.clearData();
    //                 this.didSubmited(resp);
    //                 if (this.forceGotoPrevPageAfterSubmit) {
    //                     this._router.navigate(['..'], { relativeTo:this.activatedRouter });
    //                     //window.history.back();
    //                 }

    //                 this.forceGotoPrevPageAfterSubmit = false;
    //             });
    //         }


    //     });
    //     // if (this.appConfig.isProvider) {
    //     //     this.providerSubmit();
    //     // } else {
    //     //     super.onSubmit();
    //     // }

    // }

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

    
  

    // getDeliveryCompanyList() {

    //     this.orderReturnStore.getDeliveryComCode().subscribe(resp => {
    //         this.deliveryCompanyList = resp;
    //         this.deliveryCompanyCodeList = Object.keys(resp);
    //         console.log("getDeliveryCompanyList deliveryCompanyList, deliveryCompanyCodeList",
    //             this.deliveryCompanyList, this.deliveryCompanyCodeList);
    //     });
    // }


    // 추가 배송비 세팅
    //  onClickDeliverySetting(template: TemplateRef<any>) {

    //     this.modalService.popup(template, '추가배송비 파일 업로드', '닫기', null, {autoClose: true}, 'small').subscribe((resp)=>{
    //         if (resp == "OK") {

    //             //add_delivery_cost
    //             // {{ship.sigungu}} {{ship.addDeliveryCost}}

    //             // console.log(this.datatableShipment.selectedRows);
    //             //this.modalService.hide();

    //             // alert("ok");
    //             //this.onSubmit();
    //         } else if (resp == "CANCEL") {
    //             // this.modalService.hide();
    //         }
    //     });

    // }

    // 추가배송비 설정 파일업로드
    // /admin/provider/provider/excelUploadShippingDelivery

    // onFileUpload($event) {
    //     console.log("fileupload event =>", $event, this.bsForm);

    //     this.fileUploader.fileUpload($event, 'admin/provider/provider', 'excelUploadShippingDelivery').subscribe(resp => {
    //         console.log('fileuploader resp=', resp);

    //         this.alert.show('추가배송비가 정상적으로 처리되었습니다.').subscribe(()=> {
    //             this.modalService.hide();
    //             this.bsForm.get('provider_shipping').get('add_delivery_cost').setValue(resp.list);
    //             this.data.provider_shipping.add_delivery_cost = resp.list;
    //         });

    //         // this.file = resp.url;
    //         // this.cacheFile = '';
    //         // this.subForm.get('isRemoveFile').setValue(false);
    //         // this.ctrl.setValue(resp.url);
    //     });
    // }

    // onClickDownGoodsSample(event) {
    //     console.log("onClickShipmentExcel ==> ",event );
    //     window.open('https://dn358eh9xy32s.cloudfront.net/additional_cost_sample.xlsx', '_blank');
    //     // https://bricksbucket.s3.ap-northeast-2.amazonaws.com/additional_cost_sample.xlsx
    //     // http://cdn.mallt.breezestudio.gq/media/file/excel/goodsexcel.admin.sample.xlsx
    //     // this.goodsStore.downloadExcel();
    // }

    // onFileDownload(calcu_file) {
    //     console.log('onFileDownload calcu_file =>', calcu_file);

    //         window.open(calcu_file, '_blank');
    // }

    // onClickGotoGoodsList() {

    //     this.appConfig.openWindowSafeProvider('main/goods/goods/list');
    // }

    // 입점사관리자 로그인
    // loginProviderByManager() {

    //     if (!this.id || !this.data.provider_id) {
    //         this.alert.show('입점사 정보오류로 입점사관리자에 로그인 할 수 없습니다.');
    //         return;
    //     }

    //     this.authService.loginProviderByManager(this.id, this.data.provider_id, this.data.provider_name).subscribe(resp => {
    //         window.open('/provider/main/home', '_blank');
    //     });
    // }

        // onChangeAddress(data){
    //     // 여기로 주소값이 반환
    //     console.log(this.bsForm);
    //     let zip = this.bsForm.get("info_zipcode");
    //     zip.patchValue(data.zip);
    //     let addr = this.bsForm.get("info_address1");
    //     addr.patchValue(data.addr);
    //     // data.addr;
    //     console.log(" onChangeAddress form =>", this.bsForm.value);
    // }

    // daumAddressOptions =    {
    //     class: ['btn','white-s-btn']
    // };

    // onChangeSendAddr(data) {
    //     let zip = this.bsForm.get('provider_shipping').get("sendding_zipcode");
    //     zip.setValue(data.zip);
    //     let addr = this.bsForm.get('provider_shipping').get("sendding_address");
    //     addr.setValue(data.addr);
    //     console.log("onChangeSendAddr form =>", this.bsForm.value);
    // }

    // onChangeReturnAddr(data) {
    //     let zip = this.bsForm.get('provider_shipping').get("return_zipcode");
    //     zip.setValue(data.zip);
    //     let addr = this.bsForm.get('provider_shipping').get("return_address");
    //     addr.setValue(data.addr);
    //     console.log("onChangeReturnAddr form =>", this.bsForm.value);
    // }


    
}
