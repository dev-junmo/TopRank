import { CaController, CaOrder, CaPaging, SJsonController } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam } from "routing-controllers";
import { Request, Response } from 'express';
import { BankAccountCreateParams, BankAccountService } from "../services/bank_account";
import { BankAccountFilter } from "../models/bank_account";
import { BankAccount } from "../entities/bank_account";
import { Inject } from "typedi";


@SJsonController('/admin/setup/bank-account') 
export class BankAccountController extends CaController {

    @Inject(()=> BankAccountService)
    protected service: BankAccountService;

    constructor() {
        super();
    }

    @Get()
    public async list(@QueryParams() filter: BankAccountFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        return await super.list(filter, order, paging);
    }

    @Post()
    public async create(@Body() params: BankAccountCreateParams): Promise<any> {
        return await super.create(params);
    }
 

    @Put('/:id') 
    public async update(@Param('id') id: any, @Body() newData: BankAccount) {
        return await super.update(id,newData);
    }

    @Delete('/:id')
    public async delete(@Param('id') id: any) {
        return await super.delete(id);
    }

 
}