import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { ProductCreateParams, ProductService, ProductUpdateParams } from "../services/product";
import { ProductFilter } from "../models/product";
import { Product } from "../entities/product";
import { Inject } from "typedi";

@SJsonController('/product/product') 
export class ProductController extends CaController { 

    @Inject(()=> ProductService)
    protected service: ProductService;

    constructor() {
        super();
    }

    //등록
    // @Post()
    // @MemberAuthorized()
    // public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: ProductCreateParams, @CurrentUser()user?: UserSession) {
    //     return await this.service.createFromExport(params, user.getMemberSeq());
    // }

    //리스트
    @Get()
    @MemberAuthorized()    
    public async list(@QueryParams() filter: ProductFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging, @CurrentUser()user?: UserSession) {
        // filter
        filter['member_seq'] = user.getMemberSeq();
        return await this.service.list(filter, order, paging);
    }
    
    ///////////////////
    // get
    @Get('/:id') 
    @MemberAuthorized()
    public async get(@Param('id') id: any) {
        return await this.service.get(id);
    }

    @Get('/get/detail/:id')
    @MemberAuthorized()
    public async getDetail(@Param('id') id: any) {
        return await this.service.getDetail(id);
    }

    // @Get('/get/query')
    // @MemberAuthorized()
    // public async getByQueryParams(@QueryParams() filter: any, @CurrentUser()user?: UserSession) {
    //     return await this.service.getByQueryParams(user.getMemberSeq(), filter);
    // }

    // @Get('/get/goods')
    // @MemberAuthorized()
    // public async getGoods(@CurrentUser()user?: UserSession) {
    //     return await this.service.getGoods(user.getMemberSeq());
    // }

    
    //수정 
    @Put('/:id') 
    @MemberAuthorized()    
    public async update(@Param('id') id: any, @Body() newData: ProductUpdateParams) {
        return await super.update(id, newData);
    }

    //삭제
    @Delete('/:id')
    @MemberAuthorized()    
    public async delete(@Param('id') id: any) {
        return await super.delete(id);
    }
     
}


