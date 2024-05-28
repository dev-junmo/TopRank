import { Injectable } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class BSLoadingService {

    static isLoading: number = 0;

    private minTime: number = 500;
    private maxTime: number = 15000;
    //private isMinTimeout: boolean = false;

    private maxTimeoutShow: Array<any> = [];
    private maxTimeoutStart: Array<any> = [];

    private isShow:boolean = false;

    static sessionSeq:number = 0;

    constructor(private loading: Ng4LoadingSpinnerService) {

    }

    nextSession() {
        BSLoadingService.sessionSeq++;

        console.log("BSLoadingService::nextSession sessionSeq => ", BSLoadingService.sessionSeq);
        // for(let max1 of this.maxTimeoutStart)
        //     clearTimeout(max1);
        // for(let max2 of this.maxTimeoutShow)
        //     clearTimeout(max2);
    }

    public start(message = '') {

        BSLoadingService.isLoading++;
        console.log("BSLoadingService::start =>", BSLoadingService.isLoading, message);

        this.loading.show();


        //this.isMinTimeout = false;

        this.hideByMaxTimeoutProcess();

        // min check
        // 최소 min이상은 돌아야 한다.
        // setTimeout(()=> {
        //     this.isMinTimeout = true;

        //     // 최소시간보다 loading이 빨리 끝난경우 여기서 숨겨줌
        //     if (!BSLoadingService.isLoading) {
        //         console.log("loadingbar::start 최소시간 타임아웃 - 숨김");
        //         this._hide();
        //     }
        // }, this.minTime);

    }

    public end(message = '') {
        BSLoadingService.isLoading--;
        console.log("BSLoadingService::end isLoading, message =>", BSLoadingService.isLoading, message);
        // 최소 시간 이상이어야 숨겨짐
        if (/*this.isMinTimeout &&*/ BSLoadingService.isLoading < 1) {
            this._hide();
        }
    }

    private _hide() {
        console.log("BSLoadingService::_hide isLoading =>", BSLoadingService.isLoading);
        this.loading.hide();
        BSLoadingService.isLoading = 0;
    }

    // start와 동일한데 카운트에서 제외된다.
    public show(message='') {
        console.log("BSLoadingService::show isLoading =>", BSLoadingService.isLoading, message);
        this.isShow = true;
        this.loading.show();
        //this.isMinTimeout = false;


        this.hideByMaxTimeoutProcess();

        // min check
        // 최소 min이상은 돌아야 한다.
        // setTimeout(()=> {
        //     this.isMinTimeout = true;

        //     // 최소시간보다 loading이 빨리 끝난경우 여기서 숨겨줌
        //     console.log("loadingbar::show - 최소시간 타임아웃 - 숨김");
        //     //this._hide();

        // }, this.minTime);
    }

    // end와 동일한데 카운트에서 제외된다.
    public hide(message='') {
        console.log("BSLoadingService::hide isLoading =>", BSLoadingService.isLoading, message);
        // 최소 시간 이상이어야 숨겨짐
        //if (this.isMinTimeout) {
            //console.log("loadingbar - 숨김");
            this.isShow = false;
            this._hide();
        //}
    }

    hideByMaxTimeoutProcess() {
        // timeout
        // let maxTimeoutShow = setTimeout(()=>{
        //     console.log("loadingbar::maxTimeoutShow 최대시간 타임아웃 - hide");
        //     this._hide();
        // }, this.maxTime);

        // this.maxTimeoutStart.push(maxTimeoutShow);

        let session = BSLoadingService.sessionSeq;
        // timeout
        setTimeout(()=>{
            console.log("BSLoadingService::timeout - 최대시간 타임아웃 hide session =>", session, BSLoadingService.sessionSeq);
            if (session == BSLoadingService.sessionSeq) {
                this._hide();
            } else {
                // 만약에 세션이 달라서 hide안되었다면 10초후에  숨김
                // 안전 숨긴처리

                if (this.isShow) {
                    setTimeout(() => {
                        console.log("BSLoadingService::숨김 -  최대시간 세션이 달라서 20초 후 안전처리");
                        this._hide();
                    }, 20000);
                }
            }
        }, this.maxTime);
    }
}
