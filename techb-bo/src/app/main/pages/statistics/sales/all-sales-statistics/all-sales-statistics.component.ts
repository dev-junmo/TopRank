import { Component, ViewChildren, QueryList } from '@angular/core';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { StatisticsStore } from '@app/common/store/statistics.store';
import { BsChartComponent } from '@bricks/ui/bs-chart/bs-chart.component';

@Component({
  selector: 'app-all-sales-statistics',
  templateUrl: './all-sales-statistics.component.html',
  styleUrls: ['./all-sales-statistics.component.css']
})
export class AllSalesStatisticsComponent {

    //@ViewChildren('reviewMobileGoodsSwiper') reviewMobileGoodsSwiper: QueryList<BsChartComponent>;
    @ViewChildren('chart') charts: QueryList<BsChartComponent>;

    public query;
    public data = { 
        settleprice: {
            dataset: [{ data: [], label: '' }],
            labels:[],
            total: {} 
        },
        sales_price: {
            dataset: [{ data: [], label: '' }],
            labels:[],
            total: {}
        },
        refund_price: {
            dataset: [{ data: [], label: '' }],
            labels:[],
            total: {}
        },
        coupon_sale: {
            dataset: [{ data: [], label: '' }],
            labels:[],
            total: {}
        },
        cancel_price: {
            dataset: [{ data: [], label: '' }],
            labels:[],
            total: {}
        }
    };

    public title = '가입';

    constructor(public statisticsStore: StatisticsStore,
        alert: BSAlertService,
        ) {
        console.log("AllSalesStatisticsComponent:constructor");
    }

    public width : 1200;
    public height : 260;
    
    public chartType:string = 'line';  // 타입    

    reloadWithQuery(query:any) {
        console.log('reloadWithQuery query =>', query);
        this.query = query;
        this.statisticsStore.getAllSalesData(query).subscribe(resp => {        
            console.log('getAllSalesData resp =>', resp);
            this.data = resp;
            this.updateCharts();
        });
    }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query =>', query);
        this.statisticsStore.downloadAllSalesData(query);
    }

    updateCharts() {
        setTimeout(() => {
            this.charts.forEach((chart) => {
                chart.refresh();
                console.log("updateCharts chart =>", chart);
            });
        }, 1000);
    }
}
