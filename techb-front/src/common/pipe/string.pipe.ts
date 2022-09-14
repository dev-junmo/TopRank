import {Pipe, PipeTransform, Output} from '@angular/core';
import { stringify } from 'querystring';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/*
 * Usage:
 *   value | highlightKeyword:keyword
 * Example:
 *   {{ "string" | highlightKeyword:"s" }}
*/
@Pipe({
    name: 'highlightKeyword'
})
export class BSHighlightKeyowrdPipe implements PipeTransform {

  transform(value: string, keyword: string): string {
    return value.replace(keyword, '<font color="red">' + keyword + '</font>');
  }
}

@Pipe({
    name: 'removeTag'
})
export class BSRemoveTagPipe implements PipeTransform {
    transform(value: string): any {
        let result;
        if (!value)
            result = value;
        else
            result = value.replace(/<.*?>/g, '');

        console.log("BSRemoveTagPipe value, result =>", value, result);

        return result;
    }
}

/*
 * Usage:
 *   value | password:끝에서부터 길이
 * Example:
 *   {{ "string" | password:6 }}
*/
@Pipe({
    name: 'password'
})
export class BSPasswordPipe implements PipeTransform {

  transform(value: string, length: number): string {

    if(!value) return '';

    let index = value.length - length;
    if (index < 0) index = 0;

    let start: string = value.substr(0, index);
    let end: string = '';
    for (let i = 0; i < length; i++) {
        end += '*';
    }

    console.log("BSPasswordPipe start, end ", start, end);
    return start + end;
  }
}

/*
* Usage:
*   value | insertBRTag:length
* Example:
*   {{ "string" | insertBRTag:10 }}
*/

// length마다 <br>을 추가하는데 < > 사이는 수정하지 않는다.

@Pipe({
    name: 'lineBreak'
})
export class BSLineBreakPipe implements PipeTransform {

    transform(value: string, length: number): string {

        if (!value) { return; }

        let output = '';

        let count = 0;
        let sub = '';
        let pass = false;

        for(let ch of value) {
            output += ch;
            count++;

            //if (ch === ' ') { count = 0; }

            // tag 구간 변환 하지 않음
            if (ch === '<') { pass = true; }
            if (ch === '>') { pass = false; count = 0; }

            if (!pass && count > length) {
                output += '<br>';
                count = 0;
            }
        }
        // console.log("sub = ", sub);
        // str = sub;

        // let strs = value.split(' ');

        // console.log("strs = ", strs);
        // for(let str of strs) {
        //     console.log("str=", str);
        //     if (str.length > length) {
        //         let pos = 1;
        //         let sub = '';
        //         let pass = false;
        //         for(let ch of str) {
        //             sub += ch;

        //             // tag 구간 변환 하지 않음
        //             if (ch == '<') { pass = true; }
        //             if (ch == '>') { pass = false; pos = 1; }

        //             if (!pass && pos % length == 0) {
        //                 sub += '<br>';
        //             }
        //             pos++;
        //         }
        //         console.log("sub = ", sub);
        //         str = sub;
        //     }
        //     output += str;
        //     output += ' ';
        // }
        return output;
    }
}

/*
* Usage:
*   value | stringLimit:length
* Example:
*   {{ "string" | stringLimit:10 }}
*/

// 문자열을 정해진 길이 만큼줄이고 뒤에 ...을 붙인다.

@Pipe({
    name: 'stringLimit'
})
export class BSStringLimitPipe implements PipeTransform {

    transform(value: string, length: number): string {

        let output = value;

        if (!output) return output;

        if (length > 3 && output.length > length) {
            output = output.substr(0, length-1);
            output += '...';
        }

        return output;
    }
}


@Pipe({
    name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe  implements PipeTransform {

    constructor(private _sanitizer:DomSanitizer) {
    }

    transform(v):SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(v);
    }
}

@Pipe({
    name: 'replaceHtmlToString'
})
export class ReplaceHtmlToTextPipe  implements PipeTransform {

    constructor() {
    }

    transform(html):String {
        let result: String = "";
     
        if(html != null) {
            result = html;
             
            result = result.replace(/&apos;/g, "'");
            result = result.replace(/&quot;/g, '"');
            result = result.replace(/&gt;/g, ">");
            result = result.replace(/&lt;/g, "<");
            result = result.replace(/&#40;/g, "(");
            result = result.replace(/&#41;/g, ")");
        }
         
        return result;
    }
}

