import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { StoreSearchRecentHistoryCreateParams, StoreSearchRecentHistoryService, StoreSearchRecentHistoryUpdateParam } from "../services/store_search_recent_history";
import { StoreSearchRecentHistoryFilter } from "../models/store_search_recent_history";
import { StoreSearchRecentHistory } from "../entities/store_search_recent_history";
import { Inject } from "typedi";


@SJsonController('/store-search-recent-history') 
export class StoreSearchRecentHistoryController extends CaController { //change this

    @Inject(()=> StoreSearchRecentHistoryService)
    protected service: StoreSearchRecentHistoryService;

    constructor() {
        super();
    }

    @Post()
    public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: StoreSearchRecentHistoryCreateParams) {
        return await this.service.createFromExport(params);
    }

    @Get()
    public async list(@QueryParams() filter: StoreSearchRecentHistoryFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await this.service.list(filter, order, paging);
    }

    @Get('/:id') // URL 뒤에 들어가는 값 
    public async get(@Param('id') id: any) {
        return await this.service.get(id);
    }

    @Put('/:id') 
    public async update(@Param('id') id: any, @Body() newData: StoreSearchRecentHistoryUpdateParam) {
        return await super.update(id, newData);
    }

    
    @Delete('/:id')
    public async delete(@Param('id') id: any) {
        return await super.delete(id);
    }
}


