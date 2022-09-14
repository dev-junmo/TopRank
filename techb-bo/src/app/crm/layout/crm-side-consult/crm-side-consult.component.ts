import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'crm-side-consult',
  templateUrl: './crm-side-consult.component.html',
  styleUrls: ['./crm-side-consult.component.css']
})
export class CrmSideConsultComponent implements OnInit {

  @Input() imgUrl: string;
  @Input() title: string;
  @Input() buttons: any;  /* [{title: '게시판 생성', type: 'l-navy'}, {title: '게시판 관리', type: 'round-m-white'}] */
  
    constructor() { }

  ngOnInit() {
  }

}
