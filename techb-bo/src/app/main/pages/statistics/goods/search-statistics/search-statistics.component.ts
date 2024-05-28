import { Component, OnInit } from '@angular/core';
import { StatisticsStore } from '@app/common/store/statistics.store';

@Component({
  selector: 'app-search-statistics',
  templateUrl: './search-statistics.component.html',
  styleUrls: ['./search-statistics.component.css']
})
export class SearchGoodsStatisticsComponent  implements OnInit {
    
    public list;
    public query;
    constructor(private statisticsStore: StatisticsStore,) {
    }

    ngOnInit () {
    }

    reloadWithQuery(query:any) {
        console.log('reloadWithQuery params =>', query);
        
        this.query = query;
        this.statisticsStore.getSearchGoodsData(query).subscribe(resp => {
            this.list = resp;
        });
    }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query =>', query);
        this.statisticsStore.downloadSearchGoodsData(query);
    }
}
