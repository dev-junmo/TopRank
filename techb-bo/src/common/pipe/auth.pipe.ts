import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'ahthToString'
})
export class BSAuthToStringPipe implements PipeTransform {
  transform(value): string {

    console.log("BSAuthToStringPipe value =>", value);

    let auth: string = '';

    let etc: Boolean = false;
    let i = 0;
    for(let authCode of value) {

        if (authCode === 'admin') { auth += '관리자'; }
        else if (authCode === 'all') { auth += '전체'; }
        else if (authCode === 'memberall') { auth += '전체회원'; }
        else if (authCode === 'onlybuyer') { auth += '바이어'; }
        else if (authCode === '') { auth += '없음'; }
        else {
            auth == "기타";
            etc = true;
        }

        i++;

        if(i !== value.length) {
            auth += '|';
        }
    }

    if (etc) {
        auth = '기타';
    }

    // let array = value.split(']');
    // console.log("array = ", array);
    // if (array.length > 2) {
    //   auth = "기타";
    //   return auth;
    // }
    // else if (value === "[admin]") auth = "관리자";
    // else if (value === "[all]") auth = "전체";
    // else if (value === "[memberall]") auth = "전체회원";
    // else if (value === "[onlybuyer]") auth = "바이어";
    // else if (value === "[]") auth = "없음";
    // else if (value === "") auth = "없음";

    return auth;
  }
}
