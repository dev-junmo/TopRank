import { Injectable } from '@angular/core';

@Injectable()
export class BSUUIDService {

    static _seq:number = 0;

    constructor() { }

    public seq() {
        return ++BSUUIDService._seq;
    }
}
