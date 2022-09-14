import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { GoodsSearchRecentHistoryCreateParams, GoodsSearchRecentHistoryService, GoodsSearchRecentHistoryUpdateParam } from "../services/goods_search_recent_history";
import { GoodsSearchRecentHistoryFilter } from "../models/goods_search_recent_history";
import { GoodsSearchRecentHistory } from "../entities/goods_search_recent_history";
import { Inject } from "typedi";


@SJsonController('/goods-search-recent-history') 
export class GoodsSearchRecentHistoryController extends CaController { 

    @Inject(()=> GoodsSearchRecentHistoryService)
    protected service: GoodsSearchRecentHistoryService;

    constructor() {
        super();
    }

    @Post()
    public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: GoodsSearchRecentHistoryCreateParams) {
        return await this.service.createFromExport(params);
    }

    @Get()
    public async list(@QueryParams() filter: GoodsSearchRecentHistoryFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await this.service.list(filter, order, paging);
    }

    @Get('/:id') 
    public async get(@Param('id') id: any) {
        return await this.service.get(id);
    }

    
    @Put('/:id') 
    public async update(@Param('id') id: any, @Body() newData: GoodsSearchRecentHistoryUpdateParam) {
        return await super.update(id, newData);
    }

    
    @Delete('/:id')
    public async delete(@Param('id') id: any) {
        return await super.delete(id);
    }

}


