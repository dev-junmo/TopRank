import { Component, OnInit } from '@angular/core';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {


  public sideMenu: any = [
    {
      stype  : 'bs-type-sideitem',
      id : 'menu-sidemenu-00',
      title : '회원정보 조회',
      auth: 'member_view',
      // icon: 'flaticon-cogwheel',
      show : true,
      //notiCount  : 2,
      items : [
        {
          title : '회원 리스트',
          auth: 'member_view',
          url : 'list',
          selected: true
        },
      ]
    },
    // {
    //   stype  : 'bs-type-sideitem',
    //   id : 'menu-sidemenu-01',
    //   title : '고객 상담 내역',
    //   // icon: 'flaticon-cogwheel',
    //   show : true,
    //   //notiCount  : 2,
    //   items : [
    //     {
    //       title : '상담 통합 내역',
    //       url : 'cs-history',
    //       selected: false
    //     }
    //   ]
    // },
    // {
    //   stype  : 'bs-type-sideitem',
    //   id : 'menu-sidemenu-02',
    //   title : '고객 등급 관리',
    //   // icon: 'flaticon-cogwheel',
    //   show : true,
    //   //notiCount  : 2,
    //   items : [
    //     {
    //       title : '등급 관리',
    //       url : 'grade',
    //       selected: false
    //     },
    //     {
    //       title : '등급별 구매혜택',
    //       url : 'grade-benefit',
    //       selected: false
    //     },
    //     // {
    //     //   title : '자동 등급조정(갱신) 설정',
    //     //   url : 'autograde',
    //     //   selected: false
    //     // }
    //   ]
    // },
    {
        stype  : 'bs-type-sideitem',
        id : 'menu-sidemenu-03',
        title : '이메일관리',
        auth: 'member_view',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
          {
            title : '자동 메일 설정',
            auth: 'setting_basic_view',
            url : 'email/config',
            selected: false
          },
          {
            title : '이메일 발송 내역',
            auth: 'member_send',
            url : 'email/list',
            selected: false
          },
        //  {
        //      title : '이메일 발송 내역',
        //      url : 'grade-benefit',
        //      selected: false
        //  },
        //  {
        //      title : '이메일 발송 내역',
        //      url : 'grade-benefit',
        //      selected: false
        //  },
        //  {
        //      title : '자동 등급조정(갱신) 설정',
        //      url : 'autograde',
        //      selected: false
        //  }
        ]
      },
      {
        stype  : 'bs-type-sideitem',
        id : 'menu-sidemenu-03',
        title : '카카오톡관리',
        // icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        items : [
          {
            title : '자동 발송 설정',
            auth: 'setting_basic_view',
            url : 'kakao/config',
            selected: false
          },
          {
            title : '카카오톡 발송 내역',
            auth: 'member_send',
            url : 'kakao/list',
            selected: false
          },
        ]
      }
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
