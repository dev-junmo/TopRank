// angular module
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// modules
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BSCommonModule } from '../common/bs-common.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { MainModule } from './pages/main/main.module';
import { AccountModule } from './pages/account/account.module';

// todo : lazy loading을 하는데 미리 import 할 필요가 있나??
//import { BoardModule } from './board/board.module';

// 자체 모듈
import { BsHeaderModule } from './layouts/bs-header/bs-header.module';
import { BSCommerceModule } from '../bricks/bs-commerce/bs-commerce.module';

import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
///////////////////////////////////////
//

import { BSAlertService } from '../common/ui/bs-alert/index';

import { AppComponent, GlobalErrorHandler } from './app.component';


// import {MarketComponent} from './pages/market/market.component';


import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

// import { MultilineEllipsisModule } from 'angular2-multiline-ellipsis';

///////////////////
// service

import { AuthService } from './service/auth.service';
import { AppService } from './common/service/app.service';

// guards
import { AuthGuard, AuthProductViewGuard, AuthPurchaseGuard } from './service/auth.guard';

//import { ServerTransferStateModule } from '@angular/platform-server';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ErrorHandler } from '@angular/core';

// stores
// import { MainStore } from '../store/main.store';
// import { FooterStore } from './store/footer.store';
// import { ProductStore } from './store/product.store';

//import { BSLoadingService } from '../../../common/core/bs-loading';

/*store*/
//import { statisticsPagination } from './unused/statistics/statistics-pagination/statistics-pagination';
//import { FileUploadStore } from '../providers/store/store.file';
// import { BsLogoComponent } from './component/bs-logo/bs-logo.component';
// import { BsTopMenuComponent } from './component/bs-top-menu/bs-top-menu.component';
// import { AccountBoxComponent } from './component/bs-account-box/bs-account-box.component';
//import { BSAccountModule } from './account/bs-account.module';
//import { BSSidemenu } from './sidemenu/sidemenu.component';
// import { BoardComponent } from './pages/board/board.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BsFilterformModule } from './bs-filterform/bs-filterform.module';
// //////////////////////////////
//import {StatisticsComponent} from './pages/statistics/statistics.component'

// export class ModalContentComponent  {
//   title: string;
//   closeBtnName: string;
//   list: any[] = [];ao

//   constructor(public bsModalRef: BsModalRef) {}

//   // ngOnInit() {
//   //   this.list.push('PROFIT!!!');
//   // }
// }
import { ResponsiveDefinition } from '../environments/environment';
import { MemberStore } from './store/member.store';


//techb 


@NgModule({
    declarations: [
        AppComponent,
        //MarketComponent,
        //IndexComponent,

        //, ModalContentComponent
        //BSSidemenu,
        //StatisticsComponent,
        //statisticsPagination,
        // BsFileformComponent,
        // BoardComponent,
    ],
    imports: [
        BSCommonModule,
        BSCommerceModule,
        AppRoutingModule,

        InfiniteScrollModule,

        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,

        NgbModule.forRoot(),
        ScrollToModule.forRoot(),
        ResponsiveModule,
        Ng4LoadingSpinnerModule.forRoot(),

        BsHeaderModule,
        MainModule,
        AccountModule,
        //
        DeviceDetectorModule.forRoot(),
    ],
    // exports: [
    //   FormsModule,
    //   HttpModule
    // ],
    providers: [
    { 
        provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
        BSAlertService,

        {
            provide: COMPOSITION_BUFFER_MODE,
            useValue: false
        },

        // service
        AuthGuard, AuthProductViewGuard, AuthPurchaseGuard,
        AppService,
        AuthService,
        {provide: ErrorHandler, useClass: GlobalErrorHandler},

        // stores
        MemberStore,
    ],
    bootstrap: [AppComponent]   /////////////////////////////////
})
export class AppModule { }
