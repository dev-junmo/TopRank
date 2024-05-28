import { CaEntity, CaService, Logger, YN, MemberModel,  } from "@common-api/common-api";
import { GoodsModel } from "../models/goods";
import { Goods } from "../entities/goods";
import { ProductModel } from "../../product/models/product";
import { Product } from "../../product/entities/product";

import * as moment from 'moment';
import { Inject, Service } from "typedi";
import { EntityTarget, QueryRunner } from "typeorm";
import { IsNotEmpty } from "@common-api/common-api";

export class GoodsCreateParams extends Goods { 
  
}

export class GoodsUpdateParams extends Goods { 
        public goods_name: string;
        public goods_price: string;
        public goods_platform: string;
        public goods_category_name: string;
        public store_name: string;
}

@Service()
export class GoodsService extends CaService<Goods> { 

    @Inject(()=> GoodsModel)
    protected model: GoodsModel;

    @Inject(()=> ProductModel)
    protected productModel: ProductModel;

    @Inject("MemberModel")
    protected memberModel: MemberModel;

    constructor() {
        super();
    }

     //admin 리스트 조회
    //  async admin_list(filter, order, paging) {
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

    // goods.goods_uri = params.goods_uri;
    // goods.goods_name = params.goods_name;
    // goods.goods_platform = params.goods_platform;
    // goods.store_name = params.store_name;
    // goods.categories = params.categories;
    /////////////////////////////////////////
    // goods.goods_name = params.goods_name;
    // goods.goods_price = params.goods_price
    // goods.goods_platform = params.goods_platform;
    // goods.store_name = params.store_name;
    // goods.categories= params.categories;
    // goods.goods_uri = params.goods_uri;
    // goods.sales_rank_current_rank = params.sales_rank_current_rank;
    // goods.sales_rank_total_rank = params.sales_rank_total_rank;
    // goods.sales_rank_page_count = params.sales_rank_page_count;
    // goods.sales_rank_page_rank = params.sales_rank_page_rank;
    // goods.reviews_review_total = params.reviews_review_total;
    // goods.reviews_avg_score = params.reviews_avg_score;
    // goods.reviews_sales_total = params.reviews_sales_total;
    // goods.is_ad = params.is_ad;
    /////////////////////////////////////////
    
    public async createFromExport(params: GoodsCreateParams) {

        // try {
            let goods = new Goods();
            
            // goods.member_seq = params.member_seq;
            goods.goods_name = params.goods_name;
            goods.goods_price = params.goods_price
            goods.goods_platform = params.goods_platform;
            goods.store_name = params.store_name;
            goods.categories= params.categories;
            goods.goods_uri = params.goods_uri;
            goods.sales_rank_current_rank = params.sales_rank_current_rank;
            goods.sales_rank_total_rank = params.sales_rank_total_rank;
            goods.sales_rank_page_count = params.sales_rank_page_count;
            goods.sales_rank_page_rank = params.sales_rank_page_rank;
            goods.reviews_review_total = params.reviews_review_total;
            goods.reviews_avg_score = params.reviews_avg_score;
            goods.reviews_sales_total = params.reviews_sales_total;
            goods.is_ad = params.is_ad;
            await this.model.create(goods);

            return goods;
        // } catch(e) {
        //     Logger.error('goods ', e);
        //     return {};
        //     //throw new PKError(500, 'Server Error => ' + e);
        // }
    }

    // public async getDetail(id) {
    //     let product = await super.get(id);
    //     // keywords
    //     let keywords = [];
    //     let products = await this.model.list({goods_seq:product.goods_seq});
    //     for(let product of products.list) {
    //         keywords.push(product.keyword);
    //     }
    //     let resp: any = product;
    //     if (product.goods) {
    //         resp.goods.keywords = keywords;
    //     }
    //     return resp;
    // }
    
    public async getGoods(id: number) {
        // keywords
        let keywords = [];
        let products = await this.productModel.list({goods_seq:id});
        for(let product of products.list) {
            keywords.push(product.keyword);
        }

        // goods
        let goods = await this.model.getByFilter({goods_seq:id});
        let categories = [];
        if(goods.categories && goods.categories.length > 0) {
          categories = goods.categories.split(',');
        }

        // 멤버에 따른 구독 여부 가져오기
        let resp = {
            ...goods,
            categories: categories,
            keywords: keywords,            
            sales_rank: {
                current_rank: goods.sales_rank_current_rank,
                total_rank: goods.sales_rank_total_rank,
                page_count: goods.sales_rank_page_count,
                page_rank: goods.sales_rank_page_rank
            },
            reviews: {
                review_total:goods.reviews_review_total,
                avg_score: goods.reviews_avg_score,
                sales_total: goods.reviews_sales_total
            }
        }
        return resp;
    }

    public async getWithSubscribe(goods_seq: number, keyword, member_seq: number) {
        if (!keyword) {
            throw Error('keyword파라미터가 필요합니다.');
        }

        // keywords
        let keywords = [];
        let products = await this.productModel.list({goods_seq:goods_seq});
        for(let product of products.list) {
            keywords.push(product.keyword);
        }

        // goods
        let goods = await this.model.getByFilter({goods_seq:goods_seq});
        let categories = [];
        if(goods.categories && goods.categories.length > 0) {
          categories = goods.categories.split(',');
        }

        // issubscribe
        if (!goods.products || goods.products.length == 0) {
            throw Error('goods에서 product정보를 찾을 수 없습니다.');
        }
        let index = goods.products.findIndex((value) => {
            return value.member_seq == member_seq && value.keyword == keyword;
        });
        let is_subscribe = index > -1 ? 'Y' : 'N';
        
        // 멤버에 따른 구독 여부 가져오기
        let resp = {
            ...goods,
            categories: categories,
            keywords: keywords,            
            sales_rank: {
                current_rank: goods.sales_rank_current_rank,
                total_rank: goods.sales_rank_total_rank,
                page_count: goods.sales_rank_page_count,
                page_rank: goods.sales_rank_page_rank
            },
            reviews: {
                review_total:goods.reviews_review_total,
                avg_score: goods.reviews_avg_score,
                sales_total: goods.reviews_sales_total
            },
            is_subscribe: is_subscribe
        }
        return resp;
    }
    
    public async search(filter, order, paging, member_seq) {  
        if (!filter.keyword) {
            throw new Error('파라미터에 keyword가 필요합니다.');
        }
        let list = await this.model.list(filter, order, paging);
        let resp = [];
        for(let goods of list.list) {
            let categories = [];
            if(goods.categories && goods.categories.length > 0) {
                categories = goods.categories.split(',');
            }
            let index = goods.products.findIndex((value) => {
                return value.member_seq == member_seq && value.keyword == filter.keyword;
            });
            let is_subscribe = index > -1 ? 'Y' : 'N';
            
            let obj = {
                ...goods,
                categories: categories,
                sales_rank: {
                    current_rank: goods.sales_rank_current_rank,
                    total_rank: goods.sales_rank_total_rank,
                    page_count: goods.sales_rank_page_count,
                    page_rank: goods.sales_rank_page_rank
                },
                reviews: {
                    review_total:goods.reviews_review_total,
                    avg_score: goods.reviews_avg_score,
                    sales_total: goods.reviews_sales_total
                },
                is_subscribe: is_subscribe
            }
            resp.push(obj);
        }
        return {
            list: resp,
            total: resp.length
        };
    }

    public async getWithMember(member_seq) {
        let query = `select * from goods inner join product on product.goods_seq = goods.goods_seq 
            where product.member_seq = ? group by goods.goods_seq`;
        let params = [member_seq];
        let data = await this.model.getDataSource().query(query, params);
        return {list:data, total: data.length};
    }

    ////////////////////////////////////////////
    // 구독하기

    // public async isSubscribe(seq: number, keyword, member_seq: number) {
    //     if (!keyword) {
    //         throw new Error('파라미터에 keyword가 필요합니다.');
    //     }
    //     let list = await this.model.list({keyword: keyword}, order, paging);
    //     let resp = [];
    //     for(let goods of list.list) {
    //         let categories = [];
    //         if(goods.categories && goods.categories.length > 0) {
    //             categories = goods.categories.split(',');
    //         }
    //         let index = goods.products.findIndex((value) => {
    //             return value.member_seq == member_seq && value.keyword == filter.keyword;
    //         });
    //         let is_subscribe = index > -1 ? 'Y' : 'N';
            
    //         let obj = {
    //             ...goods,
    //             categories: categories,
    //             sales_rank: {
    //                 current_rank: goods.sales_rank_current_rank,
    //                 total_rank: goods.sales_rank_total_rank,
    //                 page_count: goods.sales_rank_page_count,
    //                 page_rank: goods.sales_rank_page_rank
    //             },
    //             reviews: {
    //                 review_total:goods.reviews_review_total,
    //                 avg_score: goods.reviews_avg_score,
    //                 sales_total: goods.reviews_sales_total
    //             },
    //             is_subscribe: is_subscribe
    //         }
    //         resp.push(obj);
    //     }
    //     return {
    //         list: resp,
    //         total: resp.length
    //     };
    // }

    // public async subscribe(seq: number, member_seq: number) {
    //     // goods table -> is_subscribe : 'Y'
    //     return true;
    // }

    // public async unsubscribe(seq: number, member_seq: number) {
    //     // goods table -> is_subscribe : 'N'
    //     return true;
    // }
 
}