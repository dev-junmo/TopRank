import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {

    public sideMenu;
    private _sideMenu: any = [{
        stype    : 'bs-type-sideitem',
        id : 'menu-sidemenu-00',
        title : '판매현황',
        auth: 'sale_view',
        show : true,
        url : 'list',
        items : [
        {
            title : '판매내역',
            auth: 'sale_view',
            url : 'sale/list',
            selected: true
        },
        {
            title : '보류정산',
            auth: 'sale_view',
            url : 'hold/list',
            selected: true
        },
        {
            title : 'PG검수업로드',
            auth: 'sale_view',
            url : 'pg/check',
            selected: true
        }
    ]},
    {
        stype  : 'bs-type-sideitem',
        id : 'menu-sidemenu-00',
        title : '정산현황',
        auth: 'account_view',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
        {
            title : '정산현황',
            auth: 'account_view',
            url : 'calculate/list',
            selected: true
        },
        {
            title : '정산확정 (요약)',
            auth: 'account_view',
            url : 'settlement/list',
            selected: true
        },
    ]},
    {
        stype  : 'bs-type-sideitem',
        id : 'menu-sidemenu-00',
        auth: 'account_view',
        title : '세무관리',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
        {
            title : '세금계산서 발행',
            auth: 'account_view',
            url : 'taxstatus/list',
            selected: true
        }
    ]},
    {
        stype  : 'bs-type-sideitem',
        id : 'menu-sidemenu-00',
        title : '(구)정산관리',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
        {
            title : '(구)판매현황',
            auth: 'sale_view',
            url : 'sale-old/list',
            selected: true
        },
        {
            title : '(구)정산현황',
            auth: 'account_view',
            url : 'calculate-old/list',
            selected: true
        },
    ]},

    ];

    private _sideProviderMenu: any = [
        {
        stype    : 'bs-type-sideitem',
        id : 'menu-sidemenu-00',
        title : '판매 현황',
        show : true,
        url : 'list',
        items : [
        {
            title : '판매 내역',
            url : 'sale/list',
            selected: true
        },
        {
            title : '보류 정산',
            url : 'hold/list',
            selected: true
        },
    ]},
    {
        stype  : 'bs-type-sideitem',
        id : 'menu-sidemenu-00',
        title : '정산 현황',
        //icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
        {
            title : '정산 현황',
            url : 'calculate/list',
            selected: true
        },
        {
            title : '정산 확정 (요약)',
            url : 'settlement/list',
            selected: true
        },
    ]},
    {
        stype  : 'bs-type-sideitem',
        id : 'menu-sidemenu-00',
        title : '세무 관리',
        //icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
        {
            title : '세금계산서 발행',
            url : 'taxstatus/list',
            selected: true
        }
    ]},
    {
        stype  : 'bs-type-sideitem',
        id : 'menu-sidemenu-00',
        title : '(구)정산관리',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
        {
            title : '(구)판매현황',
            url : 'sale-old/list',
            selected: true
        },
        {
            title : '(구)정산현황',
            url : 'calculate-old/list',
            selected: true
        },
        ]
    }
    ];
    
    public authData;
public boardAuthData;
    constructor(public boAuthService: BOAuthService, private appConfig: AppConfigService) {

        console.log("SetupComponent isProvider =>", this.appConfig.isProvider);
        this.authData = boAuthService.authData;
        this.boardAuthData = boAuthService.boardAuthData;
        if (this.appConfig.isProvider) {
            this.sideMenu = this._sideProviderMenu;
        } else {
            this.sideMenu = this._sideMenu;
        }
    }

    ngOnInit() {
    }

}
