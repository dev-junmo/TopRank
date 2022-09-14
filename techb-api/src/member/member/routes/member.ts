import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { Inject } from "typedi";

import { MemberRegisterParam, MemberService } from "@common-api/common-api"
import { TBMemberService } from "../services/member";

@SJsonController('/member/signup') 
export class MemberSignupController extends CaController {
    @Inject(() => TBMemberService)
    protected service: TBMemberService;
    
    constructor() {
        super();
    }

    @Post()
    public async create(@Body() params: MemberRegisterParam) {
        return this.service.signup(params);
    }

    // @Get()
    // public async list(@QueryParams() filter: BankAccountFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
    //     return await super.list(filter, order, paging);
    // }

    // @Post()
    // public async create(@Body() params: BankAccountCreateParams): Promise<any> {
    //     return await super.create(params);
    // }
 

    // @Put('/:id') 
    // public async update(@Param('id') id: any, @Body() newData: BankAccount) {
    //     return await super.update(id,newData);
    // }

    // @Delete('/:id')
    // public async delete(@Param('id') id: any) {
    //     return await super.delete(id);
    // }

 
}