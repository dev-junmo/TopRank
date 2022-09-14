import { CaModel } from "@common-api/common-api";
import { KeywordSearchRecentHistory } from "../entities/keyword_search_recent_history";
import { Service } from "typedi";
import { SelectQueryBuilder } from "typeorm";

export interface KeywordSearchRecentHistoryFilter extends KeywordSearchRecentHistory { 

}


@Service()
export class KeywordSearchRecentHistoryModel extends CaModel<KeywordSearchRecentHistory> {
    
    constructor() {
        super(KeywordSearchRecentHistory); 
    }
}