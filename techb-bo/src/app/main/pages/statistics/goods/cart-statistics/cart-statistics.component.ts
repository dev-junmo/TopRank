import { Component, OnInit } from '@angular/core';
import { StatisticsStore } from '@app/common/store/statistics.store';

@Component({
  selector: 'app-cart-statistics',
  templateUrl: './cart-statistics.component.html',
  styleUrls: ['./cart-statistics.component.css']
})
export class CartStatisticsComponent  implements OnInit {


    public list;
    public column = 'cart_cnt';
    public query:any = null;

    constructor(private statisticsStore: StatisticsStore,
        ) {
    }

    ngOnInit () {
        //this.statisticsStore.command =
    }

    reloadWithQuery(query:any) {

        console.log('reloadWithQuery params =>', query);

        //this.convertPeriodParams(query);
        this.query = query;

        this.getCartData(query);
    }

    getCartData(query) {
        this.statisticsStore.getCartData(query, this.column).subscribe(resp => {
          this.list = resp;
        });
    }

    onChangeColumn() {
        this.getCartData(this.query);
    }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query, column =>', query, this.column);
        this.statisticsStore.downloadCartData(query, this.column);
    }

    // onClickDownloadExcel() {
    //     console.log("onClickDownloadExcel query =>", this.query);
    //     this.statisticsStore.downloadExcel("admin/stats/goods_cart_xlsx", this.query);
    // }

}
