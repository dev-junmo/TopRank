import { Component, ViewChild } from '@angular/core';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert';

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { StatisticsStore } from '@app/common/store/statistics.store';
import { BsChartComponent } from '@bricks/ui/bs-chart/bs-chart.component';

@Component({
  selector: 'app-provider-sales-statistics',
  templateUrl: './provider-sales-statistics.component.html',
  styleUrls: ['./provider-sales-statistics.component.css']
})
export class ProviderSalesStatisticsComponent {

    @ViewChild('chart', {read: BsChartComponent}) chart: BsChartComponent;
    public query;
    public data = { 
      dataset: [{ data: [], label: '' }],
      labels:[],
      total: {} 
    };

    public title = '취급고';

    constructor(public statisticsStore: StatisticsStore,
        alert: BSAlertService,
        ) {
        console.log("ProviderSalesStatisticsComponent:constructor");
    }

    public width : 1200;
    public height : 260;
    
    public chartType:string = 'line';  // 타입    

    reloadWithQuery(query:any) {
        console.log('reloadWithQuery query =>', query);

        if (query.search_type == 'settleprice') {
          this.title = '취급고';
        } else if (query.search_type == 'sales_price') {
          this.title = '매출액';
        } else if (query.search_type == 'cancel_price') {
          this.title = '취소액';
        } else if (query.search_type == 'refund_price') {
            this.title = '반품액';
        } else if (query.search_type == 'coupon_sale') {
            this.title = '할인쿠폰금액';
        }

        this.query = query;
        this.statisticsStore.getProviderSalesData(query).subscribe(resp => {        
          console.log('getProviderSalesData resp =>', resp);
          this.data = resp;
          setTimeout(()=>{
            this.chart.refresh();
          }, 1);
        });
    }

    onClickDownloadExcel(query) {
      console.log('onClickDownloadExcel query =>', query);
      this.statisticsStore.downloadProviderSalesData(query);
    }
}
