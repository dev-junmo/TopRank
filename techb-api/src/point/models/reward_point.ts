import { CaEntity, CaModel, CaOrder, isNonEmptyArray, now } from "@common-api/common-api";
import { RewardPoint, RewardStateType } from "../entities/reward_point";
import { Service } from "typedi";
import { DeleteQueryBuilder, EntityTarget, QueryRunner, SelectQueryBuilder, UpdateQueryBuilder } from "typeorm";

export interface RewardPointFilter extends RewardPoint { 
    available_date?: Date
}


@Service()
export class RewardPointModel extends CaModel<RewardPoint> { 
    
    constructor() {
        super(RewardPoint); 
    }

    //
    // public async setFilter<R extends CaEntity = RewardPoint>(builder: SelectQueryBuilder<R>, filter: RewardPointFilter, entity?: EntityTarget<RewardPoint>): Promise<void> {
    //     await super.setFilter(builder, filter, entity);
    //     if(filter) {
    //         if(filter.available_date) {
    //             builder.andWhere(`( expire_date is null or expire_date >= :available_date)`, filter);
    //             builder.addSelect(`ifnull(expire_date, "9999-12-31")`, `expire_date2`);
    //         }
    //     }
    // }

    // protected async setOrder(builder: SelectQueryBuilder<any>, order: CaOrder | CaOrder[], defaultTable?: string) {
    //     await super.setOrder(builder, order, defaultTable);
    // }
    
    protected async preparedJoin<R = RewardPoint>(builder: SelectQueryBuilder<R>, filter: any, entity?: any): Promise<void> {
        builder.leftJoinAndSelect(`${this.defaultAlias}.member`, `member`);
    }
    
    public async getBalance(member_seq, runner?: QueryRunner) {
        let query = `select sum(remains) as reward_point from point_reward where member_seq = ? `;
        let param = [member_seq];       
        let data = await this.getDataSource().query(query, param);
        console.log(data);
        return isNonEmptyArray(data) ? { reward_point: data[0].reward_point } : { reward_point: 0 };
    }
    
    //리워드 포인트 관리 검색기능 안됨
    protected async preparedFilter(builder, filter) {
        if(!filter) { return; }
        if(filter.keyword) {
            builder.andWhere('(member.member_seq like :keyword) or (memo like :keyword) or (member.userid like :keyword) or (member.nickname like :keyword)', {keyword: '%'+ filter.keyword+'%'});
        }
    }
}

