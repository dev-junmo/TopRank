import {Pipe, PipeTransform, Output} from '@angular/core';
import { stringify } from 'querystring';
import { Dictionary } from './dictionary';

@Pipe({
    name: 'fieldTrans'
})
export class FieldTransPipe implements PipeTransform {

    transform(message) {
        return Dictionary.KOR(message);
    }
}
