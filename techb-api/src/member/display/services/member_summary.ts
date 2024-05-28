import { CaService, Logger, Member ,MemberModel, MemberGroupModel, YN, MemberLogType } from "@common-api/common-api";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";

// point
import { PointType } from "../../../point/entities/point";
import { PointModel } from "../../../point/models/point";
import { GoodsModel } from "../../../goods/models/goods";
import { PointService } from "../../../point/services/point";
import { RewardPointService } from "../../../point/services/reward_point"; 

// product
import { ProductState } from '../../../product/entities/product';
import { ProductModel } from "../../../product/models/product";

const axios = require('axios').default;

@Service()
export class MemberInfoService extends CaService<Member> { 
   
    @Inject("MemberModel")
    protected memberModel: MemberModel;

    @Inject("MemberGroupModel")
    protected memberGroupModel: MemberGroupModel;

    @Inject(() => GoodsModel)
    protected goodsModel: GoodsModel;

    @Inject(() => PointModel)
    protected pointModel: PointModel;

    @Inject(() => PointService)
    protected pointService: PointService;

    @Inject(() => RewardPointService)
    protected rewardPointService: RewardPointService;

    @Inject(() => ProductModel)
    protected productModel: ProductModel;
    
    constructor() {
        super();
    }

    public async getSummary(member_seq: number) {
        try {
            let member = await this.memberModel.getByFilter({member_seq: member_seq});
            let memberGroup = await this.memberGroupModel.getByFilter({group_seq: member.group_seq});
            let memberGroupNext = await this.memberGroupModel.getByFilter({group_seq: member.group_seq+1});

            // point
            let pointBalace = await this.pointService.getBalance(member_seq);
            let rewardPointBalace = await this.rewardPointService.getBalance(member_seq);

            // gooods
            let goods = await this.goodsModel.list({member_seq: member_seq});

            // product
            let products = await this.productModel.list({member_seq: member_seq});
            //let validProducts = await this.productModel.list({member_seq: member_seq, state: ProductState.confirm, enabled: YN.Y});
           
            //let reward_point = await this.pointModel.getPoint(member_seq,PointType.reward);
            
            let resp = {
                member,
                email: member.email,
                nickname: member.nickname,
                member_grade: {
                    grade: memberGroup.group_name, 
                    upgrade_score: memberGroupNext.point_price - member.point, //다음등급 기준 점수?? - 현재점수
                    upgrade_percent: (member.point - memberGroup.point_price) / (memberGroupNext.point_price - memberGroup.point_price) 
                    // (현재 점수 - 현재등급기준점수) / (다음등급기준점수 - 현재등급기준점수)
                },
                goods: {
                    current_goods: goods.total,   
                    total_goods: 500, 
                },
                keyword: {
                    current_keyword: products.total,
                    total_keyword: 500, 
                },
                points: {
                   charge_point: pointBalace.charge_point, 
                   free_point: pointBalace.free_point,   
                   reward_point: rewardPointBalace.reward_point   
                },
                coupon_count: 0,
                recommend_code: member.recommend_code,
                telegram_code: member.zipcode
            };

            return resp;
            
          //return {}
            
        } catch(e) {
            Logger.error('memberInfobox error', e);
            return {};
            
        }
        
    }
}