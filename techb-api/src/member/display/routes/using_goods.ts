import { AdminAuthorized, CaController, CaOrder, CaPaging, MemberAuthorized, SJsonController, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { UsingGoodsService } from "../services/using_goods";


import { Inject } from "typedi";


@SJsonController('/member/display/using-goods') 
export class UsingGoodsController extends CaController { 

    @Inject(()=> UsingGoodsService)
    protected service: UsingGoodsService;

    constructor() {
        super();
    }

    @Get() 
    @MemberAuthorized()
    public async get( @CurrentUser() user?: UserSession) {
        return await this.service.getUsingGoods(user.getMemberSeq());
    }

}


