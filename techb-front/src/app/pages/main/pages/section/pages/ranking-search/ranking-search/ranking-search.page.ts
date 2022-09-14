import { Component, OnInit } from '@angular/core';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../environments/environment';
import { Router} from '@angular/router';
import { setTimeout } from 'timers';
import { GoodsStore } from '../../../../../../../store/goods.store';
import { BSAlertService } from '../../../../../../../../common/ui/bs-alert';
import { KeywordStore } from '../../../../../../../store/keyword.store';

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Component({
    selector: 'ranking-search',
    templateUrl: './ranking-search.page.html',
    styleUrls: ['./ranking-search.page.css']
})
export class RankingSearchPageComponent implements OnInit {

    public selectedSearchTabName: string = 'store';
    // public isExistsHistory: boolean = false;

    public storeName: string = '';
    public storeKeyword: string = '';
    public addrUrlName: string = '';
    public addrUrlKeyword: string = '';
    public goodsName: string = '';
    public goodsKeyword: string = '';

    public searchResult = [];

    public ranking_data = {
        search_History: {
            store: [
                // {   
                //     seq: 1,
                //     name: '제주농부제주농부제주농부제주농부제주농부제주농부',
                //     keyword: '망고', 
                //     count: 720642,
                // },
            ],

            url: [
                // {   
                //     seq: 1,
                //     name: '/4943439707',
                //     keyword: '망고', 
                //     count: 720642,
                // },
            ],

            goods: [
                // {   
                //     seq: 1,
                //     name: '제주농부 산지직송 산지직송',
                //     keyword: '망고', 
                //     count: 720642,
                // },
            ],
        },

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
    }

    private _searchResult = [
        {   
            is_ad: true,
            categories: ['식품', '농산물', '과일', '망고'],
            store_name: '제주농부2',
            goods_name: '제주농부 산지직송 고당도 제주 미니 꼬마 애플망고 1kg 2kg 3kg',
            goods_seq: 141,
            sales_rank: {
                current_rank: 23,
                total_rank: 689689,
                page_count: 2,
                page_rank: 5
            },
            reviews: {
                review_total: 1024,
                avg_score: 4.5,
                sales_total: 5481
            },
            is_subscribe: 'N'
        },
        {
            is_ad: false,
            categories: ['식품', '농산물', '과일', '망고'],
            store_name: '제주농부3',
            goods_name: '제주농부 산지직송 고당도 제주 미니 꼬마 애플망고 1kg 2kg 3kg',
            goods_seq: 328,
            sales_rank: {
                current_rank: 94,
                total_rank: 721277,
                page_count: 3,
                page_rank: 2
            },
            reviews: {
                review_total: 30,
                avg_score: 4.7,
                sales_total: 7
            },
            is_subscribe: 'Y' 
        },

    ]

    private _searchResult_url = [
        {   
            is_ad: true,
            categories: ['식품', '농산물', '과일', '망고'],
            store_name: '제주농부1',
            goods_name: '제주농부 산지직송 고당도 제주 미니 꼬마 애플망고 1kg 2kg 3kg',
            goods_seq: 141,
            sales_rank: {
                current_rank: 23,
                total_rank: 689689,
                page_count: 2,
                page_rank: 5
            },
            reviews: {
                review_total: 1024,
                avg_score: 4.5,
                sales_total: 5481
            },
            is_subscribe: 'N'
        },
    ]

    constructor(
        private router :Router,
        private goodsStore : GoodsStore,
        private appService: AppService,
        private auth: AuthService,
        private keywordHistoryStore: KeywordStore,
        protected alert: BSAlertService,
        ) {

    }

    ngOnInit() {
        setTimeout(()=> {
            //this.ranking_data = this._ranking_data;
            this.keywordHistoryStore.init('_store');
            this.ranking_data.search_History.store = this.keywordHistoryStore.list();
        },500);
    }

////////////////////////////////
// Event Handler
    onClickSearchTab(tabName) {
        this.selectedSearchTabName = tabName;

        this.keywordHistoryStore.init('_' + tabName);
        this.ranking_data.search_History[tabName] = this.keywordHistoryStore.list();
        // alert(tabName);
    }

    onClickStoreSearchSubmit(storeName, keyword) {

        // API 호출
        this._searchStore(storeName, keyword);
    }
    
    onClickUrlSearchSubmit(url, keyword) {
        // alert('검색 urlName, keyword '+url);

        this._searchUrl(url, keyword);
    }
    
    onClickGoodsSearchSubmit(goodsName, keyword) {
        // alert('검색 goodsName, keyword '+goodsName);

        this._searchGoods(goodsName, keyword);
    }

    _searchStore(storeName, keyword) {
        if(!storeName) {
            this.alert.show('분석하고 싶은 상품의 스토어명를 입력해주세요.');
            return;
        } else if(!keyword) {
            this.alert.show('분석하고 싶은 상품의 키워드를 입력해주세요.');
            return;
        }

        // this.storeName = storeName;
        // this.storeKeyword = keyword;

        // temp
        let key;
        if (keyword == '망고') {
            key = '제주농부3';
        } else if (keyword == '딸기') {
            key = '지리산작두Farm';
        } else {
            key = 'test';
            alert("테스트 키워드로 '망고', '딸기'를 검색할 수 있습니다.");
        }

        this.goodsStore.search(keyword, key).subscribe(resp => {
            this.searchResult['store'] = resp.list;
            console.log('_searchStore storeName, keyword result =>', resp.list);
            
            let obj = {
                name: storeName,
                keyword: keyword,
                count: 0
            }
            this.ranking_data.search_History.store = this.keywordHistoryStore.create(obj);
            //this.rankSearchResult = this._rankSearchResult;
        });      
        // API 호출
        // setTimeout(()=> {
        //     this.searchResult = this._searchResult;
        // }, 1000);
    }

    _searchUrl(url, keyword) {
        if(!url) {
            this.alert.show('분석하고 싶은 상품 주소를 입력해주세요.');
            return;
        } else if(!keyword) {
            this.alert.show('분석하고 싶은 상품의 키워드를 입력해주세요.');
            return;
        }


        // this.addrUrlName = url;
        // this.addrUrlKeyword = keyword;

        // temp
        let key;
        if (keyword == '망고') {
            key = '제주농부3';
        } else if (keyword == '딸기') {
            key = '지리산작두Farm';
        } else {
            key = 'test';
            alert("테스트 키워드로 '망고', '딸기'를 검색할 수 있습니다.");
        }       

        this.goodsStore.search(keyword, key).subscribe(resp => {
            this.searchResult['url'] = resp.list;
            let obj = {
                name: url,
                keyword: keyword,
                count: 0
            }
            this.ranking_data.search_History.url = this.keywordHistoryStore.create(obj);
        })
        // API 호출
        // setTimeout(()=> {
        //     this.searchResult = this._searchResult_url;
        // }, 1000);
    }

    _searchGoods(goodsName, keyword) {
        if(!goodsName) {
            this.alert.show('분석하고 싶은 상품명을 입력해주세요.');
            return;
        } else if(!keyword) {
            this.alert.show('분석하고 싶은 상품의 키워드를 입력해주세요.');
            return;
        }

        // this.goodsName = goodsName;
        // this.goodsKeyword = keyword;

        // temp
        let key;
        if (keyword == '망고') {
            key = '제주농부3';
        } else if (keyword == '딸기') {
            key = '지리산작두Farm';
        } else {
            key = 'test';
            alert("테스트 키워드로 '망고', '딸기'를 검색할 수 있습니다.");
        }

        this.goodsStore.search(keyword, key).subscribe(resp => {
            this.searchResult['goods'] = resp.list;
            let obj = {
                name: goodsName,
                keyword: keyword,
                count: 0
            }
            this.ranking_data.search_History.goods = this.keywordHistoryStore.create(obj);
        })
        // API 호출
        // setTimeout(()=> {
        //     this.searchResult = this._searchResult;
        // }, 1000);
    }

    onClickHistoryKeyword(event) {
        console.log('onClickHistoryKeyword event =>', event);
        if (event.store && event.store.length > 0) {
            this.storeName = event.store;
            this.storeKeyword = event.keyword;
            this._searchStore(this.storeName, this.storeKeyword);
        } else if (event.url && event.url.length > 0) {
            this.addrUrlName = event.url;
            this.addrUrlKeyword = event.keyword;        
            this._searchUrl(this.addrUrlName, this.addrUrlKeyword);
        } else if (event.goods && event.goods.length > 0) {
            this.goodsName = event.goods;
            this.goodsKeyword = event.keyword;
            this._searchGoods(this.goodsName, this.goodsKeyword);
        }
    }

    onClickDeleteHistoryKeyword(event) {
        this.keywordHistoryStore.delete(event.keyword, event.name);
        console.log('onClickDeleteHistoryKeyword event =>', event);
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
