import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../../environments/environment';


@Component({
    selector: 'purchase-keyword-completed',
    templateUrl: './purchase-keyword-completed.page.html',
    styleUrls: ['./purchase-keyword-completed.page.css']
})
export class PurchaseKeywordCompletedPageComponent implements OnInit {
    
    public queryParams;
    public bulkPurchase: boolean = false;

    constructor(
        private router :Router,
        private activatedRoute: ActivatedRoute,
        private appService: AppService,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        ) {
        }

    ngOnInit() {
        this.queryParams = this.activatedRoute.snapshot.queryParams;
        console.log('purchase-keyword-completed::Init queryparams =>', this.queryParams);
        
        if(this.queryParams.productCount > 1) {
            this.bulkPurchase = true;
        }
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
