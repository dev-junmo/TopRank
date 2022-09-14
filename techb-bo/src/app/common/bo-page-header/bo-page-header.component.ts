import { Component, OnInit, Input,  EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { BOPageButtonConfig } from './bo-page-button-config';

@Component({
  selector: 'bo-page-header',
  templateUrl: './bo-page-header.component.html',
  styleUrls: ['./bo-page-header.component.css']
})
export class BOPageHeaderComponent implements OnInit {

  @Input() imgUrl: string;
  @Input() title: string;
  @Input() requireText:boolean = false;
  @Input() description: string;
  //@Input() buttons: any;  /* [{title: '게시판 생성', type: 'l-navy'}, {title: '게시판 관리', type: 'round-m-white'}] */

  @ContentChildren(BOPageButtonConfig) buttons: QueryList<BOPageButtonConfig>;

  constructor() { }

  ngOnInit() {
  }

  onClickBtn(index) {

    let i = 0;
    this.buttons.toArray().reverse().forEach(button => {
        if (i == index) {
            button.fireOnClick();
        }
        i++;
    });

  }

}
