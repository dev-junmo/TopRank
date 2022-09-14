import { CaService, Logger, YN, MemberModel, CaError } from "@common-api/common-api";
import { ProductModel } from "../models/product";
import { Product, ProductState } from "../entities/product";
import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";
import { GoodsModel } from "../../goods/models/goods";
import { Goods } from "../../goods/entities/goods";

import { PointService } from "../../point/services/point";
import { RewardPointService } from "../../point/services/reward_point";
import { GoodsService } from "../../goods/services/goods"; 

export class ProductCreateParams extends Product { 
    public goods_seq: number;
    public goods_name: string;
    // public goods_uri : string;
    // public goods_name : string;
    // public goods_platform : string;
    // public store_name : string;
    // public categories : string;
}

export class ProductUpdateParams extends Product { 
    public keyword: string; 
    public category: string;
    public period:string; 
    public auto_extension: YN;
}

@Service()
export class ProductService extends CaService<Product> { 

    @Inject(()=> ProductModel)
    protected model: ProductModel;

    @Inject(() => GoodsModel)
    private goodsModel: GoodsModel;

    @Inject("MemberModel")
    protected memberModel: MemberModel;

    @Inject(() => PointService)
    protected pointService: PointService;

    @Inject(() => RewardPointService)
    protected rewardPointService: RewardPointService;
    
    @Inject(() => GoodsService)
    protected goodsService: GoodsService;   

    constructor() {
        super();
    }

    //admin 리스트 조회
    // async admin_list(filter, order, paging) {
    //     let response = await this.model.list(filter, order, paging);
    //     await this.listConvert(response.list);
        
    //     let resp: any = response;

    //     // member추가
    //     for(let item of resp.list) {
    //         let member = await this.memberModel.getByFilter({member_seq: item.member_seq});
    //         item.member = member;
    //     }
    //     return resp;
    // }

    // async _list(filter, order, paging, memberSeq) {
    //     let resp = await this.model.list(filter, order, paging);
       
    //     // member filter 임시
    //     let list = [];
    //     for(let item of resp.list) {
    //         if (item.member_seq !== memberSeq) {
    //             continue;
    //         } 
    //         list.push(item);
    //     }
    //     resp.list = list;
    //     resp.total = list.length;
    //     return resp;
    // }


    // public async listConvert(list) {
        
    //     return list;
    // }

// auto_extension: "Y"
// is_auto_extension_priority: "Y"
// keyword: ["딸기"]
// product_count: 1
// product_period: "7"
// product_total_point: 70
// product_type: "A"
// use_free_point: 70
// use_point: 0

// is_ad: true,
// categories: ['식품', '농산물', '과일', '망고'],
// store_name: '제주농부2',
// goods_name: '제주농부 산지직송 고당도 제주 미니 꼬마 애플망고 1kg 2kg 3kg',
// goods_seq: 138,
// sales_rank: {
//     current_rank: 23,
//     total_rank: 689689,
//     page_count: 2,
//     page_rank: 5
// },
// reviews: {
//     review_total: 1024,
//     avg_score: 4.5,
//     sales_total: 5481
// },
// is_subscribe: 'N'
    
    // public async createFromExport(params: ProductCreateParams, member_seq) {
    //     try {
    //         let product = this.createProduct(params, member_seq);
    //         return product;
    //     } catch(e) {
    //         Logger.error('product ', e);
    //         //throw new PKError(500, 'Server Error => ' + e);
    //     }
    // }

    public async createProduct(params: ProductCreateParams, member_seq, order_seq): Promise<Product> {
        // goods_seq
        if (!params.goods_seq) {
            throw new CaError(500, 'product생성을 위해 goods_seq가 필요합니다.');
        }

        if (!order_seq) {
            throw new CaError(500, 'product생성을 위해 order_seq 필요합니다.');
        }

        // get goods
        let goods = await this.goodsModel.get(params.goods_seq);
        if (!goods || !goods.goods_seq) {
            throw new CaError(500, `product생성을 위한 goods가 없습니다.`);
        }

        // 이미 있는 상품인지 체크
        //goodsService
        //let _product = await this.getByQueryParams(member_seq, {keyword: params.keyword});
        let _product = await this.goodsService.getWithSubscribe(goods.goods_seq, params.keyword, member_seq);
        if (_product && _product.is_subscribe == 'Y') {
            throw new CaError(500, `이미 구매한 상품입니다.`);
        }  

        ///////////////////////////////////////////////
        //product 날짜기입용
        let start_date = new Date();
        let period = params.product_period; // 상품 타입에 따라 7일,15일,30일,90일 추가 
        let end_date = moment(start_date).add(period, 'days').toDate();

        // create product
        let product = new Product();
        product.member_seq = member_seq;
        // product.goods_seq = goods.goods_seq; // 굿즈 연결 : 테스트 필요
        product.goods = goods;
        product.order_seq = order_seq;
        product.goods_name = params.goods_name;
        product.keyword = params.keyword;
        product.product_type = params.product_type;
        product.product_period = params.product_period;
        product.auto_extension = params.auto_extension;                         // 자동연장여부 
        product.is_auto_extension_priority = params.is_auto_extension_priority; // 자동연장우선순위여부
        product.start_date = start_date;
        product.end_date = end_date;   
        product.product_mid = params.product_mid;
        product.price_mid= params.price_mid;
        product.content_mid = params.content_mid;
        product.option_mid = params.option_mid;
        product.enabled = YN.Y;
        product.state = ProductState.ready;
        return await this.model.create(product);
    }

    public async getDetail(id) {
        let product = await super.get(id);
        // keywords
        let keywords = [];
        let products = await this.model.list({goods_seq:product.goods.goods_seq});
        for(let product of products.list) {
            keywords.push(product.keyword);
        }
        let resp: any = product;
        if (product.goods) {
            resp.goods.keywords = keywords;
        }
        return resp;
    }
    
    // 승인
    public async confirm(id, params) {
        try {
            let product = await super.get(id);

            // point를 사용처리 한다.
            await this.usePoint(product.order, product.member, product.product_seq);

            //
            await super.update(id, {state: 'confirm'});
            return {
                code: 200,
                message:"success"
            };
       } catch(e) {
           Logger.error('product ', e);
           return {};
       }
    }

    // 취소
    public async cancel(id, params) {
        try {
            await super.update(id, {state: 'cancel'});
            return {
                code: 200,
                message:"success"
            };
       } catch(e) {
           Logger.error('product ', e);
           return {};
       }
    }

    // 상품을 구매 했는지 체크
    public async getByQueryParams(memberSeq, filter) {
        try {
            //await super.update(id, {state: 'cancel'});
            let product = await this.model.getByFilter({
                member_seq: memberSeq,
                ...filter
            });
            return { ...product};
       } catch(e) {
           Logger.error('product ', e);
           return {};
       }
    }

    // 해당유저의 모든 goods을 가져옴
    // public async getGoods(member_seq) {
    //     let goods = await this.model.getDataSource().
    //         .where("member_seq=:member_seq", {member_seq})
    //         .groupBy("goods.goods_seq")
    //         .getMany();
        
    //     // let query = `select * from product where expire_date is not null and expire_date < ? and point_type = 'free'`;
    //     // let params = [member_seq];
    //     // let data = await this.model.getDataSource().query(query, params);
    //     // for(let point of data) {
    //     //     let _point = new Point();
    //     //     Object.assign(_point, point);
    //     //     _point.state = StateType.expired;
    //     //     _point.remains = 0;
    //     //     await this.model.update(_point);
    //     // }
    //     return {};


    // }

     // public async getCountByGidParent(min: number, max:number, parent:number, runner?: QueryRunner){
	// 	runner = runner || this.getDataSource().createQueryRunner();
	// 	let builder: SelectQueryBuilder<BoardData> = await this.getDataSource().createQueryBuilder(BoardData, 'boarddata', runner);
		
	// 	builder.andWhere('gid > :min and gid < :max ', {min:min, max:max});
	// 	builder.andWhere('parent = :parent', { parent : parent });

	// 	return await builder.getCount();
	// }


    // 승인처리 후 포인트사용 
    public async usePoint(order, member, product_seq) {
        // 내가 사용한 포인트
        let usePoint = order.use_point + order.use_free_point;       
        if (usePoint != 0) { 
            this.pointService.usePoint(order.member_seq, product_seq, usePoint, product_seq);
        }

        // 추천인에게 포인트 지급
        if (member.parent_recommend_code && member.parent_recommend_code.length > 0) {
            let recommenderMember = await this.memberModel.getByFilter({recommend_code: member.parent_recommend_code});

            // let rate = [0.3, 0.35, 0.4, 0.45, 0.5];
            // let freeRate =  [0, 0.05, 0.01, 0.15, 0.2];
            let rate = [0.3, 0.35, 0.4, 0.45, 0.5];             // 
            let freeRate =  [0.05, 0.05, 0.01, 0.15, 0.2];      // 임시로 0% -> 0.05% 변경해놨음

            let rpoint =  Math.floor(order.use_point * rate[member.group_seq-1]);
            let rfpoint = Math.floor(order.use_free_point * freeRate[member.group_seq-1]);
            let rewardPoint = rpoint + rfpoint;
            if (rewardPoint > 0) {
               this.rewardPointService.addPoint(recommenderMember.member_seq, rewardPoint, member.userid + ' 구매 리워드');
            }            
        }
        return order;
    }
}