import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { GoodsCreateParams, GoodsService, GoodsUpdateParams } from "../services/goods";
import { GoodsFilter } from "../models/goods";
import { Goods } from "../entities/goods";
import { Inject } from "typedi";


@SJsonController('/admin/goods') 
export class GoodsController extends CaController { 

    @Inject(()=> GoodsService)
    protected service: GoodsService;

    constructor() {
        super();
    }

    //등록
    @Post()
    public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: GoodsCreateParams) {
        return await this.service.createFromExport(params);
    }

    //리스트
    @Get()
    public async list(@QueryParams() filter: GoodsFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await this.service.list(filter, order, paging);
    }

     //특정값조회
     @Get('/:id') // URL 뒤에 들어가는 값 
     public async get(@Param('id') id: any) {
         return await super.service.get(id);
     }
 
     //수정 
     @Put('/:id') 
     public async update(@Param('id') id: any, @Body() newData: GoodsUpdateParams) {
         return await super.update(id, newData);
     }
 
     //삭제
     @Delete('/:id')
     public async delete(@Param('id') id: any) {
         return await super.delete(id);
     }
}


