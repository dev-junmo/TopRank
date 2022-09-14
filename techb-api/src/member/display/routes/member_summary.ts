import { CaController, CaOrder, CaPaging, MemberAuthorized, SJsonController, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { MemberInfoService } from "../services/member_summary";
import { Inject } from "typedi";
import { PointType } from "../../../point/entities/point";


@SJsonController('/member/member-summary') 
export class MemberInfoBoxController extends CaController { 

    @Inject(()=> MemberInfoService)
    protected service: MemberInfoService;

    constructor() {
        super();
    }

  
    @Get()
    @MemberAuthorized()
    public async get(@CurrentUser() user?: UserSession) {
        return await this.service.getSummary(user.getMemberSeq());
    }

    // @Get('/:id') 
    // public async get(@Param('id') id: any) {
    //     return await super.service.get(id);
    // }

}


