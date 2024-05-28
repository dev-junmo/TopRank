import { CaModel } from "@common-api/common-api";
import { KeywordSearch } from "../entities/keyword_search";
import { Service } from "typedi";
import { SelectQueryBuilder } from "typeorm";

export interface KeywordSearchFilter extends KeywordSearch { 

}


@Service()
export class KeywordSearchModel extends CaModel<KeywordSearch> { 
    
    constructor() {
        super(KeywordSearch); 
    }
}