import { CaModel } from "@common-api/common-api";
import { StoreSearchRecentHistory } from "../entities/store_search_recent_history";
import { Service } from "typedi";
import { SelectQueryBuilder } from "typeorm";

export interface StoreSearchRecentHistoryFilter extends StoreSearchRecentHistory { 

}


@Service()
export class StoreSearchRecentHistoryModel extends CaModel<StoreSearchRecentHistory> {
    
    constructor() {
        super(StoreSearchRecentHistory); 
    }
}