import { CaEntity, CaModel, CaOrder, isNonEmptyArray, now } from "@common-api/common-api";
import { Point, PointType } from "../entities/point";
import { Service } from "typedi";
import { DeleteQueryBuilder, EntityTarget, QueryRunner, SelectQueryBuilder, UpdateQueryBuilder } from "typeorm";

export interface PointFilter extends Point { 
    available_date?: Date
    member_seq: number
}


@Service()
export class PointModel extends CaModel<Point> { 
    
    constructor() {
        super(Point); 
    }

    public async setFilter<R extends CaEntity = Point>(builder: SelectQueryBuilder<R>, filter: PointFilter, entity?: EntityTarget<Point>): Promise<void> {
        await super.setFilter(builder, filter, entity);
        if(filter) {
            if(filter.available_date) {
                builder.andWhere(`( expire_date is null or expire_date >= :available_date)`, filter);
                builder.addSelect(`ifnull(expire_date, "9999-12-31")`, `expire_date2`);
            }
        }
    }

    protected async preparedJoin<R = Point>(builder: SelectQueryBuilder<R>, filter: any, entity?: any): Promise<void>{
        builder.leftJoinAndSelect(`${this.defaultAlias}.product`, `product`);
        builder.leftJoinAndSelect(`product.goods`, `goods`);
        builder.leftJoinAndSelect(`product.order`, `order`);

        // builder.leftJoinAndSelect(`${this.defaultAlias}.point_charge`, `point_charge`);
        builder.leftJoinAndSelect(`${this.defaultAlias}.member`, `member`);
    }

    protected async preparedFilter(builder, filter) {
        if(!filter) { return; }
        if(filter.keyword) {
            builder.andWhere('(member.nickname like :keyword) or (memo like :keyword) or (member.member_seq like :keyword) or (member.userid like :keyword)',  {keyword: '%'+ filter.keyword+'%'});
        }
        else if(filter.product_type) {
            builder.andWhere('(product.product_type = :product_type)', {product_type: filter.product_type});
        }
    }


    // protected async setOrder(builder: SelectQueryBuilder<any>, order: CaOrder | CaOrder[], defaultTable?: string) {
    //     await super.setOrder(builder, order, defaultTable);
    // }

    public async getPoint(member_seq, point_type?: PointType, date = new Date(), runner?: QueryRunner) {
        // runner = runner || this.getDataSource().createQueryRunner();

        let query = `select sum(remains) as point from point where member_seq = ? and (expire_date is null or expire_date > ?) `;
        let params = [member_seq, date];
        if(point_type) {
            query += ` and point_type = ? `;
            params.push(point_type);
        }
        let data = await this.getDataSource().query(query, params);

        return isNonEmptyArray(data) ? parseInt((!data[0].point? 0: data[0].point)) : 0;
    }
}