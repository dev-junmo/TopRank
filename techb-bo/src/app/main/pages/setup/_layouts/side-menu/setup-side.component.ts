import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'setup-side',
  templateUrl: './setup-side.component.html',
  styleUrls: ['./setup-side.component.css']
})
export class SetupSideComponent implements OnInit {
  private isOpen : boolean = true;

  /*
	  게시글 관리
	  게시판 관리
		  게시판 리스트
		  게시판 생성
    문의 관리
      상품문의
      1:1 문의
      입점사 문의
      메이커스 문의
      스타옥션 문의
    구매평 관리
    공지사항 관리
      입점사 공지사항 관리
      공지사항 관리
    FAQ 관리
  */
  public sideMenu: any = [
      {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-00",
        title : "기본정보관리2",
        //icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        url : "basic",
        items : [
          {
            title : "쇼핑몰정보",
            url : "basic",
            selected: true
          },
          {
            title : "고객센터정보",
            url : "cs",
            selected: false
          },
          {
            title : "이용약관",
            url : "terms",
            selected: false
          }
        ]
      },
      {
        stype  : "bs-type-sideitem",
        id : "id-sidemenu-01",
        title : "운영관리",
        //icon: 'flaticon-cogwheel',
        show : true,
        //notiCount  : 2,
        url : "admin",
        items : [
          {
            title : "관리자 관리",
            url : "admin",
            selected: false
          },
          {
            title : "인기검색어 설정",
            url : "search",
            selected: false
          },
          {
            title : "결제 관리",
            url : "payment",
            selected: false
          }
        ]
      }
  ];

  constructor() {

  }

  ngOnInit() {
    console.log(this.sideMenu);

  }

  showContent(item) {
     console.log(item.show);
     item.show = !item.show;

   }
}
