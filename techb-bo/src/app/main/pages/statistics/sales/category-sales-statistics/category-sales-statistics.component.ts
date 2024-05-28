import { Component, ViewChild } from '@angular/core';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { StatisticsStore } from '@app/common/store/statistics.store';
import { BsChartComponent } from '@bricks/ui/bs-chart/bs-chart.component';

@Component({
  selector: 'app-category-sales-statistics',
  templateUrl: './category-sales-statistics.component.html',
  styleUrls: ['./category-sales-statistics.component.css']
})
export class CategorySalesStatisticsComponent {

    @ViewChild('chart', {read: BsChartComponent}) chart: BsChartComponent;

    public query;
    public data = { 
      dataset: [{ data: [], label: '' }],
      labels:[],
      total: {} 
    };

    public title = '카테고리';

    constructor(public statisticsStore: StatisticsStore,
        alert: BSAlertService,
        ) {
        console.log("CategorySalesStatisticsComponent:constructor");
    }

    public width : 1200;
    public height : 260;
    
    public chartType:string = 'line';  // 타입    

    reloadWithQuery(query:any) {
        console.log('reloadWithQuery query =>', query);

        if (query.category_type == 'C') {
          this.title = '카테고리';
        } else if (query.category_type == 'P') {
          this.title = '프로그램';
        } else if (query.category_type == 'B') {
          this.title = '브랜드';
        }
        this.query = query;

        this.statisticsStore.getCategorySalesData(query).subscribe(resp => {        
          console.log('getCategorySalesData resp =>', resp);
          this.data = resp;
          setTimeout(()=>{
            this.chart.refresh();
          }, 1);
        });
    }

    onClickDownloadExcel(query) {
      console.log('onClickDownloadExcel query =>', query);
      this.statisticsStore.downloadCategorySalesData(query);
  }
}
