import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { RewardPointCreateParams, RewardPointService, RewardPointUpdateParam } from "../services/reward_point";
import { RewardPointFilter } from "../models/reward_point";
import { RewardPoint, RewardStateType } from "../entities/reward_point";
import { Inject } from "typedi";


@SJsonController('/admin/point/reward-point') 
export class RewardPointController extends CaController { 

    @Inject(()=> RewardPointService)
    protected service: RewardPointService;

    constructor() {
        super();
    }

    // //리스트조회 
    @Get()
    public async list(@QueryParams() filter: RewardPointFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await this.service.list(filter, order, paging);
    }

    // //리워드포인트 추가
    // @Post('/add')
    // public async addRewardPoint(@Body() item) {
    //     return await this.service.addRewardPoint(item);
    // }

    // //인출
    // @Post('/withdrawal')
    // public async Withdrawal(@Body() newData: RewardPoint) {
    //     return await this.service.withdrawal(newData);
    // }

    //  //전환 
    //  @Post('/exchange')
    //  public async Exchange(@Body() newData: RewardPoint) {
    //     return await this.service.exchange(newData);
    //  }


    // @Get()
    // public async list(@QueryParams() filter: RewardPointFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
    //     return await this.service.list(filter, order, paging);
    // }

    // @Get('/:id') // URL 뒤에 들어가는 값 
    // public async get(@Param('id') id: member_seq) {
    //     return await super.get(id)
    // }

    @Get('/test/1')    
    public async get() {
        //return await this.service.addRewardPoint(item);
         //await this.service.usePoint(42,5000,RewardStateType.exchange,"전환");

         return await this.service.getBalance(42);
    }

}


