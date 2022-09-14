import { Injectable } from '@angular/core';
import { BSApi } from '../../common/core/bs-api';

@Injectable()
export class BSBaseStore {

    public command : string;
    constructor(api: BSApi, command: string) {
        this.command = command;
    }

}
