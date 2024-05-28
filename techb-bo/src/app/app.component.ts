import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { Router, Event as RouterEvent , NavigationStart , NavigationEnd , NavigationCancel , NavigationError } from '@angular/router';

import { BSLoadingService } from '@bricks/common/core/bs-loading';
import { BOAuthService } from './providers/service/bo-auth.service';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BSApi } from '@bricks/common/core/bs-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    title = 'TopRank';
    isLoading = false;
    loadingTemplete: string =
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

    constructor(
        private router: Router,
        private bsApi: BSApi,
        private auth : BOAuthService,
        private loading: BSLoadingService,
        private appConfig: AppConfigService) {

        this.router.events.subscribe((event: RouterEvent) => {

            // provider
            if (event instanceof NavigationStart) {
                console.log("NavigationStart::event = ", event);
                this.setConfigProviderMode(event.url);
            }
            if (event instanceof NavigationEnd) {
                console.log("NavigationEnd::event = ", event);
                this.setConfigProviderMode(event.urlAfterRedirects);
            }
        });

    }

    setConfigProviderMode(url) {
        this.appConfig.setConfigProviderMode(url);

        if (this.appConfig.isProvider) {
            BSApi.setReplaceFirstCommand('admin', 'provider');
        } else {
            BSApi.resetReplaceFirstCommand();
        }

        this.auth.updateSession(this.appConfig.isProvider).subscribe(resp => { });
    }

    ngAfterViewInit() {

        //this.sub = this.activateRouter.root.subscribe(params => {
        //    console.log("ngAfterViewInit::activateRouter  =>", this.activateRouter);
        //});



        //this.auth.updateSession().subscribe(resp => { });
        // this.router.events
        //     .subscribe((event) => {
        //         if(event instanceof NavigationStart) {
        //             this.loading = true;
        //         }
        //         else if (
        //             event instanceof NavigationEnd ||
        //             event instanceof NavigationCancel
        //             ) {
        //             this.loading = false;
        //         }
        //     });
    }

//   navigationInterceptor(event: RouterEvent): void {

//     if (event instanceof NavigationStart) {
//       console.log('navigationInterceptor-NavigationStart');
//       this.loading.show();
//       // for(let i = 0; i<10;i++) {
//       //   setTimeout(()=>{
//       //     this.loading.show();
//       //     console.log('navigationInterceptor-NavigationStart');
//       //   }, 100*i);
//       // }

//       // setTimeout(()=>{
//       //   this.loading.hide();
//       //   console.log('navigationInterceptor-NavigationStart');
//       // }, 15000);
//     }

//     // if (event instanceof RouteConfigLoadStart) {
//     //   console.log('navigationInterceptor-NavigationEnd');
//     //   this.loading.hide();
//     // }

//     if (event instanceof NavigationEnd) {
//       console.log('navigationInterceptor-NavigationEnd');
//       this.loading.nextSession();
//       this.loading.hide();
//     }

//     // Set loading state to false in both of the below events to hide the spinner in case a request fails
//     if (event instanceof NavigationCancel) {
//       console.log('navigationInterceptor-NavigationCancel');
//       this.loading.hide();
//     }

//     if (event instanceof NavigationError) {
//       console.log('navigationInterceptor-NavigationError');
//       this.loading.hide();
//     }
//   }
}
