import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { OrderCreateParams, OrderService, OrderUpdateParams } from "../services/order";
import { OrderFilter } from "../models/order";
import { Order } from "../entities/order";
import { PointService } from "../../point/services/point";
import { Inject } from "typedi";


@SJsonController('/admin/order/order') 
export class OrderAdminController extends CaController { 

    @Inject(()=> OrderService)
    protected service: OrderService;

    @Inject(() => PointService)
    protected pointService: PointService;

    constructor() {
        super();
    }

    //등록 admin post service 만들던가 해야함
    // @Post()
    // public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: OrderCreateParams) {
    //     return await this.service.createFromExport(params);
    // }

    // 리스트
    @Get()
    public async list(@QueryParams() filter: OrderFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await this.service.admin_list(filter, order, paging);
    }

     // 특정값조회
     @Get('/:id') // URL 뒤에 들어가는 값 
     public async get(@Param('id') id: any) {
         return await super.service.get(id);
     }

     // 수정 
    //  @Put('/:id') 
    //  public async update(@Param('id') id: any, @Body() newData: OrderUpdateParams) {
    //      return await super.update(id, newData);
    //  }

     // 키워드 구매시 승인처리 
    //  @Put('/complete/:id') 
    //  public async update(@Param('id') id: any, @Body() newData: Order) {
    //     // 여기서 complete이면 승인처리의 값만 받았어야 하는데...
    //      await super.update(id,newData);
    //      return this.service.usePointhistory(id);
    //  }

     // 삭제
     @Delete('/:id')
     public async delete(@Param('id') id: any) {
         return await super.delete(id);
     }
}


