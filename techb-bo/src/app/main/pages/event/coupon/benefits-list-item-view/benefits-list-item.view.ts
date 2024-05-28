import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'benefits-list-item-view',
  templateUrl: './benefits-list-item.view.html',
  styleUrls: ['./benefits-list-item.view.css']
})
export class BenefitsListItemView implements OnInit {

    @Input() item:any;

    constructor() { }

    ngOnInit() {
        console.log("BenefitsListItemView::ngOnInit item =>", this.item);
    }
}
