import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public authData = null;
    public boardAuthData = null;

    public sideMenu: any = [
    
    // {
    //     stype  : 'bs-type-sideitem',
    //     id : 'coupon-sidemenu-03',
    //     title : '운영 관리',
    //     image: '/assets/img/ic_management_24.png',
    //     auth: 'event_view',
    //     show : true,
    //     items : [
    //     {
    //         title : '베터리 현황',
    //         auth: 'event_view',
    //         url : 'discount/list',
    //         selected: true
    //     },
    //     ]
    // },
    // {
    //     stype  : 'bs-type-sideitem',
    //     id : 'coupon-sidemenu-03',
    //     title : '통계 관리',
    //     image: '/assets/img/ic_statistics_24.png',
    //     auth: 'event_auction_view',
    //     show : true,
    //     items : [
    //     {
    //         title : '주차통계',
    //         auth: 'event_auction_view',
    //         url : 'starauction/list',
    //         selected: true
    //     },
    //     {
    //         title : '베터리통계',
    //         auth: 'event_auction_act',
    //         url : 'starauction/create',
    //         selected: true
    //     },    
    //     ]
    //   },
        {
            stype  : 'bs-type-sideitem',
            id : 'coupon-sidemenu-02',
            title : '기본',
            image: '/assets/img/ic_setting_white_24.png',
            show : true,
            items : [
                {
                    title : '기본 설정',
                    url : 'setup/basic',
                    selected: true,
                    auth: 'setting_manager_view',
                },
                // {
                //     title : '관리자 관리',
                //     url : 'setup/admin',
                //     selected: true,
                // },
            ]
        },
        {
            stype  : 'bs-type-sideitem',
            id : 'coupon-sidemenu-02',
            title : '프로덕트',
            image: '/assets/img/ic_parking-manage_white_24.png',
            show : true,
            items : [
            {
                title : '프로덕트 관리',                
                auth: 'gift_view',
                url : 'product/product',
                selected: true
            },
            {
                title : '판매자상품관리',                
                auth: 'gift_view',
                url : 'product/goods',
                selected: true
            },
            ]
        },
        {
            stype  : 'bs-type-sideitem',
            id : 'coupon-sidemenu-02',
            title : '주문',
            image: '/assets/img/ic_parking-manage_white_24.png',
            show : true,
            items : [
            {
                title : '주문 관리',                
                auth: 'gift_view',
                url : 'order/order',
                selected: true
            },
            ]
        },
        {
            stype  : 'bs-type-sideitem',
            id : 'coupon-sidemenu-03',
            title : '포인트',
            image: '/assets/img/ic_log_24.png',
            auth: 'gift_view',
            show : true,
            items : [
                {
                    title : '포인트 관리',
                    auth: 'gift_view',
                    url : 'point/point',
                    selected: true
                },
                {
                    title : '포인트 충전관리',
                    auth: 'gift_view',
                    url : 'point/point-charge',
                    selected: true
                },

                {
                    title : '리워드 포인트 관리',
                    auth: 'gift_view',
                    url : 'point/reward-point',
                    selected: true
                },
                {
                    title : '리워드 포인트 인출관리',
                    auth: 'gift_view',
                    url : 'point/reward-point-withdraw',
                    selected: true
                },
               
            ]
        },
        {
            stype  : 'bs-type-sideitem',
            id : 'coupon-sidemenu-03',
            title : '회원',
            image: '/assets/img/ic_log_24.png',
            auth: 'gift_view',
            show : true,
            items : [
                {
                    title : '회원 관리',
                    auth: 'gift_view',
                    url : 'member/member/list',
                    selected: true
                },
                {
                    title : '회원등급 관리',
                    auth: 'gift_view',
                    url : 'member/member-group',
                    selected: true
                },
          
            ]
        },
        {
            stype  : 'bs-type-sideitem',
            id : 'coupon-sidemenu-03',
            title : '전시',
            image: '/assets/img/ic_log_24.png',
            auth: 'gift_view',
            show : true,
            items : [
                {
                    title : '홈 전시관리',
                    auth: 'gift_view',
                    url : 'display/home',
                    selected: true
                },
            ]
        },
        {
            stype  : 'bs-type-sideitem',
            id : 'coupon-sidemenu-03',
            title : '게시판',
            image: '/assets/img/ic_log_24.png',
            auth: 'gift_view',
            show : true,
            items : [
                {
                    title : '게시판 관리',
                    auth: 'gift_view',
                    url : 'board/board',
                    selected: true
                },
            ]
        },
  ];
  constructor() { }

  ngOnInit() {
  }

  

}
