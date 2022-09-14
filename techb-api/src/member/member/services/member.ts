import { CaService, Logger } from "@common-api/common-api";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { MemberRegisterParam, MemberService, Member } from "@common-api/common-api"

import { PointService } from "../../../point/services/point";
import { Point, PointType } from "../../../point/entities/point";

@Service()
export class TBMemberService extends CaService<Member> { 

    @Inject('MemberService')
    protected service: MemberService;

    @Inject(() => PointService)
    protected pointService: PointService;

    constructor() {
        super();
    }

    async signup(newData: MemberRegisterParam) {
        // 회원생성
        let resp = await this.service.register(newData);
        if (!resp || !resp.member_seq) {
            return resp;
        }
        // 무료포인트 지급
        let _free_point = await this.pointService.addPoint(resp.member_seq, 3000, PointType.free, '회원가입이벤트 무료포인트 지급', 30);
        return resp;
    }
}