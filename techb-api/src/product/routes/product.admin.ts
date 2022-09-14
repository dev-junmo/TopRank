import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { ProductCreateParams, ProductService, ProductUpdateParams } from "../services/product";
import { ProductFilter } from "../models/product";
import { Product } from "../entities/product";
import { Inject } from "typedi";

@SJsonController('/admin/product/product') 
export class ProductAdminController extends CaController { 

    @Inject(()=> ProductService)
    protected service: ProductService;

    constructor() {
        super();
    }

    //등록
    // @Post()
    // public async createFromExport(@Req() req: Request, @Res() res: Response, @Body() params: ProductCreateParams) {
    //     return await this.service.createFromExport(params);
    // }

    //리스트
    @Get()
    public async list(@QueryParams() filter: ProductFilter, @QueryParam('order') product?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await this.service.list(filter, product, paging);
    }
    
     //특정값조회
     @Get('/:id') // URL 뒤에 들어가는 값 
     public async get(@Param('id') id: any) {
         return await super.service.get(id);
     }
 
     //수정 
     @Put('/:id') 
     public async update(@Param('id') id: any, @Body() newData: ProductUpdateParams) {
         return await super.update(id, newData);
     }
 
     //삭제
     @Delete('/:id')
     public async delete(@Param('id') id: any) {
         return await super.delete(id);
     }

    //////////////////////////////////
    // state
    
    //승인처리 
    @Put('/confirm/:id') 
    public async confirm(@Param('id') id: any, @Body() newData: Product) {
        return this.service.confirm(id, newData);
    }

    //취소처리 
    @Put('/cancel/:id') 
    public async cancel(@Param('id') id: any, @Body() newData: Product) {
        return this.service.cancel(id, newData);
    }

}


