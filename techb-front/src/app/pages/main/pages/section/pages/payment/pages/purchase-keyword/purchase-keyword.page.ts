import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert'; 
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { GoodsStore } from '../../../../../../../../store/goods.store';
import { PointStore } from '../../../../../../../../store/point.store';
import { OrderStore } from '../../../../../../../../store/order.store';
import { PaymentStore } from '../../../../../../../../store/payment.store';

@Component({
    selector: 'purchase-keyword',
    templateUrl: './purchase-keyword.page.html',
    styleUrls: ['./purchase-keyword.page.css']
})
export class PurchaseKeywordPageComponent implements OnInit {

    // 잔여충전포인트 / 잔여 무료포인트
    // charge_point: "22000"
    // free_point: "20000"

    public isAgreePayment: boolean = false;
    public keywords = [];
    public newKeyword = '';
    public productOptionSelect = {
        productType: '',
        productRankingCheck: '(1일 1회 순위 확인권)',
        productPeriod: '',
        autoExtend: '자동 연장'
    }
    public purchaseInfo = {
        productPoint: 0,
        productPeriod: 0,
        productCount: 0,
        productTotalPoint: 0
    }

    public paymentInfo = {
        chargePoint: 0,
        freePoint: 0    
    }

    public _isSelectedSelBtn: boolean = false;
    public isSufficientBalance: boolean = false;

    public purchaseForm = this.formBuilder.group({
        keyword: '',
        product_type: 'A',
        product_period: '7',
        auto_extension: 'Y',
        use_point: '',
        use_free_point: '',
        is_auto_extension_priority: '',
    });


    // form builder

    // isAutoExtensionHighPriority

    // keywords
    // [‘dd’,’ddd’]     => 따로 담을 것임
    
    
    // product_type :     // A/B/C
    // product_period :     // 7, 30, 60일
    // auto_extension :     // Y/N
    // use_free_point :     
    // use_charge_point :      
    // is_auto_extension_priority :     // Y/N
    

    // public goodsCategory = [];

    // public goods = {
    //     keyword: '망고',
    //     categories: "식품>농산물>과일>망고",
    //     sales_ranking: 94,
    //     sales_keyword_count: 721277,
    //     page_count: 3,
    //     current_ranking: 2,
    //     review_count: 30,
    //     review_score: 4.7,
    //     goods_count: 7,
    // };
    
    // public goods = {   
    //     is_ad: false,
    //     categories: ['식품', '농산물', '과일', '망고'],
    //     store_name: '제주농부3',
    //     goods_name: '제주농부 산지직송 고당도 제주 미니 꼬마 애플망고 1kg 2kg 3kg',
    //     sales_rank: {
    //         current_rank: 23,
    //         total_rank: 689689,
    //         page_count: 2,
    //         page_rank: 5
    //     },
    //     reviews: {
    //         review_total: 1024,
    //         avg_score: 4.5,
    //         sales_total: 5481
    //     },
    // };

    public goodsData;

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        private appService: AppService,
        private activateRouter: ActivatedRoute,
        private auth: AuthService,
        private goodsStore: GoodsStore,
        private formBuilder: FormBuilder,
        private paymentStore: PaymentStore,
        private orderStore: OrderStore,
        private pointStore: PointStore,
        protected alert: BSAlertService,
        ) {       
        }

    ngOnInit() {
        this.loadPointBalance();
        this.activateRouter.params.subscribe(params => {
            if (params.goods_seq) {
                this.loadGoodsInfo(params.goods_seq);
            }
        });
        this.activateRouter.queryParams.subscribe(params => {
            //console.log('goods_seq params => ', params.goods_seq);
            if (params.keyword) {
                this.keywords = [params.keyword];
            }
        });    
    }

    loadGoodsInfo(goods_seq) {
        this.goodsStore.get(goods_seq).subscribe(resp => {
            this.goodsData = resp;
            console.log('loadGoodsInfo resp =>', this.goodsData);
        });        
    }

    loadPointBalance() {
        this.pointStore.getBalance().subscribe(resp => {
            console.log('loadPointBalance::get resp =>', resp);        
            this.updatePaymentInfo(resp.charge_point, resp.free_point);        
        });
    }

    // 결제 방법 부분 
    updatePaymentInfo(chargePoint?, freePoint?) {
        console.log('updatePaymentInfo chargePoint, freePoint =>', chargePoint, freePoint);
        if (chargePoint !== undefined) {
            this.paymentInfo.chargePoint = parseInt(chargePoint);
        }

        if (freePoint !== undefined) {
            this.paymentInfo.freePoint = parseInt(freePoint);
        }
        
        // if (this.paymentInfo.chargePoint == undefined || this.paymentInfo.freePoint == undefined) {
        //     return;
        // }

        if (!this._isSelectedSelBtn) {
            return;
        }
    
        // 옵션이 선택되었다면
        let total = this.purchaseInfo.productTotalPoint;
        let useFreePoint, useChargePoint;

        this.isSufficientBalance = true;
        
        // 무료만으로 사용 가능
        if (total < this.paymentInfo.freePoint) {
            useFreePoint = this.purchaseInfo.productTotalPoint;
            useChargePoint = 0;

            // update form value
            this.purchaseForm.controls.use_free_point.setValue(useFreePoint);
            this.purchaseForm.controls.use_point.setValue(useChargePoint);
            console.log('updatePaymentInfo useFreePoint, useChargePoint =>', useFreePoint, useChargePoint);
            return;
        } 
        
        // 무료 다 사용하고 유료로 사용 가능
        total-= this.paymentInfo.freePoint;
        if (total < this.paymentInfo.chargePoint) {
            useFreePoint = this.paymentInfo.freePoint;
            useChargePoint = total;

            // udate form value
            this.purchaseForm.controls.use_free_point.setValue(useFreePoint);
            this.purchaseForm.controls.use_point.setValue(useChargePoint);
        } else {
            this.isSufficientBalance = false;
            //alert('잔액부족 total, paymentInfo.chargePoint =>' + total + ", " + this.paymentInfo.chargePoint);
            return;
        }        

        console.log('updatePaymentInfo useFreePoint, useChargePoint =>', useFreePoint, useChargePoint);

    }

    updatePurchaseInfo() {
        let pricePerProductType = {
            'A': 10,
            'B': 200,
            'C': 100
        };
        let productType = this.purchaseForm.value.product_type;
        let productPeriod = parseInt(this.purchaseForm.value.product_period);

        this.purchaseInfo.productPoint =  pricePerProductType[productType]; // *  parseInt(productPeriod);
        this.purchaseInfo.productPeriod = productPeriod;
        this.purchaseInfo.productCount = 1;
        this.purchaseInfo.productTotalPoint = this.purchaseInfo.productPoint * this.purchaseInfo.productCount * productPeriod;

        console.log('updatePurchaseInfo purchaseForm, productType, productPeriod, purchaseInfo.productPoint =>', this.purchaseForm, productType, productPeriod, this.purchaseInfo.productPoint);
    }

    aletInsufficientBalance() {
        if(!this.isSufficientBalance) {
            this.alert.show('보유하신 포인트가 부족합니다.<br>먼저 포인트를 충전해주세요.');
            console.log('onClickSelectBtn point value => ',this.purchaseInfo.productTotalPoint, this.paymentInfo.freePoint + this.paymentInfo.chargePoint);
            return false;
        }
        return true;
    }

    ////////////////////////////////////////////////
    // event handler

    onClickSelectBtn() {
        if(this.keywords.length == 0 || !this.keywords) {
            this.alert.show('우선 구매할 키워드를 입력해주세요.'); 
            return;
        } else {
            // 선택버튼을 한번이라도 눌렀을때
            this._isSelectedSelBtn = true;  
            this.updatePurchaseInfo();  // 최종 주문 정보
            this.updatePaymentInfo();   // 결제 방법: 무료, 충전 포인트
            this.aletInsufficientBalance();
        }

        if(this.purchaseForm.value.auto_extension == 'N') {
            this.purchaseForm.value.is_auto_extension_priority == 'N';
        }
    }

    onChangeOption() {
        this._isSelectedSelBtn = false;
        this.settingSelectBoxInfo();
        this._resetPaymentInfo();
    }

    settingSelectBoxInfo() {
        let productType = this.purchaseForm.value.product_type;
        let autoExtend = this.purchaseForm.value.auto_extension;
        
        if(productType == 'A') {
            this.productOptionSelect.productRankingCheck = '(1일 1회 순위 확인권)';
        } else if(productType == 'B') {
            this.productOptionSelect.productRankingCheck = '(30분마다 순위 확인권)';
        } else if(productType == 'C') {
            this.productOptionSelect.productRankingCheck = '(10분마다 순위 확인권)';
        }

        if(autoExtend == 'Y') {
            this.productOptionSelect.autoExtend = '자동 연장';
        } else {
            this.productOptionSelect.autoExtend = '수동 연장';
        }
    }

    _resetPaymentInfo() {
        this.purchaseInfo = {
            productPoint: 0,
            productPeriod: 0,
            productCount: 0,
            productTotalPoint: 0
        }

        this.purchaseForm.controls.use_free_point.setValue(0);
        this.purchaseForm.controls.use_point.setValue(0);
    }

    ////////////////////////////
    // keyword 추가
    onClickRemoveKeyword(keyword) {
        let index = this.keywords.indexOf(keyword);
        this.keywords.splice(index, 1);

        console.log('onClickRemoveKeyword keywords =>', this.keywords);
    }

    onClickAddKeyword(keyword) {
        if(keyword.length == 0 && !keyword) {
            return;
        }
        this.keywords = [];
        this.keywords.push(keyword);
        this.newKeyword = '';
    }

    onSubmitPurchase() {
        if (!this.aletInsufficientBalance()) {
            return;
        }
        if(!this.isAgreePayment) {
            this.alert.show('동의해주세요.');
            return;
        }

        let params = this.purchaseForm.value;

        // 자동연장 여부가 수동이면 '자동연장우선순위여부'가 false여야함 
        if (params.auto_extension == 'N') {
            params.is_auto_extension_priority = false; 
        }

        // 
        if(params.is_auto_extension_priority == true) {
            params.is_auto_extension_priority = 'Y'
        } else {
            params.is_auto_extension_priority = 'N'
        }
        
        params.keyword = this.keywords;
        // params['product_point'] = this.purchaseInfo.productPoint;
        params['product_count'] = this.purchaseInfo.productCount;
        params['product_total_point'] = this.purchaseInfo.productTotalPoint;
        params['goods_seq'] = this.goodsData.goods_seq;

        console.log('onSubmitPurchase::purchaseForm.value =>', params);
        
        this.orderStore.order(params).subscribe(resp => {
            console.log('onSubmitPurchase:: paymentStore purchaseKeyword resp =>', resp);
            
            let queryParams = {
                productPeriod: params.product_period,
                productTotalPoint: params.product_total_point,
                productCount: params.product_count
             }; //상품종류, 상품기간, 자동연장여부, 총결제포인트, 상품 갯수
            
            if(params.product_type == 'A') {
                queryParams['productType'] = 'A (1일 1회 순위 확인권)'
            } else if (params.product_type == 'B') {
                queryParams['productType'] = 'B (30분마다 순위 확인권)'
            } else {
                queryParams['productType'] = 'C (10분마다 순위 확인권)'
            }
            
            if(params.auto_extension == 'Y') {
                queryParams['autoExtension'] = '자동 연장'; 
            } else {
                queryParams['autoExtension'] = '수동 연장'; 
            }

            console.log('onSubmitPurchase:: paymentStore purchaseKeyword queryParams =>', queryParams);
            this.router.navigate(['/main/section/payment/purchase-keyword-completed'], {queryParams: queryParams});
        });
    }
}
