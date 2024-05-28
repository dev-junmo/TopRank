import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../../../../common/service/app.service';
import { AuthService } from '../../../../../service/auth.service';
import { environment } from '../../../../../../environments/environment';
import { Router } from '@angular/router';


@Component({
    selector: 'tb-goods-infobox-view',
    templateUrl: './tb-goods-infobox.view.html',
    styleUrls: ['./tb-goods-infobox.view.css']
})
export class TBGoodsInfoboxView implements OnInit {
    @Input () data;
    @Input () keyword = '';
    @Input () index;
    @Input () isShowTrackingBtn = false;
    @Input () alignTackingBtn = 'right';
    

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
        console.log('TBGoodsInfoboxView::ngOnInit tb-goods-infobox data =>', this.data);
    }

    //event 
    onClickGoodsInfoBox() {
        if(this.data.is_subscribe == 'N') {
            return;
        } else if( this.data.is_subscribe == 'Y') {
            this.router.navigate(['/main/section/ranking-tracking-detail/'+ this.data.goods_seq], {queryParams: {keyword: this.keyword}});
        }
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
