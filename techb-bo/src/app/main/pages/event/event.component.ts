import { Component, OnInit } from '@angular/core';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

    public sideMenu: any = [
    // {
    //   stype  : 'bs-type-sideitem',
    //   id : 'coupon-sidemenu-01',
    //   title : '이벤트 관리',
    //   show : true,
    //   items : [
    //     {
    //       title : '이벤트 리스트',
    //       url : 'event/list',
    //       selected: true
    //     },
    //     {
    //       title : '이벤트 등록',
    //       url : 'event/create',
    //       selected: true
    //     },
    //   ]
    // },
    {
      stype  : 'bs-type-sideitem',
      id : 'coupon-sidemenu-02',
      title : '기획전 관리',
      show : true,
      items : [
        {
            title : '기획전 설정',
            url : 'planshop/config',
            auth: 'setting_basic_view',
            selected: true
        },
        {
          title : '기획전 리스트',
          boardAuth: 'board_view',
          boardId: 'planshop',
          url : 'planshop/list',
          selected: true
        },
        {
          title : '기본형 기획전 등록',
          boardAuth: 'board_act',
          boardId: 'planshop',
          url : 'planshop/create',
          selected: true
        },
        {
            title : '확장형 기획전 등록',
            boardAuth: 'board_act',
            boardId: 'planshop',
            url : 'planshop/create2',
            selected: true
        },
      ]
    },
    {
        stype  : 'bs-type-sideitem',
        id : 'coupon-sidemenu-03',
        title : '할인이벤트 관리',
        auth: 'event_view',
        show : true,
        items : [
        {
            title : '할인이벤트 리스트',
            auth: 'event_view',
            url : 'discount/list',
            selected: true
        },
        {
            title : '할인이벤트 등록',
            auth: 'event_act',
            url : 'discount/create',
            selected: true
        },
        // {
        //     title : '단독이벤트 등록',
        //     url : 'discount/create',
        //     selected: true
        // }

        ]
    },
    {
      stype  : 'bs-type-sideitem',
      id : 'coupon-sidemenu-03',
      title : '사은품이벤트 관리',
      auth: 'gift_view',
      show : true,
      items : [
      {
          title : '사은품이벤트 리스트',
          auth: 'gift_view',
          url : 'gift/list',
          selected: true
      },
      {
          title : '사은품이벤트 등록',
          auth: 'gift_act',
          url : 'gift/create',
          selected: true
      },
      // {
      //     title : '단독이벤트 등록',
      //     url : 'discount/create',
      //     selected: true
      // }

      ]
    },
    {
        stype  : 'bs-type-sideitem',
        id : 'coupon-sidemenu-03',
        title : '스타옥션 관리',
        auth: 'event_auction_view',
        show : true,
        items : [
        {
            title : '옥션 리스트',
            auth: 'event_auction_view',
            url : 'starauction/list',
            selected: true
        },
        {
            title : '옥션 등록',
            auth: 'event_auction_act',
            url : 'starauction/create',
            selected: true
        },

        ]
    },
    {
        stype  : 'bs-type-sideitem',
        id : 'coupon-sidemenu-06',
        title : '쿠폰 관리',
        auth: 'coupon_view',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
          {
            title : '쿠폰 리스트',
            auth: 'coupon_view',
            url : 'coupon/list',
            selected: true
          },
          {
            title : '온라인 배포용 쿠폰등록',
            auth: 'coupon_act',
            url : 'coupon/create',
            selected: true
          },
          {
            title : '인쇄 배포용 쿠폰등록',
            auth: 'coupon_act',
            url : 'coupon-print/create/print',
            selected: true
          },
        ],
      },

    // {
    //     stype  : 'bs-type-sideitem',
    //     id : 'coupon-sidemenu-06',
    //     title : '사은품 관리',
    //     // icon: 'flaticon-cogwheel',
    //     show : true,
    //     //notiCount  : 2,
    //     items : [
    //       {
    //         title : '사은품 리스트',
    //         url : 'list',
    //         selected: true
    //       },
    //       {
    //         title : '사은품이벤트 리스트',
    //         url : 'online-create',
    //         selected: true
    //       },
    //       {
    //         title : '인쇄 배포용 쿠폰등록',
    //         url : 'create',
    //         selected: true
    //       },
    //     ],
    // },
    // {
    //   stype  : 'bs-type-sideitem',
    //   id : 'coupon-sidemenu-03',
    //   title : '프로모션',
    //   show : true,
    //   items : [
    //     {
    //       title : '할인쿠폰',
    //       url : 'aaa/list',
    //       selected: true
    //     },
    //     {
    //       title : '할인 이벤트',
    //       url : 'aaaa/create',
    //       selected: true
    //     },
    //     {
    //       title : '사은품 이벤트',
    //       url : 'aaaa/create',
    //       selected: true
    //     },
    //   ]
    // },
    // {
    //   stype  : 'bs-type-sideitem',
    //   id : 'coupon-sidemenu-04',
    //   title : 'SMS 발송관리',
    //   // icon: 'flaticon-cogwheel',
    //   show : true,
    // },
    // {
    //   stype  : 'bs-type-sideitem',
    //   id : 'coupon-sidemenu-05',
    //   title : '수동 앱푸시 알림',
    //   // icon: 'flaticon-cogwheel',
    //   show : true,
    // },

    // {
    //   stype  : 'bs-type-sideitem',
    //   id : 'coupon-sidemenu-07',
    //   title : '포인트/캐쉬',
    //   // icon: 'flaticon-cogwheel',
    //   show : true,
    //   items : [
    //     {
    //       title : '티빙캐쉬 관리',
    //       url : 'list',
    //       selected: true
    //     },
    //     {
    //       title : '씨제이 원포인트 관리',
    //       url : 'list',
    //       selected: true
    //     },
    //     {
    //       title : '적립금',
    //       url : 'emoney',
    //       selected: true
    //     }
    //   ]
    // },
    // {
    //   stype  : 'bs-type-sideitem',
    //   id : 'coupon-sidemenu-07',
    //   title : '카드',
    //   // icon: 'flaticon-cogwheel',
    //   show : true,
    // }
    ];

    
    public authData;
public boardAuthData;
    constructor(public boAuthService: BOAuthService) {
          this.authData = boAuthService.authData;
        this.boardAuthData = boAuthService.boardAuthData;
    }

    ngOnInit() {
    }


}
