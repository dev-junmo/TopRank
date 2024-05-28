import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { FooterStore } from './../../store/footer.store';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

const Highcharts = require('highcharts/highcharts.src');
import 'highcharts/adapters/standalone-framework.src';

import { AppService } from '../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../service/auth.service';

import { environment } from '../../../../../../../environments/environment';
import { Router} from '@angular/router';
import { MockStore } from '../../../../../../store/mock.store';
import { GoodsStore } from '../../../../../../store/goods.store';
import { BSAlertService } from '../../../../../../../common/ui/bs-alert';

//helper
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Component({
    selector: 'home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.css']
})
export class HomePageComponent implements OnInit {

    public selectedTabName: string = 'keyword';
    public searchKeyword: string = '';
    public rankSearchStore: string = '';
    public rankSearchKeyword: string = '';
    public isSampledata: boolean = true;
    
    public display_data = {
        trend_keywords: ['망고', '토트백', '딸기', '가디건'],
        init_rank_keyword: {
            store_name: '제주농부',
            keyword: '망고'
        }
    }

    public searchResult = {};

    public search_result = [
        {
            keyword: '망고',
            categories: ['식품', '농산물', '과일', '망고'],
            sites: [
                {
                    name: '네이버',
                    url: 'https://search.naver.com/search.naver?ie=UTF-8&query=%EB%A7%9D%EA%B3%A0',
                    img_url: 'assets/images/home/thum_naver_32.png'
                },
                {
                    name: '네이버쇼핑',
                    url: 'https://search.shopping.naver.com/search/all?where=all&frm=NVSCTAB&query=%EB%A7%9D%EA%B3%A0',
                    img_url: 'assets/images/home/thum_navershoping_32.png'
                },
                {
                    name: '쿠팡',
                    url: 'https://www.coupang.com/np/search?component=&q=%EB%A7%9D%EA%B3%A0',
                    img_url: 'assets/images/home/thum_coupang_32.png'
                },
            ],
            goods_count: 668146,
            search_count_day: 139300,
            device_search: [],
            personal_info: ['30대 중반', '30대 후반', '40대 초반', '여성'],
            select_date: ['2022.02.01', '2022.03.01'],
            trend_chart: [],
            hot_ranking: [
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EB%94%B8%EA%B8%B0',
                    popular_word: '딸기'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%95%A0%ED%94%8C',
                    popular_word: '애플'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%95%A0%ED%94%8C%EB%A7%9D%EA%B3%A0',
                    popular_word: '애플망고'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%B9%B4%ED%8E%98',
                    popular_word: '카페'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EA%B3%BC%EC%9D%BC',
                    popular_word: '과일'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EB%A9%94%EB%89%B4',
                    popular_word: '메뉴'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%9A%94%EA%B1%B0%ED%8A%B8',
                    popular_word: '요거트'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%A7%91',
                    popular_word: '집'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%EC%82%AC%EC%A7%84',
                    popular_word: '사진'
                },
                {
                    popular_url: 'https://search.shopping.naver.com/search/all?query=%ED%95%98%EB%A3%A8',
                    popular_word: '하루'
                },
            ],
            age_click_chart: []
        },
        {
            keyword: '토트백',
            categories: ['잡화', '여성가방', '가방','토트백'],
            sites: [
                {
                    name: '네이버',
                    url: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%ED%86%A0%ED%8A%B8%EB%B0%B1',
                    img_url: 'assets/images/home/thum_naver_32.png'
                },
                {
                    name: '네이버쇼핑',
                    url: 'https://search.shopping.naver.com/search/all?query=%ED%86%A0%ED%8A%B8%EB%B0%B1',
                    img_url: 'assets/images/home/thum_navershoping_32.png'
                },
                {
                    name: '쿠팡',
                    url: 'https://www.coupang.com/np/search?component=&q=%ED%86%A0%ED%8A%B8%EB%B0%B1',
                    img_url: 'assets/images/home/thum_coupang_32.png'
                },
            ],
            goods_count: 15320,
            search_count_day: 123586,
            device_search: [],
            personal_info: ['20대 중반', '20대 후반', '3대 초반', '여성'],
            select_date: ['2022.02.01', '2022.03.01'],
            trend_chart: [],
            hot_ranking: ['딸기', '애플', '애플망고', '카페', '과일', '메뉴', '요거트', '집', '사진', '하루'],
            age_click_chart: []
        },
        {
            keyword: '딸기',
            categories: ['식품', '농산물', '과일', '딸기'],
            sites: [
                {
                    name: '네이버',
                    url: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EB%94%B8%EA%B8%B0',
                    img_url: 'assets/images/home/thum_naver_32.png'
                },
                {
                    name: '네이버쇼핑',
                    url: 'https://search.shopping.naver.com/search/all?query=%EB%94%B8%EA%B8%B0',
                    img_url: 'assets/images/home/thum_navershoping_32.png'
                },
                {
                    name: '쿠팡',
                    url: 'https://www.coupang.com/np/search?component=&q=%EB%94%B8%EA%B8%B0',
                    img_url: 'assets/images/home/thum_coupang_32.png'
                },
            ],
            goods_count: 12352,
            search_count_day: 7886521,
            device_search: [],
            personal_info: ['30대 중반', '30대 후반', '40대 초반', '여성'],
            select_date: ['2022.02.01', '2022.03.01'],
            trend_chart: [],
            hot_ranking: ['딸기', '애플', '애플망고', '카페', '과일', '메뉴', '요거트', '집', '사진', '하루'],
            age_click_chart: []
        },
        {
            keyword: '가디건',
            categories: ['의류', '상의', '아우터', '가디건'],
            sites: [
                {
                    name: '네이버',
                    url: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EA%B0%80%EB%94%94%EA%B1%B4',
                    img_url: 'assets/images/home/thum_naver_32.png'
                },
                {
                    name: '네이버쇼핑',
                    url: 'https://search.shopping.naver.com/search/all?query=%EA%B0%80%EB%94%94%EA%B1%B4',
                    img_url: 'assets/images/home/thum_navershoping_32.png'
                },
                {
                    name: '쿠팡',
                    url: 'https://www.coupang.com/np/search?component=&q=%EA%B0%80%EB%94%94%EA%B1%B4',
                    img_url: 'assets/images/home/thum_coupang_32.png'
                },
            ],
            goods_count: 42235,
            search_count_day: 13500,
            device_search: [],
            personal_info: ['20대 중반', '10대 후반', '40대 초반', '남성'],
            select_date: ['2022.02.01', '2022.03.01'],
            trend_chart: [],
            hot_ranking: ['딸기', '애플', '애플망고', '카페', '과일', '메뉴', '요거트', '집', '사진', '하루'],
            age_click_chart: []
        }
    ];

    public rankSearchResult;
    private _rankSearchResult = [
        {   
            goods_seq: 141,
            is_ad: false,
            categories: ['식품', '농산물', '과일', '망고'],
            store_name: '제주농부3',
            goods_name: '제주농부 산지직송 고당도 제주 미니 꼬마 애플망고 1kg 2kg 3kg',
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
        },
        {   
            goods_seq: 128,
            is_ad: true,
            categories: ['식품', '농산물', '과일', '망고'],
            store_name: '제주농부',
            goods_name: '제주농부 제주 애플망고 2kg 3kg / 상품, 미니, 선물용, 가정용',
            sales_rank: {
                current_rank: 224,
                total_rank: 425682,
                page_count: 24,
                page_rank: 7
            },
            reviews: {
                review_total: 30,
                avg_score: 4.9,
                sales_total: 35
            },
        },
        {   
            goods_seq: 10,
            is_ad: false,
            categories: ['식품', '농산물', '과일', '망고'],
            store_name: '제주농부',
            goods_name: '제주농부 제주 애플망고 2kg 3kg (소포장, 못난이, 가정용, 선물포장)',
            sales_rank: {
                current_rank: 102,
                total_rank: 5632,
                page_count: 6,
                page_rank: 2
            },
            reviews: {
                review_total: 125,
                avg_score: 4.4,
                sales_total: 350
            },
        },
    ]

    constructor(
        private router :Router,
        private goodsStore : GoodsStore,
        private mockStore: MockStore,
        private appService: AppService,
        private auth: AuthService,
        public alert: BSAlertService,
        private _scrollToService: ScrollToService,
        ) {
        
    }

    ngOnInit() {
        this._initialSearch();
    }

    @ViewChild('lineChart') public chartEl: ElementRef;
    @ViewChild('pieChart') public chartE2: ElementRef;
    @ViewChild('columnChart') public chartE3: ElementRef;

    private _lineChart: any;
    private _pieChart: any;


    public ngAfterViewInit() {
        // Line Chart
        let lineOpts: any = {
            credits: {
                enabled: false
            },
            title: {
                text: null,
                x: -20 //center
            },
            xAxis: {
                // accessibility: {
                //     rangeDescription: 'Range: 2010 to 2017'
                // },
                type: 'datetime',
                // dateTimeLabelFormats: { // don't display the dummy year
                //     day: '%e. %b',
                //     year: '%Y',
                // },
        
                tickInterval: 4 * 24 * 3600 * 1000, // one month
                // dateTimeLabelFormats: { // don't display the dummy year
                    
                // },
                labels: {
                    // formatter: function () {
                    //     return Highcharts.dateFormat('%a %e %b', this.value);
                    // },
                    format: '{value:%y.%m.%e}',
                    style: {
                        fontSize: '12px',
                        color: '#3e4259',
                        fontFamily: 'GmarketSans'
                    },
                },
                lineColor: '#3e4259',
                tickColor: '#3e4259',
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    format: '{value:,.0f}',
                    style: {
                        fontSize: '14px',
                        color: '#b8b6c4',
                        fontFamily: 'GmarketSans'
                    }
                },
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    },
                    label: {
                        connectorAllowed: false
                    },
                }
            },
            series: [{
                name: '클릭트렌드',
                color: '#2dd6e0',
                lineWidth: 6,
                data: [
                    0, 30, 40, 75, 83, 60, 25, 15, 54, 21, 4, 10, 15, 12, 20, 24, 
                    30, 36, 31, 40, 42, 50, 48, 50, 52, 60, 62, 68, 70, 75
                ],
                // pointStart: Date.UTC(2022, 1, 1)
                // tickInterval: 4 * 24 * 3600 * 1000, // one month
                // marker: {
                //     fillColor: '#fff',
                //     lineColor: '#3f37c9',
                //     lineWidth: 2,
                //     radius: 6
                // }
            }, 
            {
                name: '검색트렌드',
                color: '#3f37c9',
                lineWidth: 6,
                data: [
                    45, 38, 75, 71, 65, 72, 63, 54, 42, 45, 38, 75, 71, 65, 72, 63, 54,
                    45, 38, 75, 71, 65, 72, 63, 54, 42, 45, 38, 75, 71, 65, 72
                ]
            }
        ],
            legend: {
                enabled: false,
            },
        };

        if (this.chartEl && this.chartEl.nativeElement) {
            lineOpts.chart = {
                type: 'line',
                backgroundColor: '#fafbff',
                renderTo: this.chartEl.nativeElement,
            };
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });

            this._lineChart = new Highcharts.Chart(lineOpts);
        }
        //////////////////////////////////////////////////////////
        //pie Chart
        let pieOpts: any = {
            //하이차트 마크 숨기기
            credits: {
                enabled: false
            },
            title: {
                text: null,
                x: -20 //center
            },
            series: [{
                // minPointSize: 10,
                // zMin: 0,
                innerSize: '50%',
                name: 'device',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}<br>{point.y}%',
                    align: 'center',
                    style: {
                        fontSize: '18px',
                        fontFamily: 'GmarketSans',
                        fontWeight: '500',
                    }
                },
                data: [
                    {
                        name: '모바일',
                        y: 70,
                        z: 235.6,
                        color: '#4d77ff',
                        dataLabels: {
                            color: '#4d77ff',
                        },
                    },
                    {
                        name: 'PC',
                        y: 30,
                        z: 92.9,
                        color: '#fd5d5d',
                        dataLabels: {
                            color: '#fd5d5d',
                        },
                    }
                ],
            }]
        };

        if (this.chartE2 && this.chartE2.nativeElement) {
            pieOpts.chart = {
                type: 'pie',
                backgroundColor: '#fafbff',
                renderTo: this.chartE2.nativeElement,
            };
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
                //차트 여러가지색 넣을때
                // colors: ['#0093e0','#116cc1','#15baa4','#157270', '#ea8175','#87cd33','#616bcf']
            });
            this._pieChart = new Highcharts.Chart(pieOpts);
        }
        //////////////////////////////////////////////////////////
        //column Chart
        let columnOpts: any = {
            //하이차트 마크 숨기기
            credits: {
                enabled: false
            },
            title: {
                text: null,
                x: -20 //center
            },
            xAxis: {
                categories: ['10대', '20대', '30대', '40대', '50대', '60대'],
                labels: {
                    style: {
                        fontSize: '16px',
                        color: '#04021f',
                        fontFamily: 'Spoqa Han Sans Neo',
                        fontWeight: '500',
                    }
                },
                lineColor: '#3e4259',
                tickColor: null,
            }, 
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    format: '{value:,.0f}',
                    style: {
                        fontSize: '14px',
                        color: '#b8b6c4',
                        fontFamily: 'GmarketSans',
                        fontWeight: '500',
                    }
                },
            },
            plotOptions: {
                series: {
                    //bar 너비
                    pointWidth: 51,//컬럼 너비 지정.
                }
            },
            series: [{
                // lineWidth: 6,
                name: 'age',
                color: '#2dd6e0',
                data: [
                    40, 75, 60, 25, 15, 54
                ],
            }],
            legend: {
                enabled: false,
            },            
        };

        if (this.chartE3 && this.chartE3.nativeElement) {
            columnOpts.chart = {
                type: 'column',
                backgroundColor: '#fafbff',
                renderTo: this.chartE3.nativeElement,
            };
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
                //차트 여러가지색 넣을때
                // colors: ['#0093e0','#116cc1','#15baa4','#157270', '#ea8175','#87cd33','#616bcf']
            });

            this._pieChart = new Highcharts.Chart(columnOpts);
        }

    }

    public ngOnDestroy() {
        // dot Line Chart
        // this._dotLineChart.destroy();
        //pie Chart
        // this._pieChart.destroy();
    }


    private _initialSearch() {
        // 키워드 검색
        let keyword = this._generateRandomKeyword(this.display_data.trend_keywords);
        this._keywordSearch(keyword);
    }

    private _generateRandomKeyword(keywords) {
        let random = rand(0, keywords.length-1);
        return keywords[random];
    }

    private _keywordSearch(keyword) {
        if(!keyword) {
            this.alert.show('분석하고 싶은 키워드를 입력해주세요.');
            return;
        }
    
        this.mockStore.get().subscribe(resp => {
            for(let _keyword of this.search_result) {
                if(keyword == _keyword.keyword) {
                    this.searchResult = _keyword;
                    console.log('_keyowrdSearch keyword value =>', this.searchResult);
                }
            }
        });
        
        this.searchKeyword = keyword;
        //검색 요청 API
        // else if(keyword !== _keyword.keyword) {
        //     this.alert.show('검색 결과가 없습니다. 입력하신 검색어를 확인해주세요.');
        //     return;
        // }
        //검색 결과 데이터 변경
    }

    private _rankSearch(storeName, keyword) {
        if(!storeName) {
            this.alert.show('분석하고 싶은 상품의 스토어명을 입력해주세요.');
            return;
        } else if(!keyword) {
            this.alert.show('분석하고 싶은 키워드를 입력해주세요.');
            return;
        } 

        this.rankSearchStore = storeName;
        this.rankSearchKeyword = keyword;

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
            this.rankSearchResult = resp.list;
            //this.rankSearchResult = this._rankSearchResult;
        });      
    }

    // ============== 이벤트 핸들러 ================

    onClickSearchTab(tabName) {
        this.selectedTabName = tabName;

        // 순위검색 텝을 누르면 
        if (this.selectedTabName == 'rank') {
            console.log('onClickTabClick isSampledata =>', this.isSampledata);
            this.isSampledata = true;
            this._rankSearch(this.display_data.init_rank_keyword.store_name, this.display_data.init_rank_keyword.keyword);        
        }
    }

    onSubmitKeywordSearch(keyword) {
        this._keywordSearch(keyword);
    }

    onClickTrendKeyword(keyword) {
        this._keywordSearch(keyword);
    }   

    onSubmitRankSearch(storeName, keyword) {
        this.isSampledata = false; 
        console.log('onSubmitRankSearch isSampledata =>', this.isSampledata);
        this._rankSearch(storeName, keyword);
    }

    onClickScrollToSearchResult() {
        const config: ScrollToConfigOptions = {
            target: 'id-search-result',
        };
        this._scrollToService.scrollTo(config).subscribe(pos => {
        });
    }
    onClickScrollToRankResult() {
        const config: ScrollToConfigOptions = {
            target: 'id-rank-result',
        };
        this._scrollToService.scrollTo(config).subscribe(pos => {
        });
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
