import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../service/auth.service';
import { Router} from '@angular/router';
import { DashboardStore } from '../../../../../../store/dashboard.store';
import { MemberStore } from '../../../../../../store/member.store';
import { ProductStore } from '../../../../../../store/product.store';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.css']
})
export class DashboardPageComponent implements OnInit {

    // swiper
    @ViewChild('swiper', {read: SwiperComponent}) swiper: SwiperComponent;
    public slideConfig: SwiperConfigInterface = {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 21,
        paginationHide: true,
    }

    public mobileSlideConfig: SwiperConfigInterface = {
        // slidesPerGroup: 1,
        // slidesPerView: 1,
        direction: 'horizontal',
        spaceBetween: 8,
        paginationHide: true,
        slidesPerView: 'auto',  
        scrollbarHide: false,
        //mousewheelControl: true,
        pagination: false,
        //scrollbarDraggable: true,
    }

    public math = Math;

    public isUsingGoods: boolean = true;
    public selectedGoodsItemIndex = 0;
    public isShowBatchProductRegist: boolean = false;
    public currWidgetData: any = {};

    public userSummary: any = {};
    public usingGoods = [];

    //mobile 
    public isShowBottomPointArea = false;
    public isShowUserTier = false;

    // public userSummary = {
    //     user_name: '일이삼사오육칠팔',
    //     product: {
    //         current_product: 10,
    //         total_product: 100
    //     },
    //     keyword: {
    //         current_keyword: 57,
    //         total_keyword: 100
    //     },
    //     member_grade: {
    //         grade: '화이트',
    //         upgrade_score: 1600,
    //         upgrade_percent: 0.35
    //     },
    //     points: {
    //         charge_point: 100000000,
    //         free_point: 400000,
    //         reward_point: 40000
    //     },
    //     coupon_count: 6
    // }

    // public usingGoods = [
    //     {
    //         goods_seq: 1,
    //         rep_keyword: '망고',
    //         store_name: '제주농부',
    //         goods_name: '제주농부 산지직송 고당도 제주 미니 애플망고 1kg 2kg 3kg',
    //         sales_ranking: 23,
    //         ranking_change: 6,
    //     },
    //     {
    //         goods_seq: 2,
    //         rep_keyword: '한라봉',
    //         store_name: '제주농부',
    //         goods_name: '제주농부 제주 산지직송 꿀당도 천혜향 카라향 한라봉 오렌지 귤',
    //         sales_ranking: 41,
    //         ranking_change: -7
    //     },
    //     {
    //         goods_seq: 3,
    //         rep_keyword: '딸기',
    //         store_name: '달콤팜 딸기',
    //         goods_name: '딸기 설향 산지직송 프리미엄 생딸기',
    //         sales_ranking: 7,
    //         ranking_change: -6
    //     },
    //     {
    //         goods_seq: 4,
    //         rep_keyword: '오렌지',
    //         store_name: '제주농부',
    //         goods_name: '제주농부 산지직송 고당도 제주 미니 애플망고 1kg 2kg 3kg',
    //         sales_ranking: 23,
    //         ranking_change: 6
    //     },
    // ];

    public widgets_data =  [
        {
            goods_seq: 141,
            rep_product_seq: 1,
            widgets: [
                {
                    type: 'rank_widget',
                    widget_ranking_change: 6,
                    rank_keyword: '망고',
                    sales_ranking: 23,
                    page_count: 4,
                    page_ranking: 2,
                    sales_total: 689689
                },
                {
                    type:'sales_rank_chart_widget',
                },
                {
                    type: 'keyword_tracking_chart_widget',
                    tracking_keyword: '망고',
                },
                {
                    type: 'review_widget',
                    widget_review_change: 50,
                    review_total: 1024,
                    review_avg_score: 4.5,
                    purchase_count: 5481,
                },
                {
                    type: 'review_tracking_chart_widget',
                },
                {
                    type: 'price_tarcking_chart_widget',
                },
                {
                    type: 'category_search_total_widget',
                    categories: ['식품', '농산물', '과일', '망고'],
                    amonth_search_count: 139300,
                },
                {
                    type: 'device_search_chart_widget',
                }
            ]
        },
        {
            goods_seq: 328,
            rep_product_seq: 2,
            widgets:
            [
                {
                    type: 'rank_widget',
                    widget_ranking_change: -7,
                    rank_keyword: '한라봉',
                    sales_ranking: 23,
                    page_count: 4,
                    page_ranking: 2,
                    sales_total: 689689
                },
                {
                    type:'sales_rank_chart_widget',
                },
                {
                    type: 'keyword_tracking_chart_widget',
                    tracking_keyword: '한라봉',
                },
                {
                    type: 'review_widget',
                    widget_review_change: 50,
                    review_total: 1024,
                    review_avg_score: 4.5,
                    purchase_count: 5481,
                },
                {
                    type: 'review_tracking_chart_widget',
                },
                {
                    type: 'price_tarcking_chart_widget',
                },
                {
                    type: 'category_search_total_widget',
                    categories: ['식품', '제주', '과일', '한라봉'],
                    amonth_search_count: 139300,
                },
                {
                    type: 'device_search_chart_widget',
                }
            ]
        },
        {
            goods_seq: 3,
            rep_product_seq: 3,
            widgets: [
                {
                    type: 'rank_widget',
                    widget_ranking_change: -6,
                    rank_keyword: '딸기',
                    sales_ranking: 23,
                    page_count: 4,
                    page_ranking: 2,
                    sales_total: 689689
                },
                {
                    type:'sales_rank_chart_widget',
                },
                {
                    type: 'keyword_tracking_chart_widget',
                    tracking_keyword: '딸기',
                },
                {
                    type: 'review_widget',
                    widget_review_change: 50,
                    review_total: 1024,
                    review_avg_score: 4.5,
                    purchase_count: 5481,
                },
                {
                    type: 'review_tracking_chart_widget',
                },
                {
                    type: 'price_tarcking_chart_widget',
                },
                {
                    type: 'category_search_total_widget',
                    categories: ['식품', '계절과일', '과일', '딸기'],
                    amonth_search_count: 139300,
                },
                {
                    type: 'device_search_chart_widget',
                }
            ]
        },
        {
            goods_seq: 4,
            rep_product_seq: 4,
            widgets: [
                {
                    type: 'rank_widget',
                    widget_ranking_change: 6,
                    rank_keyword: '오렌지',
                    sales_ranking: 23,
                    page_count: 4,
                    page_ranking: 2,
                    sales_total: 689689
                },
                {
                    type:'sales_rank_chart_widget',
                },
                {
                    type: 'keyword_tracking_chart_widget',
                    tracking_keyword: '오렌지',
                },
                {
                    type: 'review_widget',
                    widget_review_change: 50,
                    review_total: 1024,
                    review_avg_score: 4.5,
                    purchase_count: 5481,
                },
                {
                    type: 'review_tracking_chart_widget',
                },
                {
                    type: 'price_tarcking_chart_widget',
                },
                {
                    type: 'category_search_total_widget',
                    categories: ['식품', '농산물', '과일', '오렌지'],
                    amonth_search_count: 139300,
                },
                {
                    type: 'device_search_chart_widget',
                }
            ]
        }
    ]
        
        

    constructor(
        private router :Router,
        private dashboardStore: DashboardStore,
        private productStore: ProductStore,
        private memberStore: MemberStore,
        private appService: AppService,
        private auth: AuthService,
        ) {

    }

    ngOnInit() {
        this._loadUsingGoods();
        this._loadUserSummary();
        // mypageInfo
    }

    private _loadUsingGoods() {
        // getUsingGoods 폐기처리
        this.productStore.getGoodsList().subscribe(resp => {
            console.log('_loadUsingGoods:: usingGoods resp =>', resp.list);
            if(!resp.list || !resp.list.length) {
                this.isUsingGoods = false;
            } else {
                this.isUsingGoods = true;
                this.usingGoods = resp.list;
                this.swiper.update();

                if(this.usingGoods.length > 0) {
                    this.currWidgetData = this.widgets_data[0];
                    this.currWidgetData.keyword = this.usingGoods[0].keyword;
                }

                console.log('_loadUsingGoods:: usingGoods resp =>', resp.list, this.usingGoods);
            }
        });
    }

    private _loadUserSummary() {
        // user infobox 데이타 로딩하기
        this.memberStore.getSummary().subscribe(resp => {
            console.log('dashboard::myInfo resp =>', resp);
            this.userSummary = resp;
            console.log('dashboard::myInfo resp =>', this.userSummary);
        });
    }

    onClickGoodsItem(index, item) {
        this.selectedGoodsItemIndex = index;
        console.log('onClickGoodsItem widgets_data, seq =>', this.widgets_data, item.goods_seq); 
        for(let _item of this.widgets_data) {
            if(item.goods_seq == _item.goods_seq) {
                this.currWidgetData = _item;
                this.currWidgetData.keyword = item.keyword;
                // aconsole.log('currWidgetData =>', this.currWidgetData, this.currWidgetData.widgets[0].type);
            }
        }

        // let data = this.widgets_data[item.goods_seq]
        //load widget data(item.goods_seq)
    }

    onClickUploadFileBtn() {
        this.isShowBatchProductRegist = true;
    }

    /////////////////////////////////
    // mobile event handler 

    //mobile member point 메뉴
    onClickBottomPoint() {
        this.isShowBottomPointArea = !this.isShowBottomPointArea;
    }

    onClickUserTier() {
        this.isShowUserTier = !this.isShowUserTier;
    }

    ////////////////////////////////////////////////
    // swiper

    onClickPrevSlide() {
        if (this.swiper) {
            this.swiper.prevSlide();
        }
    }   

    onClickNextSlide() {
        if (this.swiper) {
            this.swiper.nextSlide();
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
