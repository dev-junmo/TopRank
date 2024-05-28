import { Component, TemplateRef, ViewChild } from '@angular/core';
import { EventStore } from '@app/common/store/event.store';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';
import { CouponStore } from '@app/common/store/coupon.store';
import { CategoryStore } from '@app/common/store/category.store';

import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';

import { ProviderStore } from '@app/common/store/provider.store';
import { BSApi } from '@bricks/common/core/bs-api';
//import * as moment from 'moment';
//import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
//import { MemberComponent } from '../../../member/member.component';
//import { linkSync } from 'fs';
//import { Provider } from '@angular/compiler/src/core';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
import { MemberListStore } from '@app/common/store/member-list.store';
import { BOGoodsMultiSelectView } from '@app/common/view/bo-goods-multi-select.view/bo-goods-multi-select.view';

@Component({
  selector: 'coupon-update',
  templateUrl: './coupon-update.page.html',
  styleUrls: ['./coupon-update.page.css']
})
export class CouponUpdatePage extends BSUpdateFormController  {

    id ;
    private file;
    public data: any = {
        salescost_admin: 100,
        salescost_provider: 0
    };

    private targetGoods: any = {
        issue_goods_include: [],
        issue_goods_exclude: [],
        issue_category_include: [],
        issue_category_exclude: []
    };

    //private goodsItems : Array<any> = [];
    public issueType = 'all';
    public use_type = 'online';

    //private category = [[]];
    //private selectCategory = [[]];
    //private targetCategories = [];
    //private categoryList = [];

    private selectedCode;
    private member_group=[];
    private member_status=true;
    private member_group_status=[];

    public member_group_list = [];
        // [ { label:"제한없음", value:0, checked: true},
        // { label: "일반", value: 1, checked: false},
        // { label: "VIP", value: 4, checked: false },
        // { label: "VVIP", value: 2, checked: false},
        // { label: "tvingKING", value: 3, checked: false},
        // ]
    private week_list =[
        { label: "월",value:1, checked:false},
        { label: "화", value: 2, checked: false},
        { label: "수", value: 3, checked: false },
        { label: "목", value: 4, checked: false },
        { label: "금", value: 5, checked: false },
        { label: "토", value: 6, checked: false },
        { label: "일", value: 7, checked: false },
    ];
    private download_week;
    public couponType: string = "download";
    private download_limit;

    // 이벤트 대상 providers
    public providers = [];

    public isPrintCoupon: boolean = false;

    public pageTItle;
    private offlineType = 'random';

    public couponCodeList;

    public keyword;
    public duplDownSaleText;

    public providerList;

    @ViewChild('goodsSelectView1') goodsSelectView1: BOGoodsMultiSelectView;
    @ViewChild('goodsSelectView2') goodsSelectView2: BOGoodsMultiSelectView;

    constructor (
        baseStore: BSBaseStore,
        protected router: Router,
        private couponStore :CouponStore,
        private categoryStore: CategoryStore,       
        public activatedRouter: ActivatedRoute,
        private fileuploader : BSFileUploader,
        private providerStore: ProviderStore,
        private dialogService: BOModalDialogService,
        public memberStore: MemberListStore,
        alert: BSAlertService,
    ) {

        super(baseStore, router, activatedRouter, alert);

        this.activatedRouter.params.subscribe(params => {

            if (params['type'] && params['type'] == 'print') {
                this.isPrintCoupon = true;
                this.pageTItle = '인쇄배포용 쿠폰등록';
            }

            if (!params['id'] && !this.isPrintCoupon) {
                this.pageTItle = '온라인 배포용 쿠폰등록';
            }

            console.log("CouponUpdatePage params =>", params, this.isPrintCoupon);
        });

        // load groups
        this.memberStore.listOfGroups().subscribe(resp => {
            console.log('CouponIssueView::ngOnInit::listOfMemberGroupSales resp =>', resp);
            this.member_group_list = [];
            this.member_group_list.push({ label:"제한없음", value:0, checked: true});
            for(let item of resp.list) {
                let obj = { label:"", value:0, checked: false};
                obj.label = item.group_name;
                obj.value = item.group_seq;
                this.member_group_list.push(obj);    
            } 
        });
    }

    initController(config: any) {

        console.log("BSUpdateFormController::initController command=", config, this.isPrintCoupon);

        if (this.isPrintCoupon) {
            config.store.command = 'admin/coupon/coupon/offline';
        } else {
            config.store.command = 'admin/coupon/coupon';
        }

        config.gotoPrevPageAfterSubmit = true;

        // this.categoryStore.get().subscribe(resp => {
        //     this.category[1] = resp.list;
        // });

        return config;
    }


    preparedFormControlsConfig() {
        let config = {
        use_type: 'online',
        type: 'download',
        issue_stop: 0,
        download_limit: 'unlimit',
        download_limit_ea: [],
        download_startdate: [],
        download_enddate: [],
        update_date: [],
        coupon_name: [],
        coupon_desc: [],
        coupon_same_time: ['N'],
        sale_agent: [],
        sale_payment: [],
        issue_priod_type: ['date'],
        after_issue_day: [],
        issue_startdate: [],
        issue_enddate: [],
        sale_type: 'percent',
        percent_goods_sale: [],
        max_percent_goods_sale: [],
        won_goods_sale:[],
        shipping_type: ['free'],
        max_percent_shipping_sale: [],
        won_shipping_sale: [],
        // sale_referer: [],
        issue_type: [],
        limit_goods_price: [],
        issue_category: [],
        issue_goods: [],
        member_group:[],
        member_status: true,
        member_normal:false,
        member_group_list: this.member_group_list,
        member_group_status:[],
        duplication_use:0,
        download_week:1234567,

        // 인쇄 쿠폰
        offline_type: 'random',
        offline_random_num: [],
        offline_limit: 'unlimit',
        offline_limit_ea: [],

        salescost_admin: 100,
        salescost_provider: 0
        };

        if (this.isPrintCoupon) {
            config.type = 'offline_coupon';
        }

        return config;
    }


    get issueGoodsFormArray(): FormArray {
        return this.bsForm.get('issue_goods') as FormArray;
    }

    issueGoodsFromGroup(idx) {
        let formArray = this.bsForm.get('issue_goods');
        let name: string = idx.toString();
        return formArray.get(name);
    }


    onFileUpload($event) {
        console.log("fileupload event", $event);
        // let seq:boolean = true;
        this.fileuploader.fileUpload($event).subscribe((resp=>{
            console.log('fileuploader resp=', resp);
            this.file = resp.url;
            this.bsForm.patchValue({
            adddata : resp.url
            });
        }));
    }

    

    preparedLoadData(resp) {

        this.data = resp;
        this.couponType = resp.type;
     
        if (this.couponType == "offline_coupon") {
            this.isPrintCoupon = true;
        }

        if (this.isPrintCoupon) {
            this.pageTItle = '인쇄배포용 쿠폰수정';
        } else {
            this.pageTItle = '온라인 배포용 쿠폰수정';
        }

        this.issueType = resp.issue_type;
        this.download_limit =resp.download_limit;
        this.member_group = resp.member_group;

        if(resp.member_group.length==0){
            this.member_status = true;
        } else {
            this.member_status = false;
            this.member_group_status = resp.member_group_status;

            for (let list of this.member_group_list) {
                list.checked = false;
                if (this.member_group_status[list.value]){
                    list.checked=true;
                }
            }
        }

        for(let item of resp.issue_goods) {
            // this.goodsItems = resp.issue_goods;
            if(item.goods) {
                //this.goodsItems.push(item.goods);

                if (resp.issue_type =="except"){
                    this.targetGoods.issue_goods_exclude.push(item.goods);
                } else {
                    this.targetGoods.issue_goods_include.push(item.goods)
                }
            }
        }

        for(let category of resp.issue_categories) {
            if (resp.issue_type == "except") {
                this.targetGoods.issue_category_exclude.push(category);
            } else {
                this.targetGoods.issue_category_include.push(category)
            }
        }

        if(resp.download_week) {
            this.onWeekOnload(resp.download_week);
        }

        this.loadProvider(resp);

        this.offlineType = resp.offline_type;
        
        // setTimeout(()=>{
        //     this.onChangeLimit();
        //     console.log("BSUpdateFormController::preparedLoadData bsForm =", this.bsForm.value);
        //     // this.bsForm.setValue(resp);
        // },1000);
        console.log("BSUpdateFormController::preparedLoadData resp =", resp, this.bsForm.value);

        return resp;
    }  
    
    loadProvider(resp?) {

        this.providerStore.listAll(true).subscribe(_resp => {

            // load providerList
            this.providerList = _resp.list;
            //this.providerList.sort((a, b)=> { return a.provider_name.localeCompare(b.provider_name); });
            console.log('loadProvider providerList =>', this.providerList);

            if (resp) {
                // load selected Providers
                let providers = [];
                for(let item of _resp.list){
                    providers[item.provider_seq] = item;
                }

                // provider load
                this.providers = [];
                if (resp.provider_list.length > 0) {
                    for(let providerSeq of resp.provider_list) {
                        this.providers.push({
                            seq: providerSeq,
                            label: providers[providerSeq].provider_name });
                    }
                }    
            }
            
            console.log("loadProvider providers =>", this.providers);
        });
    }

    // 생성일때
    initForCreateMode() {

        this.loadProvider();

        if (this.isPrintCoupon) {
            this.bsForm.get('download_limit').setValue('limit');
            this.bsForm.get('download_limit_ea').setValue(1);
        }

        this.onChangeLimit();

        if (this.couponType == 'admin_shipping') {
            this.bsForm.get('issue_priod_type').setValue('day');
        }

        this.updateDupleDownAndSaleTitle();
    }

    afterPatchLoadData(data) {
        this.onChangeLimit();
        this.updateDupleDownAndSaleTitle();
    }

    updateDupleDownAndSaleTitle() {
        
        if (this.couponType == "download") {        
            this.duplDownSaleText = '중복다운로드 및 중복할인';
        } else if (this.couponType == "shipping") {        
            this.duplDownSaleText = '중복다운로드';
        } if (this.couponType == "admin" || this.couponType == "member") {        
            this.duplDownSaleText = '중복할인';
        } 
    }

    preparedSaveData(value) {

        console.log("preparedSaveData value =>", value);

        if (this.isPrintCoupon) {
            value.download_limit = 'limit';

            if (value.download_limit_ea < 1) {
                this.alert.show("다운로드/인증 회수 제한은 1이상이어야 합니다.");
                return false;
            }

            if (value.offline_type == 'random') {
                if (value.offline_random_num < 1) {
                    this.alert.show("인증번호 자동생성개수는 1이상이어야 합니다.");
                    return false;
                }
            }

        }

        if (value.download_limit == 'limit' || value.download_limit == 'limit_per_member') {
            if (value.download_limit_ea < 1) {
                this.alert.show("다운로드/인증 회수 제한은 1이상이어야 합니다.");
                return false;
            }
        }

        if (value.issue_priod_type == 'date') {
            if (!value.issue_startdate) {
                this.alert.show("유효기간의 시작날짜를 입력해주세요.");
                return false;
            }
            else if (!value.issue_enddate) {
                this.alert.show("유효기간의 끝날짜를 입력해주세요.");
                return false;
            }

            //if (moment(value.download_enddate) moment(value.download_enddate)

            let tde = new Date(value.download_enddate).getTime();
            let tie = new Date(value.issue_enddate).getTime();

            console.log('preparedSaveData3 download_enddate, issue_enddate, =>', tde, tie);

            if (tie < tde) {
                this.alert.show("쿠폰 유효기간 만료일은 쿠폰 다운로드 종료일 이후로 설정되야 합니다.");
                return false;
            }

        } else if(value.issue_priod_type == 'day') {
            if (!value.after_issue_day) {
                this.alert.show("유효기간을 입력해주세요.");
                return false;
            }
        }

        if (this.couponType == 'shipping' || this.couponType == 'admin_shipping' || this.couponType == 'member_shipping') {

            // 배송비 쿠폰

            if (value.shipping_type == 'free') {

                if (!value.max_percent_shipping_sale) {
                    this.alert.show("최대 할인 금액을 입력해주세요.");
                    return false;
                }
            } else if(value.shipping_type == 'won') {

                if (!value.won_shipping_sale) {
                    this.alert.show("할인 금액을 입력해주세요.3");
                    return false;
                }
            }

        } else {

            // 상품 쿠폰

            if (value.sale_type == 'percent') {
                if (!value.percent_goods_sale) {
                    this.alert.show("할인율을 입력해주세요.");
                    return false;
                }
                else if (!value.max_percent_goods_sale) {
                    this.alert.show("최대 할인 금액을 입력해주세요.");
                    return false;
                }
            } else if(value.sale_type == 'won') {
                if (!value.won_goods_sale) {
                    this.alert.show("할인 금액을 입력해주세요.3");
                    return false;
                }
            }
        }

        //provider_list
        value.provider_list = [];
        if (this.providers.length > 0) {
            for(let provider of this.providers) {
                value.provider_list.push(provider.seq);
            }
        }

        value.member_group=new Array;
        for (let item of this.member_group_list) {
            if(item.value!=0 && item.checked){
                value.member_group = [item.value].concat(value.member_group);
            }
        }

        if (!value.download_starttime) {
            value.download_starttime = '00:00:00';
        }
        if (!value.download_endtime) {
            value.download_endtime = '23:59:59';
        }

        console.log("preparedSaveData2 value =>", value);

        /*  value.download_week= this.download_week; */ //20190528 다운로드 요일 지정하지 않음. 주석처리

            // for(let item of this.goodsItems) {
            //   let fg = this.fb.group(item);
            //   this.issueGoodsFormArray.push(fg);
            //   console.log(fg , this.issueGoodsFormArray);
            // }


        //   if(!value.download_startdate || !value.download_enddate) {
        //     this.alert.show("다운로드 기간제한을 입력해주세요!");
        //     return false;
        //   }

        //   if(!value.issue_startdate) {
        //     this.alert.show("사용 유효기간을 입력해주세요!");
        //     return false;
        //   }

        //   let goodsSeqs = [];
        //   let categoryCode = [];

        //   for (let goods of this.goodsItems) {
        //         console.log(goods);
        //         goodsSeqs.push(goods.goods_seq);
        //   }
        //   value.issue_goods = goodsSeqs;
        //   console.log(this.selectedCode);

        //   let categoryCodes = [];
        //   for(let category of this.categoryList) {
        //     categoryCodes.push(category.category_code);
        //   }
        //   value.issue_category = categoryCodes;

        return value;
    }

  getTargetCategoryCode(category) {

    let targetCategoryCode;
    for(let _category of category) {
        targetCategoryCode = _category.category_code;
    }
    return targetCategoryCode;
  }

    onChangeCouponType(evt) {

        console.log(evt);
        if(evt=='offline') {
            this.bsForm.get('type').setValue('download');
            return;
        }
        this.couponType = evt.target.value;
        this.bsForm.get('type').setValue(evt.target.value);

        //
        if (this.couponType == 'admin_shipping') {
            this.bsForm.get('issue_priod_type').setValue('day');
        }
    }

    onClickSelectItem(evt) {
        console.log(evt);
        this.issueType = evt.target.value;
    }


    submitOnly() {
        this.forceGotoPrevPageAfterSubmit = false;
        this.onSubmit();
    }

    submitAndBack() {
        this.forceGotoPrevPageAfterSubmit = true;
        this.onSubmit();
    }

    // updateformcontroller를 그대로 안쓰고 ovderride했음
    // !! 주석 삭제하지 말기

    onSubmit() {

        console.log('onSubmit targetGoods =>', this.targetGoods);

        // check validate
        if (!this.bsForm.valid) {
            this.validateAllFormFields(this.bsForm);
            this.alert.show("필수 입력값이 입력되지 않았습니다. 입력폼을 확인해주세요.");
            return;
        }

        let data = this.preparedSaveData(this.bsForm.value);
        if (data == false) {
            return;
        }

        if (this.issueType == 'issue') {

            let cateCodes = [];
            for(let obj of this.targetGoods.issue_category_include) {
                cateCodes.push(obj.category_code);
            }

            let goodsSeqs = [];
            for(let obj of this.targetGoods.issue_goods_include) {
                goodsSeqs.push(obj.goods_seq);
            }

            data.issue_category = cateCodes;
            data.issue_goods = goodsSeqs;
        } else if (this.issueType == 'except') {

            let cateCodes = [];
            for(let obj of this.targetGoods.issue_category_exclude) {
                cateCodes.push(obj.category_code);
            }

            let goodsSeqs = [];
            for(let obj of this.targetGoods.issue_goods_exclude) {
                goodsSeqs.push(obj.goods_seq);
            }

            data.issue_category = cateCodes;
            data.issue_goods = goodsSeqs;
        }

        console.log("onSubmit data =>", data, this.targetGoods);

        if(this.isUpdateMode == true) {
            console.log(this.bsForm.value);
            this.couponStore.update(this.id , data, !this.isPrintCoupon).subscribe( resp => {
                this.alert.show("수정 되었습니다.");
               
                if (this.forceGotoPrevPageAfterSubmit) {
                    this._router.navigate(['../..'], { relativeTo:this.activatedRouter });                
                }
                this.forceGotoPrevPageAfterSubmit = false;
            });
        } else {
            this.couponStore.create(data, !this.isPrintCoupon).subscribe( resp => {
                this.alert.show("등록되었습니다.");

                if (this.forceGotoPrevPageAfterSubmit) {

                    if (this.isPrintCoupon) {
                        this._router.navigate(['main/event/coupon'], { }); 
                    } else {
                        this._router.navigate(['..'], { relativeTo:this.activatedRouter }); 
                    }
                                   
                }
                this.forceGotoPrevPageAfterSubmit = false;
            });            
        }
    }

    member_group_toggle(i) {
        if(i == 0) {
            this.member_status = !this.member_status;
            if (this.member_group_list[0].checked == true) {
                for (let item of this.member_group_list ) {
                    item.checked=false;
                }
                this.member_group_list[0].checked = true;
            }
        }
        this.member_group_list[i].checked = !this.member_group_list[i].checked;
    }

    onChangeLimit() {

        // 생성 시 값에 문제가 없는데 disabled가 안먹어서 timer 넣음
        setTimeout(()=>{
            console.log("onChangeLimit bsForm.value.download_limit =>", this.bsForm.value.download_limit);
            if (this.bsForm.value.download_limit == 'unlimit'){
                this.bsForm.controls['download_limit_ea'].disable();
            } else {
                this.bsForm.controls['download_limit_ea'].enable();
            }
        }, 10);
    }

    onWeekChecked(i) {
      this.download_week='';
      this.week_list[i].checked = !this.week_list[i].checked;
      for(let week of this.week_list){
        if (week.checked != true){
          this.download_week = this.download_week + week.value.toString();
        }
      }
      console.log(this.download_week);
    }

    onWeekOnload(value) {
      for (let week of this.week_list) {
        if (value.indexOf(week.value)!=-1) {
            week.checked = true;
        }
      }
    }

    //////////////////////////////////
    // 입점사 선택

    onClickProvider(seq, options) {

        console.log("onClickProvider seq, options =>", seq, options);

        if (!seq || seq == 'null') { return; }

        let label;
        for(let option of options) {
            if (option.value == seq) {
                label = option.label;
                break;
            }
        }

        let exist = false;
        for(let provider of this.providers) {
            if (provider.seq == seq) {
                exist = true;
                break;
            }
        }

        if (!exist) {
            this.providers.push({seq: seq, label: label});
        }
        this.updateGoodsSelectProviders();       
        console.log("onClickProvider2 label =>", label, this.providers);
    }

    onClickDeleteProvider(seq) {
        let i = 0;
        for(let provider of this.providers) {
            if (provider.seq == seq) {
                this.providers.splice(i, 1);
                break;
            }
            i++;
        }
        this.updateGoodsSelectProviders();
    }

    updateGoodsSelectProviders() {
        // 이상하게 providers가 자동으로 업데이트가 안되서 이렇게 수동으로 넣어줌
        if (this.goodsSelectView1) {
            this.goodsSelectView1.providers = this.providers;
        }
        if (this.goodsSelectView2) {
            this.goodsSelectView2.providers = this.providers;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // 인쇄쿠폰

    onChangeOfflineType(event) {
        this.offlineType = event.target.value;
    }

    onClickViewPrintCouponList(template: TemplateRef<any>) {

        console.log('onClickViewPrintCouponList id =>', this.id);

        this.couponStore.getPrintCouponCodeList(this.id).subscribe(resp => {
            console.log('onClickViewPrintCouponList2 resp =>', resp);
            this.couponCodeList = resp.list;
        });

        let title = '[' + this._data.coupon_name + '] 인증번호 보기';

        this.keyword = '';

        this.dialogService.popup(template, title, '확인', null, null, 'small').subscribe(resp => {

            // if (resp == "OK") {

            // } else if (resp == "CANCEL") {

            // }
        });
    }

    onClickDownPrintCouponList() {
        let url = 'admin/coupon/coupon/offline_coupon/serialnumber/xlsx?coupon_seq=' + this.id;
        window.open(BSApi.url + '/' + url, '_blank');
    }

    onClickSearch(keyword) {

        if (!keyword) { return; }

        this.couponStore.getPrintCouponCodeList(this.id, keyword).subscribe(resp => {
            this.couponCodeList = resp.list;
        });
    }

    onChangeSalesCost(type) {
        let salescostAdmin = this.bsForm.get('salescost_admin').value;
        let SalescostProvider = this.bsForm.get('salescost_provider').value;

        if (salescostAdmin > 100) {
            salescostAdmin = 100;
            this.bsForm.get('salescost_admin').setValue(100);
        }

        if (SalescostProvider > 100) {
            SalescostProvider = 100;
            this.bsForm.get('salescost_provider').setValue(100);
        }

        if (salescostAdmin < 0) {
            salescostAdmin = 0;
            this.bsForm.get('salescost_admin').setValue(0);
        }

        if (SalescostProvider < 0) {
            SalescostProvider = 0;
            this.bsForm.get('salescost_provider').setValue(0);
        }

        if (type == 'admin') {
            this.bsForm.get('salescost_provider').setValue(100-salescostAdmin);
        } else if (type == "provider") {
            this.bsForm.get('salescost_admin').setValue(100-SalescostProvider);
        }
    }

    // pushGoodsItem(selectItems) {
    //     console.log(selectItems , this.goodsItems);
    //     let hasSameGoods = false;
    //     let selGoods = [];
    //     selGoods = this.goodsItems.concat();
    //     console.log(selGoods);
    //     for(let goods of selectItems) {
    //         let exist = false;
    //         for(let _goods of this.goodsItems) {
    //         console.log("선택된 굿즈" ,goods ,_goods )
    //         if (goods.goods_seq == _goods.goods_seq) {
    //             exist = true;
    //             break;
    //         }
    //         }

    //         console.log(exist , selGoods);
    //         if (!exist) {
    //         this.goodsItems.push(goods);
    //         } else {
    //         hasSameGoods = true;
    //         }
    //     }

    //     if (hasSameGoods == true) {
    //         this.alert.show("동일한 상품은 등록할 수 없습니다.");
    //     }

    //     this.bsForm.get('issue_goods').setValue(this.goodsItems);
    //     console.log(this.goodsItems , this.bsForm.get('issue_goods'));


    //     }

    // onClickDelGoods(item) {
    //     const index: number = this.goodsItems.indexOf(item);
    //     console.log(item);
    //     this.goodsItems.splice(index, 1);
    // }

    // didSubmited() {
    // }

    //카테고리
    // onClickCategory(num, item) {
    //     console.log(num);
    //     if (num === 2) {
    //     this.selectCategory = [];
    //     this.category.splice(3);
    //     this.category.splice(4);
    //     // this.category[4] = null;
    //     this.selectCategory[num - 2] = item;
    //     } else if (num === 3) {
    //     this.selectCategory.splice(2);
    //     this.selectCategory.splice(3);
    //     this.category.splice(4);
    //     this.selectCategory[num - 2] = item;
    //     } else {
    //     this.selectCategory[num - 2] = item;
    //     }
    //     this.loadCategotyList(num, item);
    // }

    // loadCategotyList(num, item) {
    //     this.categoryStore.getChildren(item.category_code).subscribe(resp => {
    //     this.category[num] = resp.list;
    //     console.log(this.category);
    //     console.log(this.selectCategory);
    // });

    // }

    // onClickSelectCategory() {
    //   console.log("selectCategory == ",this.selectCategory);
    //   this.addCategory(this.selectCategory);
    //   // this.strCategoryFullName(this.selectCategory);
    // }

    // addCategory(selectedCategory) {

    //   // let i = 0;
    //   // let _title;
    //   // let item ;

    //   // let _cate = [];
    //   // for(let cate of selectedCategory) {
    //   //   item = {
    //   //     title: cate.title,
    //   //     category_code: cate.category_code
    //   //   }
    //   //   _cate.push(item);
    //   //   this._addCategory(_cate);
    //   // }
    //   this._addCategory(this.selectCategory);

    // }

    // strCategoryFullName(category) {
    //   console.log(category);
    //   let str = '';
    //   let i = 0;
    //   for(let cate of category) {
    //     console.log(cate);
    //     str += cate.title;
    //     if (i < category.length-1) {
    //       str += ' > ';
    //     }
    //     i++;
    //   }

    //   return str;
    // }

  //   _selectedCategory(categories) {
  //     let i = 0;
  //     for(let item of categories) {
  //       console.log('codeeeeeeeeeeeeeeeee', item , categories[i]);

  //       if(categories[i] == categories.length-1) {
  //           let code = categories[i].category_code;
  //           this.targetCategories.push(code);
  //         break;
  //       }
  //       i++;
  //     console.log('add codeeeeeeeeeeeeeee2',this.targetCategories);
  //   }
  // }
    // strCategoryCode(category) {
    //   console.log('dddddddddddddddddddd' , category);
    //   let value = '';
    //   for(let cate of category) {
    //     value = cate.category_code;
    //   }

    //   // console.log(this.targetCategories);
    //   this.targetCategories.push(value);
    //   return value;

    // }

    // _addCategory(_cate) {

    //   let cate = [];
    //   cate = _cate.concat(); // value copy

    //   console.log("_addCategory = ", cate);

    //   if (this.haveCategoryInCategories(cate, this.categoryList)) {
    //     this.alert.show("이미 등록된 카테고리 입니다.");
    //     return;
    //   }
    //   let categoryObj: any = {category_code: this.getTargetCategoryCode(cate), category_name: this.strCategoryFullName(cate)};

    //   this.categoryList.push(categoryObj);

    //   console.log("categories == ",this.categoryList);
    // }

    //  haveCategoryInCategories(targetCate, categories) {

    //   let have = false;
    //   //target a , a/b, a/b/c

    //   for(let _cate of categories) {

    //     console.log("targetCate, _cate = ", targetCate, _cate);

    //     if (this.sameCategory(targetCate, _cate)) {
    //       have = true;
    //       break;
    //     }
    //   }

    //   console.log("haveCategoryInCategories targetCate, categories =", targetCate, categories, have);

    //   return have;
    //  }

    //   //[a, b] : [a]

    //  sameCategory(cate1, cate2) {

    //   // a  : abc
    //   if (cate1.length != cate2.length) {
    //     return false;
    //   }

    //   let same: boolean = true;
    //   let i = 0;
    //   for(let cateItem of cate2) {

    //     if (cateItem.category_code != cate1[i].category_code) {
    //       same = false;
    //       console.log("cate1, cate2 ",i, cateItem, cate2,cate1[i], same);
    //       break;
    //     }
    //     i++;
    //   }

    //   console.log("sameCategory", same);

    //   return same;
    //  }

    //  onClickRemoveCategory(idx) {
    //    this.categoryList.splice(idx,1);
    //  }
}
