import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { PointChargeCreateParams } from "../services/point_charge";
import { PointChargeModel } from "../models/point_charge";
import { PointChargeFilter } from "../models/point_charge";
import { PointChargeService } from "../services/point_charge";
import { Inject } from "typedi";

// point
import { PointFilter } from "../models/point";
import { PointCreateParams, PointService, PointUpdateParam } from "../services/point";

@SJsonController('/point/point-charge') 
export class PointChargeController extends CaController { 

    @Inject(()=> PointChargeService)
    protected service: PointChargeService;

    constructor() {
        super();
    }

    // 회원의 충전포인트 내역 조회
    @Get()
    @MemberAuthorized()    
    public async list(@QueryParams() filter: PointFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging, @CurrentUser()user?: UserSession) {
        // filter
        filter['member_seq'] = user.getMemberSeq();
        return await this.service.list(filter, order, paging);
    }
   
    //포인트 충전
    @Post()
    @MemberAuthorized()
    public async create(@Body() params: PointChargeCreateParams, @CurrentUser()user?: UserSession) {
        return await this.service.createFromExport(params, user.getMemberSeq());
    }    
}

@SJsonController('/point/point-charge-info') 
export class PointChargeInfoController extends CaController { 

    @Inject(()=> PointChargeService)
    protected service: PointChargeService;

    constructor() {
        super();
    }

    //회원의 포인트, 입금할 은행 정보 - 키워드 구매하기 에서 사용
    @Get()
    @MemberAuthorized()
    public async get(@CurrentUser()user?: UserSession) {
        return await this.service.getChargeInfo(user.getMemberSeq());
    }
}


