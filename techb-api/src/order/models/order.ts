import { CaEntity, CaListResponse, CaModel, CaOrder, CaPaging } from "@common-api/common-api";
import { Order } from "../entities/order";
import { Service } from "typedi";
import { QueryRunner, SelectQueryBuilder } from "typeorm";

export interface OrderFilter extends Order { 

}


@Service()
export class OrderModel extends CaModel<Order> { 
    
    constructor() {
        super(Order); 
    }

    public async list<R extends CaEntity = Order>(filter?: any, order?: CaOrder | CaOrder[], paging?: CaPaging, entity?: any, runner?: QueryRunner): Promise<CaListResponse<R>> {
        return super.list<R>(filter, order, paging, entity, runner);
    }

    // protected async preparedJoin<R = Order>(builder: SelectQueryBuilder<R>, filter: any, entity?: any): Promise<void>{
    //     builder.innerJoinAndSelect(`${this.defaultAlias}.product`, `product`);
    //     builder.innerJoinAndSelect(`product.goods`, `goods`);
    // }
}