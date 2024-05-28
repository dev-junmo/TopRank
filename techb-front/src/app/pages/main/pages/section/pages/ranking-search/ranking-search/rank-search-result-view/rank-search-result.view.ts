import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../../environments/environment';
import { Router } from '@angular/router';


@Component({
    selector: 'rank-search-result-view',
    templateUrl: './rank-search-result.view.html',
    styleUrls: ['./rank-search-result.view.css']
})
export class RankSearchResultView implements OnInit {

    @Input () keyword; // 검색한 키워드
    @Input () searchResult;
    @Input () searchHistory;
    @Input () popularKeyword;

    @Input () set searchType(value) {
        this._searchType = value;
        switch(this._searchType) {
            case 'store': {
                this.searchTypeName = '스토어명';
                break;
            }
            case 'url': {
                this.searchTypeName = '상품 주소';
                break;
            }
            case 'goods': {
                this.searchTypeName = '상품명';
                break;
            }
        }
    };

    @Output () clickKeyword = new EventEmitter();
    @Output () clickDelete = new EventEmitter();

    private _searchType;

    public isExistsHistory: boolean = false;
    public searchTypeName = '';

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        private appService: AppService,
        private auth: AuthService,
        ) {
    }

    ngOnInit() {
        
    }

    onClickHistoryKeyword(event) {
        console.log('onClickHistoryKeyword event =>', event);
        this.clickKeyword.emit(event);
    }

    onClickDeleteHistoryKeyword(event) {
        console.log('onClickHistoryKeyword event =>', event);
        this.clickDelete.emit(event);
    }
    // load() {
    //     this.footerStore.load().subscribe(resp => {
    //         this.data = resp;
    //         console.log("footer load1 ===== ");
    //     })
    // }

    // onClickTop(){
    //     // document.body.scrollTop = document.documentElement.scrollTop = 0;
    //     //window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    //     window.scrollTo(0,0);
    // }

    // onClickNoticeMenuItem() {
    //     this.router.navigate(['/board/notice/list']);
    // }


    // onClickMain(){
    //     this.router.navigate(['/home']);
    //     setTimeout(() => {
    //         window.scrollTo(0,0);
    //     }, 10);
    // }

    // onClickMyQNA() {
    //     let url = this.appService.frontAppURL + '/mypage/activity/my-qna';
    //     this.auth.gotoPageAfterLoggedIn(url);
    // }

}
