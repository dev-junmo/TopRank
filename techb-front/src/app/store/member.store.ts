import { Injectable } from '@angular/core';
import { BSApi } from '../../common/core/bs-api';

@Injectable()
export class MemberStore  {

    constructor(public api: BSApi) {}

    get() {
        return this.api.get('member/member');
    }

    getSummary() {
        return this.api.get('member/member-summary');
    }

    findPw(userid, email) {
        let params = {userid: userid, email: email};
        return this.api.post('member/find/password', params);
    }

    useridUniqueCheck(userid) {
        return this.api.get('member/register/usable/userid', {userid: userid}, null, true);
    }

    nicknameUniqueCheck(nickname) {
        return this.api.get('member/register/usable/nickname', {value: nickname}, null, true);
    }

    join(params) {
        return this.api.post('member/signup', params);  // 무료포인트 지급을 위해서 techb project에서 재정의한 회원가입
        //return this.api.post('member/register', params);  // common호출
    }

    editProfile(params) {
        return this.api.put('member/member', params);
    }
}
