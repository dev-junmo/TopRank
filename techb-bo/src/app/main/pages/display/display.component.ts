import { Component, OnInit } from '@angular/core';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {


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
