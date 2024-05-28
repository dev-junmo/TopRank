import { Component, OnInit } from '@angular/core';
import { StatisticsStore } from '@app/common/store/statistics.store';

@Component({
    selector: 'app-goods-statistics',
    templateUrl: './goods-statistics.component.html',
    styleUrls: ['./goods-statistics.component.css']
})
export class GoodsStatisticsComponent  implements OnInit {

    public list;
    public column = 'goods_price';
    public query:any = null;

    constructor(private statisticsStore: StatisticsStore,
        ) {
    }

    ngOnInit () {
    }

    reloadWithQuery(query:any) {
        console.log('reloadWithQuery params =>', query);
        this.query = query;
        this.getData(query);
    }

    getData(query) {
        this.statisticsStore.getGoodsData(query, this.column).subscribe(resp => {
          this.list = resp;
        });
    }

    onChangeColumn() {
        this.getData(this.query);
    }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query =>', query, this.column);
        this.statisticsStore.downloadGoodsData(query, this.column);
    }

}
