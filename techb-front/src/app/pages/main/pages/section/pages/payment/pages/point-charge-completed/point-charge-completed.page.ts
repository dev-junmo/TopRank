import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
// import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { environment } from '../../../../../../../../../environments/environment';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert';


@Component({
    selector: 'point-charge-completed',
    templateUrl: './point-charge-completed.page.html',
    styleUrls: ['./point-charge-completed.page.css']
})
export class PointChargeCompletedPageComponent implements OnInit {

    public bulkPurchase: boolean = false;
    public expiredDate;
    public queryParams;

    constructor(
        private router :Router,
        // private footerStore: FooterStore,
        private activatedRoute: ActivatedRoute,
        private alert: BSAlertService,
        public appService: AppService,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        ) {
        }

    ngOnInit() {
        this.queryParams = this.activatedRoute.snapshot.queryParams;

        this.expiredDate = moment(this.queryParams.expiredDate).format('MM/DD(ddd)');

        console.log('Point Charge ::ngOnInit queryParams =>', this.queryParams); 
        
        
        // if(this.queryParams.account_seq == 1) {
        //     this.account.banks[0]
        // }
    }
    // mobile copy 복사
    copyToBankAccount(el, code) {
        console.log('copyToBankAccount code => ', code);
        if (!code) { return; }
        this.appService.copyToClipboard(el, code);
    }} 

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


