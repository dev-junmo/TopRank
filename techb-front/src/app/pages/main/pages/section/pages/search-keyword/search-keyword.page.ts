import { Component, OnInit } from '@angular/core';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../service/auth.service';
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute, Router} from '@angular/router';
import { NONAME } from 'dns';
import { KeywordStore } from '../../../../../../store/keyword.store';
import { BSAlertService } from '../../../../../../../common/ui/bs-alert';

const TBKEYWORDS_HISTORY = 'TBKeyowrdsHistory';

@Component({
    selector: 'search-keyword',
    templateUrl: './search-keyword.page.html',
    styleUrls: ['./search-keyword.page.css']
})
export class SearchKeywordPageComponent implements OnInit {

    public searchKeyword;
    public isBeforeSearch: boolean = true;
    public isExistsHistory: boolean = false;
    
    public trendKeywords: Array<string> = ['망고', '토트백', '딸기', '가디건', '반티', '카네이션', '어버이날선물'];
    public trendKeywordsMobile: Array<string> = ['망고', '토트백', '딸기', '가디건'];

    public data = {
        keyword: '망고',
        categories: ['식품', '농산물', '과일', '망고'],
        site: ['네이버', '네이버쇼핑', '쿠팡'],
        site_url: [
            'https://search.naver.com/search.naver?ie=UTF-8&query=%EB%A7%9D%EA%B3%A0',
            'https://search.shopping.naver.com/search/all?where=all&frm=NVSCTAB&query=%EB%A7%9D%EA%B3%A0',
            'https://www.coupang.com/np/search?component=&q=%EB%A7%9D%EA%B3%A0',
        ],
        goods_count: 668146,
        search_count_day: 139300,
        device_search: [],
        personal_info: ['30대 중반', '30대 후반', '40대 초반', '여성'],
        select_date: ['2022.02.01', '2022.03.01'],
        trend_chart: [],
        hot_ranking: ['딸기', '애플', '애플망고', '카페', '과일', '메뉴', '요거트', '집', '사진', '하루'],
        age_click_chart: [],

        ///////////////////////
        // 6개월 전체 매출
        avg_sales: 30688317,
        avg_sales_count: 1253,
        avg_price: 33488,

        search_blog: 2970499,
        search_cafe: 1364230,
        search_view: 14112868,
        search_img: 1330700,
        search_knowledge: 124887,
        search_book: 2097,

        popular_ranking: ['망고', 'MANGO', '제주애플망고', '망고의류', '태국망고', '망고코리아', '망고쇼핑몰', '무지개망고', '말린망고', '한라봉'],

        ad_keywords: [
            { 
                ad_keyword_name: '망고',
                ad_search_count: 156300,
                ad_product_count: 741213
            },
            { 
                ad_keyword_name: 'MANGO',
                ad_search_count: 22100,
                ad_product_count: 741213
            },
            { 
                ad_keyword_name: '제주애플망고망고',
                ad_search_count: 19050,
                ad_product_count: 1639
            },
            { 
                ad_keyword_name: '망고의류',
                ad_search_count: 18170,
                ad_product_count: 153590
            },
            { 
                ad_keyword_name: '태국망고',
                ad_search_count: 10190,
                ad_product_count: 12954
            },
            { 
                ad_keyword_name: '망고코리아',
                ad_search_count: 8690,
                ad_product_count: 5016
            },
            { 
                ad_keyword_name: '망고쇼핑몰',
                ad_search_count: 4680,
                ad_product_count: 741213
            },
            { 
                ad_keyword_name: '무지개망고',
                ad_search_count: 1090,
                ad_product_count: 4888
            }
        ],

        rel_shopping_ranks: [
            { 
                rel_shopping_name: '망고',
                rel_search_count: 156300,
                rel_product_count: 741213
            },
            { 
                rel_shopping_name: 'MANGO',
                rel_search_count: 22100,
                rel_product_count: 741213
            },
            { 
                rel_shopping_name: '제주애플망고망고',
                rel_search_count: 19050,
                rel_product_count: 1639
            },
            { 
                rel_shopping_name: '망고의류',
                rel_search_count: 18170,
                rel_product_count: 153590
            },
            { 
                rel_shopping_name: '태국망고',
                rel_search_count: 10190,
                rel_product_count: 12954
            },
            { 
                rel_shopping_name: '망고코리아',
                rel_search_count: 8690,
                rel_product_count: 5016
            },
            { 
                rel_shopping_name: '망고쇼핑몰',
                rel_search_count: 4680,
                rel_product_count: 741213
            },
            { 
                rel_shopping_name: '무지개망고',
                rel_search_count: 1090,
                rel_product_count: 4888
            }
        ],

        autocomplete_ranks: [
            { 
                auto_ranking_name: '망고',
                auto_search_count: 156300,
                auto_product_count: 741213
            },
            { 
                auto_ranking_name: 'MANGO',
                auto_search_count: 22100,
                auto_product_count: 741213
            },
            { 
                auto_ranking_name: '제주애플망고망고',
                auto_search_count: 19050,
                auto_product_count: 1639
            },
            { 
                auto_ranking_name: '망고의류',
                auto_search_count: 18170,
                auto_product_count: 153590
            },
            { 
                auto_ranking_name: '태국망고',
                auto_search_count: 10190,
                auto_product_count: 12954
            },
            { 
                auto_ranking_name: '망고코리아',
                auto_search_count: 8690,
                auto_product_count: 5016
            },
            { 
                auto_ranking_name: '망고쇼핑몰',
                auto_search_count: 4680,
                auto_product_count: 741213
            },
            { 
                auto_ranking_name: '무지개망고',
                auto_search_count: 1090,
                auto_product_count: 4888
            }
        ],

        //최근 검색 목록 
        searching_history: [
            // {
            //     history_seq: 1,
            //     history_keyword: '망고',
            //     history_category: '망고', 
            //     history_count: 720642
            // },
        ],

        //실시간 검색어
        popular_keywords: [
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EB%B0%98%ED%8B%B0',
                popular_word: '반티'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EB%B2%8C%EC%9D%98%EC%BB%A4%EB%B9%84%20%EB%94%94%EC%8A%A4%EC%BB%A4%EB%B2%84%EB%A6%AC',
                popular_word: '별의커비 디스커버리'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%B9%B4%EB%84%A4%EC%9D%B4%EC%85%98',
                popular_word: '카네이션'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%96%B4%EB%B2%84%EC%9D%B4%EB%82%A0%20%EC%84%A0%EB%AC%BC',
                popular_word: '어버이날 선물'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%BD%94%EC%8A%A4%ED%83%80%EB%85%B8%EB%B0%94',
                popular_word: '코스타노바'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%9A%A9%EB%8F%88%EB%B0%95%EC%8A%A4',
                popular_word: '용돈박스'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EB%9D%BD%ED%86%A0%ED%8E%98%EB%A6%B0',
                popular_word: '락토페린'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%98%A4%ED%8A%B8%EB%B0%80',
                popular_word: '오트밀'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%EB%B0%9C%EB%AE%A4%EB%8B%A4%20%ED%86%A0%EC%8A%A4%ED%84%B0%EA%B8%B0',
                popular_word: '발뮤다 토스터기'
            },
            {
                popular_url: 'https://search.shopping.naver.com/search/all?query=%ED%97%88%EB%8B%88%EB%B2%84%ED%84%B0%EC%95%84%EB%AA%AC%EB%93%9C',
                popular_word: '허니버터아몬드'
            },
                
        ],
    };


    constructor(
        private activateRouter: ActivatedRoute,
        private appService: AppService,
        private keywordHistoryStore: KeywordStore,
        private auth: AuthService,
        public alert: BSAlertService,
        ) {
            this.keywordHistoryStore.init('_keyword');
    }

    ngOnInit() {
        this.activateRouter.queryParams.subscribe(params => {
            if(params.keyword) {
                this._search(params.keyword);
            }
            console.log("params = >", params);
        });

        this.data.searching_history = this.keywordHistoryStore.list();
        console.log('init data.searching_history =>', this.data.searching_history);
    }

    private _search(keyword) {
        if(!keyword) {
            this.alert.show('분석하고 싶은 키워드를 입력해주세요.');
            return;
        }
        this.searchKeyword = keyword;
        //검색 요청 API
        //검색 결과 데이터 변경
        this.isBeforeSearch = false;
        // alert(this.searchKeyword);

        // 최근 검색 기록 저장
        setTimeout(() => {
            let resp ={ keyword: keyword, category: '망고', count: 33432};
            // save localstory
            this.data.searching_history = this.keywordHistoryStore.create(resp);
            console.log('_search data.searching_history =>', this.data.searching_history);

        }, 1000);
    }

    onClickDeleteHistory(keyword) {
        this.data.searching_history = this.keywordHistoryStore.delete(keyword);
    }

    /////////////
    onSubmitKeywordSearch(keyword) {
        this._search(keyword);
    }

    onClickKeyword(keyword) {
        this._search(keyword);
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
