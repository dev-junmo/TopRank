import { CaModel } from "@common-api/common-api";
import { PointCharge, StateType } from "../entities/point_charge";
import { Service } from "typedi";
//import { SelectQueryBuilder } from "typeorm";

export interface PointChargeFilter extends PointCharge { 
    
}

@Service()
export class PointChargeModel extends CaModel<PointCharge> { 
    constructor() {
        super(PointCharge); 
    }

    protected async preparedJoin<R = PointCharge>(builder, filter) {
        builder.leftJoinAndSelect(`${this.defaultAlias}.member`, `member`);
        builder.leftJoinAndSelect(`${this.defaultAlias}.bank`, `bankaccount`);
    }

    // list api가 호출될 때 쿼리를 작성한다. 
    // filter는 프론트에서 넘져준 list query 파라미터임
    // 계좌번호, 임급은행  bank.account_num 쓰면 bo 에러남, 닉네임,id 는 member.userid 이렇게 써야 애러가안남.
    protected async preparedFilter(builder, filter) {
        if(!filter) { return; }
        if(filter.keyword) {
            builder.andWhere('(account_num like :keyword) or (depositor like :keyword) or (member.userid like :keyword) or (member.nickname like :keyword) or (bank_name like :keyword)', {keyword: '%'+ filter.keyword+'%'});
        }
    }
}