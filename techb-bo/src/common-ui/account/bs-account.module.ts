// import { NgModule, Injectable, forwardRef } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

// import { BSLoginComponent } from './view/bs-login/bs-login.component';
// import { BSSignupComponent } from './view/bs-signup/bs-signup.component';
// import { BSAccountComponent } from './bs-account.component';

// import { BSAccountRoutingModule } from './bs-account.routing';
// import { Api2 } from './providers/api2';
// import { AuthService } from './providers/service/auth.service';
// // import { SidemenuComponent } from './sidemenu/sidemenu.component';

// @NgModule({
//   imports: [
//     BSAccountRoutingModule,
//     FormsModule,
//     HttpModule
//   ],
//   providers: [Api2, AuthService],
//   declarations: [BSAccountComponent, BSLoginComponent, BSSignupComponent],
//   exports: [BSAccountComponent, BSLoginComponent, BSSignupComponent]
// })
// export class BSAccountModule { }


/*

  declarations : 해당 모듈에서 쓰는 컴포넌트 
  imports : 해당 모듈에서 사용하는 모듈들.
  exports : 이 모듈을  쓰는 쪽에서 사용한 컴포넌트를 정의함, 어차피 모듈을 임포트하면 이 곳에 정의할 필요 없음
  providor : 이 모듈에서 사용할 프로바이더 

*/