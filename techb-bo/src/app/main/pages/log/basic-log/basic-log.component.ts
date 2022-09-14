import { Component, OnInit, ViewEncapsulation, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BsModalService } from 'ngx-bootstrap/modal';

import { LogStore } from '@app/common/store/log.store';
import * as moment from 'moment';

@Component({
    selector: 'app-basic',
    templateUrl: './basic-log.component.html',
    styleUrls: ['./basic-log.component.css'],
    //encapsulation: ViewEncapsulation.None
})
export class BasicLogComponent extends BSUpdateFormController {

    @ViewChild('logTextArea') logEl: ElementRef;

    private isShowTootip: boolean = false;
    private lastSeq = 0;
    public logData = '';
    public viewLog = 'all';

    public deviceFilterName = 'all';
    public updateSec = '5';
    public lastUpdateTime;

    public list = [];
    private interval;

    constructor (
        baseStore: BSBaseStore,
        public LogStore: LogStore,
        //private bsApi: BSApi,
        protected router: Router,
        arouter: ActivatedRoute,
        alert: BSAlertService,
        public modal: BsModalService) {

        super(baseStore, router, arouter, alert);

      
        //this.startTestServer();
        this.loadList(); 
        this.startLog();
    }

    initController(config: any) {
        console.log("BasicLogComponent::initController command=", config);   
        config.store.command = 'admin/common/config';
        config.store.id = 'basic';
        config.title.update = "";
        return config;
    }

    /////////////////////////////////////////////////////////
    //
    preparedFormControlsConfig() {
        let config = {
          // 기본정보
          //domain: [],
          
        };

        return config;
    }

    //////////////////////////////////////////
    // overide

    preparedLoadData(resp) {
        console.log("BasicLogComponent::preparedLoadData resp =", resp);
        //let data: any = {};
        // data.domain = resp.domain.value;
        return resp;
    }

    //////////////////////////////////////////
    // overide
    preparedSaveData(value) {
        console.log("BasicLogComponent::preparedLoadData resp =", value);

        return value;
    }

    startTestServer() {
        // setInterval(() => {
        //     let rand_0_3 = Math.floor(Math.random() * 4);
        //     let rand_0_9_1 = Math.floor(Math.random() * 10);
        //     let rand_0_9_2 = Math.floor(Math.random() * 10);
        //     let rand_0_9_3 = Math.floor(Math.random() * 10);
        //     this.LogStore.create2(`8934123412${rand_0_3}`, `0${rand_0_3}`, `${rand_0_3}.${rand_0_9_2}${rand_0_9_2}`).subscribe(resp => {
            
        //     });
        // }, 1000);
    }    

    startLog() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.loadList();
        }, 1000 * parseInt(this.updateSec));    
    }

    loadList() {
        //this.deviceName = deviceName;
        let deviceName = this.deviceFilterName;
        if (this.deviceFilterName == 'all') {
            deviceName = '';
        }
        this.LogStore.listByDeviceName(deviceName, 1, 500).subscribe(resp => {
            console.log('startLog::listAfter resp =>', resp);
            this.lastUpdateTime = moment().format();
            this.processLogData(resp);
        });
    }

    processLogData(data) {
        if (!data.list || data.list.length == 0) { return; }

        // adr: true
        // applicationID: "4"
        // applicationName: "IOTAPP"
        // batt: "3.54"
        // data: "MSwzLjU0"
        // devEUI: "2cf7f12032303dca"
        // device: "2cf7f12032303dca"
        // deviceName: "P4"
        // deviceProfileID: "836faa74-4594-40c7-b0c7-c4b037e2046c"
        // deviceProfileName: "IOTDEV_profiles"
        // dr: 0
        // fCnt: 95
        // fPort: 8
        // frequency: "904300000"
        // rawData: "{\"applicationID\":\"4\",\"applicationName\":\"IOTAPP\",\"deviceName\":\"P4\",\"deviceProfileName\":\"IOTDEV_profiles\",\"deviceProfileID\":\"836faa74-4594-40c7-b0c7-c4b037e2046c\",\"devEUI\":\"2cf7f12032303dca\",\"txInfo\":{\"frequency\":904300000,\"dr\":0},\"adr\":true,\"fCnt\":95,\"fPort\":8,\"data\":\"MSwzLjU0\",\"object\":{\"data\":\"1,3.54\"}}"
        // raw_data_seq: "2731"
        // regist_date: "2022-03-02 08:31:52"
        // status: "1"

        // add log 
        let list = data.list.slice();
        let lastTime = [];
        let lastStatus = [];
        let ingTimeGapSec = 60 * 2; // 

        let statusString = ['출차', '주차', '출차중', '주차중', '주차/출차중', '판단중'];

        this.list = list;
        // 새로운 데이타
        // if(!this.list || this.list.length == 0) {
        //     this.list = list;
        // }

        // // 데이타 업데이트 // 위로 추가 한다.
        // if(this.list && this.list[0] && this.list[0].seq < list.seq) {
        //     this.list.unshift(list);
        // }

        this.logData = '';

        for(let item of this.list) {
            // let seq = parseInt(item.raw_data_seq);
            // if (seq <= this.lastSeq) {
            //     console.log('processLogData seq, lastSeq =>', seq, this.lastSeq)
            //     continue; 
            // }
            //if (!seq) { continue; } 

            let status = 5;
            let diff;

            if (!lastTime[item.deviceName]) {
                // 첫데이타의 경우
                let a = moment(item.regist_date);
                let now = moment();
                diff = now.diff(a, 'seconds');
                // if (item.deviceName == this.deviceFilterName || this.deviceFilterName == 'all') {
                //     console.log('processLogData item.deviceName, now, diff  =>', item.deviceName, item.regist_date, now, diff, ingTimeGapSec, item.status);
                // }
            } else {
                let a = moment(item.regist_date);
                let b = moment(lastTime[item.deviceName]);
                diff = b.diff(a, 'seconds');
                // if (item.deviceName == this.deviceFilterName || this.deviceFilterName == 'all') {
                //     console.log('processLogData item.deviceName, diff  =>', item.deviceName, item.regist_date, diff, ingTimeGapSec, item.status, lastStatus[item.deviceName]);
                // }
            }

            if (diff > ingTimeGapSec) {
                status = item.status;
                lastStatus[item.deviceName] = status; 
            } else {
                if (lastStatus[item.deviceName] == 0) {
                    status = 2; // 출차중
                } else if (lastStatus[item.deviceName] == 1) {
                    status = 3; // 주차중
                } else {
                    status = 4; // 주차 또는 출차
                }
            }            
          
            lastTime[item.deviceName] = item.regist_date;  

            let resultString = `${item.deviceName} => status: ${statusString[status]} `; 

            // ${item.raw_data_seq},
            let log = `${item.regist_date},    ${item.device},    ${item.deviceName},     status:${item.status},     batt:${item.batt},    ` + 
                `dr:${item.dr}, fCnt:${item.fCnt}, fPort:${item.fPort}, frequency:${item.frequency},        ${resultString}\n`; 
            this.logData = this.logData + log;

            // if (item.deviceName == this.deviceFilterName || this.deviceFilterName == 'all') {
            //     this.logData = this.logData + log;
            // }
            //this.lastSeq = parseInt(item.raw_data_seq);
        }

        //var textarea = document.getElementById('textarea_id');

        //logEl
        this.logEl.nativeElement.scrollTop = 0; //this.logEl.nativeElement.scrollHeight;
    }

    clickViewLog(value) {
        
    }

    clickDeviceFilter(deviceFilerName) {
        this.deviceFilterName = deviceFilerName;

        this.logData = '';
        this.loadList();
    }

    onChangeSec() {
        this.startLog();            
    }

}
