import { CaService, Logger, YN } from "@common-api/common-api";
import { KeywordSearchModel } from "../models/keyword_search";
import { KeywordSearch } from "../entities/keyword_search";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";

export class KeywordSearchCreateParams extends KeywordSearch { 
  
}



export class KeywordSearchUpdateParams extends KeywordSearch { 

}



@Service()
export class KeywordSearchService extends CaService<KeywordSearch> { 

    @Inject(()=> KeywordSearchModel)
    protected model: KeywordSearchModel;

    constructor() {
        super();
    }

    
    public async createFromExport(params: KeywordSearchCreateParams) {

        try {

            let keywordSearch = new KeywordSearch();
            
            keywordSearch.keyword = params.keyword;            
            
            await this.model.create(keywordSearch);


            return {
                code: 200,
                message: "success"
            };
        } catch(e) {
            Logger.error('keyword_search ', e);
            return {};
            //throw new PKError(500, 'Server Error => ' + e);
        }
    }

 


 

}