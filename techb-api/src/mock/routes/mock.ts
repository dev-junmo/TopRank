import { CaController, CaOrder, CaPaging, SJsonController, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, CurrentUser, QueryParams, QueryParam } from "routing-controllers";
// import { Request, Response } from 'express';
// import { Inject } from "typedi";

@SJsonController('/mock') 
export class GoodsController extends CaController { 

    // @Inject(()=> GoodsService)
    // protected service: GoodsService;

    constructor() {
        super();
    }    
    
    //특정값조회
    @Get() 
    public async get() {
        await new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        return {}; 
    }

     //수정 
    //  @Put('/:id') 
    //  public async update(@Param('id') id: any, @Body() newData: GoodsUpdateParams) {
    //      return await super.update(id, newData);
    //  }
 
    // //삭제
    // @Delete('/:id')
    // public async delete(@Param('id') id: any) {
    //     return await super.delete(id);
    // }
}


