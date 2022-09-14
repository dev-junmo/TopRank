import { Component ,ViewChild , Input, ElementRef} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

@Component({
  selector: 'bs-chart',
  templateUrl: './bs-chart.component.html',
  styleUrls: ['./bs-chart.component.css']
})
export class BsChartComponent {
    @ViewChild('basechart', {read: BaseChartDirective}) private basechart: BaseChartDirective;
    @ViewChild("basechart") elBaseChart: ElementRef;
    
    // public visitorData:number[] = [350, 450, 100];  // 데이타
    // public visitorlabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']; // 라벨
    // public visitorchartType:string = 'bar';  // 타입  
    @Input() data:Array<any> = null; 
    @Input() datasets:any = null; 
    @Input() labels = null;
 
    //   @Input() colors:Array<any>= [
    //     { 
    //       backgroundColor: ['#f3001e','#d6d6d6'],
    //       borderColor: ['#fff','#fff'],
    //       borderWidth: '0',
    //     }];

    @Input() colors:Array<any>;
    
    // = [{
    //         borderColor: 'rgb(255,140,164)',
    //         pointColor: 'rgb(255,140,164)',
    //         pointBorderColor: 'rgb(255,140,164)',
    //         pointBackgroundColor: 'rgb(255,140,164)',
    //         borderWidth: '1',
    //         pointStyle: 'circle',
    //         fill: false,
    //     },
    //     {
    //       borderColor: 'rgb(255,192,129)',
    //       pointColor: 'rgb(255,192,129)',
    //       pointBorderColor: 'rgb(255,192,129)',
    //       pointBackgroundColor: 'rgb(255,192,129)',
    //       borderWidth: '1',
    //       pointStyle: 'circle',
    //       fill: false,
    //     },
    //     {
    //       borderColor: 'rgb(255,219,135)',
    //       pointColor: 'rgb(255,219,135)',
    //       pointBorderColor: 'rgb(255,219,135)',
    //       pointBackgroundColor: 'rgb(255,219,135)',
    //       borderWidth: '1',
    //       pointStyle: 'circle',
    //       fill: false,
    //     },
    //     {
    //       borderColor: 'rgb(140,214,214)',
    //       pointColor: 'rgb(140,214,214)',
    //       pointBorderColor: 'rgb(140,214,214)',
    //       pointBackgroundColor: 'rgb(140,214,214)',
    //       borderWidth: '1',
    //       pointStyle: 'circle',
    //       fill: false,
    //     },
    //     {
    //       borderColor: 'rgb(101,184,239)',
    //       pointColor: 'rgb(101,184,239)',
    //       pointBorderColor: 'rgb(101,184,239)',
    //       pointBackgroundColor: 'rgb(101,184,239)',
    //       borderWidth: '1',
    //       pointStyle: 'circle',
    //       fill: false,
    //     },
    //     {
    //       borderColor: 'rgb(188,154,255)',
    //       pointColor: 'rgb(188,154,255)',
    //       pointBorderColor: 'rgb(188,154,255)',
    //       pointBackgroundColor: 'rgb(188,154,255)',
    //       borderWidth: '1',
    //       pointStyle: 'circle',
    //       fill: false,
    //     },       
    // ];

    @Input() chartType:string = 'doughnut';
    @Input() width:any;
    @Input() height:any;  

    // @Input() options:any=[{      
    //     cutoutPercentage: 83, 
    //     title: {
    //         display: false,
    //     },
    //     tooltips: {
    //         intersect: false,
    //         mode: 'nearest',
    //         xPadding: 0,
    //         yPadding: 0,
    //         caretPadding: 0
    //     },
    //     legend: {
    //         display: true
    //     },
    //     responsive: false,
    //     devicePixelRatio:10,
    //     maintainAspectRatio: false,
    //     barRadius: 4,
    //     animation:false,
    //     //cutoutPercentage: 90,
    //     scales: {
    //         xAxes: [{
    //             display: false,
    //             gridLines: {
    //                 offsetGridLines: true
    //             },
    //             stacked: true,
    //         }],
    //         yAxes: [{
    //             display: false,
    //             stacked: true,
    //             gridLines: false
    //         }]
    //     },
    //     layout: {
    //         padding: {
    //             left: 0,
    //             right: 0,
    //             top: 0,
    //             bottom: 0
    //         }
    //     },
    // }];

    // TopRank 통계에 사용하는 옵션
    @Input() options:any= {
        animation:false,
        elements: {
            line:{
                tension:0,
            }
        },
        responsive: true,
        layout: {
            padding:{
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        },
        legend: {
            display: true
        },
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [
                {
                gridLines: {
                    borderColor: 'rgb(221,221,221)',
                    borderWidth: 1,
                    display: true
                }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        borderColor: 'rgb(221,221,221)',
                        borderWidth: 1,
                        display: true
                    },
                    ticks: {
                        //min: 0,
                        //beginAtZero: true,
                        callback: function(value, index, values) {
                            return numberWithCommas(value);
                        }
                    }
                }
            ]
        }
    };
  
    constructor() {
        console.log('BsChartComponent::constructor',this.data);
        // this.basechart.chart.defaults.global.legend.display;
    } 

    public setCutoutPercentage(percent: number) {
        this.options.cutoutPercentage = percent;
    }

    
    public update() {
        this.basechart.chart.update();
        //this.basechart.refresh();
    }

    public refresh() {
        //this.basechart.refresh(); // error

        if (this.chartType == 'line') {
            for(let data of this.datasets) {
                data.fill = false;
            }    
        }
       
        this.basechart.ngOnDestroy();
        this.basechart.chart = this.basechart.getChartBuilder(this.basechart.ctx /*, data, this.options*/);
    }
    // public clear(){
    //     this.basechart.chart.clear(); 
    // }

    // public draw(text){
    //     this.basechart.chart.clear();
    //     this.basechart.chart.toBase64Image();
    //     console.log("text" , text)
        

    //     let self = this;
    //     Chart.pluginService.register({            
    //         afterDatasetsDraw  : function (chart) {
                
    //             if (self.basechart.chart != chart) return;
    //             chart.config.options.elements.center.text2 = text
                
    //             Chart.defaults.global.responsive = true;
    //             console.log(chart);
                

    //             if (chart.config.options.elements.center) {
    //                 var helpers = Chart.helpers;
    //                 var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    //                 var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    //                 var ctx = chart.chart.ctx;
    //                 console.log("center",chart.config.options.elements.center);

    //                 ctx.save();

    //                 var fontSize = helpers.getValueOrDefault(chart.config.options.elements.center.fontSize, Chart.defaults.global.defaultFontSize);
    //                 var fontStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontStyle, Chart.defaults.global.defaultFontStyle);
    //                 var fontFamily = helpers.getValueOrDefault(chart.config.options.elements.center.fontFamily, Chart.defaults.global.defaultFontFamily);
    //                 var font = helpers.fontString(chart.config.options.elements.center.fontSize, fontStyle, fontFamily);
    //                 ctx.font = font;
    //                 ctx.fillStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontColor);
    //                 ctx.textAlign = 'center';
    //                 ctx.textBaseline = 'middle';
    //                 ctx.fillText(chart.config.options.elements.center.text, centerX, centerY - chart.config.options.elements.center.centerY);

    //                 // draw horizontal line
    //                 // ctx.fillStyle = "#dadada";
    //                 // ctx.fillRect(centerX - chart.innerRadius / 2, centerY, chart.innerRadius, 1);

    //                 //draw text second line
    //                 font = helpers.fontString(chart.config.options.elements.center.fontSize2, chart.config.options.elements.center.fontStyle2, fontFamily);
    //                 ctx.fillStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontColor2);
    //                 ctx.font = font;
    //                 ctx.fillText(chart.config.options.elements.center.text2, centerX, centerY + chart.config.options.elements.center.centerY2);

    //                 ctx.restore();
                   

    //             }
    //         },
    //     })
    // }
    public addData(data){
        this.basechart.chart.data.push();
        this.basechart.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        this.basechart.chart.update();

    }

    ngAfterViewInit() {}
        
       


}
declare var Chart: any;
