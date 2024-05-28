import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

    public sideMenu;
    private _sideMenu: any = [
    {
        stype  : 'bs-type-sideitem',
        id : 'id-sidemenu-00',
        title : '기본설정',
        show : true,
        url : 'basic',
        auth: 'setting_manager_view',
        items : [
            {
                title : '쇼핑몰 기본설정',
                url : 'basic',
                selected: true,
                auth: 'setting_manager_view',
            },
            // {
            //     title : '홈페이지설정',
            //     url : 'dashboard',
            //     selected: true
            // },
        ]
    },
    {
        stype  : 'bs-type-sideitem',
        id : 'id-sidemenu-01',
        title : '운영관리',
        show : true,
        url : 'admin',
        auth: 'setting_basic_view',
        items : [
        {
            title : '관리자관리',
            url : 'admin',
            auth: 'setting_basic_view',
            selected: false
        },
        {
            title : '인기검색어 설정',
            url : 'search',
            auth: 'setting_basic_view',
            selected: false
        },
        // {
        //     title : '점검페이지 전환',
        //     url : 'inspect',
        //     selected: false
        // },
        ]
    },
    {
        stype  : 'bs-type-sideitem',
        id : 'id-sidemenu-02',
        title : '입점사관리',
        show : true,
        url : 'provider',
        auth: 'provider_view',
        items : [
        {
            title : '입점사 리스트',
            url : 'provider/list',
            selected: false,
            auth: 'provider_view'
        },
        {
            title : '입점사 등록',
            url : 'provider/create',
            auth: 'provider_act',
            selected: false
        },
        ]
    }];

    private _sideProviderMenu: any = [
        {
            stype  : 'bs-type-sideitem',
            id : 'id-sidemenu-00',
            title : '기본정보관리',
            show : true,
            url : 'provider/update',
            items : [
            {
                title : '입점사정보',
                url : 'provider/update',
                selected: true
            },
            ]
        },
    ];

    public authData;
public boardAuthData;  
    constructor(private appConfig: AppConfigService, public boAuthService: BOAuthService) {
        this.authData = boAuthService.authData;
        this.boardAuthData = boAuthService.boardAuthData;
        //console.log("SetupComponent isProvider =>", this.appConfig.isProvider, authService.providerSeq, this._sideProviderMenu);
        if (this.appConfig.isProvider) {
            this.sideMenu = this._sideProviderMenu;
        } else {
            this.sideMenu = this._sideMenu;
        }
    }

    ngOnInit() {



    }


}
