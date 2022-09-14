import { CaEntity, CaListResponse, CaModel, CaOrder, CaPaging } from "@common-api/common-api";
import { Product } from "../entities/product";
import { Service } from "typedi";
import { QueryRunner, SelectQueryBuilder } from "typeorm";

export interface ProductFilter extends Product { 

}


@Service()
export class ProductModel extends CaModel<Product> {    
        
    constructor() {
        super(Product); 
    }

    // public async list<R extends CaEntity = Product>(filter?: any, order?: CaOrder | CaOrder[], paging?: CaPaging, entity?: any, runner?: QueryRunner): Promise<CaListResponse<R>> {
    //     return super.list<R>(filter, order, paging, entity, runner);
    // }   
    
    // override
    protected async preparedJoin<R = Product>(builder: SelectQueryBuilder<R>, filter: any, entity?: any): Promise<void>{
        builder.innerJoinAndSelect(`${this.defaultAlias}.goods`, `goods`);
        builder.innerJoinAndSelect(`${this.defaultAlias}.order`, `order`);
        builder.innerJoinAndSelect(`${this.defaultAlias}.member`, `member`);
    }

    //프로덕트 관리  검색기능 안됨
    protected async preparedFilter(builder, filter) {
        if(!filter) { return; }
        if(filter.search_keyword) {
            builder.andWhere(`(goods.goods_name like :keyword) or (keyword like :keyword) or (member.member_seq like :keyword)`, {keyword: '%'+ filter.search_keyword+'%'});
        } 
        if (filter.member_seq) {
            builder.andWhere(`${this.defaultAlias}.member_seq = :member_seq`, {member_seq: filter.member_seq});
        }
    }

}