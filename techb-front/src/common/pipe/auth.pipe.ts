import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'ahthToString'
})
export class BSAuthToStringPipe implements PipeTransform {

  transform(value: string): string {

    let auth: string = "그룹";

    let array = value.split(']');
    console.log("array = ", array);
    if (array.length > 2) {
      auth = "기타";
      return auth;
    }
    else if (value === "[admin]") auth = "관리자";
    else if (value === "[all]") auth = "전체";
    else if (value === "[memberall]") auth = "전체회원";
    else if (value === "[onlybuyer]") auth = "바이어";
    else if (value === "[]") auth = "없음";
    else if (value === "") auth = "없음";

    return auth;
  }
}
