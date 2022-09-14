import {Pipe, PipeTransform, Output} from '@angular/core';
import { stringify } from 'querystring';


@Pipe({
    name: 'safeHttpUrl'
})
export class SafeHttpUrlPipe  implements PipeTransform {

    constructor() {
    }

    transform(message) {

        console.log('SafeHttpUrlPipe::transform message =>', message);
        if(message) {
            let _message = message.toLowerCase();
            if( _message.substring(0, 7) !== 'http://' && _message.substring(0, 8) !== 'https://') {
                message = 'http://' + message;
            }
        }

        return message;
    }
}
