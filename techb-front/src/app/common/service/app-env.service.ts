import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';

var PAN_URL = '/dist/pan';
var PAN_URL2 = '/dist/pan/';

const TEST_ENV = {
    NONE: 0,
    MOBILE: 1,
    PC:2,
};

@Injectable()
export class AppEnvService {

    private _inPan: boolean = false;
    public device;

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
    
    public testEnvEmulation = TEST_ENV.NONE; ////TEST_ENV.TVING_IOS_NEW; // TEST_ENV.MOBILE
        
    constructor(private deviceService: DeviceDetectorService) {              
     
    }      

    ////////////////////////////////////////////////////
    // 운영 

    isTemp() {
        // #temp
        return true;
    }

  
    //////////////////////////////////////
    // 화면 보기 모드

    isMobileViewMode() {
        let isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
        return isMobile;      
    }    

    isMobile() {
        return this.isMobileViewMode(); //this.getDevice() == 'mobile';
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
    }


    /////////////////////////////////////

    isTablet() {
        return this.deviceService.isTablet();
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
}
