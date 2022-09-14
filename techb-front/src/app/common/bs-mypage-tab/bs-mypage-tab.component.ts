import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bs-mypage-tab',
  templateUrl: './bs-mypage-tab.component.html',
  styleUrls: ['./bs-mypage-tab.component.css']
})
export class BSMypageTabComponent implements OnInit {
  
  //
  @Input() tabs: Array<string>;
  @Input() ids: Array<string>;  
  @Input() padding:string = "13px 0";
  // @Input() innerPadding: string = "15px";
  @Input() fontSize: string = "15px";

  @Output() changeTab = new EventEmitter<any>();

  public selectedTab: string;

  // private
  private tabWidth: Array<string> = [];
  
  
  constructor() { }

  ngOnInit() {

    this.calcWidth();
    
    if (!this.selectedTab && this.tabs && this.tabs.length > 0) {
      this.selectedTab = this.tabs[0];      
    }
  }

  calcWidth() {    
    if (!this.tabs || this.tabs.length == 0) return;

    let i = 0;
    for(let tab of this.tabs) {

      let width:number = (100 / this.tabs.length);
      this.tabWidth[i] = width + "%";
      i++;
    }

    console.log("tabwidth = ", this.tabWidth);

  }


  onClickTab(tab, index) {
    this.selectedTab = tab;
    if (this.ids.length > 0) {
      this.changeTab.emit({ label: tab, id: this.ids[index] });
    }
    else {
      this.changeTab.emit({label: tab});
    }  
  }


}

