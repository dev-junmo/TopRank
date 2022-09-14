import { CaError, CaService, Logger, now, MemberModel } from "@common-api/common-api";
import { RewardPointModel } from "../models/reward_point";
import { ActionType, RewardPoint, RewardStateType } from "../entities/reward_point";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";
import axios from "axios";
import { PointModel } from "../models/point";
import { PointService } from "./point";
import { PointType } from "../entities/point";

export class RewardPointCreateParams extends RewardPoint { 
    
}

export class RewardPointUpdateParam extends RewardPoint { 
 
}
 
@Service()
export class RewardPointService extends CaService<RewardPoint> { 

    @Inject(()=> RewardPointModel)
    protected model: RewardPointModel;

    @Inject("MemberModel")
    protected memberModel: MemberModel;

    @Inject(()=> PointService)
    protected pointService: PointService;

    constructor() {
        super();
    }

    // 리워드포인트 잔여포인트조회
    public async getBalance(member_seq, runner?: QueryRunner) {
        let reward_point = await this.model.getBalance(member_seq);        
        return reward_point;
    }

    // 리워드포인트 유료포인트로 전환 - 관리자승인 필요 없음
    public async exchange(exchangePoint, memberSeq) {
        // 포인트를 추가
        await this.pointService.addPoint(memberSeq, exchangePoint, PointType.charge, '리워드 포인트 전환');
        // 리워드 포인트를 사용 
        return await this.usePoint(memberSeq, exchangePoint,  RewardStateType.exchange, '포인트 전환');
    }

    // 현금 인출 - 관리자 승인 필요
    // public async withdrawal(newData, member_seq) {      
    //     let remains = await this.getBalance(member_seq);
    //     return await this.usePoint(member_seq, newData.reward_point, RewardStateType.withdrawal, '포인트 인출', newData);
    // }

    //관리자
    //전체 리워드포인트 리스트 조회
    // async admin_list(filter, order, paging) {
    //     let response = await this.model.list(filter, order, paging);
    //     await this.listConvert(response.list);// ??
    //     let resp: any = response;

    //     // member추가
    //     for(let item of resp.list) {
    //         let member = await this.memberModel.getByFilter({member_seq: item.member_seq});
    //         item.member = member;
    //     }


    //     return resp;
    // }

    //리워드 포인트 추가
    //포인트 추가
    // public async addPoint(member_seq: number, add_point, point_type, memo?, expired_days?) {
    //     try {
    //         let regist_date = new Date();
    //         let expire_date = expired_days > 0 ? moment(regist_date).add(expired_days, 'days').toDate(): null;           

    //         let point = new Point();    
    //         point.member_seq = member_seq;
    //         point.point_type = point_type;
    //         point.action = ActionType.plus;
    //         point.point = add_point;            
    //         point.memo = memo;
    //         point.remains = add_point;
    //         point.regist_date = regist_date;
    //         point.expire_date = expire_date;
    //         point.state = StateType.charge;
    //         await this.model.create(point);        
    //         return point;
             
    //     } catch(e) {
    //         Logger.error('point error', e);
    //         throw new CaError(500, 'Server Error => ' + e);
    //     }
    // }

    public async addPoint(member_seq: number, add_point, memo?) {
        try {
            let rewardPoint = new RewardPoint();
            rewardPoint.member_seq = member_seq;
            rewardPoint.reward_state = RewardStateType.charge;
            rewardPoint.action = ActionType.plus;
            rewardPoint.regist_date = now();
            rewardPoint.memo = memo;
            rewardPoint.reward_point = add_point;
            rewardPoint.remains = add_point;
            
            await this.model.create(rewardPoint)
            return rewardPoint;
        } catch(e) {
            Logger.error('reward point error', e);
            throw new CaError(500, 'Server Error => ' + e);
        }
    }

    //리워드 포인트 사용
    public async usePoint(member_seq, reward_point, reward_state: RewardStateType, memo) {
        let rewardPoints = await this.model.all({member_seq: member_seq, remains: {min: 1}});

        for(let data of rewardPoints) {
            if(reward_point <= 0) {
                break;
            }
            let rewardPoint = new RewardPoint();
            rewardPoint.member_seq = member_seq;
            rewardPoint.reward_state = reward_state;
            rewardPoint.action = ActionType.minus;
            rewardPoint.regist_date = now();
            rewardPoint.memo = memo;
            rewardPoint.reward_point = Math.min(reward_point, data.remains);
            rewardPoint.remains = 0;
        
            await this.model.create(rewardPoint);
            await this.model.updatesByFilter({reward_point_seq: data.reward_point_seq}, {remains: data.remains - rewardPoint.reward_point}, RewardPoint);
            reward_point -= rewardPoint.reward_point;
        } 
        return await this.getBalance(member_seq);      
    }

    //포인트 

    /* 사용취소 -> reward 에서 전환 취소 불가 
    public async useCancelRewardPoint(member_seq, order_seq, memo?, runner?: QueryRunner) {
        let points = await this.model.all({order_seq: order_seq});

        for(let data of points) {
            let point = new RewardPoint();

            point.member_seq = data.member_seq;
            point.point_type = data.point_type;
            point.action = ActionType.plus;
            point.point = data.point;
            point.memo = memo;
            point.remains = data.point;
            if(data.expire_date) {
                point.expire_date = moment().add(moment(data.expire_date).diff(data.regist_date, 's'), 's').toDate();
            }
            else {
                point.expire_date = null;
            }
            
            await this.model.create(point, runner);
        }
        
        return await this.getRewardPoint(member_seq, null, null, runner);
    }
    */
}