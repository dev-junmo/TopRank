import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

import { BoardContentStore } from './../../store/board-content.store';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryStore } from '../../store/category.store';
import { BSAlertService } from '../../../common/ui/bs-alert/index';
import { ResponsiveState } from 'ng2-responsive';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../common/service/app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: .7})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(300 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(300, style({opacity: 0})))
    ])
  ]
})
export class MainComponent implements OnInit {

    public data = [];
    //public lists = [];
    ///////////////////////////////////////////////////////////////////////////
    private notice : any;
    private footer;
    //public tvingCookie = {peragreeAgree: false, marketingAgree: false, legalAgree: false};

    // public display = [
    //     {show_status:'show'}, {show_status:'show'}, {show_status:'show'}, {show_status:'show'}, {show_status:'show'},
    //     {show_status:'show'}, {show_status:'show'}, {show_status:'show'}, {show_status:'show'}, {show_status:'show'}
    // ];

    public isDisplay = [];

    // 여기도 맵형식으로 바꿔야 함!
    private mainBannerItem;
    private eventBannerItem;
    private mainNewItem;
    //private mainNewItemOld;
    private mainBestItem;

    private mainBrandItem;
    private mainBrandBannerItem;

    private mainStarGoodsItem;
    private mainStarAuctionItem;
    private mainThatGoodsItem;
    private mainReviewItem;
    private exhibitionBanner;
    private thatGoodsItem;
    private starGoodsItem;

    private mainPopupItem;

    private data_old;

    private device = 'mobile';

    private isScrollTop: boolean =  (window.scrollY == 0);
    public isShowNow: boolean = false; 


    // lastScrcollPos: number;
    // scrollDir;
    // autoScrolling: boolean;
    // private _scrollToService: ScrollToService;
    // @HostListener('window:scroll', ['$event']) onWindowScroll($event) {
    //     let height: number = window.innerHeight;
    //     let currY: number = window.pageYOffset;
       
    //     if (this.lastScrcollPos != 0) {
    //         this.scrollDir = currY - this.lastScrcollPos;
    //     }
    //     console.log("onWindowScroll scrollDir, currY, height, autoScrolling =>", this.scrollDir, currY, height, this.autoScrolling);
    //     this.lastScrcollPos = currY;

    //     if(this.scrollDir > 20 && this.autoScrolling == false && currY < height) {
    //         this.lastScrcollPos = 0;
    //         setTimeout(()=> {
    //             this.triggerScrollTo();
    //         }, 100);
    //     }    
    // }   

    // triggerScrollTo() {
    //     this.autoScrolling = true;
    //     setTimeout(()=>{
    //             this.autoScrolling = false;
    //             console.log( "timeout - this.autoScrolling = false;");
    //     }, 1000);

    //     console.log( "this.autoScrolling = true;");
    //     const config: ScrollToConfigOptions = {
    //             target: 'header',
    //         };

    //     this._scrollToService.scrollTo(config).subscribe(pos => {

    //         let height: number = window.innerHeight;
    //         console.log("autoscrolling ", pos, height);
    //         if (pos >= height) {
    //             setTimeout(()=>{
    //                     this.autoScrolling = false;
    //                     console.log("this.autoScrolling = false;", pos, height);
    //             }, 100);
    //         }
    //     });
    // }
   

    // @HostListener('window:scroll', ['$event'])
    // onWindowScroll($event) {
    //     //console.log('onWindowScroll $event =>', window.scrollY);
    //     this.isScrollTop = window.scrollY == 0;
    // }

    constructor(private boardContentStore : BoardContentStore,
        private categoryStore : CategoryStore,
        private auth: AuthService,
        protected alert: BSAlertService,
        private router: Router,
        private thestate: ResponsiveState,
        public appService: AppService,
        // private footerStore: FooterStore
        ) {

        this.device = this.appService.getDevice();
        //console.log("moooobileeeee!!!!!!!!!!!!!!!! == ",this.device);
    }

    ngOnInit() {
        console.log('MainComponent::ngOnInit');
        this.loadMainData();
    }

    loadMainData(resp = null) {
        console.log('loadMainData device =>', this.device);
        this.isShowNow = false;
        this.auth.getSessionDataSafe().subscribe(resp => {
            let groupSeq = null;
            if (resp && resp.userGroupSeq) {
                groupSeq = resp.userGroupSeq;
            }
            this.getMainItem(groupSeq);

            // 티빙 약관 동의 팝업
            // if(resp) {
            //     // this.tvingCookie = {
            //     //     peragreeAgree: (resp.PERAGREE_CONFIRM_YN == 'Y')? true: false, 
            //     //     marketingAgree: (resp.MARKETING_CONFIRM_YN == 'Y')? true: false, 
            //     //     legalAgree: (resp.LEGAL_CONFIRM_YN == 'Y')? true: false
            //     // };           

            //     // #temp testcode
            //     // this.tvingCookie = {
            //     //     legalAgree: true,
            //     //     peragreeAgree: true,
            //     //     marketingAgree: false
            //     // };
            // } 
            //console.log('loadMainData getSessionDataSafe tvingCookie =>', this.tvingCookie);
        });
        
        // pc에서만 사용함 
        if (this.device != "mobile") {
            this.getBottomNotice();
        }        
    }   

    getMainItem(userGroupSeq) {
        // console.log("MainComponent::getMainItem userGroupSeq =>", userGroupSeq);
        // this.mainStore.getMainDisplayData(this.device, userGroupSeq).subscribe(resp=>{
        //     this.isShowNow = true;
        //     console.log("MainComponent::getMainItem::getMainDisplayData resp =>", resp);
        //     this.data = resp;
        //     for(let item of resp) {
        //         this.data[item.code] = item;
        //         //this.lists[item.code] = item.value.list;
        //     }
        //     console.log("MainComponent::getMainItem::getMainDisplayData data =>", this.data);
        // })
    }

    // getMainDisplay() {
    //     this.categoryStore.getMainDisplay().subscribe((resp=>{
    //     console.log('MainComponent::getMainDisplay resp =>', resp);
    //     this.display = resp.list;
    //     }))
    // }

    getBottomNotice() {
        this.boardContentStore.getLatestItem('notice').subscribe(resp=>{
        console.log(resp);

        this.notice = resp.list[0];        // contents display

        });

        // this.footerStore.load().subscribe(resp => {
        //     this.footer = resp;
        //     console.log("footer load2 ===== ");
        // })
    }

    onClickMyQNA() {
        // this.auth.gotoPageAfterLoggedIn('/mypage/activity/my-qna');
    }

    onEdit(){
        window.scrollTo(0,0);

      }
}
