import { Injectable, EventEmitter } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, NavigationStart } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BSScriptLoaderService } from '../../../common/service/bs-script-loader.service';

var PAN_URL = '/dist/pan';
var PAN_URL2 = '/dist/pan/';

const TEST_ENV = {
    NONE: 0,
    MOBILE: 1,
    PC:2,
};

declare var mall: any;
declare var webkit: any;

@Injectable()
export class AppService {

    public onInfinityScrolled:  EventEmitter<any> = new EventEmitter();
    public device;

    //ALL, FASHION, STAR GOODS, LIFE, KIDS, TECH+, CULTURE

    /*
        이 카테고리는 기본 필터 입니다.
        메인 메뉴에 노출되는 카테고리는 별도로 관리도구에서 설정합니다. (이것과 다름)

        지금은 개수는 고정이고 code만 업데이트 함
    */

    public allCategories = [];
    public categoryNames = [];
    public categoryCodes = [];

    private _inPan: boolean = false;

    ////////////////////////////////////////////////////
    // url

    public isProduct = environment.production;
    public isDevEnv = !environment.production;

    public frontAppURL = environment.frontAppURL;
    public apiURL = environment.apiURL;
    public isProduction = environment.production;
    // public newCategoryId:string = environment.newCategoryId; // 0061 실서버, 0059 로컬
    // public bestCategoryId:string = environment.bestCategoryId;
    //public cachableApiURL:string = environment.cachableApiURL;
    public isShowMenuPopup: boolean = false;

    //////////////////////////////////////////////////
    // cache 
    
    // 상품리스트 
    private _goodsList = [];
    private _goodsPageNum;
    private _goodsListPageKey: string;

    // normal 
    private _cacheData = [];

    //////////////////////////////////////////////////
    //
    public testEnvEmulation = TEST_ENV.NONE; 

    constructor(
        private deviceService: DeviceDetectorService,
        public scriptLoader: BSScriptLoaderService,
        public meta: Meta,
        private router: Router) {

        this.router.events.subscribe((event:any) => {
            if (event instanceof NavigationStart) {
                console.log('AppService::constructor event =>', event);

                if (event.url == PAN_URL || event.url == PAN_URL2) {
                    this._inPan = true;
                } else {
                    this._inPan = false;
                }
            }
        });
    }

    ////////////////////////////////////////////////////
    // 운영

    isTemp() {
        // #temp
        return true;
    }

    ////////////////////////////////////////////////////
    // device

    // checkDivice() {
    //     let deviceInfo = this.deviceService.getDeviceInfo();
    //     const isMobile = this.deviceService.isMobile();
    //     const isTablet = this.deviceService.isTablet();
    //     const isDesktopDevice = this.deviceService.isDesktop();

    //     console.log('AppService::checkDivice deviceInfo, deviceInfo.os, isMobile, isTablet, isDesktopDevice =>',
    //         deviceInfo, deviceInfo.os, isMobile, isTablet, isDesktopDevice);
    // }

    //////////////////////////////////////
    // 화면 보기 모드
    //public isForceDesktopMode: boolean = false;

    // desktop 모드로 보기
    trigerViewDesktop() {
        //localStorage.setItem('techb-is-force-desktop-mode', 'Y');
        this.setViewDesktop();
        // this.router.navigate(['/']).then(() => {
        //     this.setViewDesktop();  
        //     this.router.navigate(['/main/home']).then(() => {

        //     }
        // });
        // setTimeout(() => {
        //     this.setViewDesktop();  
        // }, 1000);
        //this.router.navigate([this.router.url]);
        //localStorage.removeItem('techb-is-force-desktop-mode');
    }

    setViewDesktop() {
        if (this.isDesktopViewMode()) { return; }
        this.meta.removeTag('name="viewport"');        
        let content = 'width=1280, initial-scale=0.2,  maximum-scale=1';
        this.meta.addTag({ name: 'viewport', content: content});
    }

        

    // updateViewPort() {

    //     if (this.appService.isTablet()) {
    //         // 아이패드를 위해서 동적으로 viewport 조정
    //         let width = window.innerWidth/2;
    //         let content = 'width=' + width + ', height=device-height, initial-scale=2, user-scalable=0, minimum-scale=2, maximum-scale=2';


    //         console.log('AppComponent::ngOnInit tablet content =>', content);

    //         this.meta.removeTag('name="viewport"');
    //         this.meta.addTag({ name: 'viewport', content: content});
    //     }
    // }

    isMobileViewMode() {
        let isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
        return isMobile;
    }

    isMobile() {
        return this.deviceService.isMobile();
    }
    
    isOnlyMobile() {

        // windowWidth = window.innerWidth;
        // windowHeight = window.innerHeight;

        return window.innerWidth < 1080
        //return this.isMobileViewMode(); 
    }  

    isTablet() {
        return window.innerWidth >= 1080
        //return this.deviceService.isTablet();
    }   

    isDesktopViewMode() {
        let isDesktop = this.deviceService.isDesktop();
        return isDesktop;
    }

    getDevice() {

        if(this.isDesktopViewMode()) {
            this.device = 'pc';
        } else {
            this.device = 'mobile';
        }
        return this.device;
        // if(window.innerWidth > 767) {
        //     this.device = 'pc';
        // } else {
        //     this.device = 'mobile';
        // }
        // return this.device;
    }

    isIOS() : boolean {
        let deviceInfo = this.deviceService.getDeviceInfo();
        return (deviceInfo.os.toLowerCase() === 'ios');
    }

    isAndriod() {
        let deviceInfo = this.deviceService.getDeviceInfo();
        console.log('isAndriod deviceInfo =>', deviceInfo);
        return (deviceInfo.os.toLowerCase() === 'android');
    }

    ////////////////////////////////////////////////////
    // infinity scroll

    fireInfinityScrolled() {
        console.log('fireInfinityScrolled');
        this.onInfinityScrolled.emit({});
    }

    listenInfinityScrolled() {
        console.log('listenInfinityScrolled');
        return this.onInfinityScrolled;
    }
    ////////////////////////////////////////////////////
    onGlobalClick() {
        this.isShowMenuPopup = false;
    }    

    snsShare(sns, sbj, url: string, image = null) {
        console.log('snsShare sns, enc_sbj, url, image =>', sns, sbj, url, image);
        if(!url) { return; }

        if (url.charAt(0) !== '/') {
            url = '/' + url;
        }
        let _url = this.frontAppURL + url;

        let enc_sbj = encodeURIComponent(sbj);

        console.log('AppService::snsShare url, _url =>', url, _url, enc_sbj, sbj);

        this._snsShare(sns, sbj, enc_sbj , _url, image);
    }

    // ( sns종류 , 상품타이틀 , 상품url , 이미지파일path(카톡만해당))
    private _snsShare(sns, sbj, enc_sbj, url, image) {
        var targetUrl = url;
        url = encodeURIComponent(url);

        if(sns == 'url') {        
            //window.prompt("Ctrl+C를 눌러 클립보드로 복사하세요", window.location.href );
            window.prompt("Ctrl+C를 눌러 클립보드로 복사하세요", targetUrl);
            return;
        }
        else if(sns=='fa'){ //facebook
            targetUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url ;
        }
        else if(sns=='tw'){ //twitter
            targetUrl = 'http://twitter.com/intent/tweet?text=' + enc_sbj + '+++' + url
        }
        else if(sns=='go'){ //google
            targetUrl = 'https://plus.google.com/share?url=' + url;
        }
        else if(sns=='li'){ //line
            targetUrl = "http://line.me/R/msg/text/?" + enc_sbj + " " + url;
        }
        else if(sns=='ks'){ //kakaostroy
            targetUrl = 'https://story.kakao.com/share?url='+ url;
        }
        else if(sns == 'ka') {
            this._shareKakao(sbj, enc_sbj , targetUrl , image);
            return;
        }

        if(targetUrl) {
            this.navigateNewWindow(targetUrl)
        }
        // this._snswinUp(sns , enc_sbj , targetUrl , image);
    }

    private _shareKakao(sbj, enc_sbj, url, image) {

        if (!image) {
            image = '';
        }
        console.log('_shareKakao enc_sbj, url, image =>', sbj, enc_sbj, url, image);
        if(!(window as any).Kakao.isInitialized()) {
            (window as any).Kakao.init('6d7b3134f1842156914eac638ce4cec2');
        }
        (window as any).Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title: sbj,
            description: '#'+sbj,
            imageUrl: image,
            link: {
              mobileWebUrl: url,
              webUrl: url
            }
          }
        });
    }


    // 모바일에서 이렇게 사용하세요.
    // <input #copytoclipboardInput type="text" [value]=""/>
    // <div (click)="copyToClipboard(copytoclipboardInput)" class="sns_name copyBtn">복사</div>
                

    copyToClipboard(el, value) {
        if (this.isMobile()) {
            this._copyToClipboard(el);
        } else {
            window.prompt("Ctrl+C를 눌러 클립보드로 복사하세요", value);
        }
    }

    private _copyToClipboard(el) {
        // resolve the element
        el = (typeof el === 'string') ? document.querySelector(el) : el;

        console.log('copyToClipboard el =>', el);

        // handle iOS as a special case
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

            // save current contentEditable/readOnly status
            var editable = el.contentEditable;
            var readOnly = el.readOnly;

            // convert to editable with readonly to stop iOS keyboard opening
            el.contentEditable = true;
            el.readOnly = true;

            // create a selectable range
            var range = document.createRange();
            range.selectNodeContents(el);

            // select the range
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            el.setSelectionRange(0, 999999);

            // restore contentEditable/readOnly to original state
            el.contentEditable = editable;
            el.readOnly = readOnly;
        }
        else {
            el.select();
        }

        // execute copy command
        document.execCommand('copy');
    }

   
    //////////////////////////////////////////////
    // 링크 처리

    // 이동
    navigate(url: string) {
        console.log('AppService::navigate url =>', url);

        // 내부 URL
        if (url && url.substring(0, 4).toLowerCase() !== 'http') {
            this.router.navigateByUrl(url);
        } else {
            window.location.href = url;
        }

        return false;
    }
 
    // 새창열기
    navigateNewWindow(url) {
        console.log('AppService::navigateNewWindow url =>', url);

        // 상대좌표라면
        if (url && url.substring(0, 4).toLowerCase() !== 'http') {
            if (url.charAt(0) == '/') {
                url = this.frontAppURL + url;
            } else {
                url = this.frontAppURL + '/' + url;
            }
        }      
      
        return false;
    }

   
    
    
    ///////////////////////////////////////////////////
    // page 데이타 캐시 : back시 스크롤 위치 저장을 위해
    // 별도로 빼서 서비스로

    saveCache(key: string, data: any) {
        console.log('saveCache key, data =>', key, data);
        if (!key) { return; }
        this._cacheData[key] = data;
    }

    loadCache(key) {
        if (!key) {
            return null;
        }
        console.log('loadCache key =>', key, this._cacheData[key]);
              
        return this._cacheData[key];
    }

   
}
