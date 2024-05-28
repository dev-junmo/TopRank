import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { OrderCreateParams, OrderService, OrderUpdateParams } from "../services/order";
import { OrderFilter } from "../models/order";
import { Order } from "../entities/order";
import { Inject } from "typedi";
import { PointChargeService } from "../../point/services/point_charge";


@SJsonController('/order/order') 
export class OrderController extends CaController { 

    @Inject(()=> OrderService)
    protected service: OrderService;

    @Inject(() => PointChargeService)
    protected pointService: PointChargeService;

    constructor() {
        super();
    }

    //키워드 구매
    @Post()
    @MemberAuthorized()    
    public async _create(@Req() req: Request, @Res() res: Response, @Body() params: OrderCreateParams, @CurrentUser()user?: UserSession) {
        return await this.service._create(params, user.getMemberSeq());
    }

    // //키워드 구매시 회원의 잔여포인트 조회
    // @Get()
    // @MemberAuthorized()
    // public async getPoint(@CurrentUser()user?: UserSession) {
    //     return await this.service.getPoint(user.getMemberSeq());
    // }

    //구매내역 
    @Get()
    @MemberAuthorized()    
    public async list(@QueryParams() filter: OrderFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging, @CurrentUser()user?: UserSession) {
        // filter
        filter['member_seq'] = user.getMemberSeq();
        return await this.service.list(filter, order, paging);
    }
 
     //수정 
     @Put('/:id') 
     public async update(@Param('id') id: any, @Body() newData: OrderUpdateParams) {
         return await super.update(id, newData);
     }
 
     //삭제
     @Delete('/:id')
     public async delete(@Param('id') id: any) {
         return await super.delete(id);
     }
}


