import { Component, OnInit } from '@angular/core';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public sideMenu: any = [
    {
      stype    : 'bs-type-sideitem',
      id : 'id-sidemenu-00',
      title : '매출통계',
      auth: 'statistic_sales',
      show : true,
      url : 'sales/all-sales-statistics',
      items : [
        {
            title : '전체',
            auth: 'statistic_sales',
            url : 'sales/all-sales-statistics',
            selected: true,
        },
        {
            title : '카테고리별',
            auth: 'statistic_sales',
            url : 'sales/category-sales-statistics',
            selected: false
        },
        {
            title : '입점사별',
            auth: 'statistic_sales',
            url : 'sales/provider-sales-statistics',
            selected: false
        },
        {
          title : '결제수단별',
          auth: 'statistic_sales',
          url : 'sales/payment-sales-statistics',
          selected: false
        },
        {
            title : '상품별',
            auth: 'statistic_sales',
            url : 'sales/goods-sales-statistics',
            selected: false
        },
        // {
        //     title : '프로그램별',
        //     url : 'sales/program-statistics',
        //     selected: false
        // },
        
        // 작업 안되어 있음
        // {
        //     title : '결제수단별',
        //     url : 'sales/payment-statistics',
        //     selected: false
        // },
        // {
        //     title : '입점사별',
        //     url : 'sales/provider-statistics',
        //     selected: false
        // }
      ]},
      {
          stype    : 'bs-type-sideitem',
          id : 'id-sidemenu-00',
          title : '상품통계',
          auth: 'statistic_goods',
          show : true,
          url : 'list',
          items : [
          {
              title : '장바구니',
              auth: 'statistic_goods',
              url : 'goods/cart-statistics',
              selected: false
          },
          {
              title : '유입경로',
              auth: 'statistic_goods',
              url : 'goods/referer-statistics',
              selected: false
          },
          {
              title : '검색어',
              auth: 'statistic_goods',
              url : 'goods/search-statistics',
              selected: false
          }
        ] 
    },
     
      {
          stype    : 'bs-type-sideitem',
          id : 'id-sidemenu-00',
          title : '고객통계',
          auth: 'statistic_member',
          show : true,
          url : 'list',
          items : [
          {
              title : '성별',
              auth: 'statistic_member',
              url : 'member/gender-statistics',
              selected: false
          },
          {
              title : '연령별',
              auth: 'statistic_member',
              url : 'member/age-statistics',
              selected: false
          },
          {
              title : '요일별',
              auth: 'statistic_member',
              url : 'member/day-statistics',
              selected: false
          },
          {
              title : '시간별',
              auth: 'statistic_member',
              url : 'member/hourly-statistics',
              selected: false
          },
          {
            title : '유입경로',
            auth: 'statistic_member',
            url : 'member/refer-statistics',
            selected: false
          }
      ]},
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
