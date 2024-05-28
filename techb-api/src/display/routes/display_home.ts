import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { DisplayHomeCreateParams, DisplayHomeService, DisplayHomeUpdateParams } from "../services/display_home";
import { DisplayHomeFilter } from "../models/display_home";
import { DisplayHome } from "../entities/display_home";
import { Inject } from "typedi";


@SJsonController('/admin/display/display-home') 
export class DisplayHomeController extends CaController { 

    @Inject(()=> DisplayHomeService)
    protected service: DisplayHomeService;

    constructor() {
        super();
    }

    //등록
    // @Post()
    // public async create(@Req() req: Request, @Res() res: Response, @Body() params: DisplayHomeCreateParams) {
    //     return await super.create(params);
    // }

    @Post()
    public async create(@Body() data: DisplayHomeCreateParams) {
        return await super.create(data);
    }

    // //리스트
    // @Get()
    // public async list(@QueryParams() filter: DisplayHomeFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
    //     return await super.list(filter, order, paging);
    // }

     //특정값조회
     @Get('/:id') // URL 뒤에 들어가는 값 
     public async get(@Param('id') id: any) {
         return await super.get(id);
     }

 

    //  @Get('/:groupcode')
    //  public async getByGroupcode(@Param('groupcode') groupcode: string) {
    //      return await this.service.configMapValue(groupcode);
    //  }
 
 
     //수정 
     @Put('/:id') 
     public async update(@Param('id') id: any, @Body() newData: DisplayHomeUpdateParams) {
         return await super.update(id, newData);
     }
 
     //삭제
     @Delete('/:id')
     public async delete(@Param('id') id: any) {
         return await super.delete(id);
     }
}


