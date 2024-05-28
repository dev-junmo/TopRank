// import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { Router } from '@angular/router';

// import { QuickMenuStore } from './../../store/quick-menu.store';
// import { PurchaseStore } from './../../store/purchase.store';
// import { BSAuthService } from '../../common/service/bs-auth.service';
// import { BSAlertService } from '../../../common/ui/bs-alert/index';
// import { SwiperComponent, SwiperDirective, SwiperConfigInterface} from 'ngx-swiper-wrapper';

// import { DatePipe } from '@angular/common';
// import { repeat } from 'rxjs/operators';

// @Component({
//   selector: 'bs-quick-menu',
//   templateUrl: './bs-quick-menu.component.html',
//   styleUrls: ['./bs-quick-menu.component.css']
// })
// export class BsQuickMenuComponent {

//     @ViewChildren('regularShopSwipers') regularShopSwipers: QueryList<SwiperComponent>;

//     public isHistory = true;
//     public isRegularShop = true;
//     public isShowText = false;

//     private recentlist;
//     private listKey;
//     private recentData;

//     private likeBrandData;
//     private likeList;
//     private liketotal = 0;
    
//     constructor(public quickMenuStore: QuickMenuStore,
//         private datePipe: DatePipe,
//         public purchaseStore: PurchaseStore,
//         private router: Router,
//         private auth : BSAuthService,
//         protected alert: BSAlertService,) { 

//     }

//     public brandGoodsSwiperConfig:SwiperConfigInterface = {
//         slidesPerView: 2,
//     }

//     ngOnInit() {
        
//         this.getRecent();
//         this.getLikeBrand();        

//         this.quickMenuStore.listenChangeData().subscribe(()=>{
//             this.getRecent();
//         });
//     }


//     //최근본상품 리스트 가져오기
//     getRecent(){

//         this.recentlist = [];
//         this.listKey = [];
//         this.quickMenuStore.get().subscribe(resp=>{
//             this.recentData = resp;
//             for(let item of resp.list) {

//                 let today =this.datePipe.transform(new Date,"yyyy.MM.dd");;
//                 let date = this.datePipe.transform(item.update_date,"yyyy.MM.dd");

//                 console.log("datePipe today == " , today,date);
//                 if(today == date) {
//                     date = 'TODAY'
//                 }

//                 // console.log("datePipe today == " , today,date);

//                 if(!this.recentlist[date]){
//                     this.recentlist[date] = [];
//                 }
//                 this.recentlist[date].push(item);
//             }
//                 // console.log("update_dateupdate_date == ", this.list);
//             this.listKey = Object.keys(this.recentlist);
//             console.log(this.listKey);
//         })
//     }

//     //브랜드샵리스트 가져오기
//     getLikeBrand() {
        
//         console.log('getLikeBrand auth.isLogined() =>', this.auth.isLogined());
        
//         if (this.auth.isLogined()) {        
//             this.purchaseStore.favoriteList().subscribe(resp => {
//                 this.likeBrandData = resp;
//                 this.liketotal = resp.total;
//             })
//         }
//     }
//     //최근본상품 삭제버튼 눌렀을때
//     onClickDelete(seq){
//         this.quickMenuStore.delete(seq).subscribe(resp => {
//             this.alert.show("최근 본 상품이 삭제되었습니다.");
//             this.getRecent();
//             // console.log(resp);
//         })
//     }

//     //최근본상품 열렸을때
//     isHistoryBox(){
//         this.isHistory = !this.isHistory;

//         if(this.isHistory == false){
//             this.isRegularShop = true;
//             this.getRecent();
//         }
//         this.onclickQuick();
//     }
    
//     //최근본상품 닫기버튼 눌렸을때
//     HistoryBoxClose(){
//         this.isHistory = !this.isHistory;
//         this.onclickQuick();
//     }

//     //브랜드샵 열렸을때
//     isRegularShopBox() {
//         this.isRegularShop = !this.isRegularShop;

//         // show
//         if (!this.isRegularShop) {

//             this.updateAllSwiper();
//         }

//         if(this.isRegularShop == false){
//             this.isHistory = true;
//         }
//         this.onclickQuick();
//     }
//     //브랜드샵 닫기버튼 눌렀을때
//     RegularShopBoxClose(){
//         this.isRegularShop = !this.isRegularShop;
//         this.onclickQuick();
//     }

//     //top버튼 눌렀을때
//     onClickTop(){
//         //window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
//         window.scrollTo(0,0);
//     }

//     onclickQuick(){

//         if(this.isHistory == false || this.isRegularShop == false)
//             this.isShowText = true;
//         else this.isShowText = false;

//         console.log(this.isShowText);
//     }

//     //상품클릭시 이동
//     onClickGoods(seq?){
//         this.isHistory = true;
//         this.isRegularShop = true;
//         this.isShowText = false;
//         if(seq){
//             this.router.navigate(['goods/view/'+ seq]);
//         }
//     }
    
//     // 퀴메뉴 로그인버튼 클릭시
//     onClickLoginBtn() {
//         this.auth.login();
//     }

//     updateAllSwiper() {
//         // update swiper
//         this.regularShopSwipers.forEach((swiper) => {
//             swiper.update();
//             console.log("swipers =>", swiper);
//         });
//     }


// }
