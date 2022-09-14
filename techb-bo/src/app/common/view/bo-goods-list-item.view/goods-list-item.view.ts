import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Component({
    selector: 'goods-list-item-view',
    templateUrl: './goods-list-item.view.html',
    styleUrls: ['./goods-list-item.view.css']
})
export class GoodsListItemView implements OnInit {
    public clientURL: string = this.appConfig.clientURL;

    public item: any;


    @Output() clickedOption = new EventEmitter<any>();
    @Output() clickedInputOption = new EventEmitter<any>();

    @Input() isShowEa:boolean = false;
    @Input() isShowPrice:boolean = false;
    @Input() isShowTotalPrice:boolean = false;
    @Input() isShowBtnBox: boolean = false;
    @Input() editable: boolean = false;

    @Input() set setItem(value) {
        this.item = value;
        console.log(this.item);
        if (this.inputs == undefined) {
            this.inputs = this.item.inputs;
        }
        if (this.suboptions == undefined) {
            this.suboptions = this.item.suboptions;
        }
        if (this.price == undefined) {
            this.price = this.item.price;
        }
        if (this.ea == undefined) {
            this.ea = this.item.ea;
        }

    }

    @Input() inputs;
    @Input() suboptions;
    @Input() isSuboptions = true;
    @Input() price;
    @Input() ea;

    // @Input() set inputOptions(value) {
    //     this.item.inputs = value;

    //     if (this.item) {
    //         this.item.inputs = this.item.inputs;
    //     }
    // }

    // @Input() set subOptions(value) {
    //     this.item.suboptions = value;

    //     if (this.item) {
    //         this.item.inputs = this.item.suboptions;
    //     }
    // }

    constructor( public appConfig: AppConfigService) {

    }

    ngOnInit() {

    }

    onClickOption(event, item) {
        console.log("onClickOption item =", item, item.option_seq, event);

        if (event.preventDefault) {
            event.preventDefault();
            console.log("event.preventDefault" , event.preventDefault);
        }
        if (event.stopPropagation) {
            event.stopPropagation();
            console.log("event.stopPropagation" , event.stopPropagation);
        }

        this.clickedOption.emit(item.option_seq);
    }

    onClickInputOption(event, item) {
        console.log("GoodsListItemView::onClickInputOption item =", item);

        if (event.preventDefault) {
            event.preventDefault();
            console.log("event.preventDefault" , event.preventDefault);
        }
        if (event.stopPropagation) {
            event.stopPropagation();
            console.log("event.stopPropagation" , event.stopPropagation);
        }

        this.clickedInputOption.emit(item);
    }
}

