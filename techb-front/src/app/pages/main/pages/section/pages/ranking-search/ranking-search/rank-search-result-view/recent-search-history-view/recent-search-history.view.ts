import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AppService } from '../../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../../../environments/environment';
import { Router } from '@angular/router';
import { KeywordStore } from '../../../../../../../../../store/keyword.store';


@Component({
    selector: 'recent-search-history-view',
    templateUrl: './recent-search-history.view.html',
    styleUrls: ['./recent-search-history.view.css']
})
export class RecentSearchHistoryView implements OnInit {

    @Input () rankSearchResult;
    @Input () searchType;
    @Input () set searchHistory(value) {
        this._searchHistory = value;
        // console.log('recent-history-keyword @Input set value, _searchHistory =>', value, this._searchHistory);
        // if(this._searchHistory && this._searchHistory.length > 0) {
        //     this.isExistsHistory = true;
        // } else {
        //     this.isExistsHistory = false;
        // }
    };

    @Output () clickKeyword = new EventEmitter();
    @Output () clickDelete = new EventEmitter();


    public _searchHistory;
    // public isExistsHistory: boolean;

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        private appService: AppService,
        private auth: AuthService,
        ) {

    }

    ngOnInit() {
        
    }

    onClickKeyword(name, keyword) {
        if (this.searchType == '스토어명') {
            this.clickKeyword.emit({store: name, keyword: keyword});
        } else if (this.searchType == '상품 주소') {
            this.clickKeyword.emit({url: name, keyword: keyword});
        } else if (this.searchType == '상품명') {
            this.clickKeyword.emit({goods: name, keyword: keyword});
        } 
    }

    onClickDelete(name, keyword) {
        this.clickDelete.emit({name: name, keyword: keyword});
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
