import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { KeywordSearchCreateParams, KeywordSearchService, KeywordSearchUpdateParams } from "../services/keyword_search";
import { KeywordSearchFilter } from "../models/keyword_search";
import { KeywordSearch } from "../entities/keyword_search";
import { Inject } from "typedi";


@SJsonController('/display/keyword-search') 
export class KeywordSearchController extends CaController { 

    @Inject(()=> KeywordSearchService)
    protected service: KeywordSearchService;

    constructor() {
        super();
    }

    //등록
    @Post()
    public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: KeywordSearchCreateParams) {
        return await this.service.createFromExport(params);
    }

    //리스트
    @Get()
    public async list(@QueryParams() filter: KeywordSearchFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await super.list(filter, order, paging);
    }

     //특정값조회
     @Get('/:id') // URL 뒤에 들어가는 값 
     public async get(@Param('id') id: any) {
         return await super.service.get(id);
     }
 
     //수정 
     @Put('/:id') 
     public async update(@Param('id') id: any, @Body() newData: KeywordSearchUpdateParams) {
         return await super.update(id, newData);
     }
 
     //삭제
     @Delete('/:id')
     public async delete(@Param('id') id: any) {
         return await super.delete(id);
     }
}


