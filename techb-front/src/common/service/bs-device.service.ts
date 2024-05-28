import { Injectable, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class BSDeviceService {

    public device;

    constructor(
        private deviceService: DeviceDetectorService) {              

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
