import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-search-box',
  templateUrl: './bs-search-box.component.html',
  styleUrls: ['./bs-search-box.component.css']
})
export class BSSearchBoxComponent implements OnInit {

  private isShowSearchbox: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onClickShowSearchbox(){
    this.isShowSearchbox = !this.isShowSearchbox;
  }
}
