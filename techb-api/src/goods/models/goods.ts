import { CaModel } from "@common-api/common-api";
import { Goods } from "../entities/goods";
import { Service } from "typedi";
import { SelectQueryBuilder } from "typeorm";

export interface GoodsFilter extends Goods { 

}


@Service()
export class GoodsModel extends CaModel<Goods> { 
    
    constructor() {
        super(Goods); 
    }

    protected async preparedJoin<R = Goods>(builder: SelectQueryBuilder<R>, filter: any, entity?: any): Promise<void>{
        builder.leftJoinAndSelect(`${this.defaultAlias}.products`, `product`);
    }

}