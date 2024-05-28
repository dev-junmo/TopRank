import { Component, OnInit } from '@angular/core';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../common/service/app.service'; 
import { AuthService } from '../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { GoodsStore } from '../../../../../../../store/goods.store';

@Component({
    selector: 'ranking-tracking-detail',
    templateUrl: './ranking-tracking-detail.page.html',
    styleUrls: ['./ranking-tracking-detail.page.css']
})
export class RankingTrackingDetailPageComponent implements OnInit {
    private _goodsSeq;
    public activeKeyword;
    public goodsData;
    public isMenuTabName: string = 'keyword';
    // public isMuchKeyword: boolean = false; //키워드가 여러개 일때

    // chart
    public chartDatasetsParkState = [];
    public chartDatasetsOperState = [{
        data: [0,1,0]
    }];
    public chartLablesSample = [
    ];


    constructor(
        private router :Router,
        private appService: AppService,
        private auth: AuthService,
        private activateRouter: ActivatedRoute,
        private goodsStore: GoodsStore
        ) {

    }

    ngOnInit() {
        this.activateRouter.params.subscribe(params => {
            this._goodsSeq = params['goods_seq'];
            if (params.goods_seq) {
                setTimeout(() => {
                    this.loadGoodsInfo(params.goods_seq);
                }, 500);
            }
        });
        this.activateRouter.queryParams.subscribe(params => {
            if (params['keyword'] && params['keyword'].length > 0) {
                this.activeKeyword = params['keyword'];
            }
        });
        this.activateRouter.queryParams.subscribe(params => {
            if (params['type'] && params['type'].length > 0) {
                if(params['type'] == 'review') {
                    this.isMenuTabName = 'review';
                } else if(params['type'] == 'price') {
                    this.isMenuTabName == 'price';
                }
            }
        });
    }

    loadGoodsInfo(goods_seq) {
        //this.goodsStore.search(keyword, key).subscribe(resp => {
        this.goodsStore.getWithSubscribe(goods_seq, this.activeKeyword).subscribe(resp => {
            this.goodsData = resp;
            this.updateKeywordList();
            console.log('loadGoodsInfo resp =>', this.goodsData);
        });        
    }

    onClickMenuTab(type) {
        this.isMenuTabName = type;
    }

    onClickAddKeyword() {
        this.appService.navigate('/main/section/payment/purchase-keyword/'+ this.goodsData.goods_seq);
    }

    onClickKeyword(keyword) {
        this.selectKeyword(keyword); 
    }

    selectKeyword(keyword) {
        this.activeKeyword = keyword;
        this.updateKeywordList();
    }

    updateKeywordList() {
        if (!this.goodsData.keywords || !this.activeKeyword) { return; }
        let keywords = []; 
        for(let keyword of this.goodsData.keywords) {
            if (keyword !== this.activeKeyword) {
                keywords.push(keyword);
            }
        }    
        this.goodsData.otherKeywords = keywords;
    }

    // load() {
    //     this.footerStore.load().subscribe(resp => {
    //         this.data = resp;
    //         console.log("footer load1 ===== ");
    //     })
    // }

    // onClickBrand() {
    //     this.isHidden= !this.isHidden;

    // }

    // onClickAffiliate(){
    //     this.isHidden2= !this.isHidden2;
    // }

    // onClickLinkMenuItem() {
    //     this.isHidden = true;
    //     this.isHidden2 = true;
    // }

    // onClickTop(){
    //     // document.body.scrollTop = document.documentElement.scrollTop = 0;
    //     //window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    //     window.scrollTo(0,0);
    // }

    // onClickFaqMenuItem() {
    //     this.router.navigate(['/board/faq/list']);
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
