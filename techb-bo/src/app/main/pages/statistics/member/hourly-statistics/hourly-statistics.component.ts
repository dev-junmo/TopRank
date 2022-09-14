import { Component, ViewChild } from '@angular/core';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert';

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { StatisticsStore } from '@app/common/store/statistics.store';
import { BsChartComponent } from '@bricks/ui/bs-chart/bs-chart.component';

@Component({
  selector: 'app-hourly-statistics',
  templateUrl: './hourly-statistics.component.html',
  styleUrls: ['./hourly-statistics.component.css']
})
export class HourlyStatisticsComponent {

    @ViewChild('chart', {read: BsChartComponent}) chart: BsChartComponent;
    public query;

    public data = { 
      dataset: [{ data: [], label: '' }],
      labels:[],
      total: {} 

    };

    constructor(public statisticsStore: StatisticsStore,
        alert: BSAlertService,
        ) {
        console.log("HourlyStatisticsComponent:constructor");
    }

    public width : 1200;
    public height : 260;
    
    public chartType:string = 'line';  // 타입    

    reloadWithQuery(query:any) {
        console.log('reloadWithQuery query =>', query);
        this.query = query;
        
        delete query.search_type;
        delete query.date_type;

        this.statisticsStore.getHourlyData(query).subscribe(resp => {        
          console.log('getHourlyData resp =>', resp);
          this.data = resp;
          setTimeout(()=>{
            this.chart.refresh();
          }, 1);
        });
    }

    onClickDownloadExcel(query) {
      console.log('onClickDownloadExcel query =>', query);
      this.statisticsStore.downloadHourlyData(query);
  }
}
