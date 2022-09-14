import { CaService, Logger } from "@common-api/common-api";
import { GoodsSearchRecentHistoryModel } from "../models/goods_search_recent_history";
import { GoodsSearchRecentHistory } from "../entities/goods_search_recent_history";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";

export class GoodsSearchRecentHistoryCreateParams extends GoodsSearchRecentHistory { 
    //없으면 기본은 프로퍼티명  
}



export class GoodsSearchRecentHistoryUpdateParam extends GoodsSearchRecentHistory { 
    public goods: string;
    public keyword: string;
}



@Service()
export class GoodsSearchRecentHistoryService extends CaService<GoodsSearchRecentHistory> { 

    @Inject(()=> GoodsSearchRecentHistoryModel)
    protected model: GoodsSearchRecentHistoryModel;

    constructor() {
        super();
    }

    
    public async createFromExport(params: GoodsSearchRecentHistoryCreateParams) {

        try {

            let goods = new GoodsSearchRecentHistory();

            goods.goods = params.goods;
            goods.keyword = params.keyword;          
            
            
            await this.model.create(goods);
    
        
            return {
                code: 200,
                message: "success"
            };
        } catch(e) {
            Logger.error('goods Search Recent History Error', e);
            return {};
            //throw new PKError(500, 'Server Error => ' + e);
        }
    }

 


 

}