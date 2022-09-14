import { Component ,ViewChild , Input, ElementRef, Renderer} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
/*


    BO에서 사용안함
    정리필요
















*/
@Component({
  selector: 'bs-chart1',
  templateUrl: './bs-chart.component.html',
  styleUrls: ['./bs-chart.component.css']
})
export class BsChartComponent {
  @ViewChild('basechart', {read: BaseChartDirective}) private basechart: BaseChartDirective;
  @ViewChild("basechart") elBaseChart: ElementRef;

  // public visitorData:number[] = [350, 450, 100];  // 데이타
  // public visitorlabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']; // 라벨
  // public visitorchartType:string = 'bar';  // 타입
  @Input() data:number[];
  @Input() labels:string[];
  @Input() colors:Array<any>;
  @Input() chartType:string;
  @Input() width:any;
  @Input() height:any;
  @Input() options:any=[{
    title: {
      display: false,
    },
    tooltips: {
        intersect: false,
        mode: 'nearest',
        xPadding: 0,
        yPadding: 0,
        caretPadding: 0
    },
    legend: {
        display: false
    },
    responsive: false,
    devicePixelRatio:10,
    maintainAspectRatio: false,
    barRadius: 4,
    animation:false,
    //cutoutPercentage: 90,
    scales: {
        xAxes: [{
            display: false,
            gridLines: {
                offsetGridLines: true
            },
            stacked: true,
        }],
        yAxes: [{
            display: false,
            stacked: true,
            gridLines: false
        }]
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
  }];

    constructor(private renderer: Renderer) {
        console.log('BsChartComponent::constructor',this.data);
        // this.basechart.chart.defaults.global.legend.display;
    }

    public setCutoutPercentage(percent: number) {
        this.options.cutoutPercentage = percent;
    }


    public update() {
        //this.basechart.ctx.canvas
        // this.basechart.chart.options.cutoutPercentage = this.options.cutoutPercentage;
        // this.basechart.chart.defaults.global.legend.display;
        this.basechart.chart.update();
    }
    // public clear(){
    //     this.basechart.chart.clear();
    // }

    public draw(text){
        this.basechart.chart.clear();
        this.basechart.chart.toBase64Image();
        console.log("text" , text)


        let self = this;
        Chart.pluginService.register({
            afterDatasetsDraw  : function (chart) {

                if (self.basechart.chart != chart) return;
                chart.config.options.elements.center.text2 = text

                Chart.defaults.global.responsive = true;
                console.log(chart);


                if (chart.config.options.elements.center) {
                    var helpers = Chart.helpers;
                    var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                    var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                    var ctx = chart.chart.ctx;
                    console.log("center",chart.config.options.elements.center);

                    ctx.save();

                    var fontSize = helpers.getValueOrDefault(chart.config.options.elements.center.fontSize, Chart.defaults.global.defaultFontSize);
                    var fontStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontStyle, Chart.defaults.global.defaultFontStyle);
                    var fontFamily = helpers.getValueOrDefault(chart.config.options.elements.center.fontFamily, Chart.defaults.global.defaultFontFamily);
                    var font = helpers.fontString(chart.config.options.elements.center.fontSize, fontStyle, fontFamily);
                    ctx.font = font;
                    ctx.fillStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontColor);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(chart.config.options.elements.center.text, centerX, centerY - chart.config.options.elements.center.centerY);

                    // draw horizontal line
                    // ctx.fillStyle = "#dadada";
                    // ctx.fillRect(centerX - chart.innerRadius / 2, centerY, chart.innerRadius, 1);

                    //draw text second line
                    font = helpers.fontString(chart.config.options.elements.center.fontSize2, chart.config.options.elements.center.fontStyle2, fontFamily);
                    ctx.fillStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontColor2);
                    ctx.font = font;
                    ctx.fillText(chart.config.options.elements.center.text2, centerX, centerY + chart.config.options.elements.center.centerY2);

                    ctx.restore();


                }
            },
        })
    }
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
