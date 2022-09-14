import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Directive({
  selector: '[ifMobile]'
})
export class IfMobileDirective {
    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private deviceService: DeviceDetectorService, 
        private activateRouter: ActivatedRoute,
        private meta: Meta
    ) {
        //     let deviceInfo = this.deviceService.getDeviceInfo();
        //     const isMobile = this.deviceService.isMobile();
        //     const isTablet = this.deviceService.isTablet();
        //     const isDesktopDevice = this.deviceService.isDesktop();
    }

    @Input() set ifMobile(value) {
        let isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
        console.log('IfMobileDirective::ifMobile deviceService.isMobile() =>', isMobile);
        // if(this._isForceDesktopMode()) {
        //     isMobile = false;  
        // }
        console.log('1111111111111111111111111 =>', isMobile)
        this._updateView(isMobile);
    }    

    // _isForceDesktopMode() {
    //     console.log('IfMobileDirective::ifMobile tag =>', this.meta.getTag('name=viewport').content);
    //     // let viewport = this.meta.getTag('name=viewport');
    //     // if (!viewport) {
    //     //     let content = 'width=1280, initial-scale=0.2,  maximum-scale=1';
    //     //     this.meta.addTag({ name: 'viewport', content: content});
    //     // }

    //     let content = this.meta.getTag('name=viewport').content;
        
    //     //let queryParams = this.activateRouter.snapshot.queryParams;
    //     //let isForceDesktopMode = window.localStorage.getItem('techb-is-force-desktop-mode') == 'Y';
    //     return content.indexOf('initial-scale=0.2') > 0;
    // }

    _updateView(isShow) {
        if(isShow) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}


@Directive({
    selector: '[ifOnlyMobile]'
  })
  export class IfOnlyMobileDirective {
      constructor(
          private element: ElementRef,
          private templateRef: TemplateRef<any>,
          private viewContainer: ViewContainerRef,
          private deviceService: DeviceDetectorService, 
      ) {
          //     let deviceInfo = this.deviceService.getDeviceInfo();
          //     const isMobile = this.deviceService.isMobile();
          //     const isTablet = this.deviceService.isTablet();
          //     const isDesktopDevice = this.deviceService.isDesktop();
      }
  
      @Input() set ifOnlyMobile(value) {
          let isMobile = !this.deviceService.isDesktop() && window.innerWidth < 1080;//this.deviceService.isMobile();
          console.log('IfMobileDirective::ifMobile deviceService.isMobile() =>', isMobile);
          this._updateView(isMobile);
      }    
  
      _updateView(isShow) {
          if(isShow) {
              this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
              this.viewContainer.clear();
          }
      }
  }

@Directive({
    selector: '[ifTablet]'
})
export class IfTabletDirective {
    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private deviceService: DeviceDetectorService, 
    ) { 
    
    }

    @Input() set ifTablet(value) {  
        console.log('IfTabletDirective::ifTablet deviceService.isTablet() =>', this.deviceService.isTablet());
        let isTablet = !this.deviceService.isDesktop() && window.innerWidth >= 1080; // this.deviceService.isTablet();
        this._updateView(isTablet);
    }    

    _updateView(isShow) {
        if(isShow) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

@Directive({
    selector: '[ifDesktop]'
})
export class IfDesktopDirective {
    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private deviceService: DeviceDetectorService, 
        //private activateRouter: ActivatedRoute,
        private meta: Meta
    ) { 
    
    }

    // _isForceDesktopMode() {
    //     console.log('IfMobileDirective::ifMobile tag =>', this.meta.getTag('name=viewport').content);
    //     let content = this.meta.getTag('name=viewport').content;
    //     //let queryParams = this.activateRouter.snapshot.queryParams;
    //     //let isForceDesktopMode = window.localStorage.getItem('techb-is-force-desktop-mode') == 'Y';
    //     return content.indexOf('initial-scale=0.2') > 0;
    // }


    @Input() set ifDesktop(value) {  
        //console.log('IfMobileDirective::ifDesktop deviceService.isDesktop() =>', this.deviceService.isDesktop());
        let isDesktop = this.deviceService.isDesktop();
        // if(this._isForceDesktopMode()) {
        //     isDesktop = true;  
        // }
        console.log('1111111111122222222222222222222 =>', isDesktop)

        this._updateView(isDesktop);
    }    

    _updateView(isShow) {
        if(isShow) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}