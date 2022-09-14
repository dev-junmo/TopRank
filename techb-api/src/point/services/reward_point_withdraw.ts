import { CaError, CaService, Logger, now, MemberModel } from "@common-api/common-api";
import { RewardPointWithdrawModel } from "../models/reward_point_withdraw";
import { RewardPointWithdraw, WithdrawalStateType, BankNameType } from "../entities/reward_point_withdraw";
import { Inject, Service } from "typedi";
import { RewardPointService } from "./reward_point"; 
import { RewardStateType } from "../entities/reward_point"; 

export class RewardPointWithdrawCreateParams extends RewardPointWithdraw { 
    
}

export class RewardPointWithdrawUpdateParam extends RewardPointWithdraw { 
 
}


@Service()
export class RewardPointWithdrawService extends CaService<RewardPointWithdraw> {
 
    @Inject(()=> RewardPointWithdrawModel)
    protected model: RewardPointWithdrawModel;

    @Inject(()=> RewardPointService)
    protected pointService: RewardPointService;

    constructor() {
        super();
    }
    
    public async _create(params: RewardPointWithdrawCreateParams, member_seq) {
        try {
            // 포인트 인출 요청 추가
            let rewardPointWithdraw = new RewardPointWithdraw();
            rewardPointWithdraw.member_seq = member_seq;
            rewardPointWithdraw.bank_account = params.bank_account;
            rewardPointWithdraw.bank_account_holder = params.bank_account_holder;
            rewardPointWithdraw.bank_name = BankNameType[params.bank_name];
            rewardPointWithdraw.withdraw_point = params.withdraw_point;
            rewardPointWithdraw.withdraw_state = WithdrawalStateType.request;
            await this.model.create(rewardPointWithdraw);

            // 인출 신청한 만큼 포인트 차감
            return this.pointService.usePoint(member_seq, params.withdraw_point, RewardStateType.withdrawal, '포인트 인출');;
        } catch(e) {
            Logger.error('reward point request error', e);
            throw {};
        }
  }


//   인출완료처리 
  public async complete(id) {
    return await super.update(id, {withdraw_state: 'complete'});
  }

// //   인출취소처리
//   public async cancel(id) {
//     return await super.update(id, {withdraw_state: 'cancel'});
//   }  

}