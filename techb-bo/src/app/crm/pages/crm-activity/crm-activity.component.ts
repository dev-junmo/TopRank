import { Component, OnInit ,Pipe } from '@angular/core';
import { MemberListStore } from '../../../common/store/member-list.store';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-crm-activity',
  templateUrl: './crm-activity.component.html',
  styleUrls: ['./crm-activity.component.css']
})
export class CrmActivityComponent implements OnInit {

  options = ['', '1', '2', '3', '4']; // 등록유형 필드확인 필요
  public item;
  private id: number;

  constructor(public memberStore: MemberListStore, private router :Router,) {
    this.router.events.subscribe((event:any) => {
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
