import { CaController, CaOrder, CaPaging, SJsonController, MemberAuthorized, UserSession } from "@common-api/common-api";
import { JsonController, Get, Post, Req, Res, Body, Put, Delete, Param, QueryParams, QueryParam, CurrentUser } from "routing-controllers";
import { Request, Response } from 'express';
import { RewardPointWithdrawCreateParams, RewardPointWithdrawService, RewardPointWithdrawUpdateParam } from "../services/reward_point_withdraw";
import { RewardPointWithdrawFilter } from "../models/reward_point_withdraw";
import { RewardPointWithdraw } from "../entities/reward_point_withdraw";
import { Inject } from "typedi";


@SJsonController('/admin/point/reward-point-withdraw') 
export class RewardPointWithdrawController extends CaController { 


  @Inject(()=> RewardPointWithdrawService)
  protected service: RewardPointWithdrawService;

  constructor() {
      super();
  }

  // 리스트조회
  @Get()
  public async list(@QueryParams() filter: RewardPointWithdrawFilter, @QueryParam('order') order?: CaOrder, @QueryParam('paging') paging?: CaPaging) {
    return await this.service.list(filter, order, paging);
  }

  // 인출완료처리 
  @Put('/complete/:id')
  public async complete(@Param('id') id: any) {
      return this.service.complete(id);
  }

  // // 인출취소처리 
  // @Put('/cancel/:id')
  // public async cancel(@Param('id') id: any) {
  //     return this.service.cancel(id);
  // }

  // //리워드포인트 인출승인처리 
  // @Put('/complete/:id') 
  // public async complete(@Param('id') id: any, @Body() newData: RewardPointWithdraw) {
  //   return this.service.complete(id, newData);
  // }

  // //리워드포인트 인출취소처리
  // @Put('/cancel/:id') 
  // public async cancel(@Param('id') id: any, @Body() newData: RewardPointWithdraw) {
  //     return this.service.cancel(id, newData);
  // }

  // //리워드포인트 인출 일괄 취소
  // @Put('/expire-all') 
  // public async exprireAll() {
  //     return this.service.exprireAll();
  // }
   
}
