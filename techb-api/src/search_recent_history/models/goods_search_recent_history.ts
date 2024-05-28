import { CaModel } from "@common-api/common-api";
import { GoodsSearchRecentHistory } from "../entities/goods_search_recent_history";
import { Service } from "typedi";
import { SelectQueryBuilder } from "typeorm";

export interface GoodsSearchRecentHistoryFilter extends GoodsSearchRecentHistory { 

}


@Service()
export class GoodsSearchRecentHistoryModel extends CaModel<GoodsSearchRecentHistory> {
    
    constructor() {
        super(GoodsSearchRecentHistory); 
    }
}