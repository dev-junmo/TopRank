import { CaService, Logger } from "@common-api/common-api";
import { StoreSearchRecentHistoryModel } from "../models/store_search_recent_history";
import { StoreSearchRecentHistory } from "../entities/store_search_recent_history";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";

export class StoreSearchRecentHistoryCreateParams extends StoreSearchRecentHistory { 
    //없으면 기본은 프로퍼티명  
}



export class StoreSearchRecentHistoryUpdateParam extends StoreSearchRecentHistory { 
 public store: string;
 public keyword: string;
}



@Service()
export class StoreSearchRecentHistoryService extends CaService<StoreSearchRecentHistory> { 

    @Inject(()=> StoreSearchRecentHistoryModel)
    protected model: StoreSearchRecentHistoryModel;

    constructor() {
        super();
    }

    
    public async createFromExport(params: StoreSearchRecentHistoryCreateParams) {

        try {

            let store = new StoreSearchRecentHistory();

            store.store = params.store;
            store.keyword = params.keyword;
            
            
            
            await this.model.create(store);
    
        
            return {
                code: 200,
                message: "success"
            };
        } catch(e) {
            Logger.error('Store Search Recent History Error', e);
            return {};
            //throw new PKError(500, 'Server Error => ' + e);
        }
    }

 


 

}