import { NgModule, Injectable, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';  
//import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder  } from '@angular/forms';

//import { Api2 } from '../../common-ui/account/providers/api2';
import { AccountRoutingModule } from './account.routing';
import { BOAuthService } from '../providers/service/bo-auth.service';

import { HttpModule } from '@angular/http';
import { BOCommonModule } from '@app/common/bo-common.module';



import { AccountComponent } from './account.component';
import { LoginComponent } from './pages/auth/login.component';
import { NoAuthComponent } from './pages/noauth/noauth.component';


@NgModule({
  imports: [
    CommonModule,
    //BrowserModule,

    FormsModule,
    BOCommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    HttpModule,

  ],
  providers: [/*Api2,*/ BOAuthService],
  declarations: [AccountComponent, LoginComponent, NoAuthComponent],
})
export class AccountModule { }


/*

  declarations : 해당 모듈에서 쓰는 컴포넌트
  imports : 해당 모듈에서 사용하는 모듈들.
  exports : 이 모듈을  쓰는 쪽에서 사용한 컴포넌트를 정의함, 어차피 모듈을 임포트하면 이 곳에 정의할 필요 없음
  providor : 이 모듈에서 사용할 프로바이더

*/
