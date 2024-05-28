import { CaService, Logger, MemberModel, CaError } from "@common-api/common-api";
import { PointChargeModel } from "../models/point_charge";
import { PointCharge, StateType } from "../entities/point_charge";
import { PointModel } from "../models/point";
import { ActionType, Point,PointType } from "../entities/point";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { BankAccountModel } from "../../bank/models/bank_account";
import { PointService } from "./point";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export class PointChargeCreateParams extends PointCharge {
    nobankbook: any; 

}
export class PointChargeUpdateParam extends PointCharge { 
 
}
@Service()
export class PointChargeService extends CaService<PointCharge> { 

    @Inject(()=> PointChargeModel)
    protected model: PointChargeModel;

    @Inject(() => PointModel)
    protected pointModel: PointModel;

    @Inject(() => PointService)
    protected pointService: PointService;

    @Inject(() => BankAccountModel)
    protected bankModel: BankAccountModel;

    @Inject("MemberModel")
    protected memberModel: MemberModel;

    constructor() {
        super();
    }

    public async createFromExport(params: PointChargeCreateParams,member_seq) {
        try {

            //point charge 추가
            let pointCharge = new PointCharge();

            pointCharge.member_seq = member_seq;
            pointCharge.state = StateType.request;            
            pointCharge.charge_point = params.charge_point;
            pointCharge.charge_free_point = params.charge_free_point;

            pointCharge.account_seq = params.nobankbook.account_seq;            
            pointCharge.depositor = params.nobankbook.depositor;

            pointCharge.nobankbook_expired_date = params.nobankbook.nobankbook_expired_date;

            pointCharge.cash_receipt_is_apply_receipt = params.nobankbook.cash_receipt.is_apply_receipt;
            pointCharge.cash_receipt_company_number = params.nobankbook.cash_receipt.company_number;
            pointCharge.cash_receipt_phone_number = params.nobankbook.cash_receipt.phone_number;
            pointCharge.cash_receipt_receipts_type = params.nobankbook.cash_receipt.receipts_type;
            
            pointCharge.payment_total_price = params.payment_total_price;

            await this.model.create(pointCharge);
        
            return pointCharge;

        } catch(e) {
            Logger.error('pointCharge error', e);
            return {};
            //throw new PKError(500, 'Server Error => ' + e);
        }
    }

    ///////////////////////////////////////
    // 이 부분은 잘 모를 때 작업한 내용 / 참고 하지 말고 나중에 기회되면 수정 필요
    // async _list(filter, order, paging) {
    //     let response = await this.model.list(filter, order, paging);
    //     await this.listConvert(response.list);// ??
        
    //     let resp: any = response;

    //     // member추가
    //     for(let item of resp.list) {
    //         let member = await this.memberModel.getByFilter({member_seq: item.member_seq});
    //         item.member = member;
    //     }

    //     // bank추가
    //     for(let item of resp.list) {
    //         let bank = await this.bankModel.getByFilter({account_seq: item.account_seq});
    //         item.bank = bank;
    //     }
    //     return resp;
    // }



    // 결제 완료
    public async complete(id, params) {
        await super.update(id, {state: 'complete'});
        return this.addPoint(params);
    }

    // 취소
    public async cancel(id, params) {
        return await super.update(id, {state: 'cancel'});
    }

    // 일괄 만료 처리
    public async exprireAll() {
        let date = new Date();
        let query = `select * from point_charge where state = 'request' and nobankbook_expired_date is not null and nobankbook_expired_date < ?`;
        let params = [date];
        let data = await this.model.getDataSource().query(query, params);
        for(let point of data) {
            let _pointCharge = new PointCharge();
            Object.assign(_pointCharge, point);
            _pointCharge.state = StateType.cancel;
            await this.model.update(_pointCharge);
        }
        return {};
    }

    // 승인처리 후 포인트내역 추가
    public async addPoint(params) {
        // 유료포인트
        let Charge_point = new Point();        
        Charge_point.member_seq = params.member_seq;
        Charge_point.point_type = PointType.charge;
        Charge_point.action = ActionType.plus;
        Charge_point.point =  params.charge_point;
        Charge_point.memo = params.charge_point_memo? params.charge_point_memo: numberWithCommas(params.payment_total_price) + "원 포인트 충전";
        Charge_point.remains = params.charge_point;             

        let _point = await this.pointService.addPoint(Charge_point.member_seq, Charge_point.point, Charge_point.point_type, Charge_point.memo, Charge_point.expire_date);

        //무료포인트
        let Free_point = new Point();
        Free_point.member_seq = params.member_seq;
        Free_point.point_type = PointType.free;
        Free_point.action = ActionType.plus;
        Free_point.point =  params.charge_free_point;
        Free_point.memo = params.charge_free_point_memo? params.charge_free_point_memo: "충전 무료포인트 적립";
        Free_point.remains = params.charge_free_point;

        let _free_point = await this.pointService.addPoint(Charge_point.member_seq, Free_point.point, Free_point.point_type, 
            Free_point.memo, 30);

        // 총잔액 계산 / 저장
        let charge_point = await this.pointModel.getPoint(Charge_point.member_seq, PointType.charge);
        let free_point = await this.pointModel.getPoint(Charge_point.member_seq, PointType.free);

        _point.total_remain = charge_point; 
        _free_point.total_remain = free_point; 
        await this.pointModel.update(_point);
        await this.pointModel.update(_free_point);
        
        return {
            code: 200,
            message:"success"

            // Charge_point,
            // Free_point,
            // "사용가능한 무료포인트: " : free_point,
            // "사용가능한 유료포인트: " : charge_point
        }
    }
    
    //회원의 포인트, 은행정보  
    public async getChargeInfo(member_seq) {
    
        //date = date || new Date();

        // 회원의 포인트,무료포인트 
        let freePoint = await this.pointModel.getPoint(member_seq,PointType.free);
        let chargePoint = await this.pointModel.getPoint(member_seq,PointType.charge);

        // 입금계좌정보
        let bank = await this.bankModel.list();

        return {
            freePoint,
            chargePoint,
            bank
        }
    }



    
}