import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';

// import { BSAlertService } from '../../../common/ui/bs-alert/index';
// import { AppService } from '../../common/service/app.service';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {
    
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

        //this.device = this.appService.getDevice();
        //console.log("moooobileeeee!!!!!!!!!!!!!!!! == ",this.device);
    }

    ngOnInit() {
        console.log('MainComponent::ngOnInit');
        
    }

    
}
