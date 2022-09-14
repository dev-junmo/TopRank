import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';

import { BsChartComponent } from '@bricks/ui/bs-chart/bs-chart.component';
//import { BsModalPopupComponent } from './bs-modal-popup/bs-modal-popup.component';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { DashBoardStore } from '@app/common/store/dashBoard.store';
import { AppConfigService } from '@app/providers/service/app-config.service';

import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';
import { BSAlertService } from '../../../../common/ui/bs-alert/index';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('mainChart1', { read: BsChartComponent }) mainChart1: BsChartComponent;
    @ViewChild('templateNotice') templateNotice: TemplateRef<any>;

   

    // #todo
    public Today_stats = {
        Today_total_count: 0,
        Today_total_price: 0,
        Today_member: 0,
        Today_visitor: 0,
    };

    public clientURL: string = this.appConfig.clientURL;

    public width: any = "700";
    public height: any = "378";

    public memberStatsData: Array<any> = [];
    public visitStatsData: Array<any> = [];
    public memberStatsLabels: Array<any> = [];
    public visitStatsLabels: Array<any> = [];

    ///////////////////////////////////////////////////
    // 매출 통계 챠트용 데이타
    public salesStatsData: any = {
        monthly: { 
            dataset: [{ data: [], label: '' }],
            labels:[] 
        },
        daily: { 
            dataset: [{ data: [], label: '' }],
            labels:[] 
        },
        hourly: { 
            dataset: [{ data: [], label: '' }],
            labels:[] 
        }
    };
    public curStatsData = { 
        dataset: [{ data: [], label: '' }],
        labels:[] 
    };
    
    public chartType: string = 'bar';  // 타입
    public colors: Array<any> = [
        {
            backgroundColor: 'rgb(68,94,188)',
            borderWidth: '1',
        },
        {
            backgroundColor: 'rgb(211,60,52)',
            borderWidth: '1',
        },
    ];
    public options: any = {
        animation: false, // 지금은 true하면 오류남
        elements: {
            line: {
                tension: 0,
            }
        },
        responsive: true,
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 0,
                bottom: 100
            }
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        tooltips: {
            enabled: true,
        },
        scales: {
            xAxes: [{
                gridLines: {
                    borderColor: "black",
                    borderWidth: 1,
                    display: true,
                }
            }],
            yAxes: [{
                gridLines: {
                    borderColor: "black",
                    borderWidth: 1,
                    display: true,
                },
                ticks: {
                    // max: 30,
                    // min: 0,
                    // stepSize: 5,
                    beginAtZero: true,
                    precision: 0
                    // fixedStepSize: 1
                },
            }]
        }
    };
    /////////////////////////////////////////// chart data

    closeResult: string;
    loading = true
    public goodsStatus;
    public orderStatus;
    private replyGoodsqna;
    private replyMbqna;
    public dashData;

    private questionActive = 'none';
    public goodsQuestionActive = 'none';
    private goodsSaleActive = 'today';
    private CartActive = 'today';
    private ProviderQuestionActive = 'none';

    public noticeList;
    public noticeListViewCheck;
    public noticeItem;
    public noticeCount = 0;
    public noticeIndex = 0;
    public noShowToday: boolean = false;

    constructor(private router: Router,
        private dashBoardStore: DashBoardStore,
        private datePipe: DatePipe,
        public appConfig: AppConfigService,
        private modalService: BOModalDialogService,
        private alert: BSAlertService
        ) {
    }

    ngOnInit() {
        // this.dashBoardStore.get().subscribe(resp => {
        //     console.log('ngOnInit:dashBoardStore resp =>', resp);
        //     this.dashData = resp;
        //     this.orderStatus = resp.order_status;
        //     this.goodsStatus = resp.goods_status;
        //     this.replyGoodsqna = resp.reply_goodsqna;
        //     this.replyMbqna = resp.reply_mbqna;
 
        //     // 통계 데이타
        //     if (resp.month_stats) {
        //         this.salesStatsData.monthly = resp.month_stats; 
        //         this.curStatsData = this.salesStatsData.monthly; 
        //     }
        //     if (resp.day_stats) {
        //         this.salesStatsData.daily = resp.day_stats; 
        //     }
        //     if (resp.hour_stats) {
        //         this.salesStatsData.hourly = resp.hour_stats; 
        //     }
 
        //     setTimeout(()=>{
        //         this.mainChart1.refresh();
        //     }, 1);

        //     console.log('ngOnInit:dashBoardStore salesStatsData, curStatsData, mainChart1 =>', this.salesStatsData, this.curStatsData, this.mainChart1);

        //     // 챠트 데이타 입력 형식
        //     // public barChartData: ChartDataSets[] = [
        //     //     { data: [65, 59, 80, 81, 56, 55, 40], label: '매출' },
        //     //     { data: [28, 48, 40, 19, 86, 27, 90], label: '매출이익' }
        //     // ];
            

        //     // for(let item of resp.get_member_stats){
        //     //   this.memberStatsData.push(item.member_count);
        //     //   this.memberStatsLabels.push(item.regist_date);
        //     // }
        //     // for(let item of resp.get_visit_stats){
        //     //   this.visitStatsData.push(item.visit_count);
        //     //   this.visitStatsLabels.push(item.visit_date);
        //     // }

        //     // if (this.mainChart1) {
        //     //     this.mainChart1.update();
        //     //     console.log('ngOnInit:dashBoardStore mainChart1 =>', this.mainChart1);
        //     // }

        //     if (this.replyMbqna) {
        //         for (let item of this.replyMbqna) {
        //         item.regist_date = this.datePipe.transform(item.regist_date, 'yyyy-MM-dd');
        //         }
        //     }

        //     if (this.replyGoodsqna) {
        //         for (let item of this.replyGoodsqna.list) {
        //         item.regist_date = this.datePipe.transform(item.regist_date, 'yyyy-MM-dd');
        //         }
        //     }
        // });

        // // 입점사 공지사항 팝업 호출
        // if (this.appConfig.isProvider) {
        //   this.dashBoardStore.getBoardNoticePopup().subscribe(resp => {
        //     if (resp.list && resp.list.length > 0) {
        //       this.noticeList = resp.list;
        //       this.noticeItem = resp.list[0];
        //       this.noticeCount = resp.list.length;
        //       this.noticeIndex = 0;

        //       this.noticeListViewCheck = new Array<any>(this.noticeCount);

        //       let i = 0;
        //       for(let item of this.noticeList) {
        //         this.noticeListViewCheck[i] = false;
        //         i++;
        //       }
        //       this.noticeListViewCheck[0] = true;

        //       console.log('HomeComponent::ngOnInit resp, noticeListViewCheck =>', resp, this.noticeListViewCheck);

        //       setTimeout(() => {
        //         this.popupNoticeBoard();
        //       }, 1000);
        //     }
        //   });
        // }

      
    }

    ngAfterViewInit() {
        // setTimeout(()=>{
        //     this.mainChart1.update();
        //   },500);
    }

    clickQuestionTab(status) {
        this.questionActive = status;
    }

    clickGoodsQuestionTab(status) {
        this.goodsQuestionActive = status;
    }

    clickgoodsSaleTab(status) {
        this.goodsSaleActive = status;
    }

    clickProviderQuestionTab(status) {
        this.ProviderQuestionActive = status;
    }
    clickCartTab(status) {
        this.CartActive = status;
    }

    onClickProviderLink(url, queryParams = null) {

        let _url;
        if(this.appConfig.isProvider) {
        _url = "/provider/" + url;
        } else {
        _url = url;
        }

        let _extParams: any = {};
        if (queryParams) {
            _extParams = { queryParams: queryParams};
        }

        console.log('onClickProviderLink _extParams =>', _extParams);

        this.router.navigate([_url], _extParams);
    }


    //   navigationInterceptor(event: RouterEvent): void {
    //     if (event instanceof NavigationStart) {
    //       this.loading = true
    //     }
    //     if (event instanceof NavigationEnd) {
    //       this.loading = false
    //     }

    //     // Set loading state to false in both of the below events to hide the spinner in case a request fails
    //     if (event instanceof NavigationCancel) {
    //       this.loading = false
    //     }
    //     if (event instanceof NavigationError) {
    //       this.loading = false
    //     }

    //     // this.mainChart.update();
    //     // console.log("update",this.mainChart);
    //   }

    popupNoticeBoard() {
        // 하루동안 보지 않기
        var cookiedata = document.cookie;
        console.log("set mainPopupItem cookiedata, index =>", cookiedata, cookiedata.indexOf("todayCookieTVM_notice=done"));
        
        // 쿠키가 없으면
        if ( cookiedata.indexOf("todayCookieTVM_notice=done") < 0 ) {
          this.modalService.popup(this.templateNotice, '입점사 공지사항', '확인' , null , {autoClose: false}, 'large').subscribe((resp) => {

              if (this.noShowToday) {
                  this.setCookieMobile( "todayCookieTVM_notice", "done" , 1);
              }

              for(let view of this.noticeListViewCheck) {
                if(view == false) {
                  this.alert.show("아직 읽지 않은 공지사항이 있습니다.<br>모두 확인 후 창을 닫아주세요.<br>상단에 '다음'버튼을 눌러주세요.");
                  return;
                }
              }

              this.modalService.hide();

              // if (resp == "OK") {
                
              // } else if (resp == "CANCEL") {
               
              // }
          });
        }
    }

    setCookieMobile (name, value, expiredays ) {
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );  // 1일
        document.cookie = name + "=" + value + "; path=/; expires=" + todayDate.toUTCString() + ";";
        console.log("setCookieMobile =>", document.cookie);
    }

    // 이전
    onClickReadBefore() {
        this.noticeIndex--;
        if (this.noticeIndex < 0) {
          this.noticeIndex = 0;
        }
        this.noticeItem = this.noticeList[this.noticeIndex];
        this.noticeListViewCheck[this.noticeIndex] = true;
    }

    // 다음
    onClickReadNext() {
        this.noticeIndex++;
        if (this.noticeIndex >= this.noticeCount) {
            this.noticeIndex = this.noticeCount - 1;
        }
        this.noticeItem = this.noticeList[this.noticeIndex];
        this.noticeListViewCheck[this.noticeIndex] = true;
    }

    // 매출통계 그래프 월별, 일별, 시간별 
    onChangeStaticPeriod(value) {
        if (value == "monthly") {
            this.curStatsData = this.salesStatsData.monthly;
        } else if (value == "daily") {
            this.curStatsData = this.salesStatsData.daily;
        } else if (value == "hourly") {
            this.curStatsData = this.salesStatsData.hourly;
        }

        setTimeout(()=>{
            this.mainChart1.refresh();
        }, 1);
    }

}
