import { Component, OnInit, HostListener, Injectable, Injector, Inject, PLATFORM_ID, APP_ID, ViewChild, ElementRef} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { Router, Event as RouterEvent , ActivatedRoute,
        NavigationStart , NavigationEnd , NavigationCancel , NavigationError,
        RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { DomSanitizer } from '@angular/platform-browser';

import { AppService } from './common/service/app.service';
import { SafeHttpUrlPipe } from '../common/pipe/http.pipe';
import { AuthService } from './service/auth.service';


import { ErrorHandler } from '@angular/core';
import { BSLoadingService } from '../common/core/bs-loading';
import { BSScriptLoaderService } from '../common/service/bs-script-loader.service';

//import { BSVideoPlayerService } from './common/service/bs-videoplayer.service';


// var iconv = require('iconv-lite');
// console.log('iconv =>', iconv);
// var contents = new Buffer([0xBA,0xEA,0xB7,0xA3,0xB5,0xE5,0xB8,0xED]);
// //const utf8 = iconv.decode('%BA%EA%B7%A3%B5%E5%B8%ED', 'euc-kr');
// console.log('euc-kr => utf8',contents, iconv.decode(contents, 'EUC-KR').toString());
var isUriError = false;

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private loading: BSLoadingService, private injector: Injector) {
        
    }
  
    handleError(error) {
       
        if (this.loading) {
            console.log('GlobalErrorHandler::handleError loading =>', this.loading);
            this.loading.hide();
        }
        // 검색을 통해서 들어오는 경우 한글 엔코딩 문자가 생김 
        //if (!error) { return; }

        // let errorStr: string = error;
        // let errorCode = errorStr.substr(0, 8);
        console.error('GlobalErrorHandler error =>', error);

        if (error.name == 'URIError') {
                
                let query: string = window.location.search;
                console.log('GlobalErrorHandler1 location.pathname, location.search, location.hash =>',  
                    location.pathname, location.search, location.hash);

                let index = query.search('utm_source');
                if (index !== -1) {
                    let query2 = query.substr(0, index-1);
                    console.log('GlobalErrorHandler2 query2 =>', query2);
                    
                    isUriError = true;
                    // 공통 - 네이버
                    let script = new BSScriptLoaderService();
                    script.load('https://wcs.naver.net/wcslog.js').subscribe(data => {
                        script.load('../../../../assets/js/naver-cts-common.js').subscribe(data => {

                            console.log('handleError::scriptLoaded data =>', data);

                            const router = this.injector.get(Router);
                            router.navigateByUrl(location.pathname + query2);
                        });          
                    });       
                }
        }        
    }
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    date: {year: number, month: number};

    public checkedVideoArea: boolean = false; // app 실행에 한번만 체크하기 위해서
    public isShowTopVideoArea: boolean = false;
    public isHomePage: boolean = false;    // 처음에 껐다가 켜려니까 힘드네

    private scrollDir: number = 0;
    private lastScrcollPos: number = 0;
    private autoScrolling: boolean = false;

    public videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("about:blank");
    public videoUrlSrc;
    public mobileVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("about:blank");

    private cartCount: number = 0;
    private ignoreScrollEvent = false;

    private isShowHamburger: boolean = false;

    @HostListener('click', ['$event.target'])
    onClick() {
        this.appService.onGlobalClick();
    }


    //@ViewChild('videoPlayer') playerEl: ElementRef;

    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event) {
        this.topVideoAutoScroll();

        // inifinty
        //this.checkInfinityScroll();
    }

    topVideoAutoScroll() {
        let height: number = window.innerHeight;
        let currPos: number = window.pageYOffset;

        if(this.isShowTopVideoArea == true) {
            if (this.lastScrcollPos != 0) {
                    this.scrollDir = currPos - this.lastScrcollPos;
            }

            console.log("scroll dir = ", this.scrollDir, currPos,    height, this.autoScrolling);

            this.lastScrcollPos = currPos;

            if(this.scrollDir > 20 && this.autoScrolling == false && currPos < height) {
                this.lastScrcollPos = 0;
                setTimeout(()=> {
                    this.triggerScrollTo();
                }, 100);
            }
        }
    }
    
    // checkInfinityScroll() {
    //     let scrollPercent = this.getScrollPercent();
    //     if (scrollPercent > 75 && scrollPercent !== 100) {
    //         //console.log('checkInfinityScroll scrollPercent, ignoreScrollEvent =>', scrollPercent, this.ignoreScrollEvent);
    //         if (!this.ignoreScrollEvent) {
    //             //console.log('checkInfinityScroll scrollPercent, ignoreScrollEvent =>', scrollPercent, this.ignoreScrollEvent);
    //             this.ignoreScrollEvent = true;
    //             //if (this.appService.device == 'pc') {
    //                 this.appService.fireInfinityScrolled();
    //             //}

    //             // 한버 발생하면 1초이내는 다시 발생하지 않는다.
    //             // 그동안 페이지가 늘어나야 함
    //             setTimeout(()=> {
    //                 this.ignoreScrollEvent = false;
    //                 let scrollPercent = this.getScrollPercent();
    //                 if (scrollPercent > 99) {
    //                     this.appService.fireInfinityScrolled();
    //                 }
    //             }, 1500);
    //         }

    //     }
    // }

    getScrollPercent() {
        var h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    }

    onInfiniteScrolledFromDesktop() {
        console.log('AppComponent::onInfiniteScrolledFromDesktop');
        //this.appService.fireInfinityScrolled();
    }

    // onInfiniteScrolledFromMobile() {
    //     console.log('AppComponent::onInfiniteScrolledFromMobile');
    //     //this.appService.fireInfinityScrolled();
    // }


    triggerScrollTo() {
        this.autoScrolling = true;
        setTimeout(()=>{
                this.autoScrolling = false;
                console.log( "timeout - this.autoScrolling = false;");
        }, 1000);

        console.log( "this.autoScrolling = true;");
        const config: ScrollToConfigOptions = {
                target: 'header',
            };

        this._scrollToService.scrollTo(config).subscribe(pos => {

            let height: number = window.innerHeight;
            console.log("autoscrolling ", pos, height);
            if (pos >= height) {
                setTimeout(()=>{
                        this.autoScrolling = false;
                        console.log("this.autoScrolling = false;", pos, height);
                }, 100);
            }
        });
    }


    //         1.스크롤을 밑으로 하는데... 비율이 동영상슬라이드의 30%이상 되면... 밑으로 붙기
    //         2.스크롤을 위로 하는데... 그 비율이 약 30%이상 위으로 붙기

    // 이미 이 행위가 발생하면 그동안은 스크롤 이벤트 Pass
    // 이 행위가 끝나면 다시 리셋
    // 이 행위는 버튼으로 다운스크롤 하는것을 포함

    // 동영상 맡에서 스크롤을 하면은 이벤트 Pass

    public title = 'Techb';

    public loadingTemplete: string =
    `<div class="preloader">
        <div class="container-fluid">
            <div class="spinner2">
                <span class="ball-1"></span>
                <span class="ball-2"></span>
                <span class="ball-3"></span>
                <span class="ball-4"></span>
            </div>
        </div>
    </div>`;

    //public loadingTemplete2: string ='<div class="lds-heart"><div></div></div>';

    // scroll to top
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public videoItem;

    private device = 'mobile';
    private _language;

//   constructor(
//     @Inject(PLATFORM_ID) private platformId: Object,
//     @Inject(APP_ID) private appId: string, router: Router, private _http: HttpClient) {

//         const platform = isPlatformBrowser(platformId) ?
//       'in the browser' : 'on the server';
//     console.log(`Running ${platform} with appId=${appId}`);
//   }


    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string,
        private router: Router,
        private location: Location,
        // private mainStore : MainStore,
        // private orderStore: OrderStore,
        //private goodsStore: GoodsStore,
        private _scrollToService: ScrollToService,
        private sanitizer: DomSanitizer,
        public appService: AppService,
        private auth: AuthService,
        private httpPipe: SafeHttpUrlPipe,
        //public videoPlayer: BSVideoPlayerService,
        //private thestate: ResponsiveState,
        //private meta: Meta,
        private activateRouter: ActivatedRoute,) {

        // const platform = isPlatformBrowser(platformId)? 'in the browser' : 'on the server';
        // console.log(`Running ${platform} with appId=${appId}`);

        //////////////
        // this.router.events.filter(e => e instanceof NavigationError).subscribe(e => {
        //     console.log(`NAV ERROR -> ${e}`);
        // });

        this.device = this.appService.getDevice();
    }

    safeScrollTo(y) {
        let duration = [1, 10, 20, 30, 50, 100, 200, 300, 400, 500, 1000];

        window.scrollTo(0, y);
        
        for(let _duration of duration) {
            setTimeout(() => {
                window.scrollTo(0, y);
            }, _duration);     
        }
        console.log('safeScrollTo y =>', y);
    }

    ngOnInit() {
        let queryParams = this.activateRouter.snapshot.queryParams;
        console.log('AppComponent::ngOnInit 111111111queryParams =>', queryParams);
        if (queryParams.view_mode && queryParams.view_mode == 'desktop') {
            this.appService.setViewDesktop();
        }

        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });

        this.router.events.subscribe((event:any) => {

            //this.navigationInterceptor(event);

            // scroll to top
            if (event instanceof NavigationStart) {

                console.log("AppComponent::ngOnInit event.url =>", event.url);
                if(event.url != "/home" && event.url != "/" && event.url != "/main") {
                    this.isShowTopVideoArea = false;
                    this.isHomePage = false;
                } else {
                    this.isHomePage = true;
                }

                // 마지막 url의 스크롤 위치 저장
                if (event.url != this.lastPoppedUrl) {
                    this.yScrollStack.push(window.scrollY);
                    console.log("AppComponent::ngOnInit::NavigationStart saveScrollPos window.scrollY, this.yScrollStack =>", window.scrollY, this.yScrollStack);
                }                

            } else if (event instanceof NavigationEnd) {

                console.log("AppComponent::ngOnInit::NavigationEnd event.url, lastPoppedUrl =>", event.url, this.lastPoppedUrl);

                // this.gaService.sendPageView(event.url);

                // 결제완료 페이지 제외하고 공통스크립트 호출함
                // if (location.pathname.substr(0,16) !== '/order/complete/' && isUriError == false) {
                //     this.appService.callNaverCommonScript();     
                //     this.appService.callKakaoPageViewScript();           
                // }                
                isUriError = false;

                // 프로그램 섹션의 경우 메뉴 클릭마다 scroll top 으로 이동 하는 것 막기
                // if (event.urlAfterRedirects.substr(0, 15) == "/goods/program/" ||
                //     event.urlAfterRedirects.substr(0, 20) == "/goods/brand/section") {

                //     console.log('AppComponent::ngOnInit::NavigationEnd::brand isMobile =>', 
                //         this.appService.isMobile());
                // } else 
                
                if (event.urlAfterRedirects == this.lastPoppedUrl) {
                    // 이동한 위치가 이전에 위치 / back이면
                    this.lastPoppedUrl = undefined;
                    let y = this.yScrollStack.pop();
                    console.log("AppComponent::ngOnInit::NavigationEnd y =>", y);
                    this.safeScrollTo(y);
                } else {
                    window.scrollTo(0, 0);
                    console.log("AppComponent::ngOnInit::NavigationEnd scrollTop");
                }

                //
                /////////////////////////////////////////////////////////////

                let queryParams = this.activateRouter.snapshot.queryParams;
                console.log('AppComponent::ngOnInit 2222222222222 queryParams =>', queryParams);
                if (queryParams.view_mode && queryParams.view_mode == 'desktop') {
                    this.appService.setViewDesktop();
                }
                if (queryParams.menu == 'true') {
                    this.isShowHamburger = true;
                }          
            }
        });
    }

    navigationInterceptor(event: RouterEvent): void {

        // if (event instanceof RouteConfigLoadStart) {
        //         console.log('navigationInterceptor-RouteConfigLoadStart');
        //         this.loading.show();
        // } else if (event instanceof RouteConfigLoadEnd) {
        //         console.log('navigationInterceptor-RouteConfigLoadEnd');
        //         this.loading.hide();
        // }

        if (event instanceof NavigationStart) {
                //console.log('navigationInterceptor-NavigationStart');
                //this.loading.start('navigationInterceptor-NavigationStart');
        }

        if (event instanceof NavigationEnd) {

                //console.log('navigationInterceptor-NavigationEnd');
                //this.loading.end('navigationInterceptor-NavigationEnd');
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
                //console.log('navigationInterceptor-NavigationCancel');
                //this.loading.end('navigationInterceptor-NavigationCancel');
        }

        if (event instanceof NavigationError) {
                //console.log('navigationInterceptor-NavigationError');
                //this.loading.end('navigationInterceptor-NavigationError');
        }
    }   

}

