import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { PointChargeCreateParams } from "../services/point_charge";
import { PointChargeModel } from "../models/point_charge";
import { PointChargeFilter } from "../models/point_charge";
import { PointChargeService } from "../services/point_charge";
import { PointCharge } from "../entities/point_charge";
import { Inject } from "typedi";

// point
import { PointFilter } from "../models/point";
import { PointCreateParams, PointService, PointUpdateParam } from "../services/point";

@SJsonController('/admin/point/point-charge') 
export class PointChargeController extends CaController { 

    @Inject(()=> PointChargeService)
    protected service: PointChargeService;

    constructor() {
        super();
    }

    // @Get()
    // public async get(@QueryParams() filter: PointChargeFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
    //     return await super.service.list(filter, order, paging);
    // }

    //포인트충전관리
    @Get()
    public async list(@QueryParams() filter: PointFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await this.service.list(filter, order, paging);
    }
    
    //포인트 충전시 입금승인처리 
    @Put('/complete/:id') 
    public async complete(@Param('id') id: any, @Body() newData: PointCharge) {
        return this.service.complete(id, newData);
    }

    //포인트 충전시 입금취소
    @Put('/cancel/:id') 
    public async cancel(@Param('id') id: any, @Body() newData: PointCharge) {
        return this.service.cancel(id, newData);
    }

    //포인트 충전시 전체 일괄취소
    @Put('/expire-all') 
    public async exprireAll() {
        return this.service.exprireAll();
    }
    

}




