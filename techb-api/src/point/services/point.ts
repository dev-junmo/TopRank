import { addDate, CaError, CaService, Logger, MemberModel } from "@common-api/common-api";
import { PointModel } from "../models/point";
import { OrderModel } from "../../order/models/order";
import { ActionType, Point, PointType } from "../entities/point";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";
import { StateType } from "../entities/point";

export class PointCreateParams extends Point { 
      
}



export class PointUpdateParam extends Point { 
 
}


@Service()
export class PointService extends CaService<Point> { 

    @Inject(()=> PointModel)
    protected model: PointModel;

    @Inject("MemberModel")
    protected memberModel: MemberModel;

    @Inject(() => OrderModel)
    protected orderModel: OrderModel;

    constructor() {
        super();
    }

    public async getBalance(member_seq) {
        let free_point = await this.model.getPoint(member_seq, PointType.free);
        let charge_point = await this.model.getPoint(member_seq, PointType.charge);        
        return {
            free_point:  !free_point? 0: free_point,
            charge_point:  !charge_point? 0: charge_point,
        };
    }
    
    //포인트 추가
    public async addPoint(member_seq: number, add_point, point_type, memo?, expired_days?) {
        try {
            let regist_date = new Date();
            let expire_date = expired_days > 0 ? moment(regist_date).add(expired_days, 'days').toDate(): null;           

            let point = new Point();    
            point.member_seq = member_seq;
            point.point_type = point_type;
            point.action = ActionType.plus;
            point.point = add_point;            
            point.memo = memo;
            point.remains = add_point;
            point.regist_date = regist_date;
            point.expire_date = expire_date;
            point.state = StateType.charge;
            await this.model.create(point);        
            return point;
             
        } catch(e) {
            Logger.error('point error', e);
            throw new CaError(500, 'Server Error => ' + e);
        }
    }

    //포인트 사용
    public async usePoint(member_seq, product_seq: number, use_point, order_seq, memo?, runner?: QueryRunner) {
        let points = await this.model.all({member_seq: member_seq, remains: {min: 1}, available_date: new Date()}, {column: 'expire_date2', dir: 'asc'});

        for(let data of points) {
            if(use_point <= 0) {
                break;
            }
            let point = new Point();

            point.member_seq = member_seq;
            point.product_seq = product_seq;
            point.point_type = data.point_type; //
            point.action = ActionType.minus;
            point.point = Math.min(use_point, data.remains);   
            point.memo = "키워드 구매";
            point.remains = 0;
            point.regist_date = data.regist_date;
            point.expire_date = data.expire_date;
            point.state = StateType.use;

            await this.model.create(point, runner);
            await this.model.updatesByFilter({point_seq: data.point_seq}, {remains: data.remains - point.point}, Point, runner);   
            use_point -= point.point;
        }
        return await this.getBalance(member_seq);
        //await this.getPoint(member_seq, null, null, runner);
    }

    // - 5000 2022-06-20
    // 1000       2022-06-30
    // 2000       2022-09-30
    // 10000      null
    // + 5000 2022-07-01
    // 1000, 1111 2022-07-10
    // 2000, 1111 2022-10-10
    // 2000, 1111 null

    //사용취소
    public async useCancelPoint(member_seq, order_seq, memo?, runner?: QueryRunner) {
        let points = await this.model.all({order_seq: order_seq});
        for(let data of points) {
            let point = new Point();

            point.member_seq = data.member_seq;
            point.point_type = data.point_type;
            point.action = ActionType.plus;
            point.point = data.point;
            point.memo = memo;
            point.regist_date =  new Date();
            point.remains = data.point;
            point.state = StateType.cancel;

            if(data.expire_date) {
                point.expire_date = moment().add(moment(data.expire_date).diff(data.regist_date, 's'), 's').toDate();
            }
            else {
                point.expire_date = null;
            }
            
            await this.model.create(point, runner);
        }
        return await this.getBalance(member_seq);
        //return await this.getPoint(member_seq, null, null, runner);
    }

    // 포인트 만료 처리
    public async expiration() {
        let date = new Date();
        let query = `select * from point where expire_date is not null and expire_date < ? and point_type = 'free'`;
        let params = [date];
        let data = await this.model.getDataSource().query(query, params);
        for(let point of data) {
            let _point = new Point();
            Object.assign(_point, point);
            _point.state = StateType.expired;
            _point.remains = 0;
            await this.model.update(_point);
        }
        return {};
    }
}