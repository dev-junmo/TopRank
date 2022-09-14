import { CaService, Logger } from "@common-api/common-api";
import { UrlSearchRecentHistoryModel } from "../models/url_search_recent_history";
import { UrlSearchRecentHistory } from "../entities/url_search_recent_history";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";

export class UrlSearchRecentHistoryCreateParams extends UrlSearchRecentHistory { 
    //없으면 기본은 프로퍼티명  
}



export class UrlSearchRecentHistoryUpdateParam extends UrlSearchRecentHistory { 
 public url: string;
 public keyword: string;
}



@Service()
export class UrlSearchRecentHistoryService extends CaService<UrlSearchRecentHistory> { 

    @Inject(()=> UrlSearchRecentHistoryModel)
    protected model: UrlSearchRecentHistoryModel;

    constructor() {
        super();
    }

    
    public async createFromExport(params: UrlSearchRecentHistoryCreateParams) {

        try {

            let url = new UrlSearchRecentHistory();

            url.url = params.url;
            url.keyword = params.keyword;
            
            
            
            await this.model.create(url);
    
        
            return {
                code: 200,
                message: "success"
            };
        } catch(e) {
            Logger.error('Url Search Recent History Error', e);
            return {};
            //throw new PKError(500, 'Server Error => ' + e);
        }
    }

 


 

}