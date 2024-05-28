// import { Component,ViewChild,Output, OnInit ,EventEmitter, Input, ViewEncapsulation } from '@angular/core';
// import { AuthService } from '../../../service/auth.service';
// import { environment } from '../../../../environments/environment';

// //import { Router} from '@angular/router';
// //import { ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
// //import { BSApi } from '../../../../common/core/bs-api';
// //import { OrderStore } from './../../../store/order.store';

// @Component({
//   selector: 'bs-account-box',
//   templateUrl: './bs-account-box.component.html',
//   styleUrls: ['./bs-account-box.component.css'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class AccountBoxComponent implements OnInit {

//     public env = environment; 

//     public isCollapsed = true;
    
//     private click: boolean = false;
//     public account: boolean = false;

//     //private returnUrl;

//     @Input() cartCount: number = 0;
    
//     @Output() clickbtn = new EventEmitter();

//     constructor(public auth: BSAuthService) {
       
//     }

//     ngOnInit() {

//     }

//     //////////////////////////////////////////////////////////
//     // 로그인 / 로그아웃 

//     onClickLogin() {
//         this.auth.login();
//     }

//     onClickSignUp() {
//         this.auth.signUp();
//     }

//     onClickTestLogin() {
//         this.auth.loginForTestInDesktop();
//     }

//     onClickLogout() {
//         this.auth.logout();
//     }

//     onClickTestLogout() {
//         this.account = false;
//         this.auth.logoutForTest();
//     }

//     ///////////////////////////////////////////////////////////
//     onClickSearchBtn() {
//         this.click = !this.click;
//         this.clickbtn.emit('');
//     }

//     hoverUserBox(event){
//         console.log("AccountBoxComponent::hoverUserBox event = ",event);
//         this.account = true;
//     }

//     leaveUserBox(event){
//         if (event.clientY > 17) return;
//         this.account = false;
//         console.log("leave = ",event);
//     }

//     hoverActBox(){
//         this.account = true;
//     }

//     leaveActBox(){
//         this.account = false;
//     }
// }
