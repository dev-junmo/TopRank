import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { PointCreateParams, PointService, PointUpdateParam } from "../services/point";
import { PointFilter } from "../models/point";
import { Point, PointType } from "../entities/point";
import { QueryRunner } from "typeorm";
import { Inject } from "typedi";


@SJsonController('/point/point') 
export class PointController extends CaController { 

    @Inject(()=> PointService)
    protected service: PointService;

    constructor() {
        super();
    }

    // @Post()
    // public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: PointCreateParams) {
    //     return await this.service.create(params);
    // }


    //로그인한 회원의 포인트내역 조회
    @Get()
    @MemberAuthorized()    
    public async list(@QueryParams() filter: PointFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging, @CurrentUser()user?: UserSession) {
        // filter
        filter['member_seq'] = user.getMemberSeq();
        order[0].column = 'point_seq';
        return await this.service.list(filter, order, paging);
    }

    // 잔액 정보
    @Get('/balance')
    @MemberAuthorized()
    public async get(@CurrentUser()user?: UserSession) {
        return await this.service.getBalance(user.getMemberSeq());
    }

    @Post('/add')
    @MemberAuthorized()
    public async addPoint(@Body() item, @CurrentUser() user?: UserSession) {        
        return await this.service.addPoint(user.getMemberSeq(), item.add_point, item.point_type, item.memo, item.expire_date);
    }

    // 포인트 사용
    @Post('/use') 
    @MemberAuthorized()  
    public async usePoint(@Body() item, @CurrentUser() user?: UserSession) {        
        return await this.service.usePoint(user.getMemberSeq(), item.use_point, item.order_seq, item.memo);
    }

    // 포인트 사용취소
    @Post('/cancel') 
    @MemberAuthorized()  
    public async useCancelpoint(@Body() item, @CurrentUser() user?: UserSession) {        
        return await this.service.useCancelPoint(user.getMemberSeq(), item.order_seq, item.memo);
    }

    //회원가입시 무료포인트 적립 
    @Post('/register') 
    @MemberAuthorized()  
    public async registerFreePoint(@Body() item, @CurrentUser() user?: UserSession) {        
        return await this.service.addPoint(user.getMemberSeq(), item.add_point, item.point_type, item.memo);
    }

    //test 용
    @Get('/test/1')
    public async test2() {
        // await this.service.addPoint(42, 1000, pointType.reward, '리워드', '2022-06-30');
       // await this.service.addPoint(42, 2000, "charge", '충전', '2022-09-30');
       // member_seq: number, add_point, point_type, memo?, expire_date?, 
        // await this.service.addPoint(42, 10000, pointType.charge, '충전');

        // await this.service.usePoint(42, 5000, 1111, '상품 구매');
        // await this.service.useCancelPoint(42, 1111, '상품 구매 취소');

        return await this.service.getBalance(42);
    }

   
}


