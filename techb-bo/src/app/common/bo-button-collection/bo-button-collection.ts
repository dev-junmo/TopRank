import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bo-button-collection',
  templateUrl: './bo-button-collection.html',
  styleUrls: ['./bo-button-collection.css'],
  encapsulation: ViewEncapsulation.None
})

export class BOButtonCollection implements OnInit {

    @Input() id: any;
    @Input() title: any;
    @Input() styleType: any;

    public _btnConfig : any;

    private _map : Map<string, any> = new Map([
      ["default" , { type : "button", title : "확인", styleType : "s-darkgrey" }],

      // button
      ["reply" , { type : "button", title : "답글", styleType : "square-s-greyborder-btn" }],
      ["recontents" , { type : "button", title : "답변", styleType : "square-s-greyborder-btn" }],
      ["edit" , { type : "button", title : "수정", styleType : "square-s-greyborder-btn" }],    // edit만 안되는 이상한 버그가 있어서 update로 임시로 만듦
      ["view" , { type : "button", title : "상세", styleType : "square-s-greyborder-btn" }],
      ["delete" , { type : "button", title : "삭제", styleType : "square-s-navy-btn" }],
      ["copy" , { type : "button", title : "복사", styleType : "square-s-navy-btn" }],
      ["update" , { type : "button", title : "수정", styleType : "square-s-navy-btn" }],
      ["selectedDelete" , { type : "button", title : "선택삭제", styleType : "m-navy" }],
      ["select" , { type : "button", title : "선택", styleType : "s-darkgrey" }],

      // toggle
      ["toggle" , { type : "toggle", title : "", styleType : "" }]

    ]
    );

    constructor() {

    }

    ngOnInit() {
        if (this.id) {
            this._btnConfig = this._map.get(this.id);
        }        

        if (!this._btnConfig) {
            this._btnConfig = this._map.get("default");
        }

        if (this.title) {
            this._btnConfig.title = this.title;
        }        

        if (this.styleType) {
            this._btnConfig.styleType = this.styleType;
        }           

    }


}
