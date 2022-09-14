import { Component, OnInit, ViewEncapsulation, TemplateRef, QueryList, ViewChildren } from '@angular/core';
// import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
// import { Router } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';
// import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

// import { BSBaseStore } from '@app/common/store/bs-base.store';
// import { BsModalService } from 'ngx-bootstrap/modal';

import { DashBoardStore } from '@app/common/store/dashBoard.store';
import { LogStore } from '@app/common/store/log.store';
import { BsChartComponent } from '@bricks/ui/bs-chart/bs-chart.component';

@Component({
    selector: 'home-sdashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    //encapsulation: ViewEncapsulation.None
})
export class HomeDashboardComponent implements OnInit {

    @ViewChildren('chart') charts: QueryList<BsChartComponent>;
    @ViewChildren('chart2') charts2: QueryList<BsChartComponent>;

    public list = [];

    public chartConfig = {
        colors:[{ 
            backgroundColor: [ 
            '#3ab336',
            '#808080',
            '#de4e4e',]
        }]
    };

    public chartConfig2 = {
        colors:[{ 
            backgroundColor: [ 
            '#429ac7',
            '#edb33e',
            '#429ac7',]
        }]
    };

    public chartOptions = {
        animation:false,
        responsive: true,
        layout: {
            padding:{
                left: -100,
                right: 0,
                top: -10,
                bottom: 0
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
        }      
    };

    public chartDatasetsParkState = [];
    public chartDatasetsOperState = [{
        data: [0,1,0]
    }];
    public chartLablesSample = [
    ];

    constructor (
        public dashBoardStore: DashBoardStore,
        public logStore: LogStore, 
        ) {
        //super(baseStore, router, arouter, alert);
    }

    ngOnInit() {
        this.init();
    }

    init() {
        this.list = [];
        this.logStore.listAreas().subscribe(resp => {
            console.log('init::listAreas resp =>', resp);
            // 전체현황 
            this.loadParkStateInArea('');
            for(let area of resp) {
                this.loadParkStateInArea(area.name);
            }
            setTimeout(() => {
                console.log('init::listAreas data =>', this.list);
            }, 1000)
        }); 
    }

    updateCharts() {
        setTimeout(() => {
            this.charts.forEach((chart) => {
                chart.refresh();
                console.log("updateCharts chart =>", chart);
            });
            this.charts2.forEach((chart) => {
                chart.refresh();
                console.log("updateCharts chart =>", chart);
            });
        }, 1000);
    }

    loadParkStateInArea(areaName = '') {
        this.logStore.getParkStatisticsData(areaName).subscribe(resp => {
            this.list.push(resp);
            console.log('loadData::getParkStateData list, resp =>', this.list, resp);

            this.setStaticsData(areaName, resp);
            this.updateCharts();
            
            // chart
            // setTimeout(() => {
            //     this.chart.refresh();
            //     this.chart2.refresh();
            // },1);    
            
        });
    }

    //{park: 0.5, exit: 0, issue: 0.5}
    setStaticsData(areaName, stats) {
        let park = stats.parkStatics;
        if (!areaName) {
            areaName = '전체';
        }
        this.chartDatasetsParkState[areaName] = [{data: [park.park, park.exit, park.issue]}];

        // let oper = stats.operStatics;
        // this.chartDatasetsOperState[0].data = [oper.normal, oper.abnormal, oper.issue];
    }



}
