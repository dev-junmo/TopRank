import { Component, ViewChild } from '@angular/core';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert';

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { StatisticsStore } from '@app/common/store/statistics.store';
import { BsChartComponent } from '@bricks/ui/bs-chart/bs-chart.component';

@Component({
  selector: 'app-refer-statistics',
  templateUrl: './refer-statistics.component.html',
  styleUrls: ['./refer-statistics.component.css']
})
export class ReferStatisticsComponent {

    @ViewChild('chart', {read: BsChartComponent}) chart: BsChartComponent;
    public query;

    public data = { 
      dataset: [{ data: [], label: '' }],
      labels:[],
      total: {},
      referers: {}
    };

    public title = "가입";

    constructor(public statisticsStore: StatisticsStore,
        alert: BSAlertService,
        ) {
        console.log("ReferStatisticsComponent:constructor");
    }

    public width : 1200;
    public height : 260;
    
    public chartType:string = 'line';  // 타입    

    reloadWithQuery(query:any) {
        console.log('reloadWithQuery query =>', query);
        this.query = query;

        delete query.date_type;

        if (query.search_type == 'join') {
            this.title = '가입';
        } else if (query.search_type == 'visit') {
            this.title = '방문';
        } else if (query.search_type == 'withdrawal') {
            this.title = '탈퇴';
        }

        this.statisticsStore.getReferData(query).subscribe(resp => {        
            console.log('getReferData resp =>', resp);
            this.data = resp;
            setTimeout(()=>{
                this.chart.refresh();
            }, 1);
        });
    }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query =>', query);
        this.statisticsStore.downloadReferData(query);
    }
}
