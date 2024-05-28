import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

// ['출차', '주차', '출차중', '주차중', '주차/출차중', '판단중'];

@Injectable()
export class LogStore extends BSBaseStore {

    private area = [{
        name: '4층', 
        mapUrl: '/assets/img/park/park-centro-4.png',
        devices: [
            {
                deviceId: '',
                deviceName: 'P2', 
                pos : {
                    x: 312,
                    y: 636,    
                },
                status: '출차'  // 변하는 값
            },
            {
                deviceId: '',
                deviceName: 'P5', 
                pos : {
                    x: 80,
                    y: 443,    
                },
                //status: '주차'
            },
        ]
    },{
        name: '5층', 
        mapUrl: '/assets/img/park/park-centro-5.png',
        devices: [
            {
                deviceId: '',
                deviceName: 'P1', 
                pos : {
                    x: 685,
                    y: 636,    
                },
                status: '출차'
            },
            {
                deviceId: '',
                deviceName: 'P3', 
                pos : {
                    x: 615,
                    y: 636,    
                },
                //status: '주차'
            },
        ]}, 
    ];

    constructor(api: BSApi) {
        super(api);
        this.command = 'rawdata';
    }

    create2(device, status, batt) {
        let params = {
            device: device,
            status: status,
            batt: batt
        };
        return this.api.post(this.command, params);
    }
    
    listByDeviceName(deviceName, page = 1, limit = 100) {
        let params = {
            'paging[page]': page,
            'paging[limit]': limit,
            'order[0][column]' : 'raw_data_seq',
            'order[0][dir]': 'desc',
        }   

        if (deviceName && deviceName.length > 0) {
            params['deviceName'] = deviceName;
        }
        return this.api.get(this.command, params);
    }

    getParkStateData(areaName) {
        // 현재의 모든 주차공간의 상태를 가져온다.
        return this.listLastStatus().map(resp => {    
            let _resp = this.updateStatusInAreaData(areaName, this.area, resp); 
            console.log('getParkStateData areaName, _resp =>', areaName, _resp);
            _resp.stats = this._getStatisticsData(areaName, _resp.devices);
            return _resp;
        });
    }
    
    getParkStatisticsData(areaName) {
        if (!areaName) {
            return this.getAllParkStatisticsData();
        }
        // 현재의 모든 주차공간의 상태를 가져온다.
        return this.listLastStatus().map(resp => {    
            let _resp = this.updateStatusInAreaData(areaName, this.area, resp); 
            console.log('getParkStatisticsData areaName, _resp =>', areaName, _resp);
            return this._getStatisticsData(areaName, _resp.devices);
        });
    }
    // area별로 통계데이타 요청
    getAllParkStatisticsData() {
        // 현재의 모든 주차공간의 상태를 가져온다.
        return this.listLastStatus().map(resp => {
            // [P3: '1', P1: '1', P4: '1'] -> [{deviceId: '', deviceName: 'P1', pos: {…}, status: 1},,]
            let parkSpaces = [];
            Object.keys(resp).forEach(key => {
                let obj = {
                    deviceName: key,
                    status: resp[key]
                }
                parkSpaces.push(obj);
            });
            console.log('getAllParkStaticsData parkSpaces =>', parkSpaces);
            return this._getStatisticsData('', parkSpaces);
        });
    }

    // area 데이타에서 상태 정보만 갱신한다.
    // parkSpace [P3: '1', P1: '1', P4: '1']
    updateStatusInAreaData(areaName, areas, parkSpace) {
        for(let area of areas) {
            for(let device of area.devices) {
                if (parkSpace[device.deviceName]) {
                    device.status = parseInt(parkSpace[device.deviceName]); // 상태값
                } else {
                    device.status = 5; // 판단불가
                }
            }
        }
        console.log("updateStatusInAreaData areas =>", areas);
        let resp;
        for(let area of areas) {
            if (area.name == areaName) {
                resp = area;
            }
        }
        return resp;
    }

    // parkspace
    listLastStatus() {
        let limit = 500;
        let params = {
            'paging[page]': 1,
            'paging[limit]': limit,
            'order[0][column]' : 'raw_data_seq',
            'order[0][dir]': 'desc',
        }

        return this.api.get(this.command, params)
            .map(resp => { return this.processLogData(resp); });
    }

    // listStatusDisplay(areaName) {
    //     let limit = 500;
    //     let params = {
    //         'paging[page]': 1,
    //         'paging[limit]': limit,
    //         'order[0][column]' : 'raw_data_seq',
    //         'order[0][dir]': 'desc',
    //     }

    //     return this.api.get(this.command, params)
    //         .map(resp => {
    //             let data = this.processLogData(resp); 
    //             return this.processStatisticsData(areaName, data);
    //         });
    // }

    listAreas() {
        // 임시  area data
        let area = [{
            name: '4층', 
            mapUrl: '/assets/img/park/park-centro-4.png',
        },{
            name: '5층', 
            mapUrl: '/assets/img/park/park-centro-5.png',
        }];

        const subject = new Subject<any>();
        setTimeout(() => {
            subject.next(area);
        }, 1);
        return subject;
    }

    // listStatusDisplayByArea(areaName) {
    //     let limit = 500;
    //     let params = {
    //         'paging[page]': 1,
    //         'paging[limit]': limit,
    //         'order[0][column]' : 'raw_data_seq',
    //         'order[0][dir]': 'desc',
    //     }

    //     return this.api.get(this.command, params)
    //         .map(resp => { return this.processLogData(resp); });
    // }

    listAfter(latestSeq = undefined) {
        let params = {};
        if (latestSeq) {
            params = {
                // raw_data_seq: latestSeq,
                // except_under_seq: 'except',
                'paging[page]': '1',
                'paging[limit]': '1000',
                'order[0][column]' : 'regist_date',
                'order[0][dir]': 'desc',
            }    
        }
        return this.api.get(this.command, params);
    }

    processLogData(data) {
        if (!data.list || data.list.length == 0) { return; }

        let resp = [];
        let list = data.list; //data.list.slice();
     
        let lastTime = [];
        let lastStatus = [];
        let ingTimeGapSec = 60 * 2; // 2분

        let statusString = ['출차', '주차', '출차중', '주차중', '주차/출차중', '판단중'];

        for(let item of list) {
            let status = 5;
            let diff; // 시간 차
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

            // 기준 시간 이상 차
            if (diff > ingTimeGapSec) {
                status = item.status;   // 값 그대로 확정
                lastStatus[item.deviceName] = status; 
            } else {
                // 출차 -> 출차중
                if (lastStatus[item.deviceName] == 0) {
                    status = 2; // 출차중
                } else if (lastStatus[item.deviceName] == 1) {
                    // 주차 -> 주차중
                    status = 3; // 주차중
                } else {
                    // 미확정 중
                    status = 4; // 주차 또는 출차
                }
            }   
          
            lastTime[item.deviceName] = item.regist_date;  

            // 각 device별로 최종의 상태값 저장 
            if (item.deviceName && !resp[item.deviceName]) {
                resp[item.deviceName] = status;
            }
        }
        console.log('processLogData resp =>', resp);
        return resp;
    }
    
    // [P3: '1', P1: '1', P4: '1']
    // [{deviceId: '', deviceName: 'P1', pos: {…}, status: 1},,]
    _getStatisticsData(areaName, parkSpaces) {
        // ['출차', '주차', '출차중', '주차중', '주차/출차중', '판단중']
        console.log('_getStatisticsData data =>', parkSpaces);
        if (!areaName) {
            areaName = '전체';
        }
        let stats = {
            name: areaName,
            parkState: {
                park: 0,
                exit: 0,
                issue: 0
            },
            operState: {
                normal: 0,
                abnormal: 0,
                issue: 0
            },
            parkStatics: {
                park: 0,
                exit: 0,
                issue: 0
            },
            operStatics: {
                normal: 0,
                abnormal: 0,
                issue: 0
            }
        };

        for(let item of parkSpaces) {
            if (item.status == 0) {
                stats.parkState.exit++;
            } else if (item.status == 1) {
                stats.parkState.park++;
            } else {
                stats.parkState.issue++;
            }
        }

        // stats
        let total = stats.parkState.park + stats.parkState.exit + stats.parkState.issue;
        stats.parkStatics.park = stats.parkState.park / total;
        stats.parkStatics.exit = stats.parkState.exit / total;
        stats.parkStatics.issue = stats.parkState.issue / total;

        console.log('_getStatisticsData stats =>', stats);
        return stats;
    }

   
}
