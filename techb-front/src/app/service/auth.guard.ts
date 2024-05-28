import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from "rxjs/Rx";
import { BSAlertService } from '../../common/ui/bs-alert/index';

// stores
import { GoodsStore } from '../store/goods.store';
import { PointStore } from '../store/point.store';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(public auth: AuthService, 
        public router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
        return this.auth.hasAuthThisPage(state.url);
    }
}

// 구매페이지 
// params : 없음 // 포인트 잔액 체크해서 있으면 목표 페이지 / 없으면 충전페이지

@Injectable()
export class AuthPurchaseGuard implements CanActivate {
    constructor(public auth: AuthService, 
        public authGuard: AuthGuard,
        public pointStore: PointStore,
        protected alert: BSAlertService, 
        public router: Router) {
        
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>|boolean {
        console.log('AuthPurchaseGuard::canActivate route, state =>', route, state, this.auth.isLogined());
        if (!this.auth.isLogined()) {
            return this.authGuard.canActivate(route, state);
        }
        return new Observable<boolean>((observer) => {
            this.pointStore.getBalance().subscribe(resp => {
                if (resp.charge_point == undefined || resp.free_point == undefined) {
                    observer.next(false);
                    alert('내부오류 : 포인트 잔액을 얻을 수 없습니다.');
                    return;
                }
                let balance = parseInt(resp.charge_point) + parseInt(resp.free_point); 
                if (balance >= 70) {
                    observer.next(true);
                } else {
                    // 잔액이 없으면
                    this.alert.confirm("포인트가 부족하여 '포인트 충전페이지'로 이동합니다.", "", "확인", "취소", true).subscribe((result) => {
                        if (result == "OK") {
                            // 충전페이지로 이동
                            this.router.navigateByUrl('/main/section/payment/point-charge');    
                            observer.next(false);                        
                        } else {
                            observer.next(false);
                        }
                    });
                }
                //observer.complete(); 
            });
        });
    }
}


// 상품 관련 페이지 
@Injectable()
export class AuthProductViewGuard implements CanActivate {   
    constructor(public auth: AuthService, 
        public authGuard: AuthGuard,
        public goodsStore: GoodsStore,
        // public productStore: ProductStore,
        protected alert: BSAlertService, 
        public router: Router) {
        
    }

    // params : goods_seq, keyword
    // 구매중이면(goods_seq, keyword) -> 목표 페이지
    // 구매 페이지 
    // 충전 페이지 

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>|boolean {
        console.log('AuthProductViewGuard::canActivate route, state =>', route, state);
        // if (!this.auth.isLogined()) {
        //     return this.authGuard.canActivate(route, state);
        // }
        return new Observable<boolean>((observer) => {
            // 로그인 여부 체크해서 안되있으면 로그인 페이지로 보낸다.
            this.authGuard.canActivate(route, state).subscribe(resp => {
                if (!resp) {
                    observer.next(false);
                    return;
                }
                // params
                let goodsSeq = route.params.goods_seq;
                let memberSeq = this.auth.userSeq;
                let keyword = route.queryParams.keyword; 
                //let redirectUrl = state.url;
                console.log('AuthProductViewGuard::canActivate goodsSeq, memberSeq, keyword =>', goodsSeq, memberSeq, keyword);

                if (!goodsSeq || !memberSeq) {
                    observer.next(false);
                    return;
                }

                // 키워드가 없으면 구매로 이동함
                if (!keyword) {
                    alert('내부오류 : 프로덕트뷰 가드 : keyword없음');
                    //this.router.navigateByUrl('/main/section/payment/purchase-keyword/' + goodsSeq);    
                    observer.next(false);
                    return;
                }

                // 구독여부
                this.goodsStore.getWithSubscribe(goodsSeq, keyword).subscribe(resp => {
                    console.log('canActivate::getWithSubscribe resp =>', resp);
                    if (resp.goods_seq && resp.is_subscribe == 'Y') {
                        // 구독중이라면    
                        observer.next(true);
                    } else {
                        this.router.navigate([`/main/section/payment/purchase-keyword/${goodsSeq}`], {queryParams: {keyword: keyword}});        
                        observer.next(false);
                    }
                });
            });
        });
    }

    // _canActivate() {

    // }

    // checkPointBalance(observer, goodsSeq, keyword?, redirectUrl = '/') {
    //     this.pointStore.getBalance().subscribe(resp => {
    //         // api호출 실패면
    //         if (resp.charge_point == undefined || resp.free_point == undefined) {
    //             window.history.back();
    //             observer.next(false);
    //             observer.complete();   
    //             return;
    //         }
    //         let balance = parseInt(resp.charge_point) + parseInt(resp.free_point); 
    //         if (balance >= 70) {
    //             // 잔액이 있으면 구매페이지로 이동
    //             let url = '/main/section/payment/purchase-keyword/'+ goodsSeq;
    //             if (keyword) {
    //                 url += '/' + keyword;
    //             }
    //             this.router.navigateByUrl(url);    
    //             observer.next(false);
    //         } else {
    //             // 잔액이 없으면
    //             this.alert.confirm("포인트가 부족하여 '포인트 충전페이지'로 이동합니다.", "", "확인", "취소", true).subscribe((result) => {
    //                 if (result == "OK") {
    //                     // 충전페이지로 이동
    //                     this.router.navigateByUrl('/main/section/payment/point-charge');    
    //                     observer.next(false);                        
    //                 } else {
    //                     window.history.back();
    //                     observer.next(false);
    //                 }
    //             });
    //         }
    //         observer.complete();   
    //     });
    // }
}

