import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession, AdminAuthorized } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { RewardPointCreateParams, RewardPointService, RewardPointUpdateParam } from "../services/reward_point";
import { RewardPointFilter } from "../models/reward_point";
import { RewardPoint, RewardStateType } from "../entities/reward_point";
import { Inject } from "typedi";


@SJsonController('/point/reward-point') 
export class RewardPointController extends CaController { 

    @Inject(()=> RewardPointService)
    protected service: RewardPointService;

    constructor() {
        super();
    }

    // 회원의 충전포인트 내역 조회
    @Get()
    @MemberAuthorized()    
    public async list(@QueryParams() filter: RewardPointFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging, @CurrentUser()user?: UserSession) {
        // filter
        filter['member_seq'] = user.getMemberSeq();
        return await super.list(filter, order, paging);
    }

    // 회원의 리워드포인트 합계 
    @Get('/balance')
    @MemberAuthorized()       
    public async get(@CurrentUser()user?: UserSession) {  
        return await this.service.getBalance(user.getMemberSeq());
    }

    //전환 
    @Post('/exchange')     
    @MemberAuthorized()    
    public async exchange(@Body() newData: any, @CurrentUser()user?: UserSession) {
        return await this.service.exchange(newData.exchange_point, user.getMemberSeq());
    }

    // //인출
    // @Post('/withdrawal')
    // @MemberAuthorized() 
    // public async Withdrawal(@Body() newData: RewardPoint, @CurrentUser()user?: UserSession) {
    //     return await this.service.withdrawal(newData, user.getMemberSeq());
    // }
  
}


