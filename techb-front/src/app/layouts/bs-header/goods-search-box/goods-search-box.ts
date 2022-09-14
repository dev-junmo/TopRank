// import { Component, OnInit ,Output, EventEmitter, ViewEncapsulation} from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { SearchStore } from '../../../store/search.store';       ///////////////////// !! 외부 참조
// import { Router } from '@angular/router';
// import { AppService } from '../../../common/service/app.service';
// import { BSAuthService } from '../../../common/service/bs-auth.service';
// import { BSAlertService } from '../../../../common/ui/bs-alert/index';

// @Component({
//     selector: 'goods-search-box2',
//     templateUrl: './goods-search-box.html',
//     styleUrls: ['./goods-search-box.css'],
// })
// export class GoodsSearchBoxComponent2 implements OnInit {

//     @Output() closeSearchBox = new EventEmitter();

//     public showSearchPopup: boolean = false;

//     public showPopularPopup: boolean = false;
//     public showPopular:boolean = true;
//     public showLatest:boolean = false;
    
//     public showWord:boolean = false;
//     public showXBtn:boolean = false;
//     public searchText :any;
//     public popularList: any = [{},{},{},{},{},{},{},{},{},{}];
//     public recentList: any = [{},{},{},{},{},{},{},{},{},{}];
//     public autoList: any;

//     public keyword: string = '';

//     public key;

//     public isDisplayRecommend: boolean = false;

//     constructor(private searchStore: SearchStore, 
//         public auth: BSAuthService,
//         public appService: AppService,
//         protected alert: BSAlertService,
//         private router: Router) { 

//     }

//     ngOnInit() {        
//         this.getPopularWord();
//         this.getRecentWord();
//     }

//     onFocus(event, isFocus) {
//         setTimeout(() => {
//             this.showSearchPopup = isFocus;
//             this.showPopularPopup = isFocus;
//         },1);
//     }

//     onClickTab() {
//         setTimeout(() => {
//             this.showSearchPopup = true;
//             this.showPopularPopup = true;
//         },2);
//         this.showPopular = !this.showPopular;
//         this.showLatest = !this.showLatest;
//         if(this.showPopular == true){
//             this.getPopularWord();
//         }
//         if(this.showLatest == true){
//             this.getRecentWord();
//         }
//     }

//     onClickClean(){
//         // this.onSearchChange('')
//         this.keyword = '';
//         this.onSearchChange(this.keyword);
//         // this.onKeyup();
//     }

   

//     onSearchChange(keyword : string ) {
//         this.searchText = keyword;
//         console.log(keyword);
//         // console.log("searchsearchsearchsearch",this.search['ElementRef'].nativeElement.value);
//         if (keyword == "" || /[ㄱ-ㅎㅏ-ㅣㆍ]/.test(keyword)) {
//             this.showWord = false;
//             this.showXBtn = false;
//             this.showPopular = true;
//             this.showLatest = false;
//             return;
//         } else {
//             this.showWord = true;
//             this.showXBtn = true;
//             this.showPopular = false;
//             this.showLatest = false;
//             this.searchStore.autoComplete(keyword).subscribe(resp => {
//                 console.log(resp);
//                 this.autoList = resp.list;
//             })
//         }
//     }

//     clickClose(event?){
//         if(event){
//             console.log(event.clientY)
//             if(event.clientY > 573){
//                 this.closeSearchBox.emit(false);
//             } else {
//                 return;
//             }
//         } else {
//             this.closeSearchBox.emit(false);
//         }
//     }
    

//     // onClickSearch(text, type) {
//     //     if(text){
//     //         console.log(text);
//     //         this.searchText = text;
//     //     }
//     //     if(!this.searchText){
//     //         this.alert.show("검색어를입력하세요.");
//     //         return ;
//     //     }
//     //     this.router.navigated = false;
//     //     this.router.navigate(['goods/search'], { queryParams: { keyword: this.searchText , type:type}} );
//     //     this.closeSearchBox.emit(false);
//     // }
//     onClickWord(text, type) {
//         if(text){
//             console.log(text);
//             this.searchText = text;
//         }
//         if(!this.searchText){
//             //this.alert.show("검색어를입력하세요.");
//             return ;
//         }
//         this.router.navigated = false;
//         this.router.navigate(['goods/search'], { queryParams: { keyword: this.searchText,type:type||0}} );
//         this.closeSearchBox.emit(false);
//     }
    
//     // 현재 검색중인 키워드창, 클릭 시 target에서 키워드를 추출한다.
//     onClickKeyword(event) {
//         console.log("onClickKeyowrd event = ", event);
//         if (event.target.innerText) {
//             this.onClickWord(event.target.innerText, 0);
//         }
//     }

//     getPopularWord() {

//         this.searchStore.popularWord().subscribe(resp => {
//             //console.log("getPopularWord=", resp);
//             //this.popularList = resp.list;
//             this.popularList = [];
//             for(let item of resp.list) {
//                 if (item.keyword != "undefined")
//                     this.popularList.push(item);
//             }

//             if (this.popularList[0].page == 'recommend') {
//                 this.isDisplayRecommend = true;
//             }
//             console.log("getPopularWord popularList =>" , this.popularList);
//         });
//     }

//     getRecentWord() {
//         if(this.auth.isLogined() == true){
//             return this.searchStore.recentWord().subscribe(resp => {

//                 this.recentList = [];

//                 // 예전에 검수에 있어서 가져온것인데 빼기로 함
//                 //this.searchText = resp.list[0].keyword;
//                 if(resp.list) {
//                     this.showLatest = true;
//                     this.showPopular = false;
//                     for(let item of resp.list) {
//                         if (item.keyword != "undefined")
//                             this.recentList.push(item);
//                     }
//                 }
//                 console.log("최근검색어" , this.recentList);
//             });
//         } 
//     }

//     onClickClosePopup() {
//         this.searchText = '';
//         this.showSearchPopup = false;
//     }

//     // 최근검색어 삭제
//     onClickRecentSearchWord(seq) {
//         this.searchStore.deleteRecentWord(seq).subscribe(resp => {
//             this.getRecentWord();
//         })
//     }
    
//     // 최근검색어 선택삭제
//     onClickAllRecentSearch() {
//         this.alert.confirm("최근 검색어를 모두 삭제하시겠습니까?").subscribe((result) => {
//             this.searchStore.deleteAllRecentWord().subscribe(resp => {
//                 this.getRecentWord();
//             })
//         });
//     }
// }
