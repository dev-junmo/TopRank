import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-crm-header',
  templateUrl: './crm-header.component.html',
  styleUrls: ['./crm-header.component.css']
})
export class CrmHeaderComponent implements OnInit {

  @Input() imgUrl: string;
  @Input() title: string;
  @Input() buttons: any;  /* [{title: '게시판 생성', type: 'l-navy'}, {title: '게시판 관리', type: 'round-m-white'}] */
  
    constructor() { }

  ngOnInit() {
  }

}
