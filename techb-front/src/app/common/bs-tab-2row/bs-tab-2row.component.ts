import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bs-tab-2row',
  templateUrl: './bs-tab-2row.component.html',
  styleUrls: ['./bs-tab-2row.component.css']
})
export class BSTab2RowComponent implements OnInit {

    public tabs: any;
    @Input() tabs1row: Array<string>;
    @Input() tabs2row: Array<string>;
    @Input() ids: Array<string>;
    @Input() padding:string = "0 0";
    @Input() innerPadding: string = "15px";
    @Input() fontSize: string = "15px";

    @Input() set tabs1WidthPercent(widths) {
        this.tabWidth[0] = widths;
        console.log("tabs1WidthPercent widths =>", widths);
    }

    @Input() set tabs2WidthPercent(widths) {
        this.tabWidth[1] = widths;
    }

    @Output() changeTab = new EventEmitter<any>();

    public selectedTab: string;

    // private
    private tabWidth: any = [[], []];

    //  20, 30, 20, 30

    constructor() {
        this.tabs = [[], []];
    }

    ngOnInit() {

        console.log("ngOnInit tabWidth =>", this.tabWidth, this.tabWidth[1], this.tabWidth[1].length);

        this.tabs[0] = this.tabs1row;
        this.tabs[1] = this.tabs2row;

        if (!this.tabWidth[0] || this.tabWidth[0].length == 0) {
            this.calcWidth(0);
        }
        if (!this.tabWidth[1] || this.tabWidth[1].length == 0) {
            this.calcWidth(1);
        }

        if (!this.selectedTab && this.tabs && this.tabs.length > 0) {
            this.selectedTab = this.tabs[0][0];
        }
    }

    calcWidth(row) {

        if (!this.tabs[row] || this.tabs[row].length == 0) { return; }

        let i = 0;
        for (let tab of this.tabs[row]) {

            let width: number = (100 / this.tabs[row].length);
            this.tabWidth[row][i] = width + "%";
            i++;
        }
        console.log("calcWidth tabwidth =>", this.tabWidth);
    }

    onClickTab(tab, index) {

        console.log(tab, index , this.ids);
        this.selectedTab = tab;

        if (this.ids && this.ids.length > 0) {
            this.changeTab.emit({ label: tab, id: this.ids[index] });
        } else {
            this.changeTab.emit({label: tab});
        }
    }
}

