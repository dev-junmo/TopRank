import { CaController, CaOrder, CaPaging, MemberAuthorized, SJsonController, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { PointCreateParams, PointService, PointUpdateParam } from "../services/point";
import { PointFilter } from "../models/point";
import { Point, PointType } from "../entities/point";
import { Inject } from "typedi";


@SJsonController('/admin/point/point') //change this
export class PointAdminController extends CaController { //change this

    @Inject(()=> PointService)
    protected service: PointService;

    constructor() {
        super();
    }

    @Get()
    public async list(@QueryParams() filter: PointFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
        if (order[0].column && order[0].column == 'regist_date') {
            order[0].column = 'point_seq';
        }
        return await this.service.list(filter, order, paging);
    }

    @Put('/expiration')
    public async expiration(@Body() newData: any) {

        let test = '';
        return await this.service.expiration();
    }  


    // @Get('/:id') // URL 뒤에 들어가는 값 
    // public async get(@Param('id') id: any) {
    //     return await super.service.get(id);
    // }
    
}




