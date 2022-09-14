import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account.routing';
import { NgModule } from '@angular/core';
// import { MainComponent } from './main.component';

////////////////////////////////////////////////////////////////////////////////////////////////

import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

// import { BoardContentStore } from './../../store/board-content.store';
// import { CategoryStore } from '../../store/category.store';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface , SwiperModule} from 'ngx-swiper-wrapper';
import { BSCommonModule } from '../../../common/bs-common.module';
// const SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// }
import { ResponsiveDefinition } from '../../../environments/environment';



import { LoginPageComponent } from './pages/login/login.page';
import { AccountComponent } from './account.component';
import { SignupSelectionPageComponent } from './pages/signup-selection/signup-selection.page';
import { SignupPageComponent } from './pages/signup/signup.page';
import { SignupPhonePageComponent } from './pages/signup-phone/signup-phone.page';
import { FindPwPageComponent } from './pages/find-pw/find-pw.page';

@NgModule({
    imports: [
    //SwiperModule,
    //BSCommonUIModule,
    BSCommonModule,
    CommonModule,
    ResponsiveModule,
    SwiperModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    ],

    declarations: [
    AccountComponent,
    LoginPageComponent,
    SignupSelectionPageComponent,
    SignupPageComponent,
    SignupPhonePageComponent,
    FindPwPageComponent,

    /////////////////////////////////////////////////

    ],
    providers: [
    { provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
    // AuthService,
    ],
    exports : [
    
    ]   
})
export class AccountModule { }
