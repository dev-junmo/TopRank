import { BSApi } from '@bricks/common/core/bs-api';
import { Injectable } from '@angular/core';
import { BSBaseStore } from './bs-base.store';

var area = [
    {
        seq: 1,
        name: '4층'
    },
    {
        seq: 2,
        name: '5층'
    }
];

var parkSpace = [
    {
        seq: 1,
        area: '4층',
        deviceName: 'P1',
        offsetX: 10,
        offsetY: 10,
    },
    {
        seq: 2,
        area: '4층',
        deviceName: 'P2',        
        offsetX: 20,
        offsetY: 20,
    },
    {
        seq: 3,
        area: '4층',
        deviceName: 'P3',
        offsetX: 30,
        offsetY: 30,
    },
    {
        seq: 4,
        area: '5층',
        deviceName: 'P4',
        offsetX: 40,
        offsetY: 40,
    },
    {
        seq: 5,
        area: '5층',
        deviceName: 'P5',
        offsetX: 50,
        offsetY: 50,
    },
]


@Injectable()
export class ParkStore extends BSBaseStore {

    constructor(api: BSApi) {
        super(api);
        //this.command = 'parking/send';
    }

    listArea() {
        return area;
    }
    
    listParkSpace() {
        return parkSpace;
    }
}
