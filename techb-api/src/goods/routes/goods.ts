import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, CurrentUser, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { GoodsCreateParams, GoodsService, GoodsUpdateParams } from "../services/goods";
import { GoodsFilter } from "../models/goods";
import { Goods } from "../entities/goods";
import { Inject } from "typedi";


@SJsonController('/product/goods') 
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
    @Get('/get/search')
    public async search(@QueryParams() filter: GoodsFilter, @QueryParam('order') order?: CaOrder, 
        @QueryParam('paging') paging?: CaPaging, @CurrentUser() user?: UserSession) {
        return await this.service.search(filter, order, paging, user?.getMemberSeq());
    }

    //특정값조회
    @Get('/:id') 
    public async getGoods(@Param('id') id: any) {
        return await this.service.getGoods(id);
    }

    @Get('/get/member')
    @MemberAuthorized()
    public async getWithMember(@CurrentUser()user: UserSession) {
        return await this.service.getWithMember(user.getMemberSeq());
    }


    // @Get() 
    // public async list(@Param('id') id: any) {
    //     return await this.service.getGoods(id);
    // }

 
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

    ////////////////////////
    // 구독

    // 구독 했는지?
    @Get('/get-with-subscribe/:goods_seq') 
    public async getWithSubscribe(@Param('goods_seq') goods_seq: any, @QueryParams() queryParams, @CurrentUser()user?: UserSession) {
        try {
            if (!queryParams.keyword) {
                throw Error('keyword가 필요합니다.');
            }
            return await this.service.getWithSubscribe(goods_seq, queryParams.keyword, user.getMemberSeq());
        } catch(e) {
            return {e};
        }
    }

    // // 구독하기 
    // @Put('/subscribe/:goods_seq') 
    // public async subscribe(@Param('goods_seq') goods_seq: any, @CurrentUser()user?: UserSession) {
    //     //return await super.update(goods_seq, newData);
    //     return await this.service.subscribe(goods_seq, user.getMemberSeq());
    // }

    // // 구독해제하기 
    // @Put('/unsubscribe/:goods_seq') 
    // public async unsubscribe(@Param('goods_seq') goods_seq: any, @CurrentUser()user?: UserSession) {
    //     return await this.service.unsubscribe(goods_seq, user.getMemberSeq());
    // }
}


