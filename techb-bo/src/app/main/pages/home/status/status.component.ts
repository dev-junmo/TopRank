import { Component, OnInit, ViewEncapsulation, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BsModalService } from 'ngx-bootstrap/modal';
//import { BSApi } from '@bricks/common/core/bs-api';

import { LogStore } from '@app/common/store/log.store';
import { BsChartComponent } from '@bricks/ui/bs-chart/bs-chart.component';

@Component({
    selector: 'home-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css'],
    //encapsulation: ViewEncapsulation.None
})
export class HomeStatusComponent implements OnInit {
    @ViewChild('parkCanvas') parkCanvas: ElementRef;
    //@ViewChild('parkMapContainer') mapContainer : ElementRef;

    @ViewChild('chart', {read: BsChartComponent}) chart: BsChartComponent;
    @ViewChild('chart2', {read: BsChartComponent}) chart2: BsChartComponent;

    //let statusString = ['출차', '주차', '출차중', '주차중', '주차/출차중', '판단중'];

    // public translatePos = {
    //     x: canvas.width / 2,
    //     y: canvas.height / 2
    // };

    public areas;
    public selAreaData;
    public selectedAreaName = '4층';
    private interval;
    public updateSec = '5';


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

    public chartDatasetsParkState = [{
        data: [1,2,3]
    }];

    public chartDatasetsOperState = [{
        data: [1,1,0]
    }];

    public chartLablesSample = [
    ];

    public parkMapContainerWidth = window.innerWidth - 328 - 246 - 20;
    public parkMapContainerHeight = window.innerHeight - 72 -78 < 1073 ? 1073 : window.innerHeight - 72 -78;

    public offset = {
        x:0, y:0
    }
    public startDragOffset = { x: 0, y: 0};

    public scale = 1.0;
    public scaleMultiplier = 0.8;

    public mouseDown: boolean = false;

    public isShowSidebar = true;
    public isShowParkStatus = true;
    

    constructor (
        //baseStore: BSBaseStore,
        public logStore: LogStore,
        // //private bsApi: BSApi,
        // protected router: Router,
        // arouter: ActivatedRoute,
        //alert: BSAlertService,
        // public modal: BsModalService
        ) {
        //super(baseStore, alert);
    }

    ngOnInit() {
        // this.parkMapContainerWidth = window.screen.width - 500;
        // this.parkMapContainerHeight = window.screen.height - 500;
        this.init();
    }

    init() {
        this.logStore.listAreas().subscribe(resp => {
            console.log('ngOnInit::listAreas resp =>', resp);
            this.areas = resp;
            this.areas[0].selected = true;

            // map draw
            this.preloadMapImage();
            this.initCanvas();
            
            // 상태정보 가져오기
            //this.loadParkStateInArea('4층');
            this.startLog();
        }); 
    }

    startLog() {
        clearInterval(this.interval);
        this.loadParkStateInArea(this.selectedAreaName);
        this.interval = setInterval(() => {
            this.loadParkStateInArea(this.selectedAreaName);
        }, 1000 * parseInt(this.updateSec));    
    }


    loadParkStateInArea(areaName) {
        this.logStore.getParkStateData(areaName).subscribe(resp => {
            console.log('loadData::getParkStateData resp =>', resp);
            this.selAreaData = resp;
            this.setStaticsData(resp.stats);
            this.updateCanvas();
            // chart
            setTimeout(() => {
                this.chart.refresh();
                this.chart2.refresh();
            },1);    
        });
    }

    //{park: 0.5, exit: 0, issue: 0.5}
    setStaticsData(stats) {
        let park = stats.parkStatics;
        this.chartDatasetsParkState[0].data = [park.park, park.exit, park.issue];
        // let oper = stats.operStatics;
        // this.chartDatasetsOperState[0].data = [oper.normal, oper.abnormal, oper.issue];
    }

    onClickShowParkStatus(show) {
        this.isShowParkStatus = show;
        if (!show) {
            alert('운영현황은 준비중입니다.');
            this.isShowParkStatus = true;
        }
    }

    getSelectedArea() {
        for(let item of this.areas) {
            if (item.selected) {
                console.log('getSelectedArea item =>', item);
                return item;
            }
        }
    }

    getSelectedAreaStatus() {
        let area = this.getSelectedArea();
        for(let item of this.areas) {
            if (item.selected) {
                console.log('getSelectedArea item =>', item);
                return item;
            }
        }
    }

    initCanvas() {
        let canvas = this.parkCanvas.nativeElement;   
        this.offset = {
            x: 100, //canvas.width / 2,
            y: 150 //canvas.height / 2
        }

        let self = this;    
        window.addEventListener('resize', function(event) {
            self.layoutWindow();
        }, true);

        //const ctx = this.parkCanvas.nativeElement.getContext("2d"); 
        // add event listeners to handle screen drag
        canvas.addEventListener("mousedown", function(evt) {
            self.mouseDown = true;
            self.startDragOffset.x = evt.clientX - self.offset.x;
            self.startDragOffset.y = evt.clientY - self.offset.y;
            console.log('mouse down mouseDown, startDragOffset =>', self.mouseDown, self.startDragOffset);
        });

        canvas.addEventListener("mouseup", function(evt) {
            self.mouseDown = false;
        });

        canvas.addEventListener("mouseover", function(evt) {
            self.mouseDown = false;
        });

        canvas.addEventListener("mouseout", function(evt) {
            self.mouseDown = false;
        });

        canvas.addEventListener("mousemove", function(evt) {
            if (self.mouseDown) {           
                self.offset.x = evt.clientX - self.startDragOffset.x;
                self.offset.y = evt.clientY - self.startDragOffset.y;
                console.log('mouse move offset, evt.clientX, evt.clientY, startDragOffset =>', self.offset, evt.clientX, evt.clientY, self.startDragOffset);
                self.updateCanvas();
            }
        });

        // 이미지 로딩 시간
        // setTimeout(() => {
        //     this.updateCanvas();
        // }, 1000);
    }
    
    onClickHideSidebar() {
        this.isShowSidebar = !this.isShowSidebar;
        this.layoutWindow();
    }

    layoutWindow() {
        setTimeout(() => {
            let width =  this.isShowSidebar ? 328: 0;
            console.log('=========> width', width);
            this.parkMapContainerWidth = window.innerWidth - width - 246 - 20;
            let h = window.innerHeight - 72 -78;
            this.parkMapContainerHeight = h < 1073 ? 1073 : h;
            this.updateCanvas();
        },10);
    }

    onClickAreaTab(areaName) {
        for(let item of this.areas) {
            if (areaName == item.name) {
                item.selected = true;
            } else {
                item.selected = false;
            }   
        }
        this.selectedAreaName = areaName;
        this.startLog();        
    }

    updateCanvas() {
        this.drawParkMap(this.scale, this.offset);
    }

    preloadMapImage() {
        for(let item of this.areas) {
            // 3. 이미지 객체 생성 
            const img = new Image(); 
            // 4. 이미지 소스 설정 
            img.src = item.mapUrl; //'/assets/img/park/park-centro-5.png'; 
            //img.src = '/assets/img/check_02.png'; 
            // 5. 이미지 로드이벤트- 콜백함수 등록 

            let self = this;
            img.addEventListener('load', function() {
                item.mapImage = img;
                self.updateCanvas();
            }, false);
        }
    }

    drawParkMap(scale, offset) {
        let canvas = this.parkCanvas.nativeElement;       
        const ctx = this.parkCanvas.nativeElement.getContext("2d"); 

        //alert(this.parkMapContainerWidth)
        ctx.canvas.width  = this.parkMapContainerWidth;
        ctx.canvas.height = this.parkMapContainerHeight;
        //ctx.canvas.height = this.mapContainer.nativeElement.offsetHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.save();
      
        ctx.translate(offset.x, offset.y);
        ctx.scale(scale, scale);

         // 도면 표시하기 
        let item = this.getSelectedArea();
        ctx.drawImage(item.mapImage, 0, 0, 647* 1.5, 479 * 1.5); //
        
        // 상태표시하기
        this.drawItemStatus(ctx);

        ctx.stroke();
        ctx.restore();

        // var context = canvas.getContext("2d");

        // // clear canvas
        // context.clearRect(0, 0, canvas.width, canvas.height);
  
        // context.save();
        // // context.translate(translatePos.x, translatePos.y);
        // // context.scale(scale, scale);
        // context.beginPath(); // begin custom shape
        // context.moveTo(-119, -20);
        // context.bezierCurveTo(-159, 0, -159, 50, -59, 50);
        // context.bezierCurveTo(-39, 80, 31, 80, 51, 50);
        // context.bezierCurveTo(131, 50, 131, 20, 101, 0);
        // context.bezierCurveTo(141, -60, 81, -70, 51, -50);
        // context.bezierCurveTo(31, -95, -39, -80, -39, -50);
        // context.bezierCurveTo(-89, -95, -139, -80, -119, -20);
        // context.closePath(); // complete custom shape
        // var grd = context.createLinearGradient(-59, -100, 81, 100);
        // grd.addColorStop(0, "#8ED6FF"); // light blue
        // grd.addColorStop(1, "#004CB3"); // dark blue
        // context.fillStyle = grd;
        // context.fill();
  
        // context.lineWidth = 5;
        // context.strokeStyle = "#0000ff";
        // context.stroke();
        // context.restore();

    }

    // 상태 원그리기 
    drawItemStatus(ctx) {
        //['출차', '주차', '출차중', '주차중', '주차/출차중', '판단중'];
        console.log('drawItemStatus selAreaData =>', this.selAreaData);
        if (!this.selAreaData || !this.selAreaData.devices) { return; }
        for(let item of this.selAreaData.devices) {
            let color;
            if (item.status == 1) {
                color = 'green';
            } else if (item.status == 0) {
                color = 'grey';
            } else {
                color = 'red';
            }
            this.drawCircle(ctx, item.pos.x, item.pos.y, color);
        }
    }

    drawCircle(ctx, dx, dy, color) {
        // 원그리기
        ctx.beginPath(); 
        // 4. 원 모양 설정 
        ctx.arc(dx, dy, 7, 0, 2 * Math.PI); 
        // 5. 그리기 
        ctx.strokeStyle = color;
        ctx.stroke(); 
        // 6. 원 내부 색 채우기 
        ctx.fillStyle = color; 
        ctx.fill();
    }

    onClickCanvas(event) {
        //alert('dd')
    }

    onClickZoomIn() {
        this.scale /= this.scaleMultiplier;
        this.updateCanvas();
    }

    onClickZoomOut() {
        this.scale *= this.scaleMultiplier;
        this.updateCanvas();

    }
    
    // initController(config: any) {
    //     console.log("BasicLogComponent::initController command=", config);   
    //     config.store.command = 'admin/common/config';
    //     config.store.id = 'basic';
    //     config.title.update = "";
    //     return config;
    // }

    /////////////////////////////////////////////////////////
    //
    // preparedFormControlsConfig() {
    //     let config = {
    //       // 기본정보
    //       //domain: [],
          
    //     };

    //     return config;
    // }

    // //////////////////////////////////////////
    // // overide

    // preparedLoadData(resp) {
    //     console.log("BasicLogComponent::preparedLoadData resp =", resp);
    //     //let data: any = {};
    //     // data.domain = resp.domain.value;
    //     return resp;
    // }

    // //////////////////////////////////////////
    // // overide
    // preparedSaveData(value) {
    //     console.log("BasicLogComponent::preparedLoadData resp =", value);

    //     return value;
    // }

    // startTestServer() {
    //     // setInterval(() => {
    //     //     let rand_0_3 = Math.floor(Math.random() * 4);
    //     //     let rand_0_9_1 = Math.floor(Math.random() * 10);
    //     //     let rand_0_9_2 = Math.floor(Math.random() * 10);
    //     //     let rand_0_9_3 = Math.floor(Math.random() * 10);
    //     //     this.LogStore.create2(`8934123412${rand_0_3}`, `0${rand_0_3}`, `${rand_0_3}.${rand_0_9_2}${rand_0_9_2}`).subscribe(resp => {
            
    //     //     });
    //     // }, 1000);
    // }    

    // startLog() { 
    //     this.loadList();
    //     setInterval(() => {
    //         this.loadList();
    //     }, 1000 * 30);
    // }

    // loadList() {
    //     this.LogStore.list().subscribe(resp => {
    //         console.log('startLog::listAfter resp =>', resp);
    //         this.processLogData(resp);
    //     });
    // }

    // processLogData(data) {
    //     if (!data.list || data.list.length == 0) { return; }

    //     // add log 
    //     let list = data.list.slice().reverse();
    //     for(let item of list) {
    //         let seq = parseInt(item.raw_data_seq);
    //         console.log('processLogData seq, lastSeq =>', seq, this.lastSeq)
    //         if (seq > this.lastSeq) {
    //             if (!seq) { continue; } 
    //             let log = `${item.regist_date}     ${item.raw_data_seq}     ${item.device}    ${item.deviceName}     status:${item.status}     batt:${item.batt}     dr:${item.dr} fCnt:${item.fCnt} fPort:${item.fPort} frequency:${item.frequency}\n`; 
    //             this.logData = log +  this.logData;
    //             this.lastSeq = parseInt(item.raw_data_seq);
    //         }
    //     }

    //     //var textarea = document.getElementById('textarea_id');

    //     //logEl
    //     this.logEl.nativeElement.scrollTop = this.logEl.nativeElement.scrollHeight;
    // }

    // clickViewLog(value) {
        
    // }

   

}
