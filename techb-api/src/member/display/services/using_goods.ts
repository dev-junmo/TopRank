import { CaService, Logger, Member ,MemberModel, YN, MemberLogType } from "@common-api/common-api";
import { GoodsModel } from "../../../goods/models/goods";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";
const axios = require('axios').default;
@Service()
export class UsingGoodsService extends CaService<Member> { 

    @Inject(() => GoodsModel)
    protected goodsModel: GoodsModel;

    @Inject("MemberModel")
    protected memberModel: MemberModel;


      
    constructor() {
        super();
    }

    public async getUsingGoods(member_seq: number) {    
        try {
            let member = await this.memberModel.getByFilter({member_seq: member_seq});
            let goods = await this.goodsModel.list({member_seq: member_seq});
            
            for(let row of goods.list) {
                let detail = await this.getGoodsDetail(row.goods_seq);

                row['sales_ranking'] = detail['sales_ranking'];
                row['ranking_change'] = detail['ranking_change'];
                row['rep_keyword'] = detail['rep_keyword'];
            }

            return {
              goods
            };
            
        } catch(e) {
            Logger.error('using goods error', e);
            return {};            
        }
    }

    //외부 api 연결 
    private async getGoodsDetail(goods_seq) {
        let url = `http://222.108.58.251/test.json?goods_seq=${goods_seq}`;

        let res = await axios.get(url);

        return res.data;
    }
}