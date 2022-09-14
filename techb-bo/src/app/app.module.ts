// #todo : common-ui 없애고 통일해야 함
// module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { AccountModule } from './account/account.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BOCommonModule } from '@app/common/bo-common.module';
import { BSCommonModule } from '@bricks/common/bs-common.module';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BSLoadingService } from '@bricks/common/core/bs-loading';


// component
import { AppComponent } from './app.component';
import { ProviderComponent } from './provider.component'


// alert, confirm, modal popup
//import { BSAlertComponent, BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalComponent, BSModalService } from '@bricks/ui/bs-modal/index';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive'

//import { ModalContentComponent } from './main/pages/setup/basic/basic.component';

// service
import { BOAuthService } from './providers/service/bo-auth.service';
import { BOAuthGuard } from './providers/service/bo-auth.guard';
import { BOProviderAuthGuard } from './providers/service/bo-auth.provider.guard';

import { AppConfigService } from './providers/service/app-config.service';
import { GuidePageComponent } from './guide/guide/guide.page';

let config = {
  breakPoints: {
      xs: {max: 500},
      sm: {min: 500, max: 500},
      md: {min: 500, max: 500},
      lg: {min: 500, max: 500},
      xl: {min: 501}
  },
  debounceTime: 100 // allow to debounce checking timer
};

export function ResponsiveDefinition(){
        return new ResponsiveConfig(config);
};

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
   // MainModule,
   // MainRoutingModule,
    //CrmModule,
    HttpModule,
    ReactiveFormsModule,

    FormsModule,
    AccountModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    // BoardModule,
    BOCommonModule,
    BSCommonModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ResponsiveModule,
  ],

  declarations: [
    AppComponent,
    ProviderComponent,
    BSModalComponent, //,ModalContentComponent
    GuidePageComponent
  ],

  providers: [
    {provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
    BSModalService,
    BOAuthService, BOAuthGuard, BOProviderAuthGuard,
    BSLoadingService,
    AppConfigService
  ],
  entryComponents: [
    //BSAlertComponent, //BSModalComponent //, ModalContentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  // constructor() {
  //   ServiceLocator.injector = Injector.create(
  //     Object.keys(services).map(key => ({
  //       provide: services[key].provide,
  //       useFactory: services[key].useFactory,
  //       useClass: services[key].provide,
  //       deps: services[key].deps
  //     }))
  //   );
  // }

}

// // providers
// import { Injector } from '@angular/core';

// // Service 상속문제를 해결하기 위해 만든 코드
// export const services: {[key: string]: {
//   provide: any,
//   deps: any[],
//   useFactory?:any,
//   useClass?: any,
// }} = {
//   'FormBuilder': { provide: FormBuilder, deps: [] },
// };
