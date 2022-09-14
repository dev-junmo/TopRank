import { CaService, Logger, YN, MemberModel } from "@common-api/common-api";
import { OrderModel } from "../models/order";
import { Order,OrderState } from "../entities/order";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";
import { Product, ProductState } from "../../product/entities/product";
import { ProductModel } from "../../product/models/product";
import { Goods } from "../../goods/entities/goods";
import { GoodsModel } from "../../goods/models/goods";
import { StateType } from "../../point/entities/point_charge";
import { Point, PointType } from "../../point/entities/point";
import { PointModel } from "../../point/models/point";

import { ProductCreateParams, ProductService } from "../../product/services/product"; 

const axios = require('axios').default;

export class OrderCreateParams extends Order { 
    //product 
    public keyword : string;
    public product_type : string;
    public product_period : number;
    public auto_extension : YN;
    public is_auto_extension_priority : YN;
    public product_mid : string;
    public price_mid : string;
    public content_mid : string;
    public option_mid : string;
    public enabled : string;
    public productState : ProductState;
    public start_date : Date;
    public end_date : Date;

    public goods_seq: number;
    // goods 
    // public goods_uri : string;
    public goods_name : string;
    // public goods_price : string;
    // public goods_platform : string;
    // public store_name : string;
    // public categories : string;
    

    public member_seq: number;    

}

export class OrderUpdateParams extends Order { 
   
}

@Service()
export class OrderService extends CaService<Order> { 

    // models
    @Inject(()=> OrderModel)
    protected model: OrderModel;

    @Inject(()=> ProductModel)
    protected product: ProductModel;

    @Inject(() => GoodsModel)
    private goodsModel: GoodsModel;
    
    @Inject(() => PointModel)
    protected pointModel: PointModel;

    @Inject(() => OrderModel)
    protected orderModel: OrderModel;

    @Inject("MemberModel")
    protected memberModel: MemberModel;

    // // services
    // @Inject(() => PointService)
    // protected pointService: PointService;

    @Inject(() => ProductService)
    protected productService: ProductService;

    constructor() {
        super();
    }

    //admin 리스트 조회
    async admin_list(filter, order, paging) {
        let response = await this.model.list(filter, order, paging);
        await this.listConvert(response.list);
        
        let resp: any = response;

        // member추가
        for(let item of resp.list) {
            let member = await this.memberModel.getByFilter({member_seq: item.member_seq});
            item.member = member;
        }
        return resp;
    }

    
    //멤버가 생성할 경우
    public async _create(params: OrderCreateParams, member_seq) {   
        // create order
        let order = new Order();            
        //order.product_seq = product.product_seq;  // link product
        //order.product = product;                    // link product
        order.member_seq = member_seq;              // link member   
        
        order.state= OrderState.request;
        order.use_point = params.use_point;
        order.use_free_point = params.use_free_point;       
        order.regist_date = new Date();
        order.product_total_point = params.product_total_point;
        order.product_type = params.product_type;
        await this.model.create(order); 
        
        // create product
        let productParams = new ProductCreateParams();
        Object.assign(productParams, params);
        let product:Product = await this.productService.createProduct(productParams, member_seq, order.order_seq)

        return order;
    }

    // public async getPoint(member_seq) {

    //     // 회원의 포인트,무료포인트 
    //     let free_point = await this.pointModel.getPoint(member_seq,PointType.free);
    //     let charge_point = await this.pointModel.getPoint(member_seq,PointType.charge);

    //     return {
    //         "charge_point": charge_point,
    //         "free_point": free_point            
    //     }

    // }

    // 승인처리 후 포인트사용 
    // public async usePointhistory(order_seq) {
    //     let order = await this.orderModel.getByFilter({order_seq: order_seq});

    //     let usePoint = order.use_point;
    //     let freePoint = order.use_free_point;
        
    //     if (usePoint != 0) { // 충전포인트 사용한 경우
    //         this.pointService.usePoint(order.member_seq, usePoint, order_seq);
    //      }
    //      if (freePoint != 0) { //무료포인트 사용한 경우
    //         this.pointService.usePoint(order.member_seq, freePoint, order_seq);
    //      }
    //     return order;
    // }


/*
    public async getOrder(member_seq: number) {
        try{
            let order = await this.model.list({member_seq: member_seq});

            for (let row of order.list) {
                let detail = await this.getOrderDetail(row.member_seq);
            }

            return {
                order
            };

        } catch(e) {
            Logger.error('Get order member error', e);
            return {};    
            
        }

      
    }


    private async getOrderDetail(member_seq: number) {
        let url = `http://localhost:9000/order/order/member_seq=${member_seq}`;

        let res = await axios.get(url);

        return res.data;
    }
*/
  
}