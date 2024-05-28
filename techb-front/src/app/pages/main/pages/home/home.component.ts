import { Component, OnInit, HostListener, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// import { BoardContentStore } from './../../store/board-content.store';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CategoryStore } from '../../store/category.store';
// import { BSAlertService } from '../../../common/ui/bs-alert/index';
// import { MainStore } from './../../store/main.store';
// import { ResponsiveState } from 'ng2-responsive';
// import { FooterStore } from './../../store/footer.store';
// import { AppService } from '../../common/service/app.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    
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

export class HomeComponent implements OnInit {


    public display_data = {
        notice: '스마트 브랜드몰 홈페이지 구축 안내 스마트 브랜드몰 홈페이지 구축 안내 스마트몰 브랜드몰',
        trend_keywords: ['망고', '토트백', '딸기', '가디건'],
        // footer_banner: [],
        service_info: {
            company_addr: '서울특별시 강서구 공항대로 227 마곡세트럴타워1차',
            company_CEO: '김태형',
            company_business_num: '104-81-25980',
            company_report_num: '중구02802호',
            company_service_email: 'help@crefe.co.kr',
            company_copyright: 'Copyright@CREFE.ALL Rights Reserved'
        }
    }

    constructor(
        // protected alert: BSAlertService,
        // public appService: AppService,
        ) {

        // chart option
        // this.options = {
        //     title : { text : 'simple chart' },
        //     series: [{
        //         data: [29.9, 71.5, 106.4, 129.2],
        //     }]
        // };
        //this.device = this.appService.getDevice();
        //console.log("moooobileeeee!!!!!!!!!!!!!!!! == ",this.device);
    }

    ngOnInit() {
        console.log('HomeComponent::ngOnInit');
        
    }
}
