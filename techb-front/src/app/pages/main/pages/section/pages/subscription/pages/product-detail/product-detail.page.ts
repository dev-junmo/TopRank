import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../../environments/environment';
import { ProductStore } from '../../../../../../../../store/product.store';
import * as moment from 'moment';
import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.css']
})
export class ProductDetailPageComponent implements OnInit {

    public productSeq;
    public data;
    public activeKeyword = '';

    // mobile 
    public isShowProductInfo: boolean = false;

    constructor(
        private router :Router,
        private activateRouter: ActivatedRoute,
        public productStore: ProductStore,
        private alert: BSAlertService,
        private appService: AppService,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private _scrollToService: ScrollToService,
        ) {
            
        }

    ngOnInit() {
        this.activateRouter.params.subscribe(params=> {
            console.log('product_seq param',params);
            if(params.product_seq) {
                //this._queryResult(params.product_seq);
                this.loadProductInfo(params.product_seq);
            }
            if(params.widget_type) {
                this._scrollToWidgetWithWidgetType(params.widget_type);
            }
            console.log("params.product_seq => ", params);
        });
    }

    _scrollToWidgetWithWidgetType(widgetType) {
        console.log('widgetType =>', widgetType);
        const config: ScrollToConfigOptions = {
            target: widgetType,
        };
        this._scrollToService.scrollTo(config).subscribe(pos => {
        
        });
    }

    loadProductInfo(productSeq) {
        this.productStore.getDetail(productSeq).subscribe(resp => {
            this.data = this.preparedRespData(resp);
            this.selectKeyword(this.data.keyword);
        });
    }

    preparedRespData(data) {
        data.product_period = parseInt(data.product_period);

        // 잔여일 계산
        data.remainingDays = this.getRemainingDays(data);            
        return data;
    }

    getRemainingDays(item) {
        console.log('getRemainingDays item =>', item);
        if (!item.end_date) { return; }
        return moment(item.end_date).diff(moment(), "days");
    }

    onClickEnabledBtn(value) {
        let isEnalbed: boolean = value == 'Y'? false: true;

        // if(isEnalbed == true) {
        //     this.alert.show('사용 상태로 변경되었습니다.');
        // } else {
        //     this.alert.show('미사용 상태여도 잔여일은 연장되지 않습니다.', '미사용 상태로 변경되었습니다.');
        // }

        this.productStore.setEnabled(this.data.product_seq, isEnalbed).subscribe(resp => {
            this.data = this.preparedRespData(resp);
        });
    }

    onClickIsAutoExtensionBtn(value) {
        let isAutoExtension: boolean = value == 'Y'? false: true;

        if(isAutoExtension == true) {
            this.alert.show('포인트가 부족할 경우 자동으로 연장되지 않을 수 있습니다.', '자동 연장 상태로 변경되었습니다.');
        } else {
            this.alert.show('기간만료 후 자동으로 연장되지 않습니다.', '수동 연장 상태로 변경되었습니다.');
        }

        this.productStore.setIsAutoExtension(this.data.product_seq, isAutoExtension).subscribe(resp => {
            this.data = this.preparedRespData(resp);

            // 자동연장여부가 false이면 // 자동연장 우선순위를 false로 수정한다.
            if (isAutoExtension == false) {
                this.productStore.setIsAutoExtensionPriority(this.data.product_seq, false).subscribe(resp => {
                    this.data = this.preparedRespData(resp);
                });
            }
        });
    }

    onClickIsAutoExtensionPriorityBtn(value) {
        let isAutoExtensionPriority: boolean = value == 'Y'? false: true;

        if(isAutoExtensionPriority == true) {
            this.alert.show('포인트가 부족할 경우(등록일 기준) 우선순위로 자동 연장됩니다.', '자동 연장 우선순위로 지정되었습니다.');
        } else {
            this.alert.show('포인트가 부족할 경우 자동 연장 우선수위에서 제외됩니다.', '자동 연장 우선순위를 해제하였습니다.');
        }

        this.productStore.setIsAutoExtensionPriority(this.data.product_seq, isAutoExtensionPriority).subscribe(resp => {
            this.data = this.preparedRespData(resp);
        });
    }

    // mobile event handler
    onClickMoreProductInfo() {
        this.isShowProductInfo = !this.isShowProductInfo;
    }

    //////////////////////////////////////////////
    // 키워드 추적 비교 그래프

    onClickKeyword(keyword) {
        this.selectKeyword(keyword);
        }
    
        selectKeyword(keyword) {
            this.activeKeyword = keyword;
            this.updateKeywordList();
        }
    
        updateKeywordList() {
            let _keywords = this.data.goods.keywords;
            if (!this.data.goods.keywords || !this.activeKeyword) { return; }
            let keywords = []; 
            for(let keyword of _keywords) {
                if (keyword !== this.activeKeyword) {
                    keywords.push(keyword);
                }
            }    
            this.data.otherKeywords = keywords;
        }
    
}
