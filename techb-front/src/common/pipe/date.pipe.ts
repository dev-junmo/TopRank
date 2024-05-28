import {Pipe, PipeTransform, Output} from '@angular/core';

/*
 * Usage:
 *      4월 12일 오후 4시
 * Example:
 *   {{ "string" | dateKr }}
*/
@Pipe({
    name: 'dateKr'
})
export class BSDateKrPipe implements PipeTransform {

    transform(date: string): string {
        if (!date) return '';

        let _date = new Date(date);
        console.log("date =>", date, _date.getMonth(), _date.getDate(), _date.getHours() , _date.getMinutes());

        let str;
        let strAmPm; //= (_date.getHours() > 12) ? '오후' : '오전';
        let hours = _date.getHours();
        let minutes = _date.getMinutes().toString();
        if (_date.getHours() > 12) {
            strAmPm = 'pm';
            hours -= 12;
        } else {
            strAmPm = 'am';
        }
        if (parseInt(minutes) < 10) {
            minutes = '0' + minutes;
        }

        str = (_date.getMonth() + 1) + "월 " + _date.getDate() + "일 " + " " +  hours + ":" + minutes + strAmPm;

        return str;
    }
}
