import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, ActivationEnd, NavigationEnd  } from '@angular/router';
import { MemberListStore } from '@app/common/store/member-list.store';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {

  buttons: any = [{title: '게시판 생성', styleType: 'l-navy'}, {title: '게시판 관리', styleType: 'round-m-white'}]

  public id;
  public userName: string;
  public groupName: string;

  constructor(
      public memberStore: MemberListStore,
      private router: Router,
      protected activatedRoute: ActivatedRoute,
      protected titleService: Title) {

    console.log('CrmComponent::constructor params= ', activatedRoute);

    // get id from router
    // if (activatedRoute.params) {
    //   activatedRoute.params.subscribe(params => {
    //     console.log('CrmComponent::constructor params= ', params['id']);
    //     this.id = params['id'];

    //     this.memberStore.id = this.id;

    //     this.loadUserData(this.id);
    //   });
    // }

    this.router.events.subscribe((event:any) => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",event)
      if (event instanceof NavigationEnd) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",event)
        this.id = event.url.split('/')[2];
        //   // this.ignoreShowMenu = true;
        //   // this.hidePopupMenu();
        console.log(event.url.split('/'));
        this.loadUserData(this.id);
      }
    });  

    
  }

  ngOnInit() {
    this.titleService.setTitle('TopRank 고객관리환경'); 
  }

  loadUserData(id) {
    //member/member
    this.memberStore.loadUserData(id).subscribe(resp => {
      console.log('side', resp);
      this.userName = resp.user_name;
      this.groupName = resp.member_group.group_name;
    });
  }

}
