import { Component, OnInit } from '@angular/core';
import { MemberListStore } from '../../../common/store/member-list.store';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-crm-member',
  templateUrl: './crm-member.component.html',
  styleUrls: ['./crm-member.component.css']
})
export class CrmMemberComponent implements OnInit {

  options = ['', '1', '2', '3', '4']; // 등록유형 필드확인 필요
  public item;
  private id: number;
  private sub: any;

  constructor(public memberStore : MemberListStore, private activateRouter : ActivatedRoute,
              private router :Router,) {
      this.sub = this.router.events.subscribe((event:any) => {
        if (event instanceof NavigationEnd) {
          this.id = parseInt(event.url.split('/')[2]);
            // this.ignoreShowMenu = true;
            // this.hidePopupMenu();
          console.log("NavigationEnd ==",this.id);
          this.loadUserData(this.id);
        }
        console.log("crmmmm" , event,this.id);
      });    
   
  }

  ngOnInit() { 
  }

  loadUserData(id) {
    this.memberStore.loadUserData(id).subscribe(resp=>{
      console.log(resp);
      this.item = resp;
      console.log(this.item);
    });
  }

}
