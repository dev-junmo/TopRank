import { CaModel } from "@common-api/common-api";
import { UrlSearchRecentHistory } from "../entities/url_search_recent_history";
import { Service } from "typedi";
import { SelectQueryBuilder } from "typeorm";

export interface UrlSearchRecentHistoryFilter extends UrlSearchRecentHistory { 

}


@Service()
export class UrlSearchRecentHistoryModel extends CaModel<UrlSearchRecentHistory> {
    
    constructor() {
        super(UrlSearchRecentHistory); 
    }
}