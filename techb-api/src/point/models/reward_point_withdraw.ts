import { CaEntity, CaModel, CaOrder, isNonEmptyArray, now } from "@common-api/common-api";
import { RewardPointWithdraw, WithdrawalStateType } from "../entities/reward_point_withdraw";
import { Service } from "typedi";
import { DeleteQueryBuilder, EntityTarget, QueryRunner, SelectQueryBuilder, UpdateQueryBuilder } from "typeorm";

export interface RewardPointWithdrawFilter extends RewardPointWithdraw { 
  member_seq: number
  bank_account_holder: string;
}

@Service()
export class RewardPointWithdrawModel extends CaModel<RewardPointWithdraw> {

  constructor() {
    super(RewardPointWithdraw); 
  }

  protected async preparedJoin<R = RewardPointWithdraw>(builder: SelectQueryBuilder<R>, filter: any, entity?: any): Promise<void> {
        builder.leftJoinAndSelect(`${this.defaultAlias}.member`, `member`);
  }

//   public async getBalance(member_seq, runner?: QueryRunner) {
//     let query = `select sum(remains) as reward_point from point_reward where member_seq = ? `;
//     let param = [member_seq];       
//     let data = await this.getDataSource().query(query, param);
//     console.log(data);
//     return isNonEmptyArray(data) ? { reward_point: data[0].reward_point } : { reward_point: 0 };
// }

  // 검색기능
  protected async preparedFilter(builder, filter) {
    if(!filter) { return; }
    if(filter.keyword) {
        builder.andWhere('(bank_account_holder like :keyword) or (member.userid like :keyword) or (member.nickname like :keyword) or (member.member_seq like :keyword)', {keyword: '%'+ filter.keyword+'%'});
    }
  }


}
    
