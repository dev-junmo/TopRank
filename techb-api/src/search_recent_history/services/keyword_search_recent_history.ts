import { CaService, Logger } from "@common-api/common-api";
import { KeywordSearchRecentHistoryModel } from "../models/keyword_search_recent_history";
import { KeywordSearchRecentHistory } from "../entities/keyword_search_recent_history";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";

export class KeywordSearchRecentHistoryCreateParams extends KeywordSearchRecentHistory { 
    //없으면 기본은 프로퍼티명  
}



export class KeywordSearchRecentHistoryUpdateParam extends KeywordSearchRecentHistory { 
 public keyword: string;
}



@Service()
export class KeywordSearchRecentHistoryService extends CaService<KeywordSearchRecentHistory> { 

    @Inject(()=> KeywordSearchRecentHistoryModel)
    protected model: KeywordSearchRecentHistoryModel;

    constructor() {
        super();
    }
    
    public async createFromExport(params: KeywordSearchRecentHistoryCreateParams) {
        try {
            let keyword = new KeywordSearchRecentHistory();
            keyword.keyword = params.keyword;
            await this.model.create(keyword);
    
            return {
                code: 200,
                message: "success"
            };
        } catch(e) {
            Logger.error('Keyword Search Recent History Error', e);
            return {};
            //throw new PKError(500, 'Server Error => ' + e);
        }
    }
}