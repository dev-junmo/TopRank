import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { KeywordSearchRecentHistoryCreateParams, KeywordSearchRecentHistoryService, KeywordSearchRecentHistoryUpdateParam } from "../services/keyword_search_recent_history";
import { KeywordSearchRecentHistoryFilter } from "../models/keyword_search_recent_history";
import { KeywordSearchRecentHistory } from "../entities/keyword_search_recent_history";
import { Inject } from "typedi";


@SJsonController('/keyword-search-recent-history') 
export class KeywordSearchRecentHistoryController extends CaController { //change this

    @Inject(()=> KeywordSearchRecentHistoryService)
    protected service: KeywordSearchRecentHistoryService;

    constructor() {
        super();
    }

    @Post()
    public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: KeywordSearchRecentHistoryCreateParams) {
        return await this.service.createFromExport(params);
    }

    @Get()
    @MemberAuthorized()  
    public async list(@QueryParams() filter: KeywordSearchRecentHistoryFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging, 
        @CurrentUser()user?: UserSession) {
        return await this.service.list({member_seq: user.getManagerSeq}, order, paging);
    }

    @Get('/:id') // URL 뒤에 들어가는 값 
    public async get(@Param('id') id: any) {
        return await this.service.get(id);
    }

    @Put('/:id') 
    public async update(@Param('id') id: any, @Body() newData: KeywordSearchRecentHistoryUpdateParam) {
        return await super.update(id, newData);
    }

    
    @Delete('/:id')
    public async delete(@Param('id') id: any) {
        return await super.delete(id);
    }
}


