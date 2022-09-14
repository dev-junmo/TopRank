import { Component, OnInit, Input } from '@angular/core';
import { MemberListStore } from '../../../common/store/member-list.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'crm-sidemenu',
  templateUrl: './crm-sidemenu.component.html',
  styleUrls: ['./crm-sidemenu.component.css']
})
export class CrmSidemenuComponent {

  buttons: any = [{title: '게시판 생성', styleType: 'l-navy'}, {title: '게시판 관리', styleType: 'round-m-white'}]
  private id: number;
  private sub: any;
  @Input() userName: string;
  @Input() groupName: string;

  public CRMSideMenu = [
    
    // {
    //     stype  : 'bs-type-crmsideitem',
    //     id : 'id-sidemenu-00',
    //     title : 'CRM 홈',
    //     url : 'home',
    //     show : true,
    //     notiCount  : 1,
    // },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '회원정보',
      url : 'member',
      //icon: 'flaticon-cogwheel',
      show : true,
      notiCount  : 2
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-02',
      title : '활동정보',
      url : 'activity',
      //icon: 'flaticon-cogwheel',
      show : true,
      notiCount  : 2
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '주문',
      url : 'order',
      //icon: 'flaticon-cogwheel',
      show : true,
      notiCount  : 2,
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '반품.교환내역',
      url : 'return',
      //icon: 'flaticon-cogwheel',
      show : true,
      notiCount  : 2
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '환불내역',
      url : 'refund',
      //icon: 'flaticon-cogwheel',
      show : true,
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '적립금 내역',
      topLine: 'Y',
      url : 'emoney',
      //icon: 'flaticon-cogwheel',
      show : true,
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '포인트 내역',
      url : 'point',
      //icon: 'flaticon-cogwheel',
      show : true,
    },
    // {
    //   stype  : 'bs-type-crmsideitem',
    //   id : 'id-sidemenu-01',
    //   title : '이머니',
    //   //icon: 'flaticon-cogwheel',
    //   show : true,
    // },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '쿠폰/코드',
      url : 'coupon',
      //icon: 'flaticon-cogwheel',
      show : true,
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '상품후기',
      url : 'review',
      topLine: 'Y',
      //icon: 'flaticon-cogwheel',
      show : true,
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '1:1문의',
      url : 'dqna',
      //icon: 'flaticon-cogwheel',
      show : true,
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '상담',
      url : 'cshistory',
      //icon: 'flaticon-cogwheel',
      show : true,
    },
    {
      stype  : 'bs-type-crmsideitem',
      id : 'id-sidemenu-01',
      title : '로그.메모',
      url : 'log',
      topLine: 'Y',
      //icon: 'flaticon-cogwheel',
      show : true,
    }
  ];

  constructor() { }

  // ngOnInit() {
  //   this.sub = this.activateRouter.params.subscribe(params => {
  //     this.id = +params['id'];
  //     this.loadUserData(this.id);
  //   });    
  // }

  // loadUserData(id) {
    
  //   this.memberStore.loadUserDate(id).subscribe(resp=>{
  //     console.log('side',resp);
  //     this.userName = resp.user_name;
  //   });
  // }
}
