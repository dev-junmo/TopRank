import { Component, OnInit } from '@angular/core';
import { StatisticsStore } from '@app/common/store/statistics.store';

@Component({
  selector: 'app-referer-goods-statistics',
  templateUrl: './referer-goods-statistics.component.html',
  styleUrls: ['./referer-goods-statistics.component.css']
})
export class RefererGoodsStatisticsComponent  implements OnInit {
    
    public data;
    public query;
    constructor(private statisticsStore: StatisticsStore,) {
    }

    ngOnInit () {
    }

    reloadWithQuery(query:any) {
        this.query = query;
        console.log('reloadWithQuery params =>', query);    
        this.statisticsStore.getRefererGoodsData(query).subscribe(resp => {
            this.data = resp;

            for(let item of this.data.list) {
                for(let title of this.data.stats) {                    
                    if (query.search_type == 'view_cnt') {
                        if (item.stats[title] == undefined) {
                            item.stats[title] = { textValue : '0'};
                        } else {
                            item.stats[title].textValue = item.stats[title].view_cnt;
                        }                        
                    } else if (query.search_type == 'view_rate') {
                        if (item.stats[title] == undefined) {
                            item.stats[title] = { textValue : '0%'};
                        } else {
                            item.stats[title].textValue = item.stats[title].view_rate + '%';
                        }
                    } else if (query.search_type == 'cvr') {
                        if (item.stats[title] == undefined) {
                            item.stats[title]= { textValue : '0%'};
                        } else {
                            item.stats[title].textValue = item.stats[title].cvr + '%';
                        }
                    } 
                    console.log('reloadWithQuery item, item.stats[title] =>', item, item.stats[title], item.stats[title].textValue);
                }
            }            
        });
    }

    onClickDownloadExcel(query) {
        console.log('onClickDownloadExcel query =>', query);
        this.statisticsStore.downloadRefererGoodsData(query);
    }
}
